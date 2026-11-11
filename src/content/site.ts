export const site = {
  name: "James Juma Muganda",
  shortName: "James Muganda",
  role: "Founder & CEO, WAONA · Software engineer",
  location: "Nairobi, Kenya",
  email: "muganda@waona.ke",
  company: { name: "WAONA", href: "https://waona.ke" },
  socials: [
    { label: "GitHub", href: "https://github.com/MugandaJames" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muganda-james-391a65332" },
    { label: "X", href: "https://x.com/MugandaJames" },
    { label: "Instagram", href: "https://www.instagram.com/_mu.ga.nda_/" },
  ],
};

export const capabilities = [
  {
    title: "Product engineering",
    body: "From idea to shipped product: data model, API, interface and the decisions in between.",
    items: ["FastAPI", "Next.js", "TypeScript", "React"],
  },
  {
    title: "Backend & data",
    body: "Services that stay correct under retries, concurrency and failure — with PostgreSQL as the source of truth.",
    items: ["Python", "PostgreSQL", "SQLAlchemy", "Redis", "Kafka"],
  },
  {
    title: "Identity & payments",
    body: "The two things users must be able to trust: who they are, and where their money went.",
    items: ["Keycloak", "OpenID Connect", "M-Pesa Daraja", "Idempotency"],
  },
  {
    title: "Architecture & docs",
    body: "Requirements, database design and system documents written before and alongside the code.",
    items: ["SRS", "Database design", "Modular monoliths", "Docker"],
  },
];

export const principles = [
  {
    title: "Correct before clever",
    body: "A system that moves money or grants access has to be right on the worst day, not just the demo.",
  },
  {
    title: "Boundaries are the design",
    body: "Clear modules and ownership rules outlast any framework choice.",
  },
  {
    title: "Write it down",
    body: "Every product starts with a requirements document and a database design. Code follows the thinking.",
  },
  {
    title: "Build for here",
    body: "M-Pesa, caretakers, events across Kenya — software shaped by the market it serves.",
  },
];
