"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  title: string;
  level: number;
};

function createSlug(value: string): string {
  return (
    value
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

export default function ArticleReadingTools() {
  const [sections, setSections] = useState<Section[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".article-page");
    const prose = document.querySelector<HTMLElement>(".article-prose");

    if (!article || !prose) return;

    const headings = Array.from(
      prose.querySelectorAll<HTMLElement>("h2, h3"),
    );

    const usedIds = new Set<string>();

    const discoveredSections = headings.map((heading) => {
      const title = heading.textContent?.trim() || "Untitled section";
      const baseId = createSlug(title);
      let id = baseId;
      let suffix = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }

      usedIds.add(id);
      heading.id = id;

      return {
        id,
        title,
        level: heading.tagName === "H3" ? 3 : 2,
      };
    });

    let sectionsFrame = 0;
    let progressFrame = 0;

    sectionsFrame = requestAnimationFrame(() => {
      setSections(discoveredSections);
    });

    const updateProgress = () => {
      cancelAnimationFrame(progressFrame);

      progressFrame = requestAnimationFrame(() => {
        const articleTop =
          article.getBoundingClientRect().top + window.scrollY;
        const articleBottom =
          article.getBoundingClientRect().bottom + window.scrollY;
        const scrollableDistance =
          articleBottom - articleTop - window.innerHeight;

        if (scrollableDistance <= 0) {
          setProgress(100);
          return;
        }

        const distanceScrolled = window.scrollY - articleTop;
        const nextProgress = Math.min(
          100,
          Math.max(0, (distanceScrolled / scrollableDistance) * 100),
        );

        setProgress(nextProgress);
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(sectionsFrame);
      cancelAnimationFrame(progressFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div
        className="reading-progress"
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span
          className="reading-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {sections.length > 0 && (
        <nav className="article-toc" aria-label="On this page">
          <p className="article-toc-title mono">IN THIS NOTE</p>
          <ol>
            {sections.map((section) => (
              <li
                key={section.id}
                className={
                  section.level === 3
                    ? "article-toc-subsection"
                    : undefined
                }
              >
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
