"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * An endless row of words. It drifts on its own, speeds up and changes
 * direction with your scroll, and leans into fast scrolling.
 */
export default function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loop = gsap.to(el, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        const dir = self.direction;
        gsap.to(loop, {
          timeScale: dir * (1 + Math.min(Math.abs(v) / 250, 6)),
          duration: 0.2,
          overwrite: true,
          onComplete: () => {
            gsap.to(loop, { timeScale: dir, duration: 1.2 });
          },
        });
        gsap.to(el, {
          skewX: gsap.utils.clamp(-10, 10, -v / 200),
          duration: 0.3,
          overwrite: true,
          onComplete: () => {
            gsap.to(el, { skewX: 0, duration: 0.6, ease: "power3" });
          },
        });
      },
    });

    return () => {
      loop.kill();
      st.kill();
    };
  }, []);

  const row = [...items, ...items];
  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <div className="marquee-track" ref={track} aria-hidden="true">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
