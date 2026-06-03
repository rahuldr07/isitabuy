import { redirect } from "next/navigation";
import { resolveRouteRedirect } from "@/lib/navigation";

export default async function RouteRedirectPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;

  redirect(resolveRouteRedirect(`/${path.join("/")}`));
}
