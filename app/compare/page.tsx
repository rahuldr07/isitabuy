"use client";

import { useState } from "react";
import CompareProductCard, { CompareProduct } from "../components/CompareProductCard";
import CompareFilterSidebar from "../components/CompareFilterSidebar";
import CompareTray from "../components/CompareTray";
import SimpleNav from "../components/SimpleNav";

const products: CompareProduct[] = [
  {
    id: 1,
    brand: "Sony",
    category: "Over-Ear Headphones",
    name: "Sony WH-1000XM5",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
    prices: [
      { retailer: "Amazon", price: 299, highlight: true },
      { retailer: "Best Buy", price: 329, highlight: false },
    ],
    description:
      "Industry-leading noise cancellation and superb sound quality make this the current benchmark for premium wireless audio.",
    verdict: "buy",
    aiScore: 86,
    trust: "9.2/10",
    value: "High",
    bestMatch: true,
  },
  {
    id: 2,
    brand: "Sennheiser",
    category: "Over-Ear Headphones",
    name: "Sennheiser Momentum 4",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300",
    prices: [{ retailer: "Amazon", price: 279, highlight: true }],
    description:
      "Exceptional 60-hour battery life and audiophile-grade sound quality offer superior value compared to mainstream competitors.",
    verdict: "better",
    aiScore: 88,
    trust: "8.8/10",
    value: "Expert",
  },
  {
    id: 3,
    brand: "Apple",
    category: "Over-Ear Headphones",
    name: "Apple AirPods Max",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300",
    prices: [
      { retailer: "Amazon", price: 449, highlight: true },
      { retailer: "Target", price: 549, highlight: false },
    ],
    description:
      "Excellent build and integration, but due for a hardware update soon; current price point does not reflect the aging technology.",
    verdict: "wait",
    aiScore: 72,
    trust: "8.5/10",
    value: "Low",
  },
  {
    id: 4,
    brand: "Generic",
    category: "Over-Ear Headphones",
    name: "ProSound Active Noise Cancelling",
    image: "",
    prices: [{ retailer: "Amazon", price: 89, highlight: true }],
    description:
      "High rate of fake reviews detected. Actual user sentiment points to poor build quality and ineffective noise cancellation.",
    verdict: "avoid",
    aiScore: 46,
    trust: "3.1/10",
    value: "Poor",
  },
];

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      {/* Navbar */}
      <SimpleNav variant="sticky" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md">
        {/* Search Header */}
        <div className="mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg mb-4 text-on-surface">
            Search results for &apos;Noise-canceling headphones&apos;
          </h1>
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                shopping_bag
              </span>
              <input
                className="w-full h-[56px] pl-12 pr-4 bg-surface-container-lowest border border-surface-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-container shadow-inner font-body-md text-body-md"
                placeholder="Search product or paste URL..."
                type="text"
                defaultValue="Noise-canceling headphones"
              />
            </div>
            <button className="h-[56px] px-8 bg-surface-container-lowest border border-surface-variant rounded-xl font-label-sm text-label-sm text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">link</span>
              Paste URL
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar */}
          <CompareFilterSidebar />

          {/* Results */}
          <div className="flex-grow space-y-4">
            {/* Summary Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-body-md text-body-md text-secondary">
                  24 products found
                </span>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface">
                    Verdict: Buy, Wait
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-error transition-colors">
                      close
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-secondary">
                  Sort by:
                </span>
                <select className="bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-1.5 font-label-sm text-label-sm focus:outline-none focus:ring-2 focus:ring-primary-container text-on-surface">
                  <option>AI Recommendation</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Review Trust Score</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {products.map((product) => (
              <CompareProductCard
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onSelect={toggleSelect}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Compare Tray */}
      <CompareTray
        selectedProducts={selectedProducts}
        onClear={() => setSelectedIds([])}
      />

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-inverse-surface w-full mt-stack-lg border-t border-outline-variant dark:border-none pb-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter py-stack-md max-w-container-max mx-auto">
          <div className="col-span-1 md:col-span-4 mb-4">
            <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-surface-bright">
              IsItABuy AI
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 flex flex-wrap gap-4 mb-8">
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              How It Works
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              Browser Extension
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              Price Tracker
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              Compare
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              About Us
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
              href="#"
            >
              Contact Support
            </a>
          </div>
          <div className="col-span-1 md:col-span-4">
            <p className="font-body-md text-body-md text-secondary text-sm">
              &copy; 2026 IsItABuy AI. All rights reserved. Affiliate disclosure: We
              may earn a commission when you use one of our links to make a
              purchase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
