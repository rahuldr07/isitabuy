"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { CheckCircle2, FileCheck2, ReceiptText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/ui/bento";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showCompareToast } from "@/components/ui/app-toast";

const receiptsStorageKey = "isitabuy.dashboard.receipts";
const allowedFileTypes = new Set(["application/pdf"]);
const extractedItems = ["Sony WH-1000XM5", "Ninja Coffee Maker", "Nike Air Zoom Pegasus"];

function isAllowedReceiptFile(file: File) {
  return file.type.startsWith("image/") || allowedFileTypes.has(file.type);
}

function saveReceiptId(receiptId: string) {
  if (typeof window === "undefined") return;

  try {
    const raw = window.localStorage.getItem(receiptsStorageKey);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const existing = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    window.localStorage.setItem(receiptsStorageKey, JSON.stringify(Array.from(new Set([...existing, receiptId]))));
  } catch {
    showCompareToast("Receipt processed for this session", "Browser storage is unavailable, so this demo receipt may not persist after reload.");
  }
}

export default function ReceiptUploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [store, setStore] = useState("Target");
  const [purchaseDate, setPurchaseDate] = useState("2026-05-20");
  const [notes, setNotes] = useState("");
  const [processed, setProcessed] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFileName("");
      return;
    }

    if (!isAllowedReceiptFile(file)) {
      setFileName("");
      event.target.value = "";
      showCompareToast("Unsupported receipt file", "Upload a receipt image or PDF.");
      return;
    }

    setFileName(file.name);
    setProcessed(false);
  };

  const processReceipt = (useDemo: boolean) => {
    if (!useDemo && !fileName) {
      showCompareToast("Choose a receipt file", "Upload an image or PDF receipt, or use the demo receipt.");
      return;
    }

    const receiptId = useDemo ? "receipt-public-demo-2026-05-20" : `receipt-public-upload-${Date.now()}`;
    saveReceiptId(receiptId);
    setProcessed(true);
    showCompareToast(useDemo ? "Demo receipt processed" : "Receipt processed", `${store} receipt is ready with warranties, return alerts, and savings.`);
  };

  return (
    <BentoCard className="relative min-h-[32rem] border-brand-amber/25 bg-[linear-gradient(135deg,var(--card),var(--soft-wait)_56%,var(--card))] p-5 shadow-[0_24px_70px_rgb(110_76_37/0.13)]">
      <div className="rounded-[1.35rem] border border-brand-amber/25 bg-white/88 p-4 shadow-[0_18px_42px_rgb(105_72_34/0.09)]">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-soft-wait text-accent">
            {processed ? <FileCheck2 className="size-6" aria-hidden="true" /> : <ReceiptText className="size-6" aria-hidden="true" />}
          </span>
          <span className="rounded-full border border-brand-amber/35 bg-white px-3 py-1 text-xs font-semibold text-accent shadow-sm">
            {processed ? "Processed" : "Demo Upload"}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold">{processed ? `${store} Receipt` : "Upload a Receipt"}</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
          {processed ? "5 items extracted. 3 warranties tracked. 1 item needs review." : "Add an image or PDF and IsItABuy will turn it into purchase memory."}
        </p>

        <div className="mt-5 grid gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="public-receipt-file">Receipt File</label>
            <Input
              ref={fileInputRef}
              id="public-receipt-file"
              type="file"
              accept="image/*,application/pdf"
              className="mt-1 h-11 rounded-xl border-brand-amber/35 bg-white text-xs font-semibold shadow-sm file:mr-3 file:rounded-lg file:border-0 file:bg-soft-wait file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent focus-visible:ring-[var(--isitabuy-orange)]"
              onChange={handleFileChange}
            />
            <p className="mt-1 text-xs font-semibold text-muted-foreground">{fileName || "Image or PDF Receipt"}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="public-receipt-store">Store</label>
              <select
                id="public-receipt-store"
                value={store}
                onChange={(event) => {
                  setStore(event.target.value);
                  setProcessed(false);
                }}
                className="mt-1 h-11 w-full rounded-xl border border-brand-amber/35 bg-white px-3 text-sm font-semibold shadow-sm outline-none transition focus:border-[var(--isitabuy-orange)] focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
              >
                {["Target", "Amazon", "Best Buy", "Walmart", "Nike"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="public-receipt-date">Purchase Date</label>
              <Input
                id="public-receipt-date"
                type="date"
                value={purchaseDate}
                onChange={(event) => {
                  setPurchaseDate(event.target.value);
                  setProcessed(false);
                }}
                className="mt-1 h-11 rounded-xl border-brand-amber/35 bg-white text-sm font-semibold shadow-sm focus-visible:ring-[var(--isitabuy-orange)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="public-receipt-notes">Notes</label>
            <Textarea
              id="public-receipt-notes"
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
                setProcessed(false);
              }}
              placeholder="Optional notes for this purchase..."
              className="mt-1 min-h-24 rounded-xl border-brand-amber/35 bg-white text-sm font-medium shadow-sm placeholder:text-muted-foreground/70 focus-visible:ring-[var(--isitabuy-orange)]"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button className="h-10 rounded-full bg-[var(--isitabuy-orange)] text-xs font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]" onClick={() => processReceipt(false)}>
            <Upload className="size-4" aria-hidden="true" />
            Upload Receipt
          </Button>
          <Button variant="outline" className="h-10 rounded-full border-brand-amber/35 bg-white text-xs font-bold hover:bg-soft-wait" onClick={() => processReceipt(true)}>
            Use Demo Receipt
          </Button>
        </div>
      </div>

      {processed ? (
        <div className="mt-4 grid gap-2">
          {extractedItems.map((item, index) => (
            <div key={item} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-brand-amber/25 bg-white/82 px-3 py-3">
              <span className="min-w-0 truncate text-sm font-bold">{item}</span>
              <span className="rounded-full bg-soft-wait px-2.5 py-1 text-[0.68rem] font-bold text-muted-foreground">
                {index === 0 ? "Drop found" : index === 1 ? "Warranty" : "Matched"}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {processed ? (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          Receipt saved to this demo dashboard.
        </div>
      ) : null}
    </BentoCard>
  );
}
