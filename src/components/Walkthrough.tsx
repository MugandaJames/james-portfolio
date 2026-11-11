"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "@/components/Frames";
import { APP_BG, ticketJourney } from "@/content/shots";

gsap.registerPlugin(ScrollTrigger);

/**
 * The WAONA Tickets journey as a pinned scene. On wide screens the section
 * pins while you scroll: each new screen wipes up over the last, the step copy
 * swaps, and the progress rail fills. Narrow screens and reduced motion get a
 * simple stacked list, one phone per step.
 */
export default function Walkthrough() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1001px) and (prefers-reduced-motion: no-preference)", () => {
      const screens = gsap.utils.toArray<HTMLElement>(".scene-screen", el);
      const copies = gsap.utils.toArray<HTMLElement>(".scene-copy", el);
      const steps = screens.length;

      gsap.set(screens.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(copies.slice(1), { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * (steps - 1) * 0.9}`,
          pin: true,
          scrub: 0.6,
          snap: { snapTo: 1 / (steps - 1), duration: 0.5, ease: "power2.inOut" },
          invalidateOnRefresh: true,
        },
      });

      // Each step owns one unit of the timeline. Transitions run in the middle
      // of the unit, so every snap point rests on a clean, fully visible step.
      for (let i = 1; i < steps; i++) {
        const t = i - 1 + 0.2;
        tl.to(copies[i - 1], { autoAlpha: 0, y: -40, duration: 0.25 }, t)
          .to(screens[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, t)
          .to(screens[i - 1], { scale: 0.94, autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, t)
          .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.3 }, t + 0.3);
      }
      tl.fromTo(".scene-rail-fill", { scaleY: 0 }, { scaleY: 1, duration: steps - 1 }, 0);

      // Light up the step counter that matches the scroll position.
      const counters = gsap.utils.toArray<HTMLElement>(".scene-count li", el);
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (steps - 1) * 0.9}`,
        onUpdate: (self) => {
          const active = Math.round(self.progress * (steps - 1));
          counters.forEach((c, i) => c.classList.toggle("is-on", i === active));
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="scene" ref={root}>
      {/* Pinned layout (wide screens) */}
      <div className="scene-pinned" aria-hidden="true">
        <div className="scene-text">
          <ol className="scene-count">
            {ticketJourney.map((step, i) => (
              <li key={step.title} className={i === 0 ? "is-on" : ""}>
                {i + 1}
              </li>
            ))}
          </ol>
          <div className="scene-copies">
            {ticketJourney.map((step) => (
              <div key={step.title} className="scene-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="scene-device">
          <div className="scene-rail">
            <span className="scene-rail-fill" />
          </div>
          <div className="phone scene-phone">
            <div className="phone-screen" style={{ backgroundColor: APP_BG }}>
              {ticketJourney.map((step) => (
                <div
                  key={step.title}
                  className="scene-screen"
                  style={{ backgroundColor: step.shot.bg ?? APP_BG }}
                >
                  <Image src={step.shot.src} alt="" placeholder="blur" sizes="360px" className="phone-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stacked layout (narrow screens, reduced motion, screen readers) */}
      <ol className="scene-list">
        {ticketJourney.map((step, i) => (
          <li key={step.title} className="scene-item">
            <span className="scene-item-count" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <Phone shot={step.shot} className="scene-item-phone" sizes="260px" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
