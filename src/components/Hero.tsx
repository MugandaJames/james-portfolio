"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hasFinePointer, onDeviceTilt, prefersReducedMotion } from "@/components/motion/device";
import { Browser, Phone } from "@/components/Frames";
import Magnetic from "@/components/motion/Magnetic";
import { Status } from "@/components/Chrome";
import { shots } from "@/content/shots";
import { site } from "@/content/site";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // One orchestrated entrance: letters rise, copy follows, devices settle in.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-hero-fade], [data-depth]", { autoAlpha: 1 });
        return;
      }
      const split = SplitText.create(".hero-name", { type: "lines,chars", mask: "lines", linesClass: "split-line" });
      gsap.set(".hero-name", { visibility: "visible" });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(split.chars, { yPercent: 115, duration: 1.3, stagger: 0.035 })
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.55)
        .fromTo(
          ".hero-browser",
          { autoAlpha: 0, x: 80, rotateY: -18 },
          { autoAlpha: 1, x: 0, rotateY: 0, duration: 1.6 },
          0.35,
        )
        .fromTo(
          ".hero-phone",
          { autoAlpha: 0, y: 140, rotate: -6 },
          { autoAlpha: 1, y: 0, rotate: 0, duration: 1.5 },
          0.6,
        )
        .fromTo(
          ".hero-chip",
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.12 },
          1.1,
        );
    }, el);

    return () => ctx.revert();
  }, []);

  // Depth. With a mouse the stack leans toward the pointer; on phones it
  // follows the motion sensor and drifts gently. Each layer moves by its depth.
  useEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st || prefersReducedMotion()) return;

    const rotX = gsap.quickTo(st, "rotateX", { duration: 1, ease: "power3" });
    const rotY = gsap.quickTo(st, "rotateY", { duration: 1, ease: "power3" });
    const layers = Array.from(st.querySelectorAll<HTMLElement>("[data-depth]")).map((layer) => ({
      depth: Number(layer.dataset.depth),
      x: gsap.quickTo(layer, "x", { duration: 1.2, ease: "power3" }),
      y: gsap.quickTo(layer, "y", { duration: 1.2, ease: "power3" }),
    }));

    const lean = (nx: number, ny: number) => {
      rotY(nx * 16);
      rotX(-ny * 12);
      layers.forEach((l) => {
        l.x(nx * l.depth * 60);
        l.y(ny * l.depth * 44);
      });
    };

    const ctx = gsap.context(() => {
      // Scroll parallax for every device: nearer layers travel further.
      const parallax = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-browser", { yPercent: -8, ease: "none", scrollTrigger: parallax });
      gsap.to(".hero-phone", { yPercent: -22, ease: "none", scrollTrigger: parallax });
      gsap.to(".hero-chip", { yPercent: -160, ease: "none", scrollTrigger: parallax });

      // Floating chips, after the entrance has placed them.
      gsap.to(".hero-chip", {
        y: (i) => (i % 2 ? 8 : -8),
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
        stagger: 0.6,
      });
    }, el);

    if (hasFinePointer()) {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        lean((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
      };
      const reset = () => lean(0, 0);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
        ctx.revert();
      };
    }

    // Phones: tilt with the device, and drag across the hero to lean the stack.
    const stopTilt = onDeviceTilt((x, y) => lean(x * 0.5, y * 0.5));
    const drag = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const r = el.getBoundingClientRect();
      lean((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
    };
    const release = () => lean(0, 0);
    st.addEventListener("pointermove", drag);
    st.addEventListener("pointerup", release);
    st.addEventListener("pointercancel", release);
    return () => {
      stopTilt();
      st.removeEventListener("pointermove", drag);
      st.removeEventListener("pointerup", release);
      st.removeEventListener("pointercancel", release);
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-name" aria-label="James Juma Muganda">
            James Juma
            <br />
            Muganda
          </h1>
          <p className="hero-lead" data-hero-fade>
            I founded WAONA, and I build its products: sign-in for developers,
            tickets for events across Kenya, and a better way to find a home.
          </p>
          <div className="hero-actions" data-hero-fade>
            <Magnetic>
              <Link href="#tickets" className="btn btn--solid" data-cursor="Scroll">
                See the products
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${site.email}`} className="btn btn--line">
                Email me
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-scene">
          <div className="hero-stage" ref={stage}>
            <div data-depth="0.4" className="hero-layer">
              <Browser
                shot={shots.tickets.discoverDesktop}
                priority
                className="hero-browser"
                address="WAONA Tickets"
              />
            </div>
            <div data-depth="1.2" className="hero-layer hero-layer--phone">
              <Phone shot={shots.tickets.ticket} priority className="hero-phone" sizes="200px" />
            </div>
            <div data-depth="1.8" className="hero-layer hero-layer--chips" aria-hidden="true">
              <span className="hero-chip hero-chip--pay">Paid with M-Pesa</span>
              <span className="hero-chip hero-chip--auth">Signed in with WAONA Identity</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap now" data-hero-fade>
        <p>
          WAONA Identity <Status status="live" label="Live" />
        </p>
        <p>
          WAONA Tickets <Status status="soon" label="Launching soon" />
        </p>
        <p>
          Pata Nyumba <Status status="design" label="In design" />
        </p>
      </div>
    </section>
  );
}
