import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, SiteFooter, SiteHeader, StatusPill } from "@/components/Chrome";
import { getProject, projects } from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — James Juma Muganda`,
      description: project.summary,
      type: "article",
    },
  };
}

async function CaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="case">
      <header className="container case-hero">
        <Link href="/work" className="back">
          ← All work
        </Link>
        <div className="case-meta-top">
          <span className="eyebrow">{project.group}</span>
          <StatusPill status={project.status} label={project.statusLabel} />
        </div>
        <h1>{project.name}</h1>
        <p className="lead">{project.tagline}</p>

        <dl className="facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          {project.links && (
            <div>
              <dt>Links</dt>
              <dd>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    {link.label} <Arrow />
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </header>

      <section className="container flow" aria-label="How it works">
        {project.flow.map((step, i) => (
          <div key={step.title} className="flow-step">
            <span className="flow-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </div>
        ))}
      </section>

      <div className="container case-body">
        <section>
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>
        <section>
          <h2>The problem</h2>
          <p>{project.problem}</p>
        </section>
        <section>
          <h2>Approach</h2>
          <ul className="checklist">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>What I hold to</h2>
          <div className="notes">
            {project.notes.map((note) => (
              <blockquote key={note}>{note}</blockquote>
            ))}
          </div>
        </section>
        <section className="status-note">
          <h2>Where it stands</h2>
          <p>{project.limitations}</p>
        </section>
      </div>

      <div className="container">
        <Link href={`/work/${next.slug}`} className="next">
          <span className="eyebrow">Next</span>
          <span className="next-name">
            {next.name} <Arrow />
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <Suspense fallback={<div className="container case-hero" aria-busy="true" />}>
          <CaseStudy params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
