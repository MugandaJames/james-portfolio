"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inertial smooth scrolling (Lenis) driven by GSAP's ticker, so every
 * ScrollTrigger scene stays in sync with the smoothed scroll position.
 * Skipped entirely for people who prefer reduced motion.
 */
export default function SmoothScroll() {
  // Re-measure every scroll scene once web fonts and images have settled,
  // so pinned sections start from the final layout.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("has-smooth");

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("has-smooth");
    };
  }, []);

  return null;
}
