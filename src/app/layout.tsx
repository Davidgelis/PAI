import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Practicaly AI — Make 1 Billion People AI Fluent",
  description:
    "Daily AI updates, workflows, and prompts designed to make artificial intelligence useful for everyone. Free, unsubscribe anytime.",
  openGraph: {
    title: "Practicaly AI — Make 1 Billion People AI Fluent",
    description:
      "Daily AI updates, workflows, and prompts designed to make artificial intelligence useful for everyone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
