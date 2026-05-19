"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
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
  ChevronDown,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  Dumbbell,
  Gamepad2,
  HeartPulse,
  Home,
  ImageIcon,
  Info,
  Link,
  Lock,
  Menu,
  ScanBarcode,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  TrendingDownIcon,
  Utensils,
  Wrench,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MotionButton = motion.create(Button);
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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

const navItems = ["How It Works", "Categories", "Deals", "Chrome Extension", "Blog", "Retailers"];

const retailers = [
  { name: "Amazon", src: "/home/logos/amazon-official.jpg" },
  { name: "Walmart", src: "/home/logos/walmart-official.png" },
  { name: "Best Buy", src: "/home/logos/bestbuy-official.jpeg" },
  { name: "Target", src: "/home/logos/target-official.png" },
  { name: "eBay", src: "/home/logos/ebay-official.png" },
] as const;

const steps = [
  { icon: Link, title: "1. Enter Product", text: "Paste a link, search, scan, or upload.", tint: "bg-purple-100 text-[var(--happy-purple)]" },
  { icon: ClipboardCheck, title: "2. AI Analyzes", text: "We analyze reviews, prices, complaints, specs, and more.", tint: "bg-rose-100 text-rose-500" },
  { icon: CircleDollarSign, title: "3. We Score It", text: "Our AI creates scores across 6 key factors.", tint: "bg-orange-100 text-[var(--happy-orange)]" },
  { icon: BadgeCheck, title: "4. Get Verdict", text: "See Buy, Wait, Avoid, or Better Alternative.", tint: "bg-sky-100 text-sky-600" },
  { icon: Bell, title: "5. Track & Save", text: "Save, set price alerts, and track over time.", tint: "bg-green-100 text-[var(--happy-green)]" },
];

const categories = [
  { icon: Smartphone, label: "Electronics", tint: "bg-sky-100 text-sky-600" },
  { icon: Home, label: "Home Appliances", tint: "bg-stone-100 text-stone-700" },
  { icon: Sparkles, label: "Beauty & Skincare", tint: "bg-rose-100 text-rose-500" },
  { icon: Shirt, label: "Fashion", tint: "bg-blue-100 text-blue-600" },
  { icon: Gamepad2, label: "Gaming", tint: "bg-slate-100 text-slate-700" },
  { icon: Utensils, label: "Kitchen", tint: "bg-zinc-100 text-zinc-700" },
  { icon: Wrench, label: "Tools", tint: "bg-amber-100 text-amber-600" },
  { icon: HeartPulse, label: "Health & Personal Care", tint: "bg-purple-100 text-[var(--happy-purple)]" },
];

const trustItems = [
  { icon: Bell, title: "Millions of reviews analyzed", text: "From real customers across the web" },
  { icon: Store, title: "Price history & deal tracking", text: "We track prices so you do not overpay" },
  { icon: Link, title: "Better alternatives", text: "We show the best options, not just popular ones" },
  { icon: CircleHelp, title: "Human oversight", text: "Our team reviews AI recommendations for accuracy" },
];

const sources = [
  { icon: Star, title: "Customer Reviews", text: "Amazon, Walmart, Best Buy, Target, eBay & more", tint: "bg-purple-100 text-[var(--happy-purple)]" },
  { icon: ShieldCheck, title: "Safety & Compliance", text: "Recalls, safety databases & government sources", tint: "bg-violet-100 text-violet-600" },
  { icon: Lock, title: "Price Data", text: "Retailer APIs & historical price tracking", tint: "bg-orange-100 text-orange-600" },
  { icon: Camera, title: "YouTube Reviews", text: "Trusted reviewers & channels", tint: "bg-rose-100 text-rose-600" },
  { icon: ClipboardCheck, title: "Expert & Editorial", text: "Trusted tech & product review sites", tint: "bg-slate-100 text-slate-700" },
  { icon: CircleHelp, title: "Community Reports", text: "Verified complaints & user reports", tint: "bg-zinc-100 text-zinc-700" },
];

const footerColumns = [
  { title: "Explore", links: ["Categories", "Deals", "How It Works", "Blog"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
  { title: "Support", links: ["Help Center", "Contact Us", "Report an Issue", "Product Requests"] },
  { title: "Legal", links: ["Affiliate Disclosure", "Privacy Policy", "Terms of Service", "How We Score"] },
];

const socialLinks = [
  { label: "X", src: "/home/logos/x.svg" },
  { label: "Facebook", src: "/home/logos/facebook.svg" },
  { label: "Instagram", src: "/home/logos/instagram.svg" },
  { label: "YouTube", src: "/home/logos/youtube.svg" },
] as const;

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
    <a href="#top" className="flex items-center gap-2.5" aria-label="IsItABuy home">
      <span className="grid size-7 place-items-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[var(--happy-ink)]">IsItABuy</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--happy-line)] bg-white/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Logo />
        <div className="hidden items-center gap-8 text-xs font-bold text-[var(--happy-ink)] lg:flex">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap"
              whileHover={{ y: -1, color: "var(--happy-orange)" }}
              whileTap={{ scale: 0.98 }}
            >
              {item}
              {item === "Categories" ? <ChevronDown className="size-3.5" aria-hidden="true" /> : null}
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
            <Button asChild size="lg" className="h-8 rounded-full bg-[var(--happy-orange)] px-5 text-xs font-bold text-white hover:bg-[var(--happy-orange-dark)]">
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
            className="border-t border-[var(--happy-line)] bg-white px-4 py-4 md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="rounded-lg px-2 py-2 text-sm font-bold text-[var(--happy-ink)]">
                  {item}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button asChild variant="outline" className="h-10">
                  <NextLink href="/signin">Log in</NextLink>
                </Button>
                <Button asChild className="h-10 bg-[var(--happy-orange)] text-white hover:bg-[var(--happy-orange-dark)]">
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
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const boxClass = size === "lg" ? "size-20" : "size-14";
  const viewSize = size === "lg" ? 80 : 56;
  const center = viewSize / 2;
  const scaledRadius = size === "lg" ? radius : 22;
  const scaledCircumference = 2 * Math.PI * scaledRadius;
  const scaledOffset = scaledCircumference - (score / 100) * scaledCircumference;

  return (
    <div className={cn("relative grid shrink-0 place-items-center rounded-full bg-white", boxClass)} aria-label={`AI buy score ${score}`}>
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
          strokeDasharray={size === "lg" ? circumference : scaledCircumference}
          strokeDashoffset={size === "lg" ? offset : scaledOffset}
          className="text-[var(--happy-green)]"
          initial={{ strokeDashoffset: size === "lg" ? circumference : scaledCircumference }}
          animate={{ strokeDashoffset: size === "lg" ? offset : scaledOffset }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      <span className={cn("font-extrabold leading-none text-[var(--happy-green)]", size === "lg" ? "text-3xl" : "text-lg")}>{score}</span>
    </div>
  );
}

function MiniChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 112" className={cn("h-24 w-full", className)} aria-hidden="true">
      <path d="M8 86 C24 76, 30 52, 46 70 S75 80, 88 58 S112 64, 124 42 S148 28, 160 50 S188 34, 210 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--happy-green)]" />
      <path d="M8 86 C24 76, 30 52, 46 70 S75 80, 88 58 S112 64, 124 42 S148 28, 160 50 S188 34, 210 20 L210 104 L8 104 Z" className="fill-emerald-100/70" />
    </svg>
  );
}

function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !visualRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-hero-float]").forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 2.4 + index * 0.28,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.25,
        });
      });

      gsap.fromTo(
        "[data-hero-products]",
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );
    }, visualRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <motion.div
      ref={visualRef}
      className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#ede9fe_0%,#fce7d6_42%,#f8f4ff_72%,#fff_100%)]"
      initial={shouldReduceMotion ? false : { y: 18 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute left-[58%] top-[18%] select-none text-2xl text-purple-400/70">&#10022;</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-[10%] top-[42%] select-none text-lg text-purple-300/60">&#10022;</span>
      <span aria-hidden="true" className="pointer-events-none absolute left-[28%] bottom-[20%] select-none text-sm text-purple-300/50">&#10022;</span>

      <div data-hero-products className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? false : { y: 24, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Image
            src="/home/products/hero-product-cluster.png"
            alt="Premium phone, headphones, and watch product cluster"
            fill
            sizes="(max-width: 1024px) 100vw, 540px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/20" />
        </motion.div>
      </div>

      <FloatingInfo dataFloat className="right-5 top-8 w-[190px]" title="AI Buy Score">
        <div className="flex items-center gap-3">
          <ScoreRing score={82} />
          <div>
            <Badge className="bg-[var(--happy-green-soft)] text-[var(--happy-green)] hover:bg-[var(--happy-green-soft)]">Buy</Badge>
            <p className="mt-2 text-[0.62rem] font-semibold leading-snug text-slate-500">Great value, high quality and positive reviews.</p>
          </div>
        </div>
      </FloatingInfo>
      <FloatingInfo dataFloat className="bottom-32 right-3 w-[180px]" title="Price History">
        <MiniChart />
      </FloatingInfo>
      <FloatingInfo dataFloat className="bottom-24 left-4 w-[180px]" title="Better Alternative">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-xl bg-amber-100"><Dumbbell className="size-4 text-amber-600" /></span>
          <div>
            <p className="text-xs font-extrabold text-[var(--happy-ink)]">Save $68</p>
          </div>
        </div>
      </FloatingInfo>
      <FloatingInfo dataFloat className="bottom-5 left-1/2 w-[190px] -translate-x-1/4" title="Trusted Reviews">
        <div className="flex items-center gap-1 text-[var(--happy-orange)]">
          <span className="text-xl font-black text-[var(--happy-ink)]">4.6</span>
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className={cn("size-3.5 fill-current", index === 4 && "opacity-35")} />)}
        </div>
        <p className="mt-1 text-[0.62rem] font-semibold text-slate-500">12,642 reviews</p>
      </FloatingInfo>
    </motion.div>
  );
}

function FloatingInfo({ title, children, className, dataFloat = false }: { title: string; children: React.ReactNode; className?: string; dataFloat?: boolean }) {
  return (
    <motion.div
      data-hero-float={dataFloat ? true : undefined}
      className={cn("absolute z-40 rounded-2xl border border-[var(--happy-line)] bg-white/90 p-4 shadow-xl backdrop-blur-md", className)}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.55 }}
    >
      <p className="mb-2 text-xs font-extrabold text-[var(--happy-ink)]">{title}</p>
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const hasQuery = query.trim().length > 0;

  const runCheck = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 950);
  };

  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-7 px-4 pb-5 pt-7 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pt-8">
      <motion.div
        className="flex flex-col justify-center"
        initial={shouldReduceMotion ? false : { y: 18 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-normal text-[var(--happy-ink)] sm:text-5xl lg:text-6xl">
          Know what to buy <span className="text-[var(--happy-orange)]">before</span> you buy.
        </h1>
        <p className="mt-5 max-w-lg text-base font-medium leading-7 text-[var(--happy-muted)]">
          Paste a product link, search by name, scan a barcode, or upload a product image. Our AI checks reviews, price history, complaints, and better alternatives before you spend.
        </p>
        <div className="mt-6 max-w-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Link className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Paste product link or search product name..."
                className="h-12 rounded-full border-[var(--happy-line)] bg-white pl-12 text-sm font-semibold shadow-sm placeholder:text-slate-400"
                onKeyDown={(event) => {
                  if (event.key === "Enter") runCheck();
                }}
              />
            </div>
            <MotionButton
              type="button"
              onClick={runCheck}
              className="h-12 rounded-full bg-[var(--happy-orange)] px-7 text-sm font-extrabold text-white hover:bg-[var(--happy-orange-dark)]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Checking..." : hasQuery ? "Check Product" : "Check Product"}
            </MotionButton>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ActionButton icon={ScanBarcode} label="Scan Barcode" />
            <ActionButton icon={ImageIcon} label="Upload Image" />
          </div>
        </div>
      </motion.div>
      <HeroVisual />
    </section>
  );
}

function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <MotionButton variant="outline" className="h-12 rounded-full border-[var(--happy-line)] bg-white text-sm font-extrabold text-[var(--happy-ink)] shadow-sm" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
      <Icon className="size-5 text-[var(--happy-purple)]" aria-hidden="true" />
      {label}
    </MotionButton>
  );
}

function RetailerStrip() {
  return (
    <section id="retailers" className="scroll-reveal mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--happy-line)] bg-white py-0 shadow-none">
        <CardContent className="px-0">
          <h2 className="px-4 pt-5 text-center text-lg font-extrabold text-[var(--happy-ink)]">We check millions of products from trusted retailers</h2>
          <div className="mt-4 grid divide-y divide-[var(--happy-line)] border-t border-[var(--happy-line)] sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {retailers.map((retailer) => (
              <motion.div key={retailer.name} className="grid h-24 place-items-center px-6" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Image src={retailer.src} alt={`${retailer.name} logo`} width={190} height={72} className="max-h-16 w-full object-contain" />
              </motion.div>
            ))}
          </div>
          <LinkText className="mx-auto my-4 w-fit justify-center text-[var(--happy-purple)]" label="View all retailers" />
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

function ScoreBar({ item }: { item: ScoreItem }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[110px] shrink-0 truncate text-xs font-semibold text-gray-500">{item.label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: `${item.value}%`, backgroundColor: item.color }}
        />
      </div>
      <span className="w-[42px] shrink-0 text-right text-xs font-semibold text-gray-400">{item.value}/100</span>
    </div>
  );
}

function PriceChart({ history }: { history: Record<RangeKey, PriceRange> }) {
  const [range, setRange] = useState<RangeKey>("1m");
  const current = history[range];
  const chartData = {
    labels: current.labels,
    datasets: [
      {
        data: current.data,
        borderColor: "#1D9E75",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#1D9E75",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(29,158,117,0.08)",
      },
    ],
  };
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
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
        {RANGES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRange(item)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-bold transition-colors",
              range === item ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="relative h-[96px] w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

function ProductAnalysisCard({ product = DEMO_PRODUCT }: { product?: Product }) {
  const verdict = VERDICT_STYLES[product.verdict];

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-center">
        <NextLink href="/retailers" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--happy-purple)] hover:text-violet-700">
          View all retailers
          <ArrowRightIcon className="size-3.5" />
        </NextLink>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-[var(--happy-line)] bg-white sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex h-[120px] items-center justify-center overflow-hidden rounded-xl bg-gray-50">
            <Image src={product.imageSrc} alt={product.imageAlt} width={150} height={115} className="object-contain" />
          </div>
          <div>
            <h2 className="truncate text-[15px] font-black text-gray-900">{product.name}</h2>
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
        </div>
        <div className="flex flex-col gap-3 p-6">
          <h3 className="text-sm font-black text-gray-900">Scores breakdown</h3>
          <div className="flex flex-col gap-3">
            {product.scores.map((score) => (
              <ScoreBar key={score.label} item={score} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <h3 className="text-sm font-black text-gray-900">Price history</h3>
          <div>
            <p className="text-2xl font-black text-gray-900">${product.currentPrice.toLocaleString()}</p>
            <p className="text-xs font-semibold text-gray-400">Current price</p>
          </div>
          <PriceChart history={product.priceHistory} />
          <div className="flex items-start gap-2">
            <TrendingDownIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            <div>
              <p className="text-xs font-bold text-emerald-600">Down ${product.priceDropAmount} ({product.priceDropPercent}%)</p>
              <p className="text-[11px] font-semibold text-gray-400">of 30-day avg</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <h3 className="text-sm font-black text-gray-900">Best alternative</h3>
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
              <Image src={product.alternative.imageSrc} alt={product.alternative.imageAlt} width={52} height={52} className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-black text-gray-900">{product.alternative.name}</p>
              <p className="mt-0.5 text-base font-black text-gray-900">${product.alternative.price.toFixed(2)}</p>
              <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">Save ${product.alternative.saving}</span>
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
                <span className={cn("shrink-0 text-[11px] font-bold", positive ? "text-emerald-600" : "text-gray-700")}>{value}</span>
              </div>
            ))}
          </div>
          <NextLink href="/compare" className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-[var(--happy-purple)] hover:text-violet-700">
            View comparison
            <ArrowRightIcon className="size-3.5" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-reveal mx-auto mt-2 max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--happy-line)] bg-white py-0 shadow-none">
        <CardContent className="px-5 py-5">
          <h2 className="mb-6 text-center text-lg font-extrabold text-[var(--happy-ink)]">How it works</h2>
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
      <h3 className="mt-4 text-sm font-extrabold text-[var(--happy-ink)]">{step.title}</h3>
      <p className="mx-auto mt-2 max-w-36 text-xs font-medium leading-5 text-[var(--happy-muted)]">{step.text}</p>
    </article>
  );
}

function ExtensionSection() {
  return (
    <section id="chrome-extension" className="scroll-reveal mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-10">
      <div className="grid overflow-hidden rounded-xl border border-[var(--happy-line)] bg-[image:var(--happy-violet-panel)] lg:grid-cols-[1fr_1fr]">
        <div className="flex items-center gap-7 p-8">
          <span className="grid size-24 shrink-0 place-items-center rounded-full bg-white shadow-sm">
            <Image src="/home/logos/chrome.svg" alt="Chrome logo" width={72} height={72} className="size-16 object-contain" />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--happy-ink)]">Get our free Chrome extension</h2>
            <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-[var(--happy-muted)]">Instant AI insights on any product page. See scores, price history, and better alternatives without leaving the store.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <MotionButton className="h-9 rounded-full bg-[var(--happy-purple)] px-5 text-sm font-bold text-white hover:bg-violet-800" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>Add to Chrome</MotionButton>
              <MotionButton variant="outline" className="h-9 rounded-full bg-white px-5 text-sm font-bold" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>Learn more</MotionButton>
            </div>
          </div>
        </div>
        <div className="relative hidden min-h-44 items-end justify-center p-8 lg:flex">
          <div className="h-32 w-96 rounded-t-2xl bg-white/70 p-5 shadow-[var(--happy-card-shadow)]">
            <div className="mb-4 h-4 w-28 rounded-full bg-slate-200" />
            <div className="grid gap-3">
              <div className="h-4 rounded-full bg-slate-200" />
              <div className="h-4 w-4/5 rounded-full bg-slate-100" />
            </div>
          </div>
          <div className="absolute bottom-5 right-28 w-44 rounded-xl border border-[var(--happy-line)] bg-white p-4 shadow-[var(--happy-float-shadow)]">
            <LogoMini />
            <p className="mt-3 text-xs font-extrabold">AI Buy Score</p>
            <div className="mt-2 flex items-center gap-3"><ScoreRing score={82} size="sm" /><Badge className="bg-[var(--happy-green-soft)] text-[var(--happy-green)]">Buy</Badge></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMini() {
  return (
    <div className="flex items-center gap-1.5">
      <ShoppingBag className="size-4 text-[var(--happy-orange)]" aria-hidden="true" />
      <span className="text-xs font-extrabold text-[var(--happy-ink)]">IsItABuy</span>
    </div>
  );
}

function CategoriesSection() {
  const visibleCategories = useMemo(() => categories, []);

  return (
    <section id="categories" className="scroll-reveal mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--happy-line)] bg-white py-0 shadow-none">
        <CardContent className="px-4 py-5">
          <h2 className="mb-3 text-lg font-extrabold text-[var(--happy-ink)]">Popular categories</h2>
          {visibleCategories.length === 0 ? (
            <div className="grid min-h-40 place-items-center rounded-xl bg-slate-50 text-sm font-bold text-[var(--happy-muted)]">No categories available.</div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.label}
                    type="button"
                    className="min-h-24 rounded-xl border border-[var(--happy-line)] bg-white p-4 text-center shadow-sm"
                    whileHover={{ y: -3, boxShadow: "var(--happy-card-shadow)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={cn("mx-auto grid size-12 place-items-center rounded-2xl", category.tint)}>
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="mt-3 block truncate text-xs font-extrabold text-[var(--happy-ink)]">{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          )}
          <LinkText className="mx-auto mt-5 justify-center" label="View all categories" />
        </CardContent>
      </Card>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="scroll-reveal mx-auto mt-8 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.05fr_1.45fr_0.82fr] lg:px-10">
      <InfoCard title="Why trust IsItABuy?" items={trustItems} />
      <InfoCard title="Our data sources" items={sources} columns />
      <Card className="rounded-xl border border-[var(--happy-line)] bg-[image:var(--happy-violet-panel)] py-0 shadow-none">
        <CardContent className="p-8">
          <h2 className="text-xl font-extrabold text-[var(--happy-ink)]">Our commitment</h2>
          <p className="mt-4 text-sm font-medium leading-7 text-[var(--happy-muted)]">Our AI scores and recommendations are not influenced by commission. We are here to help you make the best decision.</p>
          <LinkText className="mt-8" label="Learn more about how we score" />
        </CardContent>
      </Card>
    </section>
  );
}

function InfoCard({ title, items, columns = false }: { title: string; items: IconText[]; columns?: boolean }) {
  return (
    <Card className="rounded-xl border border-[var(--happy-line)] bg-white py-0 shadow-none">
      <CardContent className="p-6">
        <h2 className="mb-5 text-xl font-extrabold text-[var(--happy-ink)]">{title}</h2>
        <div className={cn("grid gap-4", columns && "sm:grid-cols-2")}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", item.tint ?? "bg-white text-[var(--happy-ink)]")}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold text-[var(--happy-ink)]">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-[var(--happy-muted)]">{item.text}</p>
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
    <section className="scroll-reveal mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-3 rounded-lg bg-[image:var(--happy-warm-strip)] px-5 py-4 text-sm font-semibold text-[var(--happy-muted)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Info className="size-5 shrink-0 text-[var(--happy-orange)]" aria-hidden="true" />
          <p>We may earn a commission when you buy through some links on our site. Our AI scores and recommendations are not based on commission.</p>
        </div>
        <LinkText label="Learn more" className="shrink-0" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-6xl px-4 pb-10 sm:px-6 lg:px-10">
      <div className="grid gap-8 border-t border-[var(--happy-line)] pt-8 md:grid-cols-[1.2fr_repeat(4,0.8fr)_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-56 text-sm font-medium leading-6 text-[var(--happy-muted)]">AI product insights to help you buy smarter and spend better.</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="grid size-8 place-items-center rounded-full border border-[var(--happy-line)] bg-white shadow-sm"
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
            <h3 className="text-sm font-extrabold text-[var(--happy-ink)]">{column.title}</h3>
            <ul className="mt-4 grid gap-3">
              {column.links.map((link) => (
                <li key={link}><a href="#" className="text-sm font-medium text-[var(--happy-muted)] hover:text-[var(--happy-orange)]">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-extrabold text-[var(--happy-ink)]">Download</h3>
          <p className="mt-4 text-sm font-medium text-[var(--happy-muted)]">Get our mobile app</p>
          <div className="mt-4 grid gap-2">
            <StoreButton src="/home/badges/app-store.svg" label="App Store" />
            <StoreButton src="/home/badges/google-play.svg" label="Google Play" />
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs font-semibold text-[var(--happy-muted)]">&copy; 2024 IsItABuy. All rights reserved.</p>
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

function LinkText({ label, className }: { label: string; className?: string }) {
  return (
    <motion.a href="#" className={cn("inline-flex items-center gap-2 text-sm font-extrabold text-[var(--happy-purple)]", className)} whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
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
    <div ref={rootRef} className="min-h-screen bg-[var(--happy-page)] text-[var(--happy-ink)]">
      <Header />
      <motion.main variants={prefersReducedMotion ? undefined : pageVariants} initial={prefersReducedMotion ? false : "hidden"} animate="show">
        <HeroSection />
        <RetailerStrip />
        <ProductVerdict />
        <HowItWorks />
        <ExtensionSection />
        <CategoriesSection />
        <TrustSection />
        <DisclosureStrip />
      </motion.main>
      <Footer />
    </div>
  );
}
