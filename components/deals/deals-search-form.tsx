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
      className="relative mx-auto hidden max-w-[760px] flex-1 md:block"
      id="deals-search-form"
      onSubmit={handleSubmit}
    >
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="h-12 rounded-lg border-border bg-white pl-12 text-sm font-medium shadow-sm"
        defaultValue={defaultValue}
        name="q"
        placeholder="Search deals by product, category, or store..."
      />
    </form>
  );
}
