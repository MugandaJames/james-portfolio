"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Phone } from "@/components/Frames";
import { APP_BG, ticketJourney } from "@/content/shots";

/**
 * The WAONA Tickets journey. On wide screens the phone stays pinned while the
 * steps scroll past, and its screen changes to match the step in the middle of
 * the viewport. On narrow screens every step simply shows its own phone.
 */
export default function Walkthrough() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="walk">
      <ol className="walk-steps">
        {ticketJourney.map((step, i) => (
          <li
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-step={i}
            className={`walk-step${i === active ? " is-active" : ""}`}
            aria-current={i === active ? "step" : undefined}
          >
            <span className="walk-count" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <Phone shot={step.shot} className="walk-inline-phone" sizes="280px" />
          </li>
        ))}
      </ol>

      <div className="walk-stage" aria-hidden="true">
        <div className="walk-sticky">
          <div className="phone walk-phone">
            <div className="phone-screen" style={{ backgroundColor: APP_BG }}>
              {ticketJourney.map((step, i) => (
                <div
                  key={step.title}
                  className={`walk-screen${i === active ? " is-active" : ""}`}
                  style={{ backgroundColor: step.shot.bg ?? APP_BG }}
                >
                  <Image
                    src={step.shot.src}
                    alt=""
                    placeholder="blur"
                    sizes="340px"
                    className="phone-img"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="walk-progress">
            {ticketJourney.map((step, i) => (
              <span key={step.title} className={i <= active ? "is-on" : ""} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
