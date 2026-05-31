import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard, BentoGrid } from "@/components/ui/bento";
import ReceiptUploadPanel from "@/components/receipts/ReceiptUploadPanel";

export const metadata = {
  title: "Receipts - IsItABuy",
  description: "Upload receipts to track warranties, return windows, price drops, better alternatives, and savings with IsItABuy.",
};

const navItems = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Compare", href: "/compare" },
  { label: "Deals", href: "/deals" },
  { label: "Retailers", href: "/#retailers" },
  { label: "Receipts", href: "/receipts" },
] as const;

const valueCards = [
  {
    title: "Warranty tracking",
    body: "Keep coverage windows attached to the products you actually bought.",
    icon: ShieldCheck,
    metric: "9 tracked",
  },
  {
    title: "Return windows",
    body: "See what needs attention before a return deadline closes.",
    icon: RotateCcw,
    metric: "32 days",
  },
  {
    title: "Price drop recovery",
    body: "Catch meaningful price drops after purchase and know when to act.",
    icon: TrendingDown,
    metric: "$40 drop",
  },
  {
    title: "Better alternatives",
    body: "Use purchase history to compare what you bought against stronger options.",
    icon: Sparkles,
    metric: "1 found",
  },
  {
    title: "Savings history",
    body: "Build a private record of what IsItABuy helped you avoid overpaying.",
    icon: BadgeDollarSign,
    metric: "$312 saved",
  },
] as const;

const workflow = [
  { step: "01", title: "Upload receipt", body: "Add an image or PDF from a retailer order.", icon: Upload },
  { step: "02", title: "Extract items", body: "IsItABuy reads items, dates, prices, and stores.", icon: FileCheck2 },
  { step: "03", title: "Match products", body: "Items connect to product pages and buy scores.", icon: ShoppingBag },
  { step: "04", title: "Track outcomes", body: "Warranties, returns, drops, and savings stay visible.", icon: CheckCircle2 },
] as const;

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="IsItABuy home">
      <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--brand-gradient)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-[var(--isitabuy-ink)]">IsItABuy</span>
    </Link>
  );
}

export default function ReceiptsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f6f1] text-[var(--isitabuy-ink)]">
      <header className="sticky top-0 z-40 border-b border-[#eadfce] bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <Logo />
          <div className="hidden items-center gap-7 text-xs font-bold text-[var(--isitabuy-ink)] lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap transition hover:-translate-y-px hover:text-[var(--isitabuy-orange)]"
                aria-current={item.href === "/receipts" ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden h-9 rounded-full px-4 text-xs font-black sm:inline-flex">
              <Link href="/signin">Log in</Link>
            </Button>
            <Button asChild className="h-9 rounded-full bg-[var(--isitabuy-orange)] px-4 text-xs font-black text-white hover:bg-[var(--isitabuy-orange-dark)]">
              <Link href="/dashboard/receipts">Upload</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:px-8 lg:py-12">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a6829]">Receipt intelligence</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Upload receipts. Let IsItABuy remember what you bought.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#75614a] sm:text-lg">
            IsItABuy turns receipts into a private purchase memory for warranties, return windows, price drops, better alternatives, and long-term savings.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full bg-[var(--isitabuy-orange)] px-6 text-sm font-black text-white shadow-[0_14px_28px_rgb(249_115_22/0.22)] hover:bg-[var(--isitabuy-orange-dark)]">
              <Link href="/dashboard/receipts">
                Upload in dashboard
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-[#dec9aa] bg-white px-6 text-sm font-black hover:bg-[#fff4df]">
              <Link href="/deals">Explore deals</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#75614a]">
            <LockKeyhole className="size-4 text-emerald-700" aria-hidden="true" />
            IsItABuy scores and recommendations are not based on commission.
          </div>
        </div>

        <ReceiptUploadPanel />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <BentoGrid className="xl:grid-cols-5">
          {valueCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <BentoCard key={card.title} featured={index === 0} variant={index === 2 ? "success" : index === 1 ? "warning" : "default"} className="min-h-52 p-5">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#fff4df] text-[#9a6829]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-numeric mt-5 text-3xl font-black">{card.metric}</p>
                <h2 className="mt-3 text-lg font-black">{card.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{card.body}</p>
              </BentoCard>
            );
          })}
        </BentoGrid>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a6829]">How it works</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">From receipt to purchase memory</h2>
          </div>
          <p className="max-w-lg text-sm font-semibold leading-6 text-[#75614a]">
            A receipt should not disappear in email. IsItABuy keeps the useful parts visible when a price, warranty, or return deadline matters.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {workflow.map((item) => {
            const Icon = item.icon;
            return (
              <BentoCard key={item.step} className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6829]">{item.step}</span>
                  <span className="grid size-10 place-items-center rounded-xl bg-[#fff4df] text-[#9a6829]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{item.body}</p>
              </BentoCard>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.45rem] border border-[#e8d8c0] bg-[linear-gradient(135deg,#fffdf8,#f7efe3)] p-5 shadow-[0_22px_60px_rgb(110_76_37/0.11)] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9a6829]">Ready when you are</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Get better recommendations with receipts.</h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#75614a]">
                Upload receipts so IsItABuy can track warranties, return windows, price drops, and better alternatives from the products you already bought.
              </p>
            </div>
            <div className="grid gap-2 sm:flex">
              <Button asChild className="h-11 rounded-full bg-[var(--isitabuy-orange)] px-5 text-sm font-black text-white hover:bg-[var(--isitabuy-orange-dark)]">
                <Link href="/dashboard/receipts">Upload in dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-[#dec9aa] bg-white px-5 text-sm font-black hover:bg-[#fff4df]">
                <Link href="/deals">Explore deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eadfce] bg-white/72 px-4 py-6 text-center text-xs font-bold text-[var(--isitabuy-muted)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span>IsItABuy receipt intelligence</span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4" aria-hidden="true" />
            Warranties, returns, drops, and savings in one place.
          </span>
        </div>
      </footer>
    </main>
  );
}
