"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  Heart,
  Link as LinkIcon,
  Menu,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Upload,
  X,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { showCompareToast } from "@/components/ui/app-toast";
import {
  compareHomeCategories,
  compareHomeProducts,
  extraCompareHomeCategories,
  trendingComparisons,
} from "@/lib/mockCompareHomeData";
import { cn } from "@/lib/utils";
import type { CompareHomeProduct, CompareSlotId } from "@/types/compareHome";

type ActiveDialog = "paste" | "scan" | "upload" | "commission" | null;

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const assistantRows: Array<{ label: string; icon: LucideIcon; tone: string }> = [
  { label: "Best similar price", icon: BadgeCheck, tone: "bg-emerald-50 text-emerald-700" },
  { label: "Cheaper good-enough option", icon: ShoppingBag, tone: "bg-orange-50 text-orange-700" },
  { label: "Premium upgrade", icon: Sparkles, tone: "bg-purple-50 text-purple-700" },
  { label: "Better reviewed alternative", icon: Star, tone: "bg-blue-50 text-blue-700" },
];

function formatPrice(price: number) {
  return priceFormatter.format(price);
}

function getProduct(id: string) {
  return compareHomeProducts.find((product) => product.id === id) ?? null;
}

function getSuggestions(query: string, selected: Array<CompareHomeProduct | null>) {
  const normalized = query.trim().toLowerCase();
  const selectedIds = new Set(
    selected
      .filter((product): product is CompareHomeProduct => Boolean(product))
      .map((product) => product.id)
  );

  return compareHomeProducts
    .filter((product) => !selectedIds.has(product.id))
    .map((product) => {
      const haystack = `${product.name} ${product.category} ${product.slug}`.toLowerCase();
      const score = !normalized
        ? product.aiBuyScore
        : haystack.includes(normalized)
          ? 100 + product.aiBuyScore
          : normalized.split(/\s+/).some((term) => haystack.includes(term))
            ? 60 + product.aiBuyScore
            : 0;
      return { product, score };
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score || first.product.price - second.product.price)
    .map((result) => result.product)
    .slice(0, 4);
}

function Logo() {
  return (
    <NextLink href="/" className="flex items-center gap-2.5" aria-label="IsItABuy home">
      <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[var(--isitabuy-ink)]">IsItABuy</span>
    </NextLink>
  );
}

function Header({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (categoryId: string, label: string) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const runSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      showCompareToast("Search needs a query", "Enter a product, category, or store to search.");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const showSaved = () => {
    showCompareToast("Saved products will appear here.", "Saved comparisons are not connected yet.");
  };

  const profileAction = (label: string) => {
    showCompareToast(label, `${label} controls will be connected in a later pass.`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--isitabuy-line)] bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[92.5rem] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <Button variant="outline" size="icon" className="lg:hidden" aria-label="Toggle menu" onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </Button>
        </div>
        <div className={cn("min-w-0 flex-1 gap-3 lg:flex lg:items-center", mobileOpen ? "grid" : "hidden lg:flex")}>
          <div className="mx-auto flex w-full max-w-[43rem] rounded-xl border border-[var(--isitabuy-line)] bg-white p-1 shadow-[var(--compare-input-shadow)]">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--isitabuy-muted)]" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") runSearch();
                }}
                placeholder="Search deals by product, category, or store..."
                className="h-10 rounded-lg border-transparent bg-white pl-9 text-xs font-semibold shadow-none focus-visible:ring-[var(--isitabuy-orange)]"
              />
            </div>
            <Button className="h-10 rounded-lg bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={runSearch}>
              Search deals
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="h-10 gap-2 rounded-full px-3 text-xs font-bold text-[var(--isitabuy-ink)]">
              <NextLink href="/receipts">
                <ReceiptText className="size-4" aria-hidden="true" />
                Receipts
              </NextLink>
            </Button>
            <Button variant="ghost" className="h-10 gap-2 rounded-full px-3 text-xs font-bold text-[var(--isitabuy-ink)]" onClick={showSaved}>
              <Heart className="size-4" aria-hidden="true" />
              Saved
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-2 rounded-full px-2" aria-label="Open profile menu">
                  <span className="grid size-8 place-items-center rounded-full bg-purple-100 text-sm font-black text-[var(--isitabuy-purple)]">A</span>
                  <ChevronDown className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {["Profile", "Watchlist", "Alerts", "Sign out"].map((item) => (
                  <DropdownMenuItem key={item} onSelect={() => profileAction(item)} className="cursor-pointer">
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-[92.5rem] items-center gap-7 overflow-x-auto px-4 text-xs font-black text-[var(--isitabuy-ink)] lg:px-8" aria-label="Categories">
        {compareHomeCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id, category.label)}
            className={cn(
              "relative h-11 shrink-0 transition hover:text-[var(--isitabuy-orange)]",
              activeCategory === category.id && "text-[var(--isitabuy-green)] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[var(--isitabuy-green)]"
            )}
          >
            {category.label}
          </button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="flex h-11 shrink-0 items-center gap-1 transition hover:text-[var(--isitabuy-orange)]">
              More
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {extraCompareHomeCategories.map((category) => (
              <DropdownMenuItem key={category.id} onSelect={() => onCategoryChange(category.id, category.label)} className="cursor-pointer">
                {category.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

function ProductArtwork({ product }: { product: CompareHomeProduct }) {
  if (product.imageSrc) {
    return (
      <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-50">
        <Image src={product.imageSrc} alt={product.imageAlt} fill sizes="64px" className="object-contain p-1.5" />
      </span>
    );
  }

  return (
    <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[image:var(--isitabuy-violet-panel)] text-[var(--isitabuy-purple)]">
      <ShoppingBag className="size-6" aria-hidden="true" />
    </span>
  );
}

function SuggestionList({
  suggestions,
  onSelect,
}: {
  suggestions: CompareHomeProduct[];
  onSelect: (product: CompareHomeProduct) => void;
}) {
  if (!suggestions.length) {
    return (
      <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 text-xs font-bold text-[var(--isitabuy-muted)] shadow-[var(--isitabuy-card-shadow)]">
        No matching mock products.
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 grid gap-1 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-2 shadow-[var(--isitabuy-card-shadow)]">
      {suggestions.map((product) => (
        <button
          key={product.id}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(product)}
          className="flex items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
        >
          <ProductArtwork product={product} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-black text-[var(--isitabuy-ink)]">{product.name}</span>
            <span className="mt-0.5 block text-xs font-semibold text-[var(--isitabuy-muted)]">{product.category} • {formatPrice(product.price)}</span>
          </span>
          <Badge className="border-0 bg-emerald-50 text-[0.68rem] font-black text-emerald-700">{product.aiBuyScore}</Badge>
        </button>
      ))}
    </div>
  );
}

function ProductCompareSlot({
  slot,
  product,
  query,
  otherProduct,
  inputRef,
  onQueryChange,
  onSelect,
  onRemove,
  onActivate,
}: {
  slot: CompareSlotId;
  product: CompareHomeProduct | null;
  query: string;
  otherProduct: CompareHomeProduct | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (value: string) => void;
  onSelect: (product: CompareHomeProduct) => void;
  onRemove: () => void;
  onActivate: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const suggestions = useMemo(() => getSuggestions(query, [otherProduct]), [otherProduct, query]);
  const isA = slot === "A";

  if (product) {
    return (
      <div className="flex min-h-[13.25rem] flex-col justify-between rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-black uppercase text-[var(--isitabuy-orange)]">Product {slot}</p>
            <h3 className="mt-1 text-lg font-black leading-tight text-[var(--isitabuy-ink)]">{product.name}</h3>
            <p className="mt-1 text-xs font-semibold text-[var(--isitabuy-muted)]">{product.category}</p>
          </div>
          <ProductArtwork product={product} />
        </div>
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center">
            <span>
              <span className="block text-[0.65rem] font-bold text-[var(--isitabuy-muted)]">Rating</span>
              <span className="mt-1 flex items-center justify-center gap-1 text-sm font-black text-[var(--isitabuy-ink)]">
                <Star className="size-3.5 fill-[var(--isitabuy-orange)] text-[var(--isitabuy-orange)]" aria-hidden="true" />
                {product.rating.toFixed(1)}
              </span>
            </span>
            <span>
              <span className="block text-[0.65rem] font-bold text-[var(--isitabuy-muted)]">Price</span>
              <span className="font-numeric mt-1 block text-sm font-black text-[var(--isitabuy-ink)]">{formatPrice(product.price)}</span>
            </span>
            <span>
              <span className="block text-[0.65rem] font-bold text-[var(--isitabuy-muted)]">AI Score</span>
              <span className="font-numeric mt-1 block text-sm font-black text-[var(--isitabuy-green)]">{product.aiBuyScore}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-9 rounded-full text-xs font-black"
              onClick={() => {
                onRemove();
                onActivate();
                window.setTimeout(() => inputRef.current?.focus(), 0);
              }}
            >
              Change
            </Button>
            <Button variant="ghost" className="h-9 rounded-full text-xs font-black text-red-600 hover:bg-red-50 hover:text-red-700" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[13.25rem] rounded-2xl border border-dashed border-[var(--isitabuy-line)] bg-[linear-gradient(135deg,#fff,#fbfcff)] p-4">
      <p className="text-[0.7rem] font-black uppercase text-[var(--isitabuy-orange)]">Product {slot}</p>
      <h3 className="mt-2 text-sm font-black leading-5 text-[var(--isitabuy-ink)] sm:text-base">
        {isA ? "Search product, paste link, or scan barcode" : "Search product, paste link, or let AI choose"}
      </h3>
      <p className="mt-2 text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">
        {isA ? "Start with the item you are considering." : "Add a competitor or ask IsItABuy to find one."}
      </p>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--isitabuy-muted)]" aria-hidden="true" />
        <Input
          ref={inputRef}
          value={query}
          onFocus={() => {
            setFocused(true);
            onActivate();
          }}
          onBlur={() => setFocused(false)}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && suggestions[0]) {
              event.preventDefault();
              onSelect(suggestions[0]);
            }
          }}
          placeholder={isA ? "Search or paste first product..." : "Search or paste second product..."}
          className="h-11 rounded-xl border-[var(--isitabuy-line)] bg-white pl-9 text-sm font-semibold shadow-sm focus-visible:ring-[var(--isitabuy-orange)]"
        />
        {focused && query.trim() ? <SuggestionList suggestions={suggestions} onSelect={onSelect} /> : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {compareHomeProducts.slice(0, 2).map((item) => (
          <button
            key={item.id}
            type="button"
            className="rounded-full bg-slate-100 px-3 py-1.5 text-[0.7rem] font-black text-[var(--isitabuy-ink)] transition hover:bg-orange-50 hover:text-[var(--isitabuy-orange)]"
            onClick={() => onSelect(item)}
          >
            {item.name.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

function AiCompareAssistant({
  onDemo,
  onCommission,
}: {
  onDemo: () => void;
  onCommission: () => void;
}) {
  return (
    <Card className="h-full overflow-hidden rounded-[1.5rem] border border-purple-100 bg-[image:var(--isitabuy-violet-panel)] shadow-[var(--isitabuy-card-shadow)]">
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[var(--isitabuy-ink)]">
          <span className="grid size-8 place-items-center rounded-xl bg-white text-[var(--isitabuy-purple)] shadow-sm">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          AI Compare Assistant
        </div>
        <p className="mt-5 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">
          Not sure what to compare? Start with one product and IsItABuy can find the best similar-price option, cheaper pick, premium upgrade, or better-reviewed alternative.
        </p>
        <div className="mt-5 grid gap-3">
          {assistantRows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/82 p-3 shadow-sm">
                <span className={cn("grid size-9 place-items-center rounded-xl", row.tone)}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-black text-[var(--isitabuy-ink)]">{row.label}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-auto pt-5">
          <Button className="h-11 w-full rounded-full bg-[var(--isitabuy-orange)] text-sm font-black text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={onDemo}>
            Try demo comparison
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <button
            type="button"
            onClick={onCommission}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full text-xs font-black text-[var(--isitabuy-purple)] hover:text-violet-700"
          >
            <ShieldCheck className="size-4" aria-hidden="true" />
            Commission-blind recommendations
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeader({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-[0.72rem] font-black uppercase text-[var(--isitabuy-orange)]">{kicker}</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-[var(--isitabuy-ink)]">{title}</h2>
      </div>
      {body ? <p className="max-w-md text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{body}</p> : null}
    </div>
  );
}

export default function CompareHomeClient() {
  const router = useRouter();
  const inputARef = useRef<HTMLInputElement>(null);
  const inputBRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState("all-deals");
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
  const [pasteUrl, setPasteUrl] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [state, setState] = useState({
    productA: null as CompareHomeProduct | null,
    productB: null as CompareHomeProduct | null,
    queryA: "",
    queryB: "",
    activeSlot: "A" as CompareSlotId,
  });

  const selectProduct = (slot: CompareSlotId, product: CompareHomeProduct) => {
    const duplicate = slot === "A" ? state.productB?.id === product.id : state.productA?.id === product.id;
    if (duplicate) {
      showCompareToast("Choose another product", `${product.name} is already selected in the other slot.`);
      return;
    }
    setState((current) => ({
      ...current,
      productA: slot === "A" ? product : current.productA,
      productB: slot === "B" ? product : current.productB,
      queryA: slot === "A" ? "" : current.queryA,
      queryB: slot === "B" ? "" : current.queryB,
      activeSlot: slot === "A" ? "B" : "A",
    }));
    showCompareToast("Product selected", `${product.name} added as Product ${slot}.`);
  };

  const removeProduct = (slot: CompareSlotId) => {
    setState((current) => ({
      ...current,
      productA: slot === "A" ? null : current.productA,
      productB: slot === "B" ? null : current.productB,
      activeSlot: slot,
    }));
  };

  const loadSonyBose = (message: string) => {
    const sony = getProduct("sony-wh-1000xm5");
    const bose = getProduct("bose-quietcomfort-ultra");
    if (!sony || !bose) return;
    setState((current) => ({ ...current, productA: sony, productB: bose, queryA: "", queryB: "", activeSlot: "A" }));
    showCompareToast(message, "Sony WH-1000XM5 vs Bose QuietComfort Ultra is ready.");
  };

  const compareNow = () => {
    if (!state.productA || !state.productB) {
      showCompareToast("Choose two products to compare.", "Add Product A and Product B before opening the comparison.");
      return;
    }
    router.push(`/compare/${state.productA.slug}-vs-${state.productB.slug}`);
  };

  const findAlternative = () => {
    if (!state.productA) {
      showCompareToast("Choose a product first.", "Add Product A before asking IsItABuy for an alternative.");
      inputARef.current?.focus();
      return;
    }
    const alternativeMap: Record<string, string> = {
      "sony-wh-1000xm5": "bose-quietcomfort-ultra",
      "apple-airpods-max": "sony-wh-1000xm5",
      "sennheiser-momentum-4": "bose-quietcomfort-ultra",
      "bose-quietcomfort-ultra": "sennheiser-momentum-4",
    };
    const alternative = getProduct(alternativeMap[state.productA.id] ?? "bose-quietcomfort-ultra");
    if (alternative) {
      selectProduct("B", alternative);
      showCompareToast("Better alternative found.", `${alternative.name} added as Product B.`);
    }
  };

  const swapProducts = () => {
    if (!state.productA || !state.productB) {
      showCompareToast("Choose two products to swap.", "Add Product A and Product B before swapping.");
      return;
    }
    setState((current) => ({ ...current, productA: current.productB, productB: current.productA }));
    showCompareToast("Products swapped.", "Product A and Product B switched places.");
  };

  const clearProducts = () => {
    setState((current) => ({ ...current, productA: null, productB: null, queryA: "", queryB: "", activeSlot: "A" }));
    showCompareToast("Comparison cleared.", "Both product slots are empty.");
  };

  const handlePasteLink = () => {
    const normalized = pasteUrl.toLowerCase();
    if (normalized.includes("sony")) {
      const product = getProduct("sony-wh-1000xm5");
      if (product) selectProduct(state.activeSlot, product);
      setActiveDialog(null);
      return;
    }
    if (normalized.includes("bose")) {
      const product = getProduct("bose-quietcomfort-ultra");
      if (product) selectProduct(state.activeSlot, product);
      setActiveDialog(null);
      return;
    }
    showCompareToast("Product link saved. Backend resolver will handle this later.", "For now, Sony and Bose demo URLs resolve locally.");
    setActiveDialog(null);
  };

  const loadTrending = (productAId: string, productBId: string, message = "Trending comparison loaded.") => {
    const productA = getProduct(productAId);
    const productB = getProduct(productBId);
    if (!productA || !productB) return;
    setState((current) => ({ ...current, productA, productB, queryA: "", queryB: "", activeSlot: "A" }));
    showCompareToast(message, `${productA.name} vs ${productB.name} is ready.`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--compare-page)] text-[var(--isitabuy-ink)]">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={(categoryId, label) => {
          setActiveCategory(categoryId);
          showCompareToast(`${label} selected`, "Category filtering is ready for the mock compare home.");
        }}
      />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--isitabuy-line)] bg-[var(--isitabuy-page)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[image:var(--isitabuy-hero-glow)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-[92.5rem] px-4 pb-8 pt-7 lg:px-8 lg:pb-10 lg:pt-9">
            <div className="mb-6 max-w-5xl">
              <h1 className="font-heading text-[2rem] font-extrabold leading-[1.05] tracking-normal text-[var(--isitabuy-ink)] sm:text-[clamp(2.15rem,4.1vw,3.65rem)]">
                <span className="block sm:inline">Compare products </span>
                <span className="block sm:inline">before you <span className="text-[var(--isitabuy-orange)]">buy</span></span>
              </h1>
              <p className="mt-4 max-w-[21rem] text-sm font-semibold leading-6 text-[var(--isitabuy-muted)] sm:max-w-3xl sm:text-base sm:leading-7 lg:text-lg">
                Search, paste a link, or let IsItABuy find the better option. Compare price, reviews, specs, trust, and AI Buy Score side by side.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.52fr)_minmax(22rem,0.78fr)]">
              <Card className="overflow-visible rounded-[1.75rem] border border-[var(--isitabuy-line)] bg-white/96 shadow-[var(--isitabuy-card-shadow)] backdrop-blur">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-black uppercase text-[var(--isitabuy-orange)]">Start your comparison</p>
                      <h2 className="mt-1 text-2xl font-black text-[var(--isitabuy-ink)]">Choose two products</h2>
                    </div>
                    <Badge className="w-fit border-0 bg-[var(--isitabuy-green-soft)] px-3 py-1 text-xs font-black text-emerald-700">
                      AI Buy Score ready
                    </Badge>
                  </div>

                  <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_3.25rem_minmax(0,1fr)]">
                    <ProductCompareSlot
                      slot="A"
                      product={state.productA}
                      query={state.queryA}
                      otherProduct={state.productB}
                      inputRef={inputARef}
                      onQueryChange={(value) => setState((current) => ({ ...current, queryA: value, activeSlot: "A" }))}
                      onSelect={(product) => selectProduct("A", product)}
                      onRemove={() => removeProduct("A")}
                      onActivate={() => setState((current) => ({ ...current, activeSlot: "A" }))}
                    />
                    <div className="flex items-center justify-center">
                      <span className="grid size-12 place-items-center rounded-full border border-[var(--isitabuy-line)] bg-white text-sm font-black text-[var(--isitabuy-purple)] shadow-sm lg:size-14">
                        VS
                      </span>
                    </div>
                    <ProductCompareSlot
                      slot="B"
                      product={state.productB}
                      query={state.queryB}
                      otherProduct={state.productA}
                      inputRef={inputBRef}
                      onQueryChange={(value) => setState((current) => ({ ...current, queryB: value, activeSlot: "B" }))}
                      onSelect={(product) => selectProduct("B", product)}
                      onRemove={() => removeProduct("B")}
                      onActivate={() => setState((current) => ({ ...current, activeSlot: "B" }))}
                    />
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto]">
                    <Button className="h-11 rounded-full bg-[var(--isitabuy-orange)] text-sm font-black text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={compareNow}>
                      Compare Now
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button variant="outline" className="h-11 rounded-full text-sm font-black" onClick={findAlternative}>
                      Find Better Alternative
                    </Button>
                    <Button variant="ghost" className="h-11 rounded-full px-5 text-sm font-black" onClick={swapProducts}>
                      Swap
                    </Button>
                    <Button variant="ghost" className="h-11 rounded-full px-5 text-sm font-black text-red-600 hover:bg-red-50 hover:text-red-700" onClick={clearProducts}>
                      Clear
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { label: "Paste Link", icon: LinkIcon, action: () => setActiveDialog("paste") },
                      { label: "Scan Barcode", icon: Camera, action: () => setActiveDialog("scan") },
                      { label: "Upload Image", icon: Upload, action: () => setActiveDialog("upload") },
                      { label: "Use Trending Comparison", icon: Sparkles, action: () => loadSonyBose("Trending comparison loaded.") },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={item.action}
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--isitabuy-line)] bg-white px-3 py-2 text-xs font-black text-[var(--isitabuy-ink)] shadow-sm transition hover:-translate-y-px hover:border-orange-200 hover:text-[var(--isitabuy-orange)]"
                        >
                          <Icon className="size-3.5" aria-hidden="true" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <AiCompareAssistant
                onDemo={() => loadSonyBose("Demo comparison ready.")}
                onCommission={() => setActiveDialog("commission")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[92.5rem] px-4 py-10 lg:px-8">
          <SectionHeader kicker="Popular categories" title="Compare by shopping category" body="Start from a category and IsItABuy will rank products by value, trust, and deal quality." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Headphones", "Laptops", "Phones", "Kitchen", "Gaming", "Beauty", "Home", "Fitness"].map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--isitabuy-card-shadow)]"
                onClick={() => showCompareToast(`${category} comparisons`, "Category comparison templates will be connected next.")}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-orange-100 text-[var(--isitabuy-orange)]">
                  <ShoppingBag className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-4 block text-sm font-black text-[var(--isitabuy-ink)]">{category}</span>
                <span className="mt-1 block text-xs font-semibold text-[var(--isitabuy-muted)]">Find similar products fast</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[92.5rem] px-4 pb-10 lg:px-8">
          <SectionHeader kicker="Trending comparisons" title="Popular side-by-side checks" />
          <div className="grid gap-4 lg:grid-cols-3">
            {trendingComparisons.map((item) => {
              const productA = getProduct(item.productA);
              const productB = getProduct(item.productB);
              if (!productA || !productB) return null;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--isitabuy-card-shadow)]"
                  onClick={() => loadTrending(productA.id, productB.id)}
                >
                  <span className="text-sm font-black text-[var(--isitabuy-ink)]">{item.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-[var(--isitabuy-muted)]">{item.note}</span>
                  <span className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <span className="truncate rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-black">{productA.name}</span>
                    <span className="text-[0.65rem] font-black text-[var(--isitabuy-purple)]">VS</span>
                    <span className="truncate rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-black">{productB.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[92.5rem] px-4 pb-10 lg:px-8">
          <div className="grid gap-5 rounded-[1.5rem] border border-[var(--isitabuy-line)] bg-[image:var(--isitabuy-warm-strip)] p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase text-[var(--isitabuy-orange)]">Start with one product</p>
              <h2 className="mt-1 text-2xl font-black text-[var(--isitabuy-ink)]">Already have a product in mind?</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">
                Add one product and IsItABuy can suggest similar-price, cheaper, premium, or better-reviewed alternatives.
              </p>
            </div>
            <Button className="h-11 rounded-full bg-[var(--isitabuy-orange)] px-5 text-sm font-black text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={findAlternative}>
              Find an alternative
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-[92.5rem] px-4 pb-10 lg:px-8">
          <SectionHeader kicker="Recent comparisons" title="Continue from recent shopper checks" />
          <div className="grid gap-3 md:grid-cols-3">
            {trendingComparisons.map((item) => (
              <button
                key={`recent-${item.id}`}
                type="button"
                className="rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 text-left text-sm font-black shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--isitabuy-card-shadow)]"
                onClick={() => loadTrending(item.productA, item.productB, "Recent comparison loaded.")}
              >
                {item.title}
                <span className="mt-2 block text-xs font-semibold text-[var(--isitabuy-muted)]">Updated with mock prices today</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[92.5rem] px-4 pb-10 lg:px-8">
          <SectionHeader kicker="How IsItABuy compares" title="From product input to Buy / Wait / Avoid" body="This section sits after the hero so shoppers can start first, then understand the scoring system." />
          <div className="grid gap-3 md:grid-cols-4">
            {[
              "Read price and retailer availability",
              "Check review trust and sentiment",
              "Compare specs and tradeoffs",
              "Generate the AI Buy Score",
            ].map((step, index) => (
              <div key={step} className="rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 shadow-sm">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--isitabuy-green-soft)] text-sm font-black text-emerald-700">{index + 1}</span>
                <h3 className="mt-4 text-sm font-black text-[var(--isitabuy-ink)]">{step}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[92.5rem] px-4 pb-12 lg:px-8">
          <div className="grid gap-4 rounded-[1.5rem] border border-[var(--isitabuy-line)] bg-white p-5 shadow-sm md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Commission-blind", body: "Affiliate commission does not change scores." },
              { icon: CheckCircle2, title: "Review trust", body: "Signals include source quality and sentiment." },
              { icon: Bell, title: "Always updated", body: "Designed for fresh prices and availability." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-purple-100 text-[var(--isitabuy-purple)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-[var(--isitabuy-ink)]">{item.title}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">{item.body}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Dialog open={activeDialog === "paste"} onOpenChange={(open) => setActiveDialog(open ? "paste" : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paste product link</DialogTitle>
            <DialogDescription>Paste a mock product URL. URLs containing Sony or Bose resolve in this prototype.</DialogDescription>
          </DialogHeader>
          <Input value={pasteUrl} onChange={(event) => setPasteUrl(event.target.value)} placeholder="https://store.example.com/sony-wh-1000xm5" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveDialog(null)}>Cancel</Button>
            <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={handlePasteLink}>Use link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "scan"} onOpenChange={(open) => setActiveDialog(open ? "scan" : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan barcode</DialogTitle>
            <DialogDescription>Demo scanner mode. Use the demo barcode to select Sony WH-1000XM5.</DialogDescription>
          </DialogHeader>
          <div className="grid min-h-44 place-items-center rounded-2xl border border-dashed border-[var(--isitabuy-line)] bg-slate-50">
            <Camera className="size-10 text-[var(--isitabuy-orange)]" aria-hidden="true" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveDialog(null)}>Close</Button>
            <Button
              className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]"
              onClick={() => {
                const product = getProduct("sony-wh-1000xm5");
                if (product) selectProduct(state.activeSlot, product);
                setActiveDialog(null);
              }}
            >
              Use demo barcode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "upload"} onOpenChange={(open) => setActiveDialog(open ? "upload" : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload product image</DialogTitle>
            <DialogDescription>Upload is mocked for now. The demo image result selects Bose QuietComfort Ultra.</DialogDescription>
          </DialogHeader>
          <Input
            type="file"
            onChange={(event) => setUploadedFileName(event.target.files?.[0]?.name ?? "")}
            aria-label="Upload product image"
          />
          {uploadedFileName ? <p className="text-xs font-semibold text-[var(--isitabuy-muted)]">Selected: {uploadedFileName}</p> : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveDialog(null)}>Close</Button>
            <Button
              className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]"
              onClick={() => {
                const product = getProduct("bose-quietcomfort-ultra");
                if (product) selectProduct(state.activeSlot, product);
                setActiveDialog(null);
              }}
            >
              Use demo image result
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "commission"} onOpenChange={(open) => setActiveDialog(open ? "commission" : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Commission-blind recommendations</DialogTitle>
            <DialogDescription>
              IsItABuy compares products using price, review trust, value, specs, availability, and AI analysis. Affiliate commission does not affect scores or recommendations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  );
}
