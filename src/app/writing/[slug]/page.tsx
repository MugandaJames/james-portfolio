import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleReadingTools from "@/components/ArticleReadingTools";
import { articles, getArticle } from "@/content/writing";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
    },
  };
}

function ArticlePageFallback() {
  return (
    <article className="article-page" aria-busy="true">
      <header className="article-page-header">
        <p className="mono subpage-kicker">LOADING / JOURNAL</p>
        <h1>Loading article…</h1>
        <p className="article-deck">Preparing the article content.</p>
      </header>
    </article>
  );
}

async function ArticlePageContent({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const Content = article.Content;
  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const previousArticle = articleIndex > 0 ? articles[articleIndex - 1] : undefined;
  const nextArticle =
    articleIndex < articles.length - 1
      ? articles[articleIndex + 1]
      : undefined;

  return (
    <article className="article-page">
      <ArticleReadingTools />

      <Link className="back-link mono" href="/writing">
        ← ALL NOTES
      </Link>

      <header className="article-page-header">
        <p className="mono subpage-kicker">
          {article.number} / {article.category}
        </p>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.description}</p>
        <div className="article-page-meta mono">
          <span>{article.readingTime}</span>
          <span>DRAFT / NOT YET PUBLISHED</span>
        </div>
      </header>

      <div className="article-draft-notice">
        This is a working draft. Review the technical details and wording
        before publishing it under your name.
      </div>

      <div className="article-prose">
        <Content />
      </div>

      <nav className="article-pagination" aria-label="Article navigation">
        {previousArticle ? (
          <Link
            className="article-pagination-link article-pagination-previous"
            href={`/writing/${previousArticle.slug}`}
          >
            <span className="article-pagination-label mono">
              ← PREVIOUS NOTE
            </span>
            <span className="article-pagination-title">
              {previousArticle.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {nextArticle ? (
          <Link
            className="article-pagination-link article-pagination-next"
            href={`/writing/${nextArticle.slug}`}
          >
            <span className="article-pagination-label mono">
              NEXT NOTE →
            </span>
            <span className="article-pagination-title">
              {nextArticle.title}
            </span>
          </Link>
        ) : (
          <Link
            className="article-pagination-link article-pagination-next"
            href="/writing"
          >
            <span className="article-pagination-label mono">
              EXPLORE THE JOURNAL →
            </span>
            <span className="article-pagination-title">All notes</span>
          </Link>
        )}
      </nav>

      <div className="article-end">
        <span className="mono">END OF NOTE / {article.number}</span>
        <Link className="case-link" href="/writing">
          Back to the journal <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default function ArticlePage({ params }: PageProps) {
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

      <Suspense fallback={<ArticlePageFallback />}>
        <ArticlePageContent params={params} />
      </Suspense>

      <footer className="subpage-footer mono">
        <Link href="/writing">← ALL NOTES</Link>
        <Link href="/#contact">CONTACT ↗</Link>
      </footer>
    </main>
  );
}