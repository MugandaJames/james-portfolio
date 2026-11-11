import Link from "next/link";
import { Browser } from "@/components/Frames";
import { SiteFooter, SiteHeader, Status } from "@/components/Chrome";
import Hero from "@/components/Hero";
import IdempotencyDemo from "@/components/IdempotencyDemo";
import IdentityDemo from "@/components/IdentityDemo";
import TicketCard from "@/components/TicketCard";
import Walkthrough from "@/components/Walkthrough";
import Magnetic from "@/components/motion/Magnetic";
import Marquee from "@/components/motion/Marquee";
import RevealHeading from "@/components/motion/Reveal";
import ScrollScale from "@/components/motion/ScrollScale";
import { getProject } from "@/content/projects";
import { shots } from "@/content/shots";
import { capabilities, principles, site } from "@/content/site";

const tickets = getProject("waona-tickets")!;
const identity = getProject("waona-identity")!;
const nyumba = getProject("pata-nyumba")!;
const finpay = getProject("finpay")!;
const monolith = getProject("nyumba")!;

const stack = [
  "FastAPI",
  "PostgreSQL",
  "Next.js",
  "Keycloak",
  "M-Pesa Daraja",
  "OpenID Connect",
  "Redis",
  "Kafka",
  "TypeScript",
  "Docker",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <Marquee items={stack} />

        {/* WAONA Tickets */}
        <section className="product" id="tickets">
          <div className="wrap">
            <div className="tickets-head">
              <header className="product-head">
                <Status status={tickets.status} label={tickets.statusLabel} />
                <RevealHeading>WAONA Tickets</RevealHeading>
                <p className="product-lede">
                  Find an event, pay with M-Pesa, and walk in with your phone. I
                  designed the product and built both the FastAPI backend and the
                  Next.js app.
                </p>
              </header>
              <TicketCard />
            </div>
          </div>

          <Walkthrough />

          <div className="wrap">
            <div className="organizers">
              <div className="organizers-copy">
                <h3>Organizers run everything from Studio</h3>
                <p>
                  Drafts, publishing, bookings, earnings, team access and
                  check-in, in one place. Organizers get a public profile people
                  can follow, plus promo codes and live sales.
                </p>
                <Link href="/work/waona-tickets" className="text-link" data-cursor="Read">
                  Read the WAONA Tickets case study
                </Link>
              </div>
              <ScrollScale>
                <Browser shot={shots.tickets.studio} address="WAONA Tickets Studio" />
              </ScrollScale>
            </div>
          </div>
        </section>

        {/* WAONA Identity */}
        <section className="product product--identity" id="identity">
          <div className="wrap identity-grid">
            <header className="product-head">
              <Status status={identity.status} label={identity.statusLabel} />
              <RevealHeading>WAONA Identity</RevealHeading>
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
              <Link href="/work/waona-identity" className="text-link" data-cursor="Read">
                Read the WAONA Identity case study
              </Link>
            </header>

            <IdentityDemo />
          </div>

          <div className="wrap identity-real">
            <p className="identity-real-label">The real screens</p>
            <div className="identity-real-row">
              <Browser
                shot={shots.identity.handoff}
                address="WAONA Tickets"
                sizes="(max-width: 900px) 92vw, 560px"
              />
              <Browser
                shot={shots.identity.signIn}
                address="WAONA Identity"
                sizes="(max-width: 900px) 92vw, 480px"
              />
            </div>
          </div>
        </section>

        {/* Pata Nyumba */}
        <section className="more">
          <div className="wrap">
            <Link href="/work/pata-nyumba" className="nyumba" data-cursor="Open">
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

            {/* Systems */}
            <div className="systems">
              <RevealHeading className="systems-title">Systems I&apos;ve designed</RevealHeading>

              <div className="finpay">
                <div className="finpay-copy">
                  <h3>{finpay.name}</h3>
                  <p>{finpay.tagline}</p>
                  <p className="finpay-sub">
                    Clients retry when a network times out. A payments system has
                    to tell a retry from a new payment, or people get charged
                    twice. Try it.
                  </p>
                  <Link href="/work/finpay" className="text-link" data-cursor="Read">
                    Read the FinPay case study
                  </Link>
                </div>
                <IdempotencyDemo />
              </div>

              <Link href={`/work/${monolith.slug}`} className="system" data-cursor="Open">
                <div className="system-copy">
                  <h3>{monolith.name}</h3>
                  <p>{monolith.tagline}</p>
                </div>
                <ol className="system-flow" aria-label={`${monolith.name} layers`}>
                  {monolith.flow.map((step) => (
                    <li key={step.title}>{step.title}</li>
                  ))}
                </ol>
              </Link>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="about" id="about">
          <div className="wrap about-grid">
            <RevealHeading className="about-statement">
              Founder by choice. Engineer by habit.
            </RevealHeading>
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
            <RevealHeading className="contact-title">Have something worth building?</RevealHeading>
            <Magnetic strength={0.2}>
              <a className="contact-mail" href={`mailto:${site.email}`} data-cursor="Write">
                {site.email}
              </a>
            </Magnetic>
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
      <SiteFooter big />
    </>
  );
}
