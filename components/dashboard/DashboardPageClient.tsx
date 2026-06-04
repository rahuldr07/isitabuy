"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  Bell,
  CheckCircle2,
  ChevronDown,
  Heart,
  Menu,
  MinusCircle,
  PackageCheck,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Upload,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { showCompareToast } from "@/components/ui/app-toast";
import {
  actionTypeLabels,
  dashboardNavItems,
  dashboardUser,
  notifications,
  purchaseSummaries,
  recommendations as defaultRecommendations,
  savedProducts as defaultSavedProducts,
  savingsCategories,
  smartActions as defaultSmartActions,
  warrantySummaries,
  watchlistProducts as defaultWatchlistProducts,
} from "@/lib/mockDashboardData";
import {
  buildCompareUrl,
  buildProductUrl,
  buildRedirectUrl,
  formatDate,
  formatPrice,
  getActionStyles,
  getStatusStyles,
  getVerdictStyles,
  safeReadLocalStorage,
  safeWriteLocalStorage,
} from "@/lib/dashboardUtils";
import { buildReceiptRecord, hydrateReceiptRecords, saveReceiptRecord } from "@/lib/receiptRecords";
import { cn } from "@/lib/utils";
import type {
  DashboardModalState,
  DashboardNavItem,
  PriceAlert,
  ReceiptRecord,
  PurchaseSummary,
  ReceiptUploadDraft,
  Recommendation,
  SavedProduct,
  SmartAction,
  WatchedProduct,
} from "@/types/dashboard";

const STORAGE_KEYS = {
  dismissedActions: "isitabuy.dashboard.dismissedActions",
  savedProducts: "isitabuy.dashboard.savedProducts",
  watchlist: "isitabuy.dashboard.watchlist",
  priceAlerts: "isitabuy.dashboard.priceAlerts",
  receipts: "isitabuy.dashboard.receipts",
  savedRecommendations: "isitabuy.dashboard.savedRecommendations",
  notificationReadState: "isitabuy.dashboard.notificationReadState",
} as const;

const connectedDashboardRoutes = new Set([
  "/dashboard/saved",
  "/dashboard/watchlist",
  "/dashboard/alerts",
  "/dashboard/receipts",
  "/dashboard/compare-history",
  "/dashboard/chat",
  "/dashboard/settings",
]);

const alertReasons = [
  "Price drops below target",
  "Historical low detected",
  "Better alternative gets cheaper",
  "Back in stock",
];

const defaultReceiptDraft: ReceiptUploadDraft = {
  store: "Target",
  purchaseDate: "2026-05-20",
  notes: "",
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isPriceAlertArray(value: unknown): value is PriceAlert[] {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!item || typeof item !== "object") return false;
      const alert = item as Partial<PriceAlert>;
      return (
        typeof alert.id === "string" &&
        typeof alert.productId === "string" &&
        typeof alert.productName === "string" &&
        typeof alert.targetPrice === "number" &&
        Array.isArray(alert.notifyWhen) &&
        alert.notifyWhen.every((reason) => typeof reason === "string")
      );
    })
  );
}

function currentProductIds(products: Array<{ id: string }>) {
  return products.map((product) => product.id);
}

function mergeKnownItems<T extends { id: string }>(defaults: T[], storedIds: string[]) {
  const stored = new Set(storedIds);
  return defaults.filter((item) => stored.has(item.id));
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

function notify(title: string, description: string) {
  showCompareToast(title, description);
}

export default function DashboardPageClient() {
  const router = useRouter();
  const smartActionsRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<DashboardModalState>({ type: "none" });
  const [dismissedActionIds, setDismissedActionIds] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<WatchedProduct[]>(defaultWatchlistProducts);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>(defaultSavedProducts);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(defaultRecommendations);
  const [savedRecommendationIds, setSavedRecommendationIds] = useState<string[]>([]);
  const [, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [receipts, setReceipts] = useState<ReceiptRecord[]>([]);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [receiptDraft, setReceiptDraft] = useState<ReceiptUploadDraft>(defaultReceiptDraft);
  const [alertProductId, setAlertProductId] = useState(defaultWatchlistProducts[0]?.id ?? defaultSavedProducts[0].id);
  const [alertTargetPrice, setAlertTargetPrice] = useState("249.99");
  const [alertNotifyWhen, setAlertNotifyWhen] = useState<string[]>([alertReasons[0], alertReasons[1]]);
  const [smartActionsExpanded, setSmartActionsExpanded] = useState(false);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);

  useEffect(() => {
    const dismissed = safeReadLocalStorage(STORAGE_KEYS.dismissedActions, [] as string[], isStringArray);
    const storedSaved = safeReadLocalStorage(STORAGE_KEYS.savedProducts, currentProductIds(defaultSavedProducts), isStringArray);
    const storedWatchlist = safeReadLocalStorage(STORAGE_KEYS.watchlist, currentProductIds(defaultWatchlistProducts), isStringArray);
    const alerts = safeReadLocalStorage(STORAGE_KEYS.priceAlerts, [] as PriceAlert[], isPriceAlertArray);
    const storedReceipts = hydrateReceiptRecords();
    const savedRecs = safeReadLocalStorage(STORAGE_KEYS.savedRecommendations, [] as string[], isStringArray);
    const dismissedRecs = safeReadLocalStorage("isitabuy.dashboard.dismissedRecommendations", [] as string[], isStringArray);
    const notificationState = safeReadLocalStorage(STORAGE_KEYS.notificationReadState, [] as string[], isStringArray);

    queueMicrotask(() => {
      setDismissedActionIds(dismissed.value.filter((id) => defaultSmartActions.some((action) => action.id === id)));
      setSavedProducts(mergeKnownItems(defaultSavedProducts, storedSaved.value));
      setWatchlist(mergeKnownItems(defaultWatchlistProducts, storedWatchlist.value));
      setPriceAlerts(alerts.value);
      setReceipts(storedReceipts.value);
      setSavedRecommendationIds(savedRecs.value.filter((id) => defaultRecommendations.some((item) => item.id === id)));
      setRecommendations(defaultRecommendations.filter((item) => !dismissedRecs.value.includes(item.id)));
      setNotificationsRead(notificationState.value.includes("all-read"));
      setHydrated(true);
    });

    if (
      dismissed.recovered ||
      storedSaved.recovered ||
      storedWatchlist.recovered ||
      alerts.recovered ||
      storedReceipts.recovered ||
      savedRecs.recovered ||
      dismissedRecs.recovered ||
      notificationState.recovered
    ) {
      notify("Dashboard data recovered", "One saved dashboard setting was reset because it was unreadable.");
    }
  }, []);

  const visibleSmartActions = useMemo(
    () => defaultSmartActions.filter((action) => !dismissedActionIds.includes(action.id)),
    [dismissedActionIds],
  );
  const displayedSmartActions = smartActionsExpanded ? visibleSmartActions : visibleSmartActions.slice(0, 3);
  const hiddenSmartActionCount = Math.max(0, visibleSmartActions.length - displayedSmartActions.length);

  const selectedAlertProduct = useMemo(() => {
    return [...watchlist, ...savedProducts].find((product) => product.id === alertProductId) ?? watchlist[0] ?? savedProducts[0];
  }, [alertProductId, savedProducts, watchlist]);

  const handleStorageWrite = (key: string, value: unknown) => {
    if (!safeWriteLocalStorage(key, value)) {
      notify("Saved for this session", "Browser storage is unavailable, so this demo change may not persist after reload.");
    }
  };

  const navigateOrToast = (href: string, label: string) => {
    if (href === "/dashboard" || href.startsWith("/product/") || href.startsWith("/compare/") || href === "/compare" || href === "/search") {
      router.push(href);
      return;
    }

    const baseHref = href.split("?")[0];
    if (connectedDashboardRoutes.has(baseHref)) {
      router.push(href);
      return;
    }

    if (href.startsWith("/dashboard/")) {
      notify(label, `${label} will open here when this dashboard section is connected.`);
      return;
    }

    router.push(href);
  };

  const runSearch = (override?: string) => {
    const trimmed = (override ?? query).trim();
    if (!trimmed) {
      notify("Enter a product, category, or store to search.", "Try a product name, retailer, category, or pasted product URL.");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const openPriceAlert = (productId?: string) => {
    if (productId) {
      setAlertProductId(productId);
      const product = [...watchlist, ...savedProducts].find((item) => item.id === productId);
      if (product && "targetPrice" in product) {
        setAlertTargetPrice(String(product.targetPrice));
      }
    }
    setModal({ type: "priceAlert", productId });
  };

  const dismissAction = (actionId: string) => {
    setDismissedActionIds((current) => {
      const next = Array.from(new Set([...current, actionId]));
      handleStorageWrite(STORAGE_KEYS.dismissedActions, next);
      return next;
    });
    notify("Smart action dismissed", "IsItABuy will keep this action hidden on this device.");
  };

  const removeWatchItem = (productId: string) => {
    setWatchlist((current) => {
      const next = current.filter((product) => product.id !== productId);
      handleStorageWrite(STORAGE_KEYS.watchlist, currentProductIds(next));
      return next;
    });
    notify("Removed from watchlist", "The product was removed from this dashboard watchlist.");
  };

  const removeSavedProduct = (productId: string) => {
    setSavedProducts((current) => {
      const next = current.filter((product) => product.id !== productId);
      handleStorageWrite(STORAGE_KEYS.savedProducts, currentProductIds(next));
      return next;
    });
    notify("Product unsaved", "The product was removed from saved products.");
  };

  const saveRecommendation = (recommendationId: string) => {
    setSavedRecommendationIds((current) => {
      const next = Array.from(new Set([...current, recommendationId]));
      handleStorageWrite(STORAGE_KEYS.savedRecommendations, next);
      return next;
    });
    notify("Recommendation saved", "IsItABuy saved this recommendation for later.");
  };

  const dismissRecommendation = (recommendationId: string) => {
    setRecommendations((current) => current.filter((item) => item.id !== recommendationId));
    const dismissed = defaultRecommendations.filter((item) => item.id === recommendationId).map((item) => item.id);
    handleStorageWrite("isitabuy.dashboard.dismissedRecommendations", dismissed);
    notify("Recommendation hidden", "IsItABuy will use that preference in this demo.");
  };

  const handleSmartAction = (action: SmartAction, buttonLabel: string) => {
    if (buttonLabel === "View Deal") {
      window.open(buildRedirectUrl(action.retailer ?? "bestbuy", action.productSlug ?? "bose-quietcomfort-ultra"), "_blank", "noopener,noreferrer");
      return;
    }

    if (buttonLabel === "Compare" && action.compareSlug) {
      router.push(buildCompareUrl(action.compareSlug));
      return;
    }

    if (buttonLabel === "View Alternative" && action.productSlug) {
      router.push(buildProductUrl(action.productSlug));
      return;
    }

    if (buttonLabel === "Review Receipt") {
      notify("Receipt review page will open here.", "The receipt review screen is planned for the next pass.");
      return;
    }

    if (buttonLabel === "View Warranty") {
      notify("Warranties will open here.", "Receipts & Purchases will include the warranty filter.");
      return;
    }

    if (buttonLabel === "Create Alert") {
      openPriceAlert(action.productSlug);
      return;
    }

    if (buttonLabel === "Dismiss") {
      dismissAction(action.id);
    }
  };

  const markAllNotificationsRead = () => {
    setNotificationsRead(true);
    handleStorageWrite(STORAGE_KEYS.notificationReadState, ["all-read"]);
    notify("Notifications marked read", "The notification badge is cleared.");
  };

  const submitReceipt = (useDemo: boolean) => {
    if (!useDemo && !receiptDraft.fileName) {
      notify("Choose a receipt file", "Upload an image or PDF, or use the demo receipt.");
      return;
    }

    const previousReceiptCount = receipts.length;
    const result = saveReceiptRecord(buildReceiptRecord(receiptDraft, useDemo));
    setReceipts(result.value);
    setModal({ type: "none" });
    notify(
      useDemo ? "Demo receipt uploaded and processed." : "Receipt uploaded and processed.",
      result.recovered
        ? "Receipt is visible for this session, but browser storage did not persist it."
        : `Receipt records updated from ${previousReceiptCount} to ${result.value.length}.`,
    );
  };

  const submitPriceAlert = () => {
    const parsed = Number(alertTargetPrice);
    if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 100000) {
      notify("Enter a valid target price", "Use a positive number below $100,000.");
      return;
    }

    if (!selectedAlertProduct) {
      notify("Choose a product", "Select a product before saving this alert.");
      return;
    }

    if (!alertNotifyWhen.length) {
      notify("Choose a notification trigger", "Select at least one condition for this price alert.");
      return;
    }

    const id = `${selectedAlertProduct.id}-${parsed}-${alertNotifyWhen.join("-")}`.toLowerCase().replaceAll(/\s+/g, "-");
    const nextAlert: PriceAlert = {
      id,
      productId: selectedAlertProduct.id,
      productName: selectedAlertProduct.name,
      targetPrice: parsed,
      notifyWhen: alertNotifyWhen,
      createdAt: new Date().toISOString(),
    };

    setPriceAlerts((current) => {
      const next = [nextAlert, ...current.filter((alert) => alert.id !== id)];
      handleStorageWrite(STORAGE_KEYS.priceAlerts, next);
      return next;
    });
    setModal({ type: "none" });
    notify("Price alert saved.", `${selectedAlertProduct.name} will be watched at ${formatPrice(parsed)}.`);
  };

  const selectedPurchase = modal.type === "purchaseDetail" ? purchaseSummaries.find((purchase) => purchase.id === modal.purchaseId) : undefined;
  const selectedWarranty = modal.type === "warrantyDetail" ? warrantySummaries.find((warranty) => warranty.id === modal.warrantyId) : undefined;
  if (!hydrated) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-[var(--isitabuy-ink)]">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-50 hidden h-screen max-h-screen w-[240px] shrink-0 overflow-hidden border-r border-[var(--isitabuy-line)] bg-white/96 px-3 py-4 shadow-sm lg:block">
          <DashboardSidebar items={dashboardNavItems} />
        </aside>
        <div className="min-w-0 flex-1 lg:pl-[240px]">
          <DashboardTopbar
            query={query}
            notificationsRead={notificationsRead}
            onQueryChange={setQuery}
            onSearch={() => runSearch()}
            onSaved={() => navigateOrToast("/dashboard/saved", "Saved products")}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            onNavigate={navigateOrToast}
            onMarkAllRead={markAllNotificationsRead}
          />

          <main className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-5 sm:px-5 lg:px-8 lg:py-6">
            <SmartActionsSection
              refEl={smartActionsRef}
              actions={displayedSmartActions}
              hiddenCount={hiddenSmartActionCount}
              expanded={smartActionsExpanded}
              moreDetailsOpen={moreDetailsOpen}
              onToggleExpanded={() => setSmartActionsExpanded((value) => !value)}
              onToggleDetails={() => setMoreDetailsOpen((value) => !value)}
              onAction={handleSmartAction}
              onSearch={() => router.push("/search")}
              onUpload={() => setModal({ type: "uploadReceipt" })}
              onWatchlist={() => navigateOrToast("/dashboard/watchlist", "Watchlist")}
            />

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.65fr)]">
              <WatchlistSnapshot products={watchlist} onRemove={removeWatchItem} onAlert={openPriceAlert} onNavigate={navigateOrToast} />
              <UpcomingWarrantyCard onNavigate={navigateOrToast} onDetails={(warrantyId) => setModal({ type: "warrantyDetail", warrantyId })} />
            </section>

            {moreDetailsOpen ? (
              <div className="grid gap-5">
                <RecentPurchases purchases={purchaseSummaries} onDetails={(purchaseId) => setModal({ type: "purchaseDetail", purchaseId })} onNavigate={navigateOrToast} />
                <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.8fr)]">
                  <SavedProductsSnapshot products={savedProducts} onRemove={removeSavedProduct} onNavigate={navigateOrToast} />
                  <SavingsInsights onCategory={(label) => notify(`Filtering insights by ${label}.`, "Category filtering will be connected to full savings analytics.")} onDetails={() => setModal({ type: "savingsDetail" })} />
                </section>
                <RecommendationsPanel recommendations={recommendations} savedIds={savedRecommendationIds} onSave={saveRecommendation} onDismiss={dismissRecommendation} onView={(item) => runSearch(item.searchQuery)} />
              </div>
            ) : null}

            <div className="flex items-center gap-2 rounded-2xl border border-[var(--isitabuy-line)] bg-white px-4 py-3 text-xs font-bold text-[var(--isitabuy-muted)]">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Scores and recommendations are not based on commission.
            </div>
          </main>
        </div>
      </div>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[19rem] bg-white p-0">
          <SheetHeader className="border-b border-[var(--isitabuy-line)]">
            <SheetTitle>IsItABuy dashboard</SheetTitle>
            <SheetDescription>Private shopping command center</SheetDescription>
          </SheetHeader>
          <div className="p-3">
            <DashboardSidebar
              items={dashboardNavItems}
              onItemClick={() => {
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      <UploadReceiptDialog
        open={modal.type === "uploadReceipt"}
        draft={receiptDraft}
        onDraftChange={setReceiptDraft}
        onClose={() => setModal({ type: "none" })}
        onSubmit={submitReceipt}
      />
      <PriceAlertDialog
        open={modal.type === "priceAlert"}
        productId={alertProductId}
        targetPrice={alertTargetPrice}
        notifyWhen={alertNotifyWhen}
        products={[...watchlist, ...savedProducts]}
        onProductChange={setAlertProductId}
        onTargetPriceChange={setAlertTargetPrice}
        onNotifyWhenChange={setAlertNotifyWhen}
        onClose={() => setModal({ type: "none" })}
        onSubmit={submitPriceAlert}
      />
      <PurchaseDetailDialog
        purchase={selectedPurchase}
        onClose={() => setModal({ type: "none" })}
        onViewProduct={(slug) => router.push(buildProductUrl(slug))}
        onTrackPrice={(productId) => openPriceAlert(productId)}
        onFindAlternative={(productName) => runSearch(`better alternative ${productName}`)}
      />
      <WarrantyDetailDialog warranty={selectedWarranty} onClose={() => setModal({ type: "none" })} onNavigate={navigateOrToast} />
      <SavingsDetailDialog open={modal.type === "savingsDetail"} onClose={() => setModal({ type: "none" })} />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] p-4 lg:p-8">
      <div className="mx-auto grid max-w-[1440px] gap-5">
        <Skeleton className="h-16 rounded-2xl bg-white" />
        <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
          <Skeleton className="h-72 rounded-[1.35rem] bg-white" />
          <Skeleton className="h-72 rounded-[1.35rem] bg-white" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-2xl bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardSidebar({ items, onItemClick }: { items: DashboardNavItem[]; onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 px-2 pb-5">
        <Logo />
      </div>
      <nav className="grid shrink-0 gap-1" aria-label="Dashboard">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]",
                active ? "bg-[var(--isitabuy-green-soft)] text-emerald-700" : "text-[var(--isitabuy-muted)] hover:bg-slate-50 hover:text-[var(--isitabuy-ink)]",
              )}
              onClick={onItemClick}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="min-w-0 truncate">{item.label}</span>
            </Link>
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
      <div className="mt-auto shrink-0 rounded-2xl border border-[var(--isitabuy-line)] bg-[image:var(--isitabuy-violet-panel)] p-4">
        <p className="text-sm font-bold">Premium protection</p>
        <p className="mt-2 text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">Track warranties, alerts, and better alternatives in one place.</p>
      </div>
    </div>
  );
}

function DashboardTopbar({
  query,
  notificationsRead,
  onQueryChange,
  onSearch,
  onSaved,
  onOpenSidebar,
  onNavigate,
  onMarkAllRead,
}: {
  query: string;
  notificationsRead: boolean;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onSaved: () => void;
  onOpenSidebar: () => void;
  onNavigate: (href: string, label: string) => void;
  onMarkAllRead: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--isitabuy-line)] bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Logo />
          <Button variant="outline" size="icon" onClick={onOpenSidebar} aria-label="Open dashboard navigation">
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 rounded-2xl border border-[var(--isitabuy-line)] bg-white p-1 shadow-[var(--compare-input-shadow)]">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--isitabuy-muted)]" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onSearch();
                }}
                placeholder="Search products, categories, stores, or paste a link..."
                className="h-10 rounded-xl border-transparent bg-white pl-9 text-xs font-semibold shadow-none focus-visible:ring-[var(--isitabuy-orange)] sm:text-sm"
                aria-label="Search IsItABuy"
              />
            </div>
            <Button className="h-10 rounded-xl bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)] sm:px-5" onClick={onSearch}>
              Search
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2 lg:justify-end">
            <Button variant="ghost" className="h-10 gap-2 rounded-full px-3 text-xs font-bold" onClick={onSaved}>
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
                  <Button variant="ghost" size="sm" className="h-7 rounded-full text-xs font-bold" onClick={onMarkAllRead}>
                    Mark all read
                  </Button>
                </div>
                {notifications.map((item) => (
                  <div key={item.id} className="rounded-xl p-2 hover:bg-slate-50">
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-[var(--isitabuy-muted)]">{item.description}</p>
                    <Button variant="outline" size="sm" className="mt-2 h-8 rounded-full text-xs font-bold" onClick={() => item.route ? onNavigate(item.route, item.title) : notify(item.title, item.description)}>
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
                <DropdownMenuItem onSelect={() => onNavigate("/dashboard/settings", "Settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => notify("Billing / Plan", "Billing controls will live inside Settings later.")}>Billing / Plan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => notify("Signed out in demo mode.", "Authentication is not connected in this prototype.")}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

function SmartActionsSection({
  refEl,
  actions,
  hiddenCount,
  expanded,
  moreDetailsOpen,
  onToggleExpanded,
  onToggleDetails,
  onAction,
  onSearch,
  onUpload,
  onWatchlist,
}: {
  refEl: React.RefObject<HTMLDivElement | null>;
  actions: SmartAction[];
  hiddenCount: number;
  expanded: boolean;
  moreDetailsOpen: boolean;
  onToggleExpanded: () => void;
  onToggleDetails: () => void;
  onAction: (action: SmartAction, buttonLabel: string) => void;
  onSearch: () => void;
  onUpload: () => void;
  onWatchlist: () => void;
}) {
  const [featuredAction, ...secondaryActions] = actions;

  return (
    <Card
      ref={refEl}
      className="scroll-mt-24 overflow-hidden rounded-[1.45rem] border border-brand-amber/25 bg-[linear-gradient(135deg,var(--card)_0%,var(--soft-wait)_52%,var(--card)_100%)] shadow-[0_22px_60px_rgb(110_76_37/0.11)]"
    >
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-brand-amber/25 pb-5 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--isitabuy-ink)] sm:text-3xl">Welcome back, Ahmed</h1>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">IsItABuy found {actions.length + hiddenCount} smart shopping updates for you today.</p>
          </div>
          <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
            <Button className="h-10 rounded-full bg-[var(--isitabuy-orange)] px-4 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={onSearch}>
              <Search className="size-4" aria-hidden="true" />
              Check New Product
            </Button>
            <Button variant="outline" className="h-10 rounded-full border-brand-amber/35 bg-white/88 px-4 text-xs font-bold hover:bg-soft-wait" onClick={onUpload}>
              <Upload className="size-4" aria-hidden="true" />
              Upload Receipt
            </Button>
            <Button variant="ghost" className="h-10 rounded-full px-4 text-xs font-bold text-[var(--isitabuy-purple)] hover:bg-soft-wait" onClick={onToggleDetails}>
              {moreDetailsOpen ? "Hide Details" : "More Details"}
            </Button>
          </div>
        </div>

        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Private shopping brief</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--isitabuy-ink)] sm:text-3xl">Today&rsquo;s Smart Actions</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">A cleaner short list of what is worth checking, buying, waiting on, or reviewing today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-[#8a6a44]">{actions.length ? `${actions.length} active moves` : "All clear"}</span>
            {hiddenCount > 0 || expanded ? (
              <Button variant="outline" className="h-9 rounded-full border-brand-amber/35 bg-white/85 px-4 text-xs font-bold hover:bg-soft-wait" onClick={onToggleExpanded}>
                {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
              </Button>
            ) : null}
          </div>
        </div>
        {actions.length ? (
          <div className="grid gap-3">
            {featuredAction ? <SmartActionFeatured action={featuredAction} onAction={onAction} /> : null}
            {secondaryActions.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {secondaryActions.map((action, index) => (
                  <SmartActionCompact key={action.id} action={action} actionNumber={index + 2} onAction={onAction} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <EmptyState
            icon={CheckCircle2}
            title="You're caught up"
            body="No smart actions need attention right now. Search a product, upload a receipt, or check your watchlist."
            actions={[
              { label: "Search", onClick: onSearch },
              { label: "Upload Receipt", onClick: onUpload },
              { label: "Open Watchlist", onClick: onWatchlist },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ icon: Icon, title, body, actions }: { icon: LucideIcon; title: string; body: string; actions: Array<{ label: string; onClick: () => void }> }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--isitabuy-line)] bg-slate-50/70 p-6 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-[var(--isitabuy-purple)] shadow-sm">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{body}</p>
      <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
        {actions.map((action) => (
          <Button key={action.label} variant="outline" className="h-9 rounded-full text-xs font-bold" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function SmartActionFeatured({ action, onAction }: { action: SmartAction; onAction: (action: SmartAction, buttonLabel: string) => void }) {
  const meta = actionTypeLabels[action.type];
  const Icon = meta.icon;

  return (
    <article className="group relative min-h-[236px] overflow-hidden rounded-[1.25rem] border border-[#dfc9a8] bg-soft-wait shadow-[0_16px_42px_rgb(105_72_34/0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-[#caa777] hover:bg-soft-wait hover:shadow-[0_22px_55px_rgb(105_72_34/0.17)]">
      <div className="flex h-full flex-col justify-between gap-8 p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={cn("grid size-14 shrink-0 place-items-center rounded-[1rem] border bg-white shadow-sm", getActionStyles(action.type))}>
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent">Top move</p>
                <p className="mt-1 text-xs font-bold text-muted-foreground">Worth checking first</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8a5a20]">{meta.label}</p>
          <h3 className="mt-2 max-w-2xl text-2xl font-bold leading-[1.05] tracking-tight text-[var(--isitabuy-ink)] sm:text-3xl">{action.title}</h3>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#69563f]">{action.description}</p>
        </div>
        <div className="grid gap-2 min-[440px]:grid-cols-2">
          <Button className="h-11 rounded-full bg-[var(--isitabuy-orange)] text-sm font-bold text-white shadow-[0_12px_24px_rgb(249_115_22/0.22)] hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => onAction(action, action.primaryAction)}>
            {action.primaryAction}
          </Button>
          {action.secondaryAction ? (
            <Button variant="outline" className="h-11 rounded-full border-[#d7ba8e] bg-white/88 text-sm font-bold hover:bg-soft-wait" onClick={() => onAction(action, action.secondaryAction ?? "")}>
              {action.secondaryAction}
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SmartActionCompact({
  action,
  actionNumber,
  onAction,
}: {
  action: SmartAction;
  actionNumber: number;
  onAction: (action: SmartAction, buttonLabel: string) => void;
}) {
  const meta = actionTypeLabels[action.type];
  const Icon = meta.icon;

  return (
    <article className="group flex min-h-[172px] flex-col justify-between rounded-[1.15rem] border border-brand-amber/25 bg-white/82 p-4 shadow-[0_10px_28px_rgb(105_72_34/0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[#cfad7b] hover:bg-soft-wait hover:shadow-[0_16px_38px_rgb(105_72_34/0.13)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className={cn("grid size-10 place-items-center rounded-xl border bg-white shadow-sm", getActionStyles(action.type))}>
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <p className="mt-3 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-accent">{meta.label}</p>
          <h3 className="mt-2 line-clamp-2 text-base font-bold leading-5 text-[var(--isitabuy-ink)]">{action.title}</h3>
          <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-[#74624b]">{action.description}</p>
        </div>
        <span className="shrink-0 text-[0.7rem] font-bold tracking-[0.16em] text-[#b18a55]">0{actionNumber}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button className="h-8 rounded-full bg-[var(--isitabuy-orange)] px-3 text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => onAction(action, action.primaryAction)}>
          {action.primaryAction}
        </Button>
        {action.secondaryAction ? (
          <Button variant="outline" className="h-8 rounded-full border-brand-amber/35 bg-white/88 px-3 text-xs font-bold hover:bg-soft-wait" onClick={() => onAction(action, action.secondaryAction ?? "")}>
            {action.secondaryAction}
          </Button>
        ) : null}
      </div>
    </article>
  );
}

function WatchlistSnapshot({ products, onRemove, onAlert, onNavigate }: { products: WatchedProduct[]; onRemove: (id: string) => void; onAlert: (id: string) => void; onNavigate: (href: string, label: string) => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
      <CardContent className="p-5">
        <SectionHeader title="Watchlist" action={<Button variant="ghost" className="h-8 rounded-full text-xs font-bold text-[var(--isitabuy-purple)]" onClick={() => onNavigate("/dashboard/watchlist", "Watchlist")}>View full watchlist</Button>} />
        {products.length ? (
          <div className="grid gap-3">
            {products.map((product) => (
              <div key={product.id} className="rounded-2xl border border-[var(--isitabuy-line)] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold">{product.name}</h3>
                    <p className="font-numeric mt-1 text-lg font-bold">{formatPrice(product.currentPrice)}</p>
                    <p className="font-numeric text-xs font-semibold text-[var(--isitabuy-muted)]">Target {formatPrice(product.targetPrice)}</p>
                  </div>
                  <Badge className={cn("shrink-0 rounded-full border text-[0.68rem] font-bold", getStatusStyles(product.status))}>{product.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-emerald-700">AI Buy Score {product.aiBuyScore}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold" onClick={() => onNavigate(buildProductUrl(product.slug), product.name)}>View</Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold" onClick={() => onAlert(product.id)}>Track</Button>
                    <Button variant="ghost" size="icon-sm" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name} from watchlist`}>
                      <Trash2 className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={Watch} title="No watched products" body="Products you track for price drops will appear here." actions={[{ label: "Search products", onClick: () => onNavigate("/search", "Search") }]} />
        )}
      </CardContent>
    </Card>
  );
}

function SavedProductsSnapshot({ products, onRemove, onNavigate }: { products: SavedProduct[]; onRemove: (id: string) => void; onNavigate: (href: string, label: string) => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
      <CardContent className="p-5">
        <SectionHeader title="Saved Products" action={<Button variant="ghost" className="h-8 rounded-full text-xs font-bold text-[var(--isitabuy-purple)]" onClick={() => onNavigate("/dashboard/saved", "Saved products")}>View all saved</Button>} />
        {products.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <article key={product.id} className="group rounded-2xl border border-[var(--isitabuy-line)] p-3 transition hover:-translate-y-0.5 hover:shadow-[var(--isitabuy-card-shadow)]">
                <button type="button" className="grid w-full grid-cols-[4rem_1fr_auto] items-center gap-3 text-left" onClick={() => onNavigate(buildProductUrl(product.slug), product.name)}>
                  <span className="relative grid size-16 place-items-center overflow-hidden rounded-2xl bg-slate-50 text-[var(--isitabuy-purple)]">
                    {product.imageSrc ? <Image src={product.imageSrc} alt="" fill sizes="64px" className="object-contain p-1.5" /> : <PackageCheck className="size-6" aria-hidden="true" />}
                  </span>
                  <span className="min-w-0">
                    <Badge className={cn("rounded-full border px-2 py-0.5 text-[0.65rem] font-bold", getVerdictStyles(product.verdict))}>{product.verdict}</Badge>
                    <span className="mt-2 block truncate text-sm font-bold">{product.name}</span>
                    <span className="font-numeric mt-1 block text-xs font-bold text-[var(--isitabuy-muted)]">{formatPrice(product.currentPrice)} • Score {product.aiBuyScore}</span>
                  </span>
                  <ArrowRight className="size-4 text-[var(--isitabuy-muted)]" aria-hidden="true" />
                </button>
                <Button variant="ghost" size="sm" className="mt-2 h-8 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onRemove(product.id)}>
                  <MinusCircle className="size-3.5" aria-hidden="true" />
                  Unsave
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon={Heart} title="No saved products" body="Saved products and verdicts will appear here." actions={[{ label: "Search products", onClick: () => onNavigate("/search", "Search") }]} />
        )}
      </CardContent>
    </Card>
  );
}

function RecentPurchases({ purchases, onDetails, onNavigate }: { purchases: PurchaseSummary[]; onDetails: (id: string) => void; onNavigate: (href: string, label: string) => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
      <CardContent className="p-5 sm:p-6">
        <SectionHeader title="Recent Purchases" action={<Button variant="ghost" className="h-8 rounded-full text-xs font-bold text-[var(--isitabuy-purple)]" onClick={() => onNavigate("/dashboard/receipts", "Purchases")}>View all purchases</Button>} />
        {purchases.length ? (
          <div className="grid gap-2">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="grid gap-3 rounded-2xl border border-[var(--isitabuy-line)] p-3 md:grid-cols-[1fr_auto] md:items-center">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold">{purchase.productName}</h3>
                  <p className="mt-1 text-xs font-semibold text-[var(--isitabuy-muted)]">
                    {purchase.store} • Paid {formatPrice(purchase.paidPrice)} • Saved {formatPrice(purchase.savedAmount)}
                  </p>
                  <Badge className={cn("mt-2 rounded-full border text-[0.68rem] font-bold", getStatusStyles(purchase.warrantyStatus === "expiring" ? "Expiring" : purchase.warrantyStatus === "active" ? "Active" : "No warranty"))}>
                    {purchase.warrantyStatus === "none" ? "No warranty" : `Warranty ${purchase.warrantyStatus}`}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Button variant="outline" size="sm" className="h-8 rounded-full text-xs font-bold" onClick={() => onDetails(purchase.id)}>Details</Button>
                  <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold" onClick={() => onNavigate("/dashboard/receipts", "Receipt")}>Receipt</Button>
                  <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold text-[var(--isitabuy-purple)]" onClick={() => onNavigate(`/search?q=${encodeURIComponent(`better alternative ${purchase.productName}`)}`, "Find Alternative")}>Alternative</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={ReceiptText} title="No purchases yet" body="Upload receipts to track warranties, savings, and alternatives." actions={[{ label: "Upload Receipt", onClick: () => onNavigate("/dashboard/receipts", "Receipts") }]} />
        )}
      </CardContent>
    </Card>
  );
}

function SavingsInsights({ onCategory, onDetails }: { onCategory: (label: string) => void; onDetails: () => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
      <CardContent className="p-5">
        <SectionHeader title="Savings Insights" action={<Button variant="ghost" className="h-8 rounded-full text-xs font-bold text-[var(--isitabuy-purple)]" onClick={onDetails}>View full savings</Button>} />
        <div className="grid gap-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-bold text-emerald-700">Total saved with IsItABuy</p>
            <p className="font-numeric mt-2 text-3xl font-bold text-emerald-700">$312.45</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InfoTile label="Average savings" value="25%" />
            <InfoTile label="Best saving this month" value="$150" helper="MacBook Air M3" />
          </div>
          <div className="rounded-2xl border border-[var(--isitabuy-line)] p-4">
            <p className="mb-3 text-sm font-bold">Spending by category</p>
            <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
              {savingsCategories.map((category) => (
                <button key={category.label} type="button" className="h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]" style={{ width: `${category.value}%`, backgroundColor: category.color }} onClick={() => onCategory(category.label)} aria-label={`Filter insights by ${category.label}`} />
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              {savingsCategories.map((category) => (
                <button key={category.label} type="button" className="flex items-center justify-between gap-3 rounded-lg px-1 py-1 text-left text-xs font-bold hover:bg-slate-50" onClick={() => onCategory(category.label)}>
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="truncate">{category.label}</span>
                  </span>
                  <span>{category.value}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoTile({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--isitabuy-line)] p-3">
      <p className="text-xs font-bold text-[var(--isitabuy-muted)]">{label}</p>
      <p className="font-numeric mt-1 text-xl font-bold">{value}</p>
      {helper ? <p className="mt-1 truncate text-[0.68rem] font-bold text-[var(--isitabuy-muted)]">{helper}</p> : null}
    </div>
  );
}

function UpcomingWarrantyCard({ onNavigate, onDetails }: { onNavigate: (href: string, label: string) => void; onDetails: (id: string) => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
      <CardContent className="p-5">
        <SectionHeader title="Upcoming Warranties" action={<Button variant="ghost" className="h-8 rounded-full text-xs font-bold text-[var(--isitabuy-purple)]" onClick={() => onNavigate("/dashboard/receipts?filter=warranties", "Warranties")}>View all</Button>} />
        <div className="grid gap-2">
          {warrantySummaries.map((warranty) => (
            <button key={warranty.id} type="button" onClick={() => onDetails(warranty.id)} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--isitabuy-line)] p-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]">
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">{warranty.productName}</span>
                <span className="mt-1 block text-xs font-semibold text-[var(--isitabuy-muted)]">Expires in {warranty.expiresInDays} days</span>
              </span>
              <Badge className={cn("rounded-full border text-[0.68rem] font-bold", getStatusStyles(warranty.status === "expiring" ? "Expiring" : "Active"))}>{warranty.status}</Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendationsPanel({ recommendations, savedIds, onSave, onDismiss, onView }: { recommendations: Recommendation[]; savedIds: string[]; onSave: (id: string) => void; onDismiss: (id: string) => void; onView: (item: Recommendation) => void }) {
  return (
    <Card className="rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-sm">
      <CardContent className="p-5 sm:p-6">
        <SectionHeader title="Recommended for you" subtitle="Personalized ideas based on saved products, receipts, and comparison history." />
        {recommendations.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {recommendations.map((item) => (
              <article key={item.id} className="flex min-h-56 flex-col rounded-2xl border border-[var(--isitabuy-line)] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--isitabuy-card-shadow)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-purple-50 text-[var(--isitabuy-purple)]">
                    <Sparkles className="size-4" aria-hidden="true" />
                  </span>
                  <Badge className="rounded-full border border-emerald-100 bg-emerald-50 text-[0.68rem] font-bold text-emerald-700">{item.confidence}</Badge>
                </div>
                <h3 className="mt-4 text-base font-bold leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">{item.aiReason}</p>
                <p className="font-numeric mt-auto pt-4 text-sm font-bold text-emerald-700">Estimated savings {formatPrice(item.estimatedSavings)}</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Button className="h-8 rounded-full bg-[var(--isitabuy-orange)] text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => onView(item)}>View</Button>
                  <Button variant="outline" className="h-8 rounded-full text-xs font-bold" onClick={() => onSave(item.id)}>{savedIds.includes(item.id) ? "Saved" : "Save"}</Button>
                  <Button variant="ghost" className="h-8 rounded-full text-xs font-bold" onClick={() => onDismiss(item.id)}>Hide</Button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon={Sparkles} title="No recommendations right now" body="IsItABuy will add personalized ideas after more saved products, receipts, or searches." actions={[{ label: "Search products", onClick: () => onView({ id: "search", title: "Search", aiReason: "", estimatedSavings: 0, confidence: "Medium", searchQuery: "smart shopping recommendations" }) }]} />
        )}
      </CardContent>
    </Card>
  );
}

function UploadReceiptDialog({ open, draft, onDraftChange, onClose, onSubmit }: { open: boolean; draft: ReceiptUploadDraft; onDraftChange: (draft: ReceiptUploadDraft) => void; onClose: () => void; onSubmit: (useDemo: boolean) => void }) {
  const update = (patch: Partial<ReceiptUploadDraft>) => onDraftChange({ ...draft, ...patch });
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload receipt</DialogTitle>
          <DialogDescription>Upload an image or PDF so IsItABuy can track warranties, returns, savings, and better alternatives.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="receipt-file">Receipt file</Label>
            <Input
              id="receipt-file"
              type="file"
              accept="image/*,application/pdf"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
                  notify("Unsupported receipt file", "Upload an image or PDF receipt.");
                  event.currentTarget.value = "";
                  return;
                }
                update({ fileName: file.name });
              }}
            />
            {draft.fileName ? <p className="text-xs font-semibold text-[var(--isitabuy-muted)]">Selected: {draft.fileName}</p> : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="receipt-store">Store</Label>
            <Select value={draft.store} onValueChange={(value) => update({ store: value })}>
              <SelectTrigger id="receipt-store" className="h-10 w-full">
                <SelectValue placeholder="Choose store" />
              </SelectTrigger>
              <SelectContent>
                {["Target", "Amazon", "Best Buy", "Walmart", "Nike"].map((store) => <SelectItem key={store} value={store}>{store}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="purchase-date">Purchase date</Label>
            <Input id="purchase-date" type="date" value={draft.purchaseDate} onChange={(event) => update({ purchaseDate: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="receipt-notes">Notes</Label>
            <Textarea id="receipt-notes" value={draft.notes} onChange={(event) => update({ notes: event.target.value })} placeholder="Optional receipt notes..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="outline" onClick={() => onSubmit(true)}>Use demo receipt</Button>
          <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => onSubmit(false)}>Upload receipt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PriceAlertDialog({
  open,
  productId,
  targetPrice,
  notifyWhen,
  products,
  onProductChange,
  onTargetPriceChange,
  onNotifyWhenChange,
  onClose,
  onSubmit,
}: {
  open: boolean;
  productId: string;
  targetPrice: string;
  notifyWhen: string[];
  products: Array<{ id: string; name: string }>;
  onProductChange: (value: string) => void;
  onTargetPriceChange: (value: string) => void;
  onNotifyWhenChange: (value: string[]) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const uniqueProducts = Array.from(new Map(products.map((product) => [product.id, product])).values());
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Save price alert</DialogTitle>
          <DialogDescription>Choose a product, target price, and the signals IsItABuy should watch.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="alert-product">Product</Label>
            <Select value={productId} onValueChange={onProductChange}>
              <SelectTrigger id="alert-product" className="h-10 w-full">
                <SelectValue placeholder="Choose product" />
              </SelectTrigger>
              <SelectContent>
                {uniqueProducts.map((product) => <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="target-price">Target price</Label>
            <Input id="target-price" inputMode="decimal" value={targetPrice} onChange={(event) => onTargetPriceChange(event.target.value)} placeholder="249.99" />
          </div>
          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">Notify when</legend>
            {alertReasons.map((reason) => {
              const checked = notifyWhen.includes(reason);
              return (
                <label key={reason} className="flex items-center gap-3 rounded-xl border border-[var(--isitabuy-line)] p-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      onNotifyWhenChange(event.target.checked ? [...notifyWhen, reason] : notifyWhen.filter((item) => item !== reason));
                    }}
                    className="size-4 accent-[var(--isitabuy-orange)]"
                  />
                  {reason}
                </label>
              );
            })}
          </fieldset>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={onSubmit}>Save alert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PurchaseDetailDialog({ purchase, onClose, onViewProduct, onTrackPrice, onFindAlternative }: { purchase?: PurchaseSummary; onClose: () => void; onViewProduct: (slug: string) => void; onTrackPrice: (id: string) => void; onFindAlternative: (name: string) => void }) {
  return (
    <Dialog open={Boolean(purchase)} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{purchase?.productName ?? "Purchase details"}</DialogTitle>
          <DialogDescription>Receipt-linked purchase details and IsItABuy verdict context.</DialogDescription>
        </DialogHeader>
        {purchase ? (
          <div className="grid gap-3 rounded-2xl border border-[var(--isitabuy-line)] p-4 text-sm font-semibold">
            <DetailRow label="Store" value={purchase.store} />
            <DetailRow label="Order date" value={formatDate(purchase.orderDate)} />
            <DetailRow label="Paid price" value={formatPrice(purchase.paidPrice)} />
            <DetailRow label="Savings" value={formatPrice(purchase.savedAmount)} />
            <DetailRow label="Warranty status" value={purchase.warrantyStatus} />
            <DetailRow label="Linked verdict" value={purchase.warrantyStatus === "expiring" ? "WAIT" : "BUY"} />
          </div>
        ) : null}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          {purchase ? <Button variant="outline" onClick={() => onTrackPrice(purchase.productSlug)}>Track Price</Button> : null}
          {purchase ? <Button variant="outline" onClick={() => onFindAlternative(purchase.productName)}>Find Better Alternative</Button> : null}
          {purchase ? <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => onViewProduct(purchase.productSlug)}>View Product</Button> : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WarrantyDetailDialog({ warranty, onClose, onNavigate }: { warranty?: { id: string; productName: string; productSlug: string; expiresInDays: number; status: string }; onClose: () => void; onNavigate: (href: string, label: string) => void }) {
  return (
    <Dialog open={Boolean(warranty)} onOpenChange={(value) => !value && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{warranty?.productName ?? "Warranty details"}</DialogTitle>
          <DialogDescription>Warranty tracking is powered by receipt history.</DialogDescription>
        </DialogHeader>
        {warranty ? (
          <div className="rounded-2xl border border-[var(--isitabuy-line)] p-4">
            <p className="font-numeric text-3xl font-bold text-[var(--isitabuy-orange)]">{warranty.expiresInDays} days</p>
            <p className="mt-2 text-sm font-semibold text-[var(--isitabuy-muted)]">Status: {warranty.status}. IsItABuy can remind you before support coverage ends.</p>
          </div>
        ) : null}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          {warranty ? <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => onNavigate("/dashboard/receipts?filter=warranties", "Warranties")}>View all warranties</Button> : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SavingsDetailDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Savings details</DialogTitle>
          <DialogDescription>IsItABuy scores and recommendations are not based on commission.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-bold text-emerald-700">Total saved</p>
            <p className="font-numeric mt-2 text-4xl font-bold text-emerald-700">$312.45</p>
          </div>
          <div className="grid gap-2">
            {savingsCategories.map((category) => (
              <DetailRow key={category.label} label={category.label} value={`${category.value}%`} />
            ))}
          </div>
          <div className="rounded-2xl border border-[var(--isitabuy-line)] p-4">
            <p className="text-sm font-bold">Top saving events</p>
            <p className="mt-2 text-sm font-semibold text-[var(--isitabuy-muted)]">$150 on MacBook Air M3, $69.99 on Sony WH-1000XM5, and $40 on Bose QuietComfort Ultra.</p>
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-[var(--isitabuy-orange)] text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--isitabuy-line)] py-2 last:border-b-0">
      <span className="text-sm font-semibold text-[var(--isitabuy-muted)]">{label}</span>
      <span className="text-right text-sm font-bold">{value}</span>
    </div>
  );
}
