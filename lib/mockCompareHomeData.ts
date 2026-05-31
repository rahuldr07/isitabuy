import type { CompareCategory, CompareHomeProduct, TrendingComparison } from "@/types/compareHome";

export const compareHomeProducts: CompareHomeProduct[] = [
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 299.99,
    rating: 4.6,
    aiBuyScore: 76,
    slug: "sony-wh-1000xm5",
    imageSrc: "/compare/sony-wh-1000xm5-black.png",
    imageAlt: "Sony WH-1000XM5 black headphones",
  },
  {
    id: "bose-quietcomfort-ultra",
    name: "Bose QuietComfort Ultra",
    category: "Headphones",
    price: 279,
    rating: 4.7,
    aiBuyScore: 84,
    slug: "bose-quietcomfort-ultra",
    imageSrc: "/compare/bose-qc-ultra-black.png",
    imageAlt: "Bose QuietComfort Ultra black headphones",
  },
  {
    id: "apple-airpods-max",
    name: "Apple AirPods Max",
    category: "Headphones",
    price: 449.99,
    rating: 4.5,
    aiBuyScore: 72,
    slug: "apple-airpods-max",
    imageAlt: "Apple AirPods Max headphones placeholder",
  },
  {
    id: "sennheiser-momentum-4",
    name: "Sennheiser Momentum 4",
    category: "Headphones",
    price: 249.99,
    rating: 4.6,
    aiBuyScore: 82,
    slug: "sennheiser-momentum-4",
    imageAlt: "Sennheiser Momentum 4 headphones placeholder",
  },
];

export const compareHomeCategories: CompareCategory[] = [
  { id: "all-deals", label: "All Deals" },
  { id: "electronics", label: "Electronics" },
  { id: "home", label: "Home" },
  { id: "beauty", label: "Beauty" },
  { id: "fashion", label: "Fashion" },
  { id: "kitchen", label: "Kitchen" },
  { id: "gaming", label: "Gaming" },
  { id: "sports", label: "Sports" },
  { id: "automotive", label: "Automotive" },
  { id: "office", label: "Office" },
];

export const extraCompareHomeCategories: CompareCategory[] = [
  { id: "books", label: "Books" },
  { id: "toys", label: "Toys" },
  { id: "outdoors", label: "Outdoors" },
  { id: "health", label: "Health" },
];

export const trendingComparisons: TrendingComparison[] = [
  {
    id: "sony-vs-bose",
    title: "Best ANC headphones",
    productA: "sony-wh-1000xm5",
    productB: "bose-quietcomfort-ultra",
    note: "Comfort vs ANC strength",
  },
  {
    id: "apple-vs-sony",
    title: "Apple premium or smarter deal",
    productA: "apple-airpods-max",
    productB: "sony-wh-1000xm5",
    note: "Ecosystem vs value",
  },
  {
    id: "sennheiser-vs-bose",
    title: "Travel battery check",
    productA: "sennheiser-momentum-4",
    productB: "bose-quietcomfort-ultra",
    note: "Battery vs comfort",
  },
];
