"use client";

import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export default function CompareItemsPage() {
  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <SimpleNav variant="sticky" />

      <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-stack-md pb-stack-lg">
        {/* Header Section */}
        <header className="mb-stack-lg">
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary mb-4">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link className="hover:text-primary transition-colors" href="/compare">
              Compare
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface-variant">Headphones</span>
          </div>
          <h1 className="font-display-xl text-display-xl mb-4">Compare products</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-6">
            See price, AI scores, review trust, specs, pros, cons, and the best
            choice for your use case.
          </p>
          <div className="flex flex-wrap gap-4 items-center font-label-sm text-label-sm text-secondary">
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-variant">
              <span className="material-symbols-outlined text-primary text-[18px]">info</span>
              <span>
                We may earn a commission from some links. Our AI scores,
                comparisons, and recommendations are not based on commission.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>Prices refreshed 4 minutes ago</span>
            </div>
          </div>
        </header>

        {/* Final Recommendation Hero */}
        <section className="mb-stack-lg">
          <div className="bg-surface-container-lowest rounded-xl verdict-shadow border-l-4 border-[#16A34A] p-8 md:p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-full md:w-1/3 shrink-0 relative">
                <div className="aspect-square bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center p-4">
                  <img
                    alt="Sennheiser Momentum 4"
                    className="object-contain w-full h-full mix-blend-multiply"
                    src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#16A34A] text-white font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                      Best overall value
                    </span>
                    <div className="flex items-center gap-1 text-[#16A34A] font-headline-md text-headline-md">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span>Buy</span>
                    </div>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg mb-2">
                    Sennheiser Momentum 4 Wireless
                  </h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-display-xl text-display-xl text-[#16A34A]">
                        88
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          AI Buy Score
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary text-[12px]">
                          Out of 100
                        </span>
                      </div>
                    </div>
                    <div className="h-10 w-px bg-surface-variant"></div>
                    <div className="font-headline-lg text-headline-lg">$279</div>
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                    The Sennheiser Momentum 4 emerges as the clear winner due to
                    its extraordinary 60-hour battery life and superior audio
                    quality at a highly competitive price point. While its noise
                    cancellation is slightly edged out by Bose, the overall
                    value proposition makes it our top recommendation for most
                    users.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    className="text-white font-label-sm text-label-sm px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm hover:opacity-90"
                    style={{ backgroundColor: "#16A34A" }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                    <span>Buy Now</span>
                  </button>
                  <button className="bg-primary-container text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-primary-fixed-dim transition-colors flex items-center gap-2 shadow-sm">
                    <span>View recommended product</span>
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_forward
                    </span>
                  </button>
                  <button className="border border-surface-variant bg-transparent text-on-surface font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">
                      notifications
                    </span>
                    <span>Set price alert</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison */}
        <section className="mb-stack-lg">
          <h3 className="font-headline-lg text-headline-lg mb-8">
            Side-by-side comparison
          </h3>
          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Product Header Grid */}
              <div className="grid grid-cols-4 border-b border-surface-variant bg-surface-container-low">
                <div className="p-8 flex items-end">
                  <h4 className="font-headline-md text-headline-md text-on-surface">
                    Overview
                  </h4>
                </div>
                {/* Product 1 Header */}
                <div className="p-8 flex flex-col items-center text-center gap-4 border-l border-surface-variant relative bg-surface-container-lowest">
                  <div className="absolute -top-px left-0 right-0 h-1 bg-[#16A34A]"></div>
                  <div className="absolute top-2 right-2 bg-[#16A34A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    Recommended
                  </div>
                  <div className="w-32 h-32 bg-surface-container-low rounded-lg p-2 mb-2">
                    <img
                      alt="Sennheiser"
                      className="w-full h-full object-contain mix-blend-multiply"
                      src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200"
                    />
                  </div>
                  <h5 className="font-headline-md text-on-surface leading-tight px-2 h-14 line-clamp-2">
                    Sennheiser Momentum 4
                  </h5>
                  <div className="text-headline-lg font-bold text-on-surface">$279</div>
                </div>
                {/* Product 2 Header */}
                <div className="p-8 flex flex-col items-center text-center gap-4 border-l border-surface-variant">
                  <div className="w-32 h-32 bg-surface-container-low rounded-lg flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">
                      headphones
                    </span>
                  </div>
                  <h5 className="font-headline-md text-on-surface leading-tight px-2 h-14 line-clamp-2">
                    Sony WH-1000XM5
                  </h5>
                  <div className="text-headline-lg font-bold text-on-surface">$348</div>
                </div>
                {/* Product 3 Header */}
                <div className="p-8 flex flex-col items-center text-center gap-4 border-l border-surface-variant">
                  <div className="w-32 h-32 bg-surface-container-low rounded-lg flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">
                      headphones
                    </span>
                  </div>
                  <h5 className="font-headline-md text-on-surface leading-tight px-2 h-14 line-clamp-2">
                    Bose QuietComfort Ultra
                  </h5>
                  <div className="text-headline-lg font-bold text-on-surface">$429</div>
                </div>
              </div>

              {/* Verdict Row */}
              <div className="grid grid-cols-4 border-b border-surface-variant">
                <div className="p-6 font-label-sm text-secondary bg-surface-container-low">
                  Verdict
                </div>
                <div className="p-6 border-l border-surface-variant flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#16A34A]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-bold text-[#16A34A]">Buy</span>
                </div>
                <div className="p-6 border-l border-surface-variant flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#F59E0B]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    schedule
                  </span>
                  <span className="font-bold text-[#F59E0B]">Wait</span>
                </div>
                <div className="p-6 border-l border-surface-variant flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#DC2626]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    block
                  </span>
                  <span className="font-bold text-[#DC2626]">Avoid</span>
                </div>
              </div>

              {/* AI Score Row */}
              <div className="grid grid-cols-4 border-b border-surface-variant">
                <div className="p-6 font-label-sm text-secondary bg-surface-container-low">
                  AI Buy Score
                </div>
                <div className="p-6 border-l border-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#16A34A] text-white px-2 py-0.5 rounded font-bold text-label-sm">
                      88
                    </span>
                    <span className="text-on-surface-variant font-label-sm">
                      Excellent
                    </span>
                  </div>
                </div>
                <div className="p-6 border-l border-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#F59E0B] text-white px-2 py-0.5 rounded font-bold text-label-sm">
                      85
                    </span>
                    <span className="text-on-surface-variant font-label-sm">
                      Good
                    </span>
                  </div>
                </div>
                <div className="p-6 border-l border-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#DC2626] text-white px-2 py-0.5 rounded font-bold text-label-sm">
                      78
                    </span>
                    <span className="text-on-surface-variant font-label-sm">
                      Fair
                    </span>
                  </div>
                </div>
              </div>

              {/* Battery Row */}
              <div className="grid grid-cols-4 border-b border-surface-variant">
                <div className="p-6 font-label-sm text-secondary bg-surface-container-low">
                  Battery Life
                </div>
                <div className="p-6 border-l border-surface-variant font-body-md font-semibold text-on-surface">
                  60 hours
                </div>
                <div className="p-6 border-l border-surface-variant font-body-md text-on-surface">
                  30 hours
                </div>
                <div className="p-6 border-l border-surface-variant font-body-md text-on-surface">
                  24 hours
                </div>
              </div>

              {/* Pros & Cons Row */}
              <div className="grid grid-cols-4 border-b border-surface-variant">
                <div className="p-6 font-label-sm text-secondary bg-surface-container-low">
                  Pros &amp; Cons
                </div>
                {/* Product 1 */}
                <div className="p-6 border-l border-surface-variant flex flex-col gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-body-md">
                      <span className="material-symbols-outlined text-[#16A34A] text-[20px] shrink-0">
                        add_circle
                      </span>
                      <span>Excellent sound profile</span>
                    </li>
                    <li className="flex items-start gap-2 text-body-md">
                      <span className="material-symbols-outlined text-[#16A34A] text-[20px] shrink-0">
                        add_circle
                      </span>
                      <span className="font-semibold">60h battery life</span>
                    </li>
                    <li className="flex items-start gap-2 text-body-md opacity-60">
                      <span className="material-symbols-outlined text-[#DC2626] text-[20px] shrink-0">
                        remove_circle
                      </span>
                      <span>ANC trails rivals</span>
                    </li>
                  </ul>
                </div>
                {/* Product 2 */}
                <div className="p-6 border-l border-surface-variant flex flex-col gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-body-md">
                      <span className="material-symbols-outlined text-[#16A34A] text-[20px] shrink-0">
                        add_circle
                      </span>
                      <span>Best-in-class ANC</span>
                    </li>
                    <li className="flex items-start gap-2 text-body-md opacity-60">
                      <span className="material-symbols-outlined text-[#DC2626] text-[20px] shrink-0">
                        remove_circle
                      </span>
                      <span>Non-folding design</span>
                    </li>
                    <li className="flex items-start gap-2 text-body-md opacity-60">
                      <span className="material-symbols-outlined text-[#DC2626] text-[20px] shrink-0">
                        remove_circle
                      </span>
                      <span>Price vs features</span>
                    </li>
                  </ul>
                </div>
                {/* Product 3 */}
                <div className="p-6 border-l border-surface-variant flex flex-col gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-body-md">
                      <span className="material-symbols-outlined text-[#16A34A] text-[20px] shrink-0">
                        add_circle
                      </span>
                      <span>Supreme comfort</span>
                    </li>
                    <li className="flex items-start gap-2 text-body-md opacity-60">
                      <span className="material-symbols-outlined text-[#DC2626] text-[20px] shrink-0">
                        remove_circle
                      </span>
                      <span>Premium price tag</span>
                    </li>
                    <li className="flex items-start gap-2 text-body-md opacity-60">
                      <span className="material-symbols-outlined text-[#DC2626] text-[20px] shrink-0">
                        remove_circle
                      </span>
                      <span>Shortest battery</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions Row */}
              <div className="grid grid-cols-4 bg-surface-container-low">
                <div className="p-6 bg-surface-container-low"></div>
                <div className="p-6 border-l border-surface-variant">
                  <Link
                    href="/product"
                    className="w-full block text-center text-on-primary font-label-sm py-3 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#622395" }}
                  >
                    View Details
                  </Link>
                </div>
                <div className="p-6 border-l border-surface-variant">
                  <button className="w-full border border-outline text-on-surface font-label-sm py-3 rounded-lg hover:bg-surface-container-highest transition-colors">
                    View Details
                  </button>
                </div>
                <div className="p-6 border-l border-surface-variant">
                  <button className="w-full border border-outline text-on-surface font-label-sm py-3 rounded-lg hover:bg-surface-container-highest transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low dark:bg-surface-dim font-label-sm text-label-sm w-full px-margin-mobile md:px-gutter py-stack-md flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto transition-opacity duration-200 mt-stack-lg border-t border-surface-variant">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="font-headline-md text-headline-md font-bold text-primary">
            IsItABuy AI
          </span>
          <span className="text-secondary dark:text-secondary-fixed">
            &copy; 2024 IsItABuy AI. AI-powered shopping research.
          </span>
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <a
            className="text-on-secondary-container dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-colors"
            href="#"
          >
            Affiliate Disclosure
          </a>
          <a
            className="text-on-secondary-container dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-on-secondary-container dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-on-secondary-container dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
