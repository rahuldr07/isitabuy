"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Copy,
  Dumbbell,
  ExternalLink,
  GraduationCap,
  Heart,
  Home,
  Info,
  Luggage,
  Music,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trophy,
  User,
  X,
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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const MotionButton = motion.create(Button);
const MotionCard = motion.create(Card);
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const pageVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.16 } },
};

const navItems = ["All Deals", "Electronics", "Home", "Beauty", "Fashion", "Kitchen", "Gaming", "Sports", "Automotive", "Office"];

interface Product {
  id: "sony" | "bose";
  label: "Product A" | "Product B";
  labelClassName: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  rating: string;
  reviews: string;
  trust: string;
  tags: string[];
  currentPrice: string;
  listPrice: string;
  discount: string;
}

const products: Product[] = [
  {
    id: "sony",
    label: "Product A",
    labelClassName: "bg-[var(--compare-lavender)] text-[var(--compare-purple)]",
    name: "Sony WH-1000XM5",
    subtitle: "Wireless Noise Cancelling Headphones",
    imageSrc: "/compare/sony-wh-1000xm5-black.png",
    imageAlt: "Sony WH-1000XM5 headphones",
    rating: "4.6",
    reviews: "(12,842 reviews)",
    trust: "High review trust",
    tags: ["Noise Cancelling", "30H Battery", "Comfort Fit", "Bluetooth 5.2"],
    currentPrice: "$299.99",
    listPrice: "$389.99",
    discount: "23% off",
  },
  {
    id: "bose",
    label: "Product B",
    labelClassName: "bg-[var(--compare-blue-soft)] text-[var(--compare-blue)]",
    name: "Bose QuietComfort Ultra",
    subtitle: "Wireless Noise Cancelling Headphones",
    imageSrc: "/compare/bose-qc-ultra-black.png",
    imageAlt: "Bose QuietComfort Ultra headphones",
    rating: "4.7",
    reviews: "(8,215 reviews)",
    trust: "High review trust",
    tags: ["Noise Cancelling", "24H Battery", "Premium Comfort", "Bluetooth 5.3"],
    currentPrice: "$279.00",
    listPrice: "$319.00",
    discount: "12% off",
  },
];

const scoreRows = [
  { feature: "AI Buy Score", sony: "76", bose: "84", winner: "Bose", icon: BadgeCheck },
  { feature: "Price Score", sony: "62", bose: "78", winner: "Bose", icon: BadgeCheck },
  { feature: "Review Trust", sony: "High", bose: "High", winner: "Tie", icon: ShieldCheck },
  { feature: "Performance (ANC)", sony: "85", bose: "87", winner: "Bose", icon: CircleHelp },
  { feature: "Comfort", sony: "68", bose: "90", winner: "Bose", icon: User },
  { feature: "Battery Life", sony: "80", bose: "72", winner: "Sony", icon: BriefcaseBusiness },
  { feature: "Features", sony: "70", bose: "75", winner: "Bose", icon: ShoppingBag },
  { feature: "Best For", sony: "ANC", bose: "Comfort", winner: "Bose", icon: ShieldCheck },
];

const productPros = [
  {
    title: "Sony WH-1000XM5",
    pros: ["Excellent noise cancellation", "Great battery life (30 hours)", "Lightweight and comfortable", "Multipoint connection"],
    cons: ["Call quality could be better", "Foldable design is bulky", "Touch controls can be finicky"],
  },
  {
    title: "Bose QuietComfort Ultra",
    pros: ["Superior comfort for long use", "Better call quality", "More natural sound profile", "Premium build quality"],
    cons: ["Slightly shorter battery life", "No LDAC codec support", "Less app customization"],
  },
];

const bestForRows = [
  { icon: Luggage, user: "Frequent Travelers", sony: "Best ANC performance", bose: "More comfortable for long flights" },
  { icon: BriefcaseBusiness, user: "Office / Calls", sony: "Good", bose: "Better call quality" },
  { icon: Music, user: "Music Lovers", sony: "More detailed sound", bose: "Well-balanced sound" },
  { icon: GraduationCap, user: "Students", sony: "Better battery life", bose: "Better comfort for study" },
  { icon: Dumbbell, user: "Workout / On-the-go", sony: "Lightweight", bose: "Secure and comfortable fit" },
];

const priceRows = [
  { label: "Current Price", sony: "$299.99", bose: "$279.00", boseStrong: true },
  { label: "List Price", sony: "$389.99", bose: "$319.00" },
  { label: "You Save", sony: "$90.00 (23%)", bose: "$40.00 (12%)" },
  { label: "90-Day Low", sony: "$279.99", bose: "$249.00", boseStrong: true },
  { label: "Price Trend", sony: "8%  (last 30 days)", bose: "5%  (last 30 days)", trend: true },
];

const offers = [
  { retailer: "Amazon", mark: "amazon", sony: "$299.99", sonyDeal: "23% off", bose: "$279.00", boseDeal: "12% off" },
  { retailer: "Best Buy", mark: "bestbuy", sony: "$329.99", sonyDeal: "", bose: "$279.99", boseDeal: "" },
  { retailer: "Walmart", mark: "walmart", sony: "$319.00", sonyDeal: "", bose: "$279.00", boseDeal: "" },
  { retailer: "Target", mark: "target", sony: "$329.99", sonyDeal: "", bose: "$279.99", boseDeal: "" },
];

const extendedOffers = [
  ...offers,
  { retailer: "Costco", mark: "amazon", sony: "$307.99", sonyDeal: "Member", bose: "$284.00", boseDeal: "" },
  { retailer: "B&H", mark: "bestbuy", sony: "$298.00", sonyDeal: "24% off", bose: "$289.00", boseDeal: "9% off" },
  { retailer: "Newegg", mark: "walmart", sony: "$309.00", sonyDeal: "", bose: "$281.99", boseDeal: "" },
  { retailer: "Sam's Club", mark: "target", sony: "$315.00", sonyDeal: "", bose: "$286.00", boseDeal: "" },
  { retailer: "eBay", mark: "amazon", sony: "$289.99", sonyDeal: "Open box", bose: "$268.00", boseDeal: "Deal" },
  { retailer: "Adorama", mark: "bestbuy", sony: "$299.00", sonyDeal: "", bose: "$279.95", boseDeal: "" },
  { retailer: "Crutchfield", mark: "walmart", sony: "$329.99", sonyDeal: "", bose: "$299.00", boseDeal: "" },
  { retailer: "Bose Store", mark: "target", sony: "$319.99", sonyDeal: "", bose: "$279.00", boseDeal: "12% off" },
];

const pickerProducts = [
  { name: "Apple AirPods Max", detail: "$449.00 · Spatial audio · Premium build" },
  { name: "Sennheiser Momentum 4", detail: "$249.95 · 60H battery · Strong value" },
  { name: "Beats Studio Pro", detail: "$199.99 · Apple ecosystem · Lightweight" },
];

type OfferSelection = {
  retailer: string;
  product: string;
  price: string;
  deal: string;
} | null;

function Panel({
  children,
  className,
  delay = 0,
  reveal = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reveal?: boolean;
}) {
  return (
    <MotionCard
      variants={itemVariants}
      transition={{ delay }}
      className={cn("min-w-0 gap-0 rounded-lg border border-[var(--compare-line)] bg-white py-0 shadow-[var(--compare-card-shadow)]", reveal && "compare-reveal", className)}
    >
      {children}
    </MotionCard>
  );
}

function Logo() {
  return (
    <NextLink href="/" className="flex items-center gap-3" aria-label="IsItABuy home">
      <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-sm [&_svg]:size-5">
        <ShoppingBag aria-hidden="true" />
      </span>
      <span className="text-2xl font-black leading-none text-[var(--compare-ink)] tracking-tight">IsItABuy</span>
    </NextLink>
  );
}

function AppHeader({
  query,
  error,
  onQueryChange,
  onSearch,
}: {
  query: string;
  error: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--compare-line)] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-[91.375rem] items-center gap-6 px-4 max-[1500px]:px-8">
        <Logo />
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="relative w-full max-w-[30rem]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--compare-muted)]" aria-hidden="true" />
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
              aria-invalid={error ? true : undefined}
              className={cn(
                "h-[2.35rem] rounded-md border-[var(--compare-line)] bg-white pl-11 text-xs font-semibold shadow-[var(--compare-input-shadow)] placeholder:text-[var(--compare-muted)]",
                error && "border-[var(--compare-red)]"
              )}
            />
            {error ? <p className="absolute left-0 top-[2.65rem] text-[0.68rem] font-bold text-[var(--compare-red)]">{error}</p> : null}
          </div>
        </div>
        <MotionButton
          className="hidden h-[2.35rem] rounded-md bg-[var(--compare-orange)] px-5 text-xs font-black text-white hover:bg-[var(--compare-orange-dark)] md:inline-flex"
          onClick={onSearch}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          Search deals
        </MotionButton>
        <div className="hidden ml-auto items-center gap-4 sm:flex">
          <MotionButton variant="ghost" className="h-9 gap-2 text-sm font-black" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Heart aria-hidden="true" />
            <span className="hidden sm:inline">Saved</span>
          </MotionButton>
          <Avatar size="lg" className="bg-[var(--compare-soft)]">
            <AvatarFallback className="bg-[var(--compare-soft)] text-[var(--compare-ink)]">
              <User aria-hidden="true" />
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="text-[var(--compare-ink)]" aria-hidden="true" />
        </div>
      </div>
      <nav className="mx-auto flex h-11 max-w-[91.375rem] items-center justify-between overflow-x-auto px-3 text-xs font-black text-[var(--compare-ink)] max-[1500px]:px-8" aria-label="Deal categories">
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href="#"
            className={cn(
              "flex h-full shrink-0 items-center border-b-2 border-transparent",
              index === 0 && "border-[var(--compare-orange)] text-[var(--compare-orange)]"
            )}
            whileHover={{ y: -1, color: "var(--compare-orange)" }}
            whileTap={{ scale: 0.98 }}
          >
            {item}
          </motion.a>
        ))}
        <motion.a href="#" className="flex h-full shrink-0 items-center gap-2" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          More
          <ChevronDown aria-hidden="true" />
        </motion.a>
      </nav>
    </header>
  );
}

function BreadcrumbAndActions({
  saved,
  onShare,
  onSave,
  onEdit,
}: {
  saved: boolean;
  onShare: () => void;
  onSave: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-[91.375rem] flex-col gap-4 px-0 py-3 max-[1500px]:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-3 text-xs font-bold text-[var(--compare-muted)]">
        <Home className="shrink-0 text-[var(--compare-ink)]" aria-hidden="true" />
        <ChevronRight className="shrink-0" aria-hidden="true" />
        <span className="truncate text-[var(--compare-ink)]">Compare</span>
        <ChevronRight className="shrink-0" aria-hidden="true" />
        <span className="truncate text-[var(--compare-ink)]">Sony WH-1000XM5 vs Bose QuietComfort Ultra</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ActionButton icon={Share2} onClick={onShare}>Share</ActionButton>
        <ActionButton icon={saved ? Check : Bookmark} onClick={onSave}>{saved ? "Saved" : "Save Comparison"}</ActionButton>
        <ActionButton icon={Pencil} onClick={onEdit}>Edit Comparison</ActionButton>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, children, onClick }: { icon: LucideIcon; children: React.ReactNode; onClick?: () => void }) {
  return (
    <MotionButton
      variant="outline"
      className="h-8 rounded-md border-[var(--compare-line)] bg-white px-4 text-xs font-black shadow-none"
      onClick={onClick}
      whileHover={{ y: -1, boxShadow: "var(--compare-hover-shadow)" }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon data-icon="inline-start" aria-hidden="true" />
      {children}
    </MotionButton>
  );
}

function ProductSummaryCard({ product, onRemove }: { product: Product; onRemove: (id: Product["id"]) => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <Panel className="min-h-[15.75rem]">
      <CardContent className="relative grid h-full grid-cols-[32%_minmax(0,1fr)] gap-3 p-3.5 max-sm:grid-cols-1">
        <button type="button" className="absolute right-4 top-4 text-[var(--compare-ink)] [&_svg]:size-4" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)}>
          <X aria-hidden="true" />
        </button>
        <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-md bg-white">
          {failed ? (
            <div className="grid size-full min-h-36 place-items-center rounded-md bg-[var(--compare-soft)]">
              <ShoppingBag className="text-[var(--compare-muted)]" aria-hidden="true" />
            </div>
          ) : (
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              width={230}
              height={178}
              className={cn(
                "max-h-36 w-full object-contain drop-shadow-sm",
                product.id === "bose" ? "scale-[1.18]" : "scale-[1.28]"
              )}
              onError={() => setFailed(true)}
              priority
            />
          )}
        </div>
        <div className="min-w-0 pr-3">
          <Badge className={cn("h-5 rounded-md border-0 px-2 text-[0.62rem] font-black uppercase", product.labelClassName)}>
            {product.label}
          </Badge>
          <h2 className="mt-1 text-[0.95rem] font-black leading-tight tracking-tight text-[var(--compare-ink)]">{product.name}</h2>
          <p className="mt-0.5 text-[0.72rem] font-semibold leading-4 text-[var(--compare-muted)]">{product.subtitle}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.66rem] font-bold">
            <span className="inline-flex items-center gap-1 text-[var(--compare-orange)]">
              <Star className="fill-current" aria-hidden="true" />
              {product.rating}
            </span>
            <span className="text-[var(--compare-muted)]">{product.reviews}</span>
            <Badge className="h-5 rounded-md border-0 bg-[var(--compare-green-soft)] text-[0.62rem] text-[var(--compare-green-dark)]">
              <ShieldCheck data-icon="inline-start" aria-hidden="true" />
              {product.trust}
            </Badge>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="h-5 rounded-md bg-[var(--compare-soft)] px-2 text-[0.6rem] font-bold text-[var(--compare-ink)]">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-2.5">
            <p className="text-[0.66rem] font-semibold text-[var(--compare-muted)]">Current price (Amazon)</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-3">
              <strong className="font-numeric text-[1.05rem] font-black leading-none text-[var(--compare-ink)]">{product.currentPrice}</strong>
              <Badge className="h-5 border-0 bg-[var(--compare-green-soft)] text-[0.65rem] font-black text-[var(--compare-green-dark)]">
                {product.discount}
              </Badge>
            </div>
            <p className="mt-0.5 text-[0.66rem] font-semibold text-[var(--compare-muted)]">
              List price: <span className="line-through">{product.listPrice}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Panel>
  );
}

function EmptyProductCard({ label, onUndo }: { label: Product["label"]; onUndo: () => void }) {
  return (
    <Panel className="min-h-[15.75rem]">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
        <div className="grid size-12 place-items-center rounded-full bg-[var(--compare-soft)] text-[var(--compare-muted)]">
          <ShoppingBag aria-hidden="true" />
        </div>
        <div>
          <Badge className="h-5 rounded-md border-0 bg-[var(--compare-soft)] px-2 text-[0.62rem] font-black uppercase text-[var(--compare-muted)]">
            {label}
          </Badge>
          <p className="mt-3 text-sm font-black text-[var(--compare-ink)]">Product removed</p>
          <p className="mt-1 text-xs font-semibold text-[var(--compare-muted)]">Restore it to continue the comparison.</p>
        </div>
        <MotionButton variant="outline" className="h-8 text-xs font-black text-[var(--compare-purple)]" onClick={onUndo} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          <RotateCcw data-icon="inline-start" aria-hidden="true" />
          Undo
        </MotionButton>
      </CardContent>
    </Panel>
  );
}

function ComparisonIntro({ onAdd }: { onAdd: () => void }) {
  return (
    <Panel className="min-h-[15.75rem]">
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div>
          <h2 className="text-xs font-black uppercase text-[var(--compare-ink)]">Your Comparison</h2>
          <p className="mt-6 text-xs font-black text-[var(--compare-ink)]">Comparing 2 products</p>
          <p className="mt-2 text-xs font-semibold text-[var(--compare-ink)]">Side-by-side analysis</p>
        </div>
        <MotionButton
          variant="outline"
          className="h-8 w-full justify-start gap-1 rounded-md border-[var(--compare-line)] bg-white px-1.5 text-[0.58rem] font-black text-[var(--compare-purple)] shadow-none [&_svg]:size-3.5"
          onClick={onAdd}
          whileHover={{ y: -1, boxShadow: "var(--compare-hover-shadow)" }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus data-icon="inline-start" aria-hidden="true" />
          Add Another Product
        </MotionButton>
      </CardContent>
    </Panel>
  );
}

function VsBadge() {
  return (
    <motion.div
      className="absolute -left-[7px] top-[5rem] z-10 hidden size-14 -translate-x-1/2 place-items-center rounded-full border border-[var(--compare-line)] bg-white text-base font-black text-[var(--compare-ink)] shadow-[var(--compare-hover-shadow)] min-[1180px]:grid"
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.28, duration: 0.38, ease: "easeOut" }}
    >
      VS
    </motion.div>
  );
}

function RecommendationPanel({
  className,
  visible,
  onDismiss,
  onRestore,
}: {
  className?: string;
  visible: boolean;
  onDismiss: () => void;
  onRestore: () => void;
}) {
  if (!visible) {
    return (
      <Panel className={cn("min-h-[15.75rem]", className)}>
        <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
          <Star className="fill-[var(--compare-purple)] text-[var(--compare-purple)]" aria-hidden="true" />
          <div>
            <p className="text-sm font-black text-[var(--compare-ink)]">AI recommendation hidden</p>
            <p className="mt-1 text-xs font-semibold text-[var(--compare-muted)]">Restore the verdict panel anytime.</p>
          </div>
          <MotionButton variant="outline" className="h-8 text-xs font-black text-[var(--compare-purple)]" onClick={onRestore} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Restore
          </MotionButton>
        </CardContent>
      </Panel>
    );
  }

  return (
    <Panel className={cn("min-h-[15.75rem]", className)}>
      <CardContent className="relative p-3.5">
        <button type="button" className="absolute right-4 top-4 text-[var(--compare-line)] [&_svg]:size-4" aria-label="Dismiss recommendation" onClick={onDismiss}>
          <X aria-hidden="true" />
        </button>
        <p className="flex items-center gap-2 text-xs font-black uppercase text-[var(--compare-ink)]">
          <Star className="fill-[var(--compare-purple)] text-[var(--compare-purple)]" aria-hidden="true" />
          AI Recommendation
        </p>
        <h2 className="mt-2.5 max-w-md text-[1.02rem] font-black leading-tight text-[var(--compare-purple)]">
          Bose QuietComfort Ultra is the better choice for most users.
        </h2>
        <p className="mt-1.5 max-w-md text-[0.72rem] font-semibold leading-[1.1rem] text-[var(--compare-muted)]">
          It scores higher in overall value, comfort, and review sentiment while having a similar price.
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold text-[var(--compare-ink)]">
              Confidence
              <CircleHelp className="text-[var(--compare-muted)]" aria-hidden="true" />
            </p>
          </div>
          <ScoreRing value={82} />
          <div className="max-w-36">
            <p className="text-xs font-black text-[var(--compare-ink)]">High</p>
            <p className="mt-0.5 text-[0.68rem] font-semibold leading-4 text-[var(--compare-muted)]">Based on data from 45,000+ sources</p>
          </div>
        </div>
      </CardContent>
    </Panel>
  );
}

function ScoreRing({ value }: { value: number }) {
  const prefersReducedMotion = useReducedMotion();
  const circumference = 2 * Math.PI * 34;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative grid size-18 shrink-0 place-items-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="48" r="34" fill="none" stroke="var(--compare-soft)" strokeWidth="8" />
        <motion.circle
          cx="48"
          cy="48"
          r="34"
          fill="none"
          stroke="url(#confidenceGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={prefersReducedMotion ? false : { strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="confidenceGradient" x1="20" x2="80" y1="20" y2="80">
            <stop stopColor="var(--compare-purple)" />
            <stop offset="1" stopColor="var(--compare-blue)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-numeric text-xl font-black text-[var(--compare-ink)]">{value}%</span>
    </div>
  );
}

function ScoreComparison() {
  return (
    <Panel reveal className="lg:row-span-2">
      <CardHeader className="px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">
          Score Comparison
          <CircleHelp className="text-[var(--compare-muted)]" aria-hidden="true" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {scoreRows.length === 0 ? (
          <EmptyState title="No score data" />
        ) : (
          <Table className="table-fixed text-[0.82rem] [&_td]:whitespace-normal [&_th]:whitespace-normal">
            <TableHeader>
              <TableRow className="border-[var(--compare-line)] hover:bg-transparent">
                <TableHead className="h-9 w-[38%] px-4 text-[0.7rem] font-black text-[var(--compare-ink)]">Feature</TableHead>
                <TableHead className="h-9 w-[22%] text-[0.64rem] font-black text-[var(--compare-ink)]">Sony WH-1000XM5</TableHead>
                <TableHead className="h-9 w-[28%] text-[0.64rem] font-black text-[var(--compare-ink)]">Bose QuietComfort Ultra</TableHead>
                <TableHead className="h-9 w-[12%] text-center text-[0.7rem] font-black text-[var(--compare-ink)]">Winner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreRows.map((row) => {
                const Icon = row.icon;
                return (
                  <TableRow key={row.feature} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                    <TableCell className="px-4 py-2.5">
                      <span className="flex items-center gap-2.5 text-[0.72rem] font-black text-[var(--compare-ink)]">
                        <Icon className="size-4 text-[var(--compare-green)]" aria-hidden="true" />
                        {row.feature}
                      </span>
                    </TableCell>
                    <ScoreCell value={row.sony} />
                    <ScoreCell value={row.bose} accent />
                    <TableCell className="py-2.5 text-center">
                      {row.winner === "Tie" ? (
                        <span className="font-black text-[var(--compare-muted)]">=</span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[0.68rem] font-black text-[var(--compare-orange)]">
                          <Trophy aria-hidden="true" />
                          {row.winner === "Sony" ? "Sony" : ""}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="border-0 bg-[var(--compare-soft-panel)] hover:bg-[var(--compare-soft-panel)]">
                <TableCell className="px-4 py-2.5 text-[0.82rem] font-black text-[var(--compare-ink)]">Verdict</TableCell>
                <TableCell className="py-2.5">
                  <VerdictBadge tone="wait" label="WAIT" caption="Better deals likely" />
                </TableCell>
                <TableCell className="py-2.5">
                  <VerdictBadge tone="buy" label="BUY" caption="Better overall value" />
                </TableCell>
                <TableCell className="py-2.5 text-center text-[var(--compare-orange)]">
                  <Trophy aria-hidden="true" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Panel>
  );
}

function ScoreCell({ value, accent = false }: { value: string; accent?: boolean }) {
  const isNumber = /^\d+$/.test(value);
  const isHigh = value === "High";

  if (isHigh) {
    return (
      <TableCell className="py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-black text-[var(--compare-green)]">
          <ShieldCheck aria-hidden="true" />
          High
        </span>
      </TableCell>
    );
  }

  return (
    <TableCell className="py-2.5">
      <span className={cn("font-numeric text-base font-black", accent ? "text-[var(--compare-blue)]" : "text-[var(--compare-purple)]")}>
        {value}
      </span>
      {isNumber ? <span className="font-numeric ml-1 text-xs font-semibold text-[var(--compare-ink)]">/100</span> : null}
    </TableCell>
  );
}

function VerdictBadge({ tone, label, caption }: { tone: "wait" | "buy"; label: string; caption: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Badge
        className={cn(
          "h-7 rounded-lg border-0 px-3 text-xs font-black",
          tone === "wait" ? "bg-[var(--compare-wait-soft)] text-[var(--compare-orange)]" : "bg-[var(--compare-green-soft)] text-[var(--compare-green-dark)]"
        )}
      >
        <ShieldCheck data-icon="inline-start" aria-hidden="true" />
        {label}
      </Badge>
      <span className="text-[0.64rem] font-bold text-[var(--compare-ink)]">{caption}</span>
    </div>
  );
}

function ProsConsPanel() {
  return (
    <Panel reveal>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">Pros & Cons</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-0 px-0 pb-0 sm:grid-cols-2">
        {productPros.map((item, index) => (
          <div key={item.title} className={cn("px-4 pb-4", index === 1 && "border-l border-[var(--compare-line)]")}>
            <h3 className={cn("mb-3 text-[0.72rem] font-black", index === 0 ? "text-[var(--compare-purple)]" : "text-[var(--compare-blue)]")}>{item.title}</h3>
            <ul className="flex flex-col gap-2">
              {item.pros.map((text) => <Bullet key={text} text={text} positive />)}
              {item.cons.map((text) => <Bullet key={text} text={text} />)}
            </ul>
          </div>
        ))}
      </CardContent>
    </Panel>
  );
}

function Bullet({ text, positive = false }: { text: string; positive?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-[0.72rem] font-semibold leading-[1.05rem] text-[var(--compare-ink)]">
      <span className={cn("mt-0.5 grid size-3.5 shrink-0 place-items-center rounded-full text-white", positive ? "bg-[var(--compare-green)]" : "bg-[var(--compare-red)]")}>
        {positive ? <BadgeCheck aria-hidden="true" /> : <span className="h-0.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span className="line-clamp-2">{text}</span>
    </li>
  );
}

function UserFitPanel() {
  return (
    <Panel reveal>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">Best For Different Users</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table className="table-fixed [&_td]:whitespace-normal [&_th]:whitespace-normal">
          <TableBody>
            {bestForRows.map((row) => {
              const Icon = row.icon;
              return (
                <TableRow key={row.user} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                  <TableCell className="px-4 py-2">
                    <span className="flex items-center gap-2.5 text-[0.72rem] font-bold text-[var(--compare-ink)]">
                      <Icon className="size-4 text-[var(--compare-ink)]" aria-hidden="true" />
                      {row.user}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 text-[0.72rem] font-semibold text-[var(--compare-ink)]">{row.sony}</TableCell>
                  <TableCell className="py-2 text-[0.72rem] font-semibold text-[var(--compare-ink)]">{row.bose}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Panel>
  );
}

function PriceComparison() {
  return (
    <Panel reveal>
      <CardHeader className="px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">
          Price Comparison
          <CircleHelp className="text-[var(--compare-muted)]" aria-hidden="true" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table className="table-fixed [&_td]:whitespace-normal [&_th]:whitespace-normal">
          <TableHeader>
            <TableRow className="border-[var(--compare-line)] hover:bg-transparent">
              <TableHead className="h-8 w-[34%] px-4" />
              <TableHead className="h-8 w-[33%] text-[0.72rem] font-black text-[var(--compare-purple)]">Sony WH-1000XM5</TableHead>
              <TableHead className="h-8 w-[33%] text-[0.72rem] font-black text-[var(--compare-blue)]">Bose QuietComfort Ultra</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceRows.map((row) => (
              <TableRow key={row.label} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                <TableCell className="px-4 py-2 text-[0.72rem] font-bold text-[var(--compare-ink)]">{row.label}</TableCell>
                <TableCell className={cn("font-numeric py-2 text-[0.82rem] font-black text-[var(--compare-ink)]", row.trend && "text-[var(--compare-orange)]")}>
                  {row.trend ? <ArrowUpRight className="mr-1 inline size-3" aria-hidden="true" /> : null}
                  {row.sony}
                </TableCell>
                <TableCell className={cn("font-numeric py-2 text-[0.82rem] font-black", row.boseStrong || row.trend ? "text-[var(--compare-green)]" : "text-[var(--compare-ink)]")}>
                  {row.trend ? <ArrowDownRight className="mr-1 inline size-3" aria-hidden="true" /> : null}
                  {row.bose}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Panel>
  );
}

function RetailerOffers({
  expanded,
  onToggleExpanded,
  onViewDeal,
}: {
  expanded: boolean;
  onToggleExpanded: () => void;
  onViewDeal: (selection: OfferSelection) => void;
}) {
  const visibleOffers = expanded ? extendedOffers : offers;

  return (
    <Panel reveal>
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-[0.82rem] font-black uppercase text-[var(--compare-ink)]">Top Retailer Offers</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-4">
        <Table className="table-fixed [&_td]:whitespace-normal [&_th]:whitespace-normal">
          <TableHeader>
            <TableRow className="border-[var(--compare-line)] hover:bg-transparent">
              <TableHead className="h-8 w-[38%] px-4 text-[0.64rem] font-bold text-[var(--compare-muted)]">Retailer</TableHead>
              <TableHead className="h-8 w-[31%] text-[0.64rem] font-bold text-[var(--compare-muted)]">Sony WH-1000XM5</TableHead>
              <TableHead className="h-8 w-[31%] text-[0.64rem] font-bold text-[var(--compare-muted)]">Bose QuietComfort Ultra</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleOffers.map((offer) => (
              <TableRow key={offer.retailer} className="border-[var(--compare-line)] hover:bg-[var(--compare-soft-panel)]">
                <TableCell className="px-4 py-2">
                  <RetailerMark mark={offer.mark} label={offer.retailer} />
                </TableCell>
                <OfferCell price={offer.sony} deal={offer.sonyDeal} onViewDeal={() => onViewDeal({ retailer: offer.retailer, product: "Sony WH-1000XM5", price: offer.sony, deal: offer.sonyDeal })} />
                <OfferCell price={offer.bose} deal={offer.boseDeal} onViewDeal={() => onViewDeal({ retailer: offer.retailer, product: "Bose QuietComfort Ultra", price: offer.bose, deal: offer.boseDeal })} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <motion.button
          type="button"
          className="mx-auto mt-3 flex w-fit items-center gap-2 text-[0.82rem] font-black text-[var(--compare-purple)]"
          onClick={onToggleExpanded}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          {expanded ? "Show top retailers" : "View all 12 retailers"}
          <ChevronRight aria-hidden="true" />
        </motion.button>
      </CardContent>
    </Panel>
  );
}

function RetailerMark({ mark, label }: { mark: string; label: string }) {
  const src = `/home/logos/${mark}.svg`;

  return (
    <span className="relative block h-6 w-20">
      <Image src={src} alt={`${label} logo`} fill sizes="96px" className="object-contain object-left" />
    </span>
  );
}

function OfferCell({ price, deal, onViewDeal }: { price: string; deal: string; onViewDeal: () => void }) {
  return (
    <TableCell className="py-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-numeric text-[0.82rem] font-black text-[var(--compare-ink)]">{price}</span>
        {deal ? <Badge className="h-5 border-0 bg-[var(--compare-green-soft)] text-[0.6rem] font-black text-[var(--compare-green-dark)]">{deal}</Badge> : null}
        <MotionButton
          variant="outline"
          className="h-5 rounded-md border-[var(--compare-orange-border)] px-2 text-[0.56rem] font-black text-[var(--compare-orange)]"
          onClick={onViewDeal}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          View Deal
        </MotionButton>
      </div>
    </TableCell>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="grid min-h-44 place-items-center px-6 py-8">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <p className="text-center text-sm font-black text-[var(--compare-muted)]">{title}</p>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 self-center" />
      </div>
    </div>
  );
}

function DisclosureNotice() {
  return (
    <motion.aside
      className="compare-reveal mx-auto mt-6 flex max-w-[91.375rem] flex-col gap-3 rounded-lg border border-[var(--compare-line)] bg-[var(--compare-soft-panel)] px-5 py-5 text-xs font-semibold text-[var(--compare-ink)] max-[1500px]:mx-8 sm:flex-row sm:items-center"
      variants={itemVariants}
    >
      <Info className="shrink-0 text-[var(--compare-muted)]" aria-hidden="true" />
      <p className="min-w-0">
        Our analysis is based on AI processing of specs, pricing, reviews, and expert opinions from 45,000+ trusted sources.
      </p>
      <a href="#" className="inline-flex shrink-0 items-center gap-2 font-black text-[var(--compare-purple)]">
        Learn more about how we compare
        <ChevronRight aria-hidden="true" />
      </a>
    </motion.aside>
  );
}

function EditComparisonDialog({
  open,
  productNames,
  onSave,
  onOpenChange,
}: {
  open: boolean;
  productNames: { sony: string; bose: string };
  onSave: (names: { sony: string; bose: string }) => void;
  onOpenChange: (open: boolean) => void;
}) {
  const [draft, setDraft] = useState(productNames);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <DialogContent className="rounded-lg border-[var(--compare-line)] p-0 sm:max-w-lg">
            <motion.div variants={modalVariants} initial="hidden" animate="show" exit="exit" className="p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-black text-[var(--compare-ink)]">Edit comparison</DialogTitle>
                <DialogDescription className="text-sm font-semibold text-[var(--compare-muted)]">
                  Swap products or add another product to extend the side-by-side view.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-5 flex flex-col gap-3">
                <Input value={draft.sony} onChange={(event) => setDraft((value) => ({ ...value, sony: event.target.value }))} className="h-11 border-[var(--compare-line)] font-bold" aria-label="Product A name" />
                <Input value={draft.bose} onChange={(event) => setDraft((value) => ({ ...value, bose: event.target.value }))} className="h-11 border-[var(--compare-line)] font-bold" aria-label="Product B name" />
                <MotionButton
                  className="h-11 bg-[var(--compare-orange)] text-sm font-black text-white hover:bg-[var(--compare-orange-dark)]"
                  onClick={() => {
                    onSave(draft);
                    onOpenChange(false);
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save comparison
                </MotionButton>
              </div>
            </motion.div>
          </DialogContent>
        ) : null}
      </AnimatePresence>
    </Dialog>
  );
}

function SearchDialog({ open, query, onOpenChange }: { open: boolean; query: string; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg border-[var(--compare-line)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[var(--compare-ink)]">Search results</DialogTitle>
          <DialogDescription className="text-sm font-semibold text-[var(--compare-muted)]">
            Demo matches for <span className="font-black text-[var(--compare-ink)]">{query}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {["Bose QuietComfort Ultra", "Sony WH-1000XM5", "Sennheiser Momentum 4"].map((name, index) => (
            <motion.button
              key={name}
              type="button"
              className="flex items-center justify-between rounded-lg border border-[var(--compare-line)] p-3 text-left"
              whileHover={{ y: -1, boxShadow: "var(--compare-hover-shadow)" }}
              whileTap={{ scale: 0.99 }}
            >
              <span>
                <span className="block text-sm font-black text-[var(--compare-ink)]">{name}</span>
                <span className="mt-1 block text-xs font-semibold text-[var(--compare-muted)]">{index === 0 ? "Best overall value" : "Comparable alternative"}</span>
              </span>
              <ChevronRight aria-hidden="true" />
            </motion.button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductPickerDialog({
  open,
  loading,
  onChoose,
  onOpenChange,
}: {
  open: boolean;
  loading: boolean;
  onChoose: () => void;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg border-[var(--compare-line)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[var(--compare-ink)]">Add another product</DialogTitle>
          <DialogDescription className="text-sm font-semibold text-[var(--compare-muted)]">
            Pick a demo product or restore a removed comparison slot.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {loading ? (
            <>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </>
          ) : (
            pickerProducts.map((product) => (
              <motion.button
                key={product.name}
                type="button"
                className="flex items-center justify-between rounded-lg border border-[var(--compare-line)] p-3 text-left"
                onClick={onChoose}
                whileHover={{ y: -1, boxShadow: "var(--compare-hover-shadow)" }}
                whileTap={{ scale: 0.99 }}
              >
                <span>
                  <span className="block text-sm font-black text-[var(--compare-ink)]">{product.name}</span>
                  <span className="mt-1 block text-xs font-semibold text-[var(--compare-muted)]">{product.detail}</span>
                </span>
                <Plus aria-hidden="true" />
              </motion.button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShareDialog({ open, message, onOpenChange }: { open: boolean; message: string; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg border-[var(--compare-line)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black text-[var(--compare-ink)]">
            <Copy aria-hidden="true" />
            Share comparison
          </DialogTitle>
          <DialogDescription className="text-sm font-semibold text-[var(--compare-muted)]">{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function OfferDialog({ selection, onOpenChange }: { selection: OfferSelection; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={selection !== null} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg border-[var(--compare-line)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[var(--compare-ink)]">{selection?.retailer} offer</DialogTitle>
          <DialogDescription className="text-sm font-semibold text-[var(--compare-muted)]">
            Demo retailer offer details for {selection?.product}.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-[var(--compare-soft-panel)] p-4">
          <p className="text-sm font-black text-[var(--compare-ink)]">{selection?.product}</p>
          <p className="font-numeric mt-2 text-2xl font-black text-[var(--compare-ink)]">{selection?.price}</p>
          {selection?.deal ? <Badge className="mt-2 border-0 bg-[var(--compare-green-soft)] text-[var(--compare-green-dark)]">{selection.deal}</Badge> : null}
        </div>
        <DialogFooter>
          <MotionButton className="bg-[var(--compare-orange)] text-white hover:bg-[var(--compare-orange-dark)]" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <ExternalLink data-icon="inline-start" aria-hidden="true" />
            Continue to retailer
          </MotionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ComparisonDashboard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pickerTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [productNames, setProductNames] = useState({ sony: "Sony WH-1000XM5", bose: "Bose QuietComfort Ultra" });
  const [removedIds, setRemovedIds] = useState<Product["id"][]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerLoading, setPickerLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [recommendationVisible, setRecommendationVisible] = useState(true);
  const [offersExpanded, setOffersExpanded] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferSelection>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    if (prefersReducedMotion || motionQuery.matches || !rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".compare-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (pickerTimeoutRef.current !== null) {
        window.clearTimeout(pickerTimeoutRef.current);
      }
    };
  }, []);

  const displayedProducts = products.map((product) => ({
    ...product,
    name: product.id === "sony" ? productNames.sony : productNames.bose,
  }));

  const handleSearch = () => {
    if (!query.trim()) {
      setSearchError("Enter a product or store");
      return;
    }

    setSearchError("");
    setSearchOpen(true);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/compare`;

    try {
      await navigator.clipboard.writeText(url);
      setShareMessage("Comparison link copied to your clipboard.");
    } catch {
      setShareMessage(`Copy this comparison link: ${url}`);
    }

    setShareOpen(true);
  };

  const restoreFirstRemoved = () => {
    setRemovedIds((ids) => ids.slice(1));
    setPickerOpen(false);
  };

  const openProductPicker = () => {
    if (pickerTimeoutRef.current !== null) {
      window.clearTimeout(pickerTimeoutRef.current);
    }

    setPickerLoading(true);
    setPickerOpen(true);
    pickerTimeoutRef.current = window.setTimeout(() => {
      setPickerLoading(false);
      pickerTimeoutRef.current = null;
    }, 650);
  };

  const handlePickerOpenChange = (open: boolean) => {
    if (open) {
      openProductPicker();
      return;
    }

    if (pickerTimeoutRef.current !== null) {
      window.clearTimeout(pickerTimeoutRef.current);
      pickerTimeoutRef.current = null;
    }

    setPickerOpen(false);
    setPickerLoading(false);
  };

  return (
    <div ref={rootRef} className="compare-dashboard min-h-screen bg-[var(--compare-page)] text-[var(--compare-ink)]">
      <AppHeader query={query} error={searchError} onQueryChange={(value) => {
        setQuery(value);
        if (searchError) setSearchError("");
      }} onSearch={handleSearch} />
      <motion.main variants={prefersReducedMotion ? undefined : pageVariants} initial={prefersReducedMotion ? false : "hidden"} animate="show" className="pb-9">
        <BreadcrumbAndActions saved={saved} onShare={handleShare} onSave={() => setSaved((value) => !value)} onEdit={() => setEditing(true)} />
        <section className="relative mx-auto grid max-w-[91.375rem] gap-3.5 px-4 xl:px-8 min-[1180px]:grid-cols-[minmax(0,183fr)_minmax(0,466fr)_minmax(0,429fr)_minmax(0,338fr)]" aria-label="Product summary comparison">
          <ComparisonIntro onAdd={openProductPicker} />
          {displayedProducts.map((product, index) => {
            const content = removedIds.includes(product.id) ? (
              <EmptyProductCard label={product.label} onUndo={() => setRemovedIds((ids) => ids.filter((id) => id !== product.id))} />
            ) : (
              <ProductSummaryCard product={product} onRemove={(id) => setRemovedIds((ids) => ids.includes(id) ? ids : [...ids, id])} />
            );

            return (
              <div key={product.id} className="relative h-full min-w-0">
                {index === 1 && <VsBadge />}
                {content}
              </div>
            );
          })}
          <RecommendationPanel visible={recommendationVisible} onDismiss={() => setRecommendationVisible(false)} onRestore={() => setRecommendationVisible(true)} />
        </section>
        <section className="mx-auto mt-4 grid max-w-[91.375rem] gap-3.5 px-4 xl:px-8 min-[1180px]:grid-cols-[minmax(0,542fr)_minmax(0,434fr)_minmax(0,434fr)]" aria-label="Comparison details">
          <ScoreComparison />
          <div className="flex min-w-0 flex-col gap-4">
            <ProsConsPanel />
            <UserFitPanel />
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <PriceComparison />
            <RetailerOffers expanded={offersExpanded} onToggleExpanded={() => setOffersExpanded((value) => !value)} onViewDeal={setSelectedOffer} />
          </div>
        </section>
        <DisclosureNotice />
      </motion.main>
      <SearchDialog open={searchOpen} query={query.trim()} onOpenChange={setSearchOpen} />
      <ProductPickerDialog open={pickerOpen} loading={pickerLoading} onChoose={restoreFirstRemoved} onOpenChange={handlePickerOpenChange} />
      <ShareDialog open={shareOpen} message={shareMessage} onOpenChange={setShareOpen} />
      <OfferDialog selection={selectedOffer} onOpenChange={(open) => {
        if (!open) setSelectedOffer(null);
      }} />
      {editing ? <EditComparisonDialog open={editing} productNames={productNames} onSave={setProductNames} onOpenChange={setEditing} /> : null}
    </div>
  );
}
