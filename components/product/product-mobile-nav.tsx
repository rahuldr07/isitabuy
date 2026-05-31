import Link, { type LinkProps } from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProductMobileNavItem {
  href: LinkProps["href"];
  icon: LucideIcon;
  label: string;
  navKey: string;
}

function ProductMobileNav({
  activeKey,
  className,
  items,
}: {
  activeKey: string;
  className?: string;
  items: ProductMobileNavItem[];
}) {
  return (
    <nav
      aria-label="Product sections"
      className={cn(
        "sticky top-0 z-30 flex gap-2 overflow-x-auto border-b border-border bg-white/95 px-4 py-3 backdrop-blur lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map(({ href, icon: Icon, label, navKey }) => {
        const active = navKey === activeKey;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-extrabold transition-colors",
              active
                ? "border-[#d8c3ea] bg-[#f3eafa] text-[#581f86]"
                : "border-border bg-white text-foreground hover:border-[#d8c3ea] hover:bg-[#fbf7ff] hover:text-[#581f86]",
            )}
            href={href}
            key={navKey}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default ProductMobileNav;
