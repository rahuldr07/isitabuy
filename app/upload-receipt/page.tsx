import SearchHeader from "../components/SearchHeader";
import Footer from "../components/Footer";

export const metadata = {
  title: "Upload Receipt - IsItABuy AI",
};

export default function UploadReceiptPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <SearchHeader />
      <main className="max-w-[1200px] mx-auto px-gutter py-12 w-full">
        {/* Workflow Stepper: 7-Step Visualization */}
        <div className="mb-16 overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-between min-w-[1000px] px-4 relative">
            {/* Line Background */}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-outline-variant/20 -z-10"></div>
            {/* Step 1: Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold shadow-lg shadow-primary-container/20 ring-4 ring-white">1</div>
              <span className="text-xs font-bold text-primary">Upload</span>
            </div>
            {/* Step 2: Consent */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold ring-4 ring-white">2</div>
              <span className="text-xs text-secondary font-medium">Consent</span>
            </div>
            {/* Step 3: OCR */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold ring-4 ring-white">3</div>
              <span className="text-xs text-secondary font-medium">OCR Reading</span>
            </div>
            {/* Step 4: Review */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold ring-4 ring-white">4</div>
              <span className="text-xs text-secondary font-medium">Review</span>
            </div>
            {/* Step 5: Manual Correction */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold ring-4 ring-white">5</div>
              <span className="text-xs text-secondary font-medium whitespace-nowrap">Manual Correction</span>
            </div>
            {/* Step 6: Product Matching */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold ring-4 ring-white">6</div>
              <span className="text-xs text-secondary font-medium whitespace-nowrap">Product Matching</span>
            </div>
            {/* Step 7: Savings */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold ring-4 ring-white">7</div>
              <span className="text-xs text-secondary font-medium whitespace-nowrap">Savings Recommendations</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Focus Header */}
            <div>
              <h1 className="font-display-xl text-display-xl mb-4 text-on-surface">Find hidden savings</h1>
              <p className="font-body-lg text-body-lg text-secondary max-w-xl">
                Upload your receipts and let our AI find price matches and refund opportunities across major retailers.
              </p>
            </div>

            {/* Privacy Consent Note */}
            <div className="bg-white border border-outline-variant/40 p-6 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-xl">shield_lock</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface mb-1">Privacy &amp; Consent</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  To provide savings analysis, we use AI to securely process your purchase data. By uploading, you <span className="font-bold text-on-surface">consent to AI processing</span>. Your data is encrypted and never sold to third parties.
                </p>
              </div>
            </div>

            {/* Main Upload Card */}
            <section className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-outline-variant/30 overflow-hidden">
              <div className="p-10">
                <div className="border-2 border-dashed border-outline-variant/40 rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-surface-bright/30 hover:bg-surface-container-lowest transition-all group cursor-pointer">
                  <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary text-5xl">cloud_upload</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Drop your receipt here</h2>
                  <p className="font-body-md text-secondary mb-10 max-w-sm">Support for JPG, PNG, HEIC, and PDFs. Max 10MB.</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined text-xl">file_upload</span>
                      Choose File
                    </button>
                    <button className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-dim transition-all">
                      <span className="material-symbols-outlined text-xl">photo_camera</span>
                      Take Photo
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Processing Status Area */}
            <section className="bg-white rounded-2xl border border-outline-variant/30 p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-sm uppercase tracking-widest text-secondary">Current Status</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-secondary">Extracting data...</span>
                  <button className="text-verdict-wait font-bold text-sm hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Manual correction
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {/* Step Complete */}
                <div className="flex items-center gap-5 p-4 rounded-xl bg-verdict-buy/5 border border-verdict-buy/10">
                  <div className="w-8 h-8 rounded-full bg-verdict-buy flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-lg">check</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-sm text-on-surface">Uploading</p>
                      <span className="text-xs font-bold text-verdict-buy uppercase">Complete</span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">Receipt_BestBuy_Nov.pdf (2.4 MB)</p>
                  </div>
                </div>
                {/* Step Processing */}
                <div className="flex items-center gap-5 p-4 rounded-xl bg-verdict-wait/5 border border-verdict-wait/10">
                  <div className="w-8 h-8 rounded-full bg-verdict-wait flex items-center justify-center shrink-0 animate-pulse">
                    <span className="material-symbols-outlined text-white text-lg">sync</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-sm text-on-surface">OCR Reading</p>
                      <span className="text-xs font-bold text-verdict-wait italic uppercase">Processing 84%</span>
                    </div>
                    <div className="w-full bg-outline-variant/20 h-2 rounded-full mt-3 overflow-hidden">
                      <div className="bg-verdict-wait h-full rounded-full transition-all duration-500" style={{ width: "84%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Matched Product Cards Section */}
            <div className="space-y-8 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-on-surface">Matched Products</h3>
                <span className="text-sm font-medium text-secondary">2 Items Found</span>
              </div>

              {/* Match Card 1: Success */}
              <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-2xl transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-2 h-full bg-verdict-buy"></div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-40 h-40 bg-surface-container rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/20 p-4">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant">headphones</span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="bg-verdict-buy text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">Perfect Match</span>
                          <span className="text-xs text-secondary flex items-center gap-1.5 font-medium">
                            <span className="material-symbols-outlined text-sm text-verdict-buy">verified</span>
                            98% Match Confidence
                          </span>
                        </div>
                        <h4 className="text-xl font-extrabold text-on-surface">Sony WH-1000XM5 Wireless Headphones</h4>
                      </div>
                      <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30 text-right">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block mb-0.5">AI Buy Score</span>
                        <span className="text-xl font-black text-verdict-buy">9.2<span className="text-xs font-bold text-secondary ml-1">/ 10</span></span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-5 border-y border-outline-variant/10">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Receipt Price</span>
                        <p className="font-extrabold text-lg text-on-surface">$398.00</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Current Best</span>
                        <p className="font-extrabold text-lg text-verdict-buy">$329.00</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 space-y-0.5">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Price Difference</span>
                        <p className="font-extrabold text-lg text-verdict-buy flex items-center gap-1">
                          <span className="material-symbols-outlined text-xl">arrow_downward</span>
                          -$69.00
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6">
                      <a href="/product" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2">
                        View AI Analysis
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      </a>
                      <a href="/price-alerts" className="border border-outline-variant text-on-surface px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-all flex items-center justify-center">Set Price Alert</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Card 2: Warning */}
              <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden relative group opacity-90">
                <div className="absolute top-0 left-0 w-2 h-full bg-verdict-wait"></div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-40 h-40 bg-surface-container rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/20 p-4">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant">mouse</span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="bg-verdict-wait text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">Partial Match</span>
                          <span className="text-xs text-secondary flex items-center gap-1.5 font-medium">
                            <span className="material-symbols-outlined text-sm text-verdict-wait">help</span>
                            72% Match Confidence
                          </span>
                        </div>
                        <h4 className="text-xl font-extrabold text-on-surface">Logitech MX Master 3S Wireless Mouse</h4>
                      </div>
                      <div className="bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30 text-right">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block mb-0.5">AI Buy Score</span>
                        <span className="text-xl font-black text-verdict-wait">6.8<span className="text-xs font-bold text-secondary ml-1">/ 10</span></span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-5 border-y border-outline-variant/10">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Receipt Price</span>
                        <p className="font-extrabold text-lg text-on-surface">$99.00</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Current Best</span>
                        <p className="font-extrabold text-lg text-on-surface">$94.50</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 space-y-0.5">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Difference</span>
                        <p className="font-extrabold text-lg text-verdict-wait flex items-center gap-1">
                          <span className="material-symbols-outlined text-xl">trending_down</span>
                          -$4.50
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6">
                      <button className="bg-verdict-wait text-white px-6 py-3 rounded-xl text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2">
                        Review Extraction
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <a href="/price-alerts" className="border border-outline-variant text-on-surface px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-all flex items-center justify-center">Set Price Alert</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Retailer Info */}
            <div className="bg-white rounded-2xl border border-outline-variant/30 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">storefront</span>
                </div>
                <h3 className="font-bold text-on-surface">Supported Retailers</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Amazon", "Walmart", "Best Buy", "Target", "Apple", "Costco"].map((store) => (
                  <div key={store} className="bg-surface-container-low px-3 py-3 rounded-xl text-xs font-bold text-center border border-outline-variant/20">{store}</div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-verdict-buy/5 rounded-xl border border-verdict-buy/10">
                <p className="text-xs text-verdict-buy font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  95%+ Match Accuracy
                </p>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">lightbulb</span>
                Expert Tips
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-primary text-sm shrink-0">check_circle</span>
                  <p className="text-sm text-secondary leading-relaxed">Ensure <span className="font-bold text-on-surface">full receipt</span> is visible including store name, date, and final total.</p>
                </li>
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-primary text-sm shrink-0">check_circle</span>
                  <p className="text-sm text-secondary leading-relaxed">Flat lighting and <span className="font-bold text-on-surface">no glares</span> significantly speed up OCR processing.</p>
                </li>
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-primary text-sm shrink-0">check_circle</span>
                  <p className="text-sm text-secondary leading-relaxed">Digital <span className="font-bold text-on-surface">PDF invoices</span> provide the highest match confidence.</p>
                </li>
              </ul>
            </div>

            {/* Danger Zone */}
            <div className="bg-verdict-avoid/5 rounded-2xl p-8 border border-verdict-avoid/10">
              <h3 className="text-sm font-black text-verdict-avoid mb-4 flex items-center gap-2 uppercase tracking-widest">
                <span className="material-symbols-outlined text-xl">warning</span>
                Danger Zone
              </h3>
              <p className="text-sm text-secondary mb-6 leading-relaxed">Instantly purge all extracted data and purchase history from this session. This action is permanent.</p>
              <button className="w-full bg-verdict-avoid text-white px-6 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-verdict-avoid/20">
                Delete session data
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
