
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="case-card">
      <div className="case-card-top mono">
        <span>{project.number} / CASE FILE</span>
        <span>{project.category}</span>
      </div>

      <div className="case-card-main">
        <div>
          <p className="case-eyebrow">{project.status}</p>
          <h2>{project.name}</h2>
          <p className="case-summary">{project.summary}</p>

          <ul className="case-stack" aria-label="Technology stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link className="case-link" href={`/work/${project.slug}`}>
            Read case study <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="case-visual" aria-hidden="true">
          <span className="case-visual-index mono">{project.number}</span>
          <div className="case-visual-rule" />
          <p>{project.name}</p>
          <span className="case-visual-category mono">
            {project.category.toUpperCase()}
          </span>
          <div className="case-visual-nodes">
            {project.stack.slice(0, 3).map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
