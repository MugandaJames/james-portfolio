# James Juma Muganda — Portfolio

Personal portfolio of **James Juma Muganda**, a Computer Science student focused on backend engineering, system design, and building reliable software.

The portfolio brings together my technical projects, engineering interests, and writing. It is designed to show not only what I build, but also how I approach problems, reason about systems, and communicate ideas.

## About

I am pursuing a Bachelor of Science in Computer Science at the Catholic University of Eastern Africa, with expected completion in 2027.

My primary technical interests include:

- Backend engineering with Python
- API development and service architecture
- Database design and data integrity
- System design and maintainable software
- Containerization and infrastructure
- Technical writing and creative exploration of human nature

My guiding idea is:

> I build to understand systems. I write to understand ideas.

## Portfolio Features

- **About:** Background, technical proficiencies, and engineering principles.
- **Projects:** Project overviews and detailed case studies.
- **Writing:** Technical articles and other writing.
- **Responsive design:** Layouts designed for desktop and mobile screens.
- **Metadata and discoverability:** Application metadata, robots configuration, and sitemap support.

## Featured Projects

### FinPay

A payment-system engineering project exploring backend architecture, transaction integrity, idempotency, security, and reliable payment processing.

### Nyumba Management

A property and tenant management application focused on domain-driven design, access control, API development, persistence, and automated testing.

Both projects are ongoing engineering work. Their implementation status and capabilities should be assessed from their respective repositories and documentation.

## Technology Stack

| Technology   | Purpose                           |
| ------------ | --------------------------------- |
| Next.js      | Application framework             |
| React        | User interface                    |
| TypeScript   | Type-safe application development |
| Tailwind CSS | Styling                           |
| MDX          | Structured writing content        |
| ESLint       | Code quality checks               |
| npm          | Dependency management and scripts |

## Getting Started

### Prerequisites

Install:

- Node.js compatible with the project's Next.js version
- npm

### Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd james-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Commands

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the development server               |
| `npm run lint`     | Run ESLint                                 |
| `npx tsc --noEmit` | Check TypeScript types                     |
| `npm run build`    | Create a production build                  |
| `npm run start`    | Start the production server after building |

## Project Structure

```text
james-portfolio/
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── work/           # Project listing and case studies
│   │   ├── writing/        # Writing listing and articles
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root application layout
│   │   ├── page.tsx        # Homepage
│   │   ├── robots.ts       # Robots configuration
│   │   └── sitemap.ts      # Sitemap configuration
│   ├── components/         # Reusable UI components
│   ├── content/            # Project and writing content
│   └── mdx-components.tsx  # MDX component configuration
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Quality Checks

Before submitting changes, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Resolve any errors before deploying.

## Deployment

This application can be deployed to a platform that supports Next.js, such as [Vercel](https://vercel.com/).

Deployment instructions will be finalized once the repository is connected to its GitHub remote.

## Connect

- **Portfolio:** Add the live website URL after deployment.
- **GitHub:** [MugandaJames](https://github.com/MugandaJames)
- **LinkedIn:** [James Juma Muganda](https://www.linkedin.com/in/james-juma-391a65332/)

---

Built by James Juma Muganda.
