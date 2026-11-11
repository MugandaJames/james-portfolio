"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Grows its content from slightly tilted and small to full size as it scrolls into view. */
export default function ScrollScale({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      el,
      { scale: 0.82, rotateX: 14, transformPerspective: 1400, transformOrigin: "50% 100%" },
      {
        scale: 1,
        rotateX: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.8 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
