"use client";

import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export default function ProductPage() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container pb-24 lg:pb-0">
      {/* TopNavBar */}
      <SimpleNav variant="sticky" />

      {/* Main Content Wrapper */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md flex flex-col lg:flex-row gap-gutter relative">
        {/* Left Column: Main Content */}
        <div className="w-full lg:w-[65%] flex flex-col gap-stack-lg">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-4">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="hover:underline cursor-pointer">Electronics</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="hover:underline cursor-pointer">Headphones</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-background">Sony WH-1000XM5</span>
          </nav>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="font-headline-lg text-headline-lg text-on-background m-0">
                Sony WH-1000XM5
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant m-0">
                Wireless Noise Canceling Headphones
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-label-sm text-label-sm font-bold">4.7</span>
                <div className="flex text-primary-container text-sm">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star_half
                  </span>
                </div>
                <span className="text-on-surface-variant font-label-sm text-sm">
                  (18,420 reviews)
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-surface-container-lowest rounded-lg card-shadow p-4 flex flex-col gap-4 border border-surface-container">
              <div className="relative aspect-video bg-surface-container-low rounded-md overflow-hidden flex items-center justify-center w-full max-w-2xl mx-auto">
                <img
                  alt="Sony WH-1000XM5 Headphones"
                  className="object-cover w-full h-full mix-blend-multiply"
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-surface-container-lowest text-on-background font-label-sm text-xs px-2 py-1 rounded-full shadow-sm border border-surface-container flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary-container">
                      local_fire_department
                    </span>{" "}
                    Popular
                  </span>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <div className="w-16 h-16 bg-surface-container-low rounded border-2 border-primary overflow-hidden cursor-pointer">
                  <img
                    alt="Thumbnail 1"
                    className="object-cover w-full h-full mix-blend-multiply"
                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=150"
                  />
                </div>
                <div className="w-16 h-16 bg-surface-container-low rounded overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity border border-transparent">
                  <img
                    alt="Thumbnail 2"
                    className="object-cover w-full h-full mix-blend-multiply"
                    src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=150"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sub-nav Tabs */}
          <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-md border-b border-surface-container py-3 flex gap-6 overflow-x-auto no-scrollbar -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 mt-8 mb-6">
            <a
              className="font-label-sm text-label-sm text-on-background border-b-2 border-on-background pb-1 whitespace-nowrap"
              href="#verdict"
            >
              Verdict
            </a>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-background whitespace-nowrap"
              href="#offers"
            >
              Offers
            </a>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-background whitespace-nowrap"
              href="/price-tracker"
            >
              Price History
            </Link>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-background whitespace-nowrap"
              href="#reviews"
            >
              Reviews
            </a>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-background whitespace-nowrap"
              href="/alternatives"
            >
              Alternatives
            </Link>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-background whitespace-nowrap"
              href="#sources"
            >
              Sources
            </a>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-background whitespace-nowrap"
              href="#specs"
            >
              Specs
            </a>
          </div>

          {/* Main Verdict Section */}
          <section
            className="bg-surface-container-lowest rounded-lg verdict-shadow border-l-4 border-[#16A34A] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden"
            id="verdict"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="material-symbols-outlined text-3xl text-[#16A34A]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <h2 className="font-display-xl text-3xl text-[#16A34A] m-0 leading-none">
                  Good product. Good price. Strong evidence.
                </h2>
              </div>
            </div>
            <p className="font-body-lg text-body-lg text-on-background pt-2">
              This is a strong buy today because the price is near its recent
              low, review trust is strong, and similar alternatives do not offer
              meaningfully better value at this price.
            </p>

            {/* Score Breakdown */}
            <div className="mt-4 bg-surface p-6 rounded border border-surface-container">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">
                Score Breakdown
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-background">Value Score</span>
                    <span className="text-on-background">84</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2">
                    <div
                      className="bg-primary-container h-2 rounded-full"
                      style={{ width: "84%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-background">Quality Score</span>
                    <span className="text-on-background">91</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2">
                    <div
                      className="bg-[#16A34A] h-2 rounded-full"
                      style={{ width: "91%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-background">Review Trust</span>
                    <span className="text-on-background">82</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2">
                    <div
                      className="bg-primary-container h-2 rounded-full"
                      style={{ width: "82%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-background">Price Score</span>
                    <span className="text-on-background">88</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2">
                    <div
                      className="bg-[#16A34A] h-2 rounded-full"
                      style={{ width: "88%" }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant italic mt-6 pt-4 border-t border-surface-container">
                Health/Safety Score is not relevant for this category.
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-surface-container-lowest p-5 rounded border border-surface-container">
                <h4 className="font-label-sm text-label-sm font-bold text-on-background mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#16A34A] text-sm">
                    add_circle
                  </span>{" "}
                  Pros
                </h4>
                <ul className="text-sm text-on-surface-variant space-y-2 list-disc pl-5">
                  <li>Industry-leading active noise cancellation</li>
                  <li>Excellent, balanced sound profile</li>
                  <li>Very comfortable for long listening sessions</li>
                  <li>30-hour battery life with fast charging</li>
                </ul>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded border border-surface-container">
                <h4 className="font-label-sm text-label-sm font-bold text-on-background mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#DC2626] text-sm">
                    do_not_disturb_on
                  </span>{" "}
                  Cons
                </h4>
                <ul className="text-sm text-on-surface-variant space-y-2 list-disc pl-5">
                  <li>Design doesn&apos;t fold down like previous models</li>
                  <li>Case is quite bulky for travel</li>
                  <li>Multipoint pairing can occasionally glitch</li>
                </ul>
              </div>
            </div>

            {/* Better Alternative */}
            <div
              className="mt-4 border-t border-surface-container pt-6"
              id="alternatives"
            >
              <h3 className="font-headline-md text-xl text-on-background mb-4">
                Alternatives
              </h3>
              <div className="bg-surface-container-low p-4 rounded border border-surface-container flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container text-xl">
                  info
                </span>
                <p className="text-sm text-on-surface-variant m-0">
                  No better alternative found in this price tier. This is
                  currently our top pick for premium wireless noise-canceling
                  headphones.
                </p>
              </div>
            </div>

            {/* Sources */}
            <div
              className="mt-4 border-t border-surface-container pt-6"
              id="sources"
            >
              <h3 className="font-headline-md text-xl text-on-background mb-4">
                Sources &amp; Citations
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  className="bg-surface-container-low px-3 py-1.5 rounded text-xs text-on-surface-variant border border-surface-container hover:bg-surface-container transition-colors flex items-center gap-1"
                  href="#"
                >
                  Rtings.com Review{" "}
                  <span className="material-symbols-outlined text-[10px]">
                    open_in_new
                  </span>
                </a>
                <a
                  className="bg-surface-container-low px-3 py-1.5 rounded text-xs text-on-surface-variant border border-surface-container hover:bg-surface-container transition-colors flex items-center gap-1"
                  href="#"
                >
                  SoundGuys Analysis{" "}
                  <span className="material-symbols-outlined text-[10px]">
                    open_in_new
                  </span>
                </a>
                <a
                  className="bg-surface-container-low px-3 py-1.5 rounded text-xs text-on-surface-variant border border-surface-container hover:bg-surface-container transition-colors flex items-center gap-1"
                  href="#"
                >
                  PriceTracker History Data{" "}
                  <span className="material-symbols-outlined text-[10px]">
                    open_in_new
                  </span>
                </a>
                <a
                  className="bg-surface-container-low px-3 py-1.5 rounded text-xs text-on-surface-variant border border-surface-container hover:bg-surface-container transition-colors flex items-center gap-1"
                  href="#"
                >
                  Verified Buyer Reviews (Aggregated)
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Sidebar / Mobile Bottom Bar */}
        <div className="w-full lg:w-[35%] fixed bottom-0 left-0 lg:relative lg:bottom-auto z-50 lg:z-10 bg-surface lg:bg-transparent border-t lg:border-t-0 border-surface-container p-4 lg:p-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:shadow-none">
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            {/* Summary Action Card */}
            <div className="bg-surface-container-lowest lg:rounded-lg lg:card-shadow lg:p-6 lg:border lg:border-surface-container flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-start gap-4 lg:gap-0 max-w-container-max mx-auto w-full">
              <div className="flex flex-col lg:mb-6 w-1/3 lg:w-full">
                <div className="flex justify-between items-start lg:items-center mb-1 lg:mb-4">
                  <div className="hidden lg:flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-2xl text-[#16A34A]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    <span className="font-headline-md text-headline-md text-on-background">
                      Verdict
                    </span>
                  </div>
                  <div className="flex flex-col items-end w-full lg:w-auto">
                    <div className="font-display-xl text-3xl lg:text-5xl text-on-background m-0 leading-none font-bold">
                      86
                      <span className="text-sm lg:text-xl font-normal text-on-surface-variant">
                        /100
                      </span>
                    </div>
                    <div className="bg-surface-container-low px-2 py-0.5 lg:py-1 rounded text-[10px] lg:text-xs font-bold text-on-surface-variant mt-1 lg:mt-2 border border-surface-container whitespace-nowrap">
                      High Confidence
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right mb-2">
                  AI Buy Score
                </div>
              </div>
              <div className="flex flex-col lg:mb-6 lg:border-b lg:border-t lg:border-surface-container lg:py-4 w-1/3 lg:w-full justify-center">
                <div className="font-label-sm text-xs text-on-surface-variant mb-1 hidden lg:block">
                  Best price today
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end gap-0 lg:gap-2">
                  <span className="font-display-xl text-xl lg:text-4xl font-bold text-on-background leading-none">
                    $299
                  </span>
                  <span className="font-body-md text-xs lg:text-sm text-on-surface-variant mb-0.5">
                    at Amazon
                  </span>
                </div>
                <div className="font-body-md text-[10px] lg:text-xs text-[#16A34A] flex items-center mt-1">
                  <span className="material-symbols-outlined text-[12px] lg:text-sm">
                    arrow_downward
                  </span>{" "}
                  $42 below 90-day avg
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/3 lg:w-full justify-center">
                <button className="w-full bg-[#f59e0b] text-on-primary-fixed font-label-sm text-sm lg:text-base py-2.5 lg:py-3.5 rounded hover:bg-opacity-90 transition-colors shadow-sm font-bold flex justify-center items-center gap-2">
                  View Best Offer{" "}
                  <span className="material-symbols-outlined text-sm hidden lg:inline">
                    open_in_new
                  </span>
                </button>
                <button className="hidden lg:flex w-full bg-transparent border border-surface-container-highest text-on-background font-label-sm text-sm py-2.5 rounded hover:bg-surface-container-low transition-colors justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    notifications
                  </span>{" "}
                  Set Price Alert
                </button>
              </div>
              <div className="hidden lg:flex gap-2 mt-2">
                <button className="w-1/2 bg-transparent border border-surface-container-highest text-on-surface-variant font-label-sm text-xs py-2 rounded hover:bg-surface-container-low transition-colors flex justify-center items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    bookmark_border
                  </span>{" "}
                  Save
                </button>
                <button className="w-1/2 bg-transparent border border-surface-container-highest text-on-surface-variant font-label-sm text-xs py-2 rounded hover:bg-surface-container-low transition-colors flex justify-center items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    compare_arrows
                  </span>{" "}
                  Compare
                </button>
              </div>
            </div>
            <div className="hidden lg:block bg-surface-container-lowest p-4 rounded border border-surface-container text-xs text-on-surface-variant opacity-80">
              <p className="flex gap-2">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant shrink-0 mt-0.5">
                  info
                </span>{" "}
                We may earn a commission from some links. Our AI scores and
                recommendations are not based on commission.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-md px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant mt-stack-lg pb-32 lg:pb-stack-md">
        <div className="text-headline-md font-headline-md text-on-surface-variant mb-4 md:mb-0">
          IsItABuy AI
        </div>
        <div className="flex flex-wrap gap-4 justify-center font-body-md text-body-md text-secondary dark:text-secondary-fixed">
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100"
            href="#"
          >
            Contact Support
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100"
            href="#"
          >
            About AI Verdicts
          </a>
        </div>
        <div className="text-xs text-on-surface-variant mt-4 md:mt-0 text-center md:text-right max-w-xs">
          &copy; 2026 IsItABuy AI Advisor. All rights reserved.
          <br />
          We may earn a commission when you buy through some links. Our AI
          scores, verdicts, and recommendations are not based on commission.
        </div>
      </footer>
    </div>
  );
}
