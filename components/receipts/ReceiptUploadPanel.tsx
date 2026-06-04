"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, ChevronDown, FileCheck2, ReceiptText, Store, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/ui/bento";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showCompareToast } from "@/components/ui/app-toast";
import { buildReceiptRecord, formatReceiptDate, getReceiptDateString, isAllowedReceiptFile, receiptStoreOptions, saveReceiptRecord } from "@/lib/receiptRecords";
import type { ReceiptRecord } from "@/types/dashboard";

export default function ReceiptUploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [store, setStore] = useState("Target");
  const [purchaseDate, setPurchaseDate] = useState(() => getReceiptDateString(-3));
  const [notes, setNotes] = useState("");
  const [processed, setProcessed] = useState(false);
  const [processedRecord, setProcessedRecord] = useState<ReceiptRecord | null>(null);
  const quickDateOptions = [
    { label: "Today", value: getReceiptDateString(0) },
    { label: "Yesterday", value: getReceiptDateString(-1) },
    { label: "Last week", value: getReceiptDateString(-7) },
  ];

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

    const receiptId = useDemo ? "receipt-target-demo" : `receipt-public-upload-${Date.now()}`;
    const record = buildReceiptRecord({ fileName, store, purchaseDate, notes }, useDemo);
    const result = saveReceiptRecord({ ...record, id: receiptId });
    setProcessedRecord(result.value.find((item) => item.id === receiptId) ?? record);
    setProcessed(true);
    showCompareToast(
      useDemo ? "Demo receipt processed" : "Receipt processed",
      result.recovered
        ? `${store} receipt is ready for this session. Browser storage could not persist it.`
        : `${store} receipt is now in the dashboard with warranties, return alerts, and savings.`,
    );
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
              <Select
                value={store}
                onValueChange={(value) => {
                  setStore(value);
                  setProcessed(false);
                }}
              >
                <SelectTrigger
                  id="public-receipt-store"
                  className="mt-1 h-11 w-full min-w-0 rounded-xl border-brand-amber/35 bg-white px-3 text-sm font-semibold shadow-sm focus-visible:border-[var(--isitabuy-orange)] focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
                  style={{ width: "100%", height: "2.75rem" }}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Store className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    <SelectValue placeholder="Choose store" />
                  </span>
                </SelectTrigger>
                <SelectContent position="popper" align="start" className="rounded-xl border border-brand-amber/25 bg-white p-1 shadow-[0_18px_38px_rgb(105_72_34/0.14)]">
                  {receiptStoreOptions.map((option) => (
                    <SelectItem key={option} value={option} className="rounded-lg py-2 text-sm font-semibold focus:bg-soft-wait focus:text-[var(--isitabuy-ink)]">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="public-receipt-date">Purchase Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="public-receipt-date"
                    type="button"
                    className="mt-1 flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-brand-amber/35 bg-white px-3 text-left text-sm font-semibold shadow-sm outline-none transition hover:border-[var(--isitabuy-orange)] hover:bg-white focus-visible:border-[var(--isitabuy-orange)] focus-visible:ring-2 focus-visible:ring-[var(--isitabuy-orange)]"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <CalendarDays className="size-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="whitespace-nowrap">{formatReceiptDate(purchaseDate)}</span>
                    </span>
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto rounded-2xl border border-brand-amber/25 bg-white p-3 shadow-[0_18px_44px_rgb(105_72_34/0.16)]">
                  <div className="flex items-center gap-2 rounded-xl bg-soft-wait px-3 py-2 text-sm font-semibold text-[var(--isitabuy-ink)]">
                    <CalendarDays className="size-4 text-accent" aria-hidden="true" />
                    Purchase Date
                  </div>
                  <Calendar
                    className="mt-3"
                    mode="single"
                    selected={purchaseDate ? new Date(purchaseDate + "T12:00:00Z") : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const day = String(date.getDate()).padStart(2, "0");
                        setPurchaseDate(`${year}-${month}-${day}`);
                        setProcessed(false);
                      }
                    }}
                    />
                  <div className="mt-3 grid gap-2">
                    {quickDateOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="flex h-9 items-center justify-between rounded-xl border border-transparent px-3 text-left text-xs font-semibold text-muted-foreground transition hover:border-brand-amber/30 hover:bg-soft-wait hover:text-[var(--isitabuy-ink)]"
                        onClick={() => {
                          setPurchaseDate(option.value);
                          setProcessed(false);
                        }}
                      >
                        <span>{option.label}</span>
                        <span className="font-medium">{formatReceiptDate(option.value)}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
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
          {(processedRecord?.items ?? []).map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-brand-amber/25 bg-white/82 px-3 py-3">
              <span className="min-w-0 truncate text-sm font-bold">{item.productName}</span>
              <span className="rounded-full bg-soft-wait px-2.5 py-1 text-[0.68rem] font-bold text-muted-foreground">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {processed ? (
        <div className="mt-4 grid gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-xs font-bold text-emerald-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Receipt saved to the dashboard.
          </div>
          <Button asChild variant="outline" className="h-9 rounded-full border-emerald-200 bg-white text-xs font-bold text-emerald-700 hover:bg-emerald-50">
            <Link href="/dashboard/receipts">Open receipt dashboard</Link>
          </Button>
        </div>
      ) : null}
    </BentoCard>
  );
}
