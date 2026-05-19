"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  ChevronDown,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  Dumbbell,
  Gamepad2,
  Globe,
  HeartPulse,
  Home,
  ImageIcon,
  Info,
  Link,
  Lock,
  Mail,
  Menu,
  Plug,
  ScanBarcode,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Utensils,
  Wrench,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const MotionButton = motion.create(Button);
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const pageVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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

const retailers = ["amazon", "Walmart", "BEST BUY", "target", "ebay"];

const scoreBreakdown = [
  { label: "Value Score", value: 85, color: "bg-[var(--happy-green)]" },
  { label: "Quality Score", value: 88, color: "bg-[var(--happy-blue)]" },
  { label: "Price Score", value: 78, color: "bg-[var(--happy-orange)]" },
  { label: "Review Trust", value: 86, color: "bg-[var(--happy-pink)]" },
  { label: "Health & Safety", value: 90, color: "bg-[var(--happy-cyan)]" },
  { label: "Confidence", value: 82, color: "bg-teal-300" },
];

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

interface IconText {
  icon: LucideIcon;
  title: string;
  text: string;
  tint?: string;
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Happy home">
      <span className="grid size-7 place-items-center rounded-lg bg-[var(--happy-orange)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[var(--happy-ink)]">Happy</span>
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
            <Button asChild variant="outline" size="lg" className="h-8 rounded-lg px-5 text-xs font-bold">
              <NextLink href="/signin">Log in</NextLink>
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="h-8 rounded-lg bg-[var(--happy-orange)] px-5 text-xs font-bold text-white hover:bg-[var(--happy-orange-dark)]">
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

function ProductImage({
  src,
  alt,
  className,
  fallbackIcon: FallbackIcon = ImageIcon,
}: {
  src?: string;
  alt: string;
  className?: string;
  fallbackIcon?: LucideIcon;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div className={cn("grid place-items-center rounded-2xl bg-slate-100 text-slate-400", className)}>
        <FallbackIcon className="size-10" aria-hidden="true" />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-slate-50", className)}>
      <AnimatePresence>{!loaded ? <Skeleton className="absolute inset-0 rounded-2xl" /> : null}</AnimatePresence>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
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
  return (
    <motion.div className="relative min-h-[19rem] overflow-visible bg-[image:var(--happy-hero-glow)] lg:min-h-[23rem]" variants={itemVariants}>
      <motion.div
        className="absolute left-[18%] top-[17%] z-10 h-52 w-40 rounded-[1.75rem] bg-gradient-to-br from-stone-100 to-stone-300 shadow-[var(--happy-float-shadow)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-4 top-4 grid size-14 grid-cols-2 gap-1.5 rounded-2xl bg-slate-900 p-2 shadow-inner">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="rounded-full bg-slate-700 shadow-inner" />
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 size-14 -translate-x-1/2 rounded-full bg-slate-300/70" />
      </motion.div>
      <motion.div className="absolute left-[6%] top-[26%] z-20 size-40 rounded-full border-[1.1rem] border-stone-200 bg-transparent shadow-[var(--happy-float-shadow)]" animate={{ rotate: [0, 2, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
        <span className="absolute -bottom-7 left-5 h-20 w-12 rounded-3xl bg-stone-100 shadow-lg" />
        <span className="absolute -bottom-7 right-5 h-20 w-12 rounded-3xl bg-stone-100 shadow-lg" />
      </motion.div>
      <motion.div className="absolute bottom-12 left-[41%] z-30 size-24 rounded-[1.5rem] bg-slate-950 shadow-[var(--happy-float-shadow)] ring-8 ring-slate-800" animate={{ y: [0, 8, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}>
        <div className="m-3 h-16 rounded-2xl bg-black">
          <MiniChart className="h-full text-orange-400" />
        </div>
      </motion.div>
      <motion.div className="absolute bottom-9 left-[58%] z-20 size-24 rounded-full bg-slate-900 shadow-[var(--happy-float-shadow)]" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
        <span className="absolute left-7 top-6 size-14 rounded-full bg-slate-800" />
      </motion.div>
      <FloatingInfo className="right-4 top-9 w-44" title="AI Buy Score">
        <div className="flex items-center gap-3">
          <ScoreRing score={82} />
          <div>
            <Badge className="bg-[var(--happy-green-soft)] text-[var(--happy-green)] hover:bg-[var(--happy-green-soft)]">Buy</Badge>
            <p className="mt-2 text-[0.62rem] font-semibold leading-snug text-slate-500">Great value, high quality and positive reviews.</p>
          </div>
        </div>
      </FloatingInfo>
      <FloatingInfo className="right-0 top-40 w-48" title="Price History">
        <MiniChart />
      </FloatingInfo>
      <FloatingInfo className="bottom-10 left-6 w-40" title="Better Alternative">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-xl bg-amber-100"><Dumbbell className="size-4 text-amber-600" /></span>
          <div>
            <p className="text-xs font-extrabold">Save $48</p>
          </div>
        </div>
      </FloatingInfo>
      <FloatingInfo className="bottom-0 right-24 w-40" title="Trusted Reviews">
        <div className="flex items-center gap-1 text-[var(--happy-orange)]">
          <span className="text-base font-extrabold">4.6</span>
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3 fill-current" />)}
        </div>
        <p className="mt-1 text-[0.62rem] font-semibold text-slate-500">12,842 reviews</p>
      </FloatingInfo>
    </motion.div>
  );
}

function FloatingInfo({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("absolute z-40 rounded-xl border border-[var(--happy-line)] bg-white/92 p-3 shadow-[var(--happy-float-shadow)] backdrop-blur", className)}
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

  const hasQuery = query.trim().length > 0;

  const runCheck = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 950);
  };

  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-7 px-4 pb-5 pt-7 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pt-8">
      <motion.div className="flex flex-col justify-center" variants={itemVariants}>
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
                className="h-12 rounded-lg border-[var(--happy-line)] bg-white pl-12 text-sm font-semibold shadow-sm placeholder:text-slate-400"
                onKeyDown={(event) => {
                  if (event.key === "Enter") runCheck();
                }}
              />
            </div>
            <MotionButton
              type="button"
              onClick={runCheck}
              className="h-12 rounded-lg bg-[var(--happy-orange)] px-7 text-sm font-extrabold text-white hover:bg-[var(--happy-orange-dark)]"
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
    <MotionButton variant="outline" className="h-12 rounded-lg border-[var(--happy-line)] bg-white text-sm font-extrabold text-[var(--happy-ink)] shadow-sm" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
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
              <motion.div key={retailer} className="grid h-20 place-items-center text-3xl font-black tracking-tight" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <RetailerLogo name={retailer} />
              </motion.div>
            ))}
          </div>
          <LinkText className="mx-auto my-4 justify-center" label="View all retailers" />
        </CardContent>
      </Card>
    </section>
  );
}

function RetailerLogo({ name }: { name: string }) {
  if (name === "amazon") return <span className="text-slate-800">amazon</span>;
  if (name === "Walmart") return <span className="text-blue-600">Walmart <span className="text-amber-400">*</span></span>;
  if (name === "BEST BUY") return <span className="leading-none text-slate-900">BEST<br />BUY</span>;
  if (name === "target") return <span className="text-red-600">target</span>;
  return <span><span className="text-blue-600">e</span><span className="text-red-500">b</span><span className="text-yellow-500">a</span><span className="text-green-600">y</span></span>;
}

function ProductVerdict() {
  return (
    <section className="scroll-reveal mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-10">
      <Card className="rounded-xl border border-[var(--happy-line)] bg-white py-0 shadow-none">
        <CardContent className="grid gap-0 px-0 lg:grid-cols-[1.32fr_0.85fr_0.78fr_0.92fr]">
          <div className="grid gap-6 border-b border-[var(--happy-line)] p-6 sm:grid-cols-[10rem_1fr] lg:border-b-0 lg:border-r">
            <ProductImage src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=360" alt="Apple AirPods Pro 2" className="aspect-square" />
            <div className="min-w-0">
              <h3 className="truncate text-xl font-extrabold text-[var(--happy-ink)]">Apple AirPods Pro 2</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--happy-muted)]">Wireless Earbuds</p>
              <div className="mt-8 flex items-center gap-4">
                <ScoreRing score={82} size="sm" />
                <span className="text-sm font-extrabold text-[var(--happy-ink)]">AI Buy Score</span>
                <Badge className="bg-[var(--happy-green-soft)] px-3 text-[var(--happy-green)] hover:bg-[var(--happy-green-soft)]">Buy</Badge>
              </div>
              <p className="mt-7 max-w-sm text-sm font-medium leading-6 text-[var(--happy-muted)]">Great value for the performance. Strong reviews, good reliability, and lower price than similar options.</p>
            </div>
          </div>
          <Panel title="Scores Breakdown" className="border-b border-[var(--happy-line)] p-6 lg:border-b-0 lg:border-r">
            <div className="grid gap-3">
              {scoreBreakdown.map((score) => (
                <div key={score.label} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3">
                  <span className="truncate text-xs font-bold text-[var(--happy-muted)]">{score.label}</span>
                  <span className="h-1.5 rounded-full bg-slate-100">
                    <motion.span className={cn("block h-full rounded-full", score.color)} initial={{ width: 0 }} whileInView={{ width: `${score.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                  </span>
                  <span className="text-right text-xs font-bold text-[var(--happy-ink)]">{score.value}/100</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Price History" className="border-b border-[var(--happy-line)] p-6 lg:border-b-0 lg:border-r">
            <p className="text-2xl font-black text-[var(--happy-ink)]">$249</p>
            <p className="text-xs font-semibold text-[var(--happy-muted)]">Current Price</p>
            <MiniChart className="mt-2" />
            <p className="mt-2 text-xs font-bold text-[var(--happy-green)]">↓ $28 (10%)</p>
            <p className="text-xs font-semibold text-[var(--happy-muted)]">of 30-day avg</p>
          </Panel>
          <Panel title="Best Alternative" className="p-6">
            <div className="mt-6 flex items-center gap-4">
              <ProductImage src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=180" alt="Sony headphones" className="size-20" />
              <div className="min-w-0">
                <p className="truncate text-base font-extrabold text-[var(--happy-ink)]">Sony WF-1000XM5</p>
                <p className="mt-2 text-xl font-black text-[var(--happy-ink)]">$199.99</p>
                <Badge className="mt-2 bg-[var(--happy-green-soft)] text-[var(--happy-green)] hover:bg-[var(--happy-green-soft)]">Save $49</Badge>
              </div>
            </div>
            <LinkText className="mt-10" label="View comparison" />
          </Panel>
        </CardContent>
      </Card>
    </section>
  );
}

function Panel({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h3 className="mb-7 text-sm font-extrabold text-[var(--happy-ink)]">{title}</h3>
      {children}
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
            <Globe className="size-16 text-[var(--happy-orange)]" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--happy-ink)]">Get our free Chrome extension</h2>
            <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-[var(--happy-muted)]">Instant AI insights on any product page. See scores, price history, and better alternatives without leaving the store.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <MotionButton className="h-9 rounded-lg bg-[var(--happy-purple)] px-5 text-sm font-bold text-white hover:bg-violet-800" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>Add to Chrome</MotionButton>
              <MotionButton variant="outline" className="h-9 rounded-lg bg-white px-5 text-sm font-bold" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>Learn more</MotionButton>
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
      <span className="text-xs font-extrabold text-[var(--happy-ink)]">Happy</span>
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
      <InfoCard title="Why trust Happy?" items={trustItems} />
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
          <div className="mt-5 flex gap-3 text-[var(--happy-ink)]">
            {[Mail, Globe, Camera, Plug].map((Icon, index) => <Icon key={index} className="size-4" aria-hidden="true" />)}
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
            <StoreButton label="App Store" />
            <StoreButton label="Google Play" />
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs font-semibold text-[var(--happy-muted)]">© 2024 Happy. All rights reserved.</p>
    </footer>
  );
}

function StoreButton({ label }: { label: string }) {
  return (
    <motion.button type="button" className="flex h-10 items-center gap-3 rounded-md bg-black px-3 text-left text-white" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
      <Smartphone className="size-5" aria-hidden="true" />
      <span className="text-xs font-bold leading-tight">Download on<br /><span className="text-sm">{label}</span></span>
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

export default function HappyHomePage() {
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
