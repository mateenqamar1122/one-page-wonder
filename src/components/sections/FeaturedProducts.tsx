import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { products as allProducts } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const featuredIds = [
  "classic-aviator",
  "chronograph-elite",
  "urban-blazer",
  "round-vintage",
  "smart-watch-pro",
  "casual-denim-jacket",
];

const products = allProducts.filter((p) => featuredIds.includes(p.id));

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover our most popular items with virtual try-on capability
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate("/products")}>
            View All Products
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Button
                      variant="hero"
                      size="sm"
                      className="gap-2"
                      onClick={() => navigate(`/try-on?product=${product.id}`)}
                    >
                      <Camera className="h-4 w-4" />
                      Try On
                    </Button>
                  </div>
                </div>

                {/* Try-On Badge */}
                {product.tryOnAvailable && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Try-On Ready
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors duration-200 border border-border">
                  <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {product.subcategory}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
