import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "James Juma Muganda — Backend Engineer & System Designer",
    template: "%s — James Juma Muganda",
  },
  description:
    "The portfolio and engineering journal of James Juma Muganda. Exploring backend engineering, system design, databases, and dependable software.",
  applicationName: "James Juma Muganda — Portfolio",
  openGraph: {
    type: "website",
    title: "James Juma Muganda — Backend Engineer & System Designer",
    description:
      "Selected engineering projects, technical thinking, and notes on building dependable software.",
    siteName: "James Juma Muganda",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Juma Muganda — Backend Engineer & System Designer",
    description:
      "Backend engineering, system design, and the craft of building dependable software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11120f",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}