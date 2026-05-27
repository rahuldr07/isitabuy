"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Heart } from "lucide-react";

export interface SavedDeal {
  name: string;
  subtitle: string;
  image: string;
  price: string;
  oldPrice: string;
  retailer: string;
  rating: string;
  reviews: string;
  score: string;
  discount: string;
}

const savedDealsKey = "happy:saved-deals";

function savedDealsSnapshot() {
  if (typeof window === "undefined") return "[]";

  return window.localStorage.getItem(savedDealsKey) ?? "[]";
}

function parseSavedDeals(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed as SavedDeal[] : [];
  } catch {
    return [];
  }
}

function subscribeToSavedDeals(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === savedDealsKey) onStoreChange();
  }

  function handleSavedDealsChange() {
    onStoreChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener("happy-saved-deals-change", handleSavedDealsChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("happy-saved-deals-change", handleSavedDealsChange);
  };
}

function writeSavedDeals(deals: SavedDeal[]) {
  window.localStorage.setItem(savedDealsKey, JSON.stringify(deals));
  window.dispatchEvent(new CustomEvent("happy-saved-deals-change"));
}

export default function SavedDealButton({ deal }: { deal: SavedDeal }) {
  const savedDealsJson = useSyncExternalStore(subscribeToSavedDeals, savedDealsSnapshot, () => "[]");
  const savedDeals = useMemo(() => parseSavedDeals(savedDealsJson), [savedDealsJson]);
  const saved = useMemo(() => savedDeals.some((item) => item.name === deal.name), [deal.name, savedDeals]);

  function toggleSaved() {
    const nextSavedDeals = saved
      ? savedDeals.filter((item) => item.name !== deal.name)
      : [deal, ...savedDeals.filter((item) => item.name !== deal.name)];

    writeSavedDeals(nextSavedDeals);
  }

  return (
    <button
      aria-label={saved ? `Remove ${deal.name} from saved products` : `Save ${deal.name}`}
      aria-pressed={saved}
      className={`grid size-6 place-items-center rounded-full border shadow-sm transition-colors ${
        saved
          ? "border-[#4f46e5] bg-[#f0ecff] text-[#4f46e5]"
          : "border-border bg-white text-muted-foreground hover:border-[#4f46e5] hover:text-[#4f46e5]"
      }`}
      onClick={toggleSaved}
      type="button"
    >
      <Heart className={`size-3.5 ${saved ? "fill-current" : ""}`} />
    </button>
  );
}
