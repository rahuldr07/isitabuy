import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Search Products", href: "/search" },
      { label: "Compare", href: "/compare" },
      { label: "Deals", href: "/deals" },
      { label: "Chrome Extension", href: "/#extension" },
      { label: "Mobile App", href: "#" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Electronics", href: "/search" },
      { label: "Home", href: "/search" },
      { label: "Beauty", href: "/search" },
      { label: "Fashion", href: "/search" },
      { label: "Kitchen", href: "/search" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "How We Score", href: "/#how-it-works" },
      { label: "Data Sources", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Affiliate Disclosure", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-inverse-surface w-full mt-stack-lg border-t border-outline-variant dark:border-none transition-all duration-300">
      <div className="grid grid-cols-1 gap-gutter px-gutter py-stack-md max-w-container-max mx-auto lg:grid-cols-[1.35fr_repeat(4,1fr)]">
        <div className="flex flex-col items-start">
          <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-surface-bright mb-4">
            IsItABuy AI
          </div>
          <p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim text-sm mb-4">
            &copy; 2024 IsItABuy AI. All rights reserved.
          </p>
          <p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim text-xs opacity-80 max-w-xs">
            Affiliate disclosure: We may earn a commission when you use one of
            our links to make a purchase.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h3 className="font-label-sm text-label-sm font-bold text-on-surface dark:text-surface-bright">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary-container hover:underline transition-all"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
