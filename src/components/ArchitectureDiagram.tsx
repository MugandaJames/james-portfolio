
type ArchitectureDiagramProps = {
  project: "finpay" | "nyumba";
};

type DiagramStep = {
  number: string;
  title: string;
  description: string;
  kind?: "accent" | "database" | "muted";
};

function DiagramStepCard({ step }: { step: DiagramStep }) {
  return (
    <div className={`architecture-node${step.kind ? ` architecture-node--${step.kind}` : ""}`}>
      <span className="architecture-node-number mono">{step.number}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </div>
  );
}

function DiagramArrow({ label }: { label?: string }) {
  return (
    <div className="architecture-arrow" aria-hidden="true">
      <span>↓</span>
      {label && <span className="architecture-arrow-label">{label}</span>}
    </div>
  );
}

function FinPayDiagram() {
  return (
    <section className="architecture-section" aria-labelledby="architecture-title">
      <div className="architecture-heading">
        <p className="mono content-index">SYSTEM MAP / 01</p>
        <h2 id="architecture-title">A transaction, end to end.</h2>
        <p>
          The core principle is to commit financial state consistently before
          downstream systems act on the resulting event.
        </p>
      </div>

      <div className="architecture-flow">
        <DiagramStepCard
          step={{
            number: "01",
            title: "API request",
            description:
              "Authenticate the caller and validate the requested operation.",
          }}
        />
        <DiagramArrow label="Validate operation identity" />
        <DiagramStepCard
          step={{
            number: "02",
            title: "Idempotency boundary",
            description:
              "Recognise retries of the same logical operation and define how its result is recovered.",
            kind: "accent",
          }}
        />
        <DiagramArrow label="Apply business rules" />
        <DiagramStepCard
          step={{
            number: "03",
            title: "PostgreSQL transaction",
            description:
              "Protect financial state changes and associated records within a database transaction.",
            kind: "database",
          }}
        />

        <div className="architecture-branch" aria-label="After the database transaction">
          <div className="architecture-branch-line" aria-hidden="true" />
          <p className="mono architecture-branch-label">
            AFTER COMMIT / ASYNCHRONOUS PATH
          </p>
          <DiagramArrow />
          <DiagramStepCard
            step={{
              number: "04",
              title: "Outbox and event delivery",
              description:
                "An outbox can record events with the transaction; a separate publisher can deliver them for downstream processing.",
              kind: "muted",
            }}
          />
          <DiagramArrow />
          <DiagramStepCard
            step={{
              number: "05",
              title: "Kafka consumers",
              description:
                "Downstream consumers process events with retry and duplicate-handling strategies.",
              kind: "muted",
            }}
          />
        </div>
      </div>

      <p className="architecture-caption">
        <span className="mono">DESIGN NOTE</span>
        <span>
          The database transaction does not automatically include the message
          broker. The outbox and Kafka path represents the architectural
          approach being explored, not a claim of a fully deployed pipeline.
        </span>
      </p>
    </section>
  );
}

function NyumbaDiagram() {
  return (
    <section className="architecture-section" aria-labelledby="architecture-title">
      <div className="architecture-heading">
        <p className="mono content-index">SYSTEM MAP / 02</p>
        <h2 id="architecture-title">Rules before persistence.</h2>
        <p>
          Requests move through application and domain boundaries, while
          authorization limits each operation to the caller&apos;s permitted scope.
        </p>
      </div>

      <div className="architecture-nyumba">
        <div className="architecture-flow">
          <DiagramStepCard
            step={{
              number: "01",
              title: "FastAPI presentation",
              description:
                "HTTP routes, request schemas, authentication context, and response handling.",
            }}
          />
          <DiagramArrow label="Invoke use case" />
          <DiagramStepCard
            step={{
              number: "02",
              title: "Application layer",
              description:
                "Coordinates the requested action, its dependencies, and the relevant access checks.",
              kind: "accent",
            }}
          />
          <DiagramArrow label="Enforce domain rules" />
          <DiagramStepCard
            step={{
              number: "03",
              title: "Domain model",
              description:
                "Defines valid business behaviour and rules for properties, leases, tenants, and rent.",
            }}
          />
          <DiagramArrow label="Use persistence boundary" />
          <DiagramStepCard
            step={{
              number: "04",
              title: "Repository and Unit of Work",
              description:
                "Organises data access and transaction boundaries behind application-facing abstractions.",
              kind: "muted",
            }}
          />
          <DiagramArrow />
          <DiagramStepCard
            step={{
              number: "05",
              title: "PostgreSQL",
              description:
                "Persists application records and enforces applicable database constraints.",
              kind: "database",
            }}
          />
        </div>

        <aside className="architecture-access" aria-labelledby="access-boundary-title">
          <p className="mono content-index">CROSS-CUTTING BOUNDARY</p>
          <h3 id="access-boundary-title">Authorization scope</h3>
          <div className="architecture-role">
            <span className="mono">ADMIN</span>
            <p>Management-company responsibilities.</p>
          </div>
          <div className="architecture-role">
            <span className="mono">OWNER</span>
            <p>Manage tenants and records within owned properties.</p>
          </div>
          <div className="architecture-role">
            <span className="mono">TENANT</span>
            <p>Access their own relevant records.</p>
          </div>
          <p className="architecture-access-note">
            Role and resource scope must be checked by backend logic; hiding a
            frontend control is not authorization.
          </p>
        </aside>
      </div>

      <p className="architecture-caption">
        <span className="mono">DESIGN NOTE</span>
        <span>
          This is a conceptual view of the modular-monolith boundaries. Actual
          checks belong to the relevant use cases and data-access paths, and
          not every operation necessarily passes through an identical sequence.
        </span>
      </p>
    </section>
  );
}

export default function ArchitectureDiagram({
  project,
}: ArchitectureDiagramProps) {
  if (project === "finpay") return <FinPayDiagram />;
  return <NyumbaDiagram />;
}
