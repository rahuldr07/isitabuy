"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GooeyToaster } from "@/components/ui/goey-toaster";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    if (motionQuery.matches) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const dismissToastOnClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("[data-sonner-toast]")) {
        gooeyToast.dismiss();
      }
    };

    document.addEventListener("click", dismissToastOnClick);

    return () => {
      document.removeEventListener("click", dismissToastOnClick);
    };
  }, []);

  return (
    <TooltipProvider>
      {children}
      <GooeyToaster
        position="top-right"
        duration={3000}
        gap={10}
        offset={18}
        richColors
        showProgress={false}
      />
    </TooltipProvider>
  );
}
