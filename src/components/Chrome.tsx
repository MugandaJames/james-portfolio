import Link from "next/link";
import CopyrightYear from "@/components/CopyrightYear";
import MobileMenu from "@/components/MobileMenu";
import { site } from "@/content/site";
import type { ProjectStatus } from "@/content/projects";

export function Status({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span className={`status status--${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {label}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link className="signature" href="/" aria-label="James Juma Muganda, home">
          James Muganda
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/work">Work</Link>
          <Link href="/#about">About</Link>
          <a href={`mailto:${site.email}`} className="nav-mail">
            Email me
          </a>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}

export function SiteFooter({ big = false }: { big?: boolean }) {
  return (
    <footer className="footer">
      {big && (
        <p className="footer-mark" aria-hidden="true">
          Muganda
        </p>
      )}
      <div className="wrap footer-inner">
        <p>
          © <CopyrightYear /> {site.name}, Nairobi
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
