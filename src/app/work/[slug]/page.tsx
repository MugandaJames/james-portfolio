
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { notFound } from "next/navigation";
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

function ProjectCaseStudyFallback() {
  return (
    <article className="case-study" aria-busy="true">
      <div className="case-study-heading">
        <p className="mono subpage-kicker">LOADING / CASE STUDY</p>
        <h1>Loading project…</h1>
        <p className="case-study-summary">
          Preparing the project details.
        </p>
      </div>
    </article>
  );
}

async function ProjectCaseStudyContent({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="case-study">
      <Link className="back-link mono" href="/work">
        ← ALL PROJECTS
      </Link>

      <div className="case-study-heading">
        <p className="mono subpage-kicker">
          CASE FILE {project.number} / {project.category.toUpperCase()}
        </p>
        <h1>{project.name}</h1>
        <p className="case-study-summary">{project.summary}</p>

        <div className="case-study-meta">
          <div>
            <span className="mono">STATUS</span>
            <p>{project.status}</p>
          </div>
          <div>
            <span className="mono">SOURCE</span>
            <p>
              {project.visibility === "private"
                ? "Private repository"
                : "Repository link provided"}
            </p>
          </div>
        </div>

        {project.repository && (
          <a
            className="contact-cta case-source-link"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source repository <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {(project.slug === "finpay" || project.slug === "nyumba") && (
        <ArchitectureDiagram project={project.slug} />
      )}

      <div className="case-study-grid">
        <aside className="case-study-aside">
          <span className="mono">TECHNOLOGIES</span>
          <ul className="case-stack case-stack-vertical">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <div className="case-study-content">
          <section>
            <p className="mono content-index">01 / OVERVIEW</p>
            <h2>The project</h2>
            <p>{project.overview}</p>
          </section>

          <section>
            <p className="mono content-index">02 / THE PROBLEM</p>
            <h2>What needs to work</h2>
            <p>{project.problem}</p>
          </section>

          <section>
            <p className="mono content-index">03 / APPROACH</p>
            <h2>How it is approached</h2>
            <ul className="case-prose-list">
              {project.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="mono content-index">04 / ENGINEERING NOTES</p>
            <h2>What matters</h2>
            <ul className="case-prose-list">
              {project.engineeringNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="case-limitations">
            <p className="mono content-index">05 / CURRENT SCOPE</p>
            <h2>What this does not claim</h2>
            <p>{project.limitations}</p>
          </section>
        </div>
      </div>
    </article>
  );
}

export default function ProjectCaseStudy({ params }: PageProps) {
  return (
    <main className="subpage">
      <header className="site-header">
        <Link className="wordmark" href="/">
          JJ<span className="wordmark-period">.</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/work">Work</Link>
          <Link href="/writing">Writing</Link>
          <Link href="/#about">About</Link>
        </nav>
        <Link className="header-contact" href="/#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <Suspense fallback={<ProjectCaseStudyFallback />}>
        <ProjectCaseStudyContent params={params} />
      </Suspense>

      <footer className="subpage-footer mono">
        <Link href="/work">← ALL PROJECTS</Link>
        <Link href="/#contact">CONTACT ↗</Link>
      </footer>
    </main>
  );
}
