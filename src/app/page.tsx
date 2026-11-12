import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import Hero from "@/components/Hero";
import IdempotencyDemo from "@/components/IdempotencyDemo";
import IdentityDemo from "@/components/IdentityDemo";
import TicketCard from "@/components/TicketCard";
import WorkIndex from "@/components/WorkIndex";
import Magnetic from "@/components/motion/Magnetic";
import Marquee from "@/components/motion/Marquee";
import RevealHeading from "@/components/motion/Reveal";
import { capabilities, principles, site } from "@/content/site";

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

        {/* Selected work */}
        <section className="section" id="work">
          <div className="wrap">
            <header className="section-head">
              <RevealHeading className="section-title">Selected work</RevealHeading>
              <p className="section-lede">
                Products I&apos;m building at WAONA, and systems I&apos;ve designed
                to understand correctness, boundaries and trust.
              </p>
            </header>
            <WorkIndex />
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
                My work sits where trust matters most. I care about what happens
                under the interface: how data moves, where systems fail, and what
                it takes to make them hold up. Every product starts with a
                requirements document and a database design before the first line
                of code.
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

        <Marquee items={stack} />

        {/* Playground */}
        <section className="section" id="try">
          <div className="wrap">
            <header className="section-head">
              <RevealHeading className="section-title">Things you can try</RevealHeading>
              <p className="section-lede">
                Small, working pieces of the systems I build. Play with them.
              </p>
            </header>

            <div className="play">
              <article className="play-item play-item--ticket">
                <TicketCard />
                <div className="play-copy">
                  <h3>A ticket that scans once</h3>
                  <p>
                    From WAONA Tickets. Tilt it, then flip it to its QR code. At
                    the gate, a ticket that has already been used is turned away.
                  </p>
                  <Link href="/work/waona-tickets" className="text-link" data-cursor="Read">
                    How WAONA Tickets works
                  </Link>
                </div>
              </article>

              <article className="play-item play-item--identity">
                <div className="play-copy">
                  <h3>Sign in with WAONA</h3>
                  <p>
                    From WAONA Identity. Watch an app hand someone to WAONA, get
                    them signed in, and receive a token that says who they are.
                  </p>
                  <Link href="/work/waona-identity" className="text-link" data-cursor="Read">
                    How WAONA Identity works
                  </Link>
                </div>
                <IdentityDemo />
              </article>

              <article className="play-item play-item--finpay">
                <div className="play-copy">
                  <h3>Pay once, even when you retry</h3>
                  <p>
                    From FinPay. Clients retry when a network times out. Send a
                    payment, then retry the same request, and see why nobody gets
                    charged twice.
                  </p>
                  <Link href="/work/finpay" className="text-link" data-cursor="Read">
                    How FinPay works
                  </Link>
                </div>
                <IdempotencyDemo />
              </article>
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
