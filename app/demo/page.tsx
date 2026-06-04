"use client";

import { useState, useEffect } from "react";
import { Sparkles, Type, Layers, ChevronDown, type LucideIcon } from "lucide-react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type ThemeKey = "linen" | "void" | "aurora" | "obsidian" | "chalk" | "dusk" | "fog" | "mint" | "peach" | "sky" | "sand";
type FontHeadingKey = "fraunces" | "playfair" | "syne" | "cormorant" | "unbounded" | "bricolage" | "instrument" | "cinzel" | "bodoni" | "outfit" | "epilogue";
type FontBodyKey = "jakarta" | "dmSans" | "spaceGrotesk" | "outfit" | "raleway";

// ─── Theme Definitions ────────────────────────────────────────────────────────

interface Theme {
  label: string;
  bg: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  pillBg: string;
  pillText: string;
  panelBg: string;
  panelBorder: string;
  inputBg: string;
  inputBorder: string;
  labelColor: string;
  selectText: string;
  btnOutlineBorder: string;
  btnOutlineText: string;
}

const THEMES: Record<ThemeKey, Theme> = {
  linen: {
    label: "Linen",
    bg: "linear-gradient(160deg, #faf7f2 0%, #f5ede0 40%, #f0e8d8 100%)",
    text: "#1a1208",
    textMuted: "#7a6a52",
    accent: "#c2440e",
    accentText: "#ffffff",
    badgeBg: "rgba(194,68,14,0.08)",
    badgeBorder: "rgba(194,68,14,0.18)",
    badgeText: "#9e3209",
    pillBg: "rgba(26,18,8,0.06)",
    pillText: "#3d2e1a",
    panelBg: "rgba(255,252,245,0.92)",
    panelBorder: "rgba(194,68,14,0.12)",
    inputBg: "rgba(245,237,224,0.7)",
    inputBorder: "rgba(194,68,14,0.15)",
    labelColor: "#8a7660",
    selectText: "#1a1208",
    btnOutlineBorder: "rgba(26,18,8,0.25)",
    btnOutlineText: "#1a1208",
  },
  void: {
    label: "Void",
    bg: "radial-gradient(ellipse at 20% 30%, #1a0e2e 0%, #0a0613 50%, #000000 100%)",
    text: "#e8e2f8",
    textMuted: "#8878b0",
    accent: "#9b6dff",
    accentText: "#ffffff",
    badgeBg: "rgba(155,109,255,0.12)",
    badgeBorder: "rgba(155,109,255,0.25)",
    badgeText: "#c4a8ff",
    pillBg: "rgba(232,226,248,0.06)",
    pillText: "#c4a8ff",
    panelBg: "rgba(18,10,32,0.95)",
    panelBorder: "rgba(155,109,255,0.2)",
    inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(155,109,255,0.2)",
    labelColor: "#6b5a8a",
    selectText: "#e8e2f8",
    btnOutlineBorder: "rgba(232,226,248,0.2)",
    btnOutlineText: "#e8e2f8",
  },
  aurora: {
    label: "Aurora",
    bg: "radial-gradient(ellipse at 0% 100%, #003d30 0%, #011a28 45%, #0a0820 100%)",
    text: "#edfaf4",
    textMuted: "#6bb89a",
    accent: "#00e5a0",
    accentText: "#001a12",
    badgeBg: "rgba(0,229,160,0.1)",
    badgeBorder: "rgba(0,229,160,0.22)",
    badgeText: "#00c98c",
    pillBg: "rgba(237,250,244,0.06)",
    pillText: "#7deecc",
    panelBg: "rgba(5,22,18,0.95)",
    panelBorder: "rgba(0,229,160,0.15)",
    inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(0,229,160,0.18)",
    labelColor: "#3a8a6a",
    selectText: "#edfaf4",
    btnOutlineBorder: "rgba(237,250,244,0.2)",
    btnOutlineText: "#edfaf4",
  },
  obsidian: {
    label: "Obsidian",
    bg: "linear-gradient(145deg, #0e0e10 0%, #18181b 60%, #0e0e10 100%)",
    text: "#f4f4f5",
    textMuted: "#71717a",
    accent: "#f5c842",
    accentText: "#0e0e10",
    badgeBg: "rgba(245,200,66,0.1)",
    badgeBorder: "rgba(245,200,66,0.2)",
    badgeText: "#d4a81e",
    pillBg: "rgba(244,244,245,0.05)",
    pillText: "#f5c842",
    panelBg: "rgba(10,10,12,0.97)",
    panelBorder: "rgba(245,200,66,0.15)",
    inputBg: "rgba(255,255,255,0.04)",
    inputBorder: "rgba(245,200,66,0.15)",
    labelColor: "#52525b",
    selectText: "#f4f4f5",
    btnOutlineBorder: "rgba(244,244,245,0.18)",
    btnOutlineText: "#f4f4f5",
  },
  chalk: {
    label: "Chalk",
    bg: "linear-gradient(170deg, #ffffff 0%, #f8f8ff 50%, #f2f2fa 100%)",
    text: "#111118",
    textMuted: "#6b6b80",
    accent: "#3b35e0",
    accentText: "#ffffff",
    badgeBg: "rgba(59,53,224,0.07)",
    badgeBorder: "rgba(59,53,224,0.15)",
    badgeText: "#2f29c0",
    pillBg: "rgba(17,17,24,0.05)",
    pillText: "#3b35e0",
    panelBg: "rgba(255,255,255,0.95)",
    panelBorder: "rgba(59,53,224,0.12)",
    inputBg: "rgba(242,242,250,0.8)",
    inputBorder: "rgba(59,53,224,0.12)",
    labelColor: "#9090a8",
    selectText: "#111118",
    btnOutlineBorder: "rgba(17,17,24,0.2)",
    btnOutlineText: "#111118",
  },
  dusk: {
    label: "Dusk",
    bg: "linear-gradient(155deg, #1a0a2e 0%, #2d1854 30%, #5c1f3c 70%, #8b2252 100%)",
    text: "#fdeef8",
    textMuted: "#b87aae",
    accent: "#ff6eb4",
    accentText: "#ffffff",
    badgeBg: "rgba(255,110,180,0.12)",
    badgeBorder: "rgba(255,110,180,0.25)",
    badgeText: "#ff9fd0",
    pillBg: "rgba(253,238,248,0.06)",
    pillText: "#ffb8da",
    panelBg: "rgba(20,8,38,0.95)",
    panelBorder: "rgba(255,110,180,0.2)",
    inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(255,110,180,0.2)",
    labelColor: "#7a4a72",
    selectText: "#fdeef8",
    btnOutlineBorder: "rgba(253,238,248,0.2)",
    btnOutlineText: "#fdeef8",
  },
  fog: {
    label: "Fog",
    bg: "linear-gradient(135deg, #e8eaf0 0%, #dde1ec 40%, #d4d8e8 100%)",
    text: "#1c1e30",
    textMuted: "#6b7090",
    accent: "#3f5efb",
    accentText: "#ffffff",
    badgeBg: "rgba(63,94,251,0.08)",
    badgeBorder: "rgba(63,94,251,0.18)",
    badgeText: "#2a46d6",
    pillBg: "rgba(28,30,48,0.06)",
    pillText: "#3f5efb",
    panelBg: "rgba(255,255,255,0.88)",
    panelBorder: "rgba(63,94,251,0.12)",
    inputBg: "rgba(212,216,232,0.6)",
    inputBorder: "rgba(63,94,251,0.12)",
    labelColor: "#8890aa",
    selectText: "#1c1e30",
    btnOutlineBorder: "rgba(28,30,48,0.2)",
    btnOutlineText: "#1c1e30",
  },
  mint: {
    label: "Mint",
    bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    text: "#14532d",
    textMuted: "#166534",
    accent: "#16a34a",
    accentText: "#ffffff",
    badgeBg: "rgba(22, 163, 74, 0.1)",
    badgeBorder: "rgba(22, 163, 74, 0.2)",
    badgeText: "#15803d",
    pillBg: "rgba(20, 83, 45, 0.05)",
    pillText: "#16a34a",
    panelBg: "rgba(255, 255, 255, 0.9)",
    panelBorder: "rgba(22, 163, 74, 0.2)",
    inputBg: "rgba(220, 252, 231, 0.5)",
    inputBorder: "rgba(22, 163, 74, 0.2)",
    labelColor: "#15803d",
    selectText: "#14532d",
    btnOutlineBorder: "rgba(20, 83, 45, 0.2)",
    btnOutlineText: "#14532d",
  },
  peach: {
    label: "Peach",
    bg: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    text: "#881337",
    textMuted: "#9f1239",
    accent: "#e11d48",
    accentText: "#ffffff",
    badgeBg: "rgba(225, 29, 72, 0.1)",
    badgeBorder: "rgba(225, 29, 72, 0.2)",
    badgeText: "#be123c",
    pillBg: "rgba(136, 19, 55, 0.05)",
    pillText: "#e11d48",
    panelBg: "rgba(255, 255, 255, 0.9)",
    panelBorder: "rgba(225, 29, 72, 0.2)",
    inputBg: "rgba(255, 228, 230, 0.5)",
    inputBorder: "rgba(225, 29, 72, 0.2)",
    labelColor: "#be123c",
    selectText: "#881337",
    btnOutlineBorder: "rgba(136, 19, 55, 0.2)",
    btnOutlineText: "#881337",
  },
  sky: {
    label: "Sky",
    bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    text: "#082f49",
    textMuted: "#0c4a6e",
    accent: "#0284c7",
    accentText: "#ffffff",
    badgeBg: "rgba(2, 132, 199, 0.1)",
    badgeBorder: "rgba(2, 132, 199, 0.2)",
    badgeText: "#0369a1",
    pillBg: "rgba(8, 47, 73, 0.05)",
    pillText: "#0284c7",
    panelBg: "rgba(255, 255, 255, 0.9)",
    panelBorder: "rgba(2, 132, 199, 0.2)",
    inputBg: "rgba(224, 242, 254, 0.5)",
    inputBorder: "rgba(2, 132, 199, 0.2)",
    labelColor: "#0369a1",
    selectText: "#082f49",
    btnOutlineBorder: "rgba(8, 47, 73, 0.2)",
    btnOutlineText: "#082f49",
  },
  sand: {
    label: "Sand",
    bg: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
    text: "#713f12",
    textMuted: "#854d0e",
    accent: "#d97706",
    accentText: "#ffffff",
    badgeBg: "rgba(217, 119, 6, 0.1)",
    badgeBorder: "rgba(217, 119, 6, 0.2)",
    badgeText: "#b45309",
    pillBg: "rgba(113, 63, 18, 0.05)",
    pillText: "#d97706",
    panelBg: "rgba(255, 255, 255, 0.9)",
    panelBorder: "rgba(217, 119, 6, 0.2)",
    inputBg: "rgba(254, 243, 199, 0.5)",
    inputBorder: "rgba(217, 119, 6, 0.2)",
    labelColor: "#b45309",
    selectText: "#713f12",
    btnOutlineBorder: "rgba(113, 63, 18, 0.2)",
    btnOutlineText: "#713f12",
  }
};

// ─── Font Definitions ─────────────────────────────────────────────────────────

const HEADING_FONTS: Record<FontHeadingKey, { label: string; family: string; style?: string }> = {
  fraunces:  { label: "Fraunces", family: "'Fraunces', serif", style: "italic" },
  playfair:  { label: "Playfair Display", family: "'Playfair Display', serif" },
  syne:      { label: "Syne", family: "'Syne', sans-serif" },
  cormorant: { label: "Cormorant Garamond", family: "'Cormorant Garamond', serif", style: "italic" },
  unbounded: { label: "Unbounded", family: "'Unbounded', sans-serif" },
  instrument: { label: "Instrument Serif", family: "'Instrument Serif', serif", style: "italic" },
  cinzel:    { label: "Cinzel", family: "'Cinzel', serif" },
  bodoni:    { label: "Bodoni Moda", family: "'Bodoni Moda', serif", style: "italic" },
  bricolage: { label: "Bricolage Grotesque", family: "'Bricolage Grotesque', sans-serif" },
  outfit:    { label: "Outfit Display", family: "'Outfit', sans-serif" },
  epilogue:  { label: "Epilogue", family: "'Epilogue', sans-serif" },
};

const BODY_FONTS: Record<FontBodyKey, { label: string; family: string }> = {
  jakarta:      { label: "Plus Jakarta Sans", family: "'Plus Jakarta Sans', sans-serif" },
  dmSans:       { label: "DM Sans", family: "'DM Sans', sans-serif" },
  spaceGrotesk: { label: "Space Grotesk", family: "'Space Grotesk', sans-serif" },
  outfit:       { label: "Outfit", family: "'Outfit', sans-serif" },
  raleway:      { label: "Raleway", family: "'Raleway', sans-serif" },
};

// ─── Google Fonts loader ──────────────────────────────────────────────────────

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800" +
  "&family=DM+Sans:wght@300;400;500;600;700" +
  "&family=Space+Grotesk:wght@300;400;500;600;700" +
  "&family=Outfit:wght@300;400;500;600;700;800" +
  "&family=Raleway:wght@300;400;500;600;700;800" +
  "&family=Syne:wght@400;500;600;700;800" +
  "&family=Unbounded:wght@300;400;500;600;700" +
  "&family=Bricolage+Grotesque:wght@300;400;500;600;700;800" +
  "&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700" +
  "&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600" +
  "&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700" +
  "&family=Instrument+Serif:ital@0;1" +
  "&family=Cinzel:wght@400;500;600;700" +
  "&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700" +
  "&family=Epilogue:wght@300;400;500;600;700" +
  "&display=swap";

// ─── Reusable Select ─────────────────────────────────────────────────────────

function PanelSelect<T extends string>({
  value,
  onChange,
  options,
  theme,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  theme: Theme;
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          width: "100%",
          appearance: "none",
          WebkitAppearance: "none",
          padding: "9px 36px 9px 12px",
          borderRadius: 10,
          border: `1px solid ${theme.inputBorder}`,
          background: theme.inputBg,
          color: theme.selectText,
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          outline: "none",
          transition: "border-color 0.2s",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: theme.labelColor,
        }}
      />
    </div>
  );
}

// ─── Panel Label ─────────────────────────────────────────────────────────────

function PanelLabel({ icon: Icon, label, theme }: { icon: LucideIcon; label: string; theme: Theme }) {
  return (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: theme.labelColor,
        marginBottom: 8,
      }}
    >
      <Icon size={11} />
      {label}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DemoPage() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("linen");
  const [headingKey, setHeadingKey] = useState<FontHeadingKey>("fraunces");
  const [bodyKey, setBodyKey] = useState<FontBodyKey>("jakarta");

  const t = THEMES[themeKey];
  const hf = HEADING_FONTS[headingKey];
  const bf = BODY_FONTS[bodyKey];

  // Inject Google Fonts once
  useEffect(() => {
    if (document.getElementById("demo-gfonts")) return;
    const link = document.createElement("link");
    link.id = "demo-gfonts";
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  const themeOptions = (Object.keys(THEMES) as ThemeKey[]).map((k) => ({
    value: k,
    label: THEMES[k].label,
  }));

  const headingOptions = (Object.keys(HEADING_FONTS) as FontHeadingKey[]).map((k) => ({
    value: k,
    label: HEADING_FONTS[k].label,
  }));

  const bodyOptions = (Object.keys(BODY_FONTS) as FontBodyKey[]).map((k) => ({
    value: k,
    label: BODY_FONTS[k].label,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: bf.family,
        transition: "background 0.5s, color 0.4s",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── Settings Panel ─────────────────────────────────────────── */}
      <aside
        style={{
          position: "fixed",
          right: 24,
          top: 24,
          zIndex: 50,
          width: 256,
          borderRadius: 18,
          background: t.panelBg,
          border: `1px solid ${t.panelBorder}`,
          padding: "20px 18px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "background 0.4s, border-color 0.4s",
          boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
          fontFamily: bf.family,
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            paddingBottom: 14,
            borderBottom: `1px solid ${t.panelBorder}`,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: t.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layers size={14} color={t.accentText} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
            Theme Studio
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 10,
              fontWeight: 600,
              color: t.accent,
              background: t.badgeBg,
              border: `1px solid ${t.badgeBorder}`,
              padding: "2px 7px",
              borderRadius: 100,
            }}
          >
            LIVE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Theme */}
          <div>
            <PanelLabel icon={Sparkles} label="Color Theme" theme={t} />
            {/* Swatches */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
                const th = THEMES[k];
                return (
                  <button
                    key={k}
                    onClick={() => setThemeKey(k)}
                    title={th.label}
                    aria-label={th.label}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: th.accent,
                      border: themeKey === k
                        ? `2.5px solid ${t.text}`
                        : "2.5px solid transparent",
                      cursor: "pointer",
                      transition: "transform 0.15s, border-color 0.15s",
                      transform: themeKey === k ? "scale(1.18)" : "scale(1)",
                      outline: "none",
                    }}
                  />
                );
              })}
            </div>
            <PanelSelect
              value={themeKey}
              onChange={setThemeKey}
              options={themeOptions}
              theme={t}
            />
          </div>

          {/* Heading font */}
          <div>
            <PanelLabel icon={Sparkles} label="Display Font" theme={t} />
            <PanelSelect
              value={headingKey}
              onChange={setHeadingKey}
              options={headingOptions}
              theme={t}
            />
          </div>

          {/* Body font */}
          <div>
            <PanelLabel icon={Type} label="Body Font" theme={t} />
            <PanelSelect
              value={bodyKey}
              onChange={setBodyKey}
              options={bodyOptions}
              theme={t}
            />
          </div>

          {/* Font preview strip */}
          <div
            style={{
              borderRadius: 10,
              border: `1px solid ${t.panelBorder}`,
              padding: "10px 12px",
              background: t.inputBg,
            }}
          >
            <p style={{ fontSize: 10, color: t.labelColor, marginBottom: 4, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Preview
            </p>
            <p style={{ fontFamily: hf.family, fontSize: 18, fontWeight: 700, color: t.accent, lineHeight: 1.2, fontStyle: hf.style ?? "normal" }}>
              Display Aa
            </p>
            <p style={{ fontFamily: bf.family, fontSize: 12, color: t.textMuted, marginTop: 3 }}>
              Body — The quick brown fox.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Page Content ───────────────────────────────────────────── */}
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 16px",
            borderRadius: 100,
            border: `1px solid ${t.badgeBorder}`,
            background: t.badgeBg,
            fontSize: 12,
            fontWeight: 600,
            color: t.badgeText,
            marginBottom: 36,
            letterSpacing: "0.02em",
          }}
        >
          <Sparkles size={13} color={t.accent} />
          AI-Powered Shopping Advisor
        </div>

        {/* Headline — two-font split */}
        <h1
          style={{
            maxWidth: 760,
            lineHeight: 1.08,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: hf.family,
              fontStyle: hf.style ?? "normal",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 800,
              color: t.accent,
              letterSpacing: "-0.02em",
            }}
          >
            Know before
          </span>
          <span
            style={{
              display: "block",
              fontFamily: bf.family,
              fontSize: "clamp(38px, 6.5vw, 68px)",
              fontWeight: 700,
              color: t.text,
              letterSpacing: "-0.025em",
            }}
          >
            you buy.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            maxWidth: 520,
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.75,
            color: t.textMuted,
            marginBottom: 44,
          }}
        >
          Real-time price tracking, verified reviews, and AI scoring — so every
          purchase is one you&apos;ll never regret.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: 100,
              background: t.accent,
              color: t.accentText,
              fontFamily: bf.family,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: `0 12px 32px -8px ${t.accent}55`,
              transition: "transform 0.15s, box-shadow 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 18px 40px -8px ${t.accent}70`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 32px -8px ${t.accent}55`;
            }}
          >
            Start searching deals
          </Link>
          <button
            style={{
              display: "inline-block",
              padding: "13px 28px",
              borderRadius: 100,
              background: "transparent",
              color: t.btnOutlineText,
              border: `1.5px solid ${t.btnOutlineBorder}`,
              fontFamily: bf.family,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              transition: "opacity 0.15s, transform 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            See how it works →
          </button>
        </div>

        {/* Social proof */}
        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["12,000+ users", "4.9 ★ rating", "₹2Cr+ saved"].map((stat) => (
            <div
              key={stat}
              style={{
                padding: "8px 18px",
                borderRadius: 100,
                background: t.pillBg,
                fontSize: 13,
                fontWeight: 600,
                color: t.pillText,
                letterSpacing: "0.01em",
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
