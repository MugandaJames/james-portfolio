"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { haptic, prefersReducedMotion } from "@/components/motion/device";
import { site } from "@/content/site";

const links = [
  { label: "WAONA Tickets", href: "/#tickets" },
  { label: "WAONA Identity", href: "/#identity" },
  { label: "All work", href: "/work" },
  { label: "About", href: "/#about" },
];

/**
 * Full-screen menu for phones. The panel opens as a circle growing from the
 * button, then the links rise in one after another.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(el, { visibility: "visible" })
        .fromTo(
          el,
          { clipPath: "circle(0% at calc(100% - 44px) 34px)" },
          { clipPath: "circle(150% at calc(100% - 44px) 34px)", duration: 0.9, ease: "expo.inOut" },
        )
        .fromTo(".mm-link", { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.06 }, 0.35)
        .fromTo(".mm-foot", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (prefersReducedMotion()) {
      t.progress(open ? 1 : 0).pause();
    } else if (open) {
      t.timeScale(1).play();
    } else {
      t.timeScale(1.8).reverse();
    }
    document.documentElement.classList.toggle("menu-open", open);
    if (open) panel.current?.querySelector<HTMLElement>(".mm-link")?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = () => {
    haptic(10);
    setOpen((o) => !o);
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        className={`mm-button${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span />
        <span />
      </button>

      <div
        id="mobile-menu"
        ref={panel}
        className="mm-panel"
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Menu">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="mm-item">
                <Link href={link.href} className="mm-link" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mm-foot">
          <a href={`mailto:${site.email}`} className="mm-mail">
            {site.email}
          </a>
          <ul>
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
