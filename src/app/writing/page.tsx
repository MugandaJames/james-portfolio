
import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/writing";

export const metadata: Metadata = {
  title: "Engineering Journal",
  description:
    "Technical notes on backend engineering, system design, data integrity, and dependable software.",
};

export default function WritingPage() {
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

      <section className="subpage-hero writing-hero">
        <p className="mono subpage-kicker">FIELD NOTES / ENGINEERING JOURNAL</p>
        <h1>
          Think clearly.
          <br />
          <em>Build carefully.</em>
        </h1>
        <p>
          Notes on backend engineering, system design, databases, and the
          practical decisions behind software that needs to work.
        </p>
        <span className="mono subpage-count">
          {String(articles.length).padStart(2, "0")} NOTES / DRAFTS IN PROGRESS
        </span>
      </section>

      <section className="journal-index" aria-label="Journal articles">
        {articles.map((article) => (
          <article className="journal-index-row" key={article.slug}>
            <div className="journal-index-meta mono">
              <span>{article.number}</span>
              <span>{article.category}</span>
              <span>{article.readingTime}</span>
            </div>
            <div className="journal-index-copy">
              <p className="draft-label mono">DRAFT / NOT YET PUBLISHED</p>
              <h2>
                <Link href={`/writing/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.description}</p>
              <Link
                className="case-link"
                href={`/writing/${article.slug}`}
              >
                Read draft <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <footer className="subpage-footer mono">
        <Link href="/">← BACK TO HOME</Link>
        <Link href="/#contact">CONTACT ↗</Link>
      </footer>
    </main>
  );
}
