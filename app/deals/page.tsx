import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PriceRangeFilter from "../components/PriceRangeFilter";

export const metadata = {
  title: "Deals that are actually worth it - IsItABuy AI",
};

interface DealProduct {
  name: string;
  retailer: string;
  rating: string;
  reviews: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string;
  badge: "Buy" | "Wait" | "Avoid";
  scores: [string, string, string];
}

interface FeaturedDeal extends DealProduct {
  subtitle: string;
  average: string;
  why: string[];
}

const navItems = [
  { label: "Search", href: "/search" },
  { label: "Deals", href: "/deals", active: true },
  { label: "Compare", href: "/compare" },
  { label: "Price Tracker", href: "/price-tracker" },
  { label: "Categories", href: "/best-laptops" },
  { label: "Watchlist", href: "/watchlist" },
];

const categories = [
  { label: "All Deals", slug: "all" },
  { label: "Home", slug: "home" },
  { label: "Electronics", slug: "electronics" },
  { label: "Kitchen", slug: "kitchen" },
  { label: "Beauty", slug: "beauty" },
  { label: "Fashion", slug: "fashion" },
  { label: "Gaming", slug: "gaming" },
  { label: "Sports", slug: "sports" },
  { label: "Automotive", slug: "automotive" },
  { label: "Office", slug: "office" },
];

const filters = [
  { label: "Buy", count: 12, checked: true },
  { label: "Wait", count: 8, checked: true },
  { label: "Avoid", count: 4, checked: false },
];

const retailers = [
  {
    label: "Amazon",
    logo: "a",
    logoClass: "bg-white text-[#111827] font-serif text-2xl",
  },
  {
    label: "Best Buy",
    logo: "B",
    logoClass: "bg-[#0046be] text-white",
  },
  {
    label: "Walmart",
    logo: "*",
    logoClass: "bg-[#0071ce] text-[#ffc220] text-xl",
  },
  {
    label: "Flipkart",
    logo: "F",
    logoClass: "bg-[#ffe500] text-[#2874f0]",
  },
  {
    label: "Myntra",
    logo: "M",
    logoClass: "bg-gradient-to-br from-[#f13ab1] via-[#ff6b00] to-[#f4c430] text-white",
  },
  {
    label: "Meesho",
    logo: "m",
    logoClass: "bg-[#7b2cbf] text-[#ff4fa3]",
  },
];

const featuredDeals: Record<string, FeaturedDeal> = {
  all: {
    name: "Sony WH-1000XM5",
    subtitle: "Wireless Noise Cancelling Headphones",
    retailer: "Amazon",
    rating: "4.6",
    reviews: "12,842",
    price: "INR 22,990",
    oldPrice: "INR 29,990",
    discount: "23% off",
    average: "90-day avg: INR 28,450",
    image:
      "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["86", "92", "85%"],
    why: [
      "Lowest price in 90 days",
      "Well below daily average",
      "High review trust (85%)",
      "Popular and reliable choice",
    ],
  },
  electronics: {
    name: "Sony WH-1000XM5",
    subtitle: "Wireless Noise Cancelling Headphones",
    retailer: "Amazon",
    rating: "4.6",
    reviews: "12,842",
    price: "INR 22,990",
    oldPrice: "INR 29,990",
    discount: "23% off",
    average: "90-day avg: INR 28,450",
    image:
      "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["86", "92", "85%"],
    why: ["Lowest price in 90 days", "High review trust", "Strong premium value"],
  },
  home: {
    name: "Dyson V15 Detect",
    subtitle: "Cordless vacuum cleaner",
    retailer: "Amazon",
    rating: "4.5",
    reviews: "8,312",
    price: "INR 43,990",
    oldPrice: "INR 54,900",
    discount: "20% off",
    average: "Target price: INR 39,990",
    image:
      "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Wait",
    scores: ["72", "68", "88%"],
    why: ["Useful discount", "Often drops lower", "Reviews remain strong"],
  },
  kitchen: {
    name: "Ninja AF101 Air Fryer",
    subtitle: "4-quart compact air fryer",
    retailer: "Walmart",
    rating: "4.7",
    reviews: "21,408",
    price: "INR 6,499",
    oldPrice: "INR 8,999",
    discount: "28% off",
    average: "90-day avg: INR 7,850",
    image:
      "https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["88", "91", "89%"],
    why: ["Real price drop", "Reliable model", "Strong long-term ratings"],
  },
  beauty: {
    name: "Dyson Supersonic Dryer",
    subtitle: "Premium hair dryer",
    retailer: "Croma",
    rating: "4.4",
    reviews: "4,210",
    price: "INR 31,990",
    oldPrice: "INR 39,900",
    discount: "20% off",
    average: "90-day avg: INR 36,200",
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["81", "84", "86%"],
    why: ["Verified discount", "High review quality", "Rare premium markdown"],
  },
  fashion: {
    name: "Nike Air Max 270",
    subtitle: "Lifestyle running shoes",
    retailer: "Nike",
    rating: "4.5",
    reviews: "9,744",
    price: "INR 8,495",
    oldPrice: "INR 12,795",
    discount: "34% off",
    average: "90-day avg: INR 10,850",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["83", "87", "82%"],
    why: ["Real markdown", "Popular size availability", "Strong comfort reviews"],
  },
  gaming: {
    name: "Sony PlayStation 5 Slim",
    subtitle: "Console bundle",
    retailer: "Amazon",
    rating: "4.8",
    reviews: "14,090",
    price: "INR 44,990",
    oldPrice: "INR 54,990",
    discount: "18% off",
    average: "90-day avg: INR 49,900",
    image:
      "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["85", "88", "91%"],
    why: ["Bundle value is strong", "Discount is real", "High owner satisfaction"],
  },
  sports: {
    name: "Fitbit Charge 6",
    subtitle: "Fitness tracker",
    retailer: "Flipkart",
    rating: "4.3",
    reviews: "5,884",
    price: "INR 10,999",
    oldPrice: "INR 14,999",
    discount: "27% off",
    average: "90-day avg: INR 12,600",
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["80", "84", "83%"],
    why: ["Good tracker discount", "Stable review quality", "Useful health features"],
  },
  automotive: {
    name: "Michelin Digital Tyre Inflator",
    subtitle: "Portable car compressor",
    retailer: "Amazon",
    rating: "4.4",
    reviews: "3,705",
    price: "INR 2,499",
    oldPrice: "INR 3,799",
    discount: "34% off",
    average: "90-day avg: INR 3,150",
    image:
      "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["79", "86", "80%"],
    why: ["Below average price", "Useful emergency tool", "Trusted brand signal"],
  },
  office: {
    name: "Logitech MX Master 3S",
    subtitle: "Wireless productivity mouse",
    retailer: "Croma",
    rating: "4.7",
    reviews: "6,209",
    price: "INR 7,999",
    oldPrice: "INR 10,995",
    discount: "27% off",
    average: "90-day avg: INR 9,450",
    image:
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
    badge: "Buy",
    scores: ["87", "90", "92%"],
    why: ["Strong productivity value", "Excellent trust score", "Rare deep discount"],
  },
};

const productsByCategory: Record<string, DealProduct[]> = {
  all: [
    {
      name: "Apple AirPods Pro (2nd Gen)",
      retailer: "Amazon",
      rating: "4.6",
      reviews: "18,231",
      price: "INR 20,999",
      oldPrice: "INR 24,900",
      discount: "16% off",
      image:
        "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["82", "88", "89%"],
    },
    {
      name: 'Samsung 55" Crystal 4K TV',
      retailer: "Flipkart",
      rating: "4.4",
      reviews: "7,112",
      price: "INR 38,990",
      oldPrice: "INR 54,900",
      discount: "29% off",
      image:
        "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["84", "91", "82%"],
    },
    {
      name: "Instant Pot Duo 7-in-1",
      retailer: "Amazon",
      rating: "4.3",
      reviews: "6,543",
      price: "INR 7,499",
      oldPrice: "INR 8,999",
      discount: "17% off",
      image:
        "https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["64", "60", "78%"],
    },
  ],
  electronics: [
    {
      name: "Apple AirPods Pro (2nd Gen)",
      retailer: "Amazon",
      rating: "4.6",
      reviews: "18,231",
      price: "INR 20,999",
      oldPrice: "INR 24,900",
      discount: "16% off",
      image:
        "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["82", "88", "89%"],
    },
    {
      name: "JBL Flip 6 Speaker",
      retailer: "Croma",
      rating: "4.5",
      reviews: "9,418",
      price: "INR 8,499",
      oldPrice: "INR 11,999",
      discount: "29% off",
      image:
        "https://images.pexels.com/photos/191877/pexels-photo-191877.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["81", "86", "84%"],
    },
    {
      name: "Samsung Galaxy Buds FE",
      retailer: "Flipkart",
      rating: "4.2",
      reviews: "6,420",
      price: "INR 5,999",
      oldPrice: "INR 9,999",
      discount: "40% off",
      image:
        "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["67", "61", "78%"],
    },
  ],
  home: [
    {
      name: "Dyson V15 Detect",
      retailer: "Amazon",
      rating: "4.5",
      reviews: "8,312",
      price: "INR 43,990",
      oldPrice: "INR 54,900",
      discount: "20% off",
      image:
        "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["72", "68", "88%"],
    },
    {
      name: "Philips Air Purifier 3000i",
      retailer: "Reliance Digital",
      rating: "4.4",
      reviews: "3,540",
      price: "INR 24,999",
      oldPrice: "INR 31,995",
      discount: "22% off",
      image:
        "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["80", "84", "86%"],
    },
    {
      name: "Wakefit Orthopedic Mattress",
      retailer: "Amazon",
      rating: "4.2",
      reviews: "15,087",
      price: "INR 9,999",
      oldPrice: "INR 16,999",
      discount: "41% off",
      image:
        "https://images.pexels.com/photos/6585613/pexels-photo-6585613.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Avoid",
      scores: ["52", "48", "64%"],
    },
  ],
  kitchen: [
    {
      name: "Ninja AF101 Air Fryer",
      retailer: "Walmart",
      rating: "4.7",
      reviews: "21,408",
      price: "INR 6,499",
      oldPrice: "INR 8,999",
      discount: "28% off",
      image:
        "https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["88", "91", "89%"],
    },
    {
      name: "Prestige Mixer Grinder",
      retailer: "Flipkart",
      rating: "4.1",
      reviews: "11,922",
      price: "INR 3,199",
      oldPrice: "INR 5,299",
      discount: "40% off",
      image:
        "https://images.pexels.com/photos/6996089/pexels-photo-6996089.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["76", "83", "72%"],
    },
    {
      name: "Instant Pot Duo 7-in-1",
      retailer: "Amazon",
      rating: "4.3",
      reviews: "6,543",
      price: "INR 7,499",
      oldPrice: "INR 8,999",
      discount: "17% off",
      image:
        "https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["64", "60", "78%"],
    },
  ],
  beauty: [
    {
      name: "Dyson Supersonic Dryer",
      retailer: "Croma",
      rating: "4.4",
      reviews: "4,210",
      price: "INR 31,990",
      oldPrice: "INR 39,900",
      discount: "20% off",
      image:
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["81", "84", "86%"],
    },
    {
      name: "Philips Hair Straightener",
      retailer: "Amazon",
      rating: "4.2",
      reviews: "8,943",
      price: "INR 2,299",
      oldPrice: "INR 3,495",
      discount: "34% off",
      image:
        "https://images.pexels.com/photos/3993462/pexels-photo-3993462.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["78", "85", "75%"],
    },
    {
      name: "Minimalist Vitamin C Serum",
      retailer: "Nykaa",
      rating: "4.1",
      reviews: "12,104",
      price: "INR 599",
      oldPrice: "INR 699",
      discount: "14% off",
      image:
        "https://images.pexels.com/photos/7797778/pexels-photo-7797778.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["68", "58", "81%"],
    },
  ],
  fashion: [
    {
      name: "Nike Air Max 270",
      retailer: "Nike",
      rating: "4.5",
      reviews: "9,744",
      price: "INR 8,495",
      oldPrice: "INR 12,795",
      discount: "34% off",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["83", "87", "82%"],
    },
    {
      name: "Levi's 511 Slim Jeans",
      retailer: "Myntra",
      rating: "4.3",
      reviews: "6,802",
      price: "INR 2,199",
      oldPrice: "INR 4,499",
      discount: "51% off",
      image:
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["79", "86", "77%"],
    },
    {
      name: "Fossil Gen 6 Watch",
      retailer: "Amazon",
      rating: "4.0",
      reviews: "3,081",
      price: "INR 11,995",
      oldPrice: "INR 23,995",
      discount: "50% off",
      image:
        "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Avoid",
      scores: ["49", "55", "52%"],
    },
  ],
  gaming: [
    {
      name: "Sony PlayStation 5 Slim",
      retailer: "Amazon",
      rating: "4.8",
      reviews: "14,090",
      price: "INR 44,990",
      oldPrice: "INR 54,990",
      discount: "18% off",
      image:
        "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["85", "88", "91%"],
    },
    {
      name: "Xbox Wireless Controller",
      retailer: "Flipkart",
      rating: "4.6",
      reviews: "10,210",
      price: "INR 4,299",
      oldPrice: "INR 5,990",
      discount: "28% off",
      image:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["82", "87", "86%"],
    },
    {
      name: "Razer BlackWidow V4",
      retailer: "Amazon",
      rating: "4.4",
      reviews: "2,902",
      price: "INR 9,999",
      oldPrice: "INR 13,999",
      discount: "29% off",
      image:
        "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["71", "63", "84%"],
    },
  ],
  sports: [
    {
      name: "Fitbit Charge 6",
      retailer: "Flipkart",
      rating: "4.3",
      reviews: "5,884",
      price: "INR 10,999",
      oldPrice: "INR 14,999",
      discount: "27% off",
      image:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["80", "84", "83%"],
    },
    {
      name: "Decathlon Yoga Mat",
      retailer: "Decathlon",
      rating: "4.5",
      reviews: "4,411",
      price: "INR 999",
      oldPrice: "INR 1,499",
      discount: "33% off",
      image:
        "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["77", "82", "80%"],
    },
    {
      name: "Adidas Training Duffel",
      retailer: "Myntra",
      rating: "4.2",
      reviews: "1,984",
      price: "INR 1,699",
      oldPrice: "INR 3,299",
      discount: "48% off",
      image:
        "https://images.pexels.com/photos/3601097/pexels-photo-3601097.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["69", "61", "75%"],
    },
  ],
  automotive: [
    {
      name: "Michelin Digital Tyre Inflator",
      retailer: "Amazon",
      rating: "4.4",
      reviews: "3,705",
      price: "INR 2,499",
      oldPrice: "INR 3,799",
      discount: "34% off",
      image:
        "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["79", "86", "80%"],
    },
    {
      name: "Bosch Car Vacuum Cleaner",
      retailer: "Croma",
      rating: "4.1",
      reviews: "2,311",
      price: "INR 3,499",
      oldPrice: "INR 4,999",
      discount: "30% off",
      image:
        "https://images.pexels.com/photos/3849555/pexels-photo-3849555.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["74", "81", "76%"],
    },
    {
      name: "Generic Dash Cam 4K",
      retailer: "Amazon",
      rating: "3.8",
      reviews: "1,109",
      price: "INR 2,999",
      oldPrice: "INR 9,999",
      discount: "70% off",
      image:
        "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Avoid",
      scores: ["36", "28", "42%"],
    },
  ],
  office: [
    {
      name: "Logitech MX Master 3S",
      retailer: "Croma",
      rating: "4.7",
      reviews: "6,209",
      price: "INR 7,999",
      oldPrice: "INR 10,995",
      discount: "27% off",
      image:
        "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["87", "90", "92%"],
    },
    {
      name: "Herman Miller Sayl Chair",
      retailer: "Amazon",
      rating: "4.5",
      reviews: "882",
      price: "INR 62,990",
      oldPrice: "INR 79,990",
      discount: "21% off",
      image:
        "https://images.pexels.com/photos/509922/pexels-photo-509922.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Wait",
      scores: ["73", "62", "90%"],
    },
    {
      name: "Anker USB-C Docking Station",
      retailer: "Amazon",
      rating: "4.4",
      reviews: "3,614",
      price: "INR 8,999",
      oldPrice: "INR 12,999",
      discount: "31% off",
      image:
        "https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=500",
      badge: "Buy",
      scores: ["84", "89", "85%"],
    },
  ],
};

function badgeTone(badge: DealProduct["badge"]) {
  if (badge === "Buy") return "bg-verdict-buy text-white";
  if (badge === "Wait") return "bg-verdict-wait text-white";
  return "bg-verdict-avoid text-white";
}

function scoreTone(product: DealProduct, index: number) {
  if (product.badge === "Avoid") return "text-verdict-avoid";
  if (product.badge === "Wait" && index < 2) return "text-verdict-wait";
  return "text-verdict-buy";
}

function isCategorySlug(value: string) {
  return categories.some((category) => category.slug === value);
}

function categoryHref(slug: string) {
  return slug === "all" ? "/deals" : `/deals?category=${slug}`;
}

function retailerMark(retailer: string) {
  const marks: Record<string, { logo: string; className: string }> = {
    Amazon: {
      logo: "a",
      className: "bg-white text-[#111827] font-serif text-lg",
    },
    Flipkart: {
      logo: "F",
      className: "bg-[#ffe500] text-[#2874f0] text-sm",
    },
    Walmart: {
      logo: "*",
      className: "bg-[#0071ce] text-[#ffc220] text-lg",
    },
    Croma: {
      logo: "C",
      className: "bg-[#16b9a8] text-white text-sm",
    },
    Myntra: {
      logo: "M",
      className:
        "bg-gradient-to-br from-[#f13ab1] via-[#ff6b00] to-[#f4c430] text-white text-sm",
    },
  };

  return (
    marks[retailer] ?? {
      logo: retailer.charAt(0),
      className: "bg-surface-container-low text-[#111827] text-sm",
    }
  );
}

function HorizontalDealCard({
  deal,
  label,
  featured = false,
}: {
  deal: DealProduct | FeaturedDeal;
  label: string;
  featured?: boolean;
}) {
  const subtitle = "subtitle" in deal ? deal.subtitle : `${deal.retailer} verified deal`;
  const average = "average" in deal ? deal.average : "Recent price checked by AI";
  const why =
    "why" in deal
      ? deal.why
      : [
          `${deal.discount} versus typical price`,
          `AI score ${deal.scores[0]} with ${deal.scores[2]} review trust`,
          `${deal.retailer} price currently looks competitive`,
        ];
  const actionButtonClass =
    "box-border inline-flex h-[40px] min-h-[40px] max-h-[40px] w-full min-w-0 appearance-none items-center justify-center gap-1 overflow-visible rounded-lg border border-transparent px-2 py-0 text-sm font-extrabold leading-none shadow-none transition-colors";
  const mark = retailerMark(deal.retailer);

  return (
    <Card
      className={`relative rounded-xl p-2.5 shadow-sm ${
        featured
          ? "border-verdict-buy bg-gradient-to-r from-white to-verdict-buy/5"
          : "border-surface-variant bg-white"
      }`}
    >
      <Badge
        className={`absolute left-4 top-0 h-6 rounded-b-md rounded-t-none px-4 py-1 text-xs font-extrabold text-white ${
          featured ? "bg-verdict-buy" : badgeTone(deal.badge)
        }`}
      >
        {label}
      </Badge>

      <div className="grid gap-4 pt-4 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,1fr)_230px]">
        <div className="relative grid min-h-[150px] place-items-center overflow-hidden rounded-lg border border-surface-variant bg-white p-3">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-2 z-10 size-8 rounded-full border-surface-variant bg-white/95 shadow-sm backdrop-blur"
          >
            <span className="material-symbols-outlined text-[17px]">favorite</span>
          </Button>
          <img
            alt={deal.name}
            className="h-[124px] w-full object-contain"
            src={deal.image}
          />
        </div>

        <div className="min-w-0">
          <div className="mb-2">
            <h2 className="text-lg font-extrabold text-[#111827]">{deal.name}</h2>
            <p className="mt-0.5 text-sm font-medium text-on-surface-variant">{subtitle}</p>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-md text-center font-extrabold leading-none ${mark.className}`}
                aria-hidden="true"
              >
                {mark.logo}
              </span>
              {deal.retailer}
            </span>
            <span className="flex items-center gap-1 text-primary-container">
              <span className="material-symbols-outlined text-[15px]">star</span>
              {deal.rating}
              <span className="text-on-surface-variant">({deal.reviews})</span>
            </span>
          </div>

          <div className="grid max-w-[460px] grid-cols-2 divide-x divide-surface-variant">
            <div>
              <p className="text-xs font-semibold text-on-surface-variant">Current Price</p>
              <p className="mt-1 text-2xl font-extrabold text-[#111827]">{deal.price}</p>
              <Badge className="mt-1.5 rounded bg-verdict-buy/10 px-2 py-0.5 text-xs font-bold text-verdict-buy">
                {deal.discount}
              </Badge>
            </div>
            <div className="pl-5">
              <p className="text-xs font-semibold text-on-surface-variant">Typical Price</p>
              <p className="mt-1 text-xl font-extrabold text-on-surface-variant line-through">
                {deal.oldPrice}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-on-surface-variant">{average}</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col justify-start gap-4 md:col-span-2 lg:col-span-1">
          <div className="grid grid-cols-3 divide-x divide-surface-variant rounded-lg">
            {["AI Score", "Price", "Trust"].map((scoreLabel, index) => (
              <div key={scoreLabel} className="px-2 text-center">
                <p className="text-[10px] font-bold">{scoreLabel}</p>
                <p className={`mt-1 text-2xl font-extrabold ${scoreTone(deal, index)}`}>
                  {deal.scores[index]}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border-l border-surface-variant pl-3">
            <h3 className="mb-1.5 text-xs font-extrabold">Why this is worth it</h3>
            {why.slice(0, 3).map((item) => (
              <p key={item} className="mb-0.5 flex items-center gap-2 text-xs font-medium text-[#374151]">
                <span className="material-symbols-outlined text-[15px] text-verdict-buy">
                  check
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 md:col-span-2 min-[520px]:grid-cols-3 lg:col-span-2 lg:col-start-2 lg:max-w-[690px] lg:grid-cols-[168px_168px_190px] lg:justify-between">
          <button
            type="button"
            className={`${actionButtonClass} bg-primary-container text-white hover:bg-amber-600`}
          >
            Buy Now
          </button>
          <Link
            href="/product"
            className={`${actionButtonClass} bg-[#6b21a8] text-white hover:bg-[#581c87]`}
          >
            AI Analysis
          </Link>
          <button
            type="button"
            className={`${actionButtonClass} border-[#8ee0c6] bg-gradient-to-br from-[#effdf7] to-[#dff9ef] text-[#008060] hover:from-[#e4fbf2] hover:to-[#d3f5e8]`}
          >
            <span className="material-symbols-outlined text-[18px] leading-none">
              notifications
            </span>
            <span className="whitespace-nowrap">Set Price Alert</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const requestedCategory = params.category ?? "all";
  const activeCategory = isCategorySlug(requestedCategory)
    ? requestedCategory
    : "all";
  const featuredDeal = featuredDeals[activeCategory] ?? featuredDeals.all;
  const products = productsByCategory[activeCategory] ?? productsByCategory.all;
  const worthProducts = products.filter(
    (product) => product.name !== featuredDeal.name,
  );
  const nextWorthProduct = worthProducts[0] ?? products[0];
  const thirdWorthProduct = worthProducts[1] ?? products[1] ?? products[0];
  const activeLabel =
    categories.find((category) => category.slug === activeCategory)?.label ??
    "All Deals";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-on-surface">
      <header className="sticky top-0 z-50 border-b border-surface-variant/70 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1230px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl text-primary-container">
              <span className="material-symbols-outlined text-[31px]">shield</span>
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate text-lg font-extrabold tracking-tight text-[#111827] sm:text-xl">
                IsItABuy AI
              </span>
              <span className="hidden text-[10px] font-semibold text-on-surface-variant sm:block">
                AI Shopping Advisor
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex h-[72px] items-center text-sm font-bold ${
                  item.active ? "text-primary-container" : "text-[#1f2937]"
                }`}
              >
                {item.label}
                {item.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-container" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden size-10 place-items-center rounded-full text-[#111827] hover:bg-surface-container-low sm:grid">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <Link
              href="/signin"
              className="hidden h-10 items-center rounded-lg border border-outline-variant bg-white px-5 text-sm font-bold text-[#111827] shadow-sm hover:bg-surface sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-10 items-center rounded-lg bg-primary-container px-4 text-sm font-bold text-white shadow-sm hover:bg-amber-600 sm:px-5"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1230px] px-4 pb-14 sm:px-6">
        <section className="mx-auto max-w-[760px] pb-4 pt-3 text-center">
          <nav className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold text-on-surface-variant">
            <Link href="/" className="hover:text-primary-container">
              Home
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span>Deals</span>
          </nav>

          <h1 className="mb-2 text-[clamp(2rem,7vw,3.5rem)] font-extrabold leading-none tracking-tight text-[#111827] lg:whitespace-nowrap">
            Deals that are actually worth it
          </h1>
          <p className="mx-auto mb-3 max-w-[560px] text-base font-medium leading-snug text-[#5b6473]">
            AI-ranked deals based on price history, current retailer offers, AI Buy
            Score, review trust, and real value - not inflated discounts.
          </p>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <Badge
              variant="outline"
              className="h-10 gap-2 rounded-full border-surface-variant bg-white px-4 text-xs font-bold shadow-sm"
            >
              <span
                className="material-symbols-outlined text-[18px] text-verdict-buy"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              Deal scores are not based on commission
            </Badge>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4b5563]">
              <span className="material-symbols-outlined text-[18px]">update</span>
              Prices refreshed 4 minutes ago
            </div>
          </div>

          <div className="mx-auto flex max-w-[760px] flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[23px] text-on-surface-variant">
                shopping_bag
              </span>
              <Input
                className="h-14 rounded-xl border-surface-variant bg-white pl-14 pr-5 text-base shadow-sm placeholder:text-[#9ca3af]"
                placeholder="Search deals by product, category, or store..."
                type="text"
              />
            </div>
            <Button className="h-14 rounded-xl bg-primary-container px-10 text-base font-extrabold text-white shadow-sm hover:bg-amber-600">
              Search deals
            </Button>
          </div>
        </section>

        <Card className="rounded-xl border-surface-variant py-0 shadow-sm">
          <div className="flex flex-col border-b border-surface-variant lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 gap-1 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => {
                const isActive = activeCategory === category.slug;
                return (
                  <Link
                    key={category.slug}
                    href={categoryHref(category.slug)}
                    className={`relative flex h-12 shrink-0 items-center whitespace-nowrap px-3 text-sm font-bold sm:px-4 ${
                      isActive ? "text-primary-container" : "text-[#4b5563]"
                    }`}
                  >
                    {category.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary-container" />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-surface-variant px-4 py-2 lg:border-t-0 lg:px-5">
              <span className="text-xs font-semibold text-on-surface-variant lg:hidden">
                Showing: {activeLabel}
              </span>
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-on-surface-variant sm:inline">
                  Sort by:
                </span>
                <Select defaultValue="best-ai-deal">
                  <SelectTrigger className="h-9 min-w-[150px] rounded-md border-surface-variant bg-white text-xs font-bold">
                    <SelectValue placeholder="Best AI Deal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-ai-deal">Best AI Deal</SelectItem>
                    <SelectItem value="biggest-real-drop">Biggest real drop</SelectItem>
                    <SelectItem value="highest-review-trust">Highest review trust</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="self-start border border-surface-variant bg-white px-8 py-8 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <h2 className="mb-8 text-xl font-extrabold tracking-tight text-[#111827]">
              Filters
            </h2>
            <div className="divide-y divide-surface-variant/80">
              <div className="pb-7">
                <div className="mb-4 text-base font-extrabold uppercase tracking-[0.08em] text-[#475569]">
                  Verdict
                </div>
                <div className="space-y-3">
                  {filters.map((filter) => (
                    <label
                      key={filter.label}
                      className="flex items-center gap-3 text-lg text-[#111827]"
                    >
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={filter.checked}
                        aria-label={`Filter ${filter.label} deals`}
                      />
                      <span className="relative grid size-5 shrink-0 place-items-center rounded-[3px] border border-[#9ca3af] bg-white transition-colors after:absolute after:left-1/2 after:top-1/2 after:h-2.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-[56%] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:opacity-0 after:content-[''] peer-checked:border-[#2f8892] peer-checked:bg-[#2f8892] peer-checked:after:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2f8892]/30" />
                      <span className="font-medium">
                        {filter.label} ({filter.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="py-7">
                <PriceRangeFilter />
              </div>

              <div className="pt-7">
                <div className="mb-4 text-base font-extrabold uppercase tracking-[0.08em] text-[#475569]">
                  Retailer
                </div>
                <div className="space-y-3">
                  {retailers.map((retailer) => (
                    <label
                      key={retailer.label}
                      className="flex items-center gap-3 text-lg text-[#111827]"
                    >
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        aria-label={`Filter ${retailer.label} deals`}
                      />
                      <span className="relative grid size-5 shrink-0 place-items-center rounded-[3px] border border-[#9ca3af] bg-white transition-colors after:absolute after:left-1/2 after:top-1/2 after:h-2.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-[56%] after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:opacity-0 after:content-[''] peer-checked:border-[#2f8892] peer-checked:bg-[#2f8892] peer-checked:after:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2f8892]/30" />
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-md text-center text-sm font-extrabold ${retailer.logoClass}`}
                        aria-hidden="true"
                      >
                        {retailer.logo}
                      </span>
                      <span className="min-w-0 truncate font-medium">{retailer.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <HorizontalDealCard
              deal={featuredDeal}
              featured
              label="Best deals"
            />
            <HorizontalDealCard
              deal={nextWorthProduct}
              label="Best deals"
            />
            <HorizontalDealCard
              deal={thirdWorthProduct}
              label="Best deals"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
