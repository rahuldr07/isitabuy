import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params?.q) ? params?.q[0] : params?.q;
  const query = rawQuery?.trim();

  redirect(query ? `/deals?q=${encodeURIComponent(query)}` : "/deals");
}
