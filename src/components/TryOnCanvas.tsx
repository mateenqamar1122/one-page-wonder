import { useState, useEffect } from "react";
import { type Product } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface TryOnCanvasProps {
  userImage: string;
  product: Product;
  onResult: (resultDataUrl: string) => void;
}

const TryOnCanvas = ({ userImage, product, onResult }: TryOnCanvasProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const processTryOn = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fnError } = await supabase.functions.invoke("virtual-try-on", {
          body: {
            userImage,
            productId: product.id,
            productName: product.name,
            productCategory: product.category,
          },
        });

        if (cancelled) return;

        if (fnError) {
          throw new Error(fnError.message || "Failed to process try-on");
        }

        if (data?.error) {
          if (data.retryAfterSeconds) {
            toast.error(`Rate limited. Please try again in ${data.retryAfterSeconds}s`);
          }
          throw new Error(data.error);
        }

        if (data?.resultImage) {
          setResultImage(data.resultImage);
          onResult(data.resultImage);
        } else {
          throw new Error("No image was generated");
        }
      } catch (e: any) {
        if (!cancelled) {
          const msg = e?.message || "Failed to generate try-on image";
          setError(msg);
          toast.error(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    processTryOn();
    return () => { cancelled = true; };
  }, [userImage, product, onResult]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground text-sm">AI is generating your try-on...</p>
        <p className="text-muted-foreground text-xs">This may take 10-20 seconds</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-destructive font-medium">Try-on failed</p>
        <p className="text-muted-foreground text-sm max-w-sm">{error}</p>
      </div>
    );
  }

  if (resultImage) {
    return (
      <img
        src={resultImage}
        alt="Virtual try-on result"
        className="w-full h-full object-contain"
      />
    );
  }

  return null;
};

export default TryOnCanvas;
