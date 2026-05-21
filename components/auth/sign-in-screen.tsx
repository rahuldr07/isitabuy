"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AppleIcon,
  ArrowLeftIcon,
  AwardIcon,
  BellIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailCheckIcon,
  MailIcon,
  PanelsTopLeftIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  showLoginToast,
  showProviderToast,
  showResetLinkResentToast,
  showResetLinkToast,
  showSignupToast,
} from "@/components/auth/auth-toasts";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const benefitItems = [
  {
    title: "AI Insights",
    description: "Get AI scores and recommendations based on reviews, price history, and real data.",
    icon: SearchCheckIcon,
    tone: "buy",
  },
  {
    title: "Price Alerts",
    description: "Track products you care about and get notified when prices drop.",
    icon: BellIcon,
    tone: "wait",
  },
  {
    title: "Best Deals",
    description: "Discover handpicked deals and historical low prices.",
    icon: TagIcon,
    tone: "value",
  },
] as const;

const trustItems = [
  {
    title: "Your data is secure and encrypted",
    icon: LockIcon,
  },
  {
    title: "We never sell your personal information",
    icon: ShieldCheckIcon,
  },
  {
    title: "Deal scores are not based on commission",
    icon: AwardIcon,
  },
  {
    title: "Independent. Unbiased. Always on your side.",
    icon: UsersIcon,
  },
] as const;

const providers = [
  { label: "Continue with Google", icon: SearchCheckIcon },
  { label: "Continue with Apple", icon: AppleIcon },
  { label: "Continue with Microsoft", icon: PanelsTopLeftIcon },
] as const;

function MotionButton({
  children,
  className,
  onClick,
  variant,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: React.ComponentProps<typeof Button>["variant"];
  type?: "button" | "submit";
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      <Button
        type={type}
        onClick={onClick}
        variant={variant}
        className={cn("h-11 w-full rounded-xl text-sm font-bold shadow-none", className)}
      >
        {children}
      </Button>
    </motion.div>
  );
}

function FieldWithIcon({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  endIcon: EndIcon,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Field className="gap-2">
      <FieldLabel htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </FieldLabel>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-12 rounded-xl border-border bg-card px-12 text-sm shadow-none placeholder:text-muted-foreground/80"
        />
        {EndIcon ? (
          <EndIcon
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          />
        ) : null}
      </div>
    </Field>
  );
}

function BenefitIcon({
  icon: Icon,
  tone,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tone: "buy" | "wait" | "value";
}) {
  return (
    <div
      className={cn(
        "flex size-14 shrink-0 items-center justify-center rounded-full",
        tone === "buy" && "bg-soft-buy text-buy",
        tone === "wait" && "bg-soft-wait text-wait",
        tone === "value" && "bg-soft-value text-value",
      )}
    >
      <Icon aria-hidden="true" className="size-6" />
    </div>
  );
}

type AuthMode = "login" | "signup" | "forgot" | "resetSent";

interface SignInScreenProps {
  initialMode?: AuthMode;
}

export default function SignInScreen({ initialMode = "login" }: SignInScreenProps) {
  const [authState, setAuthState] = useState<"idle" | "checking" | "success">("idle");
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthState("checking");
    window.setTimeout(() => {
      if (authMode === "forgot") {
        setAuthState("idle");
        setAuthMode("resetSent");
        showResetLinkToast();
        return;
      }

      setAuthState("success");
      if (authMode === "signup") {
        showSignupToast();
        return;
      }

      showLoginToast();
    }, 650);
  };

  const switchAuthMode = (nextMode: AuthMode) => {
    setAuthState("idle");
    setAuthMode(nextMode);
  };

  const authCopy = {
    login: {
      title: "Welcome back",
      description: "Login to continue to your account",
      headerPrompt: "Don't have an account?",
      headerAction: "Sign up",
      headerMode: "signup" as const,
      headerHref: "/signin?mode=signup",
    },
    signup: {
      title: "Create your account",
      description: "Start saving products and tracking better deals",
      headerPrompt: "Already have an account?",
      headerAction: "Log in",
      headerMode: "login" as const,
      headerHref: "/signin",
    },
    forgot: {
      title: "Reset password",
      description: "Enter your email and we'll send you a secure reset link",
      headerPrompt: "Remembered it?",
      headerAction: "Log in",
      headerMode: "login" as const,
      headerHref: "/signin",
    },
    resetSent: {
      title: "Check your email",
      description: "If an account exists, we'll send a password reset link.",
      headerPrompt: "Remembered it?",
      headerAction: "Log in",
      headerMode: "login" as const,
      headerHref: "/signin",
    },
  }[authMode];

  return (
    <main
      className="min-h-screen bg-[image:var(--page-glow)]"
    >
      <header className="sticky top-0 z-40 border-b bg-card/95 shadow-[0_1px_0_rgb(15_23_42/0.03)] backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] w-full max-w-[1352px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-0">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="IsItABuy home">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--brand-gradient)] text-white shadow-soft">
              <ShoppingBagIcon aria-hidden="true" className="size-6" />
            </span>
            <span className="truncate text-2xl font-bold tracking-normal text-[var(--happy-ink)]">IsItABuy</span>
          </Link>

          <div className="flex items-center gap-3">
            <p className="hidden text-sm font-bold text-foreground md:block">
              {authCopy.headerPrompt}
            </p>
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-xl border-buy/40 bg-card px-6 text-sm font-bold text-buy shadow-none hover:bg-soft-buy hover:text-buy"
            >
              <Link
                href={authCopy.headerHref}
                onClick={(event) => {
                  event.preventDefault();
                  switchAuthMode(authCopy.headerMode);
                }}
              >
                {authCopy.headerAction}
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <div className="mx-auto grid w-full max-w-[1360px] gap-7 px-5 py-8 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(340px,0.92fr)] md:items-start md:gap-4 lg:grid-cols-[0.98fr_1.02fr] lg:gap-8 lg:px-8 lg:py-8 xl:grid-cols-[620px_588px] xl:gap-8 xl:px-0">
        <section
          className="flex flex-col gap-5"
        >
          <Badge className="w-fit rounded-full bg-soft-buy px-4 py-1.5 text-sm font-bold text-buy" variant="secondary">
            <SparklesIcon data-icon="inline-start" />
            AI-Powered Shopping Advisor
          </Badge>

          <div className="flex flex-col gap-4">
            <h1 className="max-w-[560px] text-[38px] font-bold leading-[1.16] tracking-normal text-foreground sm:text-[42px] lg:text-[44px] xl:text-[48px]">
              Shop smarter with your{" "}
              <span className="text-buy">AI shopping assistant</span>
            </h1>
            <p className="max-w-[520px] text-[16px] font-semibold leading-7 text-muted-foreground">
              Create an account to save products, track prices, upload receipts,
              and get personalized recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-5 pt-6">
            {benefitItems.map((item) => (
              <motion.article
                key={item.title}
                className="flex gap-5"
                variants={shouldReduceMotion ? undefined : itemVariants}
                layout
              >
                <BenefitIcon icon={item.icon} tone={item.tone} />
                <div className="min-w-0 pt-0.5">
                  <h2 className="truncate text-lg font-bold">{item.title}</h2>
                  <p className="line-clamp-2 max-w-sm text-sm font-semibold leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div data-scroll-reveal className="max-w-[620px] pt-4">
            <Card className="overflow-hidden rounded-2xl bg-card/95 py-0 shadow-soft">
              <CardContent className="grid p-0 sm:grid-cols-[2fr_0.7fr_0.7fr]">
                <div className="flex items-center gap-2.5 p-3.5 lg:gap-3 lg:p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-buy text-primary-foreground lg:size-10">
                    <ShieldCheckIcon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[11px] font-bold leading-4 text-foreground lg:text-sm lg:leading-5">
                      Basic product checking is free
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-muted-foreground lg:text-sm lg:leading-6">
                      No login required to search and check products.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l p-3.5 lg:gap-2 lg:p-4">
                  <UsersIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground lg:size-6" />
                  <div className="min-w-0">
                    <p className="font-numeric text-lg font-bold leading-none text-foreground lg:text-xl">500K+</p>
                    <p className="mt-1 text-[10px] font-semibold leading-3 text-muted-foreground lg:text-xs">smart shoppers</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l p-3.5 lg:gap-2 lg:p-4">
                  <StarIcon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground lg:size-6" />
                  <div className="min-w-0">
                    <p className="font-numeric text-lg font-bold leading-none text-foreground lg:text-xl">4.8/5</p>
                    <p className="mt-1 text-[10px] font-semibold leading-3 text-muted-foreground lg:text-xs">from 20K+ reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="flex justify-center md:justify-start">
          <Card className="w-full max-w-[588px] rounded-3xl bg-card/95 py-0 shadow-[var(--auth-card-shadow)] md:max-w-none xl:max-w-[588px]">
            <CardHeader className="px-6 pt-8 sm:px-8 lg:px-10 lg:pt-10">
              <CardTitle className="text-[28px] font-bold tracking-normal">
                {authCopy.title}
              </CardTitle>
              <CardDescription className="text-base font-semibold">
                {authCopy.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-5 pt-6 sm:px-8 lg:px-10">
              <AnimatePresence mode="wait">
                {authMode === "resetSent" ? (
                  <div
                    key="reset-sent"
                    className="flex flex-col gap-5"
                  >
                    <div className="rounded-2xl bg-soft-buy p-5 text-buy">
                      <MailCheckIcon aria-hidden="true" className="mb-3 size-7" />
                      <p className="text-sm font-bold text-foreground">Reset link requested</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                        Check your inbox for a secure link. It may take a minute
                        to arrive.
                      </p>
                    </div>
                    <MotionButton
                      className="bg-buy text-primary-foreground hover:bg-buy/90"
                      type="button"
                      onClick={showResetLinkResentToast}
                    >
                      Resend link
                    </MotionButton>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 rounded-xl text-sm font-bold text-muted-foreground"
                      onClick={() => switchAuthMode("login")}
                    >
                      <ArrowLeftIcon data-icon="inline-start" />
                      Back to login
                    </Button>
                  </div>
                ) : (
                  <form
                    key={authMode}
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                  >
                    <FieldGroup>
                      {authMode === "signup" ? (
                        <FieldWithIcon
                          id="name"
                          label="Full name"
                          type="text"
                          placeholder="Alex Morgan"
                          icon={UserIcon}
                        />
                      ) : null}
                      <FieldWithIcon
                        id="email"
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        icon={MailIcon}
                      />
                      {authMode !== "forgot" ? (
                        <Field className="gap-2">
                          <div className="flex items-center justify-between gap-3">
                            <FieldLabel htmlFor="password" className="text-sm font-semibold text-foreground">
                              Password
                            </FieldLabel>
                            {authMode === "login" ? (
                              <Link
                                href="/signin?mode=forgot"
                                className="truncate text-sm font-extrabold text-buy"
                                onClick={(event) => {
                                  event.preventDefault();
                                  switchAuthMode("forgot");
                                }}
                              >
                                Forgot password?
                              </Link>
                            ) : null}
                          </div>
                          <div className="relative">
                            <LockIcon
                              aria-hidden="true"
                              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              className="h-12 rounded-xl border-border bg-card pl-12 pr-12 text-sm shadow-none placeholder:text-muted-foreground/80"
                            />
                            <button
                              type="button"
                              aria-label="Show password"
                              aria-pressed="false"
                              className="absolute right-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              data-password-toggle
                              data-password-input="password"
                              data-visible="false"
                            >
                              <EyeIcon aria-hidden="true" className="password-eye-show size-5" />
                              <EyeOffIcon aria-hidden="true" className="password-eye-hide size-5" />
                            </button>
                          </div>
                        </Field>
                      ) : null}
                    </FieldGroup>

                    {authMode === "forgot" ? (
                      <motion.div
                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                      >
                        <Button
                          asChild
                          className="h-11 w-full rounded-xl bg-buy text-sm font-bold text-primary-foreground shadow-none hover:bg-buy/90"
                        >
                          <Link
                            href="/signin?mode=resetSent"
                            onClick={(event) => {
                              event.preventDefault();
                              showResetLinkToast();
                              switchAuthMode("resetSent");
                            }}
                          >
                            Send reset link
                          </Link>
                        </Button>
                      </motion.div>
                    ) : (
                      <MotionButton
                        type="submit"
                        className="bg-buy text-primary-foreground hover:bg-buy/90"
                      >
                        {authState === "checking"
                          ? "Checking..."
                          : authMode === "login"
                            ? "Log in"
                            : "Create account"}
                      </MotionButton>
                    )}

                    {authMode === "forgot" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-10 rounded-xl text-sm font-bold text-muted-foreground"
                        onClick={() => switchAuthMode("login")}
                      >
                        <ArrowLeftIcon data-icon="inline-start" />
                        Back to login
                      </Button>
                    ) : null}

                    <AnimatePresence>
                      {authState === "success" ? (
                        <motion.div
                          className="rounded-xl bg-soft-buy px-4 py-3 text-sm font-semibold text-buy"
                          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                        >
                          {authMode === "login"
                            ? "Demo login flow captured. Backend auth can be wired next."
                            : "Demo sign-up flow captured. Backend auth can be wired next."}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    {authMode !== "forgot" ? (
                      <>
                        <FieldSeparator>or continue with</FieldSeparator>

                        <div className="flex flex-col gap-3">
                          {providers.map((provider) => (
                            <MotionButton
                              key={provider.label}
                              variant="outline"
                              className="bg-card font-semibold text-foreground"
                              onClick={() => showProviderToast(provider.label.replace("Continue with ", ""))}
                            >
                              <provider.icon data-icon="inline-start" />
                              {authMode === "login"
                                ? provider.label
                                : provider.label.replace("Continue", "Sign up")}
                            </MotionButton>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </form>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex items-start gap-3 rounded-b-3xl border-0 bg-transparent px-6 pb-8 pt-4 sm:px-8 lg:px-10 lg:pb-10">
              <ShieldCheckIcon aria-hidden="true" className="mt-1 size-5 shrink-0 text-buy" />
              <FieldDescription className="text-xs leading-6">
                We protect your privacy and your data. By continuing, you agree
                to our <Link href="/">Terms of Service</Link> and <Link href="/">Privacy Policy</Link>.
              </FieldDescription>
            </CardFooter>
          </Card>
        </section>
      </div>

      <footer className="mx-auto w-full max-w-[1170px] px-5 pb-8 sm:px-8 xl:px-0">
        <Card className="rounded-2xl bg-card/90 py-0 shadow-soft">
          <CardContent className="grid grid-cols-4 gap-0 p-4">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-3 px-4 [&:not(:first-child)]:border-l">
                <item.icon aria-hidden="true" className="size-6 shrink-0 text-muted-foreground" />
                <p className="text-[11px] font-bold leading-4 text-muted-foreground lg:text-[13px] lg:leading-5">{item.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  if (window.__isitabuyPasswordToggleReady) return;
  window.__isitabuyPasswordToggleReady = true;
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest("[data-password-toggle]");
    if (!(button instanceof HTMLElement)) return;
    const inputId = button.getAttribute("data-password-input");
    const input = inputId ? document.getElementById(inputId) : null;
    if (!(input instanceof HTMLInputElement)) return;
    event.preventDefault();
    const shouldShow = input.type === "password";
    input.type = shouldShow ? "text" : "password";
    button.dataset.visible = String(shouldShow);
    button.setAttribute("aria-pressed", String(shouldShow));
    button.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
  });
})();
          `,
        }}
      />

    </main>
  );
}
