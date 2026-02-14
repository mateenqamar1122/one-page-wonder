import { useState, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getProductById, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import TryOnCanvas from "@/components/TryOnCanvas";
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  ShoppingBag, 
  ArrowLeft,
  ImageIcon,
  X,
  Check
} from "lucide-react";
import { toast } from "sonner";

const TryOn = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const selectedProduct = productId ? getProductById(productId) : null;
  
  const [activeProduct, setActiveProduct] = useState(selectedProduct || products[0]);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { addToCart } = useCart();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setTryOnResult(null);
        setShowTryOn(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async (mode: "user" | "environment" = facingMode) => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        streamRef.current = stream;
        setIsCameraActive(true);
        setFacingMode(mode);
        setTryOnResult(null);
        setShowTryOn(false);
        toast.success("Camera is live! Position yourself and capture when ready.");
      }
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        toast.error("Camera access denied. Please allow camera permissions.");
      } else if (error.name === "NotFoundError") {
        toast.error("No camera found.");
      } else {
        toast.error("Could not access camera.");
      }
    }
  };

  const toggleCamera = () => {
    startCamera(facingMode === "user" ? "environment" : "user");
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/jpeg", 0.8);
      setUserImage(imageData);
      stopCamera();
      setTryOnResult(null);
      setShowTryOn(false);
    }
  };

  const handleTryOn = useCallback(() => {
    if (!userImage) {
      toast.error("Please upload or capture a photo first");
      return;
    }
    setShowTryOn(true);
  }, [userImage]);

  const handleTryOnResult = useCallback((resultDataUrl: string) => {
    setTryOnResult(resultDataUrl);
  }, []);

  const handleAddToCart = () => {
    addToCart(activeProduct);
    toast.success(`${activeProduct.name} added to cart!`);
  };

  const resetTryOn = () => {
    setUserImage(null);
    setTryOnResult(null);
    setShowTryOn(false);
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Try-On Area */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl border border-border overflow-hidden">
                {/* Main Preview Area */}
                <div className="aspect-[4/3] bg-muted relative flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`absolute inset-0 w-full h-full object-cover ${facingMode === "user" ? "mirror-video" : ""} ${isCameraActive ? 'block' : 'hidden'}`}
                  />
                  {isCameraActive ? (
                    <>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                        <Button variant="hero" size="lg" onClick={capturePhoto} className="gap-2 rounded-full shadow-elevated">
                          <Camera className="h-5 w-5" />
                          Capture Photo
                        </Button>
                        <Button variant="outline" size="lg" onClick={toggleCamera} className="gap-2 rounded-full bg-card/80 backdrop-blur-sm border-border">
                          <RefreshCw className="h-5 w-5" />
                          Flip
                        </Button>
                        <Button variant="outline" size="lg" onClick={stopCamera} className="gap-2 rounded-full bg-card/80 backdrop-blur-sm border-border">
                          <X className="h-5 w-5" />
                          Cancel
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-card/80 backdrop-blur-sm rounded-full border border-border">
                        <div className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-foreground">LIVE</span>
                      </div>
                    </>
                  ) : showTryOn && userImage ? (
                    <TryOnCanvas
                      userImage={userImage}
                      product={activeProduct}
                      onResult={handleTryOnResult}
                    />
                  ) : userImage ? (
                    <div className="w-full h-full relative">
                      <img src={userImage} alt="Your Photo" className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary shadow-elevated bg-card/80 backdrop-blur-sm">
                        <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-primary/90 text-primary-foreground text-[10px] font-medium text-center py-0.5">
                          {activeProduct.name}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Upload Your Photo</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Take a photo or upload an image to see how the product looks on you
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="p-6 border-t border-border">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {!isCameraActive && (
                      <>
                        <Button variant="outline" size="lg" onClick={() => startCamera()} >
                          <Camera className="h-5 w-5 mr-2" />
                          Use Camera
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Photo
                        </Button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </>
                    )}
                    
                    {userImage && !isCameraActive && (
                      <>
                        <Button variant="hero" size="lg" onClick={handleTryOn}>
                          <Check className="h-5 w-5 mr-2" />
                          Try On Product
                        </Button>
                        <Button variant="ghost" size="lg" onClick={resetTryOn}>
                          <RefreshCw className="h-5 w-5 mr-2" />
                          Reset
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Product Selection Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Selected Product</h3>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                    <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-primary uppercase">{activeProduct.subcategory}</span>
                    <h4 className="font-semibold text-foreground truncate">{activeProduct.name}</h4>
                    <p className="text-lg font-bold text-primary mt-1">${activeProduct.price}</p>
                  </div>
                </div>
                <Button variant="default" className="w-full mt-4 gap-2" onClick={handleAddToCart}>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Try Other Products</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {products
                    .filter((p) => p.id !== activeProduct.id)
                    .map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          setActiveProduct(product);
                          setTryOnResult(null);
                          setShowTryOn(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                      >
                        <div className="w-14 h-14 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate text-sm">{product.name}</p>
                          <p className="text-primary font-semibold text-sm">${product.price}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TryOn;
