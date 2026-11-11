import localFont from "next/font/local";

export const sans = localFont({
  variable: "--font-sans-local",
  display: "swap",
  src: [
    { path: "../assets/fonts/instrument-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/instrument-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/instrument-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const serif = localFont({
  variable: "--font-serif-local",
  display: "swap",
  src: [
    { path: "../assets/fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
});
