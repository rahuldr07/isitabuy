"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Shuffle,
  Sparkles,
  Star,
  Tag,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { showCompareToast } from "@/components/ui/app-toast";
import { mockProducts } from "@/lib/mockCompareData";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/compare";

type CompareSlotId = "A" | "B";

interface BuilderState {
  productA: Product | null;
  productB: Product | null;
  query: string;
  activeSlot: CompareSlotId;
}

interface SearchResult {
  product: Product;
  score: number;
  matchLabel: string;
}

interface BuilderRecommendation {
  winner: Product | null;
  title: string;
  body: string;
  confidence: number;
  badges: string[];
}

const navItems = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Compare", href: "/compare" },
  { label: "Deals", href: "/deals" },
  { label: "Retailers", href: "/#retailers" },
  { label: "Receipts", href: "/receipts" },
];

const presetPairs = [
  { title: "Noise-cancelling leaders", a: "sony-wh-1000xm5", b: "bose-quietcomfort-ultra" },
  { title: "Battery vs comfort", a: "sennheiser-momentum-4", b: "bose-quietcomfort-ultra" },
  { title: "Apple ecosystem vs value", a: "apple-airpods-max", b: "beats-studio-pro" },
  { title: "Best deal check", a: "beats-studio-pro", b: "sony-wh-1000xm5" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const integer = new Intl.NumberFormat("en-US");

function formatPrice(value: number) {
  return currency.format(value);
}

function productById(id: string) {
  return mockProducts.find((product) => product.id === id) ?? null;
}

function getSearchText(product: Product) {
  return [
    product.name,
    product.subtitle,
    product.bestFor,
    product.verdict,
    product.reviewTrust,
    ...product.tags,
    ...product.pros,
    ...product.cons,
  ]
    .join(" ")
    .toLowerCase();
}

function getSearchResult(product: Product, query: string): SearchResult {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return {
      product,
      score: product.scores.aiBuy + product.scores.price / 10,
      matchLabel: `${product.bestFor} pick`,
    };
  }

  const terms = normalized.split(/\s+/).filter(Boolean);
  const searchText = getSearchText(product);
  const reasons: string[] = [];
  let score = 0;

  if (product.name.toLowerCase().includes(normalized)) {
    score += 70;
    reasons.push("name match");
  }
  if (product.subtitle.toLowerCase().includes(normalized)) {
    score += 24;
    reasons.push("category match");
  }

  for (const tag of product.tags) {
    const tagText = tag.toLowerCase();
    if (tagText.includes(normalized) || terms.some((term) => tagText.includes(term))) {
      score += 20;
      reasons.push(tag);
      break;
    }
  }

  for (const term of terms) {
    if (searchText.includes(term)) score += 8;
  }

  if (["cheap", "deal", "value", "budget", "price"].some((term) => normalized.includes(term))) {
    score += product.scores.price / 2;
    reasons.push("value match");
  }
  if (["comfort", "comfortable", "flight", "long"].some((term) => normalized.includes(term))) {
    score += product.scores.comfort / 2;
    reasons.push("comfort match");
  }
  if (["battery", "travel", "traveler"].some((term) => normalized.includes(term))) {
    score += product.scores.battery / 2;
    reasons.push("battery match");
  }
  if (["anc", "noise", "cancelling", "canceling"].some((term) => normalized.includes(term))) {
    score += product.scores.performance / 2;
    reasons.push("ANC match");
  }

  return {
    product,
    score,
    matchLabel: reasons[0] ?? "related match",
  };
}

function getPrimaryScore(product: Product) {
  return Math.round(product.scores.aiBuy * 0.45 + product.scores.price * 0.25 + product.scores.comfort * 0.15 + product.scores.performance * 0.15);
}

function getAdvantageBadges(product: Product, competitor: Product) {
  const badges: string[] = [];
  if (product.currentPrice < competitor.currentPrice) badges.push("Lower price");
  if (product.scores.price >= competitor.scores.price + 8) badges.push("Better value");
  if (product.scores.comfort >= competitor.scores.comfort + 8) badges.push("Comfort edge");
  if (product.scores.battery >= competitor.scores.battery + 8) badges.push("Battery edge");
  if (product.scores.performance >= competitor.scores.performance + 3) badges.push("ANC edge");
  if (product.verdict === "WAIT") badges.push("Price may improve");
  return badges.slice(0, 4);
}

function getRecommendation(productA: Product | null, productB: Product | null): BuilderRecommendation {
  if (!productA || !productB) {
    return {
      winner: null,
      title: "Choose two products to unlock the AI preview.",
      body: "Search the catalog and fill both slots to see value, comfort, price, and performance signals before opening the full comparison.",
      confidence: 0,
      badges: ["Smart matching", "Independent scores"],
    };
  }

  const scoreA = getPrimaryScore(productA);
  const scoreB = getPrimaryScore(productB);
  const winner = scoreA >= scoreB ? productA : productB;
  const runnerUp = winner.id === productA.id ? productB : productA;
  const badges = getAdvantageBadges(winner, runnerUp);
  const gap = Math.abs(scoreA - scoreB);
  const confidence = Math.min(92, Math.max(70, 74 + gap * 2 + badges.length * 2));

  return {
    winner,
    title: `${winner.name} looks like the smarter buy.`,
    body: `${winner.name} has the stronger blended score today. ${runnerUp.name} can still be better if you care most about ${runnerUp.bestFor.toLowerCase()}, but the current value signal favors ${winner.name}.`,
    confidence,
    badges: badges.length ? badges : ["Close match", "Preference driven"],
  };
}

function getCompareHref(productA: Product | null, productB: Product | null) {
  if (!productA || !productB) return "/compare";
  const ids = [productA.id, productB.id].sort().join("|");
  if (ids === ["sony-wh-1000xm5", "bose-quietcomfort-ultra"].sort().join("|")) {
    return "/compare/sony-wh-1000xm5-vs-bose-quietcomfort-ultra";
  }
  return "/compare/results";
}

function Logo() {
  return (
    <NextLink href="/" className="flex items-center gap-2.5" aria-label="IsItABuy home">
      <span className="grid size-7 place-items-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-bold tracking-tight text-[var(--isitabuy-ink)]">IsItABuy</span>
    </NextLink>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--isitabuy-line)] bg-white/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Logo />
        <div className="hidden items-center gap-8 text-xs font-bold text-[var(--isitabuy-ink)] lg:flex">
          {navItems.map((item) => (
            <NextLink key={item.label} href={item.href} className="inline-flex items-center gap-1.5 whitespace-nowrap transition hover:-translate-y-px hover:text-[var(--isitabuy-orange)]">
              {item.label}
            </NextLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" size="lg" className="h-8 rounded-full px-5 text-xs font-bold">
            <NextLink href="/signin">Log in</NextLink>
          </Button>
          <Button asChild size="lg" className="h-8 rounded-full bg-[var(--isitabuy-orange)] px-5 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]">
            <NextLink href="/signin?mode=signup">Sign up</NextLink>
          </Button>
        </div>
        <Button variant="outline" size="icon-lg" className="md:hidden" aria-label="Open menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </nav>
      {open ? (
        <div className="grid gap-2 border-t border-[var(--isitabuy-line)] bg-white px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <NextLink key={item.label} href={item.href} className="rounded-lg px-3 py-2 text-sm font-bold text-[var(--isitabuy-ink)] hover:bg-slate-50">
              {item.label}
            </NextLink>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button asChild variant="outline" className="h-10">
              <NextLink href="/signin">Log in</NextLink>
            </Button>
            <Button asChild className="h-10 bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]">
              <NextLink href="/signin?mode=signup">Sign up</NextLink>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ProductImage({ product }: { product: Product }) {
  if (product.imageSrc) {
    return (
      <span className="relative block size-16 overflow-hidden rounded-xl bg-slate-50">
        <Image src={product.imageSrc} alt={product.imageAlt} fill sizes="64px" className="object-contain p-1.5" />
      </span>
    );
  }

  return (
    <span className="grid size-16 place-items-center rounded-xl bg-slate-50 text-slate-400">
      <ShoppingBag className="size-6" aria-hidden="true" />
    </span>
  );
}

function ProductSlotCard({
  slot,
  product,
  active,
  onActivate,
  onRemove,
}: {
  slot: CompareSlotId;
  product: Product | null;
  active: boolean;
  onActivate: () => void;
  onRemove: () => void;
}) {
  return (
    <Card
      className={cn(
        "min-h-[15rem] rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[var(--isitabuy-card-shadow)]",
        active ? "border-[var(--isitabuy-orange)] ring-4 ring-orange-100/70" : "border-[var(--isitabuy-line)]"
      )}
    >
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <button type="button" className="text-left" onClick={onActivate}>
            <span className="text-[0.7rem] font-bold uppercase text-[var(--isitabuy-orange)]">Product {slot}</span>
            <span className="mt-1 block text-sm font-bold text-[var(--isitabuy-ink)]">{product ? product.name : "Choose a product"}</span>
          </button>
          {product ? (
            <Button variant="ghost" size="icon-sm" aria-label={`Remove Product ${slot}`} onClick={onRemove}>
              <Trash2 className="size-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="rounded-full text-xs font-bold" onClick={onActivate}>
              Select
            </Button>
          )}
        </div>
        {product ? (
          <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-[4.5rem_minmax(0,1fr)]">
            <ProductImage product={product} />
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">{product.subtitle}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.7rem] font-bold">
                <span className="inline-flex items-center gap-1 text-[var(--isitabuy-orange)]">
                  <Star className="size-3.5 fill-current" aria-hidden="true" />
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[var(--isitabuy-muted)]">({integer.format(product.reviews)})</span>
                <Badge className="border-0 bg-[var(--isitabuy-green-soft)] text-[0.62rem] text-emerald-700">{product.reviewTrust}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-[0.62rem] font-bold text-[var(--isitabuy-ink)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-bold text-[var(--isitabuy-muted)]">Current price</p>
                  <p className="font-numeric text-xl font-bold text-[var(--isitabuy-ink)]">{formatPrice(product.currentPrice)}</p>
                </div>
                <Badge className={cn("border-0 text-xs font-bold", product.verdict === "BUY" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
                  {product.verdict}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mt-4 grid flex-1 place-items-center rounded-xl border border-dashed border-[var(--isitabuy-line)] bg-[image:var(--isitabuy-violet-panel)] text-center"
            onClick={onActivate}
          >
            <span>
              <Search className="mx-auto size-5 text-[var(--isitabuy-orange)]" aria-hidden="true" />
              <span className="mt-2 block text-xs font-bold text-[var(--isitabuy-muted)]">Search and add a product</span>
            </span>
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function SearchResultCard({
  result,
  activeSlot,
  onAdd,
}: {
  result: SearchResult;
  activeSlot: CompareSlotId;
  onAdd: (slot: CompareSlotId, product: Product) => void;
}) {
  const { product } = result;

  return (
    <div className="grid gap-3 rounded-xl border border-[var(--isitabuy-line)] bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--isitabuy-card-shadow)] sm:grid-cols-[4.5rem_minmax(0,1fr)_auto]">
      <ProductImage product={product} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-bold text-[var(--isitabuy-ink)]">{product.name}</h3>
          <Badge className="border-0 bg-purple-100 text-[0.62rem] font-bold text-[var(--isitabuy-purple)]">{result.matchLabel}</Badge>
        </div>
        <p className="mt-1 text-xs font-semibold text-[var(--isitabuy-muted)]">{product.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-[0.6rem] font-bold text-[var(--isitabuy-ink)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="font-numeric text-sm font-bold text-[var(--isitabuy-ink)]">{formatPrice(product.currentPrice)}</p>
          <p className="text-[0.65rem] font-bold text-emerald-700">{product.discountPercent}% off</p>
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" variant={activeSlot === "A" ? "default" : "outline"} className={cn("h-8 rounded-full px-3 text-xs font-bold", activeSlot === "A" && "bg-[var(--isitabuy-purple)] text-white hover:bg-violet-700")} onClick={() => onAdd("A", product)}>
            Add A
          </Button>
          <Button size="sm" variant={activeSlot === "B" ? "default" : "outline"} className={cn("h-8 rounded-full px-3 text-xs font-bold", activeSlot === "B" && "bg-[var(--isitabuy-purple)] text-white hover:bg-violet-700")} onClick={() => onAdd("B", product)}>
            Add B
          </Button>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  productA,
  productB,
  onStart,
  onSwap,
}: {
  recommendation: BuilderRecommendation;
  productA: Product | null;
  productB: Product | null;
  onStart: () => void;
  onSwap: () => void;
}) {
  const ready = Boolean(productA && productB);

  return (
    <Card className="h-full overflow-hidden rounded-2xl border border-[var(--isitabuy-line)] bg-[image:var(--isitabuy-violet-panel)] shadow-[var(--isitabuy-card-shadow)]">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase text-[var(--isitabuy-ink)]">
          <span className="grid size-7 place-items-center rounded-lg bg-white text-[var(--isitabuy-purple)] shadow-sm">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          Smart preview
        </div>
        <h2 className="mt-4 text-xl font-bold leading-tight text-[var(--isitabuy-purple)]">{recommendation.title}</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{recommendation.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {recommendation.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold text-[var(--isitabuy-purple)] shadow-sm">
              {badge}
            </span>
          ))}
        </div>
        <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-[auto_1fr] sm:items-end">
          <div className="flex items-center gap-3">
            <div
              className="grid size-16 place-items-center rounded-full p-1.5"
              style={{
                background: `conic-gradient(#622395 0 ${recommendation.confidence}%, #16a34a ${recommendation.confidence}% 100%)`,
              }}
            >
              <div className="grid size-full place-items-center rounded-full bg-white font-numeric text-base font-bold text-[var(--isitabuy-ink)]">
                {recommendation.confidence ? `${recommendation.confidence}%` : "--"}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--isitabuy-ink)]">Confidence</p>
              <p className="text-[0.7rem] font-semibold text-[var(--isitabuy-muted)]">Price, review, and score signals</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
            <Button variant="outline" className="h-9 gap-2 rounded-full bg-white text-xs font-bold" onClick={onSwap} disabled={!ready}>
              <Shuffle className="size-4" aria-hidden="true" />
              Swap
            </Button>
            <Button className="h-9 rounded-full bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={onStart} disabled={!ready}>
              Start comparison
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, title: "Review trust", body: "Scores flag sentiment and source coverage." },
    { icon: Tag, title: "Deal context", body: "Price, list price, savings, and retailer signals." },
    { icon: BarChart3, title: "Side-by-side", body: "Preview winner logic before opening the dashboard." },
    { icon: Zap, title: "Fast decision flow", body: "Move from search intent to a full comparison quickly." },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="grid gap-3 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3 rounded-xl p-3 transition hover:bg-slate-50">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-[var(--isitabuy-orange)]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-[var(--isitabuy-ink)]">{item.title}</span>
                <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">{item.body}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PresetComparisons({
  onPreset,
  onOpenDemo,
}: {
  onPreset: (productA: Product, productB: Product) => void;
  onOpenDemo: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-[0.72rem] font-bold uppercase text-[var(--isitabuy-orange)]">Popular presets</p>
          <h2 className="mt-1 text-xl font-bold text-[var(--isitabuy-ink)]">Start from a proven comparison</h2>
        </div>
        <Button variant="outline" className="h-9 w-fit rounded-full text-xs font-bold" onClick={onOpenDemo}>
          Open Sony vs Bose demo
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {presetPairs.map((preset) => {
          const productA = productById(preset.a);
          const productB = productById(preset.b);
          if (!productA || !productB) return null;
          const recommendation = getRecommendation(productA, productB);
          return (
            <button
              key={preset.title}
              type="button"
              className="rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--isitabuy-card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
              onClick={() => onPreset(productA, productB)}
            >
              <span className="text-sm font-bold text-[var(--isitabuy-ink)]">{preset.title}</span>
              <span className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <span className="flex justify-center"><ProductImage product={productA} /></span>
                <span className="grid size-8 place-items-center rounded-full bg-[var(--isitabuy-orange)] text-[0.65rem] font-bold text-white shadow-sm">VS</span>
                <span className="flex justify-center"><ProductImage product={productB} /></span>
              </span>
              <span className="mt-4 grid grid-cols-2 gap-2 text-center text-[0.7rem] font-bold text-[var(--isitabuy-ink)]">
                <span className="truncate">{productA.name}</span>
                <span className="truncate">{productB.name}</span>
              </span>
              <span className="mt-3 block rounded-lg bg-purple-100 px-3 py-2 text-[0.68rem] font-bold text-[var(--isitabuy-purple)]">
                {recommendation.winner?.name ?? "AI"} leads
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-t border-[var(--isitabuy-line)] pt-6 text-xs font-semibold text-[var(--isitabuy-muted)] sm:flex-row sm:items-center">
        <Logo />
        <p>AI product insights to help you buy smarter and spend better.</p>
      </div>
    </footer>
  );
}

export default function CompareLanding() {
  const [state, setState] = useState<BuilderState>({
    productA: mockProducts[0],
    productB: mockProducts[1],
    query: "",
    activeSlot: "A",
  });

  const recommendation = useMemo(() => getRecommendation(state.productA, state.productB), [state.productA, state.productB]);
  const results = useMemo(
    () =>
      mockProducts
        .map((product) => getSearchResult(product, state.query))
        .filter((result) => !state.query.trim() || result.score > 0)
        .sort((first, second) => second.score - first.score || first.product.currentPrice - second.product.currentPrice),
    [state.query]
  );

  const updateSlot = (slot: CompareSlotId, product: Product) => {
    const duplicate = slot === "A" ? state.productB?.id === product.id : state.productA?.id === product.id;
    if (duplicate) {
      showCompareToast("Choose another product", `${product.name} is already selected in the other slot.`);
      return;
    }

    setState((current) => ({
      ...current,
      productA: slot === "A" ? product : current.productA,
      productB: slot === "B" ? product : current.productB,
      activeSlot: slot === "A" ? "B" : "A",
    }));
    showCompareToast("Product added", `${product.name} added as Product ${slot}.`);
  };

  const removeSlot = (slot: CompareSlotId) => {
    setState((current) => ({
      ...current,
      productA: slot === "A" ? null : current.productA,
      productB: slot === "B" ? null : current.productB,
      activeSlot: slot,
    }));
  };

  const submitSearch = () => {
    const trimmedQuery = state.query.trim();
    if (!trimmedQuery) {
      showCompareToast("Search needs a product", "Try battery, comfort, ANC, value, or a headphone name.");
      return;
    }
    showCompareToast("Smart matches updated", `Showing ranked products for "${trimmedQuery}".`);
  };

  const startComparison = () => {
    if (!state.productA || !state.productB) {
      showCompareToast("Choose two products", "Fill Product A and Product B before opening a full comparison.");
      return;
    }
    window.location.href = getCompareHref(state.productA, state.productB);
  };

  const setPreset = (productA: Product, productB: Product) => {
    setState((current) => ({ ...current, productA, productB, activeSlot: "A" }));
    showCompareToast("Preset loaded", `${productA.name} vs ${productB.name} is ready.`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--isitabuy-page)] text-[var(--isitabuy-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[image:var(--isitabuy-hero-glow)]" aria-hidden="true" />
      <Header />
      <main className="relative">
        <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10 lg:pt-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(23rem,0.82fr)]">
          <div className="grid gap-4">
            <div className="rounded-[1.65rem] border border-[var(--isitabuy-line)] bg-white/94 p-4 shadow-[var(--isitabuy-card-shadow)] backdrop-blur sm:p-6">
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center xl:items-start xl:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--isitabuy-line)] bg-white/92 px-4 py-2 text-xs font-bold text-[var(--isitabuy-ink)] shadow-sm">
                  <Sparkles className="size-4 text-[var(--isitabuy-orange)]" aria-hidden="true" />
                  AI-Powered Compare Advisor
                </div>
                <h1 className="mt-4 max-w-[760px] font-heading text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.03] tracking-normal text-[var(--isitabuy-ink)]">
                  <span className="font-medium">Compare products</span>{" "}
                  <span className="mx-1 inline-block font-semibold text-[var(--brand-amber)]">before</span>{" "}
                  <span className="inline-block font-semibold text-[var(--brand-amber)]">you buy.</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[var(--isitabuy-muted)] sm:text-base">
                  Pick two products, rank smart matches by intent, and preview the stronger buy before opening the full comparison.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--isitabuy-line)] bg-white/92 px-4 py-2 text-xs font-bold text-[var(--isitabuy-ink)] shadow-sm sm:text-sm">
                  <span className="grid size-7 place-items-center rounded-lg bg-[var(--isitabuy-orange)] text-white">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                  </span>
                  Independent scores. Affiliate links do not affect recommendations.
                </div>
                <div className="mt-5 w-full rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white p-1.5 shadow-[0_14px_40px_rgb(15_23_42/0.1)]">
                  <div className="flex flex-col gap-2 lg:h-12 lg:flex-row lg:items-center">
                    <div className="relative min-w-0 flex-1">
                      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--isitabuy-ink)]" aria-hidden="true" />
                      <Input
                        aria-label="Search products to compare"
                        value={state.query}
                        onChange={(event) => setState((current) => ({ ...current, query: event.target.value }))}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") submitSearch();
                        }}
                        placeholder="Search headphones by comfort, battery, ANC, value..."
                        className="h-10 rounded-full border-transparent bg-white pl-10 pr-4 text-xs font-semibold shadow-none placeholder:text-[var(--isitabuy-muted)] focus-visible:ring-[var(--isitabuy-orange)] lg:h-11 lg:text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={submitSearch}
                      className="h-10 shrink-0 rounded-full bg-[var(--isitabuy-orange)] px-5 text-sm font-semibold text-white hover:bg-[var(--isitabuy-orange-dark)] lg:h-11 lg:px-6"
                    >
                      Find matches
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 xl:justify-start">
                  {["battery", "comfort", "ANC", "value"].map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="rounded-full border border-[var(--isitabuy-line)] bg-white/92 px-3 py-1.5 text-[0.72rem] font-bold text-[var(--isitabuy-ink)] shadow-sm transition hover:-translate-y-px hover:border-orange-200 hover:text-[var(--isitabuy-orange)]"
                      onClick={() => {
                        setState((current) => ({ ...current, query: term }));
                        showCompareToast("Smart matches updated", `Showing ranked products for "${term}".`);
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <ProductSlotCard
                slot="A"
                product={state.productA}
                active={state.activeSlot === "A"}
                onActivate={() => setState((current) => ({ ...current, activeSlot: "A" }))}
                onRemove={() => removeSlot("A")}
              />
              <ProductSlotCard
                slot="B"
                product={state.productB}
                active={state.activeSlot === "B"}
                onActivate={() => setState((current) => ({ ...current, activeSlot: "B" }))}
                onRemove={() => removeSlot("B")}
              />
            </div>

            <Card className="rounded-2xl border border-[var(--isitabuy-line)] bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[var(--isitabuy-ink)]">Ranked product matches</h2>
                    <p className="mt-1 text-xs font-semibold text-[var(--isitabuy-muted)]">Active slot: Product {state.activeSlot}. Add a result to either side.</p>
                  </div>
                  <Badge className="w-fit border-0 bg-orange-100 text-[0.68rem] font-bold text-orange-700">
                    {results.length} matches
                  </Badge>
                </div>
                <div className="mt-4 grid max-h-[30rem] gap-3 overflow-y-auto pr-1">
                  {results.length ? (
                    results.map((result) => (
                      <SearchResultCard key={result.product.id} result={result} activeSlot={state.activeSlot} onAdd={updateSlot} />
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-[var(--isitabuy-line)] bg-[image:var(--isitabuy-violet-panel)] p-8 text-center">
                      <p className="text-sm font-bold text-[var(--isitabuy-ink)]">No products found</p>
                      <p className="mt-1 text-xs font-semibold text-[var(--isitabuy-muted)]">Try battery, comfort, ANC, or value.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:sticky xl:top-20 xl:self-start">
            <RecommendationCard
              recommendation={recommendation}
              productA={state.productA}
              productB={state.productB}
              onStart={startComparison}
              onSwap={() => setState((current) => ({ ...current, productA: current.productB, productB: current.productA }))}
            />
            <Card className="rounded-2xl border border-[var(--isitabuy-line)] bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[var(--isitabuy-ink)]">Comparison path</h2>
                  <ChevronDown className="size-4 text-[var(--isitabuy-muted)]" aria-hidden="true" />
                </div>
                <div className="mt-4 grid gap-3 text-xs font-semibold text-[var(--isitabuy-muted)]">
                  <div className="flex items-center justify-between">
                    <span>Product A</span>
                    <span className="max-w-48 truncate font-bold text-[var(--isitabuy-ink)]">{state.productA?.name ?? "Empty"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Product B</span>
                    <span className="max-w-48 truncate font-bold text-[var(--isitabuy-ink)]">{state.productB?.name ?? "Empty"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Winner preview</span>
                    <span className="max-w-48 truncate font-bold text-[var(--isitabuy-purple)]">{recommendation.winner?.name ?? "Waiting"}</span>
                  </div>
                </div>
                <Button className="mt-5 h-10 w-full rounded-full bg-[var(--isitabuy-orange)] text-sm font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={startComparison}>
                  Open full comparison
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <TrustStrip />
        <PresetComparisons
          onPreset={setPreset}
          onOpenDemo={() => {
            window.location.href = "/compare/sony-wh-1000xm5-vs-bose-quietcomfort-ultra";
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
