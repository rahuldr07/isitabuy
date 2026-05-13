import Link from "next/link";

export default function SearchHeader() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-surface dark:bg-surface-dim sticky top-0 w-full z-50 shadow-sm dark:bg-surface-container-high transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface dark:text-on-surface"
          >
            IsItABuy
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="#"
            >
              How It Works
            </a>
            <a
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="#"
            >
              Browser Extension
            </a>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/deals"
            >
              Deals
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/price-tracker"
            >
              Price Tracker
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/price-alerts"
            >
              Price Alerts
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/compare"
            >
              Compare
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/watchlist"
            >
              Watchlist
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/upload-receipt"
            >
              Upload Receipt
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/receipt-analysis"
            >
              Analysis
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/concierge"
            >
              Concierge
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/ai-chat"
            >
              AI Chat
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/preferences"
            >
              Preferences
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/signin"
            >
              Sign In
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/better-alternatives"
            >
              Alternatives
            </Link>
            <Link
              className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md"
              href="/deals-worth"
            >
              Deals Worth
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-6 py-3 rounded-full hover:opacity-90 transition-all font-bold">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Search Hero */}
      <div className="bg-surface-container-lowest border-b border-surface-variant/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg text-center">
          <div className="inline-flex items-center space-x-2 bg-surface-container-high px-4 py-2 rounded-full mb-6">
            <span
              className="material-symbols-outlined text-verdict-buy text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Our AI scores are not based on commission
            </span>
          </div>
          <h1 className="font-display-xl text-display-xl text-on-surface mb-4">
            Search any product
          </h1>
          <p className="font-body-lg text-body-lg text-secondary mb-8 max-w-3xl mx-auto">
            Find products across Amazon, Walmart, Best Buy, Target, and eBay.
            Filter by price, rating, retailer, and review trust.
          </p>

          {/* Search input */}
          <div className="relative max-w-3xl mx-auto mb-4 shadow-elevated rounded-full bg-surface-container-lowest flex items-center p-3 border border-surface-variant">
            <span className="material-symbols-outlined text-secondary ml-4 mr-2 text-2xl">
              search
            </span>
            <input
              className="flex-grow bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface h-14 outline-none"
              placeholder="Search product name, brand, model, UPC, or paste a product URL..."
              type="text"
            />
            <div className="flex space-x-2">
              <button className="bg-primary-container text-white font-label-sm text-label-sm px-8 py-3.5 rounded-full hover:bg-primary-container/90 transition-colors font-bold ml-2">
                Search
              </button>
            </div>
          </div>

          <p className="font-label-sm text-label-sm text-secondary">
            Try:{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Sony WH-1000XM5
            </span>
            ,{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Dyson V15
            </span>
            ,{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              MacBook Air M3
            </span>
            ,{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Ninja air fryer
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
