
import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Project case studies exploring backend engineering, financial systems, property technology, mobile development, and automation.",
};

export default function WorkPage() {
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

      <section className="subpage-hero">
        <p className="mono subpage-kicker">PORTFOLIO / SELECTED WORK</p>
        <h1>
          Built to
          <br />
          <em>understand.</em>
        </h1>
        <p>
          A collection of software projects, technical experiments, and
          engineering decisions. Each case study focuses on the problem,
          approach, and lessons—not just the tools used.
        </p>
        <span className="mono subpage-count">
          {String(projects.length).padStart(2, "0")} PROJECTS / 2026
        </span>
      </section>

      <section className="case-index" aria-label="Project case studies">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <footer className="subpage-footer mono">
        <Link href="/">← BACK TO HOME</Link>
        <Link href="/#contact">CONTACT ↗</Link>
      </footer>
    </main>
  );
}
