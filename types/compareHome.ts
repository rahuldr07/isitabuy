export interface CompareHomeProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  aiBuyScore: number;
  slug: string;
  imageSrc?: string;
  imageAlt: string;
}

export interface CompareHomeState {
  productA: CompareHomeProduct | null;
  productB: CompareHomeProduct | null;
  queryA: string;
  queryB: string;
  activeSlot: CompareSlotId;
}

export type CompareSlotId = "A" | "B";

export interface CompareCategory {
  id: string;
  label: string;
}

export interface CompareHomeToast {
  title: string;
  description: string;
}

export interface TrendingComparison {
  id: string;
  title: string;
  productA: string;
  productB: string;
  note: string;
}
