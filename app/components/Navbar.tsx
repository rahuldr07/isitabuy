import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm border-b border-surface-variant/50">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-8 h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-2xl">
            shopping_bag
          </span>
          <span className="text-xl font-bold text-on-surface tracking-tight">
            IsItABuy
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="#"
          >
            How It Works
          </a>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/best-laptops"
          >
            Extension
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/price-tracker"
          >
            Tracker
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/price-alerts"
          >
            Alerts
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/compare"
          >
            Compare
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/deals"
          >
            Deals
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/watchlist"
          >
            Watchlist
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/upload-receipt"
          >
            Receipt
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/receipt-analysis"
          >
            Analysis
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/concierge"
          >
            Concierge
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/ai-chat"
          >
            AI Chat
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/preferences"
          >
            Preferences
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/signin"
          >
            Sign In
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/better-alternatives"
          >
            Alternatives
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="/deals-worth"
          >
            Deals Worth
          </Link>
        </nav>
        <div className="flex items-center">
          <Link
            href="/search"
            className="text-sm font-medium text-white px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
