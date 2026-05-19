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
  BookmarkIcon,
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

const pageVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

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
    title: "AI-Powered Insights",
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
    title: "Save & Watchlist",
    description: "Save products, create watchlists, and never miss a good deal.",
    icon: BookmarkIcon,
    tone: "buy",
  },
  {
    title: "Best Deals",
    description: "Discover handpicked deals and historical low prices.",
    icon: TagIcon,
    tone: "wait",
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
  tone: "buy" | "wait";
}) {
  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-2xl",
        tone === "buy" ? "bg-soft-buy text-buy" : "bg-soft-wait text-wait",
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
    <motion.main
      className="min-h-screen bg-[image:var(--page-glow)]"
      variants={shouldReduceMotion ? undefined : pageVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="show"
    >
      <motion.header
        className="sticky top-0 z-40 border-b bg-card/95 shadow-[0_1px_0_rgb(15_23_42/0.03)] backdrop-blur-xl"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        <nav className="mx-auto flex h-[72px] w-full max-w-[1352px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-0">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="IsItABuy home">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-buy text-primary-foreground shadow-soft">
              <ShoppingBagIcon aria-hidden="true" className="size-6" />
            </span>
            <span className="truncate text-2xl font-extrabold tracking-normal text-buy">IsItABuy</span>
          </Link>

          <div className="flex items-center gap-3">
            <p className="hidden text-sm font-bold text-foreground md:block">
              {authCopy.headerPrompt}
            </p>
            <Button
              asChild
              className="h-10 rounded-xl bg-[image:var(--brand-gradient)] px-6 text-sm font-extrabold text-primary-foreground shadow-soft hover:opacity-95"
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
      </motion.header>

      <div className="mx-auto grid w-full max-w-[1240px] gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start lg:gap-8 lg:px-8 lg:py-8 xl:grid-cols-[620px_588px] xl:gap-8 xl:px-0">
        <motion.section
          className="flex flex-col gap-5"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          <Badge className="w-fit rounded-full bg-soft-value px-4 py-1.5 text-sm font-extrabold text-value" variant="secondary">
            <SparklesIcon data-icon="inline-start" />
            AI-Powered Shopping Advisor
          </Badge>

          <div className="flex flex-col gap-4">
            <h1 className="max-w-[560px] text-[44px] font-black leading-[1.16] tracking-normal text-foreground sm:text-[48px]">
              Shop smarter with your own AI buying{" "}
              <span className="text-buy">assistant</span>.
            </h1>
            <p className="max-w-[520px] text-[16px] font-semibold leading-7 text-muted-foreground">
              Create an account to save products, track prices, upload receipts,
              and get personalized recommendations.
            </p>
          </div>

          <Card className="w-full max-w-[620px] rounded-full border-border bg-card/95 py-0 shadow-soft">
            <CardContent className="grid grid-cols-[max-content_max-content_max-content_max-content] items-center justify-between gap-5 px-6 py-4 max-sm:flex max-sm:flex-wrap max-sm:gap-x-5 max-sm:gap-y-3 max-sm:px-6">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="size-4 rounded-full bg-buy" />
                <span className="text-[15px] font-black leading-none sm:text-base">Buy Now</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="size-4 rounded-full bg-wait" />
                <span className="text-[15px] font-black leading-none sm:text-base">Wait</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="size-4 rounded-full bg-avoid" />
                <span className="text-[15px] font-black leading-none sm:text-base">Avoid</span>
              </div>
              <Badge className="whitespace-nowrap rounded-full bg-[image:var(--value-gradient)] px-3.5 py-1.5 text-xs font-black text-primary-foreground sm:text-sm">
                <SparklesIcon data-icon="inline-start" />
                BEST VALUE
              </Badge>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 pt-0.5">
            {benefitItems.map((item) => (
              <motion.article
                key={item.title}
                className="flex gap-4"
                variants={shouldReduceMotion ? undefined : itemVariants}
                layout
              >
                <BenefitIcon icon={item.icon} tone={item.tone} />
                <div className="min-w-0 pt-0.5">
                  <h2 className="truncate text-[15px] font-black">{item.title}</h2>
                  <p className="line-clamp-2 max-w-sm text-[13px] font-semibold leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div data-scroll-reveal className="grid max-w-[620px] gap-3">
            <Card className="rounded-2xl border-buy/10 bg-soft-buy py-0 shadow-soft">
              <CardContent className="flex items-center gap-4 p-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-buy text-primary-foreground">
                  <ShieldCheckIcon aria-hidden="true" className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-black leading-5 text-foreground">
                      Basic product checking is free
                    </h3>
                    <Link href="/" className="text-xs font-black text-buy">
                      Learn more -&gt;
                    </Link>
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                    Search and check products before creating an account.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-card py-0 shadow-soft">
              <CardContent className="grid grid-cols-2 p-0">
                <div className="flex items-center gap-4 px-5 py-4">
                  <ShieldCheckIcon aria-hidden="true" className="size-8 shrink-0 text-buy" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">Trusted by</p>
                    <p className="mt-1 text-2xl font-black leading-none text-foreground">500K+</p>
                    <p className="mt-1 text-xs text-muted-foreground">smart shoppers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-l px-5 py-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex gap-0.5 text-wait">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon key={index} aria-hidden="true" className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-2xl font-black leading-none text-foreground">4.8/5</p>
                    <p className="mt-1 text-xs text-muted-foreground">from 20K+ reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          className="flex justify-center lg:justify-start"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          <Card className="w-full max-w-[588px] rounded-3xl bg-card/95 py-0 shadow-[var(--auth-card-shadow)]">
            <CardHeader className="px-6 pt-10 sm:px-8 lg:px-10">
              <CardTitle className="text-[28px] font-black tracking-normal">
                {authCopy.title}
              </CardTitle>
              <CardDescription className="text-base font-semibold">
                {authCopy.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-5 pt-6 sm:px-8 lg:px-10">
              <AnimatePresence mode="wait">
                {authMode === "resetSent" ? (
                  <motion.div
                    key="reset-sent"
                    className="flex flex-col gap-5"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
                      className="bg-[image:var(--brand-gradient)] text-primary-foreground hover:opacity-95"
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
                  </motion.div>
                ) : (
                  <motion.form
                    key={authMode}
                    className="flex flex-col gap-5"
                    variants={shouldReduceMotion ? undefined : pageVariants}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={shouldReduceMotion ? "show" : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
                              className="h-12 rounded-xl border-border bg-card px-12 text-sm shadow-none placeholder:text-muted-foreground/80"
                            />
                            <EyeOffIcon
                              aria-hidden="true"
                              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                            />
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
                          className="h-11 w-full rounded-xl bg-[image:var(--brand-gradient)] text-sm font-bold text-primary-foreground shadow-none hover:opacity-95"
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
                        className="bg-[image:var(--brand-gradient)] text-primary-foreground hover:opacity-95"
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
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex items-start gap-3 rounded-b-3xl border-0 bg-transparent px-6 pb-10 pt-4 sm:px-8 lg:px-10">
              <ShieldCheckIcon aria-hidden="true" className="mt-1 size-5 shrink-0 text-buy" />
              <FieldDescription className="text-xs leading-6">
                We protect your privacy and your data. By continuing, you agree
                to our <Link href="/">Terms of Service</Link> and <Link href="/">Privacy Policy</Link>.
              </FieldDescription>
            </CardFooter>
          </Card>
        </motion.section>
      </div>

      <motion.footer
        className="mx-auto w-full max-w-[1170px] px-5 pb-8 sm:px-8 xl:px-0"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        <Card className="rounded-2xl bg-card/90 py-0 shadow-soft">
          <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-4 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8">
                <item.icon aria-hidden="true" className="size-7 shrink-0 text-muted-foreground" />
                <p className="text-[13px] font-bold leading-5 text-muted-foreground">{item.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.footer>

    </motion.main>
  );
}
