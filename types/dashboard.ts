import type { LucideIcon } from "lucide-react";

export type SmartActionType =
  | "price-drop"
  | "better-alternative"
  | "receipt-review"
  | "warranty-expiring"
  | "alert-suggestion";

export type ProductVerdict = "BUY" | "WAIT" | "AVOID";

export type ProductStatus = "Wait" | "Close to target" | "Watch" | "Active" | "Expiring" | "No warranty";

export interface DashboardUser {
  name: string;
  email: string;
  plan: string;
  initials: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  helper: string;
  trend?: string;
  icon: LucideIcon;
  action: "savings" | "alerts" | "watchlist" | "receipts" | "priceDrops" | "warranties";
}

export interface SmartAction {
  id: string;
  type: SmartActionType;
  title: string;
  description: string;
  productSlug?: string;
  compareSlug?: string;
  retailer?: string;
  primaryAction: string;
  secondaryAction?: string;
}

export interface WatchedProduct {
  id: string;
  name: string;
  slug: string;
  currentPrice: number;
  targetPrice: number;
  status: "Wait" | "Close to target" | "Watch";
  aiBuyScore: number;
}

export interface SavedProduct {
  id: string;
  name: string;
  slug: string;
  verdict: ProductVerdict;
  aiBuyScore: number;
  currentPrice: number;
  imageSrc?: string;
}

export interface PurchaseSummary {
  id: string;
  productName: string;
  productSlug: string;
  store: string;
  orderDate: string;
  paidPrice: number;
  savedAmount: number;
  warrantyStatus: "active" | "expiring" | "none";
}

export type ReceiptRecordStatus = "ready" | "protected" | "matched";

export interface ReceiptLineItem {
  id: string;
  productName: string;
  productSlug: string;
  paidPrice: number;
  insight: string;
  status: "Drop found" | "Warranty" | "Matched" | "Needs review";
  warrantyStatus: "active" | "expiring" | "none";
  returnWindowDays?: number;
}

export interface ReceiptRecord {
  id: string;
  store: string;
  purchaseDate: string;
  fileName: string;
  notes: string;
  uploadedAt: string;
  source: "demo" | "upload";
  itemCount: number;
  savingsFound: number;
  warrantiesTracked: number;
  returnAlerts: number;
  status: ReceiptRecordStatus;
  items: ReceiptLineItem[];
}

export interface WarrantySummary {
  id: string;
  productName: string;
  productSlug: string;
  expiresInDays: number;
  status: "active" | "expiring";
}

export interface Recommendation {
  id: string;
  title: string;
  slug?: string;
  aiReason: string;
  estimatedSavings: number;
  confidence: "High" | "Medium";
  searchQuery: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  route?: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  notifyWhen: string[];
  createdAt: string;
}

export interface ReceiptUploadDraft {
  fileName?: string;
  store: string;
  purchaseDate: string;
  notes: string;
}

export interface DashboardToast {
  title: string;
  description: string;
}

export type DashboardModalState =
  | { type: "none" }
  | { type: "uploadReceipt" }
  | { type: "priceAlert"; productId?: string }
  | { type: "purchaseDetail"; purchaseId: string }
  | { type: "warrantyDetail"; warrantyId: string }
  | { type: "savingsDetail" };

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface LocalStorageResult<T> {
  value: T;
  recovered: boolean;
}
