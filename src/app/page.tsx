import Link from "next/link";
import { Browser, Phone } from "@/components/Frames";
import { SiteFooter, SiteHeader, Status } from "@/components/Chrome";
import Walkthrough from "@/components/Walkthrough";
import { getProject, projects } from "@/content/projects";
import { shots } from "@/content/shots";
import { capabilities, principles, site } from "@/content/site";

const tickets = getProject("waona-tickets")!;
const identity = getProject("waona-identity")!;
const nyumba = getProject("pata-nyumba")!;
const engineering = projects.filter((p) => p.group === "Engineering");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1 className="hero-name">
                James Juma
                <br />
                Muganda
              </h1>
              <p className="hero-lead">
                I founded WAONA, and I build its products: sign-in for
                developers, tickets for events across Kenya, and a better way to
                find a home.
              </p>
              <div className="hero-actions">
                <Link href="#tickets" className="btn btn--solid">
                  See the products
                </Link>
                <a href={`mailto:${site.email}`} className="btn btn--line">
                  Email me
                </a>
              </div>
            </div>

            <div className="hero-stage">
              <Browser
                shot={shots.tickets.discoverDesktop}
                priority
                className="hero-browser"
                address="WAONA Tickets"
              />
              <Phone shot={shots.tickets.ticket} priority className="hero-phone" sizes="200px" />
            </div>
          </div>

          <div className="wrap now">
            <p>
              WAONA Identity <Status status="live" label="Live" />
            </p>
            <p>
              WAONA Tickets <Status status="soon" label="Launching soon" />
            </p>
            <p>
              Pata Nyumba <Status status="design" label="In design" />
            </p>
          </div>
        </section>

        {/* WAONA Tickets */}
        <section className="product" id="tickets">
          <div className="wrap">
            <header className="product-head">
              <Status status={tickets.status} label={tickets.statusLabel} />
              <h2>WAONA Tickets</h2>
              <p className="product-lede">
                Find an event, pay with M-Pesa, and walk in with your phone. I
                designed the product and built both the FastAPI backend and the
                Next.js app.
              </p>
            </header>

            <Walkthrough />

            <div className="organizers">
              <div className="organizers-copy">
                <h3>Organizers run everything from Studio</h3>
                <p>
                  Drafts, publishing, bookings, earnings, team access and
                  check-in, in one place. Organizers get a public profile people
                  can follow, plus promo codes and live sales.
                </p>
                <Link href="/work/waona-tickets" className="text-link">
                  Read the WAONA Tickets case study
                </Link>
              </div>
              <Browser
                shot={shots.tickets.studio}
                className="organizers-browser"
                address="WAONA Tickets Studio"
              />
            </div>
          </div>
        </section>

        {/* WAONA Identity */}
        <section className="product product--identity" id="identity">
          <div className="wrap identity-grid">
            <header className="product-head">
              <Status status={identity.status} label={identity.statusLabel} />
              <h2>WAONA Identity</h2>
              <p className="product-lede">
                Secure sign-in and registration that developers add to their own
                apps, so nobody has to build password storage and sessions from
                scratch again.
              </p>
              <ul className="identity-points">
                <li>Built on Keycloak, speaking OpenID Connect and OAuth 2.0.</li>
                <li>
                  Apps send people to one secure sign-in page and get them
                  straight back, signed in.
                </li>
                <li>A Python SDK, MIT licensed, for verifying users in a few lines.</li>
                <li>Already powering sign-in for WAONA Tickets.</li>
              </ul>
              <Link href="/work/waona-identity" className="text-link">
                Read the WAONA Identity case study
              </Link>
            </header>

            <div className="identity-stage">
              <Browser
                shot={shots.identity.handoff}
                className="identity-handoff"
                address="WAONA Tickets"
                sizes="(max-width: 900px) 80vw, 460px"
              />
              <Browser
                shot={shots.identity.signIn}
                className="identity-signin"
                address="WAONA Identity"
                sizes="(max-width: 900px) 80vw, 420px"
              />
            </div>
          </div>
        </section>

        {/* Pata Nyumba + engineering */}
        <section className="more">
          <div className="wrap">
            <Link href="/work/pata-nyumba" className="nyumba">
              <div>
                <Status status={nyumba.status} label={nyumba.statusLabel} />
                <h2>Pata Nyumba</h2>
              </div>
              <p>
                Renters search for houses by type and area. Landlords and
                agents manage their properties, assign caretakers, collect rent
                and handle complaints, all in one system.
              </p>
            </Link>

            <div className="systems">
              <h2 className="systems-title">Systems I&apos;ve designed</h2>
              {engineering.map((project) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="system">
                  <div className="system-copy">
                    <h3>{project.name}</h3>
                    <p>{project.tagline}</p>
                  </div>
                  <ol className="system-flow" aria-label={`${project.name} request flow`}>
                    {project.flow.map((step) => (
                      <li key={step.title}>{step.title}</li>
                    ))}
                  </ol>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="about" id="about">
          <div className="wrap about-grid">
            <h2 className="about-statement">
              Founder by choice. Engineer by habit.
            </h2>
            <div className="about-body">
              <p>
                I started WAONA in 2026 to build technology that moves businesses
                forward: our own products, and custom software for the businesses
                we work with. I set the direction as founder and CEO, and I&apos;m
                in the code every day.
              </p>
              <p>
                My work sits where trust matters most. Who someone is, where
                their money went, whether their ticket is real. I care about what
                happens under the interface: how data moves, where systems fail,
                and what it takes to make them hold up.
              </p>

              <dl className="principles">
                {principles.map((principle) => (
                  <div key={principle.title}>
                    <dt>{principle.title}</dt>
                    <dd>{principle.body}</dd>
                  </div>
                ))}
              </dl>

              <dl className="toolkit">
                {capabilities.map((cap) => (
                  <div key={cap.title}>
                    <dt>{cap.title}</dt>
                    <dd>{cap.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <div className="wrap">
            <h2 className="contact-title">Have something worth building?</h2>
            <a className="contact-mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <ul className="contact-links">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.company.href} target="_blank" rel="noopener noreferrer">
                  waona.ke
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
