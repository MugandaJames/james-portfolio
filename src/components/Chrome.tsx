import Link from "next/link";
import CopyrightYear from "@/components/CopyrightYear";
import { site } from "@/content/site";
import type { ProjectStatus } from "@/content/projects";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={`arrow ${className}`}
    >
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatusPill({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span className={`pill pill--${status}`}>
      <span className="pill-dot" aria-hidden="true" />
      {label}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="mark" href="/" aria-label="James Muganda, home">
          <span className="mark-glyph" aria-hidden="true">
            JM
          </span>
          <span className="mark-name">James Muganda</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact" className="nav-cta">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © <CopyrightYear /> {site.name}
        </p>
        <ul className="footer-links">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
