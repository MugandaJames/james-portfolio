"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import qr from "@/assets/waona-qr.svg";

/**
 * A WAONA ticket you can play with: it leans toward the pointer with a moving
 * sheen, and flips to its QR side when pressed. The QR opens waona.ke.
 */
export default function TicketCard() {
  const card = useRef<HTMLButtonElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rx = gsap.quickTo(el, "--rx", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(el, "--ry", { duration: 0.5, ease: "power3" });
    const gx = gsap.quickTo(el, "--gx", { duration: 0.3, ease: "power2" });
    const gy = gsap.quickTo(el, "--gy", { duration: 0.3, ease: "power2" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      ry((nx - 0.5) * 24);
      rx(-(ny - 0.5) * 18);
      gx(nx * 100);
      gy(ny * 100);
    };
    const reset = () => {
      rx(0);
      ry(0);
      gx(50);
      gy(30);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="ticket-wrap">
      <button
        ref={card}
        type="button"
        className={`ticket${flipped ? " is-flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Show the front of the ticket" : "Flip the ticket to see its QR code"}
        data-cursor={flipped ? "Flip back" : "Flip"}
      >
        <span className="ticket-inner">
          <span className="ticket-face ticket-front">
            <span className="ticket-head">
              <span className="ticket-brand">WAONA Tickets</span>
              <span className="ticket-event">Your next night out</span>
              <span className="ticket-when">Events across Kenya, launching soon</span>
            </span>
            <span className="ticket-perf" aria-hidden="true" />
            <span className="ticket-body">
              <span className="ticket-row">
                <span>Tier</span>
                <strong>Early Bird</strong>
              </span>
              <span className="ticket-row">
                <span>Admits</span>
                <strong>One</strong>
              </span>
              <span className="ticket-row">
                <span>Paid with</span>
                <strong>M-Pesa</strong>
              </span>
            </span>
            <span className="ticket-sheen" aria-hidden="true" />
          </span>

          <span className="ticket-face ticket-back">
            <span className="ticket-qr">
              <Image src={qr} alt="QR code that opens waona.ke" fill unoptimized />
            </span>
            <span className="ticket-note">Each ticket scans once. A second scan is turned away.</span>
            <span className="ticket-sheen" aria-hidden="true" />
          </span>
        </span>
      </button>
      <p className="ticket-hint">Tap the ticket to flip it.</p>
    </div>
  );
}
