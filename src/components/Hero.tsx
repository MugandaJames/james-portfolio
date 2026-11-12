"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import { prefersReducedMotion } from "@/components/motion/device";
import { site } from "@/content/site";

gsap.registerPlugin(SplitText);

/** Current time in Nairobi, e.g. "11:52". Rendered on the client only. */
function useNairobiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Nairobi",
    });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);
  return time;
}

/**
 * The opening: James's name, who he is, and what he's doing right now.
 * The name rises in letter by letter, then its letters lift toward the
 * pointer (mouse) or under a finger dragged across it (touch).
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const time = useNairobiTime();

  useEffect(() => {
    const el = root.current;
    const h1 = name.current;
    if (!el || !h1 || prefersReducedMotion()) return;

    let chars: HTMLElement[] = [];
    const ctx = gsap.context(() => {
      const split = SplitText.create(h1, { type: "lines,chars", mask: "lines", linesClass: "split-line" });
      chars = split.chars as HTMLElement[];
      gsap.set(h1, { visibility: "visible" });
      gsap
        .timeline({
          defaults: { ease: "expo.out" },
          // Once the letters are in, let them lift above their line masks.
          onComplete: () => gsap.set(h1.querySelectorAll(".split-line-mask"), { overflow: "visible" }),
        })
        .from(chars, { yPercent: 115, duration: 1.3, stagger: 0.035 })
        .from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 }, 0.6);
    }, el);

    // Letters near the pointer rise and lean away from it.
    type Letter = { el: HTMLElement; y: (v: number) => void; r: (v: number) => void };
    let letters: Letter[] = [];
    const ready = setTimeout(() => {
      letters = chars.map((c) => ({
        el: c,
        y: gsap.quickTo(c, "y", { duration: 0.5, ease: "power3" }),
        r: gsap.quickTo(c, "rotate", { duration: 0.5, ease: "power3" }),
      }));
    }, 1600);

    const near = (x: number, y: number) => {
      for (const l of letters) {
        const r = l.el.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / 160);
        l.y(-pull * 22);
        l.r(-Math.sign(dx) * pull * 8);
      }
    };
    const settle = () =>
      letters.forEach((l) => {
        l.y(0);
        l.r(0);
      });
    const move = (e: PointerEvent) => near(e.clientX, e.clientY);

    h1.addEventListener("pointermove", move);
    h1.addEventListener("pointerleave", settle);
    h1.addEventListener("pointerup", settle);
    h1.addEventListener("pointercancel", settle);

    return () => {
      clearTimeout(ready);
      h1.removeEventListener("pointermove", move);
      h1.removeEventListener("pointerleave", settle);
      h1.removeEventListener("pointerup", settle);
      h1.removeEventListener("pointercancel", settle);
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="wrap">
        <h1 className="hero-name" ref={name} aria-label="James Juma Muganda">
          James Juma Muganda
        </h1>

        <div className="hero-below">
          <p className="hero-lead" data-hero-fade>
            I&apos;m a software engineer and the founder of WAONA. I design and
            build the parts of software people have to trust: who they are, where
            their money went, and whether their ticket is real.
          </p>

          <dl className="hero-meta" data-hero-fade>
            <div>
              <dt>Based in</dt>
              <dd>
                {site.location}
                {time && <span className="hero-clock">{time} local time</span>}
              </dd>
            </div>
            <div>
              <dt>Right now</dt>
              <dd>Founder and CEO of WAONA, growing WAONA Identity into a developer platform</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>Partnerships, product work and good conversations about systems</dd>
            </div>
          </dl>
        </div>

        <div className="hero-actions" data-hero-fade>
          <Magnetic>
            <Link href="#work" className="btn btn--solid" data-cursor="Scroll">
              See my work
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={`mailto:${site.email}`} className="btn btn--line">
              Email me
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
