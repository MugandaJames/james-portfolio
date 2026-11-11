"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "@/components/Frames";
import { APP_BG, ticketJourney } from "@/content/shots";
import { haptic } from "@/components/motion/device";

gsap.registerPlugin(ScrollTrigger);

/**
 * The WAONA Tickets journey as a pinned scene. On wide screens the section
 * pins while you scroll: each new screen wipes up over the last, the step copy
 * swaps, and the progress rail fills. Narrow screens and reduced motion get a
 * simple stacked list, one phone per step.
 */
export default function Walkthrough() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [swiped, setSwiped] = useState(false);

  // Phones: a swipeable row. Each card scales into focus as it reaches the
  // centre, the dots follow, and a light tick marks each new step.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    let last = 0;
    const update = () => {
      frame = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      const cards = Array.from(el.children) as HTMLElement[];
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        const focus = Math.max(0, 1 - dist / card.offsetWidth);
        card.style.setProperty("--focus", focus.toFixed(3));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      if (best !== last) {
        last = best;
        haptic(8);
      }
      setActive(best);
    };
    const onScroll = () => {
      setSwiped(true);
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

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
          invalidateOnRefresh: true,
        },
      });

      // Each step owns one unit of the timeline. Transitions take the middle 40%,
      // so each step has a wide resting zone where it is fully clear.
      for (let i = 1; i < steps; i++) {
        const t = i - 1 + 0.3;
        tl.to(copies[i - 1], { autoAlpha: 0, y: -40, duration: 0.15 }, t)
          .to(screens[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power2.inOut" }, t)
          .to(screens[i - 1], { scale: 0.94, autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, t)
          .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.15 }, t + 0.25);
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

      {/* Swipeable row (narrow screens, reduced motion, screen readers) */}
      <div className="scene-mobile">
        <ol className="scene-list" ref={track}>
          {ticketJourney.map((step, i) => (
            <li key={step.title} className="scene-item">
              <Phone shot={step.shot} className="scene-item-phone" sizes="260px" />
              <div className="scene-item-copy">
                <span className="scene-item-count" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="scene-dots" role="group" aria-label="Choose a step">
          {ticketJourney.map((step, i) => (
            <button
              key={step.title}
              type="button"
              className={i === active ? "is-on" : ""}
              aria-label={`Step ${i + 1}: ${step.title}`}
              aria-current={i === active ? "step" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
          <span className={`scene-swipe${swiped ? " is-gone" : ""}`} aria-hidden="true">
            Swipe
          </span>
        </div>
      </div>
    </div>
  );
}
