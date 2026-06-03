"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowRightIcon,
  BadgeCheck,
  Bell,
  Camera,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  Gamepad2,
  HeartPulse,
  Home,
  ImageIcon,
  Info,
  Link,
  Lock,
  Menu,
  Scale,
  Search,
  ScanBarcode,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  TrendingDownIcon,
  TrendingUp,
  Utensils,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { showFeatureSoonToast, showProductSearchToast } from "@/components/ui/app-toast";
import {
  dealsCategoryHref,
  footerColumns,
  homeSectionHrefs,
  mainNavItems as navItems,
  retailerDealsHref,
  routeForLabel,
  socialLinks,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const MotionButton = motion.create(Button);
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const heroGlowTextSweepTransition = (delay = 0): Transition => ({
  delay,
  duration: 5.8,
  ease: "easeInOut",
  repeat: Infinity,
  repeatDelay: 1.2,
});

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const pageVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const analysisCardVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const analysisPanelVariants: Variants = {
  hidden: (index: number = 0) => {
    const x = index === 0 ? -24 : index === 3 ? 24 : 0;

    return { opacity: 0, x, y: x ? 0 : 22, scale: 0.98 };
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const retailers = [
  { name: "Amazon", src: "/home/logos/amazon-official.jpg" },
  { name: "Walmart", src: "/home/logos/walmart-official.png" },
  { name: "Best Buy", src: "/home/logos/bestbuy-official.jpeg" },
  { name: "Target", src: "/home/logos/target-official.png" },
  { name: "eBay", src: "/home/logos/ebay-official.png" },
] as const;

const steps = [
  { icon: Link, title: "1. Enter Product", text: "Paste a link, search, scan, or upload.", tint: "bg-purple-100 text-[var(--isitabuy-purple)]" },
  { icon: ClipboardCheck, title: "2. AI Analyzes", text: "We analyze reviews, prices, complaints, specs, and more.", tint: "bg-rose-100 text-rose-500" },
  { icon: CircleDollarSign, title: "3. We Score It", text: "Our AI creates scores across 6 key factors.", tint: "bg-orange-100 text-[var(--isitabuy-orange)]" },
  { icon: BadgeCheck, title: "4. Get Verdict", text: "See Buy, Wait, Avoid, or Better Alternative.", tint: "bg-sky-100 text-sky-600" },
  { icon: Bell, title: "5. Track & Save", text: "Save, set price alerts, and track over time.", tint: "bg-green-100 text-[var(--isitabuy-green)]" },
];

const categories = [
  { icon: Smartphone, label: "Electronics", tint: "bg-sky-100 text-sky-600" },
  { icon: Home, label: "Home Appliances", tint: "bg-stone-100 text-stone-700" },
  { icon: Sparkles, label: "Beauty & Skincare", tint: "bg-rose-100 text-rose-500" },
  { icon: Shirt, label: "Fashion", tint: "bg-blue-100 text-blue-600" },
  { icon: Gamepad2, label: "Gaming", tint: "bg-slate-100 text-slate-700" },
  { icon: Utensils, label: "Kitchen", tint: "bg-zinc-100 text-zinc-700" },
  { icon: Wrench, label: "Tools", tint: "bg-amber-100 text-amber-600" },
  { icon: HeartPulse, label: "Health & Personal Care", tint: "bg-purple-100 text-[var(--isitabuy-purple)]" },
];

const trustItems = [
  { icon: Bell, title: "Millions of reviews analyzed", text: "From real customers across the web" },
  { icon: Store, title: "Price history & deal tracking", text: "We track prices so you do not overpay" },
  { icon: Link, title: "Better alternatives", text: "We show the best options, not just popular ones" },
  { icon: CircleHelp, title: "Human oversight", text: "Our team reviews AI recommendations for accuracy" },
];

const sources = [
  { icon: Star, title: "Customer Reviews", text: "Amazon, Walmart, Best Buy, Target, eBay & more", tint: "bg-purple-100 text-[var(--isitabuy-purple)]" },
  { icon: ShieldCheck, title: "Safety & Compliance", text: "Recalls, safety databases & government sources", tint: "bg-violet-100 text-violet-600" },
  { icon: Lock, title: "Price Data", text: "Retailer APIs & historical price tracking", tint: "bg-orange-100 text-orange-600" },
  { icon: Camera, title: "YouTube Reviews", text: "Trusted reviewers & channels", tint: "bg-rose-100 text-rose-600" },
  { icon: ClipboardCheck, title: "Expert & Editorial", text: "Trusted tech & product review sites", tint: "bg-slate-100 text-slate-700" },
  { icon: CircleHelp, title: "Community Reports", text: "Verified complaints & user reports", tint: "bg-zinc-100 text-zinc-700" },
];

interface ScoreItem {
  label: string;
  value: number;
  color: string;
}

interface PriceRange {
  labels: string[];
  data: number[];
}

interface AlternativeProduct {
  name: string;
  price: number;
  saving: number;
  imageSrc: string;
  imageAlt: string;
}

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  aiScore: number;
  verdict: "Buy" | "Wait" | "Avoid";
  description: string;
  currentPrice: number;
  priceDropAmount: number;
  priceDropPercent: number;
  scores: ScoreItem[];
  priceHistory: Record<RangeKey, PriceRange>;
  alternative: AlternativeProduct;
}

type RangeKey = "1m" | "3m" | "6m" | "1y";

const RANGES: RangeKey[] = ["1m", "3m", "6m", "1y"];

const VERDICT_STYLES: Record<Product["verdict"], { bg: string; text: string }> = {
  Buy: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Wait: { bg: "bg-amber-100", text: "text-amber-700" },
  Avoid: { bg: "bg-red-100", text: "text-red-700" },
};

const DEMO_PRODUCT: Product = {
  name: "Apple AirPods Pro 2",
  category: "Wireless Earbuds",
  imageSrc: "/home/products/airpods-pro-2.png",
  imageAlt: "Apple AirPods Pro 2 in charging case",
  aiScore: 82,
  verdict: "Buy",
  description:
    "Great value for the performance. Strong reviews, good reliability, and lower price than similar options.",
  currentPrice: 249,
  priceDropAmount: 28,
  priceDropPercent: 10,
  scores: [
    { label: "Value Score", value: 85, color: "#1D9E75" },
    { label: "Quality Score", value: 88, color: "#378ADD" },
    { label: "Price Score", value: 78, color: "#EF9F27" },
    { label: "Review Trust", value: 86, color: "#D4537E" },
    { label: "Health & Safety", value: 90, color: "#5DCAA5" },
    { label: "Confidence", value: 82, color: "#85B7EB" },
  ],
  priceHistory: {
    "1m": { labels: ["1 Feb", "8 Feb", "15 Feb", "22 Feb", "1 Mar"], data: [279, 265, 269, 255, 249] },
    "3m": { labels: ["Dec", "Jan", "Feb", "Mar"], data: [299, 279, 265, 249] },
    "6m": { labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Mar"], data: [319, 309, 299, 285, 269, 249] },
    "1y": { labels: ["Mar '24", "Jun", "Sep", "Dec", "Mar '25"], data: [349, 329, 319, 285, 249] },
  },
  alternative: {
    name: "Sony WF-1000XM5",
    price: 199.99,
    saving: 49,
    imageSrc: "/home/products/sony-wf1000xm5.png",
    imageAlt: "Sony WF-1000XM5 earbuds",
  },
};

interface IconText {
  icon: LucideIcon;
  title: string;
  text: string;
  tint?: string;
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
    <header className="sticky top-0 z-[100] border-b border-[var(--isitabuy-line)] bg-white/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Logo />
        <div className="hidden items-center gap-8 text-xs font-bold text-[var(--isitabuy-ink)] lg:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1.5 whitespace-nowrap"
              whileHover={{ y: -1, color: "var(--isitabuy-orange)" }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline" size="lg" className="h-8 rounded-full px-5 text-xs font-bold">
              <NextLink href="/signin">Log in</NextLink>
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="h-8 rounded-full bg-[var(--isitabuy-orange)] px-5 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]">
              <NextLink href="/signin?mode=signup">Sign up</NextLink>
            </Button>
          </motion.div>
        </div>
        <MotionButton
          variant="outline"
          size="icon-lg"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </MotionButton>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-[var(--isitabuy-line)] bg-white px-4 py-4 md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="rounded-lg px-2 py-2 text-sm font-bold text-[var(--isitabuy-ink)]">
                  {item.label}
                </a>
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ScoreRing({ score, size = "lg" }: { score: number; size?: "sm" | "lg" }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isRingInView = useInView(ringRef, { once: true, amount: 0.7 });
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const boxClass = size === "lg" ? "size-20" : "size-14";
  const viewSize = size === "lg" ? 80 : 56;
  const center = viewSize / 2;
  const scaledRadius = size === "lg" ? radius : 22;
  const scaledCircumference = 2 * Math.PI * scaledRadius;
  const scaledOffset = scaledCircumference - (score / 100) * scaledCircumference;
  const dashArray = size === "lg" ? circumference : scaledCircumference;
  const dashOffset = size === "lg" ? offset : scaledOffset;
  const shouldReveal = prefersReducedMotion || isRingInView;

  return (
    <div ref={ringRef} className={cn("relative grid shrink-0 place-items-center rounded-full bg-white", boxClass)} aria-label={`AI buy score ${score}`}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${viewSize} ${viewSize}`} aria-hidden="true">
        <circle cx={center} cy={center} r={scaledRadius} fill="none" stroke="currentColor" strokeWidth="5" className="text-emerald-100" />
        <motion.circle
          cx={center}
          cy={center}
          r={scaledRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashArray}
          className="text-[var(--isitabuy-green)]"
          initial={false}
          animate={{ strokeDashoffset: shouldReveal ? dashOffset : dashArray }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        />
      </svg>
      <motion.span
        className={cn("font-numeric font-bold leading-none text-[var(--isitabuy-green)]", size === "lg" ? "text-3xl" : "text-lg")}
        initial={false}
        animate={shouldReveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
      >
        {score}
      </motion.span>
    </div>
  );
}

function HeroGlowText({ children, delay = 0 }: { children: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className="relative inline-block font-medium tracking-normal text-[var(--isitabuy-ink)]">
      <span className="relative z-10">{children}</span>
      {prefersReducedMotion ? null : (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(105deg,transparent_0%,rgba(245,158,11,0.16)_30%,rgba(245,158,11,1)_50%,rgba(245,158,11,0.18)_70%,transparent_100%)] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.45)]"
          initial={{ backgroundPosition: "160% 0%", opacity: 0 }}
          animate={{ backgroundPosition: ["170% 0%", "-90% 0%"], opacity: [0, 1, 0] }}
          transition={heroGlowTextSweepTransition(delay)}
          style={{ backgroundSize: "240% 100%" }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}

function HeroSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeDialog, setActiveDialog] = useState<"scan" | "upload" | null>(null);

  const runCheck = () => {
    const trimmedQuery = query.trim();
    showProductSearchToast(trimmedQuery);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 950);
  };

  const heroHighlights = [
    {
      icon: Star,
      title: "Reviews & ratings",
      text: "from real shoppers",
    },
    {
      icon: TrendingUp,
      title: "Price history",
      text: "& price trends",
    },
    {
      icon: ShieldCheck,
      title: "Hidden issues",
      text: "& red flags",
    },
    {
      icon: Scale,
      title: "Better alternatives",
      text: "compared for you",
    },
  ] as const;

  return (
    <section id="top" className="mx-auto max-w-[1080px] px-4 pb-6 pt-4 sm:px-6 lg:px-8 lg:pb-8 lg:pt-6">
      <div
        className="mx-auto flex flex-col items-center text-center"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full border border-[var(--isitabuy-line)] bg-white/92 px-4 py-2 text-xs font-medium text-[var(--isitabuy-ink)] shadow-[var(--isitabuy-card-shadow)] backdrop-blur lg:text-sm"
        >
          <Sparkles className="size-4 text-[var(--isitabuy-orange)]" aria-hidden="true" />
          <HeroGlowText>AI-Powered Shopping Advisor</HeroGlowText>
        </div>

        <h1 className="mt-4 max-w-[780px] font-heading text-[clamp(1.9rem,3.9vw,3.55rem)] font-semibold leading-[1.02] tracking-normal text-[var(--isitabuy-ink)]">
          <span className="block sm:whitespace-nowrap">
            <span className="mr-2 inline-block font-semibold text-[var(--brand-amber)]">Know</span>{" "}
            <span className="font-medium">what to buy</span>{" "}
            <span className="font-normal">before</span>
          </span>
          {" "}
          <span className="block">
            you{" "}
            <span className="ml-2 inline-block font-semibold text-[var(--brand-amber)]">buy.</span>
          </span>
        </h1>

        <div className="group mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--isitabuy-line)] bg-white/92 px-4 py-2 text-xs font-medium text-[var(--isitabuy-ink)] shadow-[var(--isitabuy-card-shadow)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-orange-200/80 hover:bg-white hover:shadow-[0_16px_36px_rgb(255_122_0/0.14),0_10px_26px_rgb(15_23_42/0.08)] sm:text-base">
          <span className="grid size-7 place-items-center rounded-lg bg-[var(--isitabuy-orange)] text-white transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-6 group-hover:scale-105">
            <ShieldCheck className="size-3.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          </span>
          <HeroGlowText delay={0.75}>100% Independent & Commission-Free Scores</HeroGlowText>
        </div>

        <div className="mt-5 w-full max-w-[860px] rounded-[1.4rem] border border-[var(--isitabuy-line)] bg-white p-1.5 shadow-[0_14px_40px_rgb(15_23_42/0.1)] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-orange-200/80 hover:shadow-[0_26px_64px_rgb(255_122_0/0.16),0_14px_34px_rgb(15_23_42/0.09)] focus-within:-translate-y-0.5 focus-within:border-orange-300/90 focus-within:shadow-[0_28px_70px_rgb(255_122_0/0.2),0_16px_38px_rgb(15_23_42/0.1)] sm:rounded-[1.6rem]">
          <div className="flex flex-col gap-2 lg:h-12 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-800" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Paste a link or search product"
                className="h-10 rounded-full border-transparent bg-white pl-10 pr-4 text-xs font-semibold shadow-none placeholder:text-[var(--isitabuy-muted)] focus-visible:ring-[var(--isitabuy-orange)] lg:h-11 lg:text-sm"
                onKeyDown={(event) => {
                  if (event.key === "Enter") runCheck();
                }}
              />
            </div>
            <div className="hidden h-7 w-px bg-[var(--isitabuy-line)] lg:block" />
            <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center lg:gap-0">
              <MotionButton
                type="button"
                variant="ghost"
                size="icon-lg"
                className="h-9 w-full rounded-full text-[var(--isitabuy-ink)] hover:bg-slate-50 lg:size-10"
                onClick={() => setActiveDialog("scan")}
                aria-label="Take a product photo"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <Camera className="size-4" aria-hidden="true" />
              </MotionButton>
            <div className="hidden h-7 w-px bg-[var(--isitabuy-line)] lg:block" />
              <MotionButton
                type="button"
                variant="ghost"
                size="icon-lg"
                className="h-9 w-full rounded-full text-[var(--isitabuy-ink)] hover:bg-slate-50 lg:size-10"
                onClick={() => setActiveDialog("upload")}
                aria-label="Upload product image"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <ImageIcon className="size-4" aria-hidden="true" />
              </MotionButton>
            </div>
            <MotionButton
              type="button"
              onClick={runCheck}
              className="h-10 shrink-0 rounded-full bg-[var(--isitabuy-orange)] px-5 text-sm font-semibold text-white hover:bg-[var(--isitabuy-orange-dark)] lg:h-11 lg:px-6"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Checking..." : "Start Saving"}
            </MotionButton>
          </div>
        </div>

        <div
          className="mt-5 grid w-full max-w-[920px] gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {heroHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={cn(
                  "flex items-center gap-3 text-left",
                  index > 0 && "lg:border-l lg:border-[var(--isitabuy-line)] lg:pl-4",
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[var(--isitabuy-orange)] shadow-[var(--isitabuy-card-shadow)] lg:size-11">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold leading-4 text-[var(--isitabuy-ink)] lg:text-sm">{item.title}</span>
                  <span className="mt-0.5 block text-xs font-medium leading-4 text-[var(--isitabuy-muted)] lg:text-sm">{item.text}</span>
                </span>
              </article>
            );
          })}
        </div>
      </div>
      <HeroToolDialog
        type={activeDialog}
        open={activeDialog !== null}
        onTypeChange={setActiveDialog}
        onOpenChange={(open) => {
          if (!open) setActiveDialog(null);
        }}
      />
    </section>
  );
}

function HeroToolDialog({
  type,
  open,
  onTypeChange,
  onOpenChange,
}: {
  type: "scan" | "upload" | null;
  open: boolean;
  onTypeChange: (type: "scan" | "upload") => void;
  onOpenChange: (open: boolean) => void;
}) {
  const activeTool = type ?? "scan";
  const setTool = (tool: "scan" | "upload") => {
    onTypeChange(tool);
    showFeatureSoonToast(tool === "scan" ? "Barcode scanner" : "Image upload");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border border-[var(--isitabuy-line)] bg-white p-6 sm:max-w-lg">
        <DialogHeader>
          <div className="mb-1 grid size-12 place-items-center rounded-2xl bg-purple-100 text-[var(--isitabuy-purple)]">
            {activeTool === "scan" ? <ScanBarcode className="size-6" aria-hidden="true" /> : <ImageIcon className="size-6" aria-hidden="true" />}
          </div>
          <DialogTitle className="text-xl font-bold text-[var(--isitabuy-ink)]">Scan or upload product</DialogTitle>
          <DialogDescription className="text-sm font-medium leading-6 text-[var(--isitabuy-muted)]">
            Use a barcode for exact product matching, or upload a clear product image when you do not have a link.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolOptionCard
            active={activeTool === "scan"}
            icon={ScanBarcode}
            title="Scan barcode"
            description="Open camera scanner and match the exact item."
            onClick={() => setTool("scan")}
          />
          <ToolOptionCard
            active={activeTool === "upload"}
            icon={ImageIcon}
            title="Upload image"
            description="Choose a product photo, label, or packaging image."
            onClick={() => setTool("upload")}
          />
        </div>
        <div className="grid min-h-36 place-items-center rounded-2xl border border-dashed border-[var(--isitabuy-line)] bg-slate-50 p-6 text-center">
          {activeTool === "scan" ? (
            <div>
              <ScanBarcode className="mx-auto size-9 text-[var(--isitabuy-purple)]" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold text-[var(--isitabuy-ink)]">Camera scanner preview</p>
              <p className="mt-2 text-xs font-medium leading-5 text-[var(--isitabuy-muted)]">Camera permissions and live barcode detection will appear here.</p>
            </div>
          ) : (
            <div>
              <ImageIcon className="mx-auto size-9 text-[var(--isitabuy-purple)]" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold text-[var(--isitabuy-ink)]">Drop image here or choose a file</p>
              <p className="mt-2 text-xs font-medium leading-5 text-[var(--isitabuy-muted)]">PNG, JPG, and WEBP product photos will be supported.</p>
            </div>
          )}
        </div>
        <DialogFooter className="-mx-6 -mb-6 rounded-b-3xl bg-slate-50 px-6">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full">Cancel</Button>
          </DialogClose>
          <Button className="rounded-full bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => showFeatureSoonToast(activeTool === "scan" ? "Barcode scanner" : "Image upload")}>
            {activeTool === "scan" ? "Start scan" : "Choose image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ToolOptionCard({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-2xl border p-4 text-left transition-colors",
        active ? "border-[var(--isitabuy-purple)] bg-purple-50" : "border-[var(--isitabuy-line)] bg-white hover:bg-slate-50"
      )}
      onClick={onClick}
    >
      <Icon className="size-5 text-[var(--isitabuy-purple)]" aria-hidden="true" />
      <p className="mt-3 text-sm font-bold text-[var(--isitabuy-ink)]">{title}</p>
      <p className="mt-1 text-xs font-medium leading-5 text-[var(--isitabuy-muted)]">{description}</p>
    </button>
  );
}

function RetailerStrip() {
  return (
    <section id="retailers" className="scroll-reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--isitabuy-line)] bg-white py-0 shadow-none">
        <CardContent className="px-0">
          <h2 className="px-4 pt-5 text-center text-lg font-bold text-[var(--isitabuy-ink)]">We check millions of products from trusted retailers</h2>
          <div className="mt-4 grid divide-y divide-[var(--isitabuy-line)] border-t border-[var(--isitabuy-line)] sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {retailers.map((retailer, index) => (
              <motion.a
                key={retailer.name}
                className="grid h-24 place-items-center px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
                href={retailerDealsHref(retailer.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={retailer.src}
                  alt={`${retailer.name} logo`}
                  width={190}
                  height={72}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="max-h-16 w-full object-contain"
                />
              </motion.a>
            ))}
          </div>
          <div className="flex justify-center py-4">
            <LinkText className="text-[var(--isitabuy-purple)]" href="/deals" label="View all retailers" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ProductVerdict() {
  return (
    <section className="scroll-reveal mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-10">
      <ProductAnalysisCard />
    </section>
  );
}

function ScoreBar({ item, index = 0 }: { item: ScoreItem; index?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      <span className="w-[110px] shrink-0 truncate text-xs font-semibold text-gray-500">{item.label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ width: `${item.value}%`, backgroundColor: item.color }}
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.16 + index * 0.06 }}
        />
      </div>
      <span className="font-numeric w-8 shrink-0 text-right text-xs font-semibold text-gray-500">{item.value}%</span>
    </motion.div>
  );
}

function PriceChart({ history }: { history: Record<RangeKey, PriceRange> }) {
  const [range, setRange] = useState<RangeKey>("1m");
  const [chartBackground, setChartBackground] = useState<string | CanvasGradient>("rgba(29,158,117,0.08)");
  const chartRef = useRef<ChartJS<"line">>(null);
  const chartFrameRef = useRef<HTMLDivElement>(null);
  const revealProgressRef = useRef(0);
  const revealAnimationRef = useRef<number | null>(null);
  const lineRevealClippedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const isChartInView = useInView(chartFrameRef, { once: true, amount: 0.6 });
  const current = history[range];

  const lineRevealPlugin = useMemo<Plugin<"line">>(() => {
    return {
      id: "lineReveal",
      beforeDatasetsDraw(chart) {
        const progress = Math.min(1, Math.max(0, revealProgressRef.current));

        if (progress >= 1 || !chart.chartArea) {
          lineRevealClippedRef.current = false;
          return;
        }

        const { ctx, chartArea } = chart;
        const width = (chartArea.right - chartArea.left) * progress;
        ctx.save();
        ctx.beginPath();
        ctx.rect(chartArea.left, chartArea.top - 8, width, chartArea.bottom - chartArea.top + 16);
        ctx.clip();
        lineRevealClippedRef.current = true;
      },
      afterDatasetsDraw(chart) {
        if (!lineRevealClippedRef.current) return;
        chart.ctx.restore();
        lineRevealClippedRef.current = false;
      },
    };
  }, []);

  useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 0, 90);
    gradient.addColorStop(0, "rgba(29,158,117,0.18)");
    gradient.addColorStop(1, "rgba(29,158,117,0)");
    setChartBackground(gradient);
  }, [range]);

  useEffect(() => {
    if (revealAnimationRef.current) {
      window.cancelAnimationFrame(revealAnimationRef.current);
    }

    if (prefersReducedMotion) {
      revealProgressRef.current = 1;
      chartRef.current?.draw();
      return;
    }

    if (!isChartInView) {
      revealProgressRef.current = 0;
      chartRef.current?.draw();
      return;
    }

    revealProgressRef.current = 0;
    const duration = 1350;
    const start = window.performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      revealProgressRef.current = eased;
      chartRef.current?.draw();

      if (elapsed < 1) {
        revealAnimationRef.current = window.requestAnimationFrame(tick);
      }
    };

    revealAnimationRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (revealAnimationRef.current) {
        window.cancelAnimationFrame(revealAnimationRef.current);
      }
    };
  }, [isChartInView, prefersReducedMotion, range]);

  const crosshairPlugin: Plugin<"line"> = {
    id: "crosshair",
    afterDraw(chart) {
      const active = chart.tooltip?.getActiveElements?.() ?? [];
      if (active.length) {
        const x = active[0].element.x;
        const ctx = chart.ctx;
        const top = chart.chartArea.top;
        const bottom = chart.chartArea.bottom;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const chartData = {
    labels: current.labels,
    datasets: [
      {
        data: current.data,
        borderColor: "#1D9E75",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#1D9E75",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        tension: 0.45,
        fill: true,
        backgroundColor: chartBackground,
      },
    ],
  };
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111",
        titleColor: "#fff",
        bodyColor: "#1D9E75",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items) => items[0]?.label ?? "",
          label: (item) => `$${item.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, color: "#9ca3af" },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          font: { size: 10 },
          color: "#9ca3af",
          callback: (value) => `$${value}`,
        },
        grid: { color: "rgba(0,0,0,0.04)" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        {RANGES.map((item, index) => (
          <motion.button
            key={item}
            type="button"
            onClick={() => {
              revealProgressRef.current = 0;
              setRange(item);
            }}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-bold transition-colors",
              range === item ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
            )}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
          >
            {item.toUpperCase()}
          </motion.button>
        ))}
      </div>
      <motion.div
        ref={chartFrameRef}
        className="relative h-[96px] w-full"
        key={range}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={prefersReducedMotion || isChartInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        <Line ref={chartRef} data={chartData} options={chartOptions} plugins={[lineRevealPlugin, crosshairPlugin]} />
      </motion.div>
    </div>
  );
}

function ProductAnalysisCard({ product = DEMO_PRODUCT }: { product?: Product }) {
  const verdict = VERDICT_STYLES[product.verdict];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full">
      <motion.div
        className="grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-[var(--isitabuy-line)] bg-white sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0"
        variants={prefersReducedMotion ? undefined : analysisCardVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div className="flex flex-col gap-4 p-6" custom={0} variants={prefersReducedMotion ? undefined : analysisPanelVariants}>
          <div className="flex h-[120px] items-center justify-center overflow-hidden rounded-xl bg-gray-50">
            <Image src={product.imageSrc} alt={product.imageAlt} width={115} height={115} className="object-contain" />
          </div>
          <div>
            <h2 className="truncate text-[15px] font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm font-semibold text-gray-400">{product.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <ScoreRing score={product.aiScore} size="sm" />
            <div>
              <p className="mb-1.5 text-xs font-semibold text-gray-400">AI Buy Score</p>
              <span className={cn("inline-block rounded-full px-3 py-0.5 text-xs font-bold", verdict.bg, verdict.text)}>{product.verdict}</span>
            </div>
          </div>
          <p className="line-clamp-4 text-[13px] font-medium leading-6 text-gray-500">{product.description}</p>
        </motion.div>
        <motion.div className="flex flex-col gap-3 p-6" custom={1} variants={prefersReducedMotion ? undefined : analysisPanelVariants}>
          <h3 className="text-sm font-bold text-gray-900">Scores breakdown</h3>
          <div className="flex flex-col gap-3">
            {product.scores.map((score, index) => (
              <ScoreBar key={score.label} item={score} index={index} />
            ))}
          </div>
        </motion.div>
        <motion.div className="flex flex-col gap-4 p-6" custom={2} variants={prefersReducedMotion ? undefined : analysisPanelVariants}>
          <h3 className="text-sm font-bold text-gray-900">Price history</h3>
          <div>
            <p className="font-numeric text-2xl font-bold text-gray-900">${product.currentPrice.toLocaleString()}</p>
            <p className="text-xs font-semibold text-gray-400">Current price</p>
          </div>
          <PriceChart history={product.priceHistory} />
          <motion.div
            className="flex items-start gap-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
          >
            <TrendingDownIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            <div>
              <p className="font-numeric text-xs font-bold text-emerald-600">Down ${product.priceDropAmount} ({product.priceDropPercent}%)</p>
              <p className="text-[11px] font-semibold text-gray-400">of 30-day avg</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="flex flex-col gap-4 p-6" custom={3} variants={prefersReducedMotion ? undefined : analysisPanelVariants}>
          <h3 className="text-sm font-bold text-gray-900">Best alternative</h3>
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
              <Image src={product.alternative.imageSrc} alt={product.alternative.imageAlt} width={52} height={52} className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-gray-900">{product.alternative.name}</p>
              <p className="font-numeric mt-0.5 text-base font-bold text-gray-900">${product.alternative.price.toFixed(2)}</p>
              <span className="font-numeric mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">Save ${product.alternative.saving}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "Noise cancelling", value: "Better", positive: true },
              { label: "Battery life", value: "12h vs 6h", positive: true },
              { label: "AI score", value: "79/100", positive: false },
            ].map(({ label, value, positive }) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="truncate text-[11px] font-semibold text-gray-400">{label}</span>
                <span className={cn("font-numeric shrink-0 text-[11px] font-bold", positive ? "text-emerald-600" : "text-gray-700")}>{value}</span>
              </div>
            ))}
          </div>
          <NextLink href="/compare" className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-[var(--isitabuy-purple)] hover:text-violet-700">
            View comparison
            <ArrowRightIcon className="size-3.5" />
          </NextLink>
        </motion.div>
      </motion.div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-reveal mx-auto mt-2 max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--isitabuy-line)] bg-white py-0 shadow-none">
        <CardContent className="px-5 py-5">
          <h2 className="mb-6 text-center text-lg font-bold text-[var(--isitabuy-ink)]">How it works</h2>
          <div className="grid gap-6 md:grid-cols-5">
            {steps.map((step, index) => <StepItem key={step.title} step={step} showArrow={index < steps.length - 1} />)}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function StepItem({ step, showArrow }: { step: IconText; showArrow: boolean }) {
  const Icon = step.icon;

  return (
    <article className="relative text-center">
      <span className={cn("mx-auto grid size-14 place-items-center rounded-full", step.tint)}>
        <Icon className="size-6" aria-hidden="true" />
      </span>
      {showArrow ? <span className="absolute right-[-15%] top-7 hidden w-[30%] border-t border-dashed border-slate-300 md:block" /> : null}
      <h3 className="mt-4 text-sm font-bold text-[var(--isitabuy-ink)]">{step.title}</h3>
      <p className="mx-auto mt-2 max-w-36 text-xs font-medium leading-5 text-[var(--isitabuy-muted)]">{step.text}</p>
    </article>
  );
}

function CategoriesSection() {
  const visibleCategories = useMemo(() => categories, []);

  return (
    <section id="categories" className="scroll-reveal mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--isitabuy-line)] bg-white py-0 shadow-none">
        <CardContent className="px-4 py-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--isitabuy-ink)]">Popular categories</h2>
          {visibleCategories.length === 0 ? (
            <div className="grid min-h-40 place-items-center rounded-xl bg-slate-50 text-sm font-bold text-[var(--isitabuy-muted)]">No categories available.</div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.a
                    key={category.label}
                    className="min-h-24 rounded-xl border border-[var(--isitabuy-line)] bg-white p-4 text-center shadow-sm"
                    href={dealsCategoryHref(category.label)}
                    whileHover={{ y: -3, boxShadow: "var(--isitabuy-card-shadow)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={cn("mx-auto grid size-12 place-items-center rounded-2xl", category.tint)}>
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="mt-3 block truncate text-xs font-bold text-[var(--isitabuy-ink)]">{category.label}</span>
                  </motion.a>
                );
              })}
            </div>
          )}
          <LinkText className="mx-auto mt-5 justify-center" href="/deals" label="View all categories" />
        </CardContent>
      </Card>
    </section>
  );
}

function TrustSection() {
  return (
    <section id="trust" className="scroll-reveal mx-auto mt-8 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.05fr_1.45fr_0.82fr] lg:px-10">
      <InfoCard title="Why trust IsItABuy?" items={trustItems} />
      <InfoCard title="Our data sources" items={sources} columns />
      <Card className="rounded-xl border border-[var(--isitabuy-line)] bg-[image:var(--isitabuy-violet-panel)] py-0 shadow-none">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-[var(--isitabuy-ink)]">Our commitment</h2>
          <p className="mt-4 text-sm font-medium leading-7 text-[var(--isitabuy-muted)]">Our AI scores and recommendations are not influenced by commission. We are here to help you make the best decision.</p>
          <LinkText className="mt-8" href={homeSectionHrefs.howItWorks} label="Learn more about how we score" />
        </CardContent>
      </Card>
    </section>
  );
}

function InfoCard({ title, items, columns = false }: { title: string; items: IconText[]; columns?: boolean }) {
  return (
    <Card className="rounded-xl border border-[var(--isitabuy-line)] bg-white py-0 shadow-none">
      <CardContent className="p-6">
        <h2 className="mb-5 text-xl font-bold text-[var(--isitabuy-ink)]">{title}</h2>
        <div className={cn("grid gap-4", columns && "sm:grid-cols-2")}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", item.tint ?? "bg-white text-[var(--isitabuy-ink)]")}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-[var(--isitabuy-ink)]">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-[var(--isitabuy-muted)]">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function DisclosureStrip() {
  return (
    <section id="disclosure" className="scroll-reveal mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-3 rounded-lg bg-[image:var(--isitabuy-warm-strip)] px-5 py-4 text-sm font-semibold text-[var(--isitabuy-muted)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Info className="size-5 shrink-0 text-[var(--isitabuy-orange)]" aria-hidden="true" />
          <p>We may earn a commission when you buy through some links on our site. Our AI scores and recommendations are not based on commission.</p>
        </div>
        <LinkText href={homeSectionHrefs.disclosure} label="Learn more" className="shrink-0" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-6xl px-4 pb-10 sm:px-6 lg:px-10">
      <div className="grid gap-8 border-t border-[var(--isitabuy-line)] pt-8 md:grid-cols-[1.2fr_repeat(4,0.8fr)_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-56 text-sm font-medium leading-6 text-[var(--isitabuy-muted)]">AI product insights to help you buy smarter and spend better.</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="grid size-8 place-items-center rounded-full border border-[var(--isitabuy-line)] bg-white shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Image src={social.src} alt="" width={16} height={16} className="size-4 object-contain" />
              </motion.a>
            ))}
          </div>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-bold text-[var(--isitabuy-ink)]">{column.title}</h3>
            <ul className="mt-4 grid gap-3">
              {column.links.map((link) => (
                <li key={link}><a href={routeForLabel(link)} className="text-sm font-medium text-[var(--isitabuy-muted)] hover:text-[var(--isitabuy-orange)]">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-bold text-[var(--isitabuy-ink)]">Download</h3>
          <p className="mt-4 text-sm font-medium text-[var(--isitabuy-muted)]">Get our mobile app</p>
          <div className="mt-4 grid gap-2">
            <StoreButton src="/home/badges/app-store.svg" label="App Store" />
            <StoreButton src="/home/badges/google-play.svg" label="Google Play" />
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs font-semibold text-[var(--isitabuy-muted)]">&copy; 2024 IsItABuy. All rights reserved.</p>
    </footer>
  );
}

function StoreButton({ src, label }: { src: string; label: string }) {
  return (
    <motion.button type="button" className="relative h-10 w-36 overflow-hidden rounded-lg bg-black shadow-sm" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
      <Image src={src} alt={label} fill sizes="144px" className="object-contain" />
    </motion.button>
  );
}

function LinkText({ label, className, href = routeForLabel(label) }: { label: string; className?: string; href?: string }) {
  return (
    <motion.a href={href} className={cn("inline-flex items-center gap-2 text-sm font-bold text-[var(--isitabuy-purple)]", className)} whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
      {label}
      <ArrowRight className="size-4" aria-hidden="true" />
    </motion.a>
  );
}

export default function IsItABuyHomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    if (prefersReducedMotion || motionQuery.matches || !rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef} className="min-h-screen bg-[var(--isitabuy-page)] text-[var(--isitabuy-ink)]">
      <Header />
      <motion.main variants={prefersReducedMotion ? undefined : pageVariants} initial={prefersReducedMotion ? false : "hidden"} animate="show">
        <HeroSection />
        <RetailerStrip />
        <ProductVerdict />
        <HowItWorks />
        <CategoriesSection />
        <TrustSection />
        <DisclosureStrip />
      </motion.main>
      <Footer />
    </div>
  );
}
