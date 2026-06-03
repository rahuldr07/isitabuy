export interface NavigationItem {
  label: string;
  href: string;
}

export const homeSectionHrefs = {
  top: "/#top",
  howItWorks: "/#how-it-works",
  retailers: "/#retailers",
  categories: "/#categories",
  trust: "/#trust",
  disclosure: "/#disclosure",
} as const;

export const mainNavItems = [
  { label: "How It Works", href: homeSectionHrefs.howItWorks },
  { label: "Compare", href: "/compare" },
  { label: "Deals", href: "/deals" },
  { label: "Retailers", href: homeSectionHrefs.retailers },
  { label: "Receipts", href: "/receipts" },
] satisfies NavigationItem[];

export const footerColumns = [
  { title: "Explore", links: ["Categories", "Deals", "How It Works", "Blog"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
  { title: "Support", links: ["Help Center", "Contact Us", "Report an Issue", "Product Requests"] },
  { title: "Legal", links: ["Affiliate Disclosure", "Privacy Policy", "Terms of Service", "How We Score"] },
] as const;

export const socialLinks = [
  { label: "X", src: "/home/logos/x.svg", href: homeSectionHrefs.top },
  { label: "Facebook", src: "/home/logos/facebook.svg", href: homeSectionHrefs.top },
  { label: "Instagram", src: "/home/logos/instagram.svg", href: homeSectionHrefs.top },
  { label: "YouTube", src: "/home/logos/youtube.svg", href: homeSectionHrefs.top },
] as const;

const categorySlugsByLabel: Record<string, string> = {
  electronics: "electronics",
  "home appliances": "home",
  home: "home",
  "beauty & skincare": "beauty",
  beauty: "beauty",
  fashion: "fashion",
  gaming: "gaming",
  kitchen: "kitchen",
  sports: "sports",
  automotive: "automotive",
  office: "office",
};

const retailerSlugsByLabel: Record<string, string> = {
  amazon: "amazon",
  walmart: "walmart",
  "best buy": "best-buy",
  target: "target",
  ebay: "ebay",
  "home depot": "home-depot",
  flipkart: "flipkart",
  myntra: "myntra",
  meesho: "meesho",
};

const labelHrefMap: Record<string, string> = {
  "all deals": "/deals",
  categories: homeSectionHrefs.categories,
  deals: "/deals",
  "how it works": homeSectionHrefs.howItWorks,
  retailers: homeSectionHrefs.retailers,
  blog: "/buy-guide",
  "about us": homeSectionHrefs.trust,
  careers: "/signin?mode=signup",
  press: homeSectionHrefs.trust,
  contact: "/dashboard/chat",
  "contact us": "/dashboard/chat",
  "help center": homeSectionHrefs.howItWorks,
  "report an issue": "/dashboard/chat",
  "product requests": "/search",
  "affiliate disclosure": homeSectionHrefs.disclosure,
  "privacy policy": homeSectionHrefs.disclosure,
  "terms of service": homeSectionHrefs.disclosure,
  "how we score": homeSectionHrefs.howItWorks,
  methodology: homeSectionHrefs.howItWorks,
};

export const routeRedirects = [
  { source: "/how-it-works", destination: homeSectionHrefs.howItWorks },
  { source: "/how-we-score", destination: homeSectionHrefs.howItWorks },
  { source: "/methodology", destination: homeSectionHrefs.howItWorks },
  { source: "/retailers", destination: homeSectionHrefs.retailers },
  { source: "/trusted-retailers", destination: homeSectionHrefs.retailers },
  { source: "/categories", destination: homeSectionHrefs.categories },
  { source: "/popular-categories", destination: homeSectionHrefs.categories },
  { source: "/trust", destination: homeSectionHrefs.trust },
  { source: "/about", destination: homeSectionHrefs.trust },
  { source: "/about-us", destination: homeSectionHrefs.trust },
  { source: "/press", destination: homeSectionHrefs.trust },
  { source: "/blog", destination: "/buy-guide" },
  { source: "/best-products", destination: "/buy-guide" },
  { source: "/best-headphones", destination: "/buy-guide" },
  { source: "/buying-guide", destination: "/buy-guide" },
  { source: "/careers", destination: "/signin?mode=signup" },
  { source: "/deals-worth", destination: "/deals" },
  { source: "/compare-items", destination: "/compare/results" },
  { source: "/compare-products", destination: "/compare" },
  { source: "/alternatives", destination: "/compare" },
  { source: "/better-alternatives", destination: "/compare" },
  { source: "/price-tracker", destination: "/deals" },
  { source: "/price-alerts", destination: "/dashboard/alerts" },
  { source: "/watchlist", destination: "/dashboard/watchlist" },
  { source: "/saved", destination: "/dashboard/saved" },
  { source: "/profile", destination: "/dashboard/settings" },
  { source: "/preferences", destination: "/dashboard/settings" },
  { source: "/account", destination: "/dashboard/settings" },
  { source: "/settings", destination: "/dashboard/settings" },
  { source: "/upload-receipt", destination: "/dashboard/receipts" },
  { source: "/receipt-analysis", destination: "/dashboard/receipts" },
  { source: "/concierge", destination: "/dashboard/chat" },
  { source: "/ai-chat", destination: "/dashboard/chat" },
  { source: "/help", destination: "/dashboard/chat" },
  { source: "/help-center", destination: homeSectionHrefs.howItWorks },
  { source: "/contact", destination: "/dashboard/chat" },
  { source: "/contact-us", destination: "/dashboard/chat" },
  { source: "/report-an-issue", destination: "/dashboard/chat" },
  { source: "/product-requests", destination: "/search" },
  { source: "/disclosure", destination: homeSectionHrefs.disclosure },
  { source: "/affiliate", destination: homeSectionHrefs.disclosure },
  { source: "/affiliate-disclosure", destination: homeSectionHrefs.disclosure },
  { source: "/legal", destination: homeSectionHrefs.disclosure },
  { source: "/privacy", destination: homeSectionHrefs.disclosure },
  { source: "/privacy-policy", destination: homeSectionHrefs.disclosure },
  { source: "/terms", destination: homeSectionHrefs.disclosure },
  { source: "/terms-of-service", destination: homeSectionHrefs.disclosure },
] as const;

const routeRedirectMap = Object.fromEntries(
  routeRedirects.map((redirect) => [redirect.source, redirect.destination]),
);

export function routeForLabel(label: string) {
  return labelHrefMap[label.trim().toLowerCase()] ?? "/search";
}

export function dealsCategoryHref(label: string) {
  const normalized = label.trim().toLowerCase();
  const slug = categorySlugsByLabel[normalized];

  return slug ? `/deals?category=${slug}` : `/deals?q=${encodeURIComponent(label.trim())}`;
}

export function retailerDealsHref(label: string) {
  const normalized = label.trim().toLowerCase();
  const slug = retailerSlugsByLabel[normalized];

  return slug ? `/deals?retailer=${slug}` : `/deals?q=${encodeURIComponent(label.trim())}`;
}

export function resolveRouteRedirect(pathname: string) {
  const normalized = `/${pathname.split("?")[0].replace(/^\/+|\/+$/g, "").toLowerCase()}`;

  return routeRedirectMap[normalized] ?? "/";
}
