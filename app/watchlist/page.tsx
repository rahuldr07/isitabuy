import Link from "next/link";
import SearchHeader from "../components/SearchHeader";
import Footer from "../components/Footer";

export const metadata = {
  title: "Watchlist - IsItABuy AI",
};

export default function WatchlistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <SearchHeader />
      <main className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-stack-md flex flex-col gap-stack-lg">
        {/* Header Section */}
        <section className="flex flex-col gap-stack-sm">
          <nav className="flex items-center text-label-sm text-on-surface-variant font-label-sm gap-2">
            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-surface font-semibold">Watchlist</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <h1 className="font-headline-lg text-headline-lg lg:text-display-xl text-on-surface">My watchlist</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Track saved products, price changes, AI verdict updates, and better alternatives in one place.</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Scores are not based on commission
                </div>
                <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">update</span>
                  Prices refreshed 4 minutes ago
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button className="flex items-center justify-center gap-2 bg-surface-container-lowest text-on-surface border border-outline font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-surface-container-low transition-colors shadow-sm">
                <span className="material-symbols-outlined">link</span>
                Paste product URL
              </button>
              <button className="flex items-center justify-center gap-2 bg-primary-container text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-[#d97706] transition-colors shadow-sm">
                <span className="material-symbols-outlined">add</span>
                Add product
              </button>
            </div>
          </div>
        </section>

        {/* Summary Cards Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Saved products</span>
              <span className="material-symbols-outlined">bookmark</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">12</div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-verdict-buy">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Price drops</span>
              <span className="material-symbols-outlined">trending_down</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">4</div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-primary-container">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Active alerts</span>
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">7</div>
          </div>
          <div className="bg-verdict-better rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-verdict-buy">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Better alternatives</span>
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-white">3</div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-gutter relative">
          {/* Left Column: Products List */}
          <div className="flex-grow flex flex-col gap-6">
            {/* Search & Filters */}
            <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input className="w-full bg-surface-container-low border border-surface-variant rounded-lg pl-12 pr-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary-container focus:border-transparent transition-shadow" placeholder="Search your saved products..." type="text" />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
                  <select className="bg-surface-container-low border border-surface-variant rounded-lg px-4 py-3 font-label-sm text-label-sm text-on-surface focus:ring-2 focus:ring-primary-container w-full md:w-auto">
                    <option>Recently saved</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Biggest Drop %</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="bg-on-surface text-white px-4 py-1.5 rounded-full font-label-sm text-label-sm">All</button>
                <button className="bg-surface-container-low hover:bg-surface-container-highest text-on-surface border border-surface-variant px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors">Price dropped</button>
                <button className="bg-surface-container-low hover:bg-surface-container-highest text-on-surface border border-surface-variant px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors">Alert active</button>
                <button className="bg-surface-container-low hover:bg-surface-container-highest text-on-surface border border-surface-variant px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors">Verdict changed</button>
                <button className="bg-surface-container-low hover:bg-surface-container-highest text-on-surface border border-surface-variant px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-verdict-buy">auto_awesome</span>
                  Better alternative
                </button>
              </div>
            </div>

            {/* Product List */}
            <div className="flex flex-col gap-4">
              {/* Card 1: Buy */}
              <div className="bg-surface-container-lowest rounded-xl border-l-4 border-l-verdict-buy border-y border-r border-surface-variant shadow-[0px_10px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col sm:flex-row relative">
                <div className="absolute top-4 left-4 z-10">
                  <input className="rounded border-surface-variant text-primary-container focus:ring-primary-container w-5 h-5 cursor-pointer" type="checkbox" />
                </div>
                <div className="w-full sm:w-48 h-48 sm:h-auto bg-surface-container-low relative shrink-0 p-4">
                  <img
                    alt="Sony WH-1000XM5 headphones"
                    className="w-full h-full object-contain mix-blend-multiply"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBekChrPoeFZr9NzxmBzRWQ1-K1YXjP5eYNu2TU3vbX0sWpHAcUHKxs3UrVCkrdYUgAb-jJKiDTbUqnxN59Wt_omC1AjVo2Q8XIxQ8cbct_ylZ2KRI979M0GgQC7dqHRgrFN7Fh_VtNq5D5EyLTP5iaqpjyf5WiukQP5Kg4g9zFXKvdWCAlEdQqitf3Pto7xJxmS4OkoWNjg7O_dHMAbrGFY_GpflUoB00Uwy2hzmr4RaWXeJrMUSJCl54JVAWN_3PdXpK4miGXeIc"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sony • Electronics</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Saved Oct 12</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1">Sony WH-1000XM5</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 bg-verdict-buy/10 text-verdict-buy px-3 py-1 rounded-full font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Buy
                      </div>
                      <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-primary-container">psychology</span>
                        AI Score: 86/100
                      </div>
                      <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface bg-surface-container-low px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[16px] text-verdict-buy">notifications_active</span>
                        Target reached ($299)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-6 gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface">$299.00</span>
                        <span className="font-body-md text-body-md text-on-surface-variant line-through">$329.00</span>
                      </div>
                      <div className="flex items-center gap-1 text-verdict-buy font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                        Down $30 (9%)
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a href="/product" className="bg-surface-container-lowest text-on-surface border border-outline font-label-sm text-label-sm px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center">View AI analysis</a>
                      <button className="bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-lg hover:bg-[#d97706] transition-colors">View best offer</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Wait / Alternative */}
              <div className="bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col sm:flex-row relative">
                <div className="absolute top-4 left-4 z-10">
                  <input className="rounded border-surface-variant text-primary-container focus:ring-primary-container w-5 h-5 cursor-pointer" type="checkbox" />
                </div>
                <div className="w-full sm:w-48 h-48 sm:h-auto bg-surface-container-low relative shrink-0 p-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-surface-variant">laptop_mac</span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Apple • Laptops</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Saved Oct 15</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1">MacBook Air 13&quot; M3</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 bg-primary-container/10 text-primary-container px-3 py-1 rounded-full font-label-sm text-label-sm border border-primary-container/20">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        Wait
                      </div>
                      <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-primary-container">psychology</span>
                        AI Score: 78/100
                      </div>
                    </div>
                    <div className="mt-3 bg-verdict-better text-white rounded-lg p-3 flex items-start gap-3">
                      <span className="material-symbols-outlined text-verdict-buy shrink-0">auto_awesome</span>
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm font-semibold">Better alternative found</span>
                        <span className="font-body-md text-sm text-white/70">Lenovo Slim 7i saves $120 with similar performance.</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-6 gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-lg text-headline-lg text-on-surface">$999.00</span>
                        <span className="font-body-md text-body-md text-on-surface-variant line-through">$949.00</span>
                      </div>
                      <div className="flex items-center gap-1 text-verdict-avoid font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                        Up $50 (5%)
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a href="/alternatives" className="bg-verdict-better text-white font-label-sm text-label-sm px-4 py-2 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                        View alternative
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            <div className="sticky top-[100px] flex flex-col gap-6">
              {/* Recommended Actions */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                <div className="flex items-center gap-2 text-on-surface pb-2 border-b border-surface-variant">
                  <span className="material-symbols-outlined text-primary-container">lightbulb</span>
                  <h3 className="font-headline-md text-lg">Recommended actions</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <a className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors group" href="/product">
                    <div className="bg-verdict-buy/10 text-verdict-buy p-2 rounded-full shrink-0 group-hover:bg-verdict-buy/20 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface">Buy Sony WH-1000XM5 now</p>
                      <p className="text-sm text-on-surface-variant">Hit target price of $299.</p>
                    </div>
                  </a>
                  <a className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors group" href="/price-tracker">
                    <div className="bg-primary-container/10 text-primary-container p-2 rounded-full shrink-0 group-hover:bg-primary-container/20 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface">Wait on MacBook Air M3</p>
                      <p className="text-sm text-on-surface-variant">Price trending upwards.</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Alert Summary */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                <h3 className="font-headline-md text-lg text-on-surface">Alert summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="font-headline-lg text-headline-lg text-primary-container">7</span>
                    <span className="font-label-sm text-xs text-on-surface-variant">Active</span>
                  </div>
                  <div className="bg-verdict-buy/10 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="font-headline-lg text-headline-lg text-verdict-buy">2</span>
                    <span className="font-label-sm text-xs text-verdict-buy">Triggered</span>
                  </div>
                </div>
                <button className="w-full mt-2 text-primary-container font-label-sm text-label-sm hover:underline py-2 text-center">Manage all alerts</button>
              </div>

              {/* Browser Extension CTA */}
              <div className="bg-gradient-to-br from-surface-container-low to-surface-container-highest rounded-xl p-6 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-3 items-center text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface mb-2">extension</span>
                <h3 className="font-headline-md text-lg text-on-surface">Track prices instantly</h3>
                <p className="font-body-md text-sm text-on-surface-variant">Add products to your watchlist directly from any store with our browser extension.</p>
                <button className="mt-2 w-full bg-on-surface text-white font-label-sm text-label-sm px-4 py-3 rounded-lg hover:bg-black transition-colors shadow-sm">
                  Get Extension - It&apos;s Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
