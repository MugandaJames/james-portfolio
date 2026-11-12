"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Status } from "@/components/Chrome";
import { hasFinePointer, prefersReducedMotion } from "@/components/motion/device";
import { projects, type Project } from "@/content/projects";
import { APP_BG, galleries } from "@/content/shots";

/** What a project looks like in a preview: its lead screenshot, or its flow. */
function Preview({ project, sizes }: { project: Project; sizes: string }) {
  const shot = galleries[project.slug]?.[0];
  if (shot) {
    return (
      <div className="wi-preview-img" style={{ backgroundColor: shot.bg ?? APP_BG }}>
        <Image src={shot.src} alt="" placeholder="blur" sizes={sizes} />
      </div>
    );
  }
  return (
    <ol className="wi-preview-flow" aria-hidden="true">
      {project.flow.map((step) => (
        <li key={step.title}>{step.title}</li>
      ))}
    </ol>
  );
}

/**
 * Selected work as a portfolio index. With a mouse, a preview of the project
 * under the pointer floats beside it; on touch screens each row shows its
 * own preview inline.
 */
export default function WorkIndex() {
  const list = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = list.current;
    const fl = float.current;
    if (!el || !fl || !hasFinePointer() || prefersReducedMotion()) return;

    const x = gsap.quickTo(fl, "x", { duration: 0.55, ease: "power3" });
    const y = gsap.quickTo(fl, "y", { duration: 0.55, ease: "power3" });
    const rot = gsap.quickTo(fl, "rotate", { duration: 0.8, ease: "power3" });
    let lastX = 0;

    const move = (e: PointerEvent) => {
      x(e.clientX + 28);
      y(e.clientY - 120);
      rot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    const enter = () => gsap.to(fl, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    const leave = () => {
      gsap.to(fl, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: "power3.in" });
      setActive(null);
    };

    gsap.set(fl, { autoAlpha: 0, scale: 0.85 });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="wi" ref={list}>
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={`wi-row${active === i ? " is-active" : ""}${active !== null && active !== i ? " is-dim" : ""}`}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setActive(i);
          }}
          data-cursor="Open"
        >
          <span className="wi-name">{project.name}</span>
          <span className="wi-line">{project.tagline}</span>
          <span className="wi-meta">
            <span>{project.group === "WAONA product" ? "WAONA" : "Engineering"}</span>
            <Status status={project.status} label={project.statusLabel} />
          </span>
          <span className="wi-inline">
            <Preview project={project} sizes="(max-width: 700px) 92vw, 600px" />
          </span>
        </Link>
      ))}

      <div className="wi-float" ref={float} aria-hidden="true">
        {projects.map((project, i) => (
          <div key={project.slug} className={`wi-float-item${active === i ? " is-on" : ""}`}>
            <Preview project={project} sizes="420px" />
          </div>
        ))}
      </div>
    </div>
  );
}
