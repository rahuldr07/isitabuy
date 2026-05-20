/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Brain,
  ChevronDown,
  Grid2X2,
  Heart,
  Home,
  Laptop,
  ShieldCheck,
  ShoppingBag,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy,
  User,
  Utensils,
  Zap,
} from "lucide-react";

import DealsSearchForm from "@/components/deals/deals-search-form";
import PriceRangeFilter from "@/components/deals/price-range-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Today's Best Deals - Happy",
  description: "Hand-picked Happy deals with retailer filters and price checks.",
};

type DealBadge = "Historical Low" | "Price Drop" | "Limited Time" | "Buy One Get One" | "Promo Code";
type DealTypeSlug = "historical-low" | "limited-time" | "price-drop" | "bogo" | "promo-code";
type RetailerSlug =
  | "amazon"
  | "walmart"
  | "best-buy"
  | "target"
  | "flipkart"
  | "myntra"
  | "meesho"
  | "ebay"
  | "home-depot";
type CategorySlug =
  | "electronics"
  | "home"
  | "beauty"
  | "fashion"
  | "kitchen"
  | "gaming"
  | "sports"
  | "automotive"
  | "office";
type BrandSlug = string;
type BrandFilterGroupKey = CategorySlug | "all";

interface DealCardData {
  name: string;
  subtitle: string;
  brand: BrandSlug;
  category: CategorySlug;
  dealType: DealTypeSlug;
  retailer: string;
  rating: string;
  reviews: string;
  price: string;
  oldPrice: string;
  discount: string;
  score: string;
  badge: DealBadge;
  image: string;
  savedBy: string;
  timer?: string;
}

interface DealSeed {
  name: string;
  subtitle: string;
  brand: BrandSlug;
  price: string;
  oldPrice: string;
  image: string;
  discount?: string;
  retailer?: string;
}

const navItems = [
  { label: "All Deals", href: "/deals", slug: null, icon: Sparkles },
  { label: "Electronics", href: "/deals?category=electronics", slug: "electronics", icon: Laptop },
  { label: "Home", href: "/deals?category=home", slug: "home", icon: Home },
  { label: "Beauty", href: "/deals?category=beauty", slug: "beauty", icon: Sparkles },
  { label: "Fashion", href: "/deals?category=fashion", slug: "fashion", icon: Shirt },
  { label: "Kitchen", href: "/deals?category=kitchen", slug: "kitchen", icon: Utensils },
  { label: "Gaming", href: "/deals?category=gaming", slug: "gaming", icon: Trophy },
  { label: "Sports", href: "/deals?category=sports", slug: "sports", icon: Trophy },
  { label: "Automotive", href: "/deals?category=automotive", slug: "automotive", icon: SlidersHorizontal },
  { label: "Office", href: "/deals?category=office", slug: "office", icon: Laptop },
] satisfies Array<{ label: string; href: string; slug: CategorySlug | null; icon: LucideIcon }>;

const brandFiltersByCategory = {
  all: [
    { label: "Apple", slug: "apple", count: "3.4k", logo: "A", logoClass: "bg-[#f3f4f6] text-[#111827]" },
    { label: "Samsung", slug: "samsung", count: "2.9k", logo: "S", logoClass: "bg-[#1428a0] text-white" },
    { label: "Sony", slug: "sony", count: "2.8k", logo: "S", logoClass: "bg-[#111827] text-white" },
    { label: "Nike", slug: "nike", count: "2.6k", logo: "N", logoClass: "bg-[#111827] text-white" },
    { label: "Dyson", slug: "dyson", count: "1.1k", logo: "D", logoClass: "bg-[#111827] text-white" },
    { label: "KitchenAid", slug: "kitchenaid", count: "1.4k", logo: "K", logoClass: "bg-[#dc2626] text-white" },
    { label: "L'Oreal", slug: "loreal", count: "2.3k", logo: "L", logoClass: "bg-[#111827] text-white" },
    { label: "PlayStation", slug: "playstation", count: "1.8k", logo: "PS", logoClass: "bg-[#00439c] text-white" },
    { label: "Toyota", slug: "toyota", count: "1.9k", logo: "T", logoClass: "bg-[#eb0a1e] text-white" },
    { label: "HP", slug: "hp", count: "1.7k", logo: "hp", logoClass: "bg-[#0096d6] text-white" },
  ],
  electronics: [
    { label: "Apple", slug: "apple", count: "3.4k", logo: "A", logoClass: "bg-[#f3f4f6] text-[#111827]" },
    { label: "Samsung", slug: "samsung", count: "2.9k", logo: "S", logoClass: "bg-[#1428a0] text-white" },
    { label: "Sony", slug: "sony", count: "2.8k", logo: "S", logoClass: "bg-[#111827] text-white" },
    { label: "LG", slug: "lg", count: "2.2k", logo: "LG", logoClass: "bg-[#a50034] text-white" },
    { label: "Dell", slug: "dell", count: "1.9k", logo: "D", logoClass: "bg-[#0076ce] text-white" },
    { label: "HP", slug: "hp", count: "1.7k", logo: "hp", logoClass: "bg-[#0096d6] text-white" },
    { label: "Lenovo", slug: "lenovo", count: "1.5k", logo: "L", logoClass: "bg-[#e2231a] text-white" },
    { label: "Bose", slug: "bose", count: "980", logo: "B", logoClass: "bg-[#111827] text-white" },
    { label: "JBL", slug: "jbl", count: "910", logo: "J", logoClass: "bg-[#ff5f00] text-white" },
    { label: "Logitech", slug: "logitech", count: "1.2k", logo: "L", logoClass: "bg-[#00b8a9] text-white" },
  ],
  home: [
    { label: "Dyson", slug: "dyson", count: "1.1k", logo: "D", logoClass: "bg-[#111827] text-white" },
    { label: "Shark", slug: "shark", count: "1.4k", logo: "S", logoClass: "bg-[#0f172a] text-white" },
    { label: "Bissell", slug: "bissell", count: "940", logo: "B", logoClass: "bg-[#b91c1c] text-white" },
    { label: "iRobot", slug: "irobot", count: "820", logo: "iR", logoClass: "bg-[#111827] text-white" },
    { label: "Hoover", slug: "hoover", count: "760", logo: "H", logoClass: "bg-[#dc2626] text-white" },
    { label: "Philips", slug: "philips", count: "1.5k", logo: "P", logoClass: "bg-[#0b5ed7] text-white" },
    { label: "Black+Decker", slug: "black-decker", count: "720", logo: "BD", logoClass: "bg-[#f97316] text-white" },
    { label: "LG", slug: "lg", count: "2.2k", logo: "LG", logoClass: "bg-[#a50034] text-white" },
    { label: "Samsung", slug: "samsung", count: "2.9k", logo: "S", logoClass: "bg-[#1428a0] text-white" },
    { label: "Eureka", slug: "eureka", count: "610", logo: "E", logoClass: "bg-[#2563eb] text-white" },
  ],
  beauty: [
    { label: "L'Oreal", slug: "loreal", count: "2.3k", logo: "L", logoClass: "bg-[#111827] text-white" },
    { label: "Maybelline", slug: "maybelline", count: "1.9k", logo: "M", logoClass: "bg-[#111827] text-white" },
    { label: "Dove", slug: "dove", count: "1.6k", logo: "D", logoClass: "bg-[#2563eb] text-white" },
    { label: "Olay", slug: "olay", count: "1.3k", logo: "O", logoClass: "bg-[#c026d3] text-white" },
    { label: "Neutrogena", slug: "neutrogena", count: "1.2k", logo: "N", logoClass: "bg-[#0f766e] text-white" },
    { label: "CeraVe", slug: "cerave", count: "1.1k", logo: "C", logoClass: "bg-[#0b5ed7] text-white" },
    { label: "Nivea", slug: "nivea", count: "970", logo: "N", logoClass: "bg-[#001f70] text-white" },
    { label: "Sephora", slug: "sephora", count: "940", logo: "S", logoClass: "bg-[#111827] text-white" },
    { label: "MAC", slug: "mac", count: "880", logo: "M", logoClass: "bg-[#111827] text-white" },
    { label: "Lakme", slug: "lakme", count: "760", logo: "L", logoClass: "bg-[#ec4899] text-white" },
  ],
  fashion: [
    { label: "Nike", slug: "nike", count: "2.6k", logo: "N", logoClass: "bg-[#111827] text-white" },
    { label: "Zara", slug: "zara", count: "2.4k", logo: "Z", logoClass: "bg-[#111827] text-white" },
    { label: "H&M", slug: "hm", count: "2.2k", logo: "H", logoClass: "bg-[#e50010] text-white" },
    { label: "Adidas", slug: "adidas", count: "2.1k", logo: "A", logoClass: "bg-[#111827] text-white" },
    { label: "Uniqlo", slug: "uniqlo", count: "1.8k", logo: "U", logoClass: "bg-[#e60012] text-white" },
    { label: "Levi's", slug: "levis", count: "1.4k", logo: "L", logoClass: "bg-[#c41230] text-white" },
    { label: "Louis Vuitton", slug: "louis-vuitton", count: "1.3k", logo: "LV", logoClass: "bg-[#5b4636] text-white" },
    { label: "Gucci", slug: "gucci", count: "1.2k", logo: "G", logoClass: "bg-[#0f5132] text-white" },
    { label: "Shein", slug: "shein", count: "1.1k", logo: "S", logoClass: "bg-[#111827] text-white" },
    { label: "Puma", slug: "puma", count: "980", logo: "P", logoClass: "bg-[#111827] text-white" },
  ],
  kitchen: [
    { label: "KitchenAid", slug: "kitchenaid", count: "1.4k", logo: "K", logoClass: "bg-[#dc2626] text-white" },
    { label: "Bosch", slug: "bosch", count: "1.3k", logo: "B", logoClass: "bg-[#d71920] text-white" },
    { label: "Whirlpool", slug: "whirlpool", count: "1.2k", logo: "W", logoClass: "bg-[#f59e0b] text-white" },
    { label: "Samsung", slug: "samsung", count: "2.9k", logo: "S", logoClass: "bg-[#1428a0] text-white" },
    { label: "LG", slug: "lg", count: "2.2k", logo: "LG", logoClass: "bg-[#a50034] text-white" },
    { label: "GE", slug: "ge", count: "1.1k", logo: "GE", logoClass: "bg-[#2563eb] text-white" },
    { label: "Ninja", slug: "ninja", count: "2.2k", logo: "N", logoClass: "bg-[#16a34a] text-white" },
    { label: "Instant Pot", slug: "instant-pot", count: "1.6k", logo: "IP", logoClass: "bg-[#dc2626] text-white" },
    { label: "Cuisinart", slug: "cuisinart", count: "980", logo: "C", logoClass: "bg-[#111827] text-white" },
    { label: "Breville", slug: "breville", count: "900", logo: "B", logoClass: "bg-[#64748b] text-white" },
  ],
  gaming: [
    { label: "PlayStation", slug: "playstation", count: "1.8k", logo: "PS", logoClass: "bg-[#00439c] text-white" },
    { label: "Xbox", slug: "xbox", count: "1.7k", logo: "X", logoClass: "bg-[#107c10] text-white" },
    { label: "Nintendo", slug: "nintendo", count: "1.6k", logo: "N", logoClass: "bg-[#e60012] text-white" },
    { label: "Razer", slug: "razer", count: "1.4k", logo: "R", logoClass: "bg-[#44d62c] text-[#111827]" },
    { label: "Logitech", slug: "logitech", count: "1.2k", logo: "L", logoClass: "bg-[#00b8a9] text-white" },
    { label: "ASUS", slug: "asus", count: "1.1k", logo: "A", logoClass: "bg-[#111827] text-white" },
    { label: "MSI", slug: "msi", count: "980", logo: "M", logoClass: "bg-[#dc2626] text-white" },
    { label: "Corsair", slug: "corsair", count: "920", logo: "C", logoClass: "bg-[#fbbf24] text-[#111827]" },
    { label: "SteelSeries", slug: "steelseries", count: "860", logo: "SS", logoClass: "bg-[#ff5200] text-white" },
    { label: "Alienware", slug: "alienware", count: "790", logo: "A", logoClass: "bg-[#7c3aed] text-white" },
  ],
  sports: [
    { label: "Nike", slug: "nike", count: "2.6k", logo: "N", logoClass: "bg-[#111827] text-white" },
    { label: "Adidas", slug: "adidas", count: "2.1k", logo: "A", logoClass: "bg-[#111827] text-white" },
    { label: "Puma", slug: "puma", count: "980", logo: "P", logoClass: "bg-[#111827] text-white" },
    { label: "Under Armour", slug: "under-armour", count: "940", logo: "UA", logoClass: "bg-[#111827] text-white" },
    { label: "Wilson", slug: "wilson", count: "860", logo: "W", logoClass: "bg-[#dc2626] text-white" },
    { label: "Spalding", slug: "spalding", count: "800", logo: "S", logoClass: "bg-[#f97316] text-white" },
    { label: "Yonex", slug: "yonex", count: "760", logo: "Y", logoClass: "bg-[#16a34a] text-white" },
    { label: "Decathlon", slug: "decathlon", count: "1.2k", logo: "D", logoClass: "bg-[#0063c3] text-white" },
    { label: "ASICS", slug: "asics", count: "720", logo: "A", logoClass: "bg-[#004b93] text-white" },
    { label: "New Balance", slug: "new-balance", count: "700", logo: "NB", logoClass: "bg-[#dc2626] text-white" },
  ],
  automotive: [
    { label: "Ford", slug: "ford", count: "1.8k", logo: "F", logoClass: "bg-[#003478] text-white" },
    { label: "Toyota", slug: "toyota", count: "1.9k", logo: "T", logoClass: "bg-[#eb0a1e] text-white" },
    { label: "Chevrolet", slug: "chevrolet", count: "1.6k", logo: "C", logoClass: "bg-[#fbbf24] text-[#111827]" },
    { label: "Honda", slug: "honda", count: "1.5k", logo: "H", logoClass: "bg-[#cc0000] text-white" },
    { label: "Nissan", slug: "nissan", count: "1.2k", logo: "N", logoClass: "bg-[#c3002f] text-white" },
    { label: "Hyundai", slug: "hyundai", count: "1.1k", logo: "H", logoClass: "bg-[#002c5f] text-white" },
    { label: "Kia", slug: "kia", count: "1.0k", logo: "K", logoClass: "bg-[#111827] text-white" },
    { label: "BMW", slug: "bmw", count: "920", logo: "B", logoClass: "bg-[#0066b1] text-white" },
    { label: "Mercedes-Benz", slug: "mercedes-benz", count: "860", logo: "MB", logoClass: "bg-[#111827] text-white" },
    { label: "Tesla", slug: "tesla", count: "820", logo: "T", logoClass: "bg-[#cc0000] text-white" },
  ],
  office: [
    { label: "HP", slug: "hp", count: "1.7k", logo: "hp", logoClass: "bg-[#0096d6] text-white" },
    { label: "Canon", slug: "canon", count: "1.3k", logo: "C", logoClass: "bg-[#cc0000] text-white" },
    { label: "Epson", slug: "epson", count: "1.1k", logo: "E", logoClass: "bg-[#003399] text-white" },
    { label: "Brother", slug: "brother", count: "1.0k", logo: "B", logoClass: "bg-[#005bac] text-white" },
    { label: "Logitech", slug: "logitech", count: "1.2k", logo: "L", logoClass: "bg-[#00b8a9] text-white" },
    { label: "Staples", slug: "staples", count: "960", logo: "S", logoClass: "bg-[#cc0000] text-white" },
    { label: "3M", slug: "3m", count: "890", logo: "3M", logoClass: "bg-[#ff0000] text-white" },
    { label: "Post-it", slug: "post-it", count: "830", logo: "P", logoClass: "bg-[#facc15] text-[#111827]" },
    { label: "Sharpie", slug: "sharpie", count: "780", logo: "S", logoClass: "bg-[#111827] text-white" },
    { label: "Fellowes", slug: "fellowes", count: "690", logo: "F", logoClass: "bg-[#0f172a] text-white" },
  ],
} satisfies Record<
  BrandFilterGroupKey,
  Array<{
  label: string;
  slug: BrandSlug;
  count: string;
  logo: string;
  logoClass: string;
  }>
>;

const validBrands = new Set<BrandSlug>(
  Object.values(brandFiltersByCategory)
    .flat()
    .map((brand) => brand.slug),
);

const retailerChips = [
  { label: "All Retailers", logo: null, logoClass: "", slug: null },
  { label: "Amazon", logo: "a", logoClass: "font-serif text-lg text-foreground", slug: "amazon" },
  { label: "Walmart", logo: "*", logoClass: "bg-[#0071ce] text-[#ffc220]", slug: "walmart" },
  { label: "Best Buy", logo: "B", logoClass: "bg-[#0046be] text-white", slug: "best-buy" },
  { label: "Target", logo: "T", logoClass: "bg-[#cc0000] text-white", slug: "target" },
  { label: "eBay", logo: "e", logoClass: "text-[#e53238]", slug: "ebay" },
  { label: "Home Depot", logo: "H", logoClass: "bg-[#f96302] text-white", slug: "home-depot" },
] satisfies Array<{
  label: string;
  logo: string | null;
  logoClass: string;
  slug: RetailerSlug | null;
}>;

const retailerFilters = [
  { label: "Amazon", logo: "a", logoClass: "bg-white font-serif text-xl text-foreground", slug: "amazon" },
  { label: "Best Buy", logo: "B", logoClass: "bg-[#0046be] text-white", slug: "best-buy" },
  { label: "Walmart", logo: "*", logoClass: "bg-[#0071ce] text-[#ffc220]", slug: "walmart" },
  { label: "Flipkart", logo: "F", logoClass: "bg-[#ffe500] text-[#2874f0]", slug: "flipkart" },
  {
    label: "Myntra",
    logo: "M",
    logoClass: "bg-gradient-to-br from-[#f13ab1] via-[#ff6b00] to-[#f4c430] text-white",
    slug: "myntra",
  },
  { label: "Meesho", logo: "m", logoClass: "bg-[#7b2cbf] text-[#ff4fa3]", slug: "meesho" },
] satisfies Array<{ label: string; logo: string; logoClass: string; slug: RetailerSlug }>;

const dealTypes = [
  { label: "Historical Low", slug: "historical-low", count: "8.2k" },
  { label: "Limited Time Deal", slug: "limited-time", count: "6.1k" },
  { label: "Price Drop", slug: "price-drop", count: "10.4k" },
  { label: "Buy One Get One", slug: "bogo", count: "1.2k" },
  { label: "Promo Code", slug: "promo-code", count: "2.0k" },
] satisfies Array<{ label: string; slug: DealTypeSlug; count: string }>;

const validDealTypes = new Set<DealTypeSlug>([
  "historical-low",
  "limited-time",
  "price-drop",
  "bogo",
  "promo-code",
]);

const validRetailers = new Set<RetailerSlug>([
  "amazon",
  "walmart",
  "best-buy",
  "target",
  "flipkart",
  "myntra",
  "meesho",
  "ebay",
  "home-depot",
]);

const dealTypeCycle: Array<{ badge: DealBadge; dealType: DealTypeSlug }> = [
  { badge: "Historical Low", dealType: "historical-low" },
  { badge: "Price Drop", dealType: "price-drop" },
  { badge: "Limited Time", dealType: "limited-time" },
  { badge: "Buy One Get One", dealType: "bogo" },
  { badge: "Promo Code", dealType: "promo-code" },
];

const retailerCycle = ["Amazon", "Walmart", "Best Buy", "Target", "eBay", "Home Depot"];

const referenceProductSeeds: Record<CategorySlug, DealSeed[]> = {
  electronics: [
    {
      name: "Sony WH-1000XM5",
      subtitle: "Wireless Noise Cancelling Headphones",
      brand: "sony",
      price: "$299.99",
      oldPrice: "$399.99",
      image:
        "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Amazon",
    },
    {
      name: "Apple AirPods Pro 2",
      subtitle: "Wireless Earbuds",
      brand: "apple",
      price: "$189.00",
      oldPrice: "$249.00",
      image:
        "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Walmart",
    },
    {
      name: 'Samsung 55" CU7000 4K',
      subtitle: "Crystal UHD Smart TV",
      brand: "samsung",
      price: "$379.99",
      oldPrice: "$499.99",
      image:
        "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Best Buy",
    },
    {
      name: "Apple Watch Series 9",
      subtitle: "GPS 45mm Smartwatch",
      brand: "apple",
      price: "$349.00",
      oldPrice: "$449.00",
      image:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Sony WH-CH720N",
      subtitle: "Wireless Headphones",
      brand: "sony",
      price: "$98.00",
      oldPrice: "$119.00",
      image:
        "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "LG UltraGear 27GP850",
      subtitle: "27-inch QHD Gaming Monitor",
      brand: "lg",
      price: "$299.99",
      oldPrice: "$399.99",
      image:
        "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Dell XPS 13",
      subtitle: "13-inch Premium Laptop",
      brand: "dell",
      price: "$899.00",
      oldPrice: "$1,099.00",
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "HP Envy x360",
      subtitle: "Convertible Touch Laptop",
      brand: "hp",
      price: "$699.99",
      oldPrice: "$899.99",
      image:
        "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Lenovo IdeaPad Slim 5",
      subtitle: "Lightweight Productivity Laptop",
      brand: "lenovo",
      price: "$579.99",
      oldPrice: "$749.99",
      image:
        "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Bose QuietComfort Ultra",
      subtitle: "Noise Cancelling Headphones",
      brand: "bose",
      price: "$329.00",
      oldPrice: "$429.00",
      image:
        "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "JBL Flip 6",
      subtitle: "Portable Bluetooth Speaker",
      brand: "jbl",
      price: "$89.95",
      oldPrice: "$129.95",
      image:
        "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Logitech MX Master 3S",
      subtitle: "Wireless Performance Mouse",
      brand: "logitech",
      price: "$84.99",
      oldPrice: "$99.99",
      image:
        "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  home: [
    {
      name: "Dyson V15 Detect",
      subtitle: "Cordless Vacuum Cleaner",
      brand: "dyson",
      price: "$549.00",
      oldPrice: "$649.00",
      image:
        "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Walmart",
    },
    {
      name: "Shark Stratos Cordless",
      subtitle: "Stick Vacuum Cleaner",
      brand: "shark",
      price: "$299.99",
      oldPrice: "$399.99",
      image:
        "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Bissell Little Green",
      subtitle: "Portable Carpet Cleaner",
      brand: "bissell",
      price: "$99.99",
      oldPrice: "$123.59",
      image:
        "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "iRobot Roomba j7",
      subtitle: "Smart Robot Vacuum",
      brand: "irobot",
      price: "$399.00",
      oldPrice: "$599.00",
      image:
        "https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Hoover CleanSlate",
      subtitle: "Spot Cleaner",
      brand: "hoover",
      price: "$89.99",
      oldPrice: "$129.99",
      image:
        "https://images.pexels.com/photos/4107277/pexels-photo-4107277.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Philips Hue Starter Kit",
      subtitle: "Smart Light Bulb Set",
      brand: "philips",
      price: "$129.99",
      oldPrice: "$179.99",
      image:
        "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Black+Decker Dustbuster",
      subtitle: "Handheld Vacuum",
      brand: "black-decker",
      price: "$49.99",
      oldPrice: "$69.99",
      image:
        "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "LG PuriCare 360",
      subtitle: "Air Purifier",
      brand: "lg",
      price: "$399.00",
      oldPrice: "$549.00",
      image:
        "https://images.pexels.com/photos/4108724/pexels-photo-4108724.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Samsung Jet Bot AI+",
      subtitle: "Robot Vacuum",
      brand: "samsung",
      price: "$699.99",
      oldPrice: "$999.99",
      image:
        "https://images.pexels.com/photos/4239131/pexels-photo-4239131.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Eureka RapidClean Pro",
      subtitle: "Cordless Stick Vacuum",
      brand: "eureka",
      price: "$119.99",
      oldPrice: "$179.99",
      image:
        "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Dyson Purifier Cool",
      subtitle: "Air Purifier Fan",
      brand: "dyson",
      price: "$429.99",
      oldPrice: "$549.99",
      image:
        "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Shark Steam Mop",
      subtitle: "Hard Floor Steam Cleaner",
      brand: "shark",
      price: "$69.99",
      oldPrice: "$99.99",
      image:
        "https://images.pexels.com/photos/4107287/pexels-photo-4107287.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  beauty: [
    {
      name: "L'Oreal Revitalift Serum",
      subtitle: "Hyaluronic Acid Face Serum",
      brand: "loreal",
      price: "$19.99",
      oldPrice: "$29.99",
      image:
        "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Maybelline Fit Me Foundation",
      subtitle: "Matte Liquid Foundation",
      brand: "maybelline",
      price: "$7.99",
      oldPrice: "$10.99",
      image:
        "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Dove Beauty Bar 8-Pack",
      subtitle: "Moisturizing Cleansing Bar",
      brand: "dove",
      price: "$10.99",
      oldPrice: "$14.99",
      image:
        "https://images.pexels.com/photos/6621337/pexels-photo-6621337.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Olay Regenerist Cream",
      subtitle: "Anti-Aging Face Moisturizer",
      brand: "olay",
      price: "$24.99",
      oldPrice: "$34.99",
      image:
        "https://images.pexels.com/photos/3762869/pexels-photo-3762869.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Neutrogena Hydro Boost",
      subtitle: "Water Gel Moisturizer",
      brand: "neutrogena",
      price: "$16.99",
      oldPrice: "$24.99",
      image:
        "https://images.pexels.com/photos/6621467/pexels-photo-6621467.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "CeraVe Hydrating Cleanser",
      subtitle: "Daily Facial Cleanser",
      brand: "cerave",
      price: "$13.99",
      oldPrice: "$18.99",
      image:
        "https://images.pexels.com/photos/6621353/pexels-photo-6621353.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Nivea Body Lotion",
      subtitle: "Deep Moisture Lotion",
      brand: "nivea",
      price: "$8.99",
      oldPrice: "$12.99",
      image:
        "https://images.pexels.com/photos/6621322/pexels-photo-6621322.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Sephora Lip Stories",
      subtitle: "Cream Lipstick",
      brand: "sephora",
      price: "$6.00",
      oldPrice: "$10.00",
      image:
        "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "MAC Studio Fix Powder",
      subtitle: "Pressed Powder Foundation",
      brand: "mac",
      price: "$31.00",
      oldPrice: "$39.00",
      image:
        "https://images.pexels.com/photos/3373747/pexels-photo-3373747.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Lakme Eyeconic Kajal",
      subtitle: "Smudge-Proof Eye Pencil",
      brand: "lakme",
      price: "$4.99",
      oldPrice: "$7.99",
      image:
        "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "L'Oreal Paris Mascara",
      subtitle: "Voluminous Lash Mascara",
      brand: "loreal",
      price: "$8.99",
      oldPrice: "$13.99",
      image:
        "https://images.pexels.com/photos/3373744/pexels-photo-3373744.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Maybelline SuperStay Ink",
      subtitle: "Longwear Liquid Lipstick",
      brand: "maybelline",
      price: "$6.99",
      oldPrice: "$11.99",
      image:
        "https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  fashion: [
    {
      name: "Nike Air Max 270",
      subtitle: "Lifestyle Running Shoes",
      brand: "nike",
      price: "$119.99",
      oldPrice: "$160.00",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Zara Oversized Blazer",
      subtitle: "Tailored Fashion Jacket",
      brand: "zara",
      price: "$69.90",
      oldPrice: "$99.90",
      image:
        "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "H&M Cotton Hoodie",
      subtitle: "Everyday Pullover Hoodie",
      brand: "hm",
      price: "$24.99",
      oldPrice: "$39.99",
      image:
        "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Adidas Ultraboost Light",
      subtitle: "Performance Running Shoes",
      brand: "adidas",
      price: "$139.99",
      oldPrice: "$190.00",
      image:
        "https://images.pexels.com/photos/6540980/pexels-photo-6540980.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Uniqlo Airism Tee",
      subtitle: "Breathable Crew Neck T-Shirt",
      brand: "uniqlo",
      price: "$14.90",
      oldPrice: "$19.90",
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Levi's 511 Slim Jeans",
      subtitle: "Stretch Denim Jeans",
      brand: "levis",
      price: "$49.99",
      oldPrice: "$79.50",
      image:
        "https://images.pexels.com/photos/4210860/pexels-photo-4210860.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Louis Vuitton Card Holder",
      subtitle: "Luxury Leather Accessory",
      brand: "louis-vuitton",
      price: "$279.00",
      oldPrice: "$340.00",
      image:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Gucci Ace Sneaker",
      subtitle: "Leather Fashion Sneaker",
      brand: "gucci",
      price: "$499.00",
      oldPrice: "$620.00",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Shein Rib Knit Dress",
      subtitle: "Casual Midi Dress",
      brand: "shein",
      price: "$18.99",
      oldPrice: "$29.99",
      image:
        "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Puma Suede Classic",
      subtitle: "Low-Top Sneakers",
      brand: "puma",
      price: "$49.99",
      oldPrice: "$75.00",
      image:
        "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Nike Dri-FIT Tee",
      subtitle: "Training T-Shirt",
      brand: "nike",
      price: "$21.99",
      oldPrice: "$35.00",
      image:
        "https://images.pexels.com/photos/6311648/pexels-photo-6311648.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Adidas Essentials Pants",
      subtitle: "Track Pants",
      brand: "adidas",
      price: "$34.99",
      oldPrice: "$50.00",
      image:
        "https://images.pexels.com/photos/6311655/pexels-photo-6311655.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  kitchen: [
    {
      name: "Instant Pot Duo 7-in-1",
      subtitle: "Electric Pressure Cooker",
      brand: "instant-pot",
      price: "$69.99",
      oldPrice: "$99.99",
      image:
        "https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Amazon",
    },
    {
      name: "Ninja Air Fryer AF101",
      subtitle: "4 Qt. Air Fryer",
      brand: "ninja",
      price: "$79.99",
      oldPrice: "$99.99",
      image:
        "https://images.pexels.com/photos/6996089/pexels-photo-6996089.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Best Buy",
    },
    {
      name: "Keurig K-Elite",
      subtitle: "Single Serve Coffee Maker",
      brand: "keurig",
      price: "$89.99",
      oldPrice: "$119.99",
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500",
      retailer: "Target",
    },
    {
      name: "Ninja Blender BN701",
      subtitle: "Professional Plus Blender",
      brand: "ninja",
      price: "$89.99",
      oldPrice: "$129.99",
      image:
        "https://images.pexels.com/photos/6996089/pexels-photo-6996089.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "KitchenAid Artisan Mixer",
      subtitle: "5 Qt. Stand Mixer",
      brand: "kitchenaid",
      price: "$329.99",
      oldPrice: "$449.99",
      image:
        "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Bosch 300 Dishwasher",
      subtitle: "Quiet Built-In Dishwasher",
      brand: "bosch",
      price: "$849.00",
      oldPrice: "$999.00",
      image:
        "https://images.pexels.com/photos/5824888/pexels-photo-5824888.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Whirlpool French Door",
      subtitle: "Stainless Refrigerator",
      brand: "whirlpool",
      price: "$1,499.00",
      oldPrice: "$1,899.00",
      image:
        "https://images.pexels.com/photos/5825353/pexels-photo-5825353.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Samsung Smart Range",
      subtitle: "Convection Electric Range",
      brand: "samsung",
      price: "$799.99",
      oldPrice: "$1,099.99",
      image:
        "https://images.pexels.com/photos/5824886/pexels-photo-5824886.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "LG InstaView Microwave",
      subtitle: "Over-the-Range Microwave",
      brand: "lg",
      price: "$399.00",
      oldPrice: "$549.00",
      image:
        "https://images.pexels.com/photos/5824887/pexels-photo-5824887.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "GE Profile Opal 2.0",
      subtitle: "Countertop Nugget Ice Maker",
      brand: "ge",
      price: "$449.00",
      oldPrice: "$579.00",
      image:
        "https://images.pexels.com/photos/4226805/pexels-photo-4226805.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Cuisinart Toaster Oven",
      subtitle: "Air Fryer Convection Oven",
      brand: "cuisinart",
      price: "$169.95",
      oldPrice: "$229.95",
      image:
        "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Breville Barista Express",
      subtitle: "Espresso Machine",
      brand: "breville",
      price: "$599.95",
      oldPrice: "$749.95",
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  gaming: [
    {
      name: "PlayStation 5 Slim",
      subtitle: "Disc Console Bundle",
      brand: "playstation",
      price: "$449.99",
      oldPrice: "$499.99",
      image:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Xbox Series X",
      subtitle: "1TB Gaming Console",
      brand: "xbox",
      price: "$449.99",
      oldPrice: "$499.99",
      image:
        "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Nintendo Switch OLED",
      subtitle: "Handheld Console",
      brand: "nintendo",
      price: "$299.99",
      oldPrice: "$349.99",
      image:
        "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Razer BlackShark V2",
      subtitle: "Gaming Headset",
      brand: "razer",
      price: "$69.99",
      oldPrice: "$99.99",
      image:
        "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Logitech G Pro X",
      subtitle: "Mechanical Gaming Keyboard",
      brand: "logitech",
      price: "$99.99",
      oldPrice: "$149.99",
      image:
        "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "ASUS ROG Strix Monitor",
      subtitle: "27-inch 170Hz Display",
      brand: "asus",
      price: "$279.99",
      oldPrice: "$379.99",
      image:
        "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "MSI Katana 15",
      subtitle: "RTX Gaming Laptop",
      brand: "msi",
      price: "$899.99",
      oldPrice: "$1,199.99",
      image:
        "https://images.pexels.com/photos/7915430/pexels-photo-7915430.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Corsair K70 RGB",
      subtitle: "Mechanical Keyboard",
      brand: "corsair",
      price: "$129.99",
      oldPrice: "$179.99",
      image:
        "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "SteelSeries Arctis Nova",
      subtitle: "Wireless Gaming Headset",
      brand: "steelseries",
      price: "$119.99",
      oldPrice: "$169.99",
      image:
        "https://images.pexels.com/photos/7915355/pexels-photo-7915355.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Alienware Aurora R16",
      subtitle: "Gaming Desktop",
      brand: "alienware",
      price: "$1,299.99",
      oldPrice: "$1,699.99",
      image:
        "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Nintendo Pro Controller",
      subtitle: "Wireless Game Controller",
      brand: "nintendo",
      price: "$54.99",
      oldPrice: "$69.99",
      image:
        "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Razer DeathAdder V3",
      subtitle: "Ergonomic Gaming Mouse",
      brand: "razer",
      price: "$49.99",
      oldPrice: "$69.99",
      image:
        "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  sports: [
    {
      name: "Nike Pegasus 41",
      subtitle: "Road Running Shoes",
      brand: "nike",
      price: "$109.99",
      oldPrice: "$140.00",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Adidas Predator League",
      subtitle: "Firm Ground Soccer Cleats",
      brand: "adidas",
      price: "$69.99",
      oldPrice: "$95.00",
      image:
        "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Puma Future Match",
      subtitle: "Soccer Cleats",
      brand: "puma",
      price: "$59.99",
      oldPrice: "$90.00",
      image:
        "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Under Armour Hustle",
      subtitle: "Training Backpack",
      brand: "under-armour",
      price: "$39.99",
      oldPrice: "$55.00",
      image:
        "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Wilson Evolution Basketball",
      subtitle: "Indoor Game Basketball",
      brand: "wilson",
      price: "$59.99",
      oldPrice: "$79.99",
      image:
        "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Spalding Street Phantom",
      subtitle: "Outdoor Basketball",
      brand: "spalding",
      price: "$19.99",
      oldPrice: "$29.99",
      image:
        "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Yonex Astrox 88D",
      subtitle: "Badminton Racket",
      brand: "yonex",
      price: "$159.99",
      oldPrice: "$199.99",
      image:
        "https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Decathlon Domyos Mat",
      subtitle: "Fitness Exercise Mat",
      brand: "decathlon",
      price: "$24.99",
      oldPrice: "$34.99",
      image:
        "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "ASICS Gel-Kayano 30",
      subtitle: "Stability Running Shoes",
      brand: "asics",
      price: "$119.99",
      oldPrice: "$160.00",
      image:
        "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "New Balance 1080v13",
      subtitle: "Cushioned Running Shoes",
      brand: "new-balance",
      price: "$124.99",
      oldPrice: "$164.99",
      image:
        "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Nike Pro Training Shorts",
      subtitle: "Workout Shorts",
      brand: "nike",
      price: "$24.99",
      oldPrice: "$35.00",
      image:
        "https://images.pexels.com/photos/6311663/pexels-photo-6311663.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Adidas Tiro Duffel",
      subtitle: "Training Duffel Bag",
      brand: "adidas",
      price: "$31.99",
      oldPrice: "$45.00",
      image:
        "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  automotive: [
    {
      name: "Ford F-150 Floor Mats",
      subtitle: "All-Weather Interior Mats",
      brand: "ford",
      price: "$89.99",
      oldPrice: "$129.99",
      image:
        "https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Toyota RAV4 Cargo Liner",
      subtitle: "Rear Trunk Protector",
      brand: "toyota",
      price: "$79.99",
      oldPrice: "$109.99",
      image:
        "https://images.pexels.com/photos/6870320/pexels-photo-6870320.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Chevrolet Tire Inflator",
      subtitle: "Portable Air Compressor",
      brand: "chevrolet",
      price: "$39.99",
      oldPrice: "$59.99",
      image:
        "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Honda Civic Seat Covers",
      subtitle: "Breathable Front Seat Set",
      brand: "honda",
      price: "$54.99",
      oldPrice: "$79.99",
      image:
        "https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Nissan Jump Starter",
      subtitle: "Portable Battery Booster",
      brand: "nissan",
      price: "$69.99",
      oldPrice: "$99.99",
      image:
        "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Hyundai Dash Camera",
      subtitle: "1080p Car Dash Cam",
      brand: "hyundai",
      price: "$59.99",
      oldPrice: "$89.99",
      image:
        "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Kia Wireless Charger",
      subtitle: "Car Charging Mount",
      brand: "kia",
      price: "$29.99",
      oldPrice: "$44.99",
      image:
        "https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "BMW Detailing Kit",
      subtitle: "Interior Care Bundle",
      brand: "bmw",
      price: "$49.99",
      oldPrice: "$69.99",
      image:
        "https://images.pexels.com/photos/6872173/pexels-photo-6872173.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Mercedes-Benz Trunk Organizer",
      subtitle: "Foldable Cargo Storage",
      brand: "mercedes-benz",
      price: "$34.99",
      oldPrice: "$49.99",
      image:
        "https://images.pexels.com/photos/4488660/pexels-photo-4488660.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Tesla Model 3 Sunshade",
      subtitle: "Glass Roof Sun Protection",
      brand: "tesla",
      price: "$44.99",
      oldPrice: "$64.99",
      image:
        "https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Toyota Ceramic Wax",
      subtitle: "Paint Protection Spray",
      brand: "toyota",
      price: "$18.99",
      oldPrice: "$29.99",
      image:
        "https://images.pexels.com/photos/6872178/pexels-photo-6872178.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Ford Trailer Hitch Cover",
      subtitle: "Tow Receiver Cap",
      brand: "ford",
      price: "$16.99",
      oldPrice: "$24.99",
      image:
        "https://images.pexels.com/photos/6872182/pexels-photo-6872182.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
  office: [
    {
      name: "HP LaserJet Pro MFP",
      subtitle: "Wireless Laser Printer",
      brand: "hp",
      price: "$169.99",
      oldPrice: "$229.99",
      image:
        "https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Canon PIXMA MegaTank",
      subtitle: "All-in-One Inkjet Printer",
      brand: "canon",
      price: "$199.99",
      oldPrice: "$279.99",
      image:
        "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Epson EcoTank ET-2850",
      subtitle: "Cartridge-Free Printer",
      brand: "epson",
      price: "$229.99",
      oldPrice: "$299.99",
      image:
        "https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Brother HL-L2350DW",
      subtitle: "Compact Laser Printer",
      brand: "brother",
      price: "$119.99",
      oldPrice: "$159.99",
      image:
        "https://images.pexels.com/photos/4792727/pexels-photo-4792727.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Logitech MX Keys S",
      subtitle: "Wireless Office Keyboard",
      brand: "logitech",
      price: "$89.99",
      oldPrice: "$109.99",
      image:
        "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Staples Mesh Chair",
      subtitle: "Ergonomic Task Chair",
      brand: "staples",
      price: "$99.99",
      oldPrice: "$149.99",
      image:
        "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "3M Privacy Filter",
      subtitle: "Laptop Screen Protector",
      brand: "3m",
      price: "$34.99",
      oldPrice: "$49.99",
      image:
        "https://images.pexels.com/photos/4792712/pexels-photo-4792712.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Post-it Super Sticky Notes",
      subtitle: "Assorted Note Pads",
      brand: "post-it",
      price: "$7.99",
      oldPrice: "$11.99",
      image:
        "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Sharpie Permanent Markers",
      subtitle: "Fine Point Marker Set",
      brand: "sharpie",
      price: "$8.99",
      oldPrice: "$13.99",
      image:
        "https://images.pexels.com/photos/4792284/pexels-photo-4792284.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Fellowes Powershred 79Ci",
      subtitle: "Cross-Cut Paper Shredder",
      brand: "fellowes",
      price: "$189.99",
      oldPrice: "$249.99",
      image:
        "https://images.pexels.com/photos/4792282/pexels-photo-4792282.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Canon ImageFormula Scanner",
      subtitle: "Compact Document Scanner",
      brand: "canon",
      price: "$219.99",
      oldPrice: "$299.99",
      image:
        "https://images.pexels.com/photos/4792723/pexels-photo-4792723.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "HP 67 Ink Combo Pack",
      subtitle: "Black and Tri-Color Ink",
      brand: "hp",
      price: "$34.99",
      oldPrice: "$45.99",
      image:
        "https://images.pexels.com/photos/4792491/pexels-photo-4792491.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ],
};

function buildDeals(category: CategorySlug, seeds: DealSeed[]) {
  return seeds.map((seed, index): DealCardData => {
    const dealType = dealTypeCycle[index % dealTypeCycle.length];

    return {
      ...seed,
      badge: dealType.badge,
      category,
      dealType: dealType.dealType,
      discount: seed.discount ?? `${15 + ((index * 3) % 18)}% OFF`,
      rating: (4.4 + ((index + 1) % 5) / 10).toFixed(1),
      retailer: seed.retailer ?? retailerCycle[index % retailerCycle.length],
      reviews: (2100 + index * 1739).toLocaleString("en-US"),
      savedBy: index % 3 === 0 ? `${1 + index}.2k users` : `${420 + index * 83} users`,
      score: String(92 - (index % 10)),
      timer: dealType.dealType === "limited-time" ? (index % 4 === 2 ? "03:45:12" : "01:22:48") : undefined,
    };
  });
}

const deals: DealCardData[] = Object.entries(referenceProductSeeds).flatMap(([category, seeds]) =>
  buildDeals(category as CategorySlug, seeds),
);

const validCategories = new Set<CategorySlug>([
  "electronics",
  "home",
  "beauty",
  "fashion",
  "kitchen",
  "gaming",
  "sports",
  "automotive",
  "office",
]);

function normalizeCategory(category?: string | string[]) {
  const value = Array.isArray(category) ? category[0] : category;

  return value && validCategories.has(value as CategorySlug) ? (value as CategorySlug) : null;
}

function normalizeDealTypes(dealType?: string | string[]) {
  const values = Array.isArray(dealType) ? dealType : dealType ? [dealType] : [];
  const normalized: DealTypeSlug[] = [];

  for (const value of values) {
    if (
      validDealTypes.has(value as DealTypeSlug) &&
      !normalized.includes(value as DealTypeSlug) &&
      normalized.length < 2
    ) {
      normalized.push(value as DealTypeSlug);
    }
  }

  return normalized;
}

function normalizeRetailers(retailer?: string | string[]) {
  const values = Array.isArray(retailer) ? retailer : retailer ? [retailer] : [];
  const normalized: RetailerSlug[] = [];

  for (const value of values) {
    if (validRetailers.has(value as RetailerSlug) && !normalized.includes(value as RetailerSlug)) {
      normalized.push(value as RetailerSlug);
    }
  }

  return normalized;
}

function normalizeBrands(brand?: string | string[]) {
  const values = Array.isArray(brand) ? brand : brand ? [brand] : [];
  const normalized: BrandSlug[] = [];

  for (const value of values) {
    if (validBrands.has(value as BrandSlug) && !normalized.includes(value as BrandSlug)) {
      normalized.push(value as BrandSlug);
    }
  }

  return normalized;
}

function normalizeSearchQuery(query?: string | string[]) {
  const value = Array.isArray(query) ? query[0] : query;
  return value?.trim() ?? "";
}

function retailerSlug(label: string) {
  const match = retailerFilters.find((item) => item.label === label);
  return match?.slug ?? retailerChips.find((item) => item.label === label)?.slug ?? null;
}

function dealsHref(
  category: CategorySlug | null,
  dealTypes: DealTypeSlug[],
  retailers: RetailerSlug[],
  brands: BrandSlug[] = [],
  query = "",
) {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  dealTypes.forEach((dealType) => params.append("dealType", dealType));
  retailers.forEach((retailer) => params.append("retailer", retailer));
  brands.forEach((brand) => params.append("brand", brand));
  if (query.trim()) params.set("q", query.trim());

  const queryString = params.toString();
  return queryString ? `/deals?${queryString}` : "/deals";
}

function toggleDealTypeHref(
  category: CategorySlug | null,
  activeDealTypes: DealTypeSlug[],
  activeRetailers: RetailerSlug[],
  activeBrands: BrandSlug[],
  dealType: DealTypeSlug,
  query = "",
) {
  const nextDealTypes = activeDealTypes.includes(dealType)
    ? activeDealTypes.filter((activeDealType) => activeDealType !== dealType)
    : [...activeDealTypes, dealType];

  return dealsHref(category, nextDealTypes, activeRetailers, activeBrands, query);
}

function toggleRetailerHref(
  category: CategorySlug | null,
  activeDealTypes: DealTypeSlug[],
  activeRetailers: RetailerSlug[],
  activeBrands: BrandSlug[],
  retailer: RetailerSlug,
  query = "",
) {
  const nextRetailers = activeRetailers.includes(retailer)
    ? activeRetailers.filter((activeRetailer) => activeRetailer !== retailer)
    : [...activeRetailers, retailer];

  return dealsHref(category, activeDealTypes, nextRetailers, activeBrands, query);
}

function toggleBrandHref(
  category: CategorySlug | null,
  activeDealTypes: DealTypeSlug[],
  activeRetailers: RetailerSlug[],
  activeBrands: BrandSlug[],
  brand: BrandSlug,
  query = "",
) {
  const nextBrands = activeBrands.includes(brand)
    ? activeBrands.filter((activeBrand) => activeBrand !== brand)
    : [...activeBrands, brand];

  return dealsHref(category, activeDealTypes, activeRetailers, nextBrands, query);
}

function badgeClass(badge: DealBadge) {
  if (badge === "Historical Low") return "bg-value text-white";
  if (badge === "Price Drop") return "bg-buy text-white";
  if (badge === "Buy One Get One") return "bg-wait text-white";
  if (badge === "Promo Code") return "bg-[var(--happy-blue)] text-white";
  return "bg-accent text-white";
}

function RetailerLogo({ compact = false, retailer }: { compact?: boolean; retailer: string }) {
  const sizeClass = compact ? "size-4 text-[9px]" : "size-7 text-sm";

  if (retailer === "Amazon") {
    return (
      <span className={`relative grid ${sizeClass} place-items-center font-serif font-extrabold text-foreground`}>
        a
        <span className="absolute bottom-0 h-0.5 w-3 rounded-full bg-[#ff9900]" />
      </span>
    );
  }

  if (retailer === "Walmart") {
    return (
      <span className={`grid ${sizeClass} place-items-center rounded-md bg-[#0071ce] text-[#ffc220]`}>
        <Sparkles className={compact ? "size-2.5" : "size-4"} />
      </span>
    );
  }

  if (retailer === "Best Buy") {
    return (
      <span className={`grid ${sizeClass} place-items-center rounded-md bg-[#0046be] font-extrabold text-white`}>
        B
      </span>
    );
  }

  if (retailer === "Target") {
    return (
      <span className={`grid ${sizeClass} place-items-center rounded-full bg-white ring-1 ring-[#cc0000]`}>
        <span className="grid size-4 place-items-center rounded-full bg-[#cc0000]">
          <span className="size-1.5 rounded-full bg-white" />
        </span>
      </span>
    );
  }

  if (retailer === "eBay") {
    return (
      <span className={`flex ${compact ? "h-4 w-7 text-[9px]" : "h-7 w-10 text-sm"} items-center justify-center font-extrabold tracking-tight`}>
        <span className="text-[#e53238]">e</span>
        <span className="text-[#0064d2]">b</span>
        <span className="text-[#f5af02]">a</span>
        <span className="text-[#86b817]">y</span>
      </span>
    );
  }

  if (retailer === "Home Depot") {
    return (
      <span className={`grid ${sizeClass} place-items-center rounded-md bg-[#f96302] font-black text-white`}>
        HD
      </span>
    );
  }

  return (
    <span className={`grid ${sizeClass} place-items-center rounded-md bg-muted font-extrabold text-foreground`}>
      {retailer.charAt(0)}
    </span>
  );
}

function DealCard({ deal }: { deal: DealCardData }) {

  return (
    <Card className="gap-1 rounded-xl border border-border bg-white p-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)]">
      <div className="flex items-center justify-between">
        <Badge className={`h-[18px] rounded px-2 text-[9px] font-extrabold leading-none ${badgeClass(deal.badge)}`}>
          {deal.badge}
        </Badge>
        {deal.timer ? (
          <span className="rounded-md bg-soft-error px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
            {deal.timer}
          </span>
        ) : (
          <button className="grid size-6 place-items-center rounded-full border border-border bg-white text-muted-foreground shadow-sm">
            <Heart className="size-3.5" />
          </button>
        )}
      </div>

      <div className="grid h-[78px] place-items-center overflow-hidden rounded-lg bg-gradient-to-b from-white to-[#f8fafc]">
        <img alt={deal.name} className="max-h-[72px] w-full object-contain mix-blend-multiply" src={deal.image} />
      </div>

      <div className="min-h-8">
        <h3 className="line-clamp-1 text-[13px] font-extrabold leading-tight text-foreground">{deal.name}</h3>
        <p className="line-clamp-1 text-[11px] font-medium leading-tight text-muted-foreground">{deal.subtitle}</p>
      </div>

      <div className="flex min-w-0 items-center gap-2 text-[10px] font-bold">
        <span className="flex items-center gap-1">
          <RetailerLogo compact retailer={deal.retailer} />
          {deal.retailer}
        </span>
        <span className="flex items-center gap-0.5 text-accent">
          <Star className="size-3 fill-current" />
          {deal.rating}
        </span>
        <span className="text-muted-foreground">({deal.reviews})</span>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-[15px] font-extrabold leading-none text-foreground">{deal.price}</div>
          <div className="mt-1 text-[10px] leading-none text-muted-foreground">
            List price <span className="line-through">{deal.oldPrice}</span>
          </div>
        </div>
        <div className="grid size-8 place-items-center rounded-full border-2 border-buy bg-white text-[11px] font-extrabold text-buy shadow-[0_6px_16px_rgba(22,163,74,0.14)]">
          {deal.score}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Badge className="h-5 rounded bg-soft-buy px-2 text-[9px] font-extrabold text-buy">
          {deal.discount}
        </Badge>
        <span className="text-[9px] text-muted-foreground">AI Deal Score</span>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t-2 border-[#1f7ae0] pt-2">
        <Button
          variant="outline"
          className="h-8 rounded-lg border-border bg-white px-2 text-[11px] font-extrabold text-foreground transition-colors hover:border-[#1f7ae0] hover:bg-[#1f7ae0] hover:text-white"
        >
          View Deal
        </Button>
        <Button className="h-8 rounded-lg bg-[#ffd200] px-2 text-[11px] font-extrabold text-foreground shadow-none hover:bg-[#ffc400]">
          Buy Now
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1 text-[9px] leading-none text-muted-foreground">
        <User className="size-3" />
        Saved by {deal.savedBy}
      </div>
    </Card>
  );
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    category?: string | string[];
    dealType?: string | string[];
    retailer?: string | string[];
    brand?: string | string[];
    q?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const activeQuery = normalizeSearchQuery(params?.q);
  const normalizedActiveQuery = activeQuery.toLowerCase();
  const activeCategory = normalizeCategory(params?.category);
  const activeDealTypes = normalizeDealTypes(params?.dealType);
  const activeDealTypeSet = new Set(activeDealTypes);
  const activeRetailers = normalizeRetailers(params?.retailer);
  const activeRetailerSet = new Set(activeRetailers);
  const activeBrandFilters = brandFiltersByCategory[activeCategory ?? "all"];
  const activeCategoryBrandSlugs = new Set(activeBrandFilters.map((brand) => brand.slug));
  const activeBrands = normalizeBrands(params?.brand).filter((brand) =>
    activeCategoryBrandSlugs.has(brand),
  );
  const activeBrandSet = new Set(activeBrands);
  const visibleDeals = activeCategory
    ? deals.filter((deal) => deal.category === activeCategory)
    : deals;
  const dealTypeFilteredDeals =
    activeDealTypeSet.size > 0
      ? visibleDeals.filter((deal) => activeDealTypeSet.has(deal.dealType))
      : visibleDeals;
  const filteredDeals =
    activeRetailerSet.size > 0
      ? dealTypeFilteredDeals.filter((deal) => {
          const slug = retailerSlug(deal.retailer);
          return slug ? activeRetailerSet.has(slug) : false;
        })
      : dealTypeFilteredDeals;
  const brandFilteredDeals =
    activeBrandSet.size > 0
      ? filteredDeals.filter((deal) => activeBrandSet.has(deal.brand))
      : filteredDeals;
  const searchedDeals = normalizedActiveQuery
    ? brandFilteredDeals.filter((deal) =>
        [
          deal.name,
          deal.subtitle,
          deal.brand,
          deal.category,
          deal.retailer,
          deal.badge,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedActiveQuery),
      )
    : brandFilteredDeals;

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
        <div className="flex min-h-20 w-full items-center gap-5 px-5 sm:px-8">
          <Link className="flex shrink-0 items-center gap-3" href="/" aria-label="Happy home">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ffb21a] via-[#ff6b00] to-[#d84fd7] text-white shadow-sm">
              <ShoppingBag className="size-7" aria-hidden="true" />
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-[var(--happy-ink)]">Happy</span>
          </Link>

          <DealsSearchForm
            actionPath={dealsHref(activeCategory, activeDealTypes, activeRetailers, activeBrands)}
            defaultValue={activeQuery}
          />

          <Button
            className="hidden h-12 rounded-lg bg-accent px-7 font-extrabold text-white hover:bg-[var(--happy-orange-dark)] md:inline-flex"
            form="deals-search-form"
            type="submit"
          >
            <Sparkles className="size-4" />
            Search deals
          </Button>

          <div className="ml-auto flex items-center gap-5 text-sm font-semibold">
            <button className="hidden items-center gap-2 sm:flex">
              <Heart className="size-5" />
              Saved
            </button>
            <button className="relative">
              <Bell className="size-5" />
              <span className="absolute -right-0.5 -top-1 size-2.5 rounded-full bg-accent ring-2 ring-white" />
            </button>
            <button className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-full bg-muted">
                <User className="size-6" />
              </span>
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        <nav className="grid h-14 w-full grid-cols-[repeat(11,minmax(0,1fr))] items-center overflow-x-auto border-t border-border px-5 text-sm font-extrabold sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const active = item.slug === activeCategory;
            const Icon = item.icon;

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`relative flex h-14 min-w-0 items-center justify-center gap-2 px-2 ${
                  active ? "text-accent" : "text-foreground"
                }`}
                href={dealsHref(item.slug, activeDealTypes, activeRetailers, [], activeQuery)}
                key={item.label}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
          <button className="flex h-14 min-w-0 items-center justify-center gap-1 px-2">
            More <ChevronDown className="size-4" />
          </button>
        </nav>
      </header>

      <main className="w-full px-5 py-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="self-start rounded-xl border border-border bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.06)] lg:sticky lg:top-36">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xl font-extrabold tracking-tight">Filters</h2>
              <Link className="text-xs font-extrabold text-value" href="/deals">
                Reset all
              </Link>
            </div>
            <section>
              <h3 className="mb-3 flex items-center justify-between text-xs font-extrabold text-foreground">
                All Brands <ChevronDown className="size-4 rotate-180" />
              </h3>
              <div className="space-y-1.5">
                {activeBrandFilters.map((brand) => {
                  const active = activeBrandSet.has(brand.slug);

                  return (
                    <Link
                      aria-current={active ? "true" : undefined}
                      className="flex h-8 items-center gap-2 rounded-md px-1 text-xs font-semibold text-foreground hover:bg-muted"
                      href={toggleBrandHref(
                        activeCategory,
                        activeDealTypes,
                        activeRetailers,
                        activeBrands,
                        brand.slug,
                        activeQuery,
                      )}
                      key={brand.slug}
                    >
                      <Checkbox
                        aria-label={brand.label}
                        checked={active}
                        className="border-slate-400 data-checked:border-value data-checked:bg-value data-checked:text-white"
                      />
                      <span className="min-w-0 flex-1 truncate">{brand.label}</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <Separator className="my-4" />

            <PriceRangeFilter />

            <Separator className="my-4" />

            <section>
              <h3 className="mb-3 text-xs font-extrabold text-foreground">Deal Type (i)</h3>
              <div className="space-y-2">
                {dealTypes.map((type) => {
                  const active = activeDealTypeSet.has(type.slug);
                  const disabled = !active && activeDealTypes.length >= 2;

                  return (
                    <Link
                      aria-current={active ? "true" : undefined}
                      aria-disabled={disabled ? "true" : undefined}
                      className={`flex items-center gap-2 text-xs font-semibold text-foreground ${
                        disabled ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      href={
                        disabled
                          ? dealsHref(
                              activeCategory,
                              activeDealTypes,
                              activeRetailers,
                              activeBrands,
                              activeQuery,
                            )
                          : toggleDealTypeHref(
                              activeCategory,
                              activeDealTypes,
                              activeRetailers,
                              activeBrands,
                              type.slug,
                              activeQuery,
                            )
                      }
                      key={type.slug}
                    >
                      <Checkbox
                        aria-label={type.label}
                        checked={active}
                        disabled={disabled}
                        className="border-slate-400 data-checked:border-value data-checked:bg-value data-checked:text-white"
                      />
                      <span className="min-w-0 flex-1 truncate">{type.label}</span>
                      <span className="text-[10px] font-semibold text-muted-foreground">{type.count}</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <Button
              asChild
              variant="outline"
              className="mt-5 h-10 w-full border-value/40 text-xs font-extrabold text-value"
            >
              <Link href="/deals">Clear all filters</Link>
            </Button>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight">
                  Today&apos;s Best Deals <Sparkles className="size-5 text-accent" />
                </h1>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Hand-picked deals with great prices and high value.
                </p>
              </div>
              <Button
                variant="outline"
                className="h-10 border-value/50 text-xs font-extrabold text-value transition-colors hover:bg-soft-value active:bg-value active:text-white focus-visible:bg-value focus-visible:text-white"
              >
                <Bell className="size-4" />
                Get deal alerts
              </Button>
            </div>

            <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="grid min-w-0 flex-1 grid-cols-[repeat(7,minmax(0,1fr))] gap-3">
                {retailerChips.map((retailer) => {
                  const active =
                    retailer.slug === null
                      ? activeRetailers.length === 0
                      : activeRetailerSet.has(retailer.slug);
                  return (
                    <Link
                      aria-current={active ? "true" : undefined}
                      className={`inline-flex h-12 min-w-0 items-center justify-center gap-3 rounded-lg border bg-white px-5 text-sm font-extrabold shadow-sm transition-colors ${
                        active
                          ? "border-value text-value"
                          : "border-border text-foreground hover:border-value/40"
                      }`}
                      href={
                        retailer.slug === null
                          ? dealsHref(activeCategory, activeDealTypes, [], activeBrands, activeQuery)
                          : toggleRetailerHref(
                              activeCategory,
                              activeDealTypes,
                              activeRetailers,
                              activeBrands,
                              retailer.slug,
                              activeQuery,
                            )
                      }
                      key={retailer.label}
                    >
                      {retailer.slug === null ? (
                        <Grid2X2 className="size-5" aria-hidden="true" />
                      ) : null}
                      {retailer.slug ? <RetailerLogo retailer={retailer.label} /> : null}
                      {retailer.label}
                    </Link>
                  );
                })}
              </div>

              <div className="flex h-10 shrink-0 items-center overflow-hidden rounded-lg border border-border bg-white text-xs shadow-sm">
                <span className="border-r border-border px-4 font-semibold text-muted-foreground">
                  Sort by:
                </span>
                <button className="flex h-full min-w-32 items-center justify-between gap-4 px-4 font-extrabold text-foreground">
                  Best Deal
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>

            <div
              className="grid gap-3.5"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, max(190px, calc((100% - 2.625rem) / 4))), 1fr))",
              }}
            >
              {searchedDeals.map((deal) => (
                <DealCard deal={deal} key={`${deal.name}-${deal.retailer}`} />
              ))}
            </div>
            {searchedDeals.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-border bg-white p-8 text-center shadow-sm">
                <h2 className="text-lg font-extrabold text-foreground">No matching deals found</h2>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  Try searching by product, brand, category, or retailer.
                </p>
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 rounded-2xl bg-[#f3edff] p-5 shadow-[0_12px_30px_rgba(109,40,217,0.08)] md:grid-cols-4">
              {[
                { title: "Price history", body: "Track price trends and historical lows.", icon: Sparkles },
                { title: "AI analysis", body: "Smart scoring and insights to find the best deals.", icon: Brain },
                {
                  title: "Real-time updates",
                  body: "Deals updated every few minutes so you never miss out.",
                  icon: Zap,
                },
                { title: "Trusted sources", body: "Curated from top retailers you can rely on.", icon: ShieldCheck },
              ].map(({ title, body, icon: Icon }) => (
                <div className="flex items-start gap-3 text-xs" key={title}>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-value shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-foreground">{title}</p>
                    <p className="mt-1 font-medium text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
