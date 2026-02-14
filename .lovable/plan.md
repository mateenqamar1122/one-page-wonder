

# Use Your Own Gemini 2.5 Flash Image for Virtual Try-On

## Overview
Switch the virtual try-on edge function to call Google's Gemini API directly using your existing `GEMINI_API_KEY`, with the `gemini-2.5-flash-preview-0514` model (the image-generation variant).

## Changes

### 1. Update Edge Function (`supabase/functions/virtual-try-on/index.ts`)

- Replace the Hugging Face API call with a call to `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-0514:generateContent`
- Use your `GEMINI_API_KEY` (already configured) instead of `HF_TOKEN`
- Send the user's photo as inline base64 data with `inlineData` format
- Enable image generation via `responseModalities: ["TEXT", "IMAGE"]`
- Extract the generated image from the response's `inlineData` parts
- Remove the manual binary conversion code (no longer needed)
- Keep existing error handling patterns for 429/402

### 2. Request Format

```text
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-0514:generateContent?key=GEMINI_API_KEY

{
  contents: [{
    parts: [
      { text: "<category-specific prompt>" },
      { inlineData: { mimeType: "image/jpeg", data: "<base64 image>" } }
    ]
  }],
  generationConfig: {
    responseModalities: ["TEXT", "IMAGE"]
  }
}
```

### 3. Response Handling
- Parse response to find the part with `inlineData` containing the generated image
- Convert to a data URL (`data:image/png;base64,...`) and return in existing format
- No frontend changes needed -- response shape stays `{ success: true, resultImage }`

### 4. Deploy
- Redeploy the `virtual-try-on` edge function

## No Other Changes Needed
- `TryOnCanvas.tsx` and `TryOn.tsx` work as-is with the current response format

