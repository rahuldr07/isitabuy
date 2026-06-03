/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Battery,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  Download,
  Home,
  Info,
  ListChecks,
  MessageCircle,
  Play,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  User,
  Users,
  Volume2,
} from "lucide-react";

import ProductMobileNav from "@/components/product/product-mobile-nav";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "YouTube Insights - BuyWise AI",
  description: "Creator opinions, video summaries, and recurring product mentions.",
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

type InsightProfile = {
  strength: string;
  concern: string;
  pros: Array<[string, string, LucideIcon]>;
  cons: Array<[string, string, LucideIcon]>;
  takeaways: string[];
  quotes: Array<[string, string]>;
  videos: Array<{
    title: string;
    creator: string;
    views: string;
    age: string;
    tone: "Positive" | "Balanced" | "Mixed";
    duration: string;
    summary: string;
    image: string;
  }>;
};

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

function inferProfile(product: ProductData): InsightProfile {
  const text = `${product.name} ${product.subtitle}`.toLowerCase();

  if (text.includes("air fryer") || text.includes("instant pot") || text.includes("blender") || text.includes("coffee")) {
    return {
      strength: "Fast cooking",
      concern: "Counter space",
      pros: [["Cooking speed", "76%", Sparkles], ["Easy cleanup", "64%", ThumbsUp], ["Consistent results", "59%", Star], ["Family portions", "43%", Users]],
      cons: [["Bulky footprint", "42%", ThumbsDown], ["Learning curve", "25%", AlertTriangle], ["Noise", "18%", Volume2], ["Accessories cost", "13%", AlertTriangle]],
      takeaways: ["Creators like the speed for weeknight cooking.", "Most videos praise easy cleanup after daily use.", "The main warning is counter space and basket size.", "Value is strongest when replacing multiple small appliances."],
      quotes: [["It makes weeknight cooking much easier.", "Kitchen Lab"], ["Cleanup is quicker than expected.", "Home Tested"], ["Measure your counter first.", "Smart Kitchen"]],
      videos: videoSet(product, "kitchen"),
    };
  }

  if (text.includes("tv") || text.includes("uhd") || text.includes("oled")) {
    return {
      strength: "Picture quality",
      concern: "Viewing angles",
      pros: [["Picture quality", "81%", Star], ["Gaming response", "66%", Sparkles], ["Smart features", "54%", ShieldCheck], ["Value", "45%", ThumbsUp]],
      cons: [["Viewing angles", "33%", AlertTriangle], ["Sound quality", "24%", Volume2], ["Remote design", "18%", ThumbsDown], ["Bright room glare", "12%", AlertTriangle]],
      takeaways: ["Reviewers praise the picture for movies and sports.", "Gaming creators like the low input lag.", "Most recommend a soundbar for the best setup.", "Brightness and viewing angle feedback depends on room layout."],
      quotes: [["The picture is excellent for the price.", "Display Daily"], ["Gamers get a responsive screen here.", "Setup Studio"], ["Add a soundbar and it feels complete.", "Living Room Tech"]],
      videos: videoSet(product, "tv"),
    };
  }

  if (text.includes("watch") || text.includes("gps")) {
    return {
      strength: "Fitness tracking",
      concern: "Battery life",
      pros: [["Health tracking", "73%", ShieldCheck], ["Comfort", "61%", ThumbsUp], ["Display", "55%", Star], ["App support", "48%", Sparkles]],
      cons: [["Battery life", "37%", Battery], ["Charging speed", "24%", AlertTriangle], ["Strap fit", "16%", ThumbsDown], ["Price", "11%", AlertTriangle]],
      takeaways: ["Creators call the tracking accurate for everyday fitness.", "The display and comfort get repeated praise.", "Battery life is the most common trade-off.", "Best suited for users already in the same phone ecosystem."],
      quotes: [["Fitness tracking is the standout feature.", "Wearable Weekly"], ["The screen is bright and easy to read.", "Tech Runner"], ["Battery is fine, not amazing.", "Everyday Gear"]],
      videos: videoSet(product, "watch"),
    };
  }

  return {
    strength: "Noise cancellation",
    concern: "High price",
    pros: [["ANC", "78%", ShieldCheck], ["Comfort", "62%", Users], ["Sound quality", "58%", Volume2], ["Battery life", "47%", Battery]],
    cons: [["High price", "61%", AlertTriangle], ["Touch controls", "29%", ThumbsDown], ["Bulky case", "21%", AlertTriangle], ["Warm ear cups", "15%", AlertTriangle]],
    takeaways: ["Best-in-class noise cancellation in most real-world tests.", "Extremely comfortable for long listening sessions.", "Sound is clean and detailed but lightly bass-leaning.", "Price is the biggest barrier for casual users."],
    quotes: [["The ANC is just on another level.", "TechFlow"], ["Comfort is insane for long sessions.", "Audio Insider"], ["Great product, but price is a hard sell.", "Budget Audiophile"]],
    videos: videoSet(product, "audio"),
  };
}

function videoSet(product: ProductData, category: "audio" | "kitchen" | "tv" | "watch") {
  const thumbnails = {
    audio: [
      "https://images.pexels.com/photos/7586662/pexels-photo-7586662.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4007744/pexels-photo-4007744.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    kitchen: [
      "https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/5718072/pexels-photo-5718072.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4252148/pexels-photo-4252148.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/6287221/pexels-photo-6287221.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    tv: [
      "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/7991439/pexels-photo-7991439.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/8263328/pexels-photo-8263328.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    watch: [
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
  };

  return [
    {
      title: `${product.name} Review: Is it worth it?`,
      creator: "TechFlow",
      views: "215K views",
      age: "2 months ago",
      tone: "Positive" as const,
      duration: "11:32",
      summary: "Praises the core performance and everyday reliability.",
      image: thumbnails[category][0],
    },
    {
      title: `${product.name} vs top alternatives`,
      creator: "Audio Insider",
      views: "168K views",
      age: "3 months ago",
      tone: "Balanced" as const,
      duration: "9:45",
      summary: "Notes trade-offs, setup details, and competing choices.",
      image: thumbnails[category][1],
    },
    {
      title: `6 Months Later: ${product.name}`,
      creator: "SoundCheck",
      views: "98K views",
      age: "4 months ago",
      tone: "Mixed" as const,
      duration: "8:21",
      summary: "Long-term impressions with strengths and small issues.",
      image: thumbnails[category][2],
    },
    {
      title: `Is ${product.name} worth ${product.price}?`,
      creator: "Budget Audiophile",
      views: "76K views",
      age: "1 month ago",
      tone: "Positive" as const,
      duration: "7:16",
      summary: "Verdict-focused video for value-conscious buyers.",
      image: thumbnails[category][3],
    },
  ];
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
          const active = key === "youtube-insights";
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

function TopControls({ product }: { product: ProductData }) {
  return (
    <BentoCard className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
      <button className="flex min-w-0 items-center gap-4">
        <span className="grid size-16 place-items-center rounded-lg bg-muted">
          <img alt={product.name} className="max-h-14 w-full object-contain mix-blend-multiply" src={product.image} />
        </span>
        <span className="min-w-0 truncate text-left text-lg font-bold">{product.name}</span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
          <Users className="size-4" /> Creator Type <ChevronDown className="size-4" />
        </Button>
        <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
          <CalendarDays className="size-4" /> Last 6 months <ChevronDown className="size-4" />
        </Button>
        <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
          <CirclePlay className="size-4" /> All Videos <ChevronDown className="size-4" />
        </Button>
      </div>
    </BentoCard>
  );
}

function StatCard({ icon: Icon, label, value, note, tone }: { icon: LucideIcon; label: string; value: React.ReactNode; note: string; tone: string }) {
  return (
    <BentoCard className="p-4">
      <p className="flex items-center gap-2 text-sm font-bold">
        {label} <Info className="size-4 text-muted-foreground" />
      </p>
      <div className="mt-4 flex items-center gap-4">
        <span className={`grid size-14 place-items-center rounded-full ${tone}`}>
          <Icon className="size-7" />
        </span>
        <div>
          <div className="text-3xl font-bold leading-none">{value}</div>
          <p className="mt-3 text-sm font-semibold text-buy">{note}</p>
        </div>
      </div>
    </BentoCard>
  );
}

function SentimentTrend() {
  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        Creator sentiment trend <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
        <div>
          <svg className="h-[190px] w-full overflow-visible" viewBox="0 0 520 190" role="img" aria-label="Creator sentiment trend">
            {[0, 25, 50, 75, 100].map((tick, index) => (
              <g key={tick}>
                <line stroke="#eef2f7" x1="40" x2="510" y1={20 + index * 36} y2={20 + index * 36} />
                <text fill="#64748b" fontSize="11" x="0" y={24 + index * 36}>{100 - tick}%</text>
              </g>
            ))}
            <polyline fill="none" points="42,78 118,58 194,59 270,72 346,66 422,66" stroke="#16a34a" strokeWidth="3" />
            <polyline fill="none" points="42,112 118,123 194,123 270,122 346,122 422,122" stroke="#f59e0b" strokeWidth="3" />
            <polyline fill="none" points="42,142 118,146 194,145 270,140 346,141 422,141" stroke="#ef4444" strokeWidth="3" />
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
              <text fill="#64748b" fontSize="12" key={month} x={36 + index * 76} y="184">{month}</text>
            ))}
          </svg>
          <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <span className="text-buy">Positive</span>
            <span className="text-accent">Mixed</span>
            <span className="text-red-500">Negative</span>
          </div>
        </div>
        <div className="grid place-items-center">
          <div className="grid size-36 place-items-center rounded-full" style={{ background: "conic-gradient(#22c55e 0 72%, #fbbf24 72% 93%, #ef4444 93% 100%)" }}>
            <div className="grid size-24 place-items-center rounded-full bg-white text-center">
              <span className="text-3xl font-bold">72%</span>
              <span className="-mt-4 text-xs font-semibold">Positive</span>
            </div>
          </div>
          <div className="mt-4 grid w-full gap-2 text-sm font-semibold">
            <span className="flex justify-between"><span className="text-buy">Positive</span>72%</span>
            <span className="flex justify-between"><span className="text-accent">Mixed</span>21%</span>
            <span className="flex justify-between"><span className="text-red-500">Negative</span>7%</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

function MentionList({ title, items, positive }: { title: string; items: InsightProfile["pros"]; positive: boolean }) {
  return (
    <BentoCard id={positive ? "creator-pros" : "creator-cons"} className="scroll-mt-24 p-4">
      <h2 className="text-base font-bold">
        {title} <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4">
        {items.map(([label, value, Icon]) => (
          <div className="flex items-center gap-4" key={label}>
            <span className={`grid size-9 place-items-center rounded-full ${positive ? "bg-soft-buy text-buy" : "bg-red-50 text-red-500"}`}>
              <Icon className="size-5" />
            </span>
            <span className="font-semibold">{label}</span>
            <span className="ml-auto text-sm font-semibold text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>
      <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-value" href={positive ? "#creator-pros" : "#creator-cons"}>
        View all {positive ? "pros" : "cons"} <ChevronDown className="-rotate-90 size-4" />
      </a>
    </BentoCard>
  );
}

function VideoCard({ video }: { video: ReturnType<typeof videoSet>[number] }) {
  const toneClass = video.tone === "Positive" ? "bg-soft-buy text-buy" : video.tone === "Balanced" ? "bg-soft-wait text-accent" : "bg-soft-value text-value";

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img alt={video.title} className="h-full w-full object-cover" src={video.image} />
        <span className="absolute inset-0 grid place-items-center bg-black/15">
          <span className="grid size-12 place-items-center rounded-full bg-black/55 text-white">
            <Play className="ml-1 size-6 fill-white" />
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-1 text-xs font-bold text-white">{video.duration}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-5">{video.title}</h3>
      <p className="mt-2 text-xs font-semibold text-muted-foreground">
        {video.creator} <span className="text-value">●</span>
      </p>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{video.views} · {video.age}</p>
      <Badge className={`mt-3 ${toneClass}`}>{video.tone}</Badge>
      <p className="mt-3 text-xs font-medium leading-5 text-muted-foreground">
        <span className="font-bold text-foreground">AI Summary:</span> {video.summary}
      </p>
    </div>
  );
}

function VideosAnalyzed({ videos }: { videos: InsightProfile["videos"] }) {
  return (
    <BentoCard id="videos-analyzed" className="scroll-mt-24 p-4">
      <h2 className="text-base font-bold">
        Top videos analyzed <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.title} video={video} />
        ))}
      </div>
      <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-value" href="#videos-analyzed">
        View all videos analyzed <ChevronDown className="-rotate-90 size-4" />
      </a>
    </BentoCard>
  );
}

function Takeaways({ items }: { items: string[] }) {
  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        Key takeaways from creators <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <p className="flex gap-3 text-sm font-medium leading-6" key={item}>
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-value" />
            {item}
          </p>
        ))}
      </div>
    </BentoCard>
  );
}

function QuoteHighlights({ quotes }: { quotes: InsightProfile["quotes"] }) {
  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        Quote highlights <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {quotes.map(([quote, source]) => (
          <div className="rounded-xl bg-[#faf8ff] p-4" key={quote}>
            <p className="text-3xl font-bold leading-none text-value">“</p>
            <p className="mt-2 text-sm font-medium leading-6">“{quote}”</p>
            <p className="mt-4 text-xs font-bold text-value">— {source}</p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

export default async function YoutubeInsightsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<ProductSearchParams>;
}) {
  const { slug } = await params;
  const product = productFromSearchParams(await searchParams);
  const profile = inferProfile(product);
  const mobileNavItems = sidebarItems.map(({ label, icon, key }) => ({
    href: key ? productHref(slug, product, key) : "#",
    icon,
    label,
    navKey: key ?? "youtube-insights",
  }));

  return (
    <div className="flex min-h-screen bg-[#fbfcff] text-foreground">
      <Sidebar product={product} slug={slug} />
      <div className="min-w-0 flex-1">
        <ProductMobileNav activeKey="youtube-insights" items={mobileNavItems} />
        <main className="p-4 lg:p-5">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">YouTube Insights</h1>
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Creator opinions, video summaries, and recurring product mentions
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
            <Input className="h-11 rounded-xl bg-white pl-12 shadow-sm" placeholder="Search creator videos..." />
          </div>
          </div>

          <TopControls product={product} />

          <section className="mt-4 grid gap-4 xl:grid-cols-4">
          <StatCard icon={CirclePlay} label="Videos analyzed" value="126" note="+18 vs last 6 months" tone="bg-soft-value text-value" />
          <StatCard icon={Star} label="Average creator rating" value={<><span>4.4</span><span className="text-xl text-muted-foreground"> /5</span></>} note="Very positive" tone="bg-soft-buy text-buy" />
          <StatCard icon={ShieldCheck} label="Most mentioned strength" value={<span className="block max-w-[170px] text-2xl text-blue-600">{profile.strength}</span>} note="Mentioned in 78% of videos" tone="bg-blue-50 text-blue-600" />
          <StatCard icon={AlertTriangle} label="Most mentioned concern" value={<span className="block max-w-[170px] text-2xl text-red-500">{profile.concern}</span>} note="Mentioned in 61% of videos" tone="bg-red-50 text-red-500" />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.75fr_0.75fr]">
          <SentimentTrend />
          <MentionList positive title="Top mentioned pros" items={profile.pros} />
          <MentionList positive={false} title="Top mentioned cons" items={profile.cons} />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
          <VideosAnalyzed videos={profile.videos} />
          <div className="grid gap-4">
            <Takeaways items={profile.takeaways} />
            <QuoteHighlights quotes={profile.quotes} />
          </div>
          </section>

          <BentoCard className="mt-4 grid gap-4 p-4 md:grid-cols-[auto_1fr_repeat(4,minmax(110px,1fr))] md:items-center">
          <span className="grid size-16 place-items-center rounded-full bg-soft-value text-value">
            <Users className="size-8" />
          </span>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Overall verdict</p>
            <p className="mt-1 text-xl font-bold text-value">
              Excellent for frequent buyers, but price-sensitive shoppers should compare first.
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground">Positive</p>
            <p className="text-2xl font-bold text-buy">72%</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground">Mixed</p>
            <p className="text-2xl font-bold text-accent">21%</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground">Negative</p>
            <p className="text-2xl font-bold text-red-500">7%</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-value">87</p>
            <p className="text-sm font-medium text-muted-foreground">unique creators</p>
          </div>
          </BentoCard>
        </main>
      </div>
    </div>
  );
}
