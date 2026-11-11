import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, Status } from "@/components/Chrome";
import { projects } from "@/content/projects";
import { APP_BG, galleries } from "@/content/shots";

export const metadata: Metadata = {
  title: "Work",
  description:
    "WAONA products and engineering case studies by James Juma Muganda: identity, ticketing, property technology and payments.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <section className="wrap page-hero">
          <h1>Work</h1>
          <p className="page-lede">
            The products I&apos;m building at WAONA, and the engineering projects
            behind how I think about correctness, boundaries and trust.
          </p>
        </section>

        <section className="wrap index" aria-label="All projects">
          {projects.map((project) => {
            const cover = galleries[project.slug]?.[0];
            return (
              <Link key={project.slug} href={`/work/${project.slug}`} className="index-item">
                <div className="index-copy">
                  <p className="index-group">{project.group}</p>
                  <h2>{project.name}</h2>
                  <p className="index-summary">{project.summary}</p>
                  <div className="index-meta">
                    <Status status={project.status} label={project.statusLabel} />
                    <span>{project.stack.slice(0, 4).join(", ")}</span>
                  </div>
                </div>
                <div className="index-visual" style={{ backgroundColor: APP_BG }}>
                  {cover ? (
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      placeholder="blur"
                      sizes="(max-width: 900px) 92vw, 460px"
                      className="index-img"
                    />
                  ) : (
                    <ol className="index-flow" aria-label={`${project.name} flow`}>
                      {project.flow.map((step) => (
                        <li key={step.title}>{step.title}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </Link>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
