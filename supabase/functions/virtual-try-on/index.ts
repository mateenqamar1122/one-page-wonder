import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildTryOnPrompt(productName: string, productCategory: string): string {
  const categoryPrompts: Record<string, string> = {
    eyewear: `Add stylish ${productName} sunglasses/glasses to this person's face. The glasses should be positioned naturally on their face, fitting properly on the nose bridge and ears. Make it look realistic as if they're actually wearing the glasses. Maintain the original photo quality and lighting.`,
    watch: `Add a ${productName} watch to this person's left wrist. The watch should be positioned naturally and sized appropriately for their wrist. Make it look realistic as if they're actually wearing the watch. Maintain the original photo quality and lighting.`,
    clothing: `Show this person wearing a ${productName}. The clothing should fit naturally on their body with realistic folds and draping. Maintain the original photo quality, lighting, and the person's pose.`,
  };

  return categoryPrompts[productCategory] ||
    `Add ${productName} to this person in a natural, realistic way. Maintain the original photo quality and lighting.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { userImage, productId, productName, productCategory } = await req.json();

    if (!userImage || !productId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: userImage and productId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing virtual try-on for product: ${productName} (${productCategory})`);

    const prompt = buildTryOnPrompt(productName, productCategory);

    // Extract base64 data and mime type from data URL
    const base64Match = userImage.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!base64Match) {
      return new Response(
        JSON.stringify({ error: "Invalid image format. Please provide a base64 encoded image." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const mimeType = base64Match[1];
    const base64Data = base64Match[2];

    // Call Gemini API with exponential backoff retry on 429
    const maxRetries = 3;
    let response: Response | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: base64Data } }
              ]
            }],
            generationConfig: {
              responseModalities: ["TEXT", "IMAGE"]
            }
          }),
        }
      );

      if (response.status === 429 && attempt < maxRetries) {
        const delay = Math.pow(2, attempt + 1) * 1000; // 2s, 4s, 8s
        console.log(`Rate limited (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      break;
    }

    if (!response!.ok) {
      const errorText = await response!.text();
      console.error("Gemini API error:", response!.status, errorText);

      if (response!.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited after retries. Please try again shortly.", retryAfterSeconds: 30 }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (response!.status === 402 || response!.status === 403) {
        return new Response(
          JSON.stringify({ error: "API access denied. Please check your Gemini API key and billing." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`Gemini API error (${response!.status}): ${errorText}`);
    }

    const data = await response!.json();

    // Find the image part in the response
    const candidates = data.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const parts = candidates[0].content?.parts;
    if (!parts) {
      throw new Error("No content parts in Gemini response");
    }

    const imagePart = parts.find((p: any) => p.inlineData);
    if (!imagePart) {
      throw new Error("No image was generated by Gemini");
    }

    const resultImage = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

    console.log("Virtual try-on image generated successfully via Gemini");
    return new Response(
      JSON.stringify({ success: true, resultImage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Virtual try-on error:", error);

    const msg = error instanceof Error ? error.message : "Unknown error";
    const status = msg.includes("429") || msg.includes("quota") ? 429 : 500;

    return new Response(
      JSON.stringify({ error: msg }),
      { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
