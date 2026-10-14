
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

type ArticleModule = {
  default: ComponentType<MDXProps>;
};

export type Article = {
  slug: string;
  number: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  status: "Draft";
  Content: ArticleModule["default"];
};

import MoneyTransfers from "@/content/writing/reliable-money-transfers.mdx";
import StructuredMonolith from "@/content/writing/structured-monolith.mdx";
import ConcurrentRequests from "@/content/writing/concurrent-requests.mdx";

export const articles: Article[] = [
  {
    slug: "reliable-money-transfers",
    number: "001",
    category: "ENGINEERING",
    title: "What makes a money transfer reliable?",
    description:
      "Idempotency, transaction boundaries, and the difference between a successful response and a correct financial operation.",
    date: "2026-10-14",
    readingTime: "6 min read",
    status: "Draft",
    Content: MoneyTransfers,
  },
  {
    slug: "structured-monolith",
    number: "002",
    category: "SYSTEM DESIGN",
    title: "The case for a well-structured monolith",
    description:
      "Why clear module boundaries can be more valuable than introducing distributed complexity too early.",
    date: "2026-10-14",
    readingTime: "5 min read",
    status: "Draft",
    Content: StructuredMonolith,
  },
  {
    slug: "concurrent-requests",
    number: "003",
    category: "DATABASES",
    title: "When two requests arrive at once",
    description:
      "Concurrency, database locking, and the race conditions that happy-path tests can miss.",
    date: "2026-10-14",
    readingTime: "5 min read",
    status: "Draft",
    Content: ConcurrentRequests,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
