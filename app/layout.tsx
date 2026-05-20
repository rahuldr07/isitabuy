import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import Providers from "@/app/providers";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IsItABuy",
  description: "AI-powered shopping advisor interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${spaceGrotesk.variable} min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
