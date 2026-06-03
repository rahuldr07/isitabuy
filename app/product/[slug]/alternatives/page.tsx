/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BarChart3,
  Battery,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  CirclePlay,
  Download,
  Dumbbell,
  Headphones,
  Home,
  Info,
  ListChecks,
  MessageCircle,
  Music,
  Phone,
  Plane,
  Search,
  Share2,
  Sparkles,
  Star,
  Trophy,
  User,
  XCircle,
} from "lucide-react";

import ProductMobileNav from "@/components/product/product-mobile-nav";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Alternatives - BuyWise AI",
  description: "AI-ranked alternatives and side-by-side product comparisons.",
};

interface ProductData {
  name: string;
  subtitle: string;
  image: string;
  price: string;
  oldPrice: string;
  retailer: string;
  rating: string;
  reviews: string;
  score: number;
  discount: string;
}

type ProductSearchParams = Partial<Record<keyof Omit<ProductData, "score">, string | string[]>> & {
  score?: string | string[];
};

interface AlternativeProduct {
  name: string;
  price: string;
  oldPrice?: string;
  score: number;
  image: string;
  description: string;
  tags: string[];
  rank: number;
}

const fallbackProduct: ProductData = {
  name: "Sony WH-1000XM5",
  subtitle: "Wireless Headphones",
  image: "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=600",
  price: "$278.00",
  oldPrice: "$349.99",
  retailer: "amazon",
  rating: "4.6",
  reviews: "12,842",
  score: 89,
  discount: "12% OFF",
};

const sidebarItems = [
  { label: "Overview", icon: Home, key: "overview" },
  { label: "Price & History", icon: BarChart3, key: "price-history" },
  { label: "Reviews AI", icon: MessageCircle, key: "reviews-ai" },
  { label: "Alternatives", icon: Sparkles, key: "alternatives" },
  { label: "YouTube Insights", icon: CirclePlay, key: "youtube-insights" },
  { label: "My Lists", icon: ListChecks, key: "my-lists" },
] satisfies Array<{ label: string; icon: LucideIcon; key?: "overview" | "price-history" | "reviews-ai" | "alternatives" | "youtube-insights" | "my-lists" }>;

type AlternativeCategory =
  | "earbuds"
  | "tv"
  | "kitchen"
  | "watch"
  | "vacuum"
  | "beauty"
  | "fashion"
  | "gaming"
  | "office"
  | "generic";

const alternativeCatalog: Record<AlternativeCategory, { label: string; products: AlternativeProduct[]; more: string[][] }> = {
  earbuds: {
    label: "Wireless Earbuds",
    products: [
      {
        name: "Sony WF-1000XM5 Earbuds",
        price: "$249",
        oldPrice: "$299",
        score: 94,
        image: "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Better ANC and fuller sound in a compact earbud design.",
        tags: ["Better ANC", "Better Sound"],
        rank: 1,
      },
      {
        name: "Samsung Galaxy Buds3 Pro",
        price: "$199",
        oldPrice: "$249",
        score: 89,
        image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Strong Android integration with clear calls and rich audio.",
        tags: ["Android Pick", "Better Value"],
        rank: 2,
      },
      {
        name: "Bose QuietComfort Earbuds",
        price: "$229",
        oldPrice: "$279",
        score: 86,
        image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Excellent noise cancellation and comfortable long wear.",
        tags: ["Comfort", "ANC"],
        rank: 3,
      },
      {
        name: "Jabra Elite 10",
        price: "$179",
        oldPrice: "$229",
        score: 82,
        image: "https://images.pexels.com/photos/3394667/pexels-photo-3394667.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Reliable multipoint connection and durable daily use.",
        tags: ["Calls", "Durable"],
        rank: 4,
      },
    ],
    more: [["Nothing Ear", "$129", "80/100"], ["Beats Studio Buds+", "$149", "78/100"], ["Pixel Buds Pro 2", "$199", "81/100"], ["Anker Liberty 4 NC", "$99", "77/100"]],
  },
  tv: {
    label: "Smart TVs",
    products: [
      {
        name: "LG C4 OLED 55-inch",
        price: "$1,299",
        oldPrice: "$1,599",
        score: 95,
        image: "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Best contrast, gaming features, and cinematic image quality.",
        tags: ["Best Picture", "Gaming"],
        rank: 1,
      },
      {
        name: "TCL QM8 Mini-LED",
        price: "$899",
        oldPrice: "$1,099",
        score: 90,
        image: "https://images.pexels.com/photos/5721908/pexels-photo-5721908.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Excellent brightness and size value for the price.",
        tags: ["Better Value", "Bright Room"],
        rank: 2,
      },
      {
        name: "Sony Bravia 7",
        price: "$1,199",
        oldPrice: "$1,399",
        score: 87,
        image: "https://images.pexels.com/photos/7045558/pexels-photo-7045558.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Natural color tuning and strong motion processing.",
        tags: ["Cinema", "Motion"],
        rank: 3,
      },
      {
        name: "Hisense U8N",
        price: "$799",
        oldPrice: "$999",
        score: 84,
        image: "https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "High brightness and strong HDR performance at lower cost.",
        tags: ["HDR", "Budget"],
        rank: 4,
      },
    ],
    more: [["Samsung QN90D", "$1,199", "82/100"], ["Roku Pro Series", "$899", "79/100"], ["Vizio Quantum Pro", "$699", "77/100"], ["LG B4 OLED", "$999", "80/100"]],
  },
  kitchen: {
    label: "Kitchen Appliances",
    products: [
      {
        name: "Cosori TurboBlaze",
        price: "$99",
        oldPrice: "$129",
        score: 92,
        image: "https://images.pexels.com/photos/6996086/pexels-photo-6996086.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Fast cooking, easy cleanup, and strong value for daily meals.",
        tags: ["Better Value", "Easy Clean"],
        rank: 1,
      },
      {
        name: "Ninja Foodi DualZone",
        price: "$179",
        oldPrice: "$229",
        score: 89,
        image: "https://images.pexels.com/photos/6996104/pexels-photo-6996104.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Two cooking zones for larger meals and better flexibility.",
        tags: ["Larger Capacity", "Flexible"],
        rank: 2,
      },
      {
        name: "Instant Vortex Plus",
        price: "$119",
        oldPrice: "$149",
        score: 85,
        image: "https://images.pexels.com/photos/6996093/pexels-photo-6996093.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Consistent results with simple controls and reliable presets.",
        tags: ["Reliable", "Simple"],
        rank: 3,
      },
      {
        name: "Philips Premium Airfryer",
        price: "$199",
        oldPrice: "$249",
        score: 81,
        image: "https://images.pexels.com/photos/6996081/pexels-photo-6996081.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Premium build quality and even cooking performance.",
        tags: ["Premium Build", "Even Cooking"],
        rank: 4,
      },
    ],
    more: [["Breville Smart Oven Air", "$299", "80/100"], ["Cuisinart Air Fryer Oven", "$189", "78/100"], ["Chefman TurboFry", "$89", "76/100"], ["KitchenAid Digital Countertop", "$219", "79/100"]],
  },
  watch: {
    label: "Smartwatches",
    products: [
      {
        name: "Garmin Venu 3",
        price: "$349",
        oldPrice: "$449",
        score: 93,
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Longer battery life and stronger health tracking.",
        tags: ["Battery", "Health"],
        rank: 1,
      },
      {
        name: "Samsung Galaxy Watch 7",
        price: "$249",
        oldPrice: "$329",
        score: 88,
        image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Best Android smartwatch with strong app support.",
        tags: ["Android", "Apps"],
        rank: 2,
      },
      {
        name: "Fitbit Sense 2",
        price: "$199",
        oldPrice: "$299",
        score: 84,
        image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Comfortable fitness tracking with simple health insights.",
        tags: ["Fitness", "Comfort"],
        rank: 3,
      },
      {
        name: "Amazfit Balance",
        price: "$179",
        oldPrice: "$229",
        score: 81,
        image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Budget-friendly watch with strong battery endurance.",
        tags: ["Budget", "Long Battery"],
        rank: 4,
      },
    ],
    more: [["Apple Watch SE", "$249", "80/100"], ["Pixel Watch 3", "$299", "79/100"], ["Garmin Forerunner 265", "$399", "82/100"], ["OnePlus Watch 2", "$229", "77/100"]],
  },
  vacuum: {
    label: "Cleaning Appliances",
    products: [
      {
        name: "Shark Detect Pro",
        price: "$349",
        oldPrice: "$449",
        score: 92,
        image: "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Strong suction and easier maintenance at a better price.",
        tags: ["Better Value", "Easy Clean"],
        rank: 1,
      },
      {
        name: "Tineco Pure One S15",
        price: "$299",
        oldPrice: "$399",
        score: 88,
        image: "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Smart dust detection and lightweight daily cleaning.",
        tags: ["Smart Sensor", "Lightweight"],
        rank: 2,
      },
      {
        name: "Roborock Dyad Pro",
        price: "$399",
        oldPrice: "$499",
        score: 84,
        image: "https://images.pexels.com/photos/4107270/pexels-photo-4107270.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Best option if wet and dry floor cleaning matters.",
        tags: ["Wet Dry", "Floors"],
        rank: 3,
      },
      {
        name: "Miele Triflex HX2",
        price: "$599",
        oldPrice: "$699",
        score: 81,
        image: "https://images.pexels.com/photos/4107108/pexels-photo-4107108.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Premium filtration and durable build quality.",
        tags: ["Premium", "Filtration"],
        rank: 4,
      },
    ],
    more: [["Samsung Bespoke Jet", "$499", "80/100"], ["LG CordZero", "$399", "78/100"], ["Hoover ONEPWR", "$199", "76/100"], ["Bissell ICONpet", "$249", "75/100"]],
  },
  beauty: {
    label: "Beauty Products",
    products: [
      {
        name: "CeraVe Hydrating Cleanser",
        price: "$16",
        oldPrice: "$19",
        score: 91,
        image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Gentle daily option with strong dermatologist trust.",
        tags: ["Sensitive Skin", "Value"],
        rank: 1,
      },
      {
        name: "La Roche-Posay Toleriane",
        price: "$18",
        oldPrice: "$24",
        score: 88,
        image: "https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Better barrier support and fragrance-free formula.",
        tags: ["Derm Pick", "Gentle"],
        rank: 2,
      },
      {
        name: "The Ordinary Niacinamide",
        price: "$7",
        oldPrice: "$11",
        score: 84,
        image: "https://images.pexels.com/photos/6621464/pexels-photo-6621464.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Low-cost active ingredient with strong review volume.",
        tags: ["Budget", "Active"],
        rank: 3,
      },
      {
        name: "Neutrogena Hydro Boost",
        price: "$19",
        oldPrice: "$27",
        score: 81,
        image: "https://images.pexels.com/photos/6621466/pexels-photo-6621466.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Lightweight hydration with broad availability.",
        tags: ["Hydration", "Popular"],
        rank: 4,
      },
    ],
    more: [["Olay Regenerist", "$25", "79/100"], ["Dove Beauty Bar", "$8", "76/100"], ["Maybelline Fit Me", "$9", "75/100"], ["L'Oreal Revitalift", "$22", "78/100"]],
  },
  fashion: {
    label: "Fashion",
    products: [
      {
        name: "Adidas Essentials Hoodie",
        price: "$45",
        oldPrice: "$60",
        score: 90,
        image: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Better everyday value with durable fabric and easy styling.",
        tags: ["Better Value", "Everyday"],
        rank: 1,
      },
      {
        name: "Uniqlo AIRism Tee",
        price: "$19",
        oldPrice: "$25",
        score: 87,
        image: "https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Lightweight comfort and strong basics quality.",
        tags: ["Comfort", "Basics"],
        rank: 2,
      },
      {
        name: "Levi's 511 Slim Jeans",
        price: "$59",
        oldPrice: "$79",
        score: 84,
        image: "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Reliable fit and better long-term wear.",
        tags: ["Durable", "Classic"],
        rank: 3,
      },
      {
        name: "Puma Classic Sneakers",
        price: "$64",
        oldPrice: "$89",
        score: 80,
        image: "https://images.pexels.com/photos/6311615/pexels-photo-6311615.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Easy casual option with frequent sale pricing.",
        tags: ["Casual", "Sale"],
        rank: 4,
      },
    ],
    more: [["Nike Club Fleece", "$55", "79/100"], ["H&M Relaxed Shirt", "$24", "74/100"], ["Zara Straight Jeans", "$49", "76/100"], ["New Balance 574", "$89", "78/100"]],
  },
  gaming: {
    label: "Gaming Gear",
    products: [
      {
        name: "Xbox Wireless Controller",
        price: "$49",
        oldPrice: "$64",
        score: 90,
        image: "https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Broad compatibility and reliable build quality.",
        tags: ["Compatible", "Reliable"],
        rank: 1,
      },
      {
        name: "Razer BlackShark V2",
        price: "$79",
        oldPrice: "$99",
        score: 87,
        image: "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Clear mic and comfortable competitive headset.",
        tags: ["Mic", "Comfort"],
        rank: 2,
      },
      {
        name: "Logitech G Pro Mouse",
        price: "$99",
        oldPrice: "$129",
        score: 84,
        image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Lightweight design with excellent sensor performance.",
        tags: ["FPS", "Lightweight"],
        rank: 3,
      },
      {
        name: "SteelSeries Apex 7",
        price: "$119",
        oldPrice: "$159",
        score: 81,
        image: "https://images.pexels.com/photos/4792732/pexels-photo-4792732.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Tactile keyboard with strong software support.",
        tags: ["Keyboard", "RGB"],
        rank: 4,
      },
    ],
    more: [["Corsair K70", "$129", "79/100"], ["HyperX Cloud III", "$89", "78/100"], ["ASUS ROG Harpe", "$99", "76/100"], ["Nintendo Pro Controller", "$59", "77/100"]],
  },
  office: {
    label: "Office Products",
    products: [
      {
        name: "Brother ADS-1350W",
        price: "$219",
        oldPrice: "$279",
        score: 91,
        image: "https://images.pexels.com/photos/4792723/pexels-photo-4792723.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Fast scans, compact footprint, and reliable document feed.",
        tags: ["Compact", "Fast"],
        rank: 1,
      },
      {
        name: "Epson Workforce ES-580W",
        price: "$329",
        oldPrice: "$399",
        score: 88,
        image: "https://images.pexels.com/photos/4792491/pexels-photo-4792491.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Better wireless workflow for frequent office scanning.",
        tags: ["Wireless", "Office"],
        rank: 2,
      },
      {
        name: "Canon R40 Scanner",
        price: "$249",
        oldPrice: "$329",
        score: 84,
        image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Easy setup and dependable scan quality.",
        tags: ["Easy Setup", "Reliable"],
        rank: 3,
      },
      {
        name: "HP Smart Tank 5101",
        price: "$199",
        oldPrice: "$249",
        score: 80,
        image: "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Better choice if printing matters more than scanning.",
        tags: ["Printing", "Value"],
        rank: 4,
      },
    ],
    more: [["Fujitsu ScanSnap iX1600", "$399", "82/100"], ["Canon Lide 400", "$89", "74/100"], ["Brother HL-L2460DW", "$159", "78/100"], ["Epson EcoTank 2850", "$229", "79/100"]],
  },
  generic: {
    label: "Similar Products",
    products: [
      {
        name: "Best Value Alternative",
        price: "$149",
        oldPrice: "$199",
        score: 88,
        image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Similar core features with a better price-to-performance balance.",
        tags: ["Better Value", "Popular"],
        rank: 1,
      },
      {
        name: "Premium Alternative",
        price: "$299",
        oldPrice: "$349",
        score: 85,
        image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Higher quality option with stronger long-term reviews.",
        tags: ["Premium", "Trusted"],
        rank: 2,
      },
      {
        name: "Budget Alternative",
        price: "$89",
        oldPrice: "$119",
        score: 82,
        image: "https://images.pexels.com/photos/3945688/pexels-photo-3945688.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Lower-cost pick that keeps the most important features.",
        tags: ["Budget", "Value"],
        rank: 3,
      },
      {
        name: "Compact Alternative",
        price: "$129",
        oldPrice: "$159",
        score: 79,
        image: "https://images.pexels.com/photos/3945671/pexels-photo-3945671.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "More portable option for lighter everyday use.",
        tags: ["Compact", "Everyday"],
        rank: 4,
      },
    ],
    more: [["Popular Alternative", "$179", "78/100"], ["Trusted Alternative", "$219", "77/100"], ["Value Alternative", "$99", "76/100"], ["Premium Pick", "$329", "80/100"]],
  },
};

function readParam(value: string | string[] | undefined, fallback: string) {
  const normalized = Array.isArray(value) ? value[0] : value;

  return normalized?.trim() ? normalized : fallback;
}

function productFromSearchParams(searchParams?: ProductSearchParams): ProductData {
  const parsedScore = Number(readParam(searchParams?.score, String(fallbackProduct.score)));

  return {
    name: readParam(searchParams?.name, fallbackProduct.name),
    subtitle: readParam(searchParams?.subtitle, fallbackProduct.subtitle),
    image: readParam(searchParams?.image, fallbackProduct.image),
    price: readParam(searchParams?.price, fallbackProduct.price),
    oldPrice: readParam(searchParams?.oldPrice, fallbackProduct.oldPrice),
    retailer: readParam(searchParams?.retailer, fallbackProduct.retailer),
    rating: readParam(searchParams?.rating, fallbackProduct.rating),
    reviews: readParam(searchParams?.reviews, fallbackProduct.reviews),
    score: Number.isFinite(parsedScore) ? Math.min(99, Math.max(1, Math.round(parsedScore))) : fallbackProduct.score,
    discount: readParam(searchParams?.discount, fallbackProduct.discount),
  };
}

function inferAlternativeCategory(product: ProductData): AlternativeCategory {
  const text = `${product.name} ${product.subtitle}`.toLowerCase();

  if (text.includes("airpod") || text.includes("earbud") || text.includes("buds")) return "earbuds";
  if (text.includes("tv") || text.includes("uhd") || text.includes("oled") || text.includes("crystal")) return "tv";
  if (
    text.includes("air fryer") ||
    text.includes("instant pot") ||
    text.includes("blender") ||
    text.includes("coffee") ||
    text.includes("kitchen") ||
    text.includes("cooker")
  ) {
    return "kitchen";
  }
  if (text.includes("watch") || text.includes("smartwatch") || text.includes("gps 45mm")) return "watch";
  if (text.includes("vacuum") || text.includes("dyson") || text.includes("cleaner") || text.includes("mop")) return "vacuum";
  if (
    text.includes("serum") ||
    text.includes("cream") ||
    text.includes("cleanser") ||
    text.includes("mascara") ||
    text.includes("lipstick") ||
    text.includes("beauty")
  ) {
    return "beauty";
  }
  if (
    text.includes("shoe") ||
    text.includes("sneaker") ||
    text.includes("jeans") ||
    text.includes("hoodie") ||
    text.includes("shirt") ||
    text.includes("dress")
  ) {
    return "fashion";
  }
  if (
    text.includes("gaming") ||
    text.includes("controller") ||
    text.includes("keyboard") ||
    text.includes("mouse") ||
    text.includes("playstation") ||
    text.includes("xbox")
  ) {
    return "gaming";
  }
  if (
    text.includes("scanner") ||
    text.includes("printer") ||
    text.includes("ink") ||
    text.includes("desk") ||
    text.includes("office") ||
    text.includes("document")
  ) {
    return "office";
  }

  return "generic";
}

function productQuery(product: ProductData) {
  return {
    name: product.name,
    subtitle: product.subtitle,
    image: product.image,
    price: product.price,
    oldPrice: product.oldPrice,
    retailer: product.retailer,
    rating: product.rating,
    reviews: product.reviews,
    score: String(product.score),
    discount: product.discount,
  };
}

function productHref(slug: string, product: ProductData, section: "overview" | "price-history" | "reviews-ai" | "alternatives" | "youtube-insights" | "my-lists") {
  return {
    pathname:
      section === "overview"
        ? `/product/${slug}`
        : section === "price-history"
          ? `/product/${slug}/price-history`
          : section === "reviews-ai"
            ? `/product/${slug}/reviews-ai`
            : section === "alternatives"
              ? `/product/${slug}/alternatives`
              : section === "youtube-insights"
                ? `/product/${slug}/youtube-insights`
                : `/product/${slug}/my-lists`,
    query: productQuery(product),
  };
}

function Sidebar({ product, slug }: { product: ProductData; slug: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 overflow-y-auto border-r border-border bg-white px-4 py-6 lg:flex lg:flex-col">
      <Link className="mb-9 flex items-center gap-4" href="/deals">
        <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-value to-brand-navy text-sm font-bold text-white shadow-sm">
          BW
        </span>
        <span className="text-3xl font-bold leading-none tracking-tight">
          BuyWise<br />
          <span className="text-value">AI</span>
        </span>
      </Link>
      <Link className="mb-5 flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-bold text-value hover:bg-soft-value" href="/deals">
        <ArrowLeft className="size-4" />
        Back to Deals
      </Link>

      <nav className="grid gap-3">
        {sidebarItems.map(({ label, icon: Icon, key }) => {
          const active = key === "alternatives";
          const href = key ? productHref(slug, product, key) : "#";

          return (
            <Link
              className={`flex h-13 items-center gap-4 rounded-xl px-4 text-sm font-semibold ${
                active ? "bg-soft-value text-value" : "text-foreground hover:bg-muted"
              }`}
              href={href}
              key={label}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <BentoCard className="mt-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-muted">
            <User className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold">Alex Thompson</p>
            <Badge className="mt-1 bg-soft-value text-value">Pro</Badge>
          </div>
        </div>
        <ChevronDown className="-rotate-90 size-4 text-muted-foreground" />
      </BentoCard>
    </aside>
  );
}

function ProductSelector({ product }: { product: ProductData }) {
  return (
    <BentoCard className="flex h-16 items-center gap-4 px-5">
      <img alt={product.name} className="size-12 object-contain mix-blend-multiply" src={product.image} />
      <span className="min-w-0 flex-1 truncate text-lg font-bold">{product.name}</span>
      <ChevronDown className="size-4 text-muted-foreground" />
    </BentoCard>
  );
}

function FilterBox({ label, value }: { label: string; value: string }) {
  return (
    <BentoCard className="flex h-16 items-center justify-between px-5">
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-bold">{value}</p>
      </div>
      <ChevronDown className="size-4 text-muted-foreground" />
    </BentoCard>
  );
}

function HighlightCard({ product, title, icon: Icon }: { product: AlternativeProduct; title: string; icon: LucideIcon }) {
  return (
    <BentoCard className="min-h-[190px] p-4">
      <p className="flex min-h-7 items-center gap-2 text-sm font-bold">
        <span className="grid size-7 place-items-center rounded-full bg-soft-value text-value">
          <Icon className="size-4" />
        </span>
        {title}
      </p>
      <div className="mt-4 grid grid-cols-[82px_minmax(0,1fr)] items-center gap-4">
        <div className="grid size-[82px] place-items-center rounded-lg bg-white">
          <img alt={product.name} className="max-h-20 max-w-20 object-contain mix-blend-multiply" src={product.image} />
        </div>
        <div className="grid min-h-[112px] min-w-0 content-center">
          <h3 className="line-clamp-2 text-base font-bold leading-snug">{product.name}</h3>
          <p className="mt-3 text-sm font-bold text-muted-foreground">AI Match</p>
          <p className="text-3xl font-bold leading-none text-value">
            {product.score}<span className="text-base text-muted-foreground">/100</span>
          </p>
          <p className="mt-2 truncate font-bold leading-none text-buy">{title.includes("Overall") ? "Save $49" : product.price}</p>
        </div>
      </div>
    </BentoCard>
  );
}

function AlternativeCard({ item }: { item: AlternativeProduct }) {
  return (
    <BentoCard className="p-4">
      <div className="grid grid-cols-[90px_1fr] gap-4">
        <div className="relative">
          <span className="absolute left-0 top-0 grid size-7 place-items-center rounded-full bg-value text-xs font-bold text-white">
            {item.rank}
          </span>
          <img alt={item.name} className="mt-4 size-24 object-contain mix-blend-multiply" src={item.image} />
        </div>
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p className="mt-1 text-sm font-bold">
            {item.price} {item.oldPrice ? <span className="ml-1 font-semibold text-muted-foreground line-through">{item.oldPrice}</span> : null}
          </p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            AI Match <span className="font-bold text-value">{item.score}/100</span>
          </p>
          <p className="mt-2 text-sm font-medium leading-5 text-muted-foreground">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="outline" className="h-8 rounded-md border-value/30 px-5 text-xs font-bold text-value">
              Compare
            </Button>
            {item.tags.map((tag) => (
              <Badge className="bg-soft-buy text-buy" key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

function WhyAlternatives() {
  const reasons = [
    ["Better Price", "Options that deliver similar or better performance at a lower price.", CircleDollarSign, "text-value bg-soft-value"],
    ["Superior Comfort", "Designed for long listening sessions with plush padding and better ergonomics.", Headphones, "text-buy bg-soft-buy"],
    ["Stronger Noise Cancellation", "Advanced ANC performance for quieter, more immersive listening.", Sparkles, "text-blue-600 bg-blue-50"],
    ["Longer Battery Life", "More hours between charges so your music never stops.", Battery, "text-buy bg-soft-buy"],
    ["Portability", "Foldable or more compact designs for easy travel.", Briefcase, "text-value bg-soft-value"],
    ["Ecosystem Integration", "Seamless pairing and features with your devices and platforms.", CheckCircle2, "text-accent bg-soft-wait"],
  ] as const;

  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        Why these alternatives? <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4">
        {reasons.map(([title, body, Icon, tone]) => (
          <div className="flex gap-4" key={title}>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${tone}`}>
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-bold text-value">{title}</p>
              <p className="mt-1 text-sm font-medium leading-5 text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

function ComparisonTable({ alternatives, product }: { alternatives: AlternativeProduct[]; product: ProductData }) {
  const columns = [product.name, alternatives[0].name, alternatives[1].name, alternatives[2].name];
  const rows = [
    ["Price", product.price, alternatives[0].price, alternatives[1].price, alternatives[2].price],
    ["AI Score", `${product.score}/100`, `${alternatives[0].score}/100`, `${alternatives[1].score}/100`, `${alternatives[2].score}/100`],
    ["Performance", "Very Good", "Excellent", "Very Good", "Excellent"],
    ["Reliability", "Strong", "Outstanding", "Very Good", "Strong"],
    ["Value", "Good", "Excellent", "Outstanding", "Very Good"],
    ["Foldable", "Yes", "Yes", "Yes", "No"],
    ["Best For", "Current pick", "Best overall", "Budget shoppers", "Premium buyers"],
  ];

  return (
    <BentoCard className="p-4">
      <h2 className="mb-4 text-base font-bold">
        Side-by-side comparison <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-center text-sm">
          <thead>
            <tr className="border-y border-border bg-muted/40">
              <th className="p-3 text-left font-bold">Feature</th>
              {columns.map((column) => (
                <th className="p-3 font-bold" key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-b border-border" key={row[0]}>
                {row.map((cell, index) => (
                  <td className={`p-3 ${index === 0 ? "text-left font-bold" : "font-semibold text-muted-foreground"}`} key={`${row[0]}-${index}-${cell}`}>
                    {cell === "Yes" ? <CheckCircle2 className="mx-auto size-5 text-buy" /> : cell === "No" ? <XCircle className="mx-auto size-5 text-avoid" /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BentoCard>
  );
}

function NeedsPanel({ alternatives, product }: { alternatives: AlternativeProduct[]; product: ProductData }) {
  const needs = [
    ["Travel", alternatives[0].name, "Best all-around upgrade for most buyers", Plane, "bg-soft-value text-value"],
    ["Calls", product.name, "Keep this one if its current strengths matter most", Phone, "bg-soft-buy text-buy"],
    ["Gym", alternatives[1].name, "Best lighter or better-value option", Dumbbell, "bg-blue-50 text-blue-600"],
    ["Budget", alternatives[1].name, "Most value-focused recommendation", CircleDollarSign, "bg-soft-wait text-accent"],
    ["Premium", alternatives[2].name, "Best premium-feel alternative", Music, "bg-pink-50 text-pink-600"],
  ] as const;

  return (
    <BentoCard className="p-4">
      <h2 className="mb-4 text-base font-bold">
        Best for your needs <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="grid gap-3">
        {needs.map(([need, item, body, Icon, tone]) => (
          <div className={`grid grid-cols-[34px_100px_1fr_18px] items-center gap-3 rounded-xl p-3 ${tone}`} key={need}>
            <Icon className="size-5" />
            <span className="font-bold">{need}</span>
            <span className="text-sm font-semibold text-foreground">
              {item}
              <span className="block text-xs font-medium text-muted-foreground">{body}</span>
            </span>
            <ChevronDown className="-rotate-90 size-4" />
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

function MoreAlternatives({ alternatives, moreAlternatives }: { alternatives: AlternativeProduct[]; moreAlternatives: string[][] }) {
  return (
    <BentoCard className="p-4">
      <h2 className="mb-4 text-base font-bold">More top alternatives</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {moreAlternatives.map(([name, price, score], index) => (
          <BentoCard className="flex items-center gap-4 p-4 shadow-none hover:translate-y-0" key={name}>
            <img alt={name} className="size-14 object-contain mix-blend-multiply" src={alternatives[index % alternatives.length].image} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{name}</p>
              <p className="text-sm font-bold">{price} <span className="ml-2 text-value">{score}</span></p>
            </div>
            <ChevronDown className="-rotate-90 size-4 text-muted-foreground" />
          </BentoCard>
        ))}
      </div>
    </BentoCard>
  );
}

export default async function AlternativesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<ProductSearchParams>;
}) {
  const { slug } = await params;
  const product = productFromSearchParams(await searchParams);
  const alternativeCategory = inferAlternativeCategory(product);
  const alternativeSet = alternativeCatalog[alternativeCategory];
  const alternatives = alternativeSet.products;
  const moreAlternatives = alternativeSet.more;
  const mobileNavItems = sidebarItems.map(({ label, icon, key }) => ({
    href: key ? productHref(slug, product, key) : "#",
    icon,
    label,
    navKey: key ?? "alternatives",
  }));

  return (
    <div className="flex min-h-screen bg-[#fbfcff] text-foreground">
      <Sidebar product={product} slug={slug} />
      <div className="min-w-0 flex-1">
        <ProductMobileNav activeKey="alternatives" items={mobileNavItems} />
        <main className="p-4 lg:p-5">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Alternatives</h1>
            <p className="mt-2 text-base font-medium text-muted-foreground">
              AI-ranked alternatives and side-by-side product comparisons
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
              <Share2 className="size-4" /> Share
            </Button>
            <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
              <Download className="size-4" /> Export <ChevronDown className="size-4" />
            </Button>
          </div>
          </div>

          <div className="mb-5">
          <div className="relative max-w-[520px]">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 rounded-xl bg-white pl-12 shadow-sm" placeholder="Search alternatives..." />
          </div>
          </div>

          <section className="grid gap-4 xl:grid-cols-[minmax(320px,1.8fr)_1fr_1fr_1fr]">
          <ProductSelector product={product} />
          <FilterBox label="Budget range" value="$0 - $1000" />
          <FilterBox label="Category" value={alternativeSet.label} />
          <FilterBox label="Sort by" value="Best Match" />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-4">
          <HighlightCard icon={Trophy} product={alternatives[0]} title="Best Overall Alternative" />
          <HighlightCard icon={CircleDollarSign} product={alternatives[1]} title="Best Budget Pick" />
          <HighlightCard icon={Star} product={alternatives[2]} title="Best Premium Pick" />
    <BentoCard className="p-4">
            <p className="flex items-center gap-2 text-sm font-bold">
              <span className="grid size-7 place-items-center rounded-full bg-soft-wait text-accent">
                <Sparkles className="size-4" />
              </span>
              Comparison Coverage
            </p>
            <p className="mt-7 text-center text-5xl font-bold text-accent">26</p>
            <p className="mt-1 text-center text-lg font-semibold">matching products</p>
            <p className="mt-3 text-center text-sm font-medium text-muted-foreground">Continuously updated</p>
    </BentoCard>
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <BentoCard className="p-4">
            <h2 className="mb-4 text-base font-bold">
              Top AI Alternatives <Info className="inline size-4 text-muted-foreground" />
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {alternatives.map((item) => (
                <AlternativeCard item={item} key={item.name} />
              ))}
            </div>
          </BentoCard>
          <WhyAlternatives />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]">
          <ComparisonTable alternatives={alternatives} product={product} />
          <NeedsPanel alternatives={alternatives} product={product} />
          </section>

          <section className="mt-4">
            <MoreAlternatives alternatives={alternatives} moreAlternatives={moreAlternatives} />
          </section>
        </main>
      </div>
    </div>
  );
}
