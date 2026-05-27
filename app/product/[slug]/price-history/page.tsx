/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  ChevronDown,
  CirclePlay,
  Heart,
  Home,
  Info,
  ListChecks,
  MessageCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingDown,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Price History - Happy",
  description: "Product-specific price history, predictions, and retailer comparison.",
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
] satisfies Array<{ label: string; icon: LucideIcon; key: "overview" | "price-history" | "reviews-ai" | "alternatives" | "youtube-insights" | "my-lists" }>;

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

function moneyValue(value: string) {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
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

function productHref(slug: string, product: ProductData, section: (typeof sidebarItems)[number]["key"]) {
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

function buildRetailerRows(product: ProductData) {
  const base = moneyValue(product.price) || 278;
  const primary = product.retailer;
  const retailers = [primary, "amazon", "BEST BUY", "Walmart", "Target", "eBay"].filter(
    (retailer, index, array) => array.findIndex((item) => item.toLowerCase() === retailer.toLowerCase()) === index,
  );

  return retailers.slice(0, 5).map((retailer, index) => ({
    retailer,
    price: index === 0 ? product.price : formatMoney(base + 10 + index * 8),
    shipping: index === 4 ? "Varies" : "FREE",
    updated: `${5 + index * 2} min ago`,
    offer: index === 0 ? product.discount : index === 4 ? "18% off" : null,
  }));
}

function Sidebar({ product, slug }: { product: ProductData; slug: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 overflow-y-auto border-r border-border bg-white px-4 py-6 lg:flex lg:flex-col">
      <Link className="mb-9 flex items-center gap-4" href="/deals">
        <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#7c74ff] to-[#4f46e5] text-sm font-black text-white shadow-sm">
          BW
        </span>
        <span className="text-3xl font-extrabold leading-none tracking-tight">
          BuyWise<br />
          <span className="text-[#4f46e5]">AI</span>
        </span>
      </Link>
      <Link className="mb-5 flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-extrabold text-[#4f46e5] hover:bg-[#f0ecff]" href="/deals">
        <ArrowLeft className="size-4" />
        Back to Deals
      </Link>

      <nav className="grid gap-3">
        {sidebarItems.map(({ label, icon: Icon, key }) => {
          const active = key === "price-history";

          return (
            <Link
              className={`flex h-13 items-center gap-4 rounded-xl px-4 text-sm font-semibold ${
                active ? "bg-[#f0ecff] text-[#4f46e5]" : "text-foreground hover:bg-muted"
              }`}
              href={productHref(slug, product, key)}
              key={label}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <Card className="mt-auto flex items-center justify-between rounded-xl border border-border bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-muted">
            <User className="size-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold">Alex Thompson</p>
            <Badge className="mt-1 bg-[#f0ecff] text-[#4f46e5]">Pro</Badge>
          </div>
        </div>
        <ChevronDown className="-rotate-90 size-4 text-muted-foreground" />
      </Card>
    </aside>
  );
}

function ProductPanel({ product }: { product: ProductData }) {
  return (
    <Card className="min-h-[699px] rounded-xl border border-border bg-white p-4 shadow-soft">
      <div className="grid grid-cols-[64px_1fr] gap-5">
        <div className="grid gap-2">
          {[0, 1, 2, 3].map((item) => (
            <div className={`grid size-16 place-items-center rounded-lg border ${item === 0 ? "border-[#6d28d9]" : "border-border"}`} key={item}>
              <img alt="" className="max-h-12 w-full object-contain mix-blend-multiply" src={product.image} />
            </div>
          ))}
          <div className="grid size-16 place-items-center rounded-lg border border-border text-sm font-extrabold">+3</div>
        </div>
        <div>
          <div className="grid min-h-[420px] place-items-center rounded-xl bg-white">
            <img alt={product.name} className="max-h-[390px] w-full object-contain mix-blend-multiply" src={product.image} />
          </div>
          <Badge className="mt-4 rounded bg-muted text-xs font-extrabold text-foreground">{product.name.split(" ")[0]}</Badge>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight">{product.name}</h1>
          <p className="mt-1 text-base font-semibold text-muted-foreground">{product.subtitle}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="flex items-center gap-1 text-accent">
              <Star className="size-4 fill-current" /> {product.rating}
            </span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
            <Badge className="bg-soft-buy text-buy">
              <ShieldCheck className="size-3.5" /> High review trust
            </Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Noise Cancelling", "30H Battery", "Comfort Fit", "Bluetooth 5.2"].map((feature) => (
              <Badge className="bg-muted text-foreground" key={feature}>{feature}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card className="flex h-[190px] self-start rounded-xl border border-border bg-white p-5 shadow-soft">
      <div className="flex h-full flex-col">
        <p className="min-h-20 text-[15px] font-extrabold leading-5 text-muted-foreground">{label}</p>
        <p className="text-3xl font-extrabold leading-none">{value}</p>
        <p className="mt-auto text-sm font-semibold leading-5 text-buy">{note}</p>
      </div>
    </Card>
  );
}

function PriceChart({ product }: { product: ProductData }) {
  return (
    <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
      <div className="mb-4 flex flex-col gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <h2 className="text-lg font-extrabold">Price history <span className="font-medium text-muted-foreground">(90 days)</span></h2>
        <div className="flex w-fit rounded-lg border border-border bg-white p-1 text-xs font-extrabold">
          {["30D", "90D", "6M", "1Y", "All"].map((item) => (
            <span className={`rounded-md px-3 py-1.5 ${item === "90D" ? "bg-[#f0ecff] text-[#6d28d9]" : "text-muted-foreground"}`} key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <svg className="h-[234px] w-full" viewBox="0 0 740 285" role="img" aria-label={`${product.name} price history chart`}>
        {[40, 90, 140, 190, 240].map((y) => (
          <line key={y} x1="52" x2="710" y1={y} y2={y} stroke="#edf2f7" />
        ))}
        {[90, 190, 290, 390, 490, 590, 690].map((x) => (
          <line key={x} x1={x} x2={x} y1="35" y2="245" stroke="#f3f6fa" />
        ))}
        <path d="M55 55 L95 61 L140 57 L170 75 L210 72 L250 91 L295 96 L340 105 L382 113 L425 121 L468 150 L512 158 L555 169 L598 165" fill="none" stroke="#6d28d9" strokeWidth="3" />
        <path d="M55 58 C180 78 330 100 598 150" fill="none" stroke="#3b82f6" strokeDasharray="6 5" strokeWidth="2" />
        <path d="M55 70 C220 91 390 121 710 155" fill="none" stroke="#16a34a" strokeDasharray="6 5" strokeWidth="2" />
        <path d="M598 165 C630 154 665 174 710 164" fill="none" stroke="#a855f7" strokeDasharray="7 6" strokeWidth="3" />
        <path d="M598 145 C635 135 675 143 710 138 L710 206 C674 199 634 207 598 188 Z" fill="#a855f7" opacity="0.12" />
        {["$400", "$350", "$300", "$250", "$200"].map((label, index) => (
          <text fill="#475569" fontSize="13" key={label} x="8" y={45 + index * 50}>{label}</text>
        ))}
        {["Mar 18", "Apr 2", "Apr 16", "Apr 30", "May 14", "May 28", "Jun 11"].map((label, index) => (
          <text fill="#475569" fontSize="13" key={label} x={82 + index * 100} y="275">{label}</text>
        ))}
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-semibold 2xl:grid-cols-4">
        {[
          ["Actual Price", "bg-[#6d28d9]"],
          ["30-Day Average", "bg-[#3b82f6]"],
          ["90-Day Average", "bg-[#16a34a]"],
          ["Predicted Price Range", "bg-[#a855f7]"],
        ].map(([label, color]) => (
          <span className="flex min-w-0 items-center gap-2 whitespace-nowrap" key={label}>
            <span className={`h-1 w-7 shrink-0 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </Card>
  );
}

function VerdictPanel({ product }: { product: ProductData }) {
  return (
    <Card className="rounded-xl border border-[#fde7c7] bg-[#fff8ed] p-5 shadow-soft">
      <p className="text-sm font-extrabold uppercase tracking-wide">AI Price Verdict <Info className="inline size-4 text-muted-foreground" /></p>
      <div className="mt-3 grid grid-cols-[1fr_96px] gap-4">
        <div>
          <p className="text-xl font-extrabold text-accent">Wait for a better price.</p>
          <p className="mt-3 text-sm font-semibold leading-5 text-muted-foreground">
            Prices for {product.name} are likely to drop in the next 2-4 weeks based on our prediction model.
          </p>
        </div>
        <div className="grid place-items-center">
          <div className="relative h-20 w-24">
            <div className="absolute inset-x-2 top-2 h-12 rounded-t-full border-[7px] border-b-0 border-l-red-500 border-r-green-500 border-t-yellow-400" />
            <div className="absolute bottom-4 left-1/2 h-8 w-1 -translate-x-1/2 rotate-[25deg] rounded-full bg-[#0f172a]" />
          </div>
          <Badge className="bg-soft-buy text-buy">High 80%</Badge>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button className="h-10 rounded-lg bg-[#6d28d9] font-extrabold text-white hover:bg-[#5b21b6]">
          <Bell className="size-4" /> Create Price Alert
        </Button>
        <Button variant="outline" className="h-10 rounded-lg border-[#6d28d9] font-extrabold text-[#6d28d9]">
          <TrendingDown className="size-4" /> View Predictions
        </Button>
      </div>
    </Card>
  );
}

function RetailerTable({ product }: { product: ProductData }) {
  const rows = buildRetailerRows(product);

  return (
    <Card className="rounded-xl border border-border bg-white p-6 shadow-soft">
      <h2 className="mb-5 text-lg font-extrabold">Compare prices by retailer</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-xs font-extrabold text-muted-foreground">
            <tr className="border-b border-border">
              <th className="pb-3">Retailer</th>
              <th className="pb-3">Current Price</th>
              <th className="pb-3">Shipping</th>
              <th className="pb-3">In Stock</th>
              <th className="pb-3">Last Updated</th>
              <th className="pb-3">Price Trend (30 days)</th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.retailer}>
                <td className="py-4 text-lg font-black">{row.retailer}</td>
                <td className="py-4 font-extrabold">
                  {row.price} {row.offer ? <Badge className="ml-2 bg-soft-buy text-buy">{row.offer}</Badge> : null}
                </td>
                <td className="py-4 font-semibold">{row.shipping}</td>
                <td className="py-4 font-semibold text-buy">In stock</td>
                <td className="py-4 font-semibold text-muted-foreground">{row.updated}</td>
                <td className="py-4">
                  <svg className="h-8 w-40" viewBox="0 0 160 32">
                    <path d="M2 10 L24 13 L42 11 L63 18 L82 17 L102 21 L122 19 L158 24" fill="none" stroke="#6d28d9" strokeWidth="2" />
                  </svg>
                </td>
                <td className="py-4 text-right">
                  <Button variant="outline" className="h-8 rounded-md border-accent text-xs font-extrabold text-accent">
                    View Deal
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mx-auto mt-5 flex items-center gap-2 text-sm font-extrabold text-[#6d28d9]">View all 12 retailers</button>
    </Card>
  );
}

function PredictionCard({ product }: { product: ProductData }) {
  const base = moneyValue(product.price) || 278;

  return (
    <Card className="rounded-xl border border-border bg-white p-5 shadow-soft">
      <h2 className="text-lg font-extrabold">Price drop prediction <Info className="inline size-4 text-muted-foreground" /></h2>
      <p className="mt-3 text-lg font-extrabold text-buy">High chance of price drop</p>
      <p className="mt-3 text-sm font-semibold leading-5 text-muted-foreground">We predict the price will drop to</p>
      <p className="mt-1 text-2xl font-extrabold">{formatMoney(base * 0.83)} - {formatMoney(base * 0.9)}</p>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">in the next 2-4 weeks</p>
      <div className="mt-4 rounded-xl bg-soft-buy p-3 text-sm font-extrabold text-buy">
        Best time to buy:<br /> Jun 5 - Jun 20, 2024
      </div>
      <button className="mt-4 text-sm font-extrabold text-buy">How we predict</button>
    </Card>
  );
}

function AlertCard({ product }: { product: ProductData }) {
  const base = moneyValue(product.price) || 278;

  return (
    <Card className="rounded-xl border border-[#e8dcff] bg-[#fbf8ff] p-6 shadow-soft">
      <h2 className="text-lg font-extrabold">Create a price alert</h2>
      <p className="mt-5 text-sm font-semibold text-muted-foreground">Notify me when the price drops to</p>
      <div className="mt-3 flex gap-3">
        <Button variant="outline" className="h-11 rounded-lg bg-white">$</Button>
        <Input className="h-11 rounded-lg bg-white font-extrabold" defaultValue={Math.round(base * 0.88)} />
        <span className="self-center text-sm font-semibold text-muted-foreground">or less</span>
      </div>
      <p className="mt-5 text-sm font-semibold">Email (you@example.com)</p>
      <Input className="mt-2 h-11 rounded-lg bg-white" placeholder="you@example.com" />
      <Button className="mt-5 h-12 w-full rounded-lg bg-[#6d28d9] font-extrabold text-white hover:bg-[#5b21b6]">
        <Bell className="size-4" /> Create Alert
      </Button>
      <p className="mt-5 text-xs font-semibold text-muted-foreground">You can manage your alerts anytime in your account.</p>
    </Card>
  );
}

export default async function PriceHistoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<ProductSearchParams>;
}) {
  const { slug } = await params;
  const product = productFromSearchParams(await searchParams);
  const base = moneyValue(product.price) || 278;

  return (
    <div className="flex min-h-screen bg-[#fbfcff] text-foreground">
      <Sidebar product={product} slug={slug} />
      <main className="min-w-0 flex-1 p-5 lg:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground">
            <Home className="size-5 text-foreground" />
            <span>Electronics</span>
            <span>/</span>
            <span>{product.subtitle}</span>
            <span>/</span>
            <Link className="text-foreground" href={{ pathname: `/product/${slug}`, query: productQuery(product) }}>{product.name}</Link>
            <span>/</span>
            <span className="font-extrabold text-foreground">Price History</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-10 rounded-lg font-extrabold"><Share2 className="size-4" /> Share</Button>
            <Button variant="outline" className="h-10 rounded-lg font-extrabold"><Heart className="size-4" /> Save</Button>
          </div>
        </div>

        <section className="grid items-start gap-6 xl:grid-cols-[360px_minmax(0,1fr)_390px]">
          <ProductPanel product={product} />
          <div className="grid content-start gap-6">
            <div className="grid items-start gap-4 lg:grid-cols-3">
              <MetricCard label="Current Price" note={`List price: ${product.oldPrice}`} value={product.price} />
              <MetricCard label="Lowest Price (90 days)" note="May 8, 2024" value={formatMoney(base * 0.83)} />
              <MetricCard label="Average Price (90 days)" note="Typical online price" value={formatMoney(base * 0.9)} />
            </div>
            <PriceChart product={product} />
          </div>
          <div className="grid content-start gap-6">
            <VerdictPanel product={product} />
            <PredictionCard product={product} />
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <RetailerTable product={product} />
          <AlertCard product={product} />
        </section>
      </main>
    </div>
  );
}
