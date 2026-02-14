import aviatorImage from "@/assets/products/aviator-sunglasses.jpg";
import chronographImage from "@/assets/products/chronograph-watch.jpg";
import blazerImage from "@/assets/products/urban-blazer.jpg";
import roundVintageImage from "@/assets/products/round-vintage.jpg";
import smartWatchImage from "@/assets/products/smart-watch.jpg";
import denimJacketImage from "@/assets/products/denim-jacket.jpg";
import catEyeImage from "@/assets/products/cat-eye-glasses.jpg";
import classicDressWatchImage from "@/assets/products/classic-dress-watch.jpg";
import poloShirtImage from "@/assets/products/polo-shirt.jpg";
import sportsWatchImage from "@/assets/products/sports-watch.jpg";
import woolOvercoatImage from "@/assets/products/wool-overcoat.jpg";
import wayfarerImage from "@/assets/products/wayfarer-glasses.jpg";
import bomberJacketImage from "@/assets/products/bomber-jacket.jpg";
import meshWatchImage from "@/assets/products/mesh-watch.jpg";

export interface Product {
  id: string;
  name: string;
  category: "eyewear" | "watch" | "clothing";
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tryOnAvailable: boolean;
  colors?: string[];
  sizes?: string[];
  features?: string[];
}

export const products: Product[] = [
  {
    id: "classic-aviator",
    name: "Classic Aviator",
    category: "eyewear",
    subcategory: "Sunglasses",
    price: 149,
    originalPrice: 199,
    image: aviatorImage,
    description: "Timeless aviator sunglasses with gradient lenses and a lightweight gold frame. Perfect for any occasion.",
    tryOnAvailable: true,
    colors: ["Gold", "Silver", "Black"],
    features: ["UV400 Protection", "Polarized Lenses", "Lightweight Frame"],
  },
  {
    id: "chronograph-elite",
    name: "Chronograph Elite",
    category: "watch",
    subcategory: "Luxury Watch",
    price: 299,
    image: chronographImage,
    description: "Elegant chronograph watch with a stunning blue dial and premium leather strap. Swiss-inspired precision.",
    tryOnAvailable: true,
    colors: ["Blue/Silver", "Black/Gold", "White/Rose Gold"],
    features: ["Water Resistant", "Sapphire Crystal", "Chronograph Function"],
  },
  {
    id: "urban-blazer",
    name: "Urban Blazer",
    category: "clothing",
    subcategory: "Blazer",
    price: 189,
    image: blazerImage,
    description: "Modern slim-fit blazer in navy blue. Perfect for business meetings or evening events.",
    tryOnAvailable: true,
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Slim Fit", "Two-Button Closure", "Breathable Fabric"],
  },
  {
    id: "round-vintage",
    name: "Round Vintage",
    category: "eyewear",
    subcategory: "Eyeglasses",
    price: 129,
    image: roundVintageImage,
    description: "Retro-inspired round frames with a classic tortoise shell pattern. Pairs perfectly with any style.",
    tryOnAvailable: true,
    colors: ["Tortoise", "Black", "Crystal"],
    features: ["Blue Light Filter", "Spring Hinges", "Lightweight"],
  },
  {
    id: "smart-watch-pro",
    name: "Smart Watch Pro",
    category: "watch",
    subcategory: "Smart Watch",
    price: 449,
    originalPrice: 499,
    image: smartWatchImage,
    description: "Advanced smart watch with health tracking, notifications, and a sleek minimalist design.",
    tryOnAvailable: true,
    colors: ["Black", "White", "Rose Gold"],
    features: ["Heart Rate Monitor", "GPS", "5-Day Battery Life"],
  },
  {
    id: "casual-denim-jacket",
    name: "Casual Denim Jacket",
    category: "clothing",
    subcategory: "Jacket",
    price: 159,
    image: denimJacketImage,
    description: "Classic blue denim jacket with a relaxed fit. A wardrobe essential for layering.",
    tryOnAvailable: true,
    colors: ["Light Blue", "Dark Blue", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["100% Cotton", "Button Front", "Chest Pockets"],
  },
  {
    id: "cat-eye-classic",
    name: "Cat Eye Classic",
    category: "eyewear",
    subcategory: "Eyeglasses",
    price: 139,
    image: catEyeImage,
    description: "Elegant cat eye frames in tortoise shell. A bold, feminine silhouette that commands attention.",
    tryOnAvailable: true,
    colors: ["Tortoise", "Black", "Burgundy"],
    features: ["Blue Light Filter", "Acetate Frame", "Adjustable Nose Pads"],
  },
  {
    id: "wayfarer-modern",
    name: "Wayfarer Modern",
    category: "eyewear",
    subcategory: "Eyeglasses",
    price: 119,
    image: wayfarerImage,
    description: "Iconic wayfarer-style frames in matte black. A timeless design that suits every face shape.",
    tryOnAvailable: true,
    colors: ["Matte Black", "Havana", "Crystal Clear"],
    features: ["Scratch Resistant", "Flexible Hinges", "Lightweight"],
  },
  {
    id: "classic-dress-watch",
    name: "Classic Dress Watch",
    category: "watch",
    subcategory: "Dress Watch",
    price: 259,
    image: classicDressWatchImage,
    description: "Refined dress watch with Roman numeral dial and premium leather strap. Understated elegance.",
    tryOnAvailable: true,
    colors: ["Brown/Silver", "Black/Gold", "Tan/Rose Gold"],
    features: ["Genuine Leather", "Mineral Crystal", "Japanese Movement"],
  },
  {
    id: "sports-watch-x",
    name: "Sports Watch X",
    category: "watch",
    subcategory: "Sports Watch",
    price: 349,
    originalPrice: 399,
    image: sportsWatchImage,
    description: "Rugged sports watch with digital display and shock-resistant design. Built for adventure.",
    tryOnAvailable: true,
    colors: ["Black/Orange", "Black/Green", "All Black"],
    features: ["Shock Resistant", "100m Water Resistant", "Stopwatch"],
  },
  {
    id: "mesh-minimalist",
    name: "Mesh Minimalist",
    category: "watch",
    subcategory: "Minimalist Watch",
    price: 199,
    image: meshWatchImage,
    description: "Ultra-slim minimalist watch with silver mesh strap. Clean lines for the modern professional.",
    tryOnAvailable: true,
    colors: ["Silver", "Gold", "Rose Gold"],
    features: ["Ultra Slim 6mm", "Mesh Strap", "Hardened Glass"],
  },
  {
    id: "polo-classic",
    name: "Classic Polo",
    category: "clothing",
    subcategory: "Polo Shirt",
    price: 79,
    image: poloShirtImage,
    description: "Premium cotton polo shirt in rich burgundy. Smart-casual style for everyday versatility.",
    tryOnAvailable: true,
    colors: ["Burgundy", "Navy", "White", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: ["100% Pima Cotton", "Ribbed Collar", "Regular Fit"],
  },
  {
    id: "wool-overcoat",
    name: "Wool Overcoat",
    category: "clothing",
    subcategory: "Coat",
    price: 349,
    originalPrice: 429,
    image: woolOvercoatImage,
    description: "Luxurious double-breasted overcoat in camel. Premium wool blend for warmth and sophistication.",
    tryOnAvailable: true,
    colors: ["Camel", "Charcoal", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    features: ["Wool Blend", "Double-Breasted", "Notch Lapel"],
  },
  {
    id: "leather-bomber",
    name: "Leather Bomber",
    category: "clothing",
    subcategory: "Jacket",
    price: 279,
    image: bomberJacketImage,
    description: "Classic leather bomber jacket in jet black. Timeless style meets rugged durability.",
    tryOnAvailable: true,
    colors: ["Black", "Brown", "Dark Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Genuine Leather", "Zip Front", "Ribbed Cuffs"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
};
