
import type { ReactNode } from "react";
import Link from "next/link";
import CopyrightYear from "@/components/CopyrightYear";
import { projects } from "@/content/projects";
import { articles } from "@/content/writing";

const projectVisuals: Record<
  string,
  {
    accent: string;
    shape: string;
    art: "ledger" | "architecture";
    artCaption: string;
    artNodes: string[];
    artFoot: string;
  }
> = {
  finpay: {
    accent: "project-lime",
    shape: "shape-ledger",
    art: "ledger",
    artCaption: "FINPAY / CORE",
    artNodes: ["Validate request", "Enforce invariants", "Commit transaction"],
    artFoot: "MONEY MOVES WITH INTENT",
  },
  nyumba: {
    accent: "project-paper",
    shape: "shape-architecture",
    art: "architecture",
    artCaption: "NYUMBA / ARCHITECTURE",
    artNodes: ["Domain model", "Application rules", "Infrastructure"],
    artFoot: "CLEAR BOUNDARIES",
  },
  "jisave-sacco": {
    accent: "project-lime",
    shape: "shape-architecture",
    art: "architecture",
    artCaption: "JISAVE / API",
    artNodes: ["Authentication", "Business services", "Data persistence"],
    artFoot: "FINANCIAL WORKFLOWS",
  },
  "jisave-sacco-mobile": {
    accent: "project-paper",
    shape: "shape-architecture",
    art: "architecture",
    artCaption: "JISAVE / MOBILE",
    artNodes: ["Member experience", "Authentication", "Firebase services"],
    artFoot: "FINANCE ON MOBILE",
  },
  "whatsapp-music-bot": {
    accent: "project-lime",
    shape: "shape-architecture",
    art: "architecture",
    artCaption: "WHATSAPP / BOT",
    artNodes: ["Receive command", "Process media", "Return response"],
    artFoot: "MESSAGING MEETS AUTOMATION",
  },
  "forex-eurusd-predictor": {
    accent: "project-paper",
    shape: "shape-architecture",
    art: "architecture",
    artCaption: "EUR / USD",
    artNodes: ["Historical data", "Model analysis", "Forecast output"],
    artFoot: "PREDICTIONS REQUIRE EVALUATION",
  },
};

type ProficiencyIconName =
  | "python"
  | "api"
  | "database"
  | "architecture"
  | "infrastructure"
  | "dotnet";

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="arrow-icon"
    >
      <path
        d="M5 15 15 5M6 5h9v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProficiencyIcon({ type }: { type: ProficiencyIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="proficiency-icon-svg"
      {...common}
    >
      {type === "python" && (
        <>
          <path d="M16 4H10a5 5 0 0 0-5 5v5h11a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z" />
          <path d="M16 28h6a5 5 0 0 0 5-5v-5H16a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4Z" />
          <path d="M12 14v4m8-4v4" />
          <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="20" cy="24" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {type === "api" && (
        <>
          <rect x="4" y="5" width="24" height="22" rx="4" />
          <path d="m10 12-3 4 3 4m12-8 3 4-3 4m-4-9-4 10" />
        </>
      )}
      {type === "database" && (
        <>
          <ellipse cx="16" cy="7" rx="10" ry="4" />
          <path d="M6 7v18c0 2.2 4.5 4 10 4s10-1.8 10-4V7" />
          <path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4" />
        </>
      )}
      {type === "architecture" && (
        <>
          <path d="m16 4 12 6-12 6L4 10l12-6Z" />
          <path d="m4 16 12 6 12-6M4 22l12 6 12-6" />
        </>
      )}
      {type === "infrastructure" && (
        <>
          <rect x="4" y="4" width="10" height="10" rx="2" />
          <rect x="18" y="4" width="10" height="10" rx="2" />
          <rect x="11" y="18" width="10" height="10" rx="2" />
          <path d="M14 9h4m-9 5v2a3 3 0 0 0 3 3m9-5v2a3 3 0 0 1-3 3" />
        </>
      )}
      {type === "dotnet" && (
        <>
          <path d="M11 7H7v18h4m10-18h4v18h-4M13 12l6 8m0-8-6 8" />
        </>
      )}
    </svg>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}

function ProjectArtwork({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const visual = projectVisuals[project.slug];

  if (visual.art === "ledger") {
    return (
      <div className="ledger-art">
        <div className="ledger-top mono">
          <span>{visual.artCaption}</span>
          <span className="ledger-indicator">● SYSTEM</span>
        </div>
        <div className="ledger-title">
          Transaction
          <br />
          integrity<span>.</span>
        </div>
        <div className="ledger-lines">
          {visual.artNodes.map((node, index) => (
            <div key={node}>
              <span>0{index + 1}</span>
              <span>{node}</span>
              <span>✓</span>
            </div>
          ))}
        </div>
        <span className="ledger-watermark mono">{visual.artFoot}</span>
      </div>
    );
  }

  return (
    <div className="architecture-art">
      <div className="architecture-caption mono">{visual.artCaption}</div>
      {visual.artNodes.map((node, index) => (
        <div key={node}>
          <div
            className={`architecture-node ${
              ["node-domain", "node-application", "node-infrastructure"][index]
            }`}
          >
            <span className="node-dot" />
            {node}
            <span>0{index + 1}</span>
          </div>
          {index < visual.artNodes.length - 1 && (
            <div className="architecture-connector" />
          )}
        </div>
      ))}
      <div className="architecture-caption architecture-foot mono">
        {visual.artFoot}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="James Juma home">
          JJ<span className="wordmark-period">.</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/work">Work</Link>
          <Link href="/writing">Writing</Link>
          <Link href="#about">About</Link>
        </nav>

        <Link className="header-contact" href="#contact">
          <span className="availability-dot" />
          <span>Let&apos;s talk</span>
          <ArrowUpRight />
        </Link>
      </header>

      <main>
        <section className="hero page-grid" id="home">
          <div className="hero-index mono">
            <span>BACKEND ENGINEERING</span>
            <span>NAIROBI, KE</span>
          </div>

          <div className="hero-main">
            <p className="eyebrow">
              BACKEND ENGINEERING <span>/</span> SYSTEM DESIGN
            </p>

            <h1>
              Software
              <br />
              should make
              <br />
              <span className="headline-accent">sense.</span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-description">
                I&apos;m James Juma Muganda, a computer science student and
                software engineer in the making. I build software with an
                emphasis on sound architecture, data integrity, and the details
                that make systems dependable.
              </p>

              <Link className="text-link" href="/work">
                <span>Explore selected work</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>

          <aside className="hero-side" aria-label="Engineering principles">
            <div className="side-rule" />
            <span className="side-index mono">A NOTE ON MY WORK</span>
            <p>
              Understand the problem.
              <br />
              Respect the constraints.
              <br />
              Make the system hold up.
            </p>
            <span className="side-foot mono">THOUGHTFUL BY DESIGN.</span>
          </aside>

          <div className="hero-bottom-line">
            <span className="mono">PORTFOLIO / 2026</span>
            <span className="scroll-cue">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </span>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <SectionLabel number="01">SELECTED WORK</SectionLabel>
            <p className="section-intro">
              A growing collection of systems and experiments across backend
              engineering, financial applications, mobile development,
              automation, and machine learning.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              const visual = projectVisuals[project.slug];

              return (
                <article
                  className={`project-card ${visual.accent}`}
                  key={project.slug}
                >
                  <div className="project-topline mono">
                    <span>{project.number} / CASE FILE</span>
                    <span>{project.category.toUpperCase()}</span>
                  </div>

                  <div className="project-body">
                    <div className="project-copy">
                      <p className="project-category">
                        {project.category.toUpperCase()}
                      </p>
                      <h3>{project.name}</h3>
                      <p className="project-description">{project.summary}</p>

                      <ul
                        className="stack-list"
                        aria-label={`${project.name} technology stack`}
                      >
                        {project.stack.map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>

                      <Link
                        className="project-link"
                        href={`/work/${project.slug}`}
                      >
                        <span>Explore case study</span>
                        <ArrowUpRight />
                      </Link>

                      {project.repository &&
                        project.visibility === "public" && (
                          <a
                            className="text-link"
                            href={project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>View source code</span>
                            <ArrowUpRight />
                          </a>
                        )}

                      {project.visibility === "private" && (
                        <p className="project-description">
                          Private repository · In development
                        </p>
                      )}

                      {project.slug === "forex-eurusd-predictor" && (
                        <p className="project-description">
                          Educational project. Forecasts are uncertain and
                          should not be treated as financial advice.
                        </p>
                      )}
                    </div>

                    <div
                      className={`project-art ${visual.shape}`}
                      aria-hidden="true"
                    >
                      <ProjectArtwork project={project} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="work-foot mono">
            <span>MORE EXPERIMENTS AND CODE</span>
            <Link href="/work">
              ALL CASE STUDIES <ArrowUpRight />
            </Link>
          </div>
          <div className="work-foot mono">
            <span>PUBLIC REPOSITORIES AND CODE</span>
            <a
              href="https://github.com/MugandaJames"
              target="_blank"
              rel="noopener noreferrer"
            >
              EXPLORE GITHUB <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="writing-section section-wrap" id="writing">
          <div className="section-heading">
            <SectionLabel number="02">THE ENGINEERING JOURNAL</SectionLabel>
            <p className="section-intro">
              Notes on how systems work, where they fail, and what it takes to
              build them well.
            </p>
          </div>

          <div className="writing-layout">
            <div className="writing-aside">
              <span className="journal-mark">
                J<span>.</span>
              </span>
              <p>
                Less noise.
                <br />
                More understanding.
              </p>
              <span className="mono writing-aside-note">
                FIELD NOTES / VOL. 01
              </span>
            </div>

            <div className="article-list">
              {articles.map((article) => (
                <article className="article-row" key={article.slug}>
                  <div className="article-meta mono">
                    <span>{article.number}</span>
                    <span>{article.category}</span>
                  </div>

                  <div className="article-content">
                    <h3>
                      <Link href={`/writing/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p>{article.description}</p>
                    <Link
                      className="text-link"
                      href={`/writing/${article.slug}`}
                    >
                      <span>Open article</span>
                      <ArrowUpRight />
                    </Link>
                  </div>

                  <span className="article-status mono">
                    {article.status.toUpperCase()}
                  </span>
                </article>
              ))}

              <p className="journal-note">
                These articles are currently drafts. They are labelled as such
                while the technical notes and explanations are being refined.
              </p>

              <div className="work-foot mono">
                <span>MORE TECHNICAL NOTES</span>
                <Link href="/writing">
                  VISIT THE JOURNAL <ArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="section-heading">
            <SectionLabel number="03">A LITTLE CONTEXT</SectionLabel>
          </div>

          <div className="about-layout">
            <div className="about-intro">
              <h2>
                Curious about
                <br />
                <span>what&apos;s underneath.</span>
              </h2>

              <div className="about-identity">
                <span className="mono">ENGINEERING × WRITING</span>
                <p>I build to understand systems. I write to understand ideas.</p>
              </div>
            </div>

            <div className="about-copy">
              <p>
                I&apos;m James Juma Muganda — a backend engineer, system
                designer, and aspiring writer fascinated by the things that
                shape systems, ideas, and people.
              </p>

              <p>
                In engineering, I&apos;m drawn to what happens beneath the
                interface: how architectures take shape, how data moves, how
                components interact, and how thoughtful design makes software
                reliable and understandable. I explore these questions through
                backend development, system design, and projects like FinPay
                and Nyumba.
              </p>

              <p>
                Writing gives that curiosity another direction. I&apos;m drawn
                to creative writing and psychological stories that explore
                human nature, inner conflict, perception, and the thoughts
                people rarely express. I&apos;m interested in what drives
                people, what they conceal, and how their inner worlds shape
                the stories they tell.
              </p>

              <p>
                Whether I&apos;m studying a software system or developing a
                story, I&apos;m interested in looking beyond what is
                immediately visible — and understanding what lies beneath.
              </p>

              <div className="about-education">
                <span className="mono">CURRENTLY</span>
                <p>
                  BSc Computer Science
                  <br />
                  Catholic University of Eastern Africa · Expected 2027
                </p>
              </div>

              <a
                className="text-link"
                href="https://github.com/MugandaJames"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Explore my engineering work on GitHub</span>
                <ArrowUpRight />
              </a>
              <Link className="text-link" href="/writing">
                <span>Read my writing</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>

          <div className="about-proficiency">
            <div className="about-block-heading">
              <div>
                <span className="mono">01 / PROFICIENCIES</span>
                <h3>Tools I work with.</h3>
              </div>
              <p>My current self-assessed levels.</p>
            </div>

            <div className="proficiency-list">
              <div className="proficiency-row">
                <span className="proficiency-index mono">01</span>
                <span className="proficiency-icon">
                  <ProficiencyIcon type="python" />
                </span>
                <span className="proficiency-name">Python</span>
                <span className="proficiency-level">Core</span>
              </div>

              <div className="proficiency-row">
                <span className="proficiency-index mono">02</span>
                <span className="proficiency-icon">
                  <ProficiencyIcon type="api" />
                </span>
                <span className="proficiency-name">FastAPI / Backend APIs</span>
                <span className="proficiency-level">Core</span>
              </div>

              <div className="proficiency-row">
                <span className="proficiency-index mono">03</span>
                <span className="proficiency-icon">
                  <ProficiencyIcon type="database" />
                </span>
                <span className="proficiency-name">
                  PostgreSQL / SQLAlchemy
                </span>
                <span className="proficiency-level">Core</span>
              </div>

              <div className="proficiency-row">
                <span className="proficiency-index mono">04</span>
                <span className="proficiency-icon">
                  <ProficiencyIcon type="architecture" />
                </span>
                <span className="proficiency-name">
                  System Design / Architecture
                </span>
                <span className="proficiency-level">Core</span>
              </div>

              <div className="proficiency-row">
                <span className="proficiency-index mono">05</span>
                <span className="proficiency-icon">
                  <ProficiencyIcon type="infrastructure" />
                </span>
                <span className="proficiency-name">Docker / Kubernetes</span>
                <span className="proficiency-level">Core</span>
              </div>

              <div className="proficiency-row">
                <span className="proficiency-index mono">06</span>
                <span className="proficiency-icon">
                  <ProficiencyIcon type="dotnet" />
                </span>
                <span className="proficiency-name">C# / .NET</span>
                <span className="proficiency-level proficiency-level-muted">
                  Working
                </span>
              </div>
            </div>
          </div>

          <div className="about-technical">
            <div className="about-block-heading">
              <div>
                <span className="mono">02 / TECHNICAL PROFILE</span>
                <h3>The wider picture.</h3>
              </div>
              <p>Technologies and areas I explore.</p>
            </div>

            <div className="technical-profile-grid">
              <div className="technical-profile-item">
                <span className="mono">BACKEND & APIS</span>
                <p>Python · FastAPI · Flask · Django · REST APIs</p>
              </div>
              <div className="technical-profile-item">
                <span className="mono">DATA & PERSISTENCE</span>
                <p>SQL · PostgreSQL · SQLAlchemy · Redis</p>
              </div>
              <div className="technical-profile-item">
                <span className="mono">MESSAGING & DISTRIBUTED SYSTEMS</span>
                <p>RabbitMQ · Kafka · Distributed systems</p>
              </div>
              <div className="technical-profile-item">
                <span className="mono">INFRASTRUCTURE</span>
                <p>Docker · Kubernetes · Cloud-native engineering</p>
              </div>
              <div className="technical-profile-item">
                <span className="mono">ARCHITECTURE</span>
                <p>
                  System design · APIs and microservices · Data-intensive
                  systems
                </p>
              </div>
              <div className="technical-profile-item">
                <span className="mono">OTHER INTERESTS</span>
                <p>AI / ML · Technical exploration · Creative writing</p>
              </div>
            </div>
          </div>

          <div className="principles-grid">
            <div>
              <span className="principle-number mono">01</span>
              <h3>Correctness first</h3>
              <p>
                Make invalid states difficult to represent and easy to catch.
              </p>
            </div>
            <div>
              <span className="principle-number mono">02</span>
              <h3>Clear boundaries</h3>
              <p>
                Give each component a reason to exist and a job to do.
              </p>
            </div>
            <div>
              <span className="principle-number mono">03</span>
              <h3>Evidence over claims</h3>
              <p>
                Use tests, documentation, and real results to demonstrate
                quality.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <SectionLabel number="04">OPEN CHANNEL</SectionLabel>

          <div className="contact-layout">
            <h2>
              Have a good
              <br />
              <span>problem to solve?</span>
            </h2>

            <div className="contact-copy">
              <p>
                I&apos;m interested in engineering opportunities, thoughtful
                collaborations, and conversations about building better
                software.
              </p>

              <a
                className="contact-cta"
                href="mailto:mugandajames403@gmail.com"
              >
                <span>Email me</span>
                <ArrowUpRight />
              </a>

              <a
                className="text-link"
                href="https://www.linkedin.com/in/james-juma-391a65332/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight />
              </a>

              <a
                className="text-link"
                href="https://github.com/MugandaJames"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Find me on GitHub</span>
                <ArrowUpRight />
              </a>

              <p className="contact-note mono">mugandajames403@gmail.com</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Link className="wordmark footer-wordmark" href="#home">
          JJ<span className="wordmark-period">.</span>
        </Link>
        <span className="footer-note mono">
          DESIGNED WITH INTENTION. BUILT WITH CARE.
        </span>
        <Link className="back-to-top mono" href="#home">
          BACK TO TOP ↑
        </Link>
        <span className="copyright mono">
          © <CopyrightYear /> JAMES JUMA MUGANDA
        </span>
      </footer>
    </>
  );
}
