import SearchHeader from "../components/SearchHeader";
import Footer from "../components/Footer";

export const metadata = {
  title: "Price Alerts | IsItABuy",
};

export default function PriceAlertsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <SearchHeader />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md w-full">
        {/* Breadcrumb & Title */}
        <header className="mb-stack-md">
          <nav className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
            <a className="hover:text-primary" href="/">Home</a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Price Alerts</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Price Alerts</h1>
              <p className="text-on-surface-variant text-lg max-w-2xl">Monitor your target prices and receive instant notifications across all your devices.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-on-surface-variant text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span> Prices refreshed 4 minutes ago
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-gutter">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface p-5 rounded-2xl border border-outline-variant premium-shadow">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Active</p>
                <p className="text-3xl font-bold text-on-surface">7</p>
              </div>
              <div className="bg-surface p-5 rounded-2xl border border-outline-variant premium-shadow border-l-4 border-l-verdict-buy">
                <p className="text-xs font-bold text-verdict-buy uppercase tracking-wider mb-1">Triggered</p>
                <p className="text-3xl font-bold text-on-surface">3</p>
              </div>
              <div className="bg-surface p-5 rounded-2xl border border-outline-variant premium-shadow border-l-4 border-l-verdict-wait">
                <p className="text-xs font-bold text-verdict-wait uppercase tracking-wider mb-1">Near Target</p>
                <p className="text-3xl font-bold text-on-surface">4</p>
              </div>
              <div className="p-5 rounded-2xl premium-shadow bg-[#001e2d]">
                <p className="text-xs font-bold uppercase tracking-wider mb-1 text-white">Best Value</p>
                <p className="text-3xl font-bold text-white">2</p>
              </div>
            </div>

            {/* Active Alerts Section */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Active Alerts</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-semibold bg-on-surface text-white rounded-full">All Alerts</button>
                  <button className="px-3 py-1.5 text-xs font-semibold bg-surface border border-outline-variant text-on-surface-variant rounded-full hover:bg-surface-container-low transition-colors">By Price</button>
                </div>
              </div>

              {/* Alert Card 1: Reached */}
              <div className="bg-surface rounded-2xl border border-outline-variant premium-shadow overflow-hidden group">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 md:h-auto h-48 bg-surface-container-low p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant">headphones</span>
                  </div>
                  <div className="flex-grow p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-verdict-buy/10 text-verdict-buy rounded">Target Reached</span>
                          <span className="text-on-surface-variant text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">mail</span> Email
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-on-surface">Sony WH-1000XM5</h3>
                        <p className="text-on-surface-variant text-sm">Fixed Price Alert • Amazon</p>
                      </div>
                      <div className="flex items-start sm:items-end flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-on-surface">$299.00</span>
                          <span className="text-sm font-bold text-verdict-buy">-$30.00</span>
                        </div>
                        <p className="text-xs text-on-surface-variant">Target: $299.00</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                      <div className="flex gap-2">
                        <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-verdict-avoid hover:bg-red-50 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                      <button className="bg-verdict-buy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg shadow-verdict-buy/20 transition-all">Purchase Now</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Card 2: Active */}
              <div className="bg-surface rounded-2xl border border-outline-variant premium-shadow overflow-hidden group">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 md:h-auto h-48 bg-surface-container-low p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant">laptop_mac</span>
                  </div>
                  <div className="flex-grow p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-verdict-wait/10 text-verdict-wait rounded">Active • Waiting</span>
                          <span className="text-on-surface-variant text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">notifications_active</span> Push
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-on-surface">MacBook Air M3 (13&quot;)</h3>
                        <p className="text-on-surface-variant text-sm">Percent Drop (10%) • Apple Store</p>
                      </div>
                      <div className="flex items-start sm:items-end flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-on-surface">$999.00</span>
                          <span className="text-sm font-bold text-verdict-wait">+$100 to target</span>
                        </div>
                        <p className="text-xs text-on-surface-variant">Target: $899.00</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                      <div className="flex gap-2">
                        <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-verdict-avoid hover:bg-red-50 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                      <a href="/price-tracker" className="border border-outline text-on-surface px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-surface-container-low transition-all flex items-center justify-center">View History</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Triggered Alerts History */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-verdict-buy">history</span>
                Recent History
              </h2>
              <div className="bg-surface rounded-2xl border border-outline-variant premium-shadow overflow-hidden">
                <div className="divide-y divide-outline-variant">
                  <div className="p-4 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-verdict-buy/10 flex items-center justify-center text-verdict-buy">
                        <span className="material-symbols-outlined">trending_down</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Ninja Air Fryer</p>
                        <p className="text-xs text-on-surface-variant">Price hit $89.99 (Target $90.00)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-verdict-buy">BOUGHT</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">Oct 24, 4:20 PM</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-verdict-wait/10 flex items-center justify-center text-verdict-wait">
                        <span className="material-symbols-outlined">notifications</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Sony WH-1000XM5</p>
                        <p className="text-xs text-on-surface-variant">Alert sent: Target reached</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-verdict-wait">NOTIFIED</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">Today, 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclosure */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong>Disclosure:</strong> We may earn a commission when you buy through some links. Our AI scores, alerts, price tracking, and recommendations are not based on commission. IsItABuy provides independent market analysis. Prices and availability are subject to change by retailers.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-gutter">
            {/* Create Alert Card */}
            <section className="bg-on-surface text-white p-8 rounded-2xl shadow-xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Track anything</h2>
                <p className="text-white/70 text-sm">Paste a product URL to start monitoring prices across 500+ stores.</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input className="w-full bg-white/10 border-white/20 rounded-xl py-4 pl-4 pr-12 focus:ring-primary-container focus:border-primary-container text-white placeholder-white/40 border" placeholder="Paste product link here..." type="text" />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/40">link</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60 ml-1">Target Price</label>
                    <input className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 focus:ring-primary-container focus:border-primary-container text-white border" placeholder="$0.00" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60 ml-1">Alert Rule</label>
                    <select className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 focus:ring-primary-container focus:border-primary-container text-white border appearance-none">
                      <option className="text-on-surface">Fixed Price</option>
                      <option className="text-on-surface">% Drop</option>
                    </select>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-3 ml-1">Notify via</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input defaultChecked className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary-container focus:ring-primary-container" type="checkbox" />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary-container focus:ring-primary-container" type="checkbox" />
                      <span className="text-sm">Push</span>
                    </label>
                  </div>
                </div>
                <button className="w-full bg-primary-container text-on-primary py-4 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary-container/20 mt-4">
                  Create Alert
                </button>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="bg-surface p-6 rounded-2xl border border-outline-variant premium-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Preferences</h3>
                <button className="text-primary text-sm font-bold">Manage</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">Email Summaries</span>
                  <div className="w-10 h-5 bg-verdict-buy rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">AI Buy/Sell Tips</span>
                  <div className="w-10 h-5 bg-verdict-buy rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Extension CTA */}
            <section className="bg-gradient-to-br from-primary to-primary-fixed p-6 rounded-2xl text-white relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <h3 className="text-xl font-extrabold mb-2">Track as you shop</h3>
                <p className="text-sm text-white/80 mb-6">See price history and &quot;Verdict&quot; score directly on retailer websites.</p>
                <button className="bg-white text-primary w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
                  <span className="material-symbols-outlined">add_to_home_screen</span>
                  Add to Chrome
                </button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-[160px] rotate-12">extension</span>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
