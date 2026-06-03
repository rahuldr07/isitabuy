/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  BadgeCheck,
  BatteryCharging,
  Bell,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Database,
  Heart,
  ListChecks,
  Medal,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  User,
  Volume2,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { homeSectionHrefs } from "@/lib/navigation";

export const metadata = {
  title: "Best Headphones Buying Guide - IsItABuy",
  description: "IsItABuy buying guide for the best headphones with scores, comparisons, FAQs, and sources.",
};

const navItems = [
  { label: "All Deals", href: "/deals" },
  { label: "Electronics", href: "/deals?category=electronics" },
  { label: "Home", href: "/deals?category=home" },
  { label: "Beauty", href: "/deals?category=beauty" },
  { label: "Fashion", href: "/deals?category=fashion" },
  { label: "Kitchen", href: "/deals?category=kitchen" },
  { label: "Gaming", href: "/deals?category=gaming" },
  { label: "Sports", href: "/deals?category=sports" },
  { label: "Automotive", href: "/deals?category=automotive" },
];

const pageLinks = [
  { label: "Best Overall", href: "#best-overall", icon: Trophy },
  { label: "Best Budget", href: "#best-budget", icon: WalletCards },
  { label: "Best Premium", href: "#best-premium", icon: Medal },
  { label: "Best for Noise Cancellation", href: "#best-for-noise-cancellation", icon: Volume2 },
  { label: "Best for Work Calls", href: "#best-for-work-calls", icon: MessageCircle },
  { label: "Comparison Table", href: "#comparison-table", icon: ClipboardList },
  { label: "How We Scored", href: "#how-we-scored", icon: ShieldCheck },
  { label: "FAQs", href: "#faqs", icon: ListChecks },
  { label: "Sources", href: "#sources", icon: Database },
];

const headphones = [
  {
    tag: "Best Overall",
    tagClass: "bg-value text-white",
    name: "Sony WH-1000XM5",
    image: "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=500",
    price: "$299.99",
    oldPrice: "$399.99",
    discount: "25% OFF",
    score: 92,
    scoreClass: "text-value border-value",
    verdict: "WAIT",
    verdictClass: "bg-soft-wait text-wait",
    bestFor: "Overall Use",
    noise: "Excellent",
    sound: "Excellent",
    comfort: "Very Good",
    battery: "30 hours",
  },
  {
    tag: "Best Budget",
    tagClass: "bg-buy text-white",
    name: "Anker Soundcore Q20i",
    image: "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=500",
    price: "$49.99",
    oldPrice: "$69.99",
    discount: "17% OFF",
    score: 78,
    scoreClass: "text-buy border-buy",
    verdict: "BUY",
    verdictClass: "bg-soft-buy text-buy",
    bestFor: "Budget Buyers",
    noise: "Good",
    sound: "Good",
    comfort: "Good",
    battery: "40 hours",
  },
  {
    tag: "Best Premium",
    tagClass: "bg-[var(--isitabuy-blue)] text-white",
    name: "Bose QuietComfort Ultra",
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=500",
    price: "$429.00",
    oldPrice: "$499.00",
    discount: "14% OFF",
    score: 94,
    scoreClass: "text-[var(--isitabuy-blue)] border-[var(--isitabuy-blue)]",
    verdict: "BUY",
    verdictClass: "bg-soft-buy text-buy",
    bestFor: "Premium Experience",
    noise: "Excellent",
    sound: "Excellent",
    comfort: "Excellent",
    battery: "24 hours",
  },
  {
    tag: "Best for Noise Cancellation",
    tagClass: "bg-accent text-white",
    name: "Sennheiser Momentum 4",
    image: "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&w=500",
    price: "$349.95",
    oldPrice: "$399.95",
    discount: "12% OFF",
    score: 91,
    scoreClass: "text-accent border-accent",
    verdict: "WAIT",
    verdictClass: "bg-soft-wait text-wait",
    bestFor: "Long Listening",
    noise: "Very Good",
    sound: "Very Good",
    comfort: "Very Good",
    battery: "60 hours",
  },
  {
    tag: "Best for Work Calls",
    tagClass: "bg-[#df0b5f] text-white",
    name: "Jabra Evolve2 65",
    image: "https://images.pexels.com/photos/3394655/pexels-photo-3394655.jpeg?auto=compress&cs=tinysrgb&w=500",
    price: "$179.99",
    oldPrice: "$219.99",
    discount: "18% OFF",
    score: 83,
    scoreClass: "text-[#df0b5f] border-[#df0b5f]",
    verdict: "BUY",
    verdictClass: "bg-soft-buy text-buy",
    bestFor: "Work Calls",
    noise: "Good",
    sound: "Good",
    comfort: "Good",
    battery: "37 hours",
  },
];

const scoreWeights = [
  ["Sound Quality", "25%"],
  ["Comfort", "20%"],
  ["Noise Cancellation", "20%"],
  ["Price & Value", "15%"],
  ["Battery Life", "10%"],
  ["Build Quality", "5%"],
  ["Features", "3%"],
  ["Review Trust", "2%"],
];

const faqs = [
  "What is the best overall headphone in 2024?",
  "Are expensive headphones worth it?",
  "How important is noise cancellation?",
  "How we test headphones?",
];

const sourceStats = [
  { value: "18,450", label: "User Reviews", icon: Star },
  { value: "1,250", label: "Expert Reviews", icon: ClipboardList },
  { value: "350+", label: "Retailer Listings", icon: ShoppingBag },
  { value: "200+", label: "Hands-on Tests", icon: Sparkles },
  { value: "40", label: "Price History (Days)", icon: BatteryCharging },
];

function guideAnchor(value: string) {
  return value.toLowerCase().replaceAll("&", "and").replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="flex min-h-16 w-full items-center gap-5 px-5 sm:px-8">
        <Link className="flex shrink-0 items-center gap-3" href="/" aria-label="IsItABuy home">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--isitabuy-green)] text-white shadow-sm">
            <ShoppingBag className="size-5" aria-hidden="true" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-[var(--isitabuy-green)]">IsItABuy</span>
        </Link>

        <div className="relative mx-auto hidden max-w-[760px] flex-1 md:block">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-10 rounded-lg border-border bg-white pl-12 text-sm font-medium shadow-sm"
            placeholder="Search for products, categories, or deals..."
          />
        </div>

        <Button asChild className="hidden h-10 rounded-lg bg-accent px-8 font-bold text-white hover:bg-[var(--isitabuy-orange-dark)] md:inline-flex">
          <Link href="/deals">Search</Link>
        </Button>

        <div className="ml-auto flex items-center gap-5 text-sm font-semibold">
          <Link className="hidden items-center gap-2 sm:flex" href="/dashboard/saved">
            <Heart className="size-5" />
            Saved
          </Link>
          <Link href="/dashboard/alerts" aria-label="Price alerts">
            <Bell className="size-5" />
          </Link>
          <Link className="flex items-center gap-2" href="/dashboard/settings" aria-label="Dashboard settings">
            <span className="grid size-9 place-items-center rounded-full bg-muted">
              <User className="size-5" />
            </span>
            <ChevronDown className="size-4" />
          </Link>
        </div>
      </div>

      <nav className="grid h-12 w-full grid-cols-[repeat(10,minmax(0,1fr))] items-center overflow-x-auto border-t border-border px-5 text-sm font-bold sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => (
          <Link className="flex h-12 min-w-0 items-center justify-center px-2 text-foreground" href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
        <Link className="flex h-12 items-center justify-center gap-1 px-2 font-bold" href={homeSectionHrefs.categories}>
          More <ChevronDown className="size-4" />
        </Link>
      </nav>
    </header>
  );
}

function ProductCard({ headphone }: { headphone: (typeof headphones)[number] }) {
  return (
    <Card id={guideAnchor(headphone.tag)} className="scroll-mt-32 rounded-xl border border-border bg-white p-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between">
        <Badge className={`h-6 rounded-md px-2 text-[10px] font-bold uppercase ${headphone.tagClass}`}>
          {headphone.tag}
        </Badge>
        <div className={`grid size-12 place-items-center rounded-full border-2 bg-white ${headphone.scoreClass}`}>
          <span className="text-lg font-bold leading-none">{headphone.score}</span>
          <span className="-mt-1 text-[9px] font-semibold text-foreground/70">/100</span>
        </div>
      </div>
      <div className="grid h-32 place-items-center overflow-hidden rounded-lg bg-gradient-to-b from-white to-[#f8fafc]">
        <img alt={headphone.name} className="max-h-28 w-full object-contain mix-blend-multiply" src={headphone.image} />
      </div>
      <h3 className="line-clamp-1 text-base font-bold text-foreground">{headphone.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{headphone.price}</span>
        <span className="text-xs font-semibold text-muted-foreground line-through">{headphone.oldPrice}</span>
        <Badge className="h-5 rounded bg-soft-buy px-2 text-[10px] font-bold text-buy">{headphone.discount}</Badge>
      </div>
      <Button asChild variant="outline" className="h-9 w-full rounded-md border-value/45 text-xs font-bold text-value">
        <Link href={`/redirect?retailer=amazon&product=${guideAnchor(headphone.name)}`}>
          View on Amazon
        </Link>
      </Button>
    </Card>
  );
}

export default function BuyGuidePage() {
  return (
    <div className="min-h-screen bg-[#fbfcff] text-foreground">
      <Header />

      <main className="px-5 py-4 sm:px-8">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Link href="/">Home</Link>
          <ChevronRight className="size-4 text-muted-foreground" />
          <span>Best Products</span>
          <ChevronRight className="size-4 text-muted-foreground" />
          <span>Best Headphones</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="self-start rounded-xl border border-border bg-white p-4 shadow-soft lg:sticky lg:top-32">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">On This Page</h2>
            <div className="flex flex-col gap-3">
              {pageLinks.map(({ label, href, icon: Icon }) => (
                <a className="flex items-center gap-3 text-sm font-semibold text-foreground hover:text-value" href={href} key={label}>
                  <Icon className="size-4 text-value" />
                  {label}
                </a>
              ))}
            </div>

            <Separator className="my-5" />

            <div className="rounded-lg border border-border bg-[#fbf8ff] p-4">
              <p className="text-sm font-medium leading-6">
                We analyze thousands of data points to find the best products for you.
              </p>
              <a className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-value" href="#how-we-scored">
                How we test <ChevronRight className="size-4" />
              </a>
            </div>
          </aside>

          <section className="min-w-0">
            <section className="rounded-xl border border-border bg-[linear-gradient(135deg,#ffffff,#f3ecff)] p-8 shadow-soft">
              <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[1.05fr_320px_320px]">
                <div>
                  <Badge className="mb-4 h-6 rounded bg-soft-value px-3 text-[10px] font-bold uppercase text-value">
                    Buying Guide
                  </Badge>
                  <h1 className="max-w-xl text-4xl font-bold tracking-tight text-foreground">
                    Best Headphones of 2024
                  </h1>
                  <p className="mt-4 max-w-xl text-base font-medium leading-7 text-muted-foreground">
                    We analyzed 200+ headphones using real-world testing, review analysis, price history, and expert opinions to find the best options for every need and budget.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-5 text-xs font-semibold text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="size-4 text-value" /> Last updated: May 20, 2024
                    </span>
                    <span>Data from 45,000+ sources</span>
                  </div>
                </div>

                <div className="grid place-items-center">
                  <div className="grid size-60 place-items-center rounded-full bg-soft-value">
                    <img
                      alt="Black headphones"
                      className="max-h-56 w-full object-contain mix-blend-multiply"
                      src="https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=700"
                    />
                  </div>
                </div>

                <Card className="rounded-xl border border-border bg-white p-5 shadow-soft xl:col-span-2 2xl:col-span-1">
                  <h2 className="mb-4 text-base font-bold">What makes a great headphone?</h2>
                  <div className="flex flex-col gap-3 text-sm font-semibold text-foreground">
                    {[
                      "Excellent sound quality",
                      "Comfort for long listening",
                      "Good noise cancellation (if needed)",
                      "Reliable build quality",
                      "Great value for the price",
                    ].map((item) => (
                      <span className="flex items-center gap-2" key={item}>
                        <BadgeCheck className="size-4 text-value" />
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-5">
              {headphones.map((headphone) => (
                <ProductCard headphone={headphone} key={headphone.name} />
              ))}
            </section>

            <section id="comparison-table" className="mt-5 grid scroll-mt-32 gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
              <Card className="overflow-hidden rounded-xl border border-border bg-white p-0 shadow-soft">
                <div className="border-b border-border px-5 py-4">
                  <h2 className="text-base font-bold uppercase">How Top Headphones Compare</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[920px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-[#fbfcff]">
                        <th className="px-5 py-3 text-left font-bold">Feature</th>
                        {headphones.map((headphone) => (
                          <th className="px-5 py-3 text-left font-bold" key={headphone.name}>
                            {headphone.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["AI Buy Score", ...headphones.map((item) => `${item.score}/100`)],
                        ["Price", ...headphones.map((item) => item.price)],
                        ["Noise Cancellation", ...headphones.map((item) => item.noise)],
                        ["Sound Quality", ...headphones.map((item) => item.sound)],
                        ["Comfort", ...headphones.map((item) => item.comfort)],
                        ["Battery Life", ...headphones.map((item) => item.battery)],
                        ["Best For", ...headphones.map((item) => item.bestFor)],
                        ["Verdict", ...headphones.map((item) => item.verdict)],
                      ].map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, index) => (
                            <td className={`px-5 py-3 ${index === 0 ? "font-bold" : "font-semibold"}`} key={`${row[0]}-${cell}`}>
                              {row[0] === "Verdict" && index > 0 ? (
                                <Badge className={headphones[index - 1].verdictClass}>{cell}</Badge>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card id="how-we-scored" className="scroll-mt-32 rounded-xl border border-border bg-white p-5 shadow-soft">
                <h2 className="text-base font-bold uppercase">How We Scored</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
                  Our AI scoring system evaluates each headphone on 8 key factors using real data and expert insights.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {scoreWeights.map(([label, weight]) => (
                    <div className="flex items-center justify-between text-sm" key={label}>
                      <span className="font-semibold">{label}</span>
                      <span className="font-bold text-muted-foreground">{weight}</span>
                    </div>
                  ))}
                </div>
                <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-value" href={homeSectionHrefs.howItWorks}>
                  Learn more about our methodology <ChevronRight className="size-4" />
                </a>
              </Card>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1fr]">
              <Card id="faqs" className="scroll-mt-32 rounded-xl border border-border bg-white p-5 shadow-soft">
                <h2 className="mb-3 text-base font-bold uppercase">Frequently Asked Questions</h2>
                <div className="divide-y divide-border rounded-lg border border-border">
                  {faqs.map((faq) => (
                    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold" key={faq}>
                      {faq}
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-value" href="#faqs">
                  View all FAQs <ChevronRight className="size-4" />
                </a>
              </Card>

              <Card id="sources" className="scroll-mt-32 rounded-xl border border-border bg-white p-5 shadow-soft">
                <h2 className="text-base font-bold uppercase">Sources & Data</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                  We base our recommendations on 45,000+ trusted sources including retailer data, expert reviews, user reviews, and hands-on testing.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-5">
                  {sourceStats.map(({ value, label, icon: Icon }) => (
                    <div className="rounded-lg border border-border bg-[#fbfcff] p-3 text-center" key={label}>
                      <Icon className="mx-auto mb-2 size-5 text-value" />
                      <p className="text-sm font-bold">{value}</p>
                      <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-value" href="#sources">
                  See all sources and data <ChevronRight className="size-4" />
                </a>
              </Card>
            </section>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-soft-value px-5 py-4 text-sm font-semibold text-muted-foreground">
              <ShieldCheck className="size-5 text-value" />
              We may earn a commission from affiliate links. This helps support our free content at no extra cost to you.
              <a className="font-bold text-value" href={homeSectionHrefs.disclosure}>Learn more about our affiliate policy.</a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
