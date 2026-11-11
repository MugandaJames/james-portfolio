# James Juma Muganda — Portfolio

Personal site of **James Juma Muganda**, founder and CEO of [WAONA](https://waona.ke) and software engineer, based in Nairobi, Kenya.

The site presents James as a founder who builds: the WAONA products he leads (WAONA Identity, WAONA Tickets, Pata Nyumba) and the engineering projects behind how he thinks about correctness and system boundaries (FinPay, Nyumba).

## Pages

| Route          | Purpose                                                              |
| -------------- | -------------------------------------------------------------------- |
| `/`            | Hero, WAONA products, engineering projects, capabilities, about, contact |
| `/work`        | Index of all products and projects                                   |
| `/work/[slug]` | Case study: overview, problem, approach, flow, principles, status    |

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4 (plus hand-written CSS in `globals.css`), Geist and Geist Mono fonts.

## Editing content

All copy lives in `src/content/` — no component changes needed for routine updates.

- `src/content/site.ts` — name, role, email, social links, capabilities and principles.
- `src/content/projects.ts` — every product and project. Adding an entry creates its card, its row on `/work` and its case-study page automatically.

Project `status` drives the coloured status pill: `live`, `soon`, `design` or `dev`. Keep the `limitations` field honest — it is shown on each case study as "Where it stands".

See [`docs/DESIGN.md`](docs/DESIGN.md) for the design system and content rules.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality checks before pushing:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

Deploy on Vercel. Set `NEXT_PUBLIC_SITE_URL` (for example `https://jamesmuganda.com`) so `sitemap.xml` and `robots.txt` include absolute URLs.

## Connect

- **Email:** muganda@waona.ke
- **GitHub:** [MugandaJames](https://github.com/MugandaJames)
- **LinkedIn:** [muganda-james-391a65332](https://www.linkedin.com/in/muganda-james-391a65332)
- **X:** [@MugandaJames](https://x.com/MugandaJames)
- **Instagram:** [_mu.ga.nda_](https://www.instagram.com/_mu.ga.nda_/)
