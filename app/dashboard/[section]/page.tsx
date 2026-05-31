import { notFound } from "next/navigation";
import DashboardSectionPageClient, { type DashboardSectionKey } from "@/components/dashboard/DashboardSectionPageClient";

const dashboardSectionKeys = ["saved", "watchlist", "alerts", "receipts", "compare-history", "chat", "settings"] as const;

export function generateStaticParams() {
  return dashboardSectionKeys.map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const label = section
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    title: `${label} - IsItABuy Dashboard`,
    description: `IsItABuy dashboard ${label.toLowerCase()} section.`,
  };
}

export default async function DashboardSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!dashboardSectionKeys.includes(section as DashboardSectionKey)) {
    notFound();
  }

  return <DashboardSectionPageClient section={section as DashboardSectionKey} />;
}
