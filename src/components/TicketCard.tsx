"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import qr from "@/assets/waona-qr.svg";
import { haptic, hasFinePointer, onDeviceTilt, prefersReducedMotion } from "@/components/motion/device";

/**
 * A WAONA ticket you can play with: it leans toward the pointer with a moving
 * sheen, and flips to its QR side when pressed. The QR opens waona.ke.
 */
export default function TicketCard() {
  const card = useRef<HTMLButtonElement>(null);
  const [flipped, setFlipped] = useState(false);

  const dragged = useRef(false);

  useEffect(() => {
    const el = card.current;
    if (!el || prefersReducedMotion()) return;

    const rx = gsap.quickTo(el, "--rx", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(el, "--ry", { duration: 0.5, ease: "power3" });
    const gx = gsap.quickTo(el, "--gx", { duration: 0.3, ease: "power2" });
    const gy = gsap.quickTo(el, "--gy", { duration: 0.3, ease: "power2" });

    const lean = (nx: number, ny: number) => {
      ry((nx - 0.5) * 28);
      rx(-(ny - 0.5) * 22);
      gx(nx * 100);
      gy(ny * 100);
    };
    const reset = () => {
      rx(0);
      ry(0);
      gx(50);
      gy(30);
    };
    const fromEvent = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      lean((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    };

    // Mouse: lean on hover.
    const hover = (e: PointerEvent) => {
      if (e.pointerType === "mouse") fromEvent(e);
    };

    // Touch: press and drag to tilt; a press that barely moves is a tap (flip).
    let start: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      start = { x: e.clientX, y: e.clientY };
      dragged.current = false;
      el.setPointerCapture(e.pointerId);
      fromEvent(e);
    };
    const move = (e: PointerEvent) => {
      if (!start || e.pointerType === "mouse") return;
      if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8) dragged.current = true;
      fromEvent(e);
    };
    const up = () => {
      start = null;
      reset();
    };

    el.addEventListener("pointermove", hover);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    // Phones: the ticket also catches the light as the phone tilts.
    const stopTilt = hasFinePointer() ? () => {} : onDeviceTilt((x, y) => {
      if (!start) lean(0.5 + x * 0.5, 0.5 + y * 0.5);
    });

    return () => {
      el.removeEventListener("pointermove", hover);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      stopTilt();
    };
  }, []);

  function flip() {
    // A drag on touch tilts the ticket; only a tap flips it.
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    haptic(flipped ? 10 : [10, 40, 18]);
    setFlipped((f) => !f);
  }

  return (
    <div className="ticket-wrap">
      <button
        ref={card}
        type="button"
        className={`ticket${flipped ? " is-flipped" : ""}`}
        onClick={flip}
        aria-pressed={flipped}
        aria-label={flipped ? "Show the front of the ticket" : "Flip the ticket to see its QR code"}
        style={{ touchAction: "pan-y" }}
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
      <p className="ticket-hint">Drag to tilt it. Tap to flip it.</p>
    </div>
  );
}
