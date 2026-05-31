import {
  Bell,
  Bot,
  Clock3,
  DollarSign,
  Heart,
  History,
  Home,
  MessageCircle,
  ReceiptText,
  Settings,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingDown,
  Watch,
} from "lucide-react";
import type {
  DashboardNavItem,
  DashboardStat,
  DashboardUser,
  NotificationItem,
  PurchaseSummary,
  Recommendation,
  SavedProduct,
  SmartAction,
  SmartActionType,
  WarrantySummary,
  WatchedProduct,
} from "@/types/dashboard";

export const dashboardUser: DashboardUser = {
  name: "Ahmed",
  email: "ahmed@example.com",
  plan: "Premium",
  initials: "A",
};

export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Saved Products", href: "/dashboard/saved", icon: Heart },
  { label: "Watchlist", href: "/dashboard/watchlist", icon: Watch },
  { label: "Price Alerts", href: "/dashboard/alerts", icon: Bell },
  { label: "Receipts & Purchases", href: "/dashboard/receipts", icon: ReceiptText },
  { label: "Compare History", href: "/dashboard/compare-history", icon: History },
  { label: "AI Chat", href: "/dashboard/chat", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const dashboardStats: DashboardStat[] = [
  {
    id: "total-saved",
    label: "Total Saved",
    value: "$312.45",
    helper: "Across tracked buys",
    trend: "+$69 this month",
    icon: DollarSign,
    action: "savings",
  },
  {
    id: "active-alerts",
    label: "Active Alerts",
    value: "14",
    helper: "Watching price moves",
    trend: "2 triggered today",
    icon: Bell,
    action: "alerts",
  },
  {
    id: "tracked-products",
    label: "Tracked Products",
    value: "27",
    helper: "Saved and watched",
    trend: "4 need attention",
    icon: Watch,
    action: "watchlist",
  },
  {
    id: "receipts",
    label: "Receipts & Purchases",
    value: "18",
    helper: "Orders linked to IsItABuy",
    trend: "1 ready to review",
    icon: ReceiptText,
    action: "receipts",
  },
  {
    id: "price-drops",
    label: "Price Drops Found",
    value: "6",
    helper: "Worth checking now",
    trend: "$40 best drop",
    icon: TrendingDown,
    action: "priceDrops",
  },
  {
    id: "warranties",
    label: "Warranties Tracked",
    value: "9",
    helper: "Receipts protecting purchases",
    trend: "1 expiring soon",
    icon: ShieldCheck,
    action: "warranties",
  },
];

export const smartActions: SmartAction[] = [
  {
    id: "bose-drop",
    type: "price-drop",
    title: "Bose QuietComfort Ultra dropped $40",
    description: "Now $249.99 at Best Buy. This is close to its 90-day low.",
    productSlug: "bose-quietcomfort-ultra",
    compareSlug: "sony-wh-1000xm5-vs-bose-quietcomfort-ultra",
    retailer: "bestbuy",
    primaryAction: "View Deal",
    secondaryAction: "Compare",
  },
  {
    id: "sony-alternative",
    type: "better-alternative",
    title: "Better alternative found for Sony WH-1000XM5",
    description: "Bose QuietComfort Ultra has stronger value today based on price, comfort, and review trust.",
    productSlug: "bose-quietcomfort-ultra",
    compareSlug: "sony-wh-1000xm5-vs-bose-quietcomfort-ultra",
    primaryAction: "View Alternative",
    secondaryAction: "Compare",
  },
  {
    id: "target-receipt",
    type: "receipt-review",
    title: "Target receipt is ready for review",
    description: "5 items were extracted. Confirm matches to unlock savings suggestions.",
    primaryAction: "Review Receipt",
  },
  {
    id: "ninja-warranty",
    type: "warranty-expiring",
    title: "Ninja Coffee Maker warranty expires in 32 days",
    description: "Review receipt details and set a reminder.",
    productSlug: "ninja-coffee-maker",
    primaryAction: "View Warranty",
  },
  {
    id: "macbook-alert",
    type: "alert-suggestion",
    title: "Create alert for MacBook Air M3",
    description: "Price has been volatile. Set a target price to avoid overpaying.",
    productSlug: "macbook-air-m3",
    primaryAction: "Create Alert",
    secondaryAction: "Dismiss",
  },
];

export const watchlistProducts: WatchedProduct[] = [
  { id: "sony-wh-1000xm5", name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5", currentPrice: 299.99, targetPrice: 249.99, status: "Wait", aiBuyScore: 76 },
  { id: "dyson-v15", name: "Dyson V15", slug: "dyson-v15", currentPrice: 549, targetPrice: 499, status: "Close to target", aiBuyScore: 82 },
  { id: "apple-airpods-max", name: "Apple AirPods Max", slug: "apple-airpods-max", currentPrice: 449.99, targetPrice: 399, status: "Watch", aiBuyScore: 72 },
];

export const savedProducts: SavedProduct[] = [
  { id: "sony-wh-1000xm5", name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5", verdict: "WAIT", aiBuyScore: 76, currentPrice: 299.99, imageSrc: "/compare/sony-wh-1000xm5-black.png" },
  { id: "bose-quietcomfort-ultra", name: "Bose QuietComfort Ultra", slug: "bose-quietcomfort-ultra", verdict: "BUY", aiBuyScore: 84, currentPrice: 249.99, imageSrc: "/compare/bose-qc-ultra-black.png" },
  { id: "macbook-air-m3", name: "MacBook Air M3", slug: "macbook-air-m3", verdict: "BUY", aiBuyScore: 88, currentPrice: 1099 },
  { id: "ninja-coffee-maker", name: "Ninja Coffee Maker", slug: "ninja-coffee-maker", verdict: "WAIT", aiBuyScore: 72, currentPrice: 89.99 },
];

export const purchaseSummaries: PurchaseSummary[] = [
  { id: "purchase-sony", productName: "Sony WH-1000XM5", productSlug: "sony-wh-1000xm5", store: "Amazon", orderDate: "2026-04-18", paidPrice: 279.99, savedAmount: 69.99, warrantyStatus: "active" },
  { id: "purchase-macbook", productName: "MacBook Air M3", productSlug: "macbook-air-m3", store: "Best Buy", orderDate: "2026-04-03", paidPrice: 1099, savedAmount: 150, warrantyStatus: "active" },
  { id: "purchase-ninja", productName: "Ninja 12-Cup Coffee Maker", productSlug: "ninja-coffee-maker", store: "Walmart", orderDate: "2025-07-01", paidPrice: 89.99, savedAmount: 22, warrantyStatus: "expiring" },
  { id: "purchase-nike", productName: "Nike Air Zoom Pegasus 41", productSlug: "nike-air-zoom-pegasus-41", store: "Nike", orderDate: "2026-03-21", paidPrice: 119.99, savedAmount: 18, warrantyStatus: "none" },
];

export const warrantySummaries: WarrantySummary[] = [
  { id: "warranty-ninja", productName: "Ninja Coffee Maker", productSlug: "ninja-coffee-maker", expiresInDays: 32, status: "expiring" },
  { id: "warranty-sony", productName: "Sony WH-1000XM5", productSlug: "sony-wh-1000xm5", expiresInDays: 730, status: "active" },
  { id: "warranty-macbook", productName: "MacBook Air M3", productSlug: "macbook-air-m3", expiresInDays: 730, status: "active" },
];

export const recommendations: Recommendation[] = [
  { id: "headphones-under-300", title: "Better headphones under $300", aiReason: "You saved two premium headphone models and Bose is now below your target band.", estimatedSavings: 50, confidence: "High", searchQuery: "better headphones under 300" },
  { id: "macbook-upgrade", title: "Laptop upgrade based on your saved MacBook", aiReason: "Current M3 pricing is strong, but open-box M4 alternatives are getting close.", estimatedSavings: 120, confidence: "Medium", searchQuery: "MacBook Air M3 alternatives" },
  { id: "coffee-reliability", title: "Coffee maker with stronger reliability", aiReason: "Your Ninja warranty is expiring soon and newer Breville models score higher on reliability.", estimatedSavings: 35, confidence: "High", searchQuery: "reliable coffee maker alternative" },
  { id: "running-shoes", title: "Running shoes with higher review trust", aiReason: "Your recent Nike purchase has mixed durability mentions in long-term reviews.", estimatedSavings: 28, confidence: "Medium", searchQuery: "running shoes higher review trust" },
];

export const notifications: NotificationItem[] = [
  { id: "notif-bose", title: "Bose QuietComfort Ultra dropped $40.", description: "Best Buy is close to a 90-day low.", route: "/product/bose-quietcomfort-ultra" },
  { id: "notif-ninja", title: "Ninja Coffee Maker warranty expires soon.", description: "Review receipt details and set a reminder.", route: "/dashboard/receipts?filter=warranties" },
  { id: "notif-sony", title: "Better alternative found for Sony WH-1000XM5.", description: "Bose is stronger on value today.", route: "/product/bose-quietcomfort-ultra" },
];

export const actionTypeLabels: Record<SmartActionType, { label: string; icon: typeof Sparkles }> = {
  "price-drop": { label: "Price Drop", icon: TrendingDown },
  "better-alternative": { label: "Better Alternative", icon: Sparkles },
  "receipt-review": { label: "Receipt Review", icon: ReceiptText },
  "warranty-expiring": { label: "Warranty", icon: Clock3 },
  "alert-suggestion": { label: "Suggested Alert", icon: Tag },
};

export const savingsCategories = [
  { label: "Electronics", value: 58, color: "#16a34a" },
  { label: "Home & Kitchen", value: 17, color: "#ff9500" },
  { label: "Fashion", value: 13, color: "#4b09a9" },
  { label: "Beauty", value: 7, color: "#1f7ae0" },
  { label: "Other", value: 5, color: "#94a3b8" },
];

export const assistantSummaryRows = [
  "1 better alternative found",
  "2 price drops detected",
  "1 receipt needs review",
  "3 warranties being tracked",
];

export const aiPanelIcon = Bot;
