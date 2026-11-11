import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader, StatusPill } from "@/components/Chrome";
import { projects } from "@/content/projects";
import { capabilities, principles, site } from "@/content/site";

const products = projects.filter((p) => p.group === "WAONA product");
const engineering = projects.filter((p) => p.group === "Engineering");

function Console() {
  return (
    <div className="console" aria-label="What I'm building right now">
      <div className="console-bar">
        <span className="console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="console-title">waona / products</span>
      </div>
      <div className="console-body">
        <p className="console-line console-cmd">
          <span className="prompt">$</span> waona status
        </p>
        {products.map((product, index) => (
          <Link
            key={product.slug}
            href={`/work/${product.slug}`}
            className="console-row"
            style={{ animationDelay: `${0.35 + index * 0.18}s` }}
          >
            <span className="console-name">{product.name}</span>
            <StatusPill status={product.status} label={product.statusLabel} />
          </Link>
        ))}
        <p className="console-line console-muted" style={{ animationDelay: "1s" }}>
          <span className="prompt">→</span> founder, engineer, still shipping
          <span className="caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

function ProductCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link href={`/work/${project.slug}`} className="card">
      <div className="card-top">
        <StatusPill status={project.status} label={project.statusLabel} />
        <Arrow className="card-arrow" />
      </div>
      <h3>{project.name}</h3>
      <p className="card-tagline">{project.tagline}</p>
      <ul className="tags" aria-label={`${project.name} stack`}>
        {project.stack.slice(0, 4).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="kicker">
                <span className="kicker-dot" aria-hidden="true" />
                {site.role}
              </p>
              <h1>
                I build the technology
                <br />
                behind <span className="grad">WAONA.</span>
              </h1>
              <p className="lead">
                I&apos;m James Juma Muganda, a founder and software engineer in
                Nairobi. I design and build products people can trust — identity,
                ticketing and property platforms made for the Kenyan market.
              </p>
              <div className="hero-actions">
                <Link href="/work" className="btn btn--primary">
                  See my work <Arrow />
                </Link>
                <Link href="/#contact" className="btn btn--ghost">
                  Get in touch
                </Link>
              </div>
            </div>
            <Console />
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">Products</p>
              <h2>What I&apos;m building at WAONA</h2>
              <p className="section-sub">
                WAONA is the technology company I founded. I lead the product
                and write a lot of the code.
              </p>
            </header>
            <div className="cards">
              {products.map((project) => (
                <ProductCard key={project.slug} project={project} />
              ))}
            </div>

            <header className="section-head section-head--tight">
              <p className="eyebrow">Engineering</p>
              <h2>Systems I&apos;ve designed</h2>
            </header>
            <div className="rows">
              {engineering.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="row"
                >
                  <span className="row-name">{project.name}</span>
                  <span className="row-tagline">{project.tagline}</span>
                  <span className="row-stack">
                    {project.stack.slice(0, 3).join(" · ")}
                  </span>
                  <Arrow className="row-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">Capabilities</p>
              <h2>What I bring to a product</h2>
            </header>
            <div className="caps">
              {capabilities.map((cap) => (
                <div key={cap.title} className="cap">
                  <h3>{cap.title}</h3>
                  <p>{cap.body}</p>
                  <ul className="tags">
                    {cap.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about">
            <div>
              <p className="eyebrow">About</p>
              <h2>
                Founder by choice.
                <br />
                <span className="dim">Engineer by habit.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p>
                I started WAONA in 2026 to build technology that moves
                businesses forward — our own products, and custom solutions for
                the businesses we work with. As founder and CEO I set the
                direction, and as an engineer I&apos;m in the code every day.
              </p>
              <p>
                My work sits where trust matters most: authentication, payments
                and the data that people and businesses depend on. I care about
                what happens under the interface — how data moves, where systems
                fail, and what it takes to make them hold up.
              </p>
              <ul className="principles">
                {principles.map((principle) => (
                  <li key={principle.title}>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact-inner">
            <p className="eyebrow">Contact</p>
            <h2>Have something worth building?</h2>
            <p className="section-sub">
              Partnerships, product work or just a good conversation about
              systems — my inbox is open.
            </p>
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email} <Arrow />
            </a>
            <ul className="contact-links">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label} <Arrow />
                  </a>
                </li>
              ))}
              <li>
                <a href={site.company.href} target="_blank" rel="noopener noreferrer">
                  waona.ke <Arrow />
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
