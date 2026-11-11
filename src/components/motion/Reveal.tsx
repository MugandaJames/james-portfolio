"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * A big heading whose lines rise out of a mask as it scrolls into view.
 * Used only on the few headings that open a chapter.
 */
export default function RevealHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }),
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
