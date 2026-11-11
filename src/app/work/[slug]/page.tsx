import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader, Status } from "@/components/Chrome";
import { getProject, projects } from "@/content/projects";
import { APP_BG, galleries } from "@/content/shots";

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
      title: `${project.name} by James Juma Muganda`,
      description: project.summary,
      type: "article",
    },
  };
}

async function CaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const gallery = galleries[project.slug] ?? [];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="case">
      <header className="wrap case-hero">
        <Link href="/work" className="back">
          All work
        </Link>
        <Status status={project.status} label={project.statusLabel} />
        <h1>{project.name}</h1>
        <p className="case-lede">{project.tagline}</p>

        <dl className="facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          {project.links && (
            <div>
              <dt>Visit</dt>
              <dd>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {link.label}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </header>

      {gallery.length > 0 && (
        <section className="wrap gallery" aria-label={`${project.name} screens`}>
          {gallery.map((shot, i) => {
            const portrait = shot.src.height > shot.src.width;
            return (
              <figure
                key={shot.alt}
                className={`gallery-item${portrait ? " is-portrait" : ""}${i === 0 && !portrait ? " is-lead" : ""}`}
                style={{ backgroundColor: shot.bg ?? APP_BG }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  placeholder="blur"
                  priority={i === 0}
                  sizes={portrait ? "(max-width: 900px) 46vw, 300px" : "(max-width: 900px) 92vw, 1100px"}
                  className="gallery-img"
                />
                <figcaption>{shot.alt}</figcaption>
              </figure>
            );
          })}
        </section>
      )}

      <section className="wrap flow" aria-label="How it works">
        <ol>
          {project.flow.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="wrap case-body">
        <section>
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>
        <section>
          <h2>The problem</h2>
          <p>{project.problem}</p>
        </section>
        <section>
          <h2>How I approached it</h2>
          <ul className="approach">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>What I hold to</h2>
          <div className="beliefs">
            {project.notes.map((note) => (
              <blockquote key={note}>{note}</blockquote>
            ))}
          </div>
        </section>
        <section className="standing">
          <h2>Where it stands</h2>
          <p>{project.limitations}</p>
        </section>
      </div>

      <div className="wrap">
        <Link href={`/work/${next.slug}`} className="next">
          <span className="next-label">Next project</span>
          <span className="next-name">{next.name}</span>
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
        <Suspense fallback={<div className="wrap case-hero" aria-busy="true" />}>
          <CaseStudy params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
