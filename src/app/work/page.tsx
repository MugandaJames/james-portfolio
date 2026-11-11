import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader, StatusPill } from "@/components/Chrome";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "WAONA products and engineering case studies by James Juma Muganda: identity, ticketing, property technology and payments.",
};

const groups = [
  { title: "WAONA products", key: "WAONA product" as const },
  { title: "Engineering", key: "Engineering" as const },
];

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <section className="container page-hero">
          <p className="eyebrow">Work</p>
          <h1>Products and systems.</h1>
          <p className="lead">
            What I&apos;m building at WAONA, and the engineering projects behind
            how I think about correctness, boundaries and trust.
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.key} className="container work-group">
            <h2 className="work-group-title">{group.title}</h2>
            <div className="work-list">
              {projects
                .filter((project) => project.group === group.key)
                .map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="work-item"
                  >
                    <div className="work-item-main">
                      <div className="work-item-title">
                        <h3>{project.name}</h3>
                        <StatusPill
                          status={project.status}
                          label={project.statusLabel}
                        />
                      </div>
                      <p>{project.summary}</p>
                    </div>
                    <ul className="tags work-item-tags">
                      {project.stack.slice(0, 4).map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <Arrow className="work-item-arrow" />
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
