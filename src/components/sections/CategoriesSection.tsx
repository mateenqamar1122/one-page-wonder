import { Glasses, Watch, Shirt, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Eyewear",
    description: "Sunglasses & Prescription",
    icon: Glasses,
    count: "2,500+ styles",
    gradient: "from-primary to-accent",
  },
  {
    name: "Watches",
    description: "Luxury & Smart Watches",
    icon: Watch,
    count: "1,800+ styles",
    gradient: "from-accent to-primary",
  },
  {
    name: "Clothing",
    description: "Fashion & Apparel",
    icon: Shirt,
    count: "15,000+ styles",
    gradient: "from-primary/80 to-accent/80",
  },
];

const CategoriesSection = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection and try on any product virtually before you buy
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href="#"
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className="relative w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                <category.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{category.count}</span>
                <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
