import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Camera, ShoppingBag, Sparkles, Smartphone, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Camera,
    title: "Virtual Try-On",
    description:
      "Use your camera to see how products look on you in real-time. No downloads or apps required — it works right in your browser.",
    accent: "from-primary to-accent",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Fitting",
    description:
      "Our advanced AI analyzes your photo and overlays products with realistic scaling and positioning for an accurate preview.",
    accent: "from-accent to-primary",
  },
  {
    icon: Smartphone,
    title: "Works on Any Device",
    description:
      "Whether you're on desktop, tablet, or phone, VirtuWear delivers a seamless try-on experience across all devices.",
    accent: "from-primary to-accent",
  },
  {
    icon: ShoppingBag,
    title: "Shop with Confidence",
    description:
      "See it before you buy it. Reduce returns and make better purchasing decisions with our virtual preview technology.",
    accent: "from-accent to-primary",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your photos are processed locally and never stored on our servers. Your privacy is our top priority.",
    accent: "from-primary to-accent",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get real-time try-on results with zero wait time. Our optimized pipeline delivers instant visual feedback.",
    accent: "from-accent to-primary",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-primary">
                Why VirtuWear
              </span>
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              The Future of <br />
              <span className="text-gradient">Online Shopping</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience cutting-edge technology that bridges the gap between
              online browsing and in-store trying.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <div
                  key={index}
                  className={`group relative rounded-3xl border border-border bg-card p-8 md:p-10 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-in-up ${
                    isLarge ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient accent line */}
                  <div
                    className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Number */}
                  <span className="text-7xl font-bold text-muted/30 font-display absolute top-4 right-6 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p
                    className={`text-muted-foreground leading-relaxed ${
                      isLarge ? "text-base" : "text-sm"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {isLarge && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-secondary border-2 border-card"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Loved by 10,000+ shoppers
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <Link
              to="/try-on"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-full shadow-elevated hover:shadow-soft hover:scale-[1.02] transition-all duration-300"
            >
              Try It Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
