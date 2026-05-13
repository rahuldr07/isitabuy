export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-inverse-surface w-full mt-stack-lg border-t border-outline-variant dark:border-none transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter py-stack-md max-w-container-max mx-auto">
        <div className="col-span-1 md:col-span-1 flex flex-col items-start">
          <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-surface-bright mb-4">
            IsItABuy
          </div>
          <p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim text-sm mb-4">
            &copy; 2024 IsItABuy. All rights reserved.
          </p>
          <p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim text-xs opacity-80">
            Affiliate disclosure: We may earn a commission when you use one of
            our links to make a purchase.
          </p>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            How It Works
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Browser Extension
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Price Tracker
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Compare
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            About Us
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all opacity-100 hover:opacity-80"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}
