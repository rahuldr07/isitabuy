/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Crown,
  DollarSign,
  ExternalLink,
  Heart,
  HelpCircle,
  Home,
  Hourglass,
  Info,
  ListChecks,
  MessageCircle,
  CirclePlay,
  Repeat2,
  Search,
  Share2,
  ShoppingCart,
  Sparkles,
  Star,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export const metadata = {
  title: "Product Analysis - BuyWise AI",
  description: "AI buy score, price history, reviews, and alternatives for the selected deal.",
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
  { label: "Reviews AI", icon: MessageCircle },
  { label: "Alternatives", icon: Sparkles },
  { label: "YouTube Insights", icon: CirclePlay },
  { label: "Track Price", icon: ClipboardCheck },
  { label: "My Lists", icon: ListChecks },
] satisfies Array<{ label: string; icon: LucideIcon; key?: "overview" | "price-history" }>;

const pros = ["Outstanding noise cancellation", "Excellent sound quality", "Very comfortable"];
const cons = ["Expensive", "Ear cups get warm", "Call quality could be better"];

function readParam(value: string | string[] | undefined, fallback: string) {
  const normalized = Array.isArray(value) ? value[0] : value;

  return normalized?.trim() ? normalized : fallback;
}

function clampScore(value: string | string[] | undefined) {
  const parsed = Number(readParam(value, String(fallbackProduct.score)));

  return Number.isFinite(parsed) ? Math.min(99, Math.max(1, Math.round(parsed))) : fallbackProduct.score;
}

function productFromSearchParams(searchParams?: ProductSearchParams): ProductData {
  return {
    name: readParam(searchParams?.name, fallbackProduct.name),
    subtitle: readParam(searchParams?.subtitle, fallbackProduct.subtitle),
    image: readParam(searchParams?.image, fallbackProduct.image),
    price: readParam(searchParams?.price, fallbackProduct.price),
    oldPrice: readParam(searchParams?.oldPrice, fallbackProduct.oldPrice),
    retailer: readParam(searchParams?.retailer, fallbackProduct.retailer),
    rating: readParam(searchParams?.rating, fallbackProduct.rating),
    reviews: readParam(searchParams?.reviews, fallbackProduct.reviews),
    score: clampScore(searchParams?.score),
    discount: readParam(searchParams?.discount, fallbackProduct.discount),
  };
}

function moneyValue(value: string) {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function buildSellers(product: ProductData) {
  const base = moneyValue(product.price) || 278;
  const primary = product.retailer;
  const others = ["amazon", "BEST BUY", "Walmart", "Target"].filter((seller) => seller.toLowerCase() !== primary.toLowerCase());
  const sellerNames = [primary, ...others].slice(0, 4);

  return sellerNames.map((seller, index) => ({
    name: seller,
    price: index === 0 ? product.price : formatMoney(base + 18 + index * 10),
    note: index === 0 ? "Best Price" : `$${(18 + index * 10).toFixed(2)} more`,
    brandClass:
      seller.toLowerCase() === "amazon"
        ? "font-serif"
        : seller.toLowerCase() === "walmart"
          ? "text-[#0071ce]"
          : seller.toLowerCase() === "target"
            ? "text-[#cc0000]"
            : "",
    noteClass: index === 0 ? "bg-soft-buy text-buy" : "bg-muted text-foreground",
  }));
}

function scoreBreakdown(product: ProductData) {
  return [
    ["Reviews Quality", Math.min(99, product.score + 3)],
    ["Price & Value", Math.max(1, product.score - 4)],
    ["Trust & Reliability", Math.min(99, product.score + 1)],
    ["Features & Specs", Math.max(1, product.score - 1)],
    ["Alternatives", Math.max(1, product.score - 9)],
  ] as const;
}

function productHref(slug: string, product: ProductData, section: "overview" | "price-history") {
  return {
    pathname: section === "overview" ? `/product/${slug}` : `/product/${slug}/price-history`,
    query: {
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
    },
  };
}

function Sidebar({ product, slug }: { product: ProductData; slug: string }) {
  return (
    <aside className="hidden min-h-screen w-[250px] shrink-0 border-r border-border bg-white px-4 py-5 lg:flex lg:flex-col">
      <Link className="mb-6 flex items-center gap-3" href="/deals">
        <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#7c74ff] to-[#4f46e5] text-sm font-black text-white shadow-sm">
          BW
        </span>
        <span className="text-3xl font-extrabold tracking-tight text-[#0f172a]">
          BuyWise <span className="text-[#4f46e5]">AI</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map(({ label, icon: Icon, key }) => {
          const active = key === "overview";
          const href = key ? productHref(slug, product, key) : "#";

          return (
          <Link
            className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${
              active ? "bg-[#f0ecff] text-[#4f46e5]" : "text-foreground hover:bg-muted"
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

      <div className="mt-auto flex flex-col gap-5">
        <Card className="rounded-xl border-0 bg-[#f2efff] p-4">
          <div className="flex items-center gap-3">
            <Crown className="size-7 text-[#f5b400]" />
            <div>
              <p className="font-extrabold text-[#4f46e5]">Pro Plan</p>
              <p className="text-xs font-medium text-muted-foreground">You&apos;re saving more with BuyWise AI</p>
            </div>
          </div>
          <Button className="mt-4 h-9 w-full rounded-lg bg-[#4f46e5] text-xs font-extrabold text-white hover:bg-[#4338ca]">
            Upgrade Now
          </Button>
        </Card>

        <Card className="rounded-xl border border-border bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
              <p className="mt-2 text-2xl font-extrabold">$347.85</p>
            </div>
            <span className="grid size-11 place-items-center rounded-full bg-soft-buy text-buy">
              <DollarSign className="size-6" />
            </span>
          </div>
          <a className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#4f46e5]" href="#">
            View all savings <ExternalLink className="size-4" />
          </a>
        </Card>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center gap-5 border-b border-border bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="relative max-w-[560px] flex-1">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-11 rounded-xl bg-white pl-12 shadow-sm" placeholder="Search any product..." />
      </div>
      <div className="ml-auto flex items-center gap-4 sm:gap-5">
        <button className="hidden items-center gap-2 text-sm font-semibold md:flex">
          <HelpCircle className="size-5" />
          How it works
        </button>
        <Bell className="size-5" />
        <span className="grid size-10 place-items-center rounded-full bg-[#4f46e5] text-sm font-extrabold text-white">
          JS
        </span>
      </div>
    </header>
  );
}

function RetailerBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-extrabold shadow-sm">
      {label}
    </span>
  );
}

function VerdictCard({
  color,
  icon: Icon,
  label,
  score,
  subtitle,
}: {
  color: string;
  icon: LucideIcon;
  label: string;
  score: string;
  subtitle: string;
}) {
  return (
    <div className={`rounded-xl border p-5 text-center ${color}`}>
      <Icon className="mx-auto size-8" />
      <p className="mt-3 text-base font-extrabold text-foreground">{label}</p>
      <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
      <p className="mt-5 text-2xl font-extrabold">{score}</p>
    </div>
  );
}

function ProductHeader({ product }: { product: ProductData }) {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="flex flex-col gap-5 rounded-xl bg-white p-2 sm:flex-row">
        <div className="grid h-40 w-full shrink-0 place-items-center rounded-xl border border-border bg-white sm:w-40">
          <img
            alt={product.name}
            className="max-h-36 w-full object-contain mix-blend-multiply"
            src={product.image}
          />
        </div>
        <div className="flex-1 py-2">
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div>
              <h1 className="max-w-xl text-3xl font-extrabold leading-tight">{product.name}</h1>
              <p className="mt-1 text-base font-semibold text-muted-foreground">{product.subtitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
                <span>{product.rating}</span>
                <span className="inline-flex text-[#f5b400]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star className="size-4 fill-current" key={index} />
                  ))}
                </span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="h-11 rounded-xl px-4 font-extrabold">
                <Heart className="size-4" /> Save
              </Button>
              <Button variant="outline" className="h-11 rounded-xl px-4 font-extrabold">
                <Share2 className="size-4" /> Share
              </Button>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <RetailerBadge label={product.retailer} />
            <RetailerBadge label="BEST BUY" />
            <RetailerBadge label="Walmart" />
            <RetailerBadge label="Target" />
            <RetailerBadge label="+3 more" />
          </div>
        </div>
      </div>

      <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
        <p className="text-base font-semibold text-muted-foreground">Current Price</p>
        <div className="mt-2 flex items-center gap-3">
          <p className="text-3xl font-extrabold">{product.price}</p>
          <Badge className="h-7 rounded-full bg-soft-buy px-3 font-extrabold text-buy">{product.discount}</Badge>
        </div>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          List Price: <span className="line-through">{product.oldPrice}</span>
        </p>
        <Button className="mt-5 h-12 w-full rounded-lg bg-[#4f46e5] text-base font-extrabold text-white hover:bg-[#4338ca]">
          View Best Price <ExternalLink className="size-4" />
        </Button>
      </Card>
    </section>
  );
}

function AiScoreCard({ product }: { product: ProductData }) {
  return (
    <Card className="rounded-xl border border-buy/25 bg-white p-6 shadow-soft">
      <div className="grid items-center gap-6 md:grid-cols-[150px_170px_minmax(0,1fr)]">
        <div>
          <h2 className="text-lg font-extrabold">AI Score</h2>
          <p className="mt-4 text-7xl font-extrabold text-buy">{product.score}</p>
          <p className="text-base font-extrabold">Out of 100</p>
          <Badge className="mt-5 rounded-full bg-soft-buy px-4 py-2 text-sm font-extrabold text-buy">
            Excellent Choice
          </Badge>
        </div>
        <div className="relative grid size-40 place-items-center rounded-full border-[14px] border-buy bg-soft-buy">
          <span className="grid size-20 place-items-center rounded-full bg-[#243b8f] text-white">
            <Bot className="size-10" />
          </span>
        </div>
        <div>
          <p className="text-lg font-extrabold text-buy">This is a great time to buy!</p>
          <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-foreground">
            The current deal is {product.discount.toLowerCase()}, reviews are strong, and this product is highly reliable.
          </p>
          <div className="mt-7">
            <div className="mb-2 flex items-center gap-2 text-sm font-extrabold">
              High Confidence <Info className="size-4 text-muted-foreground" />
              <span className="ml-auto">{Math.min(95, product.score + 1)}%</span>
            </div>
            <Progress className="[&_[data-slot=progress-indicator]]:bg-buy" value={Math.min(95, product.score + 1)} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function PriceHistoryCard({ product }: { product: ProductData }) {
  return (
    <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold">
          Price History <Info className="inline size-4 text-muted-foreground" />
        </h2>
        <div className="flex gap-2">
          {["30D", "90D", "180D", "1Y"].map((item, index) => (
            <Badge className={index === 0 ? "bg-[#f0ecff] text-[#4f46e5]" : "bg-muted text-foreground"} key={item}>
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <svg className="h-40 w-full" viewBox="0 0 420 170" role="img" aria-label="Price history chart">
        {[35, 75, 115, 155].map((y) => (
          <line key={y} x1="35" x2="405" y1={y} y2={y} stroke="#eef2f7" />
        ))}
        <polyline
          fill="none"
          points="35,92 70,80 105,72 140,82 175,86 210,98 245,110 280,112 315,126 350,124 385,132"
          stroke="#4f46e5"
          strokeWidth="3"
        />
        <polyline fill="none" points="350,124 385,132 405,142" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth="2" />
        <circle cx="350" cy="124" fill="#4f46e5" r="5" />
        <g>
          <rect fill="#ffffff" height="48" rx="9" stroke="#d8d5ff" width="78" x="312" y="38" />
          <text fill="#4f46e5" fontSize="16" fontWeight="800" x="324" y="62">{product.price}</text>
          <text fill="#64748b" fontSize="12" x="335" y="78">May 17</text>
        </g>
        {["Apr 19", "Apr 26", "May 3", "May 10", "May 17"].map((label, index) => (
          <text fill="#64748b" fontSize="12" key={label} x={35 + index * 82} y="165">
            {label}
          </text>
        ))}
      </svg>
      <a className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-[#4f46e5]" href="#">
        View full price history <ExternalLink className="size-4" />
      </a>
    </Card>
  );
}

function SentimentLabel({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <span className="flex justify-between gap-3">
      <span className="flex items-center gap-2">
        <span className={`size-2.5 rounded-full ${color}`} />
        {label}
      </span>
      <span>{value}</span>
    </span>
  );
}

function YouTubeLogo() {
  return (
    <span aria-hidden="true" className="grid h-6 w-8 place-items-center rounded-md bg-[#ff0033] shadow-sm">
      <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
    </span>
  );
}

export default async function ProductAnalysisPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<ProductSearchParams>;
}) {
  const { slug } = await params;
  const product = productFromSearchParams(await searchParams);
  const sellers = buildSellers(product);
  const breakdown = scoreBreakdown(product);
  const waitScore = Math.max(1, product.score - 27);
  const avoidScore = Math.max(1, product.score - 61);
  const alternativeScore = Math.max(1, product.score - 13);

  return (
    <div className="flex min-h-screen bg-[#fbfcff] text-foreground">
      <Sidebar product={product} slug={slug} />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="grid gap-5 p-4 sm:p-5">
          <ProductHeader product={product} />

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.9fr)]">
            <AiScoreCard product={product} />
            <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
              <h2 className="text-lg font-extrabold">
                Buy / Wait / Avoid <Info className="inline size-4 text-muted-foreground" />
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                <VerdictCard color="border-buy bg-soft-buy/40 text-buy" icon={ShoppingCart} label="Buy Now" score={String(product.score)} subtitle="Strong buy" />
                <VerdictCard color="border-wait bg-soft-wait/50 text-wait" icon={Hourglass} label="Wait" score={String(waitScore)} subtitle="Price may drop" />
                <VerdictCard color="border-avoid bg-red-50 text-avoid" icon={XCircle} label="Avoid" score={String(avoidScore)} subtitle="Not recommended" />
                <VerdictCard color="border-[#7b8bb9] bg-[#f8faff] text-[#4f46e5]" icon={Repeat2} label="Better Alternative" score={String(alternativeScore)} subtitle="See options" />
              </div>
            </Card>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_1fr_0.95fr]">
            <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
              <h2 className="mb-5 text-lg font-extrabold">
                Score Breakdown <Info className="inline size-4 text-muted-foreground" />
              </h2>
              <div className="grid gap-4">
                {breakdown.map(([label, score]) => (
                  <div className="grid grid-cols-[130px_1fr_54px] items-center gap-3 text-sm" key={label}>
                    <span className="font-semibold">{label}</span>
                    <Progress className="[&_[data-slot=progress-indicator]]:bg-buy" value={score} />
                    <span className="font-semibold">{score}/100</span>
                  </div>
                ))}
              </div>
              <a className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#4f46e5]" href="#">
                How we calculate scores <ExternalLink className="size-4" />
              </a>
            </Card>

            <PriceHistoryCard product={product} />

            <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
              <h2 className="mb-4 text-lg font-extrabold">
                Price Comparison <Info className="inline size-4 text-muted-foreground" />
              </h2>
              <div className="divide-y divide-border">
                {sellers.map((seller) => (
                  <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-3" key={seller.name}>
                    <span className={`text-lg font-extrabold ${seller.brandClass}`}>{seller.name}</span>
                    <span className="font-extrabold">{seller.price}</span>
                    <Badge className={`${seller.noteClass} whitespace-nowrap`}>{seller.note}</Badge>
                  </div>
                ))}
              </div>
              <a className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#4f46e5]" href="#">
                View all sellers (7) <ExternalLink className="size-4" />
              </a>
            </Card>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_0.85fr_1.45fr]">
            <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
              <h2 className="text-lg font-extrabold">
                Review Sentiment <Info className="inline size-4 text-muted-foreground" />
              </h2>
              <div className="mt-5 grid items-center gap-4 sm:grid-cols-[130px_1fr]">
                <div className="size-28 rounded-full border-[18px] border-buy border-l-wait border-t-avoid" />
                <div className="grid gap-3 text-sm font-semibold">
                  <SentimentLabel color="bg-buy" label="Positive" value="85% (10,942)" />
                  <SentimentLabel color="bg-wait" label="Neutral" value="10% (1,286)" />
                  <SentimentLabel color="bg-avoid" label="Negative" value="5% (614)" />
                </div>
              </div>
            </Card>

            <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg font-extrabold">
                <YouTubeLogo /> YouTube Insights <Info className="size-4 text-muted-foreground" />
              </h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">Analyzed 24 trusted review videos</p>
              <div className="mt-7 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-semibold">Positive Mentions</p>
                  <p className="mt-2 text-2xl font-extrabold text-buy">92%</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Overall Rating</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#4f46e5]">4.6/5</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Review Quality</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#7c3aed]">High</p>
                </div>
              </div>
              <a className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#4f46e5]" href="#">
                View key takeaways <ExternalLink className="size-4" />
              </a>
            </Card>

            <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
              <h2 className="text-lg font-extrabold">
                Top Pros & Cons <Info className="inline size-4 text-muted-foreground" />
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 font-extrabold text-buy">What people love</p>
                  <div className="grid gap-3">
                    {pros.map((item) => (
                      <span className="flex items-center gap-2 text-sm font-semibold" key={item}>
                        <CheckCircle2 className="size-4 text-buy" /> {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-muted-foreground">+ 12 more</p>
                </div>
                <div>
                  <p className="mb-3 font-extrabold text-avoid">What people don&apos;t like</p>
                  <div className="grid gap-3">
                    {cons.map((item) => (
                      <span className="flex items-center gap-2 text-sm font-semibold" key={item}>
                        <XCircle className="size-4 text-avoid" /> {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-muted-foreground">+ 4 more</p>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
