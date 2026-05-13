"use client";

import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  verdict: "buy" | "wait" | "avoid";
  aiScore: number;
  reviewTrust: string;
  priceScore: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const verdictConfig = {
    buy: {
      label: "Buy",
      color: "text-verdict-buy",
      bgColor: "bg-verdict-buy",
      tintColor: "bg-verdict-buy-tint",
      icon: "check_circle",
    },
    wait: {
      label: "Wait",
      color: "text-verdict-wait",
      bgColor: "bg-verdict-wait",
      tintColor: "bg-verdict-wait-tint",
      icon: "schedule",
    },
    avoid: {
      label: "Avoid",
      color: "text-verdict-avoid",
      bgColor: "bg-verdict-avoid",
      tintColor: "bg-verdict-avoid-tint",
      icon: "warning",
    },
  };

  const config = verdictConfig[product.verdict];

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-soft border border-surface-variant/50 relative overflow-hidden group hover:shadow-elevated transition-shadow">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
        {product.name}
      </h3>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full sm:w-48 h-48 bg-surface-variant rounded-2xl flex-shrink-0 relative overflow-hidden">
          <img
            alt={product.name}
            className="object-cover w-full h-full"
            src={product.image}
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow flex flex-col justify-between">
          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface p-4 rounded-2xl mb-4">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary mb-1">
                Current Price
              </span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                ${product.price}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary mb-1">
                AI Verdict
              </span>
              <span
                className={`font-label-sm text-label-sm font-bold flex items-center ${config.color}`}
              >
                <span className="material-symbols-outlined text-sm mr-1">
                  {config.icon}
                </span>
                {config.label}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary mb-1">
                AI Buy Score
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                {product.aiScore}/100
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary mb-1">
                Review Trust
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                {product.reviewTrust}
              </span>
            </div>

            {/* Price Score Row */}
            <div className="flex flex-col col-span-2 md:col-span-4 mt-2 pt-2 border-t border-surface-variant/50">
              <span className="font-label-sm text-label-sm text-secondary mb-1">
                Price Score
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                {product.priceScore}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Link
              href="/product"
              className="bg-primary-container text-white font-label-sm text-label-sm px-6 py-2.5 rounded-full hover:bg-primary-container/90 transition-colors font-bold text-center"
            >
              View AI Analysis
            </Link>
            <div className="flex space-x-2">
              <button className="p-2 text-secondary hover:text-primary-container hover:bg-surface-variant/50 rounded-full transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="p-2 text-secondary hover:text-primary-container hover:bg-surface-variant/50 rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
