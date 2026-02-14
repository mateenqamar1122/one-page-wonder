import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Check, Glasses, Watch, Shirt, Star } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-tryon.jpg";

const HeroSection = () => {
  const features = [
    "Glasses",
    "Watches", 
    "Clothing",
    "AI-Powered",
    "Real-time Preview",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-secondary via-background to-secondary/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Virtual Try-On Technology
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Try before
              <br />
              you buy
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your shopping experience should be more than browsing. 
              VirtuWear gives you the tools to shop with confidence.
            </motion.p>

            {/* Social Proof */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-primary-foreground text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-semibold text-foreground">10,000+</span> shoppers using 
                <br />VirtuWear to find their perfect fit.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/try-on">
                <Button variant="hero" size="lg" className="rounded-full px-8 gap-2">
                  <Camera className="h-5 w-5" />
                  Start Try-On Free
                </Button>
              </Link>
            </motion.div>

            {/* Features Row */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
                >
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial Card */}
            <motion.div
              className="mt-10 p-5 bg-card rounded-2xl border border-border shadow-card max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                  SK
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Sarah Kim</p>
                  <p className="text-xs text-muted-foreground">@sarahkim_style</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I can't believe how simple it is to try on glasses with VirtuWear. So many features 
                out of the box and an amazing experience behind it. 
                <span className="text-primary"> No more returns!</span> 🎉
              </p>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-card rounded-3xl shadow-elevated overflow-hidden border border-border">
                {/* Header Bar */}
                <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-background rounded-full text-xs font-medium text-muted-foreground">
                      <Glasses className="h-3.5 w-3.5" />
                      VIRTUWEAR
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-right mb-4">
                    <p className="font-display text-2xl font-semibold text-foreground">WELCOME, JANE</p>
                    <p className="text-sm text-muted-foreground">Explore your new look.</p>
                  </div>
                  
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={heroImage}
                      alt="Virtual Try-On Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info Overlay */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Classic Aviator</p>
                      <p className="text-sm text-primary font-bold">$149</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Glasses className="h-4 w-4 text-primary" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Watch className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Shirt className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -left-6 top-1/3 bg-card p-4 rounded-xl shadow-card border border-border hidden lg:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">Live Camera</p>
                    <p className="text-xs text-muted-foreground">Real-time preview</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 bg-card p-4 rounded-xl shadow-card border border-border hidden lg:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">AI</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">AI Powered</p>
                    <p className="text-xs text-muted-foreground">98% accuracy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
