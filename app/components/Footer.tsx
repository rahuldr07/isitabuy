export default function Footer() {
  return (
    <footer className="w-full py-16 bg-white border-t border-surface-variant">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-2xl">
              shopping_bag
            </span>
            <span className="text-xl font-bold text-on-surface">IsItABuy</span>
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            © 2024 IsItABuy. AI-driven shopping verdicts you can trust. Not
            influenced by affiliate commissions.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-on-surface mb-2">Product</h4>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              How It Works
            </a>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              Browser Extension
            </a>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              Price Tracker
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-on-surface mb-2">Company</h4>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              About Us
            </a>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-sm text-secondary hover:text-primary-container transition-colors"
              href="#"
            >
              Commission Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
