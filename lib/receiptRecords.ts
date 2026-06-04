import type { LocalStorageResult, ReceiptLineItem, ReceiptRecord, ReceiptUploadDraft } from "@/types/dashboard";

export const receiptsStorageKey = "isitabuy.dashboard.receipts";

export const receiptStoreOptions = ["Target", "Amazon", "Best Buy", "Walmart", "Nike"] as const;

const allowedFileTypes = new Set(["application/pdf"]);

const targetItems: ReceiptLineItem[] = [
  {
    id: "line-sony-wh-1000xm5",
    productName: "Sony WH-1000XM5",
    productSlug: "sony-wh-1000xm5",
    paidPrice: 279.99,
    insight: "$69.99 saved against the normal price",
    status: "Drop found",
    warrantyStatus: "active",
    returnWindowDays: 24,
  },
  {
    id: "line-ninja-coffee-maker",
    productName: "Ninja Coffee Maker",
    productSlug: "ninja-coffee-maker",
    paidPrice: 89.99,
    insight: "Warranty expires soon",
    status: "Warranty",
    warrantyStatus: "expiring",
    returnWindowDays: 32,
  },
  {
    id: "line-nike-pegasus",
    productName: "Nike Air Zoom Pegasus 41",
    productSlug: "nike-air-zoom-pegasus-41",
    paidPrice: 119.99,
    insight: "Matched to a known product",
    status: "Matched",
    warrantyStatus: "none",
    returnWindowDays: 17,
  },
];

const amazonItems: ReceiptLineItem[] = [
  {
    id: "line-amazon-sony",
    productName: "Sony WH-1000XM5",
    productSlug: "sony-wh-1000xm5",
    paidPrice: 279.99,
    insight: "Price protection watched",
    status: "Drop found",
    warrantyStatus: "active",
    returnWindowDays: 18,
  },
  {
    id: "line-amazon-macbook",
    productName: "MacBook Air M3",
    productSlug: "macbook-air-m3",
    paidPrice: 1099,
    insight: "Warranty attached",
    status: "Warranty",
    warrantyStatus: "active",
  },
];

export const defaultReceiptRecords: ReceiptRecord[] = [
  {
    id: "receipt-target-demo",
    store: "Target",
    purchaseDate: "2026-05-20",
    fileName: "target-order.pdf",
    notes: "Demo receipt used for receipt review.",
    uploadedAt: "2026-05-20T12:00:00.000Z",
    source: "demo",
    itemCount: 5,
    savingsFound: 69,
    warrantiesTracked: 3,
    returnAlerts: 2,
    status: "ready",
    items: targetItems,
  },
  {
    id: "receipt-amazon-protected",
    store: "Amazon",
    purchaseDate: "2026-04-18",
    fileName: "amazon-order.pdf",
    notes: "Warranties linked and price checks active.",
    uploadedAt: "2026-04-18T12:00:00.000Z",
    source: "demo",
    itemCount: 2,
    savingsFound: 69.99,
    warrantiesTracked: 2,
    returnAlerts: 1,
    status: "protected",
    items: amazonItems,
  },
];

export function getReceiptDateString(daysOffset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatReceiptDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return "Select date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function isAllowedReceiptFile(file: File) {
  return file.type.startsWith("image/") || allowedFileTypes.has(file.type);
}

export function buildReceiptRecord(draft: ReceiptUploadDraft, useDemo: boolean): ReceiptRecord {
  const purchaseDate = draft.purchaseDate || getReceiptDateString(0);
  const uploadedAt = new Date().toISOString();
  const fileName = useDemo ? `${draft.store.toLowerCase().replaceAll(/\s+/g, "-")}-demo-receipt.pdf` : (draft.fileName ?? "receipt-upload.pdf");
  const items = targetItems.map((item) => ({ ...item }));

  return {
    id: useDemo ? "receipt-target-demo" : `receipt-upload-${Date.now()}`,
    store: draft.store,
    purchaseDate,
    fileName,
    notes: draft.notes.trim(),
    uploadedAt,
    source: useDemo ? "demo" : "upload",
    itemCount: useDemo ? 5 : Math.max(3, items.length),
    savingsFound: useDemo ? 69 : 22,
    warrantiesTracked: useDemo ? 3 : 2,
    returnAlerts: useDemo ? 2 : 1,
    status: "ready",
    items,
  };
}

function isReceiptLineItem(value: unknown): value is ReceiptLineItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ReceiptLineItem>;
  return (
    typeof item.id === "string" &&
    typeof item.productName === "string" &&
    typeof item.productSlug === "string" &&
    typeof item.paidPrice === "number" &&
    typeof item.insight === "string" &&
    typeof item.status === "string" &&
    typeof item.warrantyStatus === "string"
  );
}

function isReceiptRecord(value: unknown): value is ReceiptRecord {
  if (!value || typeof value !== "object") return false;
  const receipt = value as Partial<ReceiptRecord>;
  return (
    typeof receipt.id === "string" &&
    typeof receipt.store === "string" &&
    typeof receipt.purchaseDate === "string" &&
    typeof receipt.fileName === "string" &&
    typeof receipt.uploadedAt === "string" &&
    typeof receipt.source === "string" &&
    typeof receipt.itemCount === "number" &&
    typeof receipt.savingsFound === "number" &&
    typeof receipt.warrantiesTracked === "number" &&
    typeof receipt.returnAlerts === "number" &&
    typeof receipt.status === "string" &&
    Array.isArray(receipt.items) &&
    receipt.items.every(isReceiptLineItem)
  );
}

function legacyRecordFromId(id: string): ReceiptRecord {
  const target = defaultReceiptRecords[0];
  const dateMatch = id.match(/(\d{4}-\d{2}-\d{2})/);

  return {
    ...target,
    id: id === "receipt-target-2024-05-20" ? "receipt-target-demo" : id,
    purchaseDate: dateMatch?.[1] ?? target.purchaseDate,
    uploadedAt: new Date().toISOString(),
    source: id.includes("upload") ? "upload" : "demo",
  };
}

function readStoredReceiptRecords(): LocalStorageResult<ReceiptRecord[]> {
  if (typeof window === "undefined") {
    return { value: [], recovered: false };
  }

  try {
    const raw = window.localStorage.getItem(receiptsStorageKey);
    if (!raw) return { value: [], recovered: false };

    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed) && parsed.every(isReceiptRecord)) {
      return { value: parsed, recovered: false };
    }

    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return { value: parsed.map(legacyRecordFromId), recovered: true };
    }

    window.localStorage.removeItem(receiptsStorageKey);
    return { value: [], recovered: true };
  } catch {
    try {
      window.localStorage.removeItem(receiptsStorageKey);
    } catch {
      // Ignore storage cleanup failures; callers still receive default receipt data.
    }
    return { value: [], recovered: true };
  }
}

function mergeReceiptRecords(savedRecords: ReceiptRecord[]) {
  const recordsById = new Map(defaultReceiptRecords.map((record) => [record.id, record]));

  for (const record of savedRecords) {
    recordsById.set(record.id, record);
  }

  return Array.from(recordsById.values()).sort((first, second) => {
    return new Date(second.purchaseDate).getTime() - new Date(first.purchaseDate).getTime();
  });
}

export function hydrateReceiptRecords(): LocalStorageResult<ReceiptRecord[]> {
  const stored = readStoredReceiptRecords();
  return {
    value: mergeReceiptRecords(stored.value),
    recovered: stored.recovered,
  };
}

export function saveReceiptRecord(record: ReceiptRecord): LocalStorageResult<ReceiptRecord[]> {
  const stored = readStoredReceiptRecords();
  const savedRecords = [record, ...stored.value.filter((item) => item.id !== record.id)];

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(receiptsStorageKey, JSON.stringify(savedRecords));
    } catch {
      return {
        value: mergeReceiptRecords(savedRecords),
        recovered: true,
      };
    }
  }

  return {
    value: mergeReceiptRecords(savedRecords),
    recovered: stored.recovered,
  };
}
