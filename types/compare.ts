import type { LucideIcon } from "lucide-react";

export type Verdict = "BUY" | "WAIT" | "AVOID";

export interface ProductScore {
  aiBuy: number;
  price: number;
  reviewTrust: "High" | "Medium" | "Low";
  performance: number;
  comfort: number;
  battery: number;
  features: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  rating: number;
  reviews: number;
  reviewTrust: string;
  tags: string[];
  currentPrice: number;
  listPrice: number;
  discountPercent: number;
  verdict: Verdict;
  scores: ProductScore;
  bestFor: string;
  imageSrc?: string;
  imageAlt: string;
  pros: string[];
  cons: string[];
  userFit: Record<string, string>;
}

export interface ScoreRow {
  id: keyof ProductScore | "bestFor" | "verdict";
  label: string;
  icon: LucideIcon;
  type: "score" | "trust" | "text" | "verdict";
}

export interface RetailerProductOffer {
  price: number;
  discountPercent?: number;
}

export interface RetailerOffer {
  id: string;
  retailer: string;
  logoSrc?: string;
  offers: Record<string, RetailerProductOffer>;
}

export interface ComparisonState {
  productA: Product | null;
  productB: Product | null;
  saved: boolean;
  activeCategory: Category["id"];
  aiRecommendationVisible: boolean;
  offersExpanded: boolean;
}

export interface ComparisonProductSlot {
  id: "A" | "B";
  label: "Product A" | "Product B";
  product: Product | null;
}

export interface Category {
  id: string;
  label: string;
}

export interface ToastMessage {
  title: string;
  description: string;
}
