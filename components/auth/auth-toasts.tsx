"use client";

import {
  BellIcon,
  CheckCircle2Icon,
  InfoIcon,
  MailCheckIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { gooeyToast } from "@/components/ui/goey-toaster";

const sharedToast = {
  duration: 3200,
  preset: "smooth" as const,
  showProgress: false,
  showTimestamp: false,
};

function clearAndShow(show: () => string | number) {
  gooeyToast.dismiss();
  return show();
}

export function showLoginToast() {
  return clearAndShow(() => gooeyToast.success("Login preview complete", {
    ...sharedToast,
    description: "This demo is ready for a real auth backend.",
    icon: <CheckCircle2Icon className="size-4 text-[#14a84a]" aria-hidden="true" />,
  }));
}

export function showSignupToast() {
  return clearAndShow(() => gooeyToast.success("Account preview created", {
    ...sharedToast,
    description: "The sign-up flow is wired and ready for backend auth.",
    icon: <ShieldCheckIcon className="size-4 text-[#14a84a]" aria-hidden="true" />,
  }));
}

export function showResetLinkToast() {
  return clearAndShow(() => gooeyToast.success("Reset link requested", {
    ...sharedToast,
    description: "If an account exists, we'll send a secure reset link.",
    icon: <MailCheckIcon className="size-4 text-[#14a84a]" aria-hidden="true" />,
  }));
}

export function showResetLinkResentToast() {
  return clearAndShow(() => gooeyToast.info("Reset link resent", {
    ...sharedToast,
    description: "Check your inbox again in a minute.",
    preset: "subtle",
    icon: <BellIcon className="size-4 text-[#ff7a00]" aria-hidden="true" />,
  }));
}

export function showProviderToast(provider: string) {
  return clearAndShow(() => gooeyToast.info(`${provider} auth coming soon`, {
    ...sharedToast,
    description: "Provider OAuth can be connected once backend auth is added.",
    preset: "subtle",
    icon: <InfoIcon className="size-4 text-[#4b09a9]" aria-hidden="true" />,
  }));
}
