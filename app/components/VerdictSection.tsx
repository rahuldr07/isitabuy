import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BadgeDollarSign,
  Bell,
  CircleCheck,
  Scale,
  Star,
} from "lucide-react";
import { ShieldCheckIcon } from "@/components/ui/shield-check";

interface ScoreCard {
  icon: LucideIcon;
  animatedShield?: boolean;
  iconBg: string;
  iconColor: string;
  label: string;
  score: number;
  barColor: string;
  scoreColor: string;
  note: string;
}

const scoreCards: ScoreCard[] = [
  {
    icon: BadgeDollarSign,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    label: "Price Score",
    score: 88,
    barColor: "bg-emerald-500",
    scoreColor: "text-on-surface",
    note: "Near recent low",
  },
  {
    icon: BadgeCheck,
    animatedShield: true,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    label: "Review Trust",
    score: 82,
    barColor: "bg-sky-500",
    scoreColor: "text-on-surface",
    note: "Reliable patterns",
  },
  {
    icon: Star,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    label: "Quality Score",
    score: 91,
    barColor: "bg-teal-500",
    scoreColor: "text-teal-700",
    note: "Strong specs",
  },
  {
    icon: Scale,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    label: "Value Score",
    score: 79,
    barColor: "bg-amber-500",
    scoreColor: "text-amber-700",
    note: "Compare alternatives",
  },
];

function ScoreRing({ score }: { score: number }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="relative grid size-[84px] shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-emerald-100"
      role="img"
      aria-label={`AI score ${score} out of 100`}
    >
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-emerald-100"
        />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-emerald-500 transition-all duration-700"
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[24px] font-extrabold leading-none text-emerald-700 tabular-nums">
        {score}
      </span>
    </div>
  );
}

function SignalBars() {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      <div className="h-2 w-1 rounded-sm bg-emerald-600" />
      <div className="h-3 w-1 rounded-sm bg-emerald-600" />
      <div className="h-4 w-1 rounded-sm bg-emerald-600" />
    </div>
  );
}

export default function VerdictSection() {
  const compositeScore = Math.round(
    scoreCards.reduce((acc, card) => acc + card.score, 0) / scoreCards.length
  );
  const compositeWidth = `${compositeScore}%`;

  return (
    <section
      id="how-it-works"
      className="mb-24 w-full min-w-0 scroll-mt-28"
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-container">
            Verdict preview
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">
            Real-time AI verdicts
          </h2>
        </div>
        <p className="max-w-xl text-secondary md:text-right">
          See the product, price signal, trust score, and recommendation in one
          card before you decide.
        </p>
      </div>

      <div className="w-full max-w-full overflow-hidden rounded-2xl border border-surface-variant/60 bg-white shadow-premium">
        <div className="grid min-w-0 lg:grid-cols-[0.85fr_1.2fr_0.9fr]">
          <div
            className="relative min-h-[280px] overflow-hidden bg-slate-900 bg-cover bg-center lg:min-h-[520px]"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800')",
            }}
            role="img"
            aria-label="White noise cancelling headphones"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-900 shadow-sm backdrop-blur-sm">
              <BadgeCheck
                className="size-4 text-emerald-500"
                aria-hidden="true"
              />
              Commission-free
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white">
                <CircleCheck className="size-3" aria-hidden="true" />
                Strong Buy
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                Sony WH-1000XM5
              </h3>
              <p className="mt-1.5 text-xs text-white/60">
                Noise cancelling headphones
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col border-surface-variant/60 p-5 min-[420px]:p-6 md:p-7 lg:border-r lg:p-8">
            <div className="flex flex-col items-stretch gap-4 min-[460px]:flex-row min-[460px]:items-start min-[460px]:justify-between">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-secondary">
                  Current price
                </p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-on-surface">
                  $299.00
                </p>
              </div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white shadow-sm transition hover:bg-emerald-700 active:scale-95 min-[460px]:w-auto"
              >
                <CircleCheck className="size-4" aria-hidden="true" />
                Buy Now
              </button>
            </div>

            <div className="mt-6 flex min-w-0 flex-col gap-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 min-[420px]:p-5 min-[520px]:flex-row min-[520px]:items-center">
              <ScoreRing score={84} />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-extrabold leading-snug text-emerald-900">
                  Strong buy today.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-emerald-800/70">
                  Price near low, reviews trustworthy, quality signals
                  excellent.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <SignalBars />
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-600">
                    High confidence
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50  via-white to-purple-50 p-4">
              <p className="text-[12.5px] leading-[1.75] text-slate-600">
                The current price is competitive, review trust is strong, and
                quality signals are excellent. Value is good, with a few cheaper
                alternatives worth checking before checkout.
              </p>
            </div>

            <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                className="rounded-xl bg-[#622395] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#3D1660] active:scale-95"
              >
                AI Analysis
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-emerald-500/40 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-95"
              >
                <Bell className="size-5" aria-hidden="true" />
                Set Price Alert
              </button>
            </div>
          </div>

          <aside className="flex min-w-0 flex-col bg-slate-50 p-5 min-[420px]:p-6 lg:p-7">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xl font-extrabold tracking-tight text-on-surface">
                Score breakdown
              </h4>
              <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white ring-1 ring-surface-variant/70">
               {/* <CircleCheck className="size-2" aria-hidden="true" /> */}
                Verified
              </span>
            </div>

            <div className="mt-5 divide-y divide-slate-200">
              {scoreCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div key={card.label} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-[9px] ${card.iconBg} ${card.iconColor}`}
                        >
                          {card.animatedShield ? (
                            <ShieldCheckIcon size={18} aria-hidden="true" />
                          ) : (
                            <Icon className="size-4" aria-hidden="true" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-bold text-on-surface">
                            {card.label}
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-secondary">
                            {card.note}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end">
                        <span
                          className={`text-xl font-extrabold leading-none ${card.scoreColor}`}
                        >
                          {card.score}
                        </span>
                        <span className="text-[9px] font-semibold text-secondary/60">
                          /100
                        </span>
                      </div>
                    </div>
                    <div
                      className="h-[7px] overflow-hidden rounded-full bg-slate-200/70"
                      role="progressbar"
                      aria-valuenow={card.score}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${card.label} ${card.score} out of 100`}
                    >
                      <div
                        className={`${card.barColor} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${card.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-surface-variant/50 bg-white p-4 shadow-sm">
              <p className="mb-2.5 text-[11px] font-bold text-on-surface">
                Overall AI Score
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#622395]/10"
                  role="progressbar"
                  aria-valuenow={compositeScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Overall AI score ${compositeScore} out of 100`}
                >
                  <div
                    className="h-full rounded-full bg-[#622395] transition-all duration-700"
                    style={{ width: compositeWidth }}
                  />
                </div>
                <span className="text-base font-extrabold text-[#622395]">
                  {compositeScore}
                </span>
              </div>
              <p className="mt-1.5 text-[10px] text-secondary">
                Weighted composite score
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
