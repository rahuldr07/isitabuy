"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface DealsSearchFormProps {
  actionPath: string;
  defaultValue: string;
}

export default function DealsSearchForm({ actionPath, defaultValue }: DealsSearchFormProps) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const query = String(formData.get("q") ?? "").trim();

    if (query) return;

    event.preventDefault();
    router.push("/deals");
  }

  return (
    <form
      action={actionPath}
      className="relative min-w-0 flex-1"
      id="deals-search-form"
      onSubmit={handleSubmit}
    >
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--isitabuy-muted)]" aria-hidden="true" />
      <Input
        className="h-10 rounded-xl border-transparent bg-white pl-9 text-xs font-semibold shadow-none focus-visible:ring-[var(--isitabuy-orange)] sm:text-sm"
        defaultValue={defaultValue}
        name="q"
        placeholder="Search products, categories, stores, or paste a link..."
      />
    </form>
  );
}
