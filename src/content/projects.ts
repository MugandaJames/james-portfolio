export type ProjectStatus = "live" | "soon" | "design" | "dev";

export type Project = {
  slug: string;
  name: string;
  group: "WAONA product" | "Engineering";
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  links?: { label: string; href: string }[];
  overview: string;
  problem: string;
  approach: string[];
  flow: { title: string; detail: string }[];
  notes: string[];
  limitations: string;
};

export const projects: Project[] = [
  {
    slug: "waona-identity",
    name: "WAONA Identity",
    group: "WAONA product",
    status: "live",
    statusLabel: "Live",
    tagline: "Sign-in and registration that developers plug into their own systems.",
    summary:
      "An identity and authentication product built on Keycloak, now growing into a hosted identity platform with an SDK developers can drop into their apps.",
    role: "Founder · product and engineering",
    stack: ["Keycloak", "OpenID Connect", "OAuth 2.0", "Python SDK", "FastAPI"],
    links: [{ label: "waona.ke", href: "https://waona.ke" }],
    overview:
      "WAONA Identity handles who a user is so that product teams don't have to rebuild sign-in, registration and session handling for every system. It is already live and integrated, and the direction is a hosted platform: a developer creates a project, installs a package and gets secure sign-in without running identity infrastructure themselves.",
    problem:
      "Most teams either build authentication themselves — and get password storage, token handling and session expiry subtly wrong — or wire up a general-purpose identity server that is powerful but heavy to configure. Developers in this market need something that is standards-based and secure by default, but quick to integrate.",
    approach: [
      "Build on Keycloak and open standards (OpenID Connect, OAuth 2.0) rather than inventing a custom token scheme.",
      "Wrap the identity server behind a developer-facing layer so integrators deal with a project, a client and a few calls — not realm configuration.",
      "Ship a Python SDK, released under the MIT licence, so a FastAPI or Django service can verify users in a few lines.",
      "Use the product in production across WAONA's own platforms first, so every rough edge is felt internally before external developers meet it.",
    ],
    flow: [
      { title: "Your app", detail: "Redirects the user to WAONA Identity to sign in or register." },
      { title: "WAONA Identity", detail: "Authenticates the user against Keycloak using OpenID Connect." },
      { title: "Tokens", detail: "Signed tokens return to your app with the user's identity and roles." },
      { title: "SDK", detail: "Your backend verifies tokens and reads claims with the SDK." },
    ],
    notes: [
      "Identity is infrastructure: the best version of it is the one developers stop thinking about.",
      "Standards first. A platform that speaks OpenID Connect can be adopted, swapped or extended without lock-in.",
      "Authentication tells you who someone is; authorization — what they may do with a specific record — still belongs to each product.",
    ],
    limitations:
      "The hosted, self-serve developer platform is under active development. The current WAONA Identity is live and integrated.",
  },
  {
    slug: "waona-tickets",
    name: "WAONA Tickets",
    group: "WAONA product",
    status: "soon",
    statusLabel: "Coming soon",
    tagline: "Event discovery and ticketing for events across Kenya.",
    summary:
      "A ticketing platform where people discover events, buy tickets and pay by M-Pesa, and organizers run their events end to end.",
    role: "Founder · full-stack engineering",
    stack: ["FastAPI", "PostgreSQL", "Next.js", "Keycloak", "M-Pesa (Daraja)"],
    overview:
      "WAONA Tickets brings event discovery and ticket sales into one place. Buyers browse by category, follow organizers, save events and pay with M-Pesa. Organizers create events, publish ticket tiers and promo codes, and track sales. The backend is a FastAPI service; the frontend is a Next.js app with a dark, discovery-first design.",
    problem:
      "Ticketing looks simple until money and scarcity meet: a limited number of seats, many buyers paying at once over mobile money, and tickets that must stay valid when they are transferred or an event is cancelled. Every one of those moments has to stay correct, not just look right on screen.",
    approach: [
      "Treat the database as the source of truth for inventory so concurrent purchases can never oversell a ticket tier.",
      "Handle M-Pesa payments as asynchronous, retry-safe operations: a ticket is issued only after a confirmed callback, and duplicate callbacks change nothing.",
      "Build discovery like the best ticketing products — categories, filters, availability badges such as \"Almost full\" — with saved events synced to the server.",
      "Give organizers profiles that buyers can follow, plus promo codes and sales tracking.",
      "Support secure ticket transfer between users, with the original ticket invalidated in the same transaction that issues the new one.",
      "Sign-in runs on Keycloak with a restyled, on-brand login, keeping identity out of the ticketing code.",
    ],
    flow: [
      { title: "Discover", detail: "Browse events by category, availability and organizer." },
      { title: "Reserve", detail: "Seats are held against inventory inside a database transaction." },
      { title: "Pay", detail: "M-Pesa STK push; the payment callback is verified and idempotent." },
      { title: "Issue", detail: "A ticket is issued, transferable to another user if needed." },
    ],
    notes: [
      "A successful payment response and a correctly issued ticket are two different facts — the system records both.",
      "Inventory is a concurrency problem first and a UI problem second.",
      "Cancellation and refunds are designed in, not bolted on: buyers are refunded automatically when an event is cancelled.",
    ],
    limitations:
      "WAONA Tickets is not launched yet. Payments currently run against the Safaricom sandbox, and payouts to organizers are still being built.",
  },
  {
    slug: "pata-nyumba",
    name: "Pata Nyumba",
    group: "WAONA product",
    status: "design",
    statusLabel: "In design",
    tagline: "House hunting for tenants. Property management for landlords.",
    summary:
      "A web platform for finding a place to live and for landlords and agents to manage properties, caretakers, rent and tenant complaints.",
    role: "Founder · system design and backend",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Next.js", "M-Pesa"],
    overview:
      "Pata Nyumba has two sides. Tenants search for houses by type and location. Landlords, owners and agents manage what they own: properties, units, the caretakers assigned to each property, rent collection, and complaints raised by tenants. The backend follows the same architecture and patterns as WAONA Tickets, so the two products share conventions.",
    problem:
      "Rental housing in Kenya runs on phone calls, WhatsApp and caretakers. Listings go stale, rent is tracked in notebooks, and complaints get lost between tenant, caretaker and landlord. One system needs to connect all three without giving anyone access to records that aren't theirs.",
    approach: [
      "Model the core entities — landlords, properties, units, caretakers, tenants, leases, rent and complaints — with clear ownership on every record.",
      "Let landlords assign caretakers to specific properties and manage caretaker salaries, with optional bonuses for work well done.",
      "Scope every query by role and relationship: a caretaker sees only assigned properties; a tenant sees only their own lease.",
      "Require tenant acknowledgement before a deposit is settled, so neither side can close it unilaterally.",
      "Keep personal data collection minimal in the first version.",
    ],
    flow: [
      { title: "Search", detail: "Tenants find houses by type, area and price." },
      { title: "Lease", detail: "A tenant is attached to a unit under a lease." },
      { title: "Operate", detail: "Rent, caretakers and complaints are managed per property." },
      { title: "Settle", detail: "Deposits close only with tenant acknowledgement." },
    ],
    notes: [
      "Role checks alone aren't enough: access depends on who you are and how you relate to the property.",
      "Sharing an architecture with WAONA Tickets means every new WAONA product starts from proven foundations.",
    ],
    limitations:
      "Pata Nyumba is in design and early backend development. Nothing here implies a launched product.",
  },
  {
    slug: "finpay",
    name: "FinPay",
    group: "Engineering",
    status: "dev",
    statusLabel: "In development",
    tagline: "A payments backend built around correctness under retries and concurrency.",
    summary:
      "A financial backend focused on transaction integrity, idempotent operations, concurrency and reliable money movement.",
    role: "System design and backend engineering",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Kafka"],
    overview:
      "FinPay explores the correctness requirements behind moving money. The central principle is that a payment must stay consistent when requests are retried, concurrent operations overlap, or work crosses service boundaries. PostgreSQL is the authoritative store for financial state, and every supporting system has a clearly limited role.",
    problem:
      "A payment endpoint can return a successful response and still be part of an incorrect financial operation. Clients retry after timeouts, multiple requests target the same account, and a process can fail after a database commit but before notifying another service. The system has to account for those cases rather than rely on the happy path.",
    approach: [
      "Keep balances and financial records in PostgreSQL, with every state change inside an explicit transaction boundary.",
      "Design idempotent request handling so a retry of the same logical operation is distinguished from a genuinely new one.",
      "Protect financial invariants under concurrency with constraints, locking and the right isolation level.",
      "Use an outbox so committed database state and downstream event delivery (Kafka) stay coordinated.",
      "Separate authentication, validation, persistence, rate limiting and async processing into distinct responsibilities.",
    ],
    flow: [
      { title: "Request", detail: "Authenticate the caller and validate the operation." },
      { title: "Idempotency", detail: "Recognise retries and recover the original result." },
      { title: "Transaction", detail: "Commit financial state atomically in PostgreSQL." },
      { title: "Outbox", detail: "Publish events after commit for downstream consumers." },
    ],
    notes: [
      "Idempotency is a business-operation guarantee, not a cache of previous HTTP responses.",
      "A database transaction doesn't make a message broker part of the same atomic operation.",
      "Redis must never quietly become the source of truth for a balance.",
    ],
    limitations:
      "FinPay is an engineering project, not a production payment service. No production volumes, security audit or certification are claimed.",
  },
  {
    slug: "nyumba",
    name: "Nyumba",
    group: "Engineering",
    status: "dev",
    statusLabel: "In development",
    tagline: "A modular monolith for property and tenant management.",
    summary:
      "A property and tenant management backend with modular boundaries, lease and rent workflows, and role-scoped access control.",
    role: "Architecture and backend engineering",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Redis", "Next.js"],
    overview:
      "Nyumba is built as a modular monolith. Domain logic, application use cases, infrastructure and the HTTP layer are kept apart, so property-management rules stay understandable and testable without the operational cost of microservices.",
    problem:
      "Owners, properties, units, leases, tenants, rent charges and payments share data but not responsibilities or permissions. The system must enforce valid state transitions and make sure every user can reach only the records their role and relationship allow.",
    approach: [
      "Separate domain rules, use cases, persistence and presentation so business decisions don't live in API handlers.",
      "Use repositories and a Unit of Work to organise persistence and transaction boundaries.",
      "Make authorization part of every use case and data-access path, not a frontend concern.",
      "Model lease and rent workflows with explicit states, and test invalid transitions and cross-tenant access.",
    ],
    flow: [
      { title: "API", detail: "Thin HTTP layer: parse, authenticate, delegate." },
      { title: "Use cases", detail: "Application rules and authorization per operation." },
      { title: "Domain", detail: "Entities and invariants for leases, rent and units." },
      { title: "Infrastructure", detail: "Repositories, Unit of Work and PostgreSQL." },
    ],
    notes: [
      "The quality of module boundaries matters more than splitting into services early.",
      "Automated tests make permission boundaries observable as the system grows.",
    ],
    limitations:
      "Nyumba is under development in a private repository; not every planned feature is complete.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
