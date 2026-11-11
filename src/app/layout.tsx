import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { sans, serif } from "./fonts";
import Cursor from "@/components/motion/Cursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "James Juma Muganda — Founder & Software Engineer",
    template: "%s — James Juma Muganda",
  },
  description:
    "James Juma Muganda is the founder and CEO of WAONA and a software engineer in Nairobi, building identity, ticketing and property products for the Kenyan market.",
  applicationName: "James Juma Muganda — Portfolio",
  openGraph: {
    type: "website",
    title: "James Juma Muganda — Founder & Software Engineer",
    description:
      "Founder of WAONA. Products, systems and engineering work by James Juma Muganda.",
    siteName: "James Juma Muganda",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Juma Muganda — Founder & Software Engineer",
    description:
      "Founder of WAONA. Products, systems and engineering work by James Juma Muganda.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1020",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint, so entrance animations never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <ScrollProgress />
        <SmoothScroll />
        <Suspense fallback={null}>
          <Cursor />
        </Suspense>
      </body>
    </html>
  );
}