export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  status: string;
  visibility: "private" | "public";
  repository?: string;
  stack: string[];
  overview: string;
  problem: string;
  approach: string[];
  engineeringNotes: string[];
  limitations: string;
};

export const projects: Project[] = [
  {
    slug: "finpay",
    number: "01",
    name: "FinPay",
    category: "Financial systems",
    summary:
      "A financial backend focused on transaction integrity, idempotent operations, concurrency, and reliable money movement.",
    status: "In development",
    visibility: "private",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Kafka"],
    overview:
      "FinPay is a financial backend and system-design project exploring the correctness requirements behind money movement. The central design principle is that a payment operation must remain consistent when requests are retried, concurrent operations overlap, or work crosses application boundaries. PostgreSQL is treated as the authoritative store for financial state, while supporting infrastructure has distinct responsibilities.",
    problem:
      "A payment endpoint can return a successful HTTP response and still be part of an incorrect financial operation if its underlying state transitions are not protected. Clients retry requests after timeouts, multiple requests can target the same account, and a process can fail after a database commit but before notifying another service. The system must account for these cases rather than relying on the happy path.",
    approach: [
      "Treat PostgreSQL as the source of truth for account balances and financial records, keeping financial state changes within explicit database transaction boundaries.",
      "Design idempotent request handling so a retry of the same logical operation can be distinguished from a genuinely new transaction.",
      "Reason about concurrent requests and state transitions, including how database constraints, locking, and transaction isolation can protect financial invariants.",
      "Explore an outbox-based event-delivery design with Kafka-oriented asynchronous processing, separating committed database state from downstream event consumption.",
      "Keep authentication, request validation, persistence, rate limiting, and asynchronous processing as distinct responsibilities with clear boundaries.",
    ],
    engineeringNotes: [
      "Idempotency is a business-operation guarantee, not simply a cache of previously returned HTTP responses. The system must define what identifies a logical operation and how its result is recovered on retry.",
      "A database transaction protects the changes inside its boundary; it does not automatically make a separate message broker or external service part of the same atomic operation.",
      "Concurrency needs explicit invariants. Two requests that read the same initial state must not both perform incompatible updates merely because each request succeeds independently.",
      "An outbox can help coordinate database commits and event publication, but delivery retries, duplicate messages, consumer idempotency, and eventual consistency still need deliberate handling.",
      "Redis and other supporting services should not silently become authoritative for financial balances. Their role must be defined according to the consistency requirements of each operation.",
    ],
    limitations:
      "FinPay is a development project, not a claim of a production payment service. The outbox and Kafka-oriented approach is described as an architectural direction where applicable, not as proof that a complete distributed payment pipeline is deployed. No production transaction volumes, independent security review, regulatory certification, or performance benchmarks are claimed.",
  },
  {
    slug: "nyumba",
    number: "02",
    name: "Nyumba",
    category: "Property technology",
    summary:
      "A property and tenant management platform with modular backend boundaries, lease and rent workflows, and role-scoped access control.",
    status: "In development",
    visibility: "private",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Redis",
      "Next.js",
    ],
    overview:
      "Nyumba is a property and tenant management platform being developed as a modular monolith. Its backend separates domain logic, application use cases, infrastructure, and API presentation. The aim is to keep property-management rules understandable and testable without introducing the operational complexity of multiple independently deployed services too early.",
    problem:
      "Property management connects several related domains: owners, properties, units, leases, tenants, rent charges, and payments. These concepts share data, but they do not share identical responsibilities or permissions. The system must enforce valid state transitions and ensure that a user can access only the records permitted by their role and relationship to a property.",
    approach: [
      "Separate domain rules, application use cases, persistence implementations, and HTTP presentation so business decisions are not embedded entirely in API handlers.",
      "Use repository abstractions and a Unit of Work to organise persistence access and transaction boundaries.",
      "Define role boundaries deliberately: administrators operate on the management-company side, owners manage tenants and property records within their own scope, and tenants access their own relevant information.",
      "Treat authorization as part of each use case and data-access path rather than relying on frontend visibility or role labels alone.",
      "Model lease and rent workflows with explicit state and ownership constraints, and test cases involving invalid transitions, concurrent operations, and access to another user's records.",
      "Use automated unit and integration tests to exercise application behaviour and API-level authorization, including cases that must be rejected.",
    ],
    engineeringNotes: [
      "A modular monolith can provide strong boundaries without distributed-service overhead. The quality of those boundaries matters more than splitting the application into services prematurely.",
      "Authentication establishes who is making a request; authorization determines whether that identity can perform the specific action on the specific resource.",
      "Role checks alone are insufficient for tenant and property data. An owner must be scoped to their own properties, and a tenant must not gain access to another tenant's records.",
      "Repository methods and use cases should express the access constraints required by the operation instead of depending on every caller to remember them.",
      "Lease and rent operations need to account for state and concurrency. A successful individual request is not enough if overlapping requests can violate a domain invariant.",
      "Automated tests are part of the design process: they make permission boundaries and business rules observable as the application evolves.",
    ],
    limitations:
      "Nyumba is still under development and its repository is private. This case study describes the architecture, implementation work, and engineering concerns being addressed; it does not imply that every planned feature is complete or that the platform is deployed for production property management.",
  },
  {
    slug: "jisave-sacco",
    number: "03",
    name: "JiSave SACCO",
    category: "Financial applications",
    summary:
      "A SACCO management backend using the .NET ecosystem for cooperative financial application workflows.",
    status: "Project",
    visibility: "public",
    repository: "https://github.com/MugandaJames/JiSaveSacco",
    stack: ["C#", "ASP.NET Core", ".NET 8", "MySQL", "Entity Framework Core"],
    overview:
      "JiSave SACCO is a backend project for a cooperative financial application. It provides an opportunity to work with the C# and ASP.NET Core ecosystem and structure server-side application logic around persistence and authentication.",
    problem:
      "A financial application needs to organise business workflows and data access in a way that can be maintained as the application grows.",
    approach: [
      "Build the backend with ASP.NET Core.",
      "Use Entity Framework Core to work with MySQL persistence.",
      "Keep the API and data layer aligned with the needs of the companion application.",
    ],
    engineeringNotes: [
      "API contracts and mobile-client expectations need to stay aligned.",
      "Authentication is only one part of authorization; access to individual resources also needs careful rules.",
    ],
    limitations:
      "This summary is intentionally limited to the technologies and project purpose currently documented here. Detailed feature claims should be updated after a full repository review.",
  },
  {
    slug: "jisave-sacco-mobile",
    number: "04",
    name: "JiSave SACCO Mobile",
    category: "Mobile development",
    summary:
      "An Android companion application for the JiSave SACCO project.",
    status: "Project",
    visibility: "public",
    repository:
      "https://github.com/MugandaJames/JiSaveSacco-mobile-app",
    stack: [
      "Android",
      "Firebase Authentication",
      "Firebase Realtime Database",
      "Material Components",
    ],
    overview:
      "JiSave SACCO Mobile is the Android companion application in the JiSave project family. It explores the mobile side of delivering a financial application experience.",
    problem:
      "Mobile applications must make core workflows understandable while coordinating authentication, remote data, loading states, and errors.",
    approach: [
      "Build for the Android platform.",
      "Use Firebase authentication and database services in the application.",
      "Use Material Components for interface elements.",
    ],
    engineeringNotes: [
      "The user interface should communicate loading and failure states clearly.",
      "Client-side checks do not replace authorization enforced by backend services or database rules.",
    ],
    limitations:
      "This case study does not claim app-store distribution, production usage, or a specific level of test coverage.",
  },
  {
    slug: "whatsapp-music-bot",
    number: "05",
    name: "WhatsApp Music Bot",
    category: "Automation and AI",
    summary:
      "A WhatsApp bot combining messaging automation, media tooling, and AI-powered responses.",
    status: "Project",
    visibility: "public",
    repository: "https://github.com/MugandaJames/whatsapp-music-bot",
    stack: ["Node.js", "Baileys", "Gemini API", "yt-dlp", "FFmpeg"],
    overview:
      "The WhatsApp Music Bot explores how a messaging interface can act as the entry point for automation and media processing, with an AI API available for conversational features.",
    problem:
      "A bot needs to turn incoming messages into understandable commands, invoke the appropriate processing steps, and return useful responses without leaving users guessing when something fails.",
    approach: [
      "Use Node.js for bot-side application logic.",
      "Use Baileys for WhatsApp Web protocol integration.",
      "Use media tooling such as yt-dlp and FFmpeg for supported processing workflows.",
      "Integrate the Gemini API for AI-powered responses.",
    ],
    engineeringNotes: [
      "External processes can fail independently and need controlled error handling.",
      "Long-running media operations need sensible limits and user feedback.",
      "Third-party platform policies and media rights matter when operating automation tools.",
    ],
    limitations:
      "The description does not imply official WhatsApp platform approval, uninterrupted operation, or permission to download copyrighted material.",
  },
  {
    slug: "forex-eurusd-predictor",
    number: "06",
    name: "EUR/USD Predictor",
    category: "Machine learning",
    summary:
      "An exploratory machine-learning project focused on analysing and forecasting the EUR/USD currency pair.",
    status: "Exploratory",
    visibility: "public",
    repository:
      "https://github.com/MugandaJames/forex-EURUSD-predictor",
    stack: ["Python", "Time-series analysis", "Machine learning"],
    overview:
      "The EUR/USD Predictor explores the problem of forecasting a financial time series. It provides a setting to think critically about historical data, model evaluation, and the difference between a forecast and a reliable trading signal.",
    problem:
      "Financial time series are noisy, non-stationary, and vulnerable to misleading evaluation when future information leaks into training or when a model is judged on unsuitable data.",
    approach: [
      "Treat historical observations as a time-ordered dataset.",
      "Evaluate forecasting methods against data not used during fitting.",
      "Compare results with simple baselines before interpreting model performance.",
    ],
    engineeringNotes: [
      "Random train-test splits can be inappropriate for time-series forecasting.",
      "A model should be compared with a baseline and evaluated for leakage.",
      "Predictive accuracy alone does not establish trading profitability.",
    ],
    limitations:
      "No accuracy, profitability, or investment-performance claim is made here. Treat this as an educational project, not financial advice.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}