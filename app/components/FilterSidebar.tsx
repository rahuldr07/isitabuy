"use client";

import { useState } from "react";

export default function FilterSidebar() {
  const [filters, setFilters] = useState({
    verdict: {
      buy: false,
      wait: false,
      avoid: false,
    },
    category: {
      electronics: true,
      homeKitchen: false,
    },
    retailer: {
      amazon: true,
      bestBuy: false,
      walmart: false,
      target: false,
      ebay: false,
    },
  });

  const handleVerdictChange = (key: keyof typeof filters.verdict) => {
    setFilters((prev) => ({
      ...prev,
      verdict: {
        ...prev.verdict,
        [key]: !prev.verdict[key],
      },
    }));
  };

  const handleCategoryChange = (key: keyof typeof filters.category) => {
    setFilters((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        [key]: !prev.category[key],
      },
    }));
  };

  const handleRetailerChange = (key: keyof typeof filters.retailer) => {
    setFilters((prev) => ({
      ...prev,
      retailer: {
        ...prev.retailer,
        [key]: !prev.retailer[key],
      },
    }));
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-soft border border-surface-variant/50 sticky top-32">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-md text-on-surface font-bold">Filters</h2>
          <button className="text-label-sm text-secondary hover:text-primary-container">
            Clear all
          </button>
        </div>

        {/* AI Verdict */}
        <div className="mb-6 pb-6 border-b border-surface-variant/50">
          <h3 className="text-label-sm text-on-surface mb-3 font-semibold">
            AI Verdict
          </h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verdict.buy}
                onChange={() => handleVerdictChange("buy")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">Buy</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verdict.wait}
                onChange={() => handleVerdictChange("wait")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Wait
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verdict.avoid}
                onChange={() => handleVerdictChange("avoid")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Avoid
              </span>
            </label>
          </div>
        </div>

        {/* Category */}
        <div className="mb-6 pb-6 border-b border-surface-variant/50">
          <h3 className="text-label-sm text-on-surface mb-3 font-semibold">
            Category
          </h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.electronics}
                onChange={() => handleCategoryChange("electronics")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Electronics
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.homeKitchen}
                onChange={() => handleCategoryChange("homeKitchen")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Home &amp; Kitchen
              </span>
            </label>
          </div>
        </div>

        {/* Retailer */}
        <div>
          <h3 className="text-label-sm text-on-surface mb-3 font-semibold">
            Retailer
          </h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.retailer.amazon}
                onChange={() => handleRetailerChange("amazon")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Amazon
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.retailer.bestBuy}
                onChange={() => handleRetailerChange("bestBuy")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Best Buy
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.retailer.walmart}
                onChange={() => handleRetailerChange("walmart")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Walmart
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.retailer.target}
                onChange={() => handleRetailerChange("target")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                Target
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.retailer.ebay}
                onChange={() => handleRetailerChange("ebay")}
                className="rounded border-surface-variant text-primary-container focus:ring-primary-container"
              />
              <span className="text-body-md text-on-surface-variant">
                eBay
              </span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
