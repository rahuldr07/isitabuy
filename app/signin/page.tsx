import type { Metadata } from "next";
import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export const metadata: Metadata = {
  title: "Sign In | IsItABuy AI Shopping Advisor",
};

export default function SignInPage() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <SimpleNav variant="fixed" />

      <main className="min-h-screen pt-24 pb-stack-lg px-gutter max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        {/* Left Column: Value Proposition */}
        <div className="flex flex-col gap-stack-md">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-label-sm mb-4">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              AI-Powered Shopping Advisor
            </span>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-stack-sm">Shop smarter with your own AI buying assistant.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Create an account to save products, track prices, upload receipts, and get personalized recommendations.</p>
          </div>

          {/* Verdict Legend */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#16A34A]"></span>
              <span className="font-label-sm text-sm text-on-surface-variant">Buy Now</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
              <span className="font-label-sm text-sm text-on-surface-variant">Wait</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DC2626]"></span>
              <span className="font-label-sm text-sm text-on-surface-variant">Avoid</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#16a34a] text-white rounded-full">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider">Best Value</span>
            </div>
          </div>

          {/* Benefit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-surface border border-outline-variant/30 rounded-2xl flex flex-col gap-4 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">bookmark</span>
              </div>
              <div>
                <p className="font-headline-md text-body-lg font-bold mb-1">Save products</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">Instantly bookmark items from any store to your personal dashboard.</p>
              </div>
            </div>
            <div className="p-6 bg-surface border border-outline-variant/30 rounded-2xl flex flex-col gap-4 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <div>
                <p className="font-headline-md text-body-lg font-bold mb-1">Price alerts</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">We monitor price drops across the web so you never overpay again.</p>
              </div>
            </div>
            <div className="p-6 bg-surface border border-outline-variant/30 rounded-2xl flex flex-col gap-4 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <div>
                <p className="font-headline-md text-body-lg font-bold mb-1">Receipt history</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">An automated, encrypted vault for all your digital shopping history.</p>
              </div>
            </div>
            <div className="p-6 bg-surface border border-outline-variant/30 rounded-2xl flex flex-col gap-4 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">person_celebrate</span>
              </div>
              <div>
                <p className="font-headline-md text-body-lg font-bold mb-1">Personalized picks</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">Deeply personal AI recommendations based on your unique style.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
            <span className="font-body-md text-sm">Our AI scores are not based on commission. We prioritize your wallet.</span>
          </div>

          {/* Example Preview Card */}
          <div className="mt-4 p-6 bg-surface-container-lowest rounded-2xl shadow-lg border border-surface-variant relative overflow-hidden group">
            <div className="flex gap-6 items-center">
              <div className="w-24 h-24 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  alt="Sony WH-1000XM5 headphones"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAauhT4D1B8YyvkGD9shGJRVpGtEN0TZUVjAT8FPqYfarErzQlWdjUn2Enowjr-WqetFfu2z65o46rRMLWRJXMgs7BY6-6m5BOweuDoxr0QC7vG0v-lBxno_EQ1BNOCryYVt-Yz7W9afWMmwuj1zbPdcyivhLzdW7qYeyQsxmbdSedFjLztMkBKKqNZ8R9wwyXLvuQr8krl1hxOE6LBpwOeA4uGySHZIgSXFxkIpevxuR6ArVcsRs9ATY8YnDfA_oP0obbrG9z816A"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-md text-headline-md">Sony WH-1000XM5</h3>
                    <p className="text-on-surface-variant text-sm">Wireless Noise Canceling Headphones</p>
                  </div>
                  <span className="text-[#16A34A] bg-[#16A34A]/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Target Reached</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#16A34A]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-bold">Buy Now</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-on-surface-variant line-through">$399.99</p>
                    <p className="font-bold text-lg text-on-surface">$298.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-1 bg-[#16A34A]"></div>
          </div>
        </div>

        {/* Right Column: Auth Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-primary/5 border border-surface-variant/50">
            {/* Tabs */}
            <div className="flex p-1 bg-surface-container-low rounded-2xl mb-8">
              <button className="flex-1 py-3 text-center rounded-xl font-label-sm bg-white shadow-sm text-primary">Sign in</button>
              <button className="flex-1 py-3 text-center rounded-xl font-label-sm text-on-surface-variant hover:text-primary transition-colors">Create account</button>
            </div>

            {/* Privacy Message */}
            <div className="mb-6 p-4 bg-primary-container/5 rounded-xl border border-primary-container/20 flex gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
              <p className="text-xs text-on-primary-fixed-variant leading-snug">
                Your saved products, alerts, receipts, and preferences are private to your account.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant px-1" htmlFor="email">Email Address</label>
                <input
                  className="w-full h-14 px-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline/40"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant px-1" htmlFor="password">Password</label>
                <input
                  className="w-full h-14 px-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-5 h-5 rounded-md border-outline-variant/50 text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                </label>
                <a className="text-sm font-semibold text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <button
                className="mt-4 w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                type="submit"
              >
                Sign in
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 flex items-center">
              <div className="flex-grow border-t border-surface-variant/50"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-outline uppercase tracking-widest">or continue with</span>
              <div className="flex-grow border-t border-surface-variant/50"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-4">
              <button className="h-14 border border-outline-variant/30 rounded-2xl flex items-center justify-center hover:bg-surface-container-low transition-colors active:scale-95">
                <img
                  alt="Google"
                  className="w-6 h-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8nKprggQJea6m-zRFuOSk36Rhcb5a7XNnH7ctTY0dvCjCpIdoaedq7FAR6XXmGP7zB62Wb_q_YN2tLMqRV0ZBw9ZFPFOWcFDLY0VNJnZ05RawYNGFkTSRvys4kY8y4Lm3MW1VMDBXvQgUNPJQwVI_LVopOrEjnREBR2UlqTL2R61WsepI51faq_0mZ9CKBdyl7EgNkZw_4itXFlFGE86eYekwhVodQ3Xfm2Jg7YoHIkYK6Fm2dFwhcU1Gb6QAu9XRqTm5K05wY4o"
                />
              </button>
              <button className="h-14 border border-outline-variant/30 rounded-2xl flex items-center justify-center hover:bg-surface-container-low transition-colors active:scale-95">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>ios</span>
              </button>
              <button className="h-14 border border-outline-variant/30 rounded-2xl flex items-center justify-center hover:bg-surface-container-low transition-colors active:scale-95">
                <svg className="w-6 h-6 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Guest Option */}
            <div className="mt-10 text-center">
              <Link href="/search" className="text-on-surface-variant font-semibold hover:text-primary transition-all text-sm underline underline-offset-4">
                Continue as guest
              </Link>
              <p className="mt-4 text-[11px] text-on-surface-variant/60 leading-relaxed">
                Search products and view AI verdicts anonymously. Note: Saving items or price tracking requires an account.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-surface-variant">
        <div className="flex flex-col md:flex-row justify-between items-start px-gutter py-stack-lg w-full max-w-container-max mx-auto gap-8">
          <div className="max-w-sm">
            <span className="font-headline-md text-headline-md font-bold text-on-surface">IsItABuy AI</span>
            <p className="mt-4 text-on-surface-variant text-body-md font-body-md">
              The world&apos;s first AI shopping concierge designed to protect your wallet and ensure every purchase is a smart one.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3">
              <p className="font-label-sm text-primary uppercase tracking-wider mb-2">Product</p>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Features</a>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Extension</a>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Pricing</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-label-sm text-primary uppercase tracking-wider mb-2">Account</p>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Sign In</a>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Profile</a>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Settings</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-label-sm text-primary uppercase tracking-wider mb-2">Legal</p>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Privacy Policy</a>
              <a className="text-on-surface-variant hover:text-primary underline transition-all" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="w-full max-w-container-max mx-auto px-gutter pb-8">
          <p className="text-sm text-on-surface-variant/70 border-t border-surface-variant pt-8">
            © 2026 IsItABuy AI. Affiliate Disclosure: We may earn a commission when you click through links on our site.
          </p>
        </div>
      </footer>
    </div>
  );
}
