"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  BadgeCheck,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Heart,
  Home,
  Info,
  Pencil,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trophy,
  User,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { showCompareToast } from "@/components/ui/app-toast";
import {
  aiRecommendation,
  compareCategories,
  extraCompareCategories,
  mockProducts,
  retailerOffers,
  scoreRows,
  userFitRows,
} from "@/lib/mockCompareData";
import { cn } from "@/lib/utils";
import type { Category, ComparisonState, Product, RetailerOffer, Verdict } from "@/types/compare";

const savedStorageKey = "isitabuy.savedComparison.sony-wh1000xm5-vs-bose-qc-ultra";
const hasSavedRoute = false;
const hasProfileRoute = false;

const bentoLayout = {
  grid: "mx-auto grid max-w-[92.5rem] grid-cols-1 items-stretch gap-4 px-4 md:grid-cols-2 xl:grid-cols-12 xl:px-8",
  productA: "md:col-span-1 xl:col-span-4",
  productB: "md:col-span-1 xl:col-span-4",
  ai: "md:col-span-2 xl:col-span-4",
  score: "md:col-span-2 xl:col-span-5",
  pros: "md:col-span-1 xl:col-span-4",
  price: "md:col-span-1 xl:col-span-3",
  bestFor: "md:col-span-1 xl:col-span-5",
  retailers: "md:col-span-1 xl:col-span-7",
  info: "md:col-span-2 xl:col-span-12",
} as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const integer = new Intl.NumberFormat("en-US");

function formatPrice(value: number) {
  return currency.format(value);
}

function Logo() {
  return (
    <NextLink href="/" className="flex shrink-0 items-center gap-3" aria-label="IsItABuy home">
      <span className="grid size-8 place-items-center rounded-lg bg-[var(--compare-green)] text-white shadow-[var(--compare-logo-shadow)]">
        <ShoppingBag className="size-5" aria-hidden="true" />
      </span>
      <span className="text-2xl font-black leading-none tracking-tight text-[var(--compare-green-dark)]">IsItABuy</span>
    </NextLink>
  );
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("min-w-0 gap-0 rounded-xl border border-[var(--compare-line)] bg-white py-0 shadow-[var(--compare-card-shadow)] transition-shadow duration-200 hover:shadow-[var(--compare-hover-shadow)]", className)}>
      {children}
    </Card>
  );
}

function InfoTooltip({ label }: { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex text-[var(--compare-muted)]" aria-label={label}>
          <CircleHelp className="size-3.5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>{label}</TooltipContent>
    </Tooltip>
  );
}

function CompareHeader({
  activeCategory,
  query,
  onActiveCategoryChange,
  onQueryChange,
  onSearch,
}: {
  activeCategory: Category["id"];
  query: string;
  onActiveCategoryChange: (category: Category["id"]) => void;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--compare-line)] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto grid min-h-16 max-w-[92.5rem] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-3 md:grid-cols-[auto_minmax(16rem,1fr)_auto_auto_auto] xl:px-8">
        <Logo />
        <div className="order-4 col-span-2 min-w-0 md:order-none md:col-span-1 md:flex md:justify-center">
          <div className="relative w-full max-w-[37.5rem]">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--compare-muted)]" aria-hidden="true" />
            <Input
              aria-label="Search deals"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search deals by product, category, or store..."
              className="h-10 rounded-md border-[var(--compare-line)] bg-white pl-11 pr-4 text-xs font-semibold shadow-[var(--compare-input-shadow)] placeholder:text-[var(--compare-muted)]"
            />
          </div>
        </div>
        <Button
          className="order-5 h-10 rounded-md bg-[var(--compare-orange)] px-3 text-xs font-black text-white hover:bg-[var(--compare-orange-dark)] md:order-none md:px-5"
          onClick={onSearch}
        >
          Search deals
        </Button>
        <div className="contents">
          <Button
            variant="ghost"
            className="h-9 gap-2 justify-self-end text-xs font-black"
            onClick={() => {
              if (hasSavedRoute) {
                window.location.href = "/saved";
                return;
              }
              showCompareToast("Saved", "Saved products will appear here.");
            }}
          >
            <Heart className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Saved</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-2 px-1.5" aria-label="Open profile menu">
                <Avatar size="lg" className="bg-[var(--compare-soft)]">
                  <AvatarFallback className="bg-[var(--compare-soft)] text-[var(--compare-ink)]">
                    <User className="size-4" aria-hidden="true" />
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="size-4 text-[var(--compare-ink)]" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {["Profile", "Watchlist", "Alerts", "Sign out"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onSelect={() => {
                    if (hasProfileRoute && item === "Profile") {
                      window.location.href = "/profile";
                      return;
                    }
                    showCompareToast(item, `${item} is coming soon.`);
                  }}
                  className="text-xs font-bold"
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CategoryNav activeCategory={activeCategory} onActiveCategoryChange={onActiveCategoryChange} />
    </header>
  );
}

function CategoryNav({
  activeCategory,
  onActiveCategoryChange,
}: {
  activeCategory: Category["id"];
  onActiveCategoryChange: (category: Category["id"]) => void;
}) {
  return (
    <nav className="mx-auto flex h-12 max-w-[92.5rem] items-center gap-6 overflow-x-auto px-4 text-xs font-black text-[var(--compare-ink)] xl:px-8" aria-label="Deal categories">
      {compareCategories.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onActiveCategoryChange(item.id)}
          className={cn(
            "flex h-full shrink-0 items-center border-b-2 border-transparent transition-colors hover:text-[var(--compare-orange)]",
            activeCategory === item.id && "border-[var(--compare-orange)] text-[var(--compare-orange)]"
          )}
        >
          {item.label}
        </button>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 shrink-0 gap-1 px-2 text-xs font-black">
            <span>More</span>
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {extraCompareCategories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onSelect={() => onActiveCategoryChange(category.id)}
              className={cn("text-xs font-bold", activeCategory === category.id && "text-[var(--compare-orange)]")}
            >
              {category.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

function BreadcrumbAndActions({
  saved,
  productA,
  productB,
  onShare,
  onSave,
  onEdit,
  onCompareClick,
}: {
  saved: boolean;
  productA: Product | null;
  productB: Product | null;
  onShare: () => void;
  onSave: () => void;
  onEdit: () => void;
  onCompareClick: () => void;
}) {
  const label = [productA?.name, productB?.name].filter(Boolean).join(" vs ") || "New comparison";

  return (
    <div className="mx-auto flex max-w-[92.5rem] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between xl:px-8">
      <div className="flex min-w-0 items-center gap-3 text-xs font-bold text-[var(--compare-muted)]">
        <Button asChild variant="ghost" size="icon-sm" className="size-7 shrink-0">
          <NextLink href="/" aria-label="Go to home">
            <Home className="size-4 text-[var(--compare-ink)]" aria-hidden="true" />
          </NextLink>
        </Button>
        <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
        <button type="button" className="shrink-0 text-[var(--compare-ink)] hover:text-[var(--compare-purple)]" onClick={onCompareClick}>
          Compare
        </button>
        <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
        <span className="truncate text-[var(--compare-ink)]">{label}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ActionButton icon={Share2} onClick={onShare}>
          Share
        </ActionButton>
        <ActionButton icon={saved ? Check : Bookmark} onClick={onSave}>
          {saved ? "Saved" : "Save Comparison"}
        </ActionButton>
        <ActionButton icon={Pencil} onClick={onEdit}>
          Edit Comparison
        </ActionButton>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  children,
  onClick,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button variant="outline" className="h-8 rounded-md border-[var(--compare-line)] bg-white px-4 text-xs font-black shadow-none" onClick={onClick}>
      <Icon className="size-4" data-icon="inline-start" aria-hidden="true" />
      {children}
    </Button>
  );
}

interface ProductInsight {
  label: string;
  tone: "positive" | "neutral" | "caution";
}

interface ComparisonRecommendation {
  title: string;
  body: string;
  confidence: number;
  confidenceLabel: "High" | "Medium";
  sourceCount: string;
}

function getPrimaryScore(product: Product) {
  return Math.round(product.scores.aiBuy * 0.45 + product.scores.price * 0.25 + product.scores.comfort * 0.15 + product.scores.performance * 0.15);
}

function getAdvantageLabels(product: Product, competitor: Product) {
  const labels: string[] = [];
  if (product.currentPrice < competitor.currentPrice) labels.push(`${formatPrice(competitor.currentPrice - product.currentPrice)} cheaper`);
  if (product.scores.price >= competitor.scores.price + 8) labels.push("better value");
  if (product.scores.comfort >= competitor.scores.comfort + 8) labels.push("more comfortable");
  if (product.scores.battery >= competitor.scores.battery + 8) labels.push("better battery");
  if (product.scores.performance >= competitor.scores.performance + 3) labels.push("stronger ANC");
  if (product.scores.features >= competitor.scores.features + 5) labels.push("more features");
  return labels;
}

function getProductInsights(product: Product, competitor: Product | null): ProductInsight[] {
  const insights: ProductInsight[] = [];

  if (!competitor) {
    insights.push({ label: `AI score ${product.scores.aiBuy}`, tone: "neutral" });
    insights.push({ label: `Best for ${product.bestFor}`, tone: "neutral" });
    insights.push({ label: product.verdict === "BUY" ? "Good value today" : "Watch price", tone: product.verdict === "BUY" ? "positive" : "caution" });
    return insights;
  }

  if (product.currentPrice < competitor.currentPrice) {
    insights.push({ label: `${formatPrice(competitor.currentPrice - product.currentPrice)} less`, tone: "positive" });
  } else if (product.currentPrice > competitor.currentPrice) {
    insights.push({ label: `${formatPrice(product.currentPrice - competitor.currentPrice)} more`, tone: "caution" });
  }

  if (product.scores.price >= competitor.scores.price + 8) insights.push({ label: "Better value", tone: "positive" });
  if (product.scores.comfort >= competitor.scores.comfort + 8) insights.push({ label: "Comfort edge", tone: "positive" });
  if (product.scores.battery >= competitor.scores.battery + 8) insights.push({ label: "Battery edge", tone: "positive" });
  if (product.scores.performance >= competitor.scores.performance + 3) insights.push({ label: "ANC edge", tone: "positive" });
  if (product.verdict === "WAIT") insights.push({ label: "Price may improve", tone: "caution" });
  insights.push({ label: `AI score ${product.scores.aiBuy}`, tone: "neutral" });
  if (insights.length < 3) insights.push({ label: `Best for ${product.bestFor}`, tone: "neutral" });

  return insights.slice(0, 3);
}

function getRecommendation(productA: Product | null, productB: Product | null): ComparisonRecommendation {
  if (!productA && !productB) {
    return {
      title: "Add products to unlock an AI recommendation.",
      body: "IsItABuy needs at least two products to compare value, prices, reviews, specs, and retailer availability.",
      confidence: 0,
      confidenceLabel: "Medium",
      sourceCount: aiRecommendation.sourceCount,
    };
  }

  if (!productA || !productB) {
    const product = productA ?? productB;
    return {
      title: `Add another product to compare against ${product?.name ?? "this item"}.`,
      body: "Once both slots are filled, IsItABuy will explain which option is the stronger buy and why.",
      confidence: 0,
      confidenceLabel: "Medium",
      sourceCount: aiRecommendation.sourceCount,
    };
  }

  const productAScore = getPrimaryScore(productA);
  const productBScore = getPrimaryScore(productB);
  const winner = productAScore >= productBScore ? productA : productB;
  const loser = winner.id === productA.id ? productB : productA;
  const scoreGap = Math.abs(productAScore - productBScore);
  const advantages = getAdvantageLabels(winner, loser);
  const confidence = Math.min(92, Math.max(68, 72 + scoreGap * 2 + Math.min(8, advantages.length * 2)));
  const isClose = scoreGap <= 3;
  const title = isClose
    ? `${winner.name} is the slight edge for most users.`
    : `${winner.name} is the smarter buy for most users.`;
  const reason = advantages.length ? advantages.slice(0, 3).join(", ") : "the stronger blended score";

  return {
    title,
    body: `${winner.name} leads on ${reason}. ${loser.name} still makes sense if you specifically prefer ${loser.bestFor.toLowerCase()}, but the current value signal favors ${winner.name}.`,
    confidence,
    confidenceLabel: confidence >= 80 ? "High" : "Medium",
    sourceCount: aiRecommendation.sourceCount,
  };
}

function ProductCompareCard({
  label,
  product,
  competitor,
  onRemove,
  onAdd,
  onTagClick,
  className,
}: {
  label: "Product A" | "Product B";
  product: Product | null;
  competitor: Product | null;
  onRemove: () => void;
  onAdd: () => void;
  onTagClick: (tag: string) => void;
  className?: string;
}) {
  const labelClassName = label === "Product A" ? "bg-[var(--compare-lavender)] text-[var(--compare-purple)]" : "bg-[var(--compare-blue-soft)] text-[var(--compare-blue)]";
  const insights = product ? getProductInsights(product, competitor) : [];

  if (!product) {
    return (
      <Panel className={cn("h-full min-h-[17rem]", className)}>
        <CardContent className="grid h-full min-h-[17rem] place-items-center p-4 text-center">
          <div>
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--compare-soft)] text-[var(--compare-muted)]">
              <ShoppingBag className="size-6" aria-hidden="true" />
            </div>
            <Badge className={cn("mt-4 h-5 rounded-md border-0 px-2 text-[0.62rem] font-black uppercase", labelClassName)}>{label}</Badge>
            <p className="mt-3 text-sm font-black text-[var(--compare-ink)]">Product removed</p>
            <p className="mt-1 text-xs font-semibold text-[var(--compare-muted)]">Add a product to continue.</p>
            <Button className="mt-4 h-8 bg-[var(--compare-orange)] px-4 text-xs font-black text-white hover:bg-[var(--compare-orange-dark)]" onClick={onAdd}>
              <Plus className="size-4" data-icon="inline-start" aria-hidden="true" />
              Add product
            </Button>
          </div>
        </CardContent>
      </Panel>
    );
  }

  return (
    <Panel className={cn("h-full min-h-[17rem]", className)}>
      <CardContent className="relative grid h-full min-h-[17rem] grid-cols-1 gap-3.5 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] xl:grid-cols-[9.5rem_minmax(0,1fr)]">
        <button type="button" className="absolute right-3.5 top-3.5 text-[var(--compare-ink)]" aria-label={`Remove ${product.name}`} onClick={onRemove}>
          <X className="size-4" aria-hidden="true" />
        </button>
        <ProductImage product={product} />
        <div className="min-w-0 pr-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={cn("h-5 rounded-md border-0 px-2 text-[0.62rem] font-black uppercase", labelClassName)}>{label}</Badge>
          </div>
          <h2 className="mt-2 text-[1.05rem] font-black leading-tight tracking-tight text-[var(--compare-ink)]">{product.name}</h2>
          <p className="mt-1 text-xs font-semibold leading-5 text-[var(--compare-muted)]">{product.subtitle}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.64rem] font-bold">
            <span className="inline-flex items-center gap-1 text-[var(--compare-orange)]">
              <Star className="size-3.5 fill-current" aria-hidden="true" />
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[var(--compare-muted)]">({integer.format(product.reviews)} reviews)</span>
            <Badge className="h-5 rounded-md border-0 bg-[var(--compare-green-soft)] text-[0.62rem] text-[var(--compare-green-dark)]">
              <ShieldCheck className="size-3" data-icon="inline-start" aria-hidden="true" />
              {product.reviewTrust}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="inline-flex h-5 items-center rounded-md bg-[var(--compare-soft)] px-2 text-[0.58rem] font-bold text-[var(--compare-ink)] transition-colors hover:bg-[var(--compare-lavender)] hover:text-[var(--compare-purple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--compare-orange)]"
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {insights.map((insight) => (
              <span
                key={insight.label}
                className={cn(
                  "truncate rounded-md px-2 py-1 text-[0.58rem] font-black",
                  insight.tone === "positive" && "bg-[var(--compare-green-soft)] text-[var(--compare-green-dark)]",
                  insight.tone === "caution" && "bg-[var(--compare-wait-soft)] text-[var(--compare-orange-dark)]",
                  insight.tone === "neutral" && "bg-[var(--compare-soft-panel)] text-[var(--compare-purple)]"
                )}
                title={insight.label}
              >
                {insight.label}
              </span>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-[var(--compare-line)] bg-[var(--compare-soft-panel)] px-3 py-2.5">
            <p className="text-[0.66rem] font-semibold text-[var(--compare-muted)]">Current price (Amazon)</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-3">
              <strong className="font-numeric text-[1.22rem] font-black leading-none text-[var(--compare-ink)]">{formatPrice(product.currentPrice)}</strong>
              <Badge className="h-5 border-0 bg-[var(--compare-green-soft)] text-[0.65rem] font-black text-[var(--compare-green-dark)]">
                {product.discountPercent}% off
              </Badge>
            </div>
            <p className="mt-1 text-[0.66rem] font-semibold text-[var(--compare-muted)]">
              List price: <span className="line-through">{formatPrice(product.listPrice)}</span>
            </p>
          </div>
          <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <VerdictBadge className="w-full" productName={product.name} verdict={product.verdict} />
            <span className="rounded-lg bg-[var(--compare-soft-panel)] px-2.5 py-1 text-[0.6rem] font-black text-[var(--compare-purple)]">
              Best for {product.bestFor}
            </span>
          </div>
        </div>
      </CardContent>
    </Panel>
  );
}

function ProductImage({ product }: { product: Product }) {
  if (product.imageSrc) {
    return (
      <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-white to-[var(--compare-soft-panel)]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={170}
          height={170}
          className={cn("h-auto max-h-[9.75rem] w-[9rem] object-contain drop-shadow-sm xl:w-[9.5rem]", product.id.includes("bose") ? "scale-[1.05]" : "scale-[1.1]")}
          priority
        />
      </div>
    );
  }

  return (
    <div className="grid min-h-32 place-items-center rounded-md bg-[var(--compare-soft-panel)]">
      <div className="grid size-24 place-items-center rounded-full bg-[var(--compare-soft)] text-[var(--compare-muted)]">
        <ShoppingBag className="size-10" aria-hidden="true" />
      </div>
    </div>
  );
}

function ProductResultImage({ product }: { product: Product }) {
  if (product.imageSrc) {
    return (
      <span className="relative block h-20 overflow-hidden rounded-lg bg-gradient-to-b from-white to-[var(--compare-soft-panel)]">
        <Image src={product.imageSrc} alt={product.imageAlt} fill sizes="72px" className="object-contain p-2" />
      </span>
    );
  }

  return (
    <span className="grid h-20 place-items-center rounded-lg bg-[var(--compare-soft-panel)] text-[var(--compare-muted)]">
      <ShoppingBag className="size-6" aria-hidden="true" />
    </span>
  );
}

function VsBadge() {
  return (
    <div className="pointer-events-none absolute left-0 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--compare-line)] bg-white text-sm font-black text-[var(--compare-ink)] shadow-[var(--compare-hover-shadow)] xl:grid">
      VS
    </div>
  );
}

function MobileVsDivider() {
  return (
    <div className="grid place-items-center py-1 md:hidden">
      <span className="grid size-10 place-items-center rounded-full border border-[var(--compare-line)] bg-white text-xs font-black text-[var(--compare-ink)] shadow-sm">VS</span>
    </div>
  );
}

function AiRecommendationCard({
  visible,
  productA,
  productB,
  onDismiss,
  onRestore,
  className,
}: {
  visible: boolean;
  productA: Product | null;
  productB: Product | null;
  onDismiss: () => void;
  onRestore: () => void;
  className?: string;
}) {
  const recommendation = getRecommendation(productA, productB);

  if (!visible) {
    return (
      <Panel className={cn("h-full min-h-[17rem]", className)}>
        <CardContent className="flex h-full min-h-[17rem] items-center justify-center p-4">
          <Button variant="outline" className="h-9 text-xs font-black text-[var(--compare-purple)]" onClick={onRestore}>
            Show AI recommendation
          </Button>
        </CardContent>
      </Panel>
    );
  }

  return (
    <Panel className={cn("h-full min-h-[17rem] overflow-hidden bg-[linear-gradient(135deg,#fff_0%,#fff_52%,var(--compare-lavender)_160%)]", className)}>
      <CardContent className="relative flex h-full min-h-[17rem] flex-col p-4">
        <button type="button" className="absolute right-3.5 top-3.5 text-[var(--compare-muted)]" aria-label="Hide AI recommendation" onClick={onDismiss}>
          <X className="size-4" aria-hidden="true" />
        </button>
        <div>
          <div className="mb-3 flex items-center gap-2 text-[0.68rem] font-black uppercase text-[var(--compare-ink)]">
            <BadgeCheck className="size-4 text-[var(--compare-purple)]" aria-hidden="true" />
            AI Recommendation
          </div>
          <h2 className="text-base font-black leading-tight text-[var(--compare-purple)]">{recommendation.title}</h2>
          <p className="mt-2 text-[0.72rem] font-semibold leading-5 text-[var(--compare-muted)]">{recommendation.body}</p>
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-[var(--compare-ink)]">
            Confidence
            <InfoTooltip label="Confidence is based on available product data, reviews, price history, and source coverage." />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="grid size-16 shrink-0 place-items-center rounded-full p-1.5"
              style={{
                background: `conic-gradient(var(--compare-purple) 0 ${recommendation.confidence}%, var(--compare-green) ${recommendation.confidence}% 100%)`,
              }}
            >
              <div className="grid size-full place-items-center rounded-full bg-white font-numeric text-base font-black text-[var(--compare-ink)]">
                {recommendation.confidence ? `${recommendation.confidence}%` : "--"}
              </div>
            </div>
            <div className="text-xs font-semibold leading-5 text-[var(--compare-muted)]">
              <strong className="block text-sm font-black text-[var(--compare-ink)]">{recommendation.confidenceLabel}</strong>
              Based on data from {recommendation.sourceCount} sources
            </div>
          </div>
        </div>
      </CardContent>
    </Panel>
  );
}

function getScoreValue(product: Product, rowId: string) {
  if (rowId === "bestFor") return product.bestFor;
  if (rowId === "verdict") return product.verdict;
  return product.scores[rowId as keyof Product["scores"]];
}

function getWinner(productA: Product | null, productB: Product | null, rowId: string) {
  if (!productA || !productB) return "";
  if (rowId === "reviewTrust") return productA.scores.reviewTrust === productB.scores.reviewTrust ? "Tie" : productA.scores.reviewTrust;
  if (rowId === "bestFor") return productB.bestFor === "Comfort" ? productB.name : productA.name;
  if (rowId === "verdict") return productA.verdict === "BUY" ? productA.name : productB.verdict === "BUY" ? productB.name : "Wait";
  const a = Number(getScoreValue(productA, rowId));
  const b = Number(getScoreValue(productB, rowId));
  if (a === b) return "Tie";
  return a > b ? productA.name : productB.name;
}

function ScoreComparisonTable({ productA, productB, className }: { productA: Product | null; productB: Product | null; className?: string }) {
  return (
    <Panel className={className}>
      <CardHeader className="px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">
          Score Comparison
          <InfoTooltip label="Scores compare value, price, review trust, performance, comfort, battery, and features." />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-3">
        <div className="overflow-x-auto" data-slot="table-container">
          <Table className="min-w-[42rem] table-fixed">
            <TableHeader>
              <TableRow className="border-[var(--compare-line)] hover:bg-transparent">
                <TableHead className="h-8 w-[38%] px-4 text-[0.7rem] font-bold text-[var(--compare-muted)]">Feature</TableHead>
                <TableHead className="h-8 w-[24%] text-[0.7rem] font-bold text-[var(--compare-muted)]">{productA?.name ?? "Product A"}</TableHead>
                <TableHead className="h-8 w-[24%] text-[0.7rem] font-bold text-[var(--compare-muted)]">{productB?.name ?? "Product B"}</TableHead>
                <TableHead className="h-8 w-[14%] text-[0.7rem] font-bold text-[var(--compare-muted)]">Winner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreRows.map((row) => {
                const Icon = row.icon;
                const winner = getWinner(productA, productB, row.id);
                return (
                  <TableRow key={row.id} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                    <TableCell className="px-4 py-2.5 text-[0.72rem] font-black text-[var(--compare-ink)]">
                      <span className="flex items-center gap-2.5">
                        <Icon className="size-4 text-[var(--compare-green)]" aria-hidden="true" />
                        {row.label}
                      </span>
                    </TableCell>
                    <ScoreValueCell product={productA} rowId={row.id} type={row.type} />
                    <ScoreValueCell product={productB} rowId={row.id} type={row.type} />
                    <TableCell className="py-2.5 text-xs font-black text-[var(--compare-purple)]">
                      {winner === "Tie" ? "=" : winner ? <Trophy className="size-4 text-[var(--compare-orange)]" aria-label={winner} /> : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Panel>
  );
}

function ScoreValueCell({
  product,
  rowId,
  type,
}: {
  product: Product | null;
  rowId: string;
  type: "score" | "trust" | "text" | "verdict";
}) {
  if (!product) {
    return <TableCell className="py-2.5 text-xs font-bold text-[var(--compare-muted)]">Add product</TableCell>;
  }

  const value = getScoreValue(product, rowId);
  if (type === "score") {
    return (
      <TableCell className="font-numeric py-2.5 text-[0.95rem] font-black text-[var(--compare-purple)]">
        {value} <span className="text-xs font-semibold text-[var(--compare-muted)]">/100</span>
      </TableCell>
    );
  }

  if (type === "trust") {
    return (
      <TableCell className="py-2.5 text-xs font-black text-[var(--compare-green-dark)]">
        <ShieldCheck className="mr-1 inline size-4" aria-hidden="true" />
        {value}
      </TableCell>
    );
  }

  if (type === "verdict") {
    return (
      <TableCell className="py-2.5">
        <VerdictBadge productName={product.name} verdict={product.verdict} />
      </TableCell>
    );
  }

  return <TableCell className="py-2.5 text-sm font-black text-[var(--compare-blue)]">{value}</TableCell>;
}

function VerdictBadge({ productName, verdict, className }: { productName: string; verdict: Verdict; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const description =
          verdict === "WAIT"
            ? `${productName} is a good product, but better deals are likely.`
            : verdict === "BUY"
              ? `${productName} has better overall value today.`
              : `${productName} has enough drawbacks that we would avoid it today.`;
        showCompareToast(`${verdict} verdict`, description);
      }}
      className={cn(
        "inline-flex min-w-20 items-center justify-center rounded-lg px-3 py-1 text-xs font-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--compare-orange)]",
        verdict === "BUY" && "bg-[var(--compare-green-soft)] text-[var(--compare-green-dark)]",
        verdict === "WAIT" && "bg-[var(--compare-wait-soft)] text-[var(--compare-orange-dark)]",
        verdict === "AVOID" && "bg-red-50 text-[var(--compare-red)]",
        className
      )}
    >
      {verdict}
    </button>
  );
}

function ProsConsCard({ productA, productB, className }: { productA: Product | null; productB: Product | null; className?: string }) {
  return (
    <Panel className={className}>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">Pros &amp; Cons</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 px-4 pb-4 sm:grid-cols-2">
        <ProsConsColumn product={productA} fallback="Product A" />
        <ProsConsColumn product={productB} fallback="Product B" />
      </CardContent>
    </Panel>
  );
}

function ProsConsColumn({ product, fallback }: { product: Product | null; fallback: string }) {
  return (
    <div className="min-w-0">
      <h3 className="text-xs font-black text-[var(--compare-purple)]">{product?.name ?? fallback}</h3>
      {product ? (
        <ul className="mt-3 grid gap-1.5 text-[0.7rem] font-semibold leading-5 text-[var(--compare-ink)]">
          {product.pros.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[var(--compare-green)]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
          {product.cons.map((item) => (
            <li key={item} className="flex gap-2">
              <XCircle className="mt-0.5 size-3.5 shrink-0 text-[var(--compare-red)]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-xs font-semibold text-[var(--compare-muted)]">Add a product to view pros and cons.</p>
      )}
    </div>
  );
}

function BestForDifferentUsersCard({ productA, productB, className }: { productA: Product | null; productB: Product | null; className?: string }) {
  return (
    <Panel className={className}>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">Best for Different Users</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-3">
        <Table className="table-fixed">
          <TableBody>
            {userFitRows.map((row) => {
              const Icon = row.icon;
              return (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]"
                  tabIndex={0}
                  onClick={() => showCompareToast("User fit", `Recommendation details for ${row.label.toLowerCase()}.`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      showCompareToast("User fit", `Recommendation details for ${row.label.toLowerCase()}.`);
                    }
                  }}
                >
                  <TableCell className="w-[32%] px-4 py-2 text-[0.7rem] font-black text-[var(--compare-ink)]">
                    <span className="flex items-center gap-2">
                      <Icon className="size-4 text-[var(--compare-ink)]" aria-hidden="true" />
                      {row.label}
                    </span>
                  </TableCell>
                  <TableCell className="w-[34%] py-2 text-[0.7rem] font-semibold text-[var(--compare-ink)]">{productA?.userFit[row.id] ?? "Add product"}</TableCell>
                  <TableCell className="w-[34%] py-2 text-[0.7rem] font-semibold text-[var(--compare-ink)]">{productB?.userFit[row.id] ?? "Add product"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Panel>
  );
}

function getLowPrice(product: Product) {
  if (product.id === "sony-wh-1000xm5") return 279.99;
  if (product.id === "bose-quietcomfort-ultra") return 249;
  return Math.max(product.currentPrice - 20, 0);
}

function getTrend(product: Product) {
  if (product.id === "sony-wh-1000xm5") return { label: "8% 30d", up: true };
  if (product.id === "bose-quietcomfort-ultra") return { label: "5% 30d", up: false };
  return { label: "3% 30d", up: false };
}

function PriceComparisonCard({ productA, productB, className }: { productA: Product | null; productB: Product | null; className?: string }) {
  const rows = ["Current Price", "List Price", "You Save", "90-Day Low", "Price Trend"];

  return (
    <Panel className={className}>
      <CardHeader className="px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">
          Price Comparison
          <InfoTooltip label="Price comparison uses current price, list price, savings, 90-day low, and recent trend." />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-3">
        <div className="overflow-x-auto" data-slot="table-container">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="border-[var(--compare-line)] hover:bg-transparent">
                <TableHead className="h-8 w-[34%] px-4 text-[0.62rem] font-bold text-[var(--compare-muted)]" />
                <TableHead className="h-8 w-[33%] truncate text-[0.62rem] font-bold text-[var(--compare-purple)]" title={productA?.name ?? "Product A"}>{productA?.name ?? "Product A"}</TableHead>
                <TableHead className="h-8 w-[33%] truncate text-[0.62rem] font-bold text-[var(--compare-blue)]" title={productB?.name ?? "Product B"}>{productB?.name ?? "Product B"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                <TableCell className="px-4 py-2 text-[0.7rem] font-semibold text-[var(--compare-ink)]">{row}</TableCell>
                  <PriceCell product={productA} row={row} />
                  <PriceCell product={productB} row={row} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Panel>
  );
}

function PriceCell({ product, row }: { product: Product | null; row: string }) {
  if (!product) return <TableCell className="py-2 text-[0.72rem] font-semibold text-[var(--compare-muted)]">Add product</TableCell>;

  if (row === "Current Price") return <TableCell className="font-numeric py-2 text-[0.72rem] font-black text-[var(--compare-green)]">{formatPrice(product.currentPrice)}</TableCell>;
  if (row === "List Price") return <TableCell className="font-numeric py-2 text-[0.72rem] font-semibold text-[var(--compare-ink)]">{formatPrice(product.listPrice)}</TableCell>;
  if (row === "You Save") return <TableCell className="font-numeric py-2 text-[0.72rem] font-semibold text-[var(--compare-ink)]">{formatPrice(product.listPrice - product.currentPrice)} ({product.discountPercent}%)</TableCell>;
  if (row === "90-Day Low") return <TableCell className="font-numeric py-2 text-[0.72rem] font-black text-[var(--compare-green)]">{formatPrice(getLowPrice(product))}</TableCell>;

  const trend = getTrend(product);
  return (
    <TableCell className={cn("font-numeric py-2 text-[0.72rem] font-semibold", trend.up ? "text-[var(--compare-orange)]" : "text-[var(--compare-green)]")}>
      {trend.up ? "up " : "down "}
      {trend.label}
    </TableCell>
  );
}

function RetailerOffersCard({
  productA,
  productB,
  expanded,
  onToggleExpanded,
  onViewDeal,
  className,
}: {
  productA: Product | null;
  productB: Product | null;
  expanded: boolean;
  onToggleExpanded: () => void;
  onViewDeal: (retailer: RetailerOffer, product: Product) => void;
  className?: string;
}) {
  const visibleOffers = expanded ? retailerOffers : retailerOffers.slice(0, 4);

  return (
    <Panel className={className}>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">Top Retailer Offers</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-4">
        <div className="overflow-x-auto">
          <Table className="min-w-[32rem] table-fixed">
            <TableHeader>
              <TableRow className="border-[var(--compare-line)] hover:bg-transparent">
                <TableHead className="h-8 w-[36%] px-4 text-[0.64rem] font-bold text-[var(--compare-muted)]">Retailer</TableHead>
                <TableHead className="h-8 w-[32%] text-[0.64rem] font-bold text-[var(--compare-muted)]">{productA?.name ?? "Product A"}</TableHead>
                <TableHead className="h-8 w-[32%] text-[0.64rem] font-bold text-[var(--compare-muted)]">{productB?.name ?? "Product B"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleOffers.map((offer) => (
                <TableRow key={offer.id} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                  <TableCell className="px-4 py-2">
                    <RetailerMark offer={offer} />
                  </TableCell>
                  <OfferCell product={productA} offer={offer} onViewDeal={onViewDeal} />
                  <OfferCell product={productB} offer={offer} onViewDeal={onViewDeal} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <button
          type="button"
          className="mx-auto mt-3 flex w-fit items-center gap-2 text-[0.82rem] font-black text-[var(--compare-purple)]"
          onClick={onToggleExpanded}
        >
          {expanded ? "Show fewer retailers" : "View all 12 retailers"}
          <ChevronRight className={cn("size-4 transition-transform", expanded && "rotate-90")} aria-hidden="true" />
        </button>
      </CardContent>
    </Panel>
  );
}

function RetailerMark({ offer }: { offer: RetailerOffer }) {
  const [failed, setFailed] = useState(false);

  if (offer.logoSrc && !failed) {
    return (
      <span className="relative block h-6 w-20">
        <Image src={offer.logoSrc} alt={`${offer.retailer} logo`} fill sizes="96px" className="object-contain object-left" onError={() => setFailed(true)} />
      </span>
    );
  }

  return <span className="text-xs font-black text-[var(--compare-ink)]">{offer.retailer}</span>;
}

function OfferCell({
  product,
  offer,
  onViewDeal,
}: {
  product: Product | null;
  offer: RetailerOffer;
  onViewDeal: (retailer: RetailerOffer, product: Product) => void;
}) {
  if (!product) return <TableCell className="py-2 text-[0.7rem] font-semibold text-[var(--compare-muted)]">Add product</TableCell>;

  const item = offer.offers[product.id] ?? { price: product.currentPrice, discountPercent: product.discountPercent };

  return (
    <TableCell className="py-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-numeric text-[0.82rem] font-black text-[var(--compare-ink)]">{formatPrice(item.price)}</span>
        {item.discountPercent ? <Badge className="h-5 border-0 bg-[var(--compare-green-soft)] text-[0.6rem] font-black text-[var(--compare-green-dark)]">{item.discountPercent}% off</Badge> : null}
        <Button
          variant="outline"
          className="h-5 rounded-md border-[var(--compare-orange-border)] px-2 text-[0.56rem] font-black text-[var(--compare-orange)]"
          onClick={() => onViewDeal(offer, product)}
        >
          View Deal
        </Button>
      </div>
    </TableCell>
  );
}

function CompareInfoBar({ onLearnMore, className }: { onLearnMore: () => void; className?: string }) {
  return (
    <aside className={cn("flex flex-col gap-3 rounded-xl border border-[var(--compare-line)] bg-[var(--compare-soft-panel)] px-5 py-5 text-xs font-semibold text-[var(--compare-ink)] sm:flex-row sm:items-center", className)}>
      <Info className="shrink-0 text-[var(--compare-muted)]" aria-hidden="true" />
      <p className="min-w-0">Our analysis is based on AI processing of specs, pricing, reviews, and expert opinions from 45,000+ trusted sources.</p>
      <button type="button" className="inline-flex shrink-0 items-center gap-2 font-black text-[var(--compare-purple)]" onClick={onLearnMore}>
        Learn more about how we compare
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </button>
    </aside>
  );
}

function getSearchableProductText(product: Product) {
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

function getProductSearchMatch(product: Product, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return {
      score: product.scores.aiBuy + product.scores.price / 10,
      label: `${product.bestFor} pick`,
    };
  }

  const searchableText = getSearchableProductText(product);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  let score = 0;
  const reasons: string[] = [];

  if (product.name.toLowerCase().includes(normalizedQuery)) {
    score += 60;
    reasons.push("name match");
  }

  if (product.subtitle.toLowerCase().includes(normalizedQuery)) {
    score += 24;
    reasons.push("category match");
  }

  for (const tag of product.tags) {
    if (tag.toLowerCase().includes(normalizedQuery) || terms.some((term) => tag.toLowerCase().includes(term))) {
      score += 18;
      reasons.push(tag);
      break;
    }
  }

  for (const term of terms) {
    if (searchableText.includes(term)) score += 8;
  }

  if (["cheap", "deal", "value", "budget", "price"].some((term) => normalizedQuery.includes(term))) {
    score += product.scores.price / 2;
    reasons.push("strong price score");
  }

  if (["comfort", "comfortable", "flight", "long"].some((term) => normalizedQuery.includes(term))) {
    score += product.scores.comfort / 2;
    reasons.push("comfort fit");
  }

  if (["battery", "travel", "traveler"].some((term) => normalizedQuery.includes(term))) {
    score += product.scores.battery / 2;
    reasons.push("battery strength");
  }

  if (["anc", "noise", "cancelling", "canceling"].some((term) => normalizedQuery.includes(term))) {
    score += product.scores.performance / 2;
    reasons.push("ANC performance");
  }

  return {
    score,
    label: reasons[0] ?? "related match",
  };
}

function EditComparisonDialog({
  open,
  productA,
  productB,
  helper,
  preferredSlot,
  onApply,
  onOpenChange,
}: {
  open: boolean;
  productA: Product | null;
  productB: Product | null;
  helper: boolean;
  preferredSlot: "A" | "B";
  onApply: (productA: Product | null, productB: Product | null) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const [slot, setSlot] = useState<"A" | "B">(preferredSlot);
  const [selectedProductId, setSelectedProductId] = useState((preferredSlot === "A" ? productA : productB)?.id ?? mockProducts[0].id);
  const [productQuery, setProductQuery] = useState("");

  const selectedProduct = mockProducts.find((product) => product.id === selectedProductId) ?? mockProducts[0];
  const otherProduct = slot === "A" ? productB : productA;
  const currentSlotProduct = slot === "A" ? productA : productB;
  const rankedProducts = useMemo(
    () =>
      mockProducts
        .map((product) => ({
          product,
          match: getProductSearchMatch(product, productQuery),
        }))
        .filter((item) => !productQuery.trim() || item.match.score > 0)
        .sort((first, second) => second.match.score - first.match.score || first.product.currentPrice - second.product.currentPrice),
    [productQuery]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-4rem)] overflow-hidden rounded-xl border-[var(--compare-line)] p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-[var(--compare-line)] bg-[var(--compare-soft-panel)] px-5 py-4 text-left">
          <DialogTitle className="text-lg font-black text-[var(--compare-ink)]">Edit comparison</DialogTitle>
          <DialogDescription className="text-xs font-semibold text-[var(--compare-muted)]">
            Search the mock catalog, pick a slot, then replace one product in the comparison.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[min(34rem,calc(100vh-12rem))] gap-0 overflow-hidden md:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="border-b border-[var(--compare-line)] bg-white p-4 md:border-b-0 md:border-r">
            {helper ? (
              <div className="mb-3 rounded-lg border border-[var(--compare-orange-border)] bg-[var(--compare-wait-soft)] px-3 py-2 text-[0.7rem] font-bold leading-5 text-[var(--compare-orange-dark)]">
                V1 supports two-product comparison. Choose a product to replace.
              </div>
            ) : null}
            <p className="text-[0.68rem] font-black uppercase text-[var(--compare-muted)]">Replace slot</p>
            <div className="mt-2 grid gap-2">
              {(["A", "B"] as const).map((option) => {
                const slotProduct = option === "A" ? productA : productB;
                return (
                  <button
                    key={option}
                    type="button"
                    className={cn(
                      "rounded-lg border border-[var(--compare-line)] bg-white p-3 text-left transition-colors hover:border-[var(--compare-purple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--compare-orange)]",
                      slot === option && "border-[var(--compare-purple)] bg-[var(--compare-lavender)]/50"
                    )}
                    onClick={() => {
                      setSlot(option);
                      setSelectedProductId((option === "A" ? productA : productB)?.id ?? mockProducts[0].id);
                    }}
                  >
                    <span className="block text-xs font-black text-[var(--compare-ink)]">Product {option}</span>
                    <span className="mt-1 block truncate text-[0.72rem] font-semibold text-[var(--compare-muted)]">
                      {slotProduct?.name ?? "Empty slot"}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg border border-[var(--compare-line)] bg-[var(--compare-soft-panel)] p-3">
              <p className="text-[0.68rem] font-black uppercase text-[var(--compare-muted)]">Selected</p>
              <p className="mt-1 text-sm font-black text-[var(--compare-ink)]">{selectedProduct.name}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge className="border-0 bg-[var(--compare-green-soft)] text-[0.62rem] text-[var(--compare-green-dark)]">
                  {formatPrice(selectedProduct.currentPrice)}
                </Badge>
                <Badge className="border-0 bg-[var(--compare-lavender)] text-[0.62rem] text-[var(--compare-purple)]">
                  {selectedProduct.bestFor}
                </Badge>
              </div>
              {otherProduct?.id === selectedProduct.id ? (
                <p className="mt-2 text-[0.68rem] font-bold text-[var(--compare-red)]">Already selected in Product {slot === "A" ? "B" : "A"}.</p>
              ) : null}
            </div>
          </aside>
          <div className="flex min-h-0 flex-col bg-white">
            <div className="border-b border-[var(--compare-line)] p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--compare-muted)]" aria-hidden="true" />
                <Input
                  aria-label="Search products to compare"
                  value={productQuery}
                  onChange={(event) => setProductQuery(event.target.value)}
                  placeholder="Try comfort, battery, ANC, Apple, value..."
                  className="h-10 rounded-lg border-[var(--compare-line)] bg-white pl-10 text-xs font-semibold shadow-sm"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["comfort", "battery", "ANC", "value"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="rounded-full bg-[var(--compare-soft)] px-2.5 py-1 text-[0.65rem] font-black text-[var(--compare-ink)] hover:bg-[var(--compare-lavender)] hover:text-[var(--compare-purple)]"
                    onClick={() => setProductQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <div className="min-h-0 overflow-y-auto p-4">
              {rankedProducts.length ? (
                <div className="grid gap-2">
                  {rankedProducts.map(({ product, match }) => {
                    const duplicateOfOtherSlot = otherProduct?.id === product.id;
                    const selected = selectedProductId === product.id;
                    const unchanged = currentSlotProduct?.id === product.id;
                    return (
                      <button
                        key={product.id}
                        type="button"
                        className={cn(
                          "group grid gap-3 rounded-xl border border-[var(--compare-line)] bg-white p-3 text-left transition-colors hover:border-[var(--compare-purple)] hover:bg-[var(--compare-soft-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--compare-orange)] sm:grid-cols-[4.5rem_minmax(0,1fr)_auto]",
                          selected && "border-[var(--compare-purple)] bg-[var(--compare-lavender)]/45",
                          duplicateOfOtherSlot && !unchanged && "border-[var(--compare-orange-border)]"
                        )}
                        onClick={() => {
                          if (duplicateOfOtherSlot && !unchanged) {
                            showCompareToast("Choose a different product", `That product is already in Product ${slot === "A" ? "B" : "A"}.`);
                            return;
                          }
                          setSelectedProductId(product.id);
                        }}
                      >
                        <ProductResultImage product={product} />
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black text-[var(--compare-ink)]">{product.name}</span>
                            <Badge className="border-0 bg-[var(--compare-soft)] text-[0.6rem] font-black text-[var(--compare-purple)]">
                              {match.label}
                            </Badge>
                          </span>
                          <span className="mt-1 block text-[0.72rem] font-semibold text-[var(--compare-muted)]">{product.subtitle}</span>
                          <span className="mt-2 flex flex-wrap gap-1.5">
                            {product.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="rounded-md bg-[var(--compare-soft)] px-2 py-0.5 text-[0.58rem] font-bold text-[var(--compare-ink)]">
                                {tag}
                              </span>
                            ))}
                          </span>
                        </span>
                        <span className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                          <span className="text-right">
                            <span className="block font-numeric text-sm font-black text-[var(--compare-ink)]">{formatPrice(product.currentPrice)}</span>
                            <span className="text-[0.65rem] font-bold text-[var(--compare-green-dark)]">{product.discountPercent}% off</span>
                          </span>
                          {selected ? <Check className="size-4 text-[var(--compare-purple)]" aria-hidden="true" /> : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid min-h-40 place-items-center rounded-xl border border-dashed border-[var(--compare-line)] text-center">
                  <div>
                    <p className="text-sm font-black text-[var(--compare-ink)]">No mock products found</p>
                    <p className="mt-1 text-xs font-semibold text-[var(--compare-muted)]">Try comfort, battery, ANC, Apple, or value.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="border-t border-[var(--compare-line)] bg-[var(--compare-soft-panel)] px-5 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="bg-[var(--compare-orange)] text-white hover:bg-[var(--compare-orange-dark)]"
            onClick={() => {
              if (otherProduct?.id === selectedProduct.id) {
                showCompareToast("Choose a different product", "Product A and Product B must be different.");
                return;
              }
              onApply(slot === "A" ? selectedProduct : productA, slot === "B" ? selectedProduct : productB);
              onOpenChange(false);
            }}
          >
            Apply updates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LearnMoreDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg border-[var(--compare-line)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[var(--compare-ink)]">How IsItABuy compares</DialogTitle>
          <DialogDescription className="text-sm font-semibold leading-6 text-[var(--compare-muted)]">
            IsItABuy compares products using price, review trust, value, specs, retailer availability, and AI analysis. Affiliate links do not affect scores. We may earn commission from some links, but that does not change the AI Buy Score or recommendation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-[var(--compare-orange)] text-white hover:bg-[var(--compare-orange-dark)]" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ComparePageClient() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<ComparisonState>({
    productA: mockProducts[0],
    productB: mockProducts[1],
    saved: false,
    activeCategory: "all-deals",
    aiRecommendationVisible: true,
    offersExpanded: false,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [editHelper, setEditHelper] = useState(false);
  const [preferredSlot, setPreferredSlot] = useState<"A" | "B">("A");

  useEffect(() => {
    const loadSavedComparison = window.setTimeout(() => {
      const raw = window.localStorage.getItem(savedStorageKey);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw) as { saved?: boolean; productAId?: string; productBId?: string };
        setState((current) => ({
          ...current,
          saved: Boolean(parsed.saved),
          productA: mockProducts.find((product) => product.id === parsed.productAId) ?? current.productA,
          productB: mockProducts.find((product) => product.id === parsed.productBId) ?? current.productB,
        }));
      } catch {
        window.localStorage.removeItem(savedStorageKey);
      }
    }, 0);

    return () => window.clearTimeout(loadSavedComparison);
  }, []);

  const updateState = (partial: Partial<ComparisonState>) => {
    setState((current) => ({ ...current, ...partial }));
  };

  const openEdit = (helper: boolean, slot: "A" | "B") => {
    setEditHelper(helper);
    setPreferredSlot(slot);
    setEditOpen(true);
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      showCompareToast("Search deals", "Enter a product, category, or store to search.");
      return;
    }

    window.location.href = `/deals?q=${encodeURIComponent(trimmed)}`;
  };

  const handleTagSearch = (tag: string) => {
    window.location.href = `/deals?q=${encodeURIComponent(tag)}`;
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "IsItABuy product comparison",
          text: "Compare Sony WH-1000XM5 vs Bose QuietComfort Ultra",
          url,
        });
        showCompareToast("Comparison shared.", "Comparison shared.");
        return;
      }

      await navigator.clipboard.writeText(url);
      showCompareToast("Comparison link copied.", "Comparison link copied.");
    } catch {
      showCompareToast("Share unavailable", "The comparison link could not be shared right now.");
    }
  };

  const handleSave = () => {
    setState((current) => {
      const nextSaved = !current.saved;
      if (nextSaved) {
        window.localStorage.setItem(
          savedStorageKey,
          JSON.stringify({
            saved: true,
            productAId: current.productA?.id,
            productBId: current.productB?.id,
            savedAt: new Date().toISOString(),
          })
        );
        showCompareToast("Comparison saved.", "Comparison saved.");
      } else {
        window.localStorage.removeItem(savedStorageKey);
        showCompareToast("Comparison removed from saved.", "Comparison removed from saved.");
      }

      return { ...current, saved: nextSaved };
    });
  };

  const handleViewDeal = (offer: RetailerOffer, product: Product) => {
    showCompareToast("Opening deal", `Opening deal from ${offer.retailer}.`);
    window.open(`/redirect?retailer=${encodeURIComponent(offer.id)}&product=${encodeURIComponent(product.slug)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="compare-dashboard min-h-screen bg-[var(--compare-page)] text-[var(--compare-ink)]">
      <CompareHeader
        activeCategory={state.activeCategory}
        query={query}
        onActiveCategoryChange={(category) => updateState({ activeCategory: category })}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />
      <main className="pb-9">
        <BreadcrumbAndActions
          saved={state.saved}
          productA={state.productA}
          productB={state.productB}
          onShare={() => void handleShare()}
          onSave={handleSave}
          onEdit={() => openEdit(false, "A")}
          onCompareClick={() => {
            window.location.href = "/compare";
          }}
        />
        <section className={cn("relative", bentoLayout.grid)} aria-label="Product comparison dashboard">
          <ProductCompareCard
            className={bentoLayout.productA}
            label="Product A"
            product={state.productA}
            competitor={state.productB}
            onRemove={() => updateState({ productA: null })}
            onAdd={() => openEdit(true, "A")}
            onTagClick={handleTagSearch}
          />
          <MobileVsDivider />
          <div className={cn("relative min-w-0 h-full", bentoLayout.productB)}>
            <VsBadge />
            <ProductCompareCard
              className="h-full"
              label="Product B"
              product={state.productB}
              competitor={state.productA}
              onRemove={() => updateState({ productB: null })}
              onAdd={() => openEdit(true, "B")}
              onTagClick={handleTagSearch}
            />
          </div>
          <AiRecommendationCard
            className={bentoLayout.ai}
            visible={state.aiRecommendationVisible}
            productA={state.productA}
            productB={state.productB}
            onDismiss={() => updateState({ aiRecommendationVisible: false })}
            onRestore={() => updateState({ aiRecommendationVisible: true })}
          />
          <ScoreComparisonTable className={bentoLayout.score} productA={state.productA} productB={state.productB} />
          <ProsConsCard className={bentoLayout.pros} productA={state.productA} productB={state.productB} />
          <PriceComparisonCard className={bentoLayout.price} productA={state.productA} productB={state.productB} />
          <BestForDifferentUsersCard className={bentoLayout.bestFor} productA={state.productA} productB={state.productB} />
          <RetailerOffersCard
            className={bentoLayout.retailers}
            productA={state.productA}
            productB={state.productB}
            expanded={state.offersExpanded}
            onToggleExpanded={() => updateState({ offersExpanded: !state.offersExpanded })}
            onViewDeal={handleViewDeal}
          />
          <CompareInfoBar className={bentoLayout.info} onLearnMore={() => setLearnMoreOpen(true)} />
        </section>
      </main>
      <EditComparisonDialog
        key={`${preferredSlot}-${state.productA?.id ?? "empty"}-${state.productB?.id ?? "empty"}`}
        open={editOpen}
        productA={state.productA}
        productB={state.productB}
        helper={editHelper}
        preferredSlot={preferredSlot}
        onApply={(productA, productB) => {
          updateState({ productA, productB });
          showCompareToast("Comparison updated", "The product comparison has been updated.");
        }}
        onOpenChange={setEditOpen}
      />
      <LearnMoreDialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen} />
    </div>
  );
}
