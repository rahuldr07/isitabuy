"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Link as LinkIcon,
  Menu,
  X,
  Scale,
  TrendingUp,
  Tag,
  MonitorPlay,
  MonitorSmartphone,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { showProductSearchToast } from "@/components/ui/app-toast";
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

const navItems = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Compare", href: "/compare" },
  { label: "Deals", href: "/#deals" },
  { label: "Retailers", href: "/#retailers" },
];

// Footer links matching home page
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

function Logo() {
  return (
    <NextLink href="/" className="flex items-center gap-2.5" aria-label="IsItABuy home">
      <span className="grid size-7 place-items-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[var(--happy-ink)]">IsItABuy</span>
    </NextLink>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--happy-line)] bg-white/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Logo />
        <div className="hidden items-center gap-8 text-xs font-bold text-[var(--happy-ink)] lg:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1.5 whitespace-nowrap"
              whileHover={{ y: -1, color: "var(--happy-orange)" }}
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
                <a key={item.label} href={item.href} className="rounded-lg px-2 py-2 text-sm font-bold text-[var(--happy-ink)]">
                  {item.label}
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

function HeroSection() {
  const [query, setQuery] = useState("");

  const runCheck = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    showProductSearchToast(trimmedQuery);
    // Simulate navigation/loading
    window.setTimeout(() => {}, 950);
  };

  return (
    <section className="mx-auto max-w-[1240px] px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
      <div className="mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--happy-purple)]/20 bg-purple-50 px-4 py-1.5 text-sm font-bold text-[var(--happy-purple)]">
          <Sparkles className="size-4" aria-hidden="true" />
          AI-Powered Comparison
        </div>

        <h1 className="mt-8 font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[var(--happy-ink)]">
          Compare products.<br />
          <span className="text-[var(--happy-purple)]">Choose the better buy.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-[var(--happy-muted)] sm:text-lg">
          Our AI analyzes reviews, prices, features, and real-world performance so you can pick the right product with confidence.
        </p>

        <div className="mt-10 w-full max-w-[800px]">
          <div className="relative flex items-center rounded-2xl border border-[var(--happy-line)] bg-white p-2 shadow-[var(--happy-float-shadow)]">
            <Search className="absolute left-6 size-5 text-[var(--happy-muted)]" aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search any product or paste a product link to compare"
              className="h-14 rounded-xl border-transparent bg-transparent pl-14 pr-12 text-base font-medium shadow-none focus-visible:ring-0"
              onKeyDown={(event) => {
                if (event.key === "Enter") runCheck();
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-[var(--happy-muted)] hover:text-[var(--happy-ink)]"
              onClick={runCheck}
            >
              <LinkIcon className="size-5" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-4 text-sm font-medium text-[var(--happy-muted)]">
            Examples: iPhone 15 vs Samsung S24, Sony WH-1000XM5 vs Bose QC Ultra, Dyson V15 vs Shark Stratos
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[var(--happy-muted)]">
          <Lock className="size-4" aria-hidden="true" />
          Free to compare &bull; No sign up required
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Scale,
    title: "Side by side",
    description: "Compare key features, prices, and ratings.",
    color: "bg-purple-100 text-[var(--happy-purple)]",
  },
  {
    icon: TrendingUp,
    title: "AI analysis",
    description: "Get unbiased AI scores and recommendations.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Real-time data",
    description: "Live prices, availability, and offers from top retailers.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Tag,
    title: "Find better deals",
    description: "See which product gives you the best value.",
    color: "bg-orange-100 text-orange-600",
  },
];

function FeaturesSection() {
  return (
    <section className="scroll-reveal mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <Card className="rounded-2xl border border-[var(--happy-line)] bg-white shadow-sm">
        <CardContent className="p-2 sm:p-4">
          <div className="grid divide-y divide-[var(--happy-line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-4 p-5">
                  <div className={cn("grid size-12 shrink-0 place-items-center rounded-full", feature.color)}>
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[var(--happy-ink)]">{feature.title}</h3>
                    <p className="mt-1 text-xs font-medium leading-5 text-[var(--happy-muted)]">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

const popularComparisons = [
  {
    titleA: "Sony\nWH-1000XM5",
    titleB: "Bose\nQC Ultra",
    imgA: "/compare/sony-wh-1000xm5-black.png",
    imgB: "/compare/bose-qc-ultra-black.png",
    href: "/compare/results",
  },
  {
    titleA: "iPhone 15 Pro",
    titleB: "Samsung\nS24 Ultra",
    imgA: "/home/products/iphone-15-pro.png",
    iconB: MonitorSmartphone,
    href: "/compare/results",
  },
  {
    titleA: "Dyson\nV15 Detect",
    titleB: "Shark\nStratos",
    iconA: Sparkles,
    iconB: Sparkles,
    href: "/compare/results",
  },
  {
    titleA: "AirPods Pro 2",
    titleB: "Sony\nWF-1000XM5",
    imgA: "/home/products/airpods-pro-2.png",
    imgB: "/home/products/sony-wf1000xm5.png",
    href: "/compare/results",
  },
  {
    titleA: "MacBook\nAir M3",
    titleB: "Dell\nXPS 13",
    iconA: MonitorPlay,
    iconB: MonitorPlay,
    href: "/compare/results",
  },
];

function PopularComparisons() {
  return (
    <section className="scroll-reveal mx-auto mt-16 max-w-[1240px] px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[var(--happy-ink)]">Popular comparisons</h2>
        <NextLink href="/compare/results" className="flex items-center gap-1 text-sm font-bold text-[var(--happy-purple)] hover:text-violet-700">
          View all <ArrowRight className="size-4" />
        </NextLink>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {popularComparisons.map((comp, idx) => (
          <NextLink key={idx} href={comp.href}>
            <motion.div
              className="group relative flex min-h-[14rem] flex-col justify-between rounded-2xl border border-[var(--happy-line)] bg-white p-5 shadow-sm"
              whileHover={{ y: -4, boxShadow: "var(--happy-card-shadow)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex items-center justify-between gap-2">
                <div className="flex h-20 w-1/2 items-center justify-center">
                  {comp.imgA ? (
                    <Image src={comp.imgA} alt={comp.titleA.replace('\n', ' ')} width={70} height={70} className="object-contain" />
                  ) : (
                    <div className="grid size-16 place-items-center rounded-xl bg-slate-100 text-slate-400">
                      {comp.iconA && <comp.iconA className="size-8" />}
                    </div>
                  )}
                </div>
                
                <div className="absolute left-1/2 top-1/2 z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-[var(--happy-purple)] shadow-sm">
                  VS
                </div>

                <div className="flex h-20 w-1/2 items-center justify-center">
                  {comp.imgB ? (
                    <Image src={comp.imgB} alt={comp.titleB.replace('\n', ' ')} width={70} height={70} className="object-contain" />
                  ) : (
                    <div className="grid size-16 place-items-center rounded-xl bg-slate-100 text-slate-400">
                      {comp.iconB && <comp.iconB className="size-8" />}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-between gap-2 text-center text-xs font-bold text-[var(--happy-ink)]">
                <div className="w-1/2 whitespace-pre-wrap">{comp.titleA}</div>
                <div className="w-1/2 whitespace-pre-wrap">{comp.titleB}</div>
              </div>
            </motion.div>
          </NextLink>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-[1240px] px-4 pb-10 sm:px-6 lg:px-8">
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
      <p className="mt-8 text-center text-xs font-semibold text-[var(--happy-muted)]">&copy; 2026 IsItABuy. All rights reserved.</p>
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

export default function CompareLanding() {
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
        <FeaturesSection />
        <PopularComparisons />
      </motion.main>
      <Footer />
    </div>
  );
}
