"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BarChart3,
  Bookmark,
  ChevronDown,
  CirclePlay,
  Clock3,
  Heart,
  Home,
  ListChecks,
  MessageCircle,
  PackagePlus,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

import type { SavedDeal } from "@/components/deals/saved-deal-button";
import ProductMobileNav from "@/components/product/product-mobile-nav";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const savedDealsKey = "isitabuy:saved-deals";

const sidebarItems = [
  { label: "Overview", icon: Home, key: "overview" },
  { label: "Price & History", icon: BarChart3, key: "price-history" },
  { label: "Reviews AI", icon: MessageCircle, key: "reviews-ai" },
  { label: "Alternatives", icon: Sparkles, key: "alternatives" },
  { label: "YouTube Insights", icon: CirclePlay, key: "youtube-insights" },
  { label: "My Lists", icon: ListChecks, key: "my-lists" },
] satisfies Array<{ label: string; icon: LucideIcon; key: "overview" | "price-history" | "reviews-ai" | "alternatives" | "youtube-insights" | "my-lists" }>;

function savedDealsSnapshot() {
  if (typeof window === "undefined") return "[]";

  return window.localStorage.getItem(savedDealsKey) ?? "[]";
}

function parseSavedDeals(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed as SavedDeal[] : [];
  } catch {
    return [];
  }
}

function subscribeToSavedDeals(onStoreChange: () => void) {
  function handleSavedDealsChange() {
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === savedDealsKey) onStoreChange();
  }

  window.addEventListener("isitabuy-saved-deals-change", handleSavedDealsChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("isitabuy-saved-deals-change", handleSavedDealsChange);
    window.removeEventListener("storage", handleStorage);
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

function productSlug(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "deal"
  );
}

function dealHref(deal: SavedDeal) {
  return {
    pathname: `/product/${productSlug(deal.name)}`,
    query: {
      name: deal.name,
      subtitle: deal.subtitle,
      image: deal.image,
      price: deal.price,
      oldPrice: deal.oldPrice,
      retailer: deal.retailer,
      rating: deal.rating,
      reviews: deal.reviews,
      score: deal.score,
      discount: deal.discount,
    },
  };
}

function moneyValue(value: string) {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
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
          const active = key === "my-lists";

          return (
            <Link
              className={`flex h-13 items-center gap-4 rounded-xl px-4 text-sm font-semibold ${
                active ? "bg-soft-value text-value" : "text-foreground hover:bg-muted"
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

function RetailerMark({ retailer }: { retailer: string }) {
  const normalized = retailer.toLowerCase();

  if (normalized.includes("amazon")) return <span className="font-serif text-2xl font-bold">a</span>;
  if (normalized.includes("walmart")) return <span className="text-sm font-bold text-[#0071ce]">Walmart</span>;
  if (normalized.includes("best")) return <span className="text-xs font-bold leading-none">BEST<br />BUY</span>;
  if (normalized.includes("target")) return <span className="grid size-7 place-items-center rounded-full border-2 border-[#cc0000] text-[#cc0000]">●</span>;

  return <span className="text-sm font-bold">{retailer.slice(0, 2).toUpperCase()}</span>;
}

function StatCard({ icon: Icon, label, value, note, tone }: { icon: LucideIcon; label: string; value: string; note: string; tone: string }) {
  return (
    <BentoCard className="p-4">
      <div className="flex items-center gap-4">
        <span className={`grid size-14 place-items-center rounded-full ${tone}`}>
          <Icon className="size-7" />
        </span>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold leading-none">{value}</p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">{note}</p>
        </div>
      </div>
    </BentoCard>
  );
}

function SavedProductRow({ deal }: { deal: SavedDeal }) {
  return (
    <Link className="grid grid-cols-[minmax(0,1fr)_90px_92px_84px_70px] items-center gap-4 border-t border-border px-5 py-4 hover:bg-muted/40" href={dealHref(deal)}>
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-muted">
          <img alt={deal.name} className="max-h-10 max-w-10 object-contain mix-blend-multiply" src={deal.image} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{deal.name}</p>
          <p className="truncate text-xs font-medium text-muted-foreground">{deal.subtitle}</p>
        </div>
      </div>
      <p className="text-sm font-bold">{deal.price}</p>
      <div>
        <span className="grid size-10 place-items-center rounded-full border-2 border-buy bg-white text-sm font-bold text-buy">
          {deal.score}
        </span>
      </div>
      <p className="text-sm font-bold text-buy">{deal.discount}</p>
      <div className="flex justify-end">
        <RetailerMark retailer={deal.retailer} />
      </div>
    </Link>
  );
}

function SavedCollectionCard({ title, deals, tint, extra }: { title: string; deals: SavedDeal[]; tint: string; extra?: string }) {
  const previewDeals = deals.slice(0, 3);

  return (
    <BentoCard className={`p-4 ${tint}`}>
      <div className="flex items-start justify-between">
        <h2 className="text-base font-bold">{title}</h2>
        <button className="text-muted-foreground">⋮</button>
      </div>
      <div className="mt-4 flex gap-2">
        {previewDeals.map((deal) => (
          <span className="grid size-16 place-items-center rounded-lg bg-white/85" key={deal.name}>
            <img alt={deal.name} className="max-h-12 max-w-12 object-contain mix-blend-multiply" src={deal.image} />
          </span>
        ))}
        <span className="grid size-16 place-items-center rounded-lg bg-white/70 text-sm font-bold text-value">
          {extra ?? `+${Math.max(0, deals.length - previewDeals.length)}`}
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="grid size-5 place-items-center rounded-full bg-muted">
              <User className="size-3" />
            </span>
            You
          </p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">Updated just now</p>
          <p className="mt-3 text-sm font-bold">{deals.length} products</p>
        </div>
        <Button asChild variant="outline" className="h-9 rounded-lg border-value/30 text-xs font-bold text-value">
          <Link href="#recently-saved">View List</Link>
        </Button>
      </div>
    </BentoCard>
  );
}

function EmptyState() {
  return (
    <BentoCard className="border-dashed border-value/30 p-10 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-soft-value text-value">
        <Heart className="size-8" />
      </span>
      <h2 className="mt-4 text-xl font-bold">No saved products yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-muted-foreground">
        Go to the deals page and click the heart icon on products you want to keep. They will appear here automatically.
      </p>
      <Button asChild className="mt-4 h-11 rounded-lg bg-value px-6 font-bold text-white hover:bg-value/90">
        <Link href="/deals">Browse deals</Link>
      </Button>
    </BentoCard>
  );
}

export default function MyListsClient({ product, slug }: { product: ProductData; slug: string }) {
  const savedDealsJson = useSyncExternalStore(subscribeToSavedDeals, savedDealsSnapshot, () => "[]");
  const savedDeals = useMemo(() => parseSavedDeals(savedDealsJson), [savedDealsJson]);
  const savedTotal = useMemo(() => savedDeals.reduce((total, deal) => total + moneyValue(deal.price), 0), [savedDeals]);
  const averageScore = savedDeals.length
    ? Math.round(savedDeals.reduce((total, deal) => total + Number(deal.score), 0) / savedDeals.length)
    : 0;
  const mobileNavItems = sidebarItems.map(({ label, icon, key }) => ({
    href: key ? productHref(slug, product, key) : "#",
    icon,
    label,
    navKey: key ?? "my-lists",
  }));

  return (
    <div className="flex min-h-screen bg-[#fbfcff] text-foreground">
      <Sidebar product={product} slug={slug} />
      <div className="min-w-0 flex-1">
        <ProductMobileNav activeKey="my-lists" items={mobileNavItems} />
        <main className="p-4 lg:p-5">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Lists</h1>
            <p className="mt-2 text-base font-medium text-muted-foreground">
              Saved products, custom collections, and shopping watchlists
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="h-11 rounded-lg bg-value px-5 font-bold text-white hover:bg-value/90">
              <Plus className="size-4" /> New List
            </Button>
            <Button variant="outline" className="h-11 rounded-lg px-5 font-bold">
              <Share2 className="size-4" /> Share
            </Button>
          </div>
          </div>

          <div className="max-w-[560px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-12 rounded-xl bg-white pl-12 shadow-sm" placeholder="Search lists or products..." />
          </div>
          </div>

          <section className="mt-4 grid gap-4 xl:grid-cols-4">
          <StatCard icon={Bookmark} label="Total saved products" value={String(savedDeals.length)} note="Across all lists" tone="bg-soft-value text-value" />
          <StatCard icon={Clock3} label="Active watchlists" value={savedDeals.length ? "1" : "0"} note="Being monitored" tone="bg-soft-buy text-buy" />
          <StatCard icon={Tag} label="Price drop opportunities" value={String(savedDeals.filter((deal) => deal.discount !== "0% OFF").length)} note="From saved deals" tone="bg-red-50 text-red-500" />
          <StatCard icon={Sparkles} label="Better alternatives found" value={String(Math.max(0, Math.ceil(savedDeals.length / 2)))} note="Higher value picks" tone="bg-blue-50 text-blue-600" />
          </section>

        {savedDeals.length === 0 ? (
          <section className="mt-4">
            <EmptyState />
          </section>
        ) : (
          <>
            <section className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SavedCollectionCard title="Saved from Deals" deals={savedDeals} tint="bg-[#faf8ff]" />
                <SavedCollectionCard title="Best Deals This Month" deals={savedDeals.slice(0, Math.max(1, Math.ceil(savedDeals.length / 2)))} tint="bg-[#fff8e7]" />
                <SavedCollectionCard title="Compare Later" deals={savedDeals.slice().reverse()} tint="bg-[#eefaf4]" />
              </div>

              <BentoCard id="recently-saved" className="overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-base font-bold">Recently saved</h2>
                  <button className="text-sm font-bold text-value">View all</button>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_90px_92px_84px_70px] gap-4 px-5 pb-3 text-xs font-bold text-muted-foreground">
                  <span>Product</span>
                  <span>Price</span>
                  <span>AI Buy Score</span>
                  <span>Change</span>
                  <span className="text-right">Source</span>
                </div>
                {savedDeals.slice(0, 5).map((deal) => (
                  <SavedProductRow deal={deal} key={deal.name} />
                ))}
                <div className="flex items-center justify-center gap-2 border-t border-border p-4 text-xs font-medium text-muted-foreground">
                  Prices updated just now <RefreshCw className="size-4" />
                </div>
              </BentoCard>
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.5fr]">
              <BentoCard className="p-4">
                <h2 className="text-base font-bold">Smart suggestions for your lists</h2>
                <div className="mt-4 grid gap-3">
                  {savedDeals.slice(0, 3).map((deal) => (
                    <div className="flex items-center gap-3 rounded-lg border border-border p-3" key={deal.name}>
                      <img alt={deal.name} className="size-12 object-contain mix-blend-multiply" src={deal.image} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{deal.name}</p>
                        <p className="text-xs font-medium text-muted-foreground">{deal.price}</p>
                      </div>
                      <span className="grid size-10 place-items-center rounded-full border-2 border-buy text-sm font-bold text-buy">{deal.score}</span>
                      <Button variant="outline" className="h-9 rounded-lg border-value/30 text-xs font-bold text-value">
                        <PackagePlus className="size-4" /> Add
                      </Button>
                    </div>
                  ))}
                </div>
              </BentoCard>

              <BentoCard className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold">List insights</h2>
                  <Button variant="outline" className="h-9 rounded-lg text-xs font-bold">
                    This month <ChevronDown className="size-4" />
                  </Button>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Saved value</p>
                    <p className="mt-1 text-3xl font-bold text-buy">${Math.round(savedTotal).toLocaleString()}</p>
                    <p className="text-xs font-medium text-muted-foreground">Across saved products</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Products on sale</p>
                    <p className="mt-1 text-3xl font-bold text-value">{savedDeals.length}</p>
                    <p className="text-xs font-medium text-muted-foreground">Currently tracked</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Avg. AI score</p>
                    <p className="mt-1 text-3xl font-bold text-blue-600">{averageScore}</p>
                    <p className="text-xs font-medium text-muted-foreground">Quality signal</p>
                  </div>
                </div>
              </BentoCard>
            </section>
          </>
        )}
        </main>
      </div>
    </div>
  );
}
