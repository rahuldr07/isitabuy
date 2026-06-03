/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CirclePlay,
  Download,
  ExternalLink,
  Globe,
  Home,
  Info,
  ListChecks,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";

import ProductMobileNav from "@/components/product/product-mobile-nav";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { homeSectionHrefs } from "@/lib/navigation";

export const metadata = {
  title: "Reviews AI - BuyWise AI",
  description: "AI-powered review trust, complaints, sentiment, and authenticity analysis.",
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

const pros = [
  ["Excellent sound quality", "72%"],
  ["Industry-leading ANC", "64%"],
  ["Very comfortable", "58%"],
  ["Premium build quality", "46%"],
  ["Great battery life", "41%"],
];

const cons = [
  ["Expensive", "38%"],
  ["Ear cups get warm", "18%"],
  ["Case is bulky", "12%"],
  ["No foldable design", "9%"],
  ["Touch controls finicky", "7%"],
];

const topics = [
  ["sound quality", "12.1k"],
  ["ANC", "9.8k"],
  ["comfort", "8.7k"],
  ["battery life", "6.2k"],
  ["bass", "4.6k"],
  ["build quality", "4.1k"],
  ["app", "3.2k"],
  ["bluetooth", "2.9k"],
  ["mic quality", "2.6k"],
  ["value", "2.3k"],
  ["case", "1.9k"],
  ["controls", "1.7k"],
];

const snippets = [
  {
    source: "Amazon",
    tone: "positive",
    text: "Best headphones I've ever owned. The ANC is incredible and blocks out everything. Sound is crisp and balanced.",
    time: "5 days ago",
  },
  {
    source: "Best Buy",
    tone: "mixed",
    text: "Great sound and ANC, but the ear cups get a bit warm after a few hours. Still overall very isitabuy with the purchase.",
    time: "1 week ago",
  },
  {
    source: "Amazon",
    tone: "positive",
    text: "Battery life is amazing and the app is super useful. The case is a bit bulky though.",
    time: "2 weeks ago",
  },
  {
    source: "Walmart",
    tone: "negative",
    text: "Too expensive for what it offers. The touch controls can be frustrating at times.",
    time: "3 weeks ago",
  },
];

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
          const active = key === "reviews-ai";
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

      <div className="mt-auto grid gap-4">
        <BentoCard className="flex items-center justify-between p-4">
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
      </div>
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
        <span className="min-w-0 text-left text-lg font-bold">{product.name}</span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
          <Globe className="size-4" /> All Sources <ChevronDown className="size-4" />
        </Button>
        <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
          <CalendarDays className="size-4" /> Last 90 days <ChevronDown className="size-4" />
        </Button>
      </div>
    </BentoCard>
  );
}

function ScoreCard({
  icon: Icon,
  iconClass,
  label,
  meta,
  score,
  subtext,
}: {
  icon: LucideIcon;
  iconClass: string;
  label: string;
  meta: string;
  score: string;
  subtext: string;
}) {
  return (
    <BentoCard className="p-4">
      <p className="text-sm font-semibold">
        {label} <Info className="inline size-4 text-muted-foreground" />
      </p>
      <div className="mt-4 flex items-center gap-4">
        <span className={`grid size-14 place-items-center rounded-full ${iconClass}`}>
          <Icon className="size-8" />
        </span>
        <div>
          <p className="text-3xl font-bold">{score}</p>
          <p className="mt-1 text-sm font-bold text-buy">{subtext}</p>
          <p className="mt-2 text-xs font-semibold text-muted-foreground">{meta}</p>
        </div>
      </div>
    </BentoCard>
  );
}

function SentimentDistribution({ product }: { product: ProductData }) {
  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        Review Sentiment Distribution <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid items-center gap-4 md:grid-cols-[250px_1fr]">
        <div className="relative mx-auto grid size-44 place-items-center rounded-full border-[28px] border-buy border-l-[#91d9aa] border-t-[#fbbf24]">
          <div className="absolute -right-1 bottom-10 rounded-full bg-buy px-2 py-1 text-xs font-bold text-white">65%</div>
          <div className="text-center">
            <p className="text-4xl font-bold">{product.rating}</p>
            <p className="text-xs font-semibold text-muted-foreground">Average</p>
            <div className="mt-2 flex text-buy">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className="size-4 fill-current" key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            ["5 Star (Excellent)", "65%", "8,612", "bg-buy", "w-[65%]"],
            ["4 Star (Good)", "24%", "3,178", "bg-buy", "w-[24%]"],
            ["3 Star (Average)", "7%", "923", "bg-[#fbbf24]", "w-[7%]"],
            ["2 Star (Poor)", "2%", "265", "bg-accent", "w-[2%]"],
            ["1 Star (Bad)", "2%", "198", "bg-avoid", "w-[2%]"],
          ].map(([label, percent, count, color, width]) => (
            <div className="grid grid-cols-[145px_1fr_80px] items-center gap-4 text-sm" key={label}>
              <span className="font-semibold text-muted-foreground">{label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-muted">
                <span className={`block h-full rounded-full ${color} ${width}`} />
              </span>
              <span className="font-semibold text-muted-foreground">{percent} ({count})</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground">Total reviews analyzed: 13,176</p>
    </BentoCard>
  );
}

function ListPanel({
  icon: Icon,
  items,
  title,
  tone,
}: {
  icon: LucideIcon;
  items: string[][];
  title: string;
  tone: "good" | "bad";
}) {
  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        {title} <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid gap-4">
        {items.map(([label, value]) => (
          <div className="flex items-center gap-3 text-sm font-semibold" key={label}>
            <span className={`grid size-7 place-items-center rounded-lg ${tone === "good" ? "bg-soft-buy text-buy" : "bg-red-50 text-avoid"}`}>
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <span className="text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>
      <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-value" href="#review-snippets">
        View more {tone === "good" ? "pros" : "cons"} <ExternalLink className="size-4" />
      </a>
    </BentoCard>
  );
}

function AiSummary({ product }: { product: ProductData }) {
  return (
    <BentoCard className="p-4">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <Sparkles className="size-5 text-value" /> AI Summary
      </h2>
      <p className="mt-4 text-sm font-medium leading-6 text-foreground">
        The {product.name} receives overwhelmingly positive feedback for its exceptional sound quality,
        reliable performance, and comfort. Most users highlight the immersive experience and effective core features.
      </p>
      <p className="mt-4 text-sm font-medium leading-6 text-foreground">
        Common criticisms include the high price point and warm ear cups during extended use. A small number of users
        also mention case size and controls as minor drawbacks.
      </p>
      <Button variant="outline" className="mt-4 h-10 rounded-lg border-value/30 bg-soft-value px-6 font-bold text-value">
        <Sparkles className="size-4" /> Generate Full Summary
      </Button>
    </BentoCard>
  );
}

function KeywordsPanel() {
  return (
    <BentoCard id="topics" className="scroll-mt-24 p-4">
      <h2 className="text-base font-bold">
        Keyword / Topics <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {topics.map(([topic, count]) => (
          <Badge className="rounded-full bg-soft-value px-4 py-2 text-sm font-semibold text-value" key={topic}>
            {topic} <span className="ml-2 text-[#756bb6]">{count}</span>
          </Badge>
        ))}
      </div>
      <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-value" href="#topics">
        View all topics <ExternalLink className="size-4" />
      </a>
    </BentoCard>
  );
}

function AuthenticityPanel() {
  return (
    <BentoCard className="p-4">
      <h2 className="text-base font-bold">
        Review Authenticity <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[150px_1fr]">
        <div className="relative grid size-36 place-items-center rounded-full border-[16px] border-value border-l-[#c4b5fd]">
          <div className="text-center">
            <p className="text-lg font-bold">Low Risk</p>
            <p className="text-xs font-semibold text-muted-foreground">Authenticity Risk</p>
          </div>
        </div>
        <div className="grid gap-4 text-sm font-semibold">
          <span className="flex justify-between"><span className="text-value">Low Risk</span> 88%</span>
          <span className="flex justify-between"><span className="text-wait">Moderate Risk</span> 9%</span>
          <span className="flex justify-between"><span className="text-avoid">High Risk</span> 3%</span>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-[#f4f1ff] p-4 text-sm font-medium leading-6 text-foreground">
        We didn&apos;t find significant signs of fake or incentivized reviews for this product.
        <br />
        <a className="font-bold text-value" href={homeSectionHrefs.howItWorks}>Learn more about our methodology</a>
      </div>
    </BentoCard>
  );
}

function ReviewSnippets() {
  return (
    <BentoCard id="review-snippets" className="scroll-mt-24 p-4">
      <h2 className="mb-5 text-base font-bold">
        Recent Review Snippets <Info className="inline size-4 text-muted-foreground" />
      </h2>
      <div className="grid gap-4 xl:grid-cols-4">
        {snippets.map((snippet) => (
          <BentoCard className="p-4 shadow-none hover:translate-y-0" key={`${snippet.source}-${snippet.time}`}>
            <div className={`mb-3 flex ${snippet.tone === "negative" ? "text-avoid" : snippet.tone === "mixed" ? "text-wait" : "text-buy"}`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className={`size-4 ${index < (snippet.tone === "negative" ? 2 : snippet.tone === "mixed" ? 3 : 5) ? "fill-current" : ""}`} key={index} />
              ))}
            </div>
            <div className="mb-4 flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>{snippet.time}</span>
              <span className="text-buy">Verified Purchase</span>
            </div>
            <p className="text-sm font-medium leading-6 text-foreground">{snippet.text}</p>
            <p className="mt-4 text-sm font-bold">{snippet.source}</p>
          </BentoCard>
        ))}
      </div>
    </BentoCard>
  );
}

export default async function ReviewsAiPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<ProductSearchParams>;
}) {
  const { slug } = await params;
  const product = productFromSearchParams(await searchParams);
  const trustScore = Math.min(99, product.score + 1);
  const verifiedRatio = Math.max(55, product.score - 11);
  const mobileNavItems = sidebarItems.map(({ label, icon, key }) => ({
    href: key ? productHref(slug, product, key) : "#",
    icon,
    label,
    navKey: key ?? "reviews-ai",
  }));

  return (
    <div className="flex min-h-screen bg-[#fbfcff] text-foreground">
      <Sidebar product={product} slug={slug} />
      <div className="min-w-0 flex-1">
        <ProductMobileNav activeKey="reviews-ai" items={mobileNavItems} />
        <main className="p-4 lg:p-5">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Reviews AI</h1>
            <p className="mt-2 text-base font-medium text-muted-foreground">
              AI-powered review trust, complaints, and sentiment analysis
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
            <Input className="h-11 rounded-xl bg-white pl-12 shadow-sm" placeholder="Search review insights..." />
          </div>
          </div>

          <TopControls product={product} />

          <section className="mt-4 grid gap-4 xl:grid-cols-4">
          <ScoreCard icon={ShieldCheck} iconClass="bg-soft-value text-value" label="Review Trust Score" meta="5 pts vs last 90 days" score={`${trustScore}/100`} subtext="High trust" />
          <ScoreCard icon={Smile} iconClass="bg-soft-buy text-buy" label="Sentiment Score" meta="0.4 vs last 90 days" score={`${product.rating}/5`} subtext="Very Positive" />
          <ScoreCard icon={BadgeCheck} iconClass="bg-blue-100 text-blue-600" label="Verified Review Ratio" meta="8% vs last 90 days" score={`${verifiedRatio}%`} subtext="Verified" />
          <ScoreCard icon={AlertTriangle} iconClass="bg-red-50 text-avoid" label="Common Complaints" meta="Similar vs last 90 days" score="4" subtext="High impact" />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr]">
          <SentimentDistribution product={product} />
          <ListPanel icon={ThumbsUp} items={pros} title="Top Pros" tone="good" />
          <ListPanel icon={ThumbsDown} items={cons} title="Top Cons" tone="bad" />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_1fr_1.1fr]">
          <AiSummary product={product} />
          <KeywordsPanel />
          <AuthenticityPanel />
          </section>

          <section className="mt-4">
            <ReviewSnippets />
          </section>
        </main>
      </div>
    </div>
  );
}
