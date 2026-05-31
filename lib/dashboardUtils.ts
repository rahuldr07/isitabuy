import type { LocalStorageResult, ProductStatus, ProductVerdict, SmartActionType } from "@/types/dashboard";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}

export function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateFormatter.format(date);
}

export function buildProductUrl(slug: string) {
  return `/product/${encodeURIComponent(slug)}`;
}

export function buildCompareUrl(slug: string) {
  return `/compare/${encodeURIComponent(slug)}`;
}

export function buildRedirectUrl(retailer: string, product: string) {
  const params = new URLSearchParams({ retailer, product });
  return `/redirect?${params.toString()}`;
}

export function getVerdictStyles(verdict: ProductVerdict) {
  if (verdict === "BUY") {
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  if (verdict === "WAIT") {
    return "border-amber-100 bg-amber-50 text-amber-700";
  }

  return "border-red-100 bg-red-50 text-red-700";
}

export function getActionStyles(type: SmartActionType) {
  switch (type) {
    case "price-drop":
      return "border-emerald-100 bg-emerald-50 text-emerald-700";
    case "better-alternative":
      return "border-purple-100 bg-purple-50 text-[var(--isitabuy-purple)]";
    case "receipt-review":
      return "border-blue-100 bg-blue-50 text-blue-700";
    case "warranty-expiring":
      return "border-amber-100 bg-amber-50 text-amber-700";
    case "alert-suggestion":
      return "border-orange-100 bg-orange-50 text-[var(--isitabuy-orange)]";
  }
}

export function getStatusStyles(status: ProductStatus) {
  if (status === "Close to target" || status === "Active") {
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  if (status === "Wait" || status === "Expiring") {
    return "border-amber-100 bg-amber-50 text-amber-700";
  }

  if (status === "No warranty") {
    return "border-slate-100 bg-slate-50 text-slate-600";
  }

  return "border-blue-100 bg-blue-50 text-blue-700";
}

export function safeReadLocalStorage<T>(key: string, fallback: T, validate: (value: unknown) => value is T): LocalStorageResult<T> {
  if (typeof window === "undefined") {
    return { value: fallback, recovered: false };
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return { value: fallback, recovered: false };
    }

    const parsed = JSON.parse(raw) as unknown;
    if (validate(parsed)) {
      return { value: parsed, recovered: false };
    }

    window.localStorage.removeItem(key);
    return { value: fallback, recovered: true };
  } catch {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore cleanup failures; callers still receive a safe fallback.
    }
    return { value: fallback, recovered: true };
  }
}

export function safeWriteLocalStorage(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
