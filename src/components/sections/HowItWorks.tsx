import { Camera, Scan, CheckCircle, ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Camera,
    title: "Capture Your Look",
    description: "Enable your camera or upload a photo. Our seamless interface makes it easy to get started in seconds.",
    accent: "01",
  },
  {
    icon: Scan,
    title: "AI Does The Magic",
    description: "Advanced AI instantly detects your face and body measurements for pixel-perfect product placement.",
    accent: "02",
  },
  {
    icon: CheckCircle,
    title: "Try Before You Buy",
    description: "Browse and virtually try on glasses, watches, or clothing. See exactly how they look on you in real-time.",
    accent: "03",
  },
  {
    icon: ShoppingCart,
    title: "Shop With Confidence",
    description: "Find your perfect fit and checkout. No more returns, no more guessing—just perfect purchases.",
    accent: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="try-on" className="py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four simple steps to transform your online shopping experience forever
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex items-center gap-8 lg:gap-16 mb-12 last:mb-0 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content Card */}
              <motion.div
                className="flex-1 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                <div className="relative bg-card border border-border rounded-3xl p-8 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                  {/* Accent Number */}
                  <span className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-primary text-primary-foreground text-lg font-bold rounded-2xl flex items-center justify-center shadow-soft">
                    {step.accent}
                  </span>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Text */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Center Timeline */}
              <motion.div
                className="hidden lg:flex flex-col items-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="w-4 h-4 rounded-full bg-primary shadow-soft" />
                {index < steps.length - 1 && (
                  <motion.div
                    className="w-0.5 h-24 bg-gradient-to-b from-primary to-primary/20"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </motion.div>

              {/* Spacer for alternating layout */}
              <div className="hidden lg:block flex-1" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/try-on"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-full shadow-elevated hover:shadow-soft hover:scale-[1.02] transition-all duration-300"
          >
            Start Your Experience
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
