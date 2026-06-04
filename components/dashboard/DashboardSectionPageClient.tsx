"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  Bell,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  Heart,
  Menu,
  PackageCheck,
  ReceiptText,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingDown,
  Upload,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { showCompareToast } from "@/components/ui/app-toast";
import {
  dashboardNavItems,
  dashboardUser,
  notifications,
  purchaseSummaries,
  savedProducts,
  smartActions,
  warrantySummaries,
  watchlistProducts,
} from "@/lib/mockDashboardData";
import { buildCompareUrl, buildProductUrl, formatDate, formatPrice, getStatusStyles, getVerdictStyles } from "@/lib/dashboardUtils";
import { buildReceiptRecord, formatReceiptDate, getReceiptDateString, hydrateReceiptRecords, isAllowedReceiptFile, receiptStoreOptions, saveReceiptRecord } from "@/lib/receiptRecords";
import { cn } from "@/lib/utils";
import type { ReceiptRecord, ReceiptUploadDraft } from "@/types/dashboard";

export const dashboardSectionKeys = ["saved", "watchlist", "alerts", "receipts", "compare-history", "chat", "settings"] as const;
export type DashboardSectionKey = (typeof dashboardSectionKeys)[number];

const sectionCopy: Record<DashboardSectionKey, { title: string; eyebrow: string; subtitle: string; icon: LucideIcon; metric: string }> = {
  saved: {
    title: "Saved Products",
    eyebrow: "Your private shortlist",
    subtitle: "Keep the products you are considering in one clean decision board.",
    icon: Heart,
    metric: `${savedProducts.length} saved`,
  },
  watchlist: {
    title: "Watchlist",
    eyebrow: "Price timing",
    subtitle: "Track target prices, buy scores, and products that are close to becoming worth it.",
    icon: Watch,
    metric: `${watchlistProducts.length} tracked`,
  },
  alerts: {
    title: "Price Alerts",
    eyebrow: "Live deal radar",
    subtitle: "Price drops, volatility warnings, and better-alternative alerts in one queue.",
    icon: Bell,
    metric: "14 active",
  },
  receipts: {
    title: "Receipts & Purchases",
    eyebrow: "Purchase memory",
    subtitle: "Review orders, warranties, savings, and return windows from uploaded receipts.",
    icon: ReceiptText,
    metric: `${purchaseSummaries.length} purchases`,
  },
  "compare-history": {
    title: "Compare History",
    eyebrow: "Decision trail",
    subtitle: "Your recent product comparisons and the verdict IsItABuy found for each one.",
    icon: TrendingDown,
    metric: "6 comparisons",
  },
  chat: {
    title: "AI Chat",
    eyebrow: "Ask IsItABuy",
    subtitle: "A focused shopping assistant for product questions, deal timing, and alternatives.",
    icon: Bot,
    metric: "Premium assistant",
  },
  settings: {
    title: "Settings",
    eyebrow: "Personalization",
    subtitle: "Manage alerts, recommendation preferences, receipt tracking, and account defaults.",
    icon: Settings,
    metric: "Premium plan",
  },
};

function notify(title: string, description: string) {
  showCompareToast(title, description);
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="IsItABuy home">
      <span className="grid size-9 place-items-center rounded-2xl bg-[image:var(--brand-gradient)] text-white shadow-sm">
        <ShoppingBag className="size-4" aria-hidden="true" />
      </span>
      <span className="text-xl font-bold tracking-tight text-[var(--isitabuy-ink)]">IsItABuy</span>
    </Link>
  );
}

function SectionSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 px-2 pb-5">
        <Logo />
      </div>
      <nav className="grid shrink-0 gap-1" aria-label="Dashboard">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "h-11 justify-start rounded-xl px-3 text-sm font-bold",
                active ? "bg-[var(--isitabuy-green-soft)] text-emerald-700 hover:bg-[var(--isitabuy-green-soft)]" : "text-[var(--isitabuy-muted)] hover:bg-slate-50 hover:text-[var(--isitabuy-ink)]",
              )}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              <Link href={item.href}>
                <Icon className="size-4" aria-hidden="true" />
                <span className="min-w-0 truncate">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="mt-4 shrink-0 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-3 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm">
            <BadgeDollarSign className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-emerald-700">Total Saved</p>
            <p className="font-numeric mt-0.5 text-2xl font-bold text-[var(--isitabuy-ink)]">$312.45</p>
            <p className="mt-0.5 text-[0.68rem] font-bold leading-4 text-emerald-800/80">Across tracked purchases</p>
          </div>
        </div>
      </div>
      <div className="mt-auto shrink-0 rounded-2xl border border-brand-amber/25 bg-[linear-gradient(135deg,#fffaf1,#f4e8d6)] p-4 shadow-[0_14px_34px_rgb(105_72_34/0.08)]">
        <p className="text-sm font-bold">Premium protection</p>
        <p className="mt-2 text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">Alerts, warranties, and better alternatives stay organized here.</p>
      </div>
    </div>
  );
}

export default function DashboardSectionPageClient({ section }: { section: DashboardSectionKey }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");
  const copy = sectionCopy[section];
  const Icon = copy.icon;

  const runSearch = (value = query) => {
    const trimmed = value.trim();
    if (!trimmed) {
      notify("Enter something to search", "Try a product, store, category, or pasted product URL.");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const navigate = (href: string) => {
    router.push(href);
  };

  const quickStats = useMemo(() => {
    if (section === "saved") return [{ label: "Buy verdicts", value: "2" }, { label: "Wait verdicts", value: "2" }, { label: "Avg score", value: "80" }];
    if (section === "watchlist") return [{ label: "Close to target", value: "1" }, { label: "Avg score", value: "77" }, { label: "Tracked value", value: "$1.3k" }];
    if (section === "alerts") return [{ label: "Triggered today", value: "2" }, { label: "Active alerts", value: "14" }, { label: "Best drop", value: "$40" }];
    if (section === "receipts") return [{ label: "Total saved", value: "$312" }, { label: "Warranties", value: "9" }, { label: "Needs review", value: "1" }];
    if (section === "compare-history") return [{ label: "Recent compares", value: "6" }, { label: "Better alternatives", value: "3" }, { label: "Avg confidence", value: "86%" }];
    if (section === "chat") return [{ label: "Saved context", value: "27" }, { label: "Receipts read", value: "18" }, { label: "Mode", value: "Smart" }];
    return [{ label: "Plan", value: "Premium" }, { label: "Alerts", value: "On" }, { label: "Privacy", value: "Strong" }];
  }, [section]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-[var(--isitabuy-ink)]">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-50 hidden h-screen max-h-screen w-[240px] shrink-0 overflow-hidden border-r border-[var(--isitabuy-line)] bg-white/96 px-3 py-4 shadow-sm lg:block">
          <SectionSidebar />
        </aside>
        <div className="min-w-0 flex-1 lg:pl-[240px]">
          <header className="sticky top-0 z-40 border-b border-[var(--isitabuy-line)] bg-white/92 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:px-8">
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <Logo />
                <Button variant="outline" size="icon" onClick={() => setMobileSidebarOpen(true)} aria-label="Open dashboard navigation">
                  <Menu className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-1 shadow-[var(--compare-input-shadow)]">
                  <div className="relative min-w-0 flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--isitabuy-muted)]" aria-hidden="true" />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") runSearch();
                      }}
                      placeholder="Search products, categories, stores, or paste a link..."
                      className="h-10 rounded-xl border-transparent bg-white pl-9 text-xs font-semibold shadow-none focus-visible:ring-[var(--isitabuy-orange)] sm:text-sm"
                      aria-label="Search IsItABuy"
                    />
                  </div>
                  <Button className="h-10 rounded-xl bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)] sm:px-5" onClick={() => runSearch()}>
                    Search
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-2 lg:justify-end">
                  <Button variant="ghost" className="h-10 gap-2 rounded-full px-3 text-xs font-bold" onClick={() => navigate("/dashboard/saved")}>
                    <Heart className="size-4" aria-hidden="true" />
                    Saved
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-lg" className="relative rounded-full" aria-label="Open notifications">
                        <Bell className="size-4" aria-hidden="true" />
                        {!notificationsRead ? <span className="absolute right-1 top-1 size-2.5 rounded-full bg-[var(--isitabuy-orange)] ring-2 ring-white" /> : null}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[min(22rem,calc(100vw-2rem))] p-2">
                      <div className="flex items-center justify-between gap-3 px-2 py-2">
                        <p className="text-sm font-bold">Notifications</p>
                        <Button variant="ghost" size="sm" className="h-7 rounded-full text-xs font-bold" onClick={() => setNotificationsRead(true)}>
                          Mark all read
                        </Button>
                      </div>
                      {notifications.map((item) => (
                        <div key={item.id} className="rounded-xl p-2 hover:bg-slate-50">
                          <p className="text-sm font-bold">{item.title}</p>
                          <p className="mt-1 text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">{item.description}</p>
                          <Button variant="outline" size="sm" className="mt-2 h-8 rounded-full text-xs font-bold" onClick={() => item.route ? navigate(item.route) : notify(item.title, item.description)}>
                            View
                          </Button>
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 gap-2 rounded-full px-2" aria-label="Open account menu">
                        <Avatar size="lg" className="size-9">
                          <AvatarFallback className="bg-[var(--isitabuy-green-soft)] text-sm font-bold text-emerald-700">{dashboardUser.initials}</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="size-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-2">
                        <p className="text-sm font-bold">{dashboardUser.name}</p>
                        <p className="text-xs font-semibold text-[var(--isitabuy-muted)]">{dashboardUser.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => notify("Profile", "Profile controls will be connected later.")}>Profile</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate("/dashboard/settings")}>Settings</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => notify("Billing / Plan", "Billing controls will live inside Settings later.")}>Billing / Plan</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => notify("Signed out in demo mode.", "Authentication is not connected in this prototype.")}>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-5 sm:px-5 lg:px-8 lg:py-6">
            <section className="overflow-hidden rounded-[1.45rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--card)_0%,var(--soft-wait)_52%,var(--card)_100%)] p-5 shadow-[0_22px_60px_rgb(110_76_37/0.11)] sm:p-6">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{copy.eyebrow}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.title}</h1>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-muted-foreground">{copy.subtitle}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[28rem]">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-brand-amber/25 bg-white/82 p-4 shadow-sm">
                      <p className="font-numeric text-2xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-xs font-bold text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {section === "saved" ? <SavedSection runSearch={runSearch} /> : null}
            {section === "watchlist" ? <WatchlistSection /> : null}
            {section === "alerts" ? <AlertsSection /> : null}
            {section === "receipts" ? <ReceiptsSection /> : null}
            {section === "compare-history" ? <CompareHistorySection /> : null}
            {section === "chat" ? <ChatSection prompt={chatPrompt} setPrompt={setChatPrompt} runSearch={runSearch} /> : null}
            {section === "settings" ? <SettingsSection /> : null}

            <div className="flex items-center gap-2 rounded-2xl border border-[var(--isitabuy-line)] bg-white px-4 py-3 text-xs font-bold text-[var(--isitabuy-muted)]">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Scores and recommendations are not based on commission.
            </div>
          </main>
        </div>
      </div>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[290px] overflow-hidden bg-white p-4">
          <SheetHeader className="sr-only">
            <SheetTitle>Dashboard navigation</SheetTitle>
            <SheetDescription>Navigate between IsItABuy dashboard sections.</SheetDescription>
          </SheetHeader>
          <SectionSidebar onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SavedSection({ runSearch }: { runSearch: (value?: string) => void }) {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.45fr)]">
      <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
        <CardContent className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {savedProducts.map((product) => (
            <Link key={product.id} href={buildProductUrl(product.slug)} className="group rounded-2xl border border-[var(--isitabuy-line)] p-3 transition hover:-translate-y-0.5 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)]">
              <span className="relative grid aspect-square place-items-center overflow-hidden rounded-2xl bg-slate-50 text-[var(--isitabuy-purple)]">
                {product.imageSrc ? <Image src={product.imageSrc} alt="" fill sizes="180px" className="object-contain p-3" /> : <PackageCheck className="size-8" aria-hidden="true" />}
              </span>
              <Badge className={cn("mt-3 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold", getVerdictStyles(product.verdict))}>{product.verdict}</Badge>
              <h2 className="mt-2 line-clamp-2 text-sm font-bold">{product.name}</h2>
              <p className="font-numeric mt-1 text-sm font-bold text-[var(--isitabuy-muted)]">{formatPrice(product.currentPrice)} · Score {product.aiBuyScore}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
      <PremiumAside title="Saved logic" body="IsItABuy keeps saved products commission-blind, sorted by verdict, timing, and price movement." action="Find similar products" onClick={() => runSearch("products similar to my saved list")} />
    </section>
  );
}

function WatchlistSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {watchlistProducts.map((product) => (
        <Card key={product.id} className="rounded-[1.35rem] border border-brand-amber/25 bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)]">
          <CardContent className="p-5">
            <Badge className={cn("rounded-full border text-[0.68rem] font-bold", getStatusStyles(product.status))}>{product.status}</Badge>
            <h2 className="mt-4 text-xl font-bold">{product.name}</h2>
            <p className="font-numeric mt-3 text-3xl font-bold">{formatPrice(product.currentPrice)}</p>
            <p className="font-numeric mt-1 text-sm font-semibold text-[var(--isitabuy-muted)]">Target {formatPrice(product.targetPrice)}</p>
            <div className="mt-5 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${product.aiBuyScore}%` }} />
            </div>
            <div className="mt-5 flex gap-2">
              <Button asChild className="h-9 rounded-full bg-[var(--isitabuy-orange)] text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]">
                <Link href={buildProductUrl(product.slug)}>View</Link>
              </Button>
              <Button variant="outline" className="h-9 rounded-full text-xs font-bold" onClick={() => notify("Alert draft opened", `IsItABuy would create a target alert for ${product.name}.`)}>
                Track price
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function AlertsSection() {
  return (
    <section className="grid gap-3 xl:grid-cols-2">
      {smartActions.filter((action) => action.type === "price-drop" || action.type === "alert-suggestion" || action.type === "better-alternative").map((action) => (
        <Card key={action.id} className="rounded-[1.35rem] border border-brand-amber/25 bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)]">
          <CardContent className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Alert intelligence</p>
            <h2 className="mt-3 text-xl font-bold">{action.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{action.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild className="h-9 rounded-full bg-[var(--isitabuy-orange)] text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]">
                <Link href={action.productSlug ? buildProductUrl(action.productSlug) : "/search"}>View</Link>
              </Button>
              <Button variant="outline" className="h-9 rounded-full text-xs font-bold" onClick={() => notify("Alert saved", "IsItABuy saved this alert preference in demo mode.")}>
                Save alert
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function ReceiptsSection() {
  const [receiptRecords, setReceiptRecords] = useState<ReceiptRecord[]>(() => hydrateReceiptRecords().value);
  const [activeFilter, setActiveFilter] = useState<"all" | "review" | "warranties" | "returns">("all");
  const [draft, setDraft] = useState<ReceiptUploadDraft>({ store: "Target", purchaseDate: getReceiptDateString(-3), notes: "" });
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    const hydrated = hydrateReceiptRecords();
    queueMicrotask(() => {
      setReceiptRecords(hydrated.value);
      if (hydrated.recovered) {
        notify("Receipt data recovered", "Older demo receipt data was upgraded for the new dashboard view.");
      }
    });
  }, []);

  const stats = useMemo(() => ({
    saved: receiptRecords.reduce((total, receipt) => total + receipt.savingsFound, 0),
    warranties: receiptRecords.reduce((total, receipt) => total + receipt.warrantiesTracked, 0),
    returns: receiptRecords.reduce((total, receipt) => total + receipt.returnAlerts, 0),
    review: receiptRecords.filter((receipt) => receipt.status === "ready").length,
  }), [receiptRecords]);

  const returnWindows = receiptRecords.flatMap((receipt) =>
    receipt.items
      .filter((item) => item.returnWindowDays)
      .map((item) => ({ ...item, store: receipt.store, receiptId: receipt.id })),
  );
  const warranties = receiptRecords.flatMap((receipt) =>
    receipt.items
      .filter((item) => item.warrantyStatus !== "none")
      .map((item) => ({ ...item, store: receipt.store, receiptId: receipt.id })),
  );
  const reviewQueue = receiptRecords.filter((receipt) => receipt.status === "ready" || receipt.status === "protected");
  const filteredRecords = useMemo(() => {
    if (activeFilter === "review") return receiptRecords.filter((receipt) => receipt.status === "ready");
    if (activeFilter === "warranties") return receiptRecords.filter((receipt) => receipt.warrantiesTracked > 0);
    if (activeFilter === "returns") return receiptRecords.filter((receipt) => receipt.returnAlerts > 0);
    return receiptRecords;
  }, [activeFilter, receiptRecords]);

  const updateDraft = (patch: Partial<ReceiptUploadDraft>) => setDraft((current) => ({ ...current, ...patch }));

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      updateDraft({ fileName: undefined });
      return;
    }

    if (!isAllowedReceiptFile(file)) {
      event.target.value = "";
      updateDraft({ fileName: undefined });
      notify("Unsupported receipt file", "Upload an image or PDF receipt.");
      return;
    }

    updateDraft({ fileName: file.name });
  };

  const submitReceipt = (useDemo: boolean) => {
    if (!useDemo && !draft.fileName) {
      notify("Choose a receipt file", "Upload an image or PDF receipt, or use the demo receipt.");
      return;
    }

    const result = saveReceiptRecord(buildReceiptRecord(draft, useDemo));
    setReceiptRecords(result.value);
    setDraft({ store: draft.store, purchaseDate: getReceiptDateString(-3), notes: "" });
    setFileInputKey((value) => value + 1);
    setActiveFilter("all");
    notify(
      useDemo ? "Demo receipt processed" : "Receipt processed",
      result.recovered
        ? "Receipt is visible for this session, but browser storage did not persist it."
        : `${draft.store} receipt was added to the ledger, review queue, returns, and warranties.`,
    );
  };

  const filters = [
    { label: "All", value: "all" as const, count: receiptRecords.length },
    { label: "Needs review", value: "review" as const, count: stats.review },
    { label: "Warranties", value: "warranties" as const, count: warranties.length },
    { label: "Returns", value: "returns" as const, count: returnWindows.length },
  ];
  const quickDateOptions = [
    { label: "Today", value: getReceiptDateString(0) },
    { label: "Yesterday", value: getReceiptDateString(-1) },
    { label: "Last week", value: getReceiptDateString(-7) },
  ];

  return (
    <section className="grid gap-5">
      <section className="grid gap-4 xl:grid-cols-12">
        <Card className="overflow-hidden rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--card),var(--soft-wait))] shadow-[0_20px_48px_rgb(105_72_34/0.1)] xl:col-span-7">
          <CardContent className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="flex min-w-0 flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Receipt inbox</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight">Upload receipts here. The dashboard updates immediately.</h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
                Add an image or PDF, then IsItABuy turns it into ledger rows, review tasks, return windows, warranty tracking, and savings signals.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-muted-foreground" htmlFor="dashboard-receipt-file">Receipt file</label>
                  <Input
                    key={fileInputKey}
                    id="dashboard-receipt-file"
                    type="file"
                    accept="image/*,application/pdf"
                    className="mt-1 h-11 rounded-xl border-brand-amber/35 bg-white text-xs font-semibold shadow-sm file:mr-3 file:rounded-lg file:border-0 file:bg-soft-wait file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent"
                    onChange={handleFileChange}
                  />
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">{draft.fileName ?? "Image or PDF receipt"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground" htmlFor="dashboard-receipt-store">Store</label>
                  <Select
                    value={draft.store}
                    onValueChange={(value) => updateDraft({ store: value })}
                  >
                    <SelectTrigger
                      id="dashboard-receipt-store"
                      className="mt-1 h-11 w-full min-w-0 rounded-xl border-brand-amber/35 bg-white px-3 text-sm font-semibold shadow-sm focus-visible:border-[var(--isitabuy-orange)] focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
                      style={{ width: "100%", height: "2.75rem" }}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Store className="size-4 shrink-0 text-accent" aria-hidden="true" />
                        <SelectValue placeholder="Choose store" />
                      </span>
                    </SelectTrigger>
                    <SelectContent position="popper" align="start" className="rounded-xl border border-brand-amber/25 bg-white p-1 shadow-[0_18px_38px_rgb(105_72_34/0.14)]">
                      {receiptStoreOptions.map((store) => (
                        <SelectItem key={store} value={store} className="rounded-lg py-2 text-sm font-semibold focus:bg-soft-wait focus:text-[var(--isitabuy-ink)]">
                          {store}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground" htmlFor="dashboard-receipt-date">Purchase date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        id="dashboard-receipt-date"
                        type="button"
                        className="mt-1 flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-brand-amber/35 bg-white px-3 text-left text-sm font-semibold shadow-sm outline-none transition hover:border-[var(--isitabuy-orange)] hover:bg-white focus-visible:border-[var(--isitabuy-orange)] focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <CalendarDays className="size-4 shrink-0 text-accent" aria-hidden="true" />
                          <span className="whitespace-nowrap">{formatReceiptDate(draft.purchaseDate)}</span>
                        </span>
                        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto rounded-2xl border border-brand-amber/25 bg-white p-3 shadow-[0_18px_44px_rgb(105_72_34/0.16)]">
                      <div className="flex items-center gap-2 rounded-xl bg-soft-wait px-3 py-2 text-sm font-semibold text-[var(--isitabuy-ink)]">
                        <CalendarDays className="size-4 text-accent" aria-hidden="true" />
                        Purchase Date
                      </div>
                      <Calendar
                        className="mt-3"
                        mode="single"
                        selected={draft.purchaseDate ? new Date(`${draft.purchaseDate}T12:00:00Z`) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, "0");
                            const day = String(date.getDate()).padStart(2, "0");
                            updateDraft({ purchaseDate: `${year}-${month}-${day}` });
                          }
                        }}
                      />
                      <div className="mt-3 grid gap-2">
                        {quickDateOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="flex h-9 items-center justify-between rounded-xl border border-transparent px-3 text-left text-xs font-semibold text-muted-foreground transition hover:border-brand-amber/30 hover:bg-soft-wait hover:text-[var(--isitabuy-ink)]"
                            onClick={() => updateDraft({ purchaseDate: option.value })}
                          >
                            <span>{option.label}</span>
                            <span className="font-medium">{formatReceiptDate(option.value)}</span>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground" htmlFor="dashboard-receipt-notes">Notes</label>
                  <Textarea id="dashboard-receipt-notes" value={draft.notes} onChange={(event) => updateDraft({ notes: event.target.value })} placeholder="Optional purchase note..." className="mt-1 min-h-11 rounded-xl border-brand-amber/35 bg-white text-sm font-semibold" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button className="h-10 rounded-full bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => submitReceipt(false)}>
                  <Upload className="size-4" aria-hidden="true" />
                  Upload receipt
                </Button>
                <Button variant="outline" className="h-10 rounded-full border-brand-amber/35 bg-white px-4 text-xs font-bold hover:bg-soft-wait" onClick={() => submitReceipt(true)}>
                  Use demo receipt
                </Button>
              </div>
            </div>
            <div className="grid rounded-[1.15rem] border border-dashed border-brand-amber/35 bg-white/78 p-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ReceiptText className="size-5" aria-hidden="true" />
              </span>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-brand-amber/25 bg-soft-wait p-3">
                  <p className="text-xs font-bold text-muted-foreground">Latest receipt</p>
                  <p className="mt-1 font-bold">{receiptRecords[0]?.store ?? "No receipt"} - {receiptRecords[0] ? formatReceiptDate(receiptRecords[0].purchaseDate) : "Upload first"}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-brand-amber/25 bg-white p-3">
                    <p className="font-numeric text-xl font-bold">{receiptRecords[0]?.itemCount ?? 0}</p>
                    <p className="text-[0.68rem] font-bold text-[var(--isitabuy-muted)]">Items extracted</p>
                  </div>
                  <div className="rounded-2xl border border-brand-amber/25 bg-white p-3">
                    <p className="font-numeric text-xl font-bold">{formatPrice(receiptRecords[0]?.savingsFound ?? 0)}</p>
                    <p className="text-[0.68rem] font-bold text-[var(--isitabuy-muted)]">Savings found</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-white shadow-sm xl:col-span-5">
          <CardContent className="grid h-full gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Needs attention</p>
                <h2 className="mt-2 text-2xl font-bold">{stats.review} receipt{stats.review === 1 ? "" : "s"} ready</h2>
              </div>
              <span className="grid size-10 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <FileCheck2 className="size-5" aria-hidden="true" />
              </span>
            </div>
            {reviewQueue.slice(0, 2).map((receipt) => (
              <button key={receipt.id} type="button" onClick={() => notify(`${receipt.store} receipt`, `${receipt.itemCount} items are ready in this dashboard.`)} className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-left transition hover:bg-soft-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold">{receipt.store} receipt</p>
                  <ReceiptStatusBadge status={receipt.status} />
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">{receipt.itemCount} items extracted. {receipt.warrantiesTracked} warranties and {receipt.returnAlerts} return alerts tracked.</p>
              </button>
            ))}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Total saved", value: formatPrice(stats.saved) },
                { label: "Warranties", value: String(stats.warranties) },
                { label: "Return alerts", value: String(stats.returns) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--isitabuy-line)] bg-card p-3">
                  <p className="font-numeric text-xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-[0.68rem] font-bold leading-4 text-[var(--isitabuy-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.46fr)]">
        <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
          <CardContent className="grid gap-3 p-5 sm:p-6">
            <div className="mb-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Receipt ledger</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--isitabuy-muted)]">Purchases linked to savings, warranties, returns, and product verdicts.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button key={filter.value} type="button" onClick={() => setActiveFilter(filter.value)} className={cn("h-9 rounded-full border px-3 text-xs font-bold transition", activeFilter === filter.value ? "border-brand-amber/50 bg-soft-wait text-accent" : "border-[var(--isitabuy-line)] bg-white text-[var(--isitabuy-muted)] hover:bg-soft-wait")}>
                    {filter.label} - {filter.count}
                  </button>
                ))}
              </div>
            </div>
            {filteredRecords.map((receipt) => {
              const paidTotal = receipt.items.reduce((total, item) => total + item.paidPrice, 0);
              const primaryItem = receipt.items[0];

              return (
                <div key={receipt.id} className="grid gap-4 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-amber/35 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)] lg:grid-cols-[minmax(0,1.35fr)_0.7fr_0.7fr_auto] lg:items-center">
                  <div className="min-w-0">
                    <h2 className="truncate font-bold">{receipt.store} receipt</h2>
                    <p className="mt-1 text-sm font-semibold text-[var(--isitabuy-muted)]">{receipt.fileName} - {formatReceiptDate(receipt.purchaseDate)} - {receipt.itemCount} items</p>
                    {receipt.notes ? <p className="mt-1 line-clamp-1 text-xs font-semibold text-[var(--isitabuy-muted)]">{receipt.notes}</p> : null}
                  </div>
                  <div className="rounded-2xl border border-brand-amber/25 bg-card px-3 py-2">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent">Paid</p>
                    <p className="font-numeric mt-1 text-sm font-bold">{formatPrice(paidTotal)}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-emerald-700">Saved</p>
                    <p className="font-numeric mt-1 text-sm font-bold text-emerald-700">{formatPrice(receipt.savingsFound)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <ReceiptStatusBadge status={receipt.status} />
                    {primaryItem ? (
                      <Button asChild variant="outline" className="h-9 rounded-full text-xs font-bold">
                        <Link href={buildProductUrl(primaryItem.productSlug)}>Product</Link>
                      </Button>
                    ) : null}
                    <Button variant="outline" className="h-9 rounded-full text-xs font-bold" onClick={() => notify(`${receipt.store} receipt`, `${receipt.itemCount} items, ${receipt.warrantiesTracked} warranties, ${receipt.returnAlerts} return alerts.`)}>
                      Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--soft-wait),var(--card))] shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Review queue</h2>
                <FileCheck2 className="size-5 text-accent" aria-hidden="true" />
              </div>
              <div className="mt-4 grid gap-3">
                {reviewQueue.map((receipt) => (
                  <button key={receipt.id} type="button" onClick={() => notify(`${receipt.store} receipt`, `${receipt.itemCount} extracted items are ready in demo mode.`)} className="rounded-2xl border border-brand-amber/25 bg-white/82 p-3 text-left transition hover:bg-soft-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
                    <p className="font-bold">{receipt.store} receipt</p>
                    <p className="mt-1 text-xs font-bold text-[var(--isitabuy-muted)]">{receipt.itemCount} items - {receipt.warrantiesTracked} warranties linked</p>
                    <ReceiptStatusBadge status={receipt.status} className="mt-3" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Return windows</h2>
                <RotateCcw className="size-5 text-amber-600" aria-hidden="true" />
              </div>
              <div className="mt-4 grid gap-3">
                {returnWindows.map((item) => (
                  <button key={`${item.receiptId}-${item.id}`} type="button" onClick={() => notify("Return reminder", `${item.productName} has ${item.returnWindowDays} days left.`)} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--isitabuy-line)] p-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold">{item.productName}</span>
                      <span className="mt-1 block text-xs font-semibold text-[var(--isitabuy-muted)]">{item.store}</span>
                    </span>
                    <span className="font-numeric shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{item.returnWindowDays} days</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--soft-wait),var(--card))] shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Warranty tracker</h2>
                <Clock3 className="size-5 text-accent" aria-hidden="true" />
              </div>
              <div className="mt-4 grid gap-3">
                {warranties.map((item) => (
                  <Link key={`${item.receiptId}-${item.id}`} href={buildProductUrl(item.productSlug)} className="rounded-2xl border border-brand-amber/25 bg-white/82 p-3 transition hover:bg-soft-wait">
                    <p className="font-bold">{item.productName}</p>
                    <p className="mt-1 text-xs font-bold text-[var(--isitabuy-muted)]">{item.warrantyStatus === "expiring" ? "Expiring soon" : "Warranty active"} - {item.store}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
}

function ReceiptStatusBadge({ status, className }: { status: ReceiptRecord["status"]; className?: string }) {
  const label = status === "ready" ? "Ready for review" : status === "protected" ? "Protected" : "Matched";

  return (
    <Badge
      className={cn(
        "rounded-full border",
        status === "ready" && "border-amber-200 bg-amber-50 text-amber-700",
        status === "protected" && "border-emerald-200 bg-emerald-50 text-emerald-700",
        status === "matched" && "border-blue-200 bg-blue-50 text-blue-700",
        className,
      )}
    >
      {label}
    </Badge>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LegacyReceiptsSection() {
  const reviewQueue = [
    { title: "Target receipt", detail: "5 items extracted", status: "Ready for review", tone: "border-amber-200 bg-amber-50 text-amber-700" },
    { title: "Amazon order", detail: "2 warranties linked", status: "Protected", tone: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  ];
  const returnWindows = [
    { title: "Nike Air Zoom Pegasus 41", store: "Nike", days: 17 },
    { title: "Ninja Coffee Maker", store: "Walmart", days: 32 },
  ];
  const saveDemoReceipt = () => {
    if (typeof window === "undefined") {
      notify("Demo receipt ready", "Receipt processing is available in the browser.");
      return;
    }

    try {
      const key = "isitabuy.dashboard.receipts";
      const stored = window.localStorage.getItem(key);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      const receiptIds = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
      const nextReceiptIds = Array.from(new Set([...receiptIds, "receipt-target-2024-05-20"]));
      window.localStorage.setItem(key, JSON.stringify(nextReceiptIds));
      notify("Demo receipt added", "Target receipt is ready for review in this dashboard.");
    } catch {
      notify("Demo receipt ready", "Your browser blocked saving, so IsItABuy kept this receipt in demo mode.");
    }
  };

  return (
    <section className="grid gap-5">
      <section className="grid gap-4 xl:grid-cols-12">
        <Card className="overflow-hidden rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--card),var(--soft-wait))] shadow-[0_20px_48px_rgb(105_72_34/0.1)] xl:col-span-7">
          <CardContent className="grid min-h-[19rem] gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="flex min-w-0 flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Receipt inbox</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight">Upload once. IsItABuy tracks the rest.</h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-muted-foreground">
                Add a receipt to extract items, link product verdicts, watch return windows, and keep warranties from getting buried.
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <Button asChild className="h-10 rounded-full bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]">
                  <Link href="/receipts">Upload receipt</Link>
                </Button>
                <Button variant="outline" className="h-10 rounded-full border-brand-amber/35 bg-white px-4 text-xs font-bold hover:bg-soft-wait" onClick={saveDemoReceipt}>
                  Use demo receipt
                </Button>
              </div>
            </div>
            <div className="grid rounded-[1.15rem] border border-dashed border-brand-amber/35 bg-white/78 p-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Upload className="size-5" aria-hidden="true" />
              </span>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-brand-amber/25 bg-soft-wait p-3">
                  <p className="text-xs font-bold text-muted-foreground">Next receipt</p>
                  <p className="mt-1 font-bold">Image or PDF</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl border border-brand-amber/25 bg-white p-3">
                    <p className="font-numeric text-xl font-bold">5</p>
                    <p className="text-[0.68rem] font-bold text-[var(--isitabuy-muted)]">Items extracted</p>
                  </div>
                  <div className="rounded-2xl border border-brand-amber/25 bg-white p-3">
                    <p className="font-numeric text-xl font-bold">$22</p>
                    <p className="text-[0.68rem] font-bold text-[var(--isitabuy-muted)]">Savings found</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-white shadow-sm xl:col-span-5">
          <CardContent className="grid h-full gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Needs attention</p>
                <h2 className="mt-2 text-2xl font-bold">1 receipt is ready</h2>
              </div>
              <span className="grid size-10 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <FileCheck2 className="size-5" aria-hidden="true" />
              </span>
            </div>
            <button type="button" onClick={() => notify("Target receipt", "Receipt review will open here in demo mode.")} className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-left transition hover:bg-soft-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold">Target receipt</p>
                <Badge className="rounded-full border border-amber-200 bg-white text-amber-700">Ready for review</Badge>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">5 items extracted. Confirm matches to unlock savings suggestions.</p>
            </button>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Total saved", value: "$312" },
                { label: "Warranties", value: "9" },
                { label: "Return alerts", value: "2" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--isitabuy-line)] bg-card p-3">
                  <p className="font-numeric text-xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-[0.68rem] font-bold leading-4 text-[var(--isitabuy-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.46fr)]">
      <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
        <CardContent className="grid gap-3 p-5 sm:p-6">
          <div className="mb-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Receipt ledger</h2>
              <p className="mt-1 text-sm font-semibold text-[var(--isitabuy-muted)]">Purchases linked to savings, warranties, and product verdicts.</p>
            </div>
            <Button variant="outline" className="h-9 rounded-full border-brand-amber/35 bg-white text-xs font-bold hover:bg-soft-wait" onClick={() => notify("Receipt filters", "Full receipt filters will be connected in a later pass.")}>
              Filter receipts
            </Button>
          </div>
          {purchaseSummaries.map((purchase) => (
            <div key={purchase.id} className="grid gap-4 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-amber/35 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)] lg:grid-cols-[minmax(0,1.35fr)_0.7fr_0.7fr_auto] lg:items-center">
              <div className="min-w-0">
                <h2 className="truncate font-bold">{purchase.productName}</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--isitabuy-muted)]">{purchase.store} · {formatDate(purchase.orderDate)} · paid {formatPrice(purchase.paidPrice)}</p>
              </div>
              <div className="rounded-2xl border border-brand-amber/25 bg-card px-3 py-2">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent">Paid</p>
                <p className="font-numeric mt-1 text-sm font-bold">{formatPrice(purchase.paidPrice)}</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-emerald-700">Saved</p>
                <p className="font-numeric mt-1 text-sm font-bold text-emerald-700">{formatPrice(purchase.savedAmount)}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <Badge className={cn("rounded-full border", purchase.warrantyStatus === "expiring" ? "border-amber-200 bg-amber-50 text-amber-700" : purchase.warrantyStatus === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-600")}>
                  {purchase.warrantyStatus === "expiring" ? "Warranty expiring" : purchase.warrantyStatus === "active" ? "Warranty active" : "No warranty"}
                </Badge>
                <Button asChild variant="outline" className="h-9 rounded-full text-xs font-bold">
                  <Link href={buildProductUrl(purchase.productSlug)}>Product</Link>
                </Button>
                <Button variant="outline" className="h-9 rounded-full text-xs font-bold" onClick={() => notify("Receipt details", `${purchase.productName} receipt details will open here.`)}>
                  Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="grid gap-5">
      <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--soft-wait),var(--card))] shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Review queue</h2>
            <FileCheck2 className="size-5 text-accent" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-3">
            {reviewQueue.map((item) => (
              <button key={item.title} type="button" onClick={() => notify(item.title, `${item.detail} is ready in demo mode.`)} className="rounded-2xl border border-brand-amber/25 bg-white/82 p-3 text-left transition hover:bg-soft-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
                <p className="font-bold">{item.title}</p>
                <p className="mt-1 text-xs font-bold text-[var(--isitabuy-muted)]">{item.detail}</p>
                <span className={cn("mt-3 inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-bold", item.tone)}>{item.status}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Return windows</h2>
            <RotateCcw className="size-5 text-amber-600" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-3">
            {returnWindows.map((item) => (
              <button key={item.title} type="button" onClick={() => notify("Return reminder", `${item.title} has ${item.days} days left.`)} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--isitabuy-line)] p-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{item.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-[var(--isitabuy-muted)]">{item.store}</span>
                </span>
                <span className="font-numeric shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{item.days} days</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--soft-wait),var(--card))] shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Warranty tracker</h2>
            <Clock3 className="size-5 text-accent" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-3">
            {warrantySummaries.map((warranty) => (
              <Link key={warranty.id} href={buildProductUrl(warranty.productSlug)} className="rounded-2xl border border-brand-amber/25 bg-white/82 p-3 transition hover:bg-soft-wait">
                <p className="font-bold">{warranty.productName}</p>
                <p className="mt-1 text-xs font-bold text-[var(--isitabuy-muted)]">Expires in {warranty.expiresInDays} days</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
      </section>
    </section>
  );
}

function CompareHistorySection() {
  const compares = [
    { title: "Sony WH-1000XM5 vs Bose QuietComfort Ultra", slug: "sony-wh-1000xm5-vs-bose-quietcomfort-ultra", verdict: "Bose has stronger value today" },
    { title: "MacBook Air M3 vs open-box M4", slug: "macbook-air-m3-vs-open-box-m4", verdict: "Wait for a cleaner M4 drop" },
    { title: "Dyson V15 vs Shark Detect Pro", slug: "dyson-v15-vs-shark-detect-pro", verdict: "Dyson wins performance, Shark wins price" },
  ];

  return (
    <section className="grid gap-3">
      {compares.map((item) => (
        <Link key={item.slug} href={buildCompareUrl(item.slug)} className="group rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Compared recently</p>
              <h2 className="mt-2 text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm font-semibold text-[var(--isitabuy-muted)]">{item.verdict}</p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-accent transition group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </Link>
      ))}
    </section>
  );
}

function ChatSection({ prompt, setPrompt, runSearch }: { prompt: string; setPrompt: (value: string) => void; runSearch: (value?: string) => void }) {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.42fr)]">
      <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="rounded-2xl border border-brand-amber/25 bg-soft-wait p-4">
            <p className="text-sm font-bold">IsItABuy assistant</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">Ask about saved products, price timing, alternatives, or receipts. Demo answers are routed into product search.</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask if now is a good time to buy..." aria-label="Ask IsItABuy" />
            <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => runSearch(prompt || "shopping recommendation")}>Ask</Button>
          </div>
        </CardContent>
      </Card>
      <PremiumAside title="Context used" body="IsItABuy can use your saved products, watchlist, receipts, and compare history to answer with better context." action="Search headphones" onClick={() => runSearch("best headphones under 300")} />
    </section>
  );
}

function SettingsSection() {
  const settings = ["Price drop alerts", "Warranty reminders", "Better alternative alerts", "Receipt review prompts"];

  return (
    <section className="grid gap-3 md:grid-cols-2">
      {settings.map((setting) => (
        <button key={setting} type="button" className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-soft-wait hover:shadow-[var(--isitabuy-card-shadow)]" onClick={() => notify("Preference updated", `${setting} stays enabled in this demo.`)}>
          <span className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-lg font-bold">{setting}</span>
              <span className="mt-2 block text-sm font-semibold text-[var(--isitabuy-muted)]">Enabled for Ahmed&rsquo;s Premium dashboard.</span>
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
          </span>
        </button>
      ))}
    </section>
  );
}

function PremiumAside({ title, body, action, onClick }: { title: string; body: string; action: string; onClick: () => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--soft-wait),var(--card))] shadow-[0_18px_48px_rgb(105_72_34/0.08)]">
      <CardContent className="p-5">
        <span className="grid size-12 place-items-center rounded-2xl bg-white text-emerald-700 shadow-sm">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-xl font-bold">{title}</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">{body}</p>
        <Button className="mt-5 h-10 rounded-full bg-[var(--isitabuy-orange)] text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={onClick}>
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}
