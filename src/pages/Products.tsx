import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/lib/products";
import { Heart, Camera, Filter } from "lucide-react";

const categories = [
  { id: "all", name: "All Products" },
  { id: "eyewear", name: "Eyewear" },
  { id: "watch", name: "Watches" },
  { id: "clothing", name: "Clothing" },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Shop All Products
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our collection of premium eyewear, watches, and clothing. 
              All products feature our virtual try-on technology.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Link to={`/try-on?product=${product.id}`}>
              <Button variant="hero" size="sm" className="gap-2">
                <Camera className="h-4 w-4" />
                Try On
              </Button>
            </Link>
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
      </Link>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {product.subcategory}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Link to={`/product/${product.id}`}>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
