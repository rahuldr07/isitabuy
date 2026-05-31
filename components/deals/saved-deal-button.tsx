"use client";

import { useMemo, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
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

const savedDealsKey = "isitabuy:saved-deals";

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
  window.addEventListener("isitabuy-saved-deals-change", handleSavedDealsChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("isitabuy-saved-deals-change", handleSavedDealsChange);
  };
}

function writeSavedDeals(deals: SavedDeal[]) {
  window.localStorage.setItem(savedDealsKey, JSON.stringify(deals));
  window.dispatchEvent(new CustomEvent("isitabuy-saved-deals-change"));
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
    <motion.button
      animate={saved ? { scale: [1, 1.18, 1], rotate: [0, -8, 0] } : { scale: 1, rotate: 0 }}
      aria-label={saved ? `Remove ${deal.name} from saved products` : `Save ${deal.name}`}
      aria-pressed={saved}
      className={`grid size-6 place-items-center rounded-full border shadow-sm transition-colors ${
        saved
          ? "border-[#f97316] bg-[#ffedd5] text-[#ea580c] shadow-[0_8px_18px_rgba(249,115,22,0.24)]"
          : "border-[#fed7aa] bg-[#fff7ed] text-[#c2410c] hover:border-[#fb923c] hover:bg-[#ffedd5] hover:text-[#ea580c]"
      }`}
      transition={{ duration: 0.28, ease: "easeOut" }}
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSaved}
      type="button"
    >
      <Heart className={`size-3.5 ${saved ? "fill-current" : ""}`} />
    </motion.button>
  );
}
