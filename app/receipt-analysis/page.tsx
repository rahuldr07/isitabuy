import SearchHeader from "../components/SearchHeader";
import Footer from "../components/Footer";

export const metadata = {
  title: "Receipt analysis | IsItABuy",
};

export default function ReceiptAnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <SearchHeader />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md lg:py-stack-lg w-full">
        {/* Above the Fold: Summary Area */}
        <section className="mb-stack-md">
          <nav className="mb-6">
            <p className="font-label-sm text-label-sm text-secondary/60 flex items-center gap-2">
              <a href="/" className="hover:text-primary">Home</a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <a href="/upload-receipt" className="hover:text-primary">Receipts</a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface">Target Order Jan 18, 2025</span>
            </p>
          </nav>
          <div className="bg-inverse-surface text-white rounded-2xl p-8 lg:p-12 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-verdict-avoid">shopping_bag</span>
                </div>
                <div>
                  <h1 className="font-display-xl text-3xl md:text-5xl font-bold tracking-tight">Target Order</h1>
                  <p className="text-white/60 font-body-lg text-lg">Purchased on Jan 18, 2025</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 text-left md:text-right">
              <p className="text-white/60 font-label-sm uppercase tracking-widest mb-1">Receipt Total</p>
              <p className="text-4xl md:text-6xl font-bold">$184.72</p>
              <div className="mt-4 flex flex-wrap md:justify-end gap-3">
                <button className="bg-primary-container text-on-primary px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform">Get Refund Help</button>
                <button className="bg-white/10 text-white backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all">Manage Data</button>
              </div>
            </div>
          </div>

          {/* Insights Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-surface-variant flex items-center gap-4">
              <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div>
                <p className="text-secondary text-[12px] font-bold uppercase tracking-wider">Inventory</p>
                <p className="text-xl font-bold">8 Items Purchased</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-surface-variant flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div>
                <p className="text-secondary text-[12px] font-bold uppercase tracking-wider">Recognition</p>
                <p className="text-xl font-bold">5 Matched Products</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-surface-variant flex items-center gap-4">
              <div className="w-12 h-12 bg-verdict-buy/10 rounded-full flex items-center justify-center text-verdict-buy">
                <span className="material-symbols-outlined">trending_down</span>
              </div>
              <div>
                <p className="text-secondary text-[12px] font-bold uppercase tracking-wider">Opportunity</p>
                <p className="text-xl font-bold text-verdict-buy">$51.98 Savings</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-surface-variant flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-container/10 rounded-full flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <p className="text-secondary text-[12px] font-bold uppercase tracking-wider">Security</p>
                <p className="text-xl font-bold">Privacy First</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Column: Product Analysis */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-md text-headline-md font-bold">Matched Product Analysis</h2>
                <span className="text-secondary text-label-sm">Prices updated 4 mins ago</span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {/* Sony Product Card */}
                <div className="bg-white rounded-2xl shadow-soft border border-surface-variant overflow-hidden border-t-4 border-t-verdict-buy hover:shadow-lg transition-shadow">
                  <div className="p-6 lg:p-8 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-32 h-32 bg-surface-container rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-on-surface-variant">headphones</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-verdict-buy text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Best Value</span>
                            <span className="text-secondary text-[12px] font-bold">Match Confidence: 98%</span>
                          </div>
                          <h3 className="font-bold text-xl lg:text-2xl">Sony WH-1000XM5</h3>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-secondary text-[12px] font-bold uppercase">AI Buy Score</p>
                          <p className="text-3xl font-extrabold text-verdict-buy">86<span className="text-lg text-secondary/40 font-normal">/100</span></p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-surface-container-lowest p-5 rounded-xl border border-surface-variant mb-6">
                        <div>
                          <p className="text-secondary text-[12px] mb-1">Receipt Price</p>
                          <p className="font-bold text-lg">$329.99</p>
                        </div>
                        <div>
                          <p className="text-secondary text-[12px] mb-1">Current Best Price</p>
                          <p className="font-bold text-lg text-verdict-buy">$299.00</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-secondary text-[12px] mb-1">Price Difference</p>
                          <p className="font-bold text-lg text-verdict-buy">-$30.99</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="/product" className="bg-primary-container text-on-primary font-bold px-6 py-3 rounded-xl hover:brightness-105 transition-all flex-1 text-center flex items-center justify-center">View AI Analysis</a>
                        <a href="/price-alerts" className="border border-outline text-on-surface font-bold px-6 py-3 rounded-xl hover:bg-surface-container-low transition-all flex-1 text-center flex items-center justify-center">Set Price Alert</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ninja Product Card */}
                <div className="bg-white rounded-2xl shadow-soft border border-surface-variant overflow-hidden border-t-4 border-t-verdict-buy hover:shadow-lg transition-shadow">
                  <div className="p-6 lg:p-8 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-32 h-32 bg-surface-container rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-on-surface-variant">blender</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-verdict-buy text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Solid Deal</span>
                            <span className="text-secondary text-[12px] font-bold">Match Confidence: 95%</span>
                          </div>
                          <h3 className="font-bold text-xl lg:text-2xl">Ninja AF101 Air Fryer</h3>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-secondary text-[12px] font-bold uppercase">AI Buy Score</p>
                          <p className="text-3xl font-extrabold text-verdict-buy">91<span className="text-lg text-secondary/40 font-normal">/100</span></p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-surface-container-lowest p-5 rounded-xl border border-surface-variant mb-6">
                        <div>
                          <p className="text-secondary text-[12px] mb-1">Receipt Price</p>
                          <p className="font-bold text-lg">$99.99</p>
                        </div>
                        <div>
                          <p className="text-secondary text-[12px] mb-1">Current Best Price</p>
                          <p className="font-bold text-lg text-verdict-buy">$79.00</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-secondary text-[12px] mb-1">Price Difference</p>
                          <p className="font-bold text-lg text-verdict-buy">-$20.99</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="/product" className="bg-primary-container text-on-primary font-bold px-6 py-3 rounded-xl hover:brightness-105 transition-all flex-1 text-center flex items-center justify-center">View AI Analysis</a>
                        <a href="/price-alerts" className="border border-outline text-on-surface font-bold px-6 py-3 rounded-xl hover:bg-surface-container-low transition-all flex-1 text-center flex items-center justify-center">Set Price Alert</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Better Alternatives Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                <h2 className="font-headline-md text-headline-md font-bold">Better Alternatives Found</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Alternative 1: Upgrade */}
                <div className="bg-inverse-surface text-white p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-[100px]">upgrade</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed mb-4 block">Upgrade Recommended</span>
                  <h4 className="font-bold text-lg mb-2">Anker USB-C Cable</h4>
                  <div className="flex items-center gap-3 text-white/60 mb-4 font-label-sm">
                    <span className="line-through">Generic Cable ($19.98)</span>
                    <span className="material-symbols-outlined text-verdict-buy">trending_up</span>
                    <span className="text-white font-bold">+$3.00</span>
                  </div>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">Offers 3x durability and faster charging. Durability score jump: <span className="text-verdict-buy font-bold">+22 pts</span>.</p>
                  <a href="/alternatives" className="text-verdict-buy font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">View Replacement <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>

                {/* Alternative 2: Value */}
                <div className="bg-white border border-surface-variant p-6 rounded-2xl shadow-soft">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 block">Better Value</span>
                  <h4 className="font-bold text-lg mb-2">CeraVe Hydrating Cleanser</h4>
                  <div className="flex items-center gap-3 text-secondary mb-4 font-label-sm">
                    <span className="line-through">Skincare cleanser ($14.99)</span>
                    <span className="material-symbols-outlined text-verdict-buy">trending_down</span>
                    <span className="text-verdict-buy font-bold">-$1.50</span>
                  </div>
                  <p className="text-secondary text-sm mb-6 leading-relaxed">Dermatologist recommended with 40% higher quantity per bottle and more stable price history.</p>
                  <a href="/alternatives" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">Switch Item <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            {/* Retailer Reminders */}
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-surface-variant">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-verdict-wait">notifications_active</span>
                <h4 className="font-bold text-lg">Retailer Reminders</h4>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1.5 h-12 bg-verdict-buy rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-bold text-label-sm mb-1">Sony Price Protection</p>
                    <p className="text-secondary text-sm leading-relaxed mb-2">Target offers 14-day price matching. You may be eligible for a $30.99 refund.</p>
                    <a className="text-primary font-bold text-[12px] uppercase hover:underline" href="#">Check retailer policy</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-12 bg-verdict-wait rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="font-bold text-label-sm mb-1">Ninja Return Window</p>
                    <p className="text-secondary text-sm leading-relaxed mb-2">Closing in 4 days. If unopened, check retailer policy for potential $21 savings.</p>
                    <a className="text-primary font-bold text-[12px] uppercase hover:underline" href="#">Check retailer policy</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-surface-variant">
              <h4 className="font-bold text-lg mb-6">Recommended Actions</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-surface-variant hover:border-primary group transition-all">
                  <span className="font-label-sm">Apply for Sony price drop</span>
                  <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">chevron_right</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-surface-variant hover:border-primary group transition-all">
                  <span className="font-label-sm">Set alert for Ninja (Lower)</span>
                  <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Privacy Card */}
            <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary">lock</span>
                <h4 className="font-bold">Privacy &amp; Data</h4>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-6">This receipt was analyzed locally. Only price metadata is stored to provide tracking. Your personal information is never sold or shared.</p>
              <button className="w-full bg-verdict-avoid/10 text-verdict-avoid py-3 rounded-xl font-bold text-sm hover:bg-verdict-avoid/20 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">delete</span> Delete receipt data
              </button>
            </div>
          </aside>
        </div>

        {/* Affiliate Disclosure */}
        <section className="mt-stack-lg py-8 border-y border-surface-variant">
          <p className="text-secondary text-sm text-center max-w-2xl mx-auto italic">
            Affiliate Disclosure: IsItABuy is a participant in several affiliate programs. When you click on links and make a purchase, we may receive a small commission at no additional cost to you. This helps us keep the lights on and provide free tools.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
