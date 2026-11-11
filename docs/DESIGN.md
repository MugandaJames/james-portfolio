# Portfolio design document

## 1. Goals

- Introduce James as **founder and CEO of WAONA who builds the products himself**.
- Lead with WAONA's products; support with engineering case studies that show depth.
- Dark, sleek and technical; fast to read; no filler sections.

## 2. Content rules

- **No academic content.** No university, degree, coursework or "student" framing anywhere.
- **No writing/journal section.** It was removed in this redesign together with MDX support.
- **Honest status.** Every project shows a status pill and a "Where it stands" note. WAONA Tickets is presented as *coming soon* until launch; Pata Nyumba as *in design*.
- **No invented proof.** No client logos, testimonials, user counts or metrics until they are real.
- Public contact is `muganda@waona.ke`. No phone/WhatsApp number on the site.

## 3. Information architecture

```
/                 Home
  Hero            Role pill, headline, intro, CTAs, live "waona status" console
  #work           WAONA products (cards) + Engineering (rows)
  Capabilities    Four areas with stack tags
  #about          Founder story + four principles
  #contact        Email + social links
/work             All projects grouped: WAONA products, Engineering
/work/[slug]      Case study
```

## 4. Visual system

| Token          | Value                    | Use                                  |
| -------------- | ------------------------ | ------------------------------------ |
| `--bg`         | `#07080b`                | Page background                      |
| `--bg-2`       | `#0c0e13`                | Alternate sections                   |
| `--surface`    | `#11141a`                | Cards, flow steps                    |
| `--line`       | white @ 8%               | Hairlines and borders                |
| `--text`       | `#ededf0`                | Primary text                         |
| `--muted`      | `#8b909c`                | Body copy                            |
| `--cyan`       | `#38d6e8`                | Primary accent (WAONA Digital Cyan)  |
| `--violet`     | `#8b78ff`                | Secondary accent, used sparingly     |

- **Type:** Geist for text, Geist Mono for labels, tags and the console. Headlines are tight (`letter-spacing: -0.03em` to `-0.05em`).
- **Status colours:** live = green, coming soon = cyan, in design = violet, in development = amber.
- **Motion:** one entrance animation in the hero, a staggered console, hover lifts on cards and rows. All motion is disabled under `prefers-reduced-motion`.
- **Layout:** 1160px max width; breakpoints at 960px and 600px.

## 5. Components

| Component        | File                          | Notes                                  |
| ---------------- | ----------------------------- | -------------------------------------- |
| `SiteHeader`     | `src/components/Chrome.tsx`   | Sticky, blurred, JM mark               |
| `SiteFooter`     | `src/components/Chrome.tsx`   | Copyright + socials                    |
| `StatusPill`     | `src/components/Chrome.tsx`   | Driven by `ProjectStatus`              |
| `Arrow`          | `src/components/Chrome.tsx`   | Inline SVG, animates on hover          |
| `CopyrightYear`  | `src/components/CopyrightYear.tsx` | Client component for current year |

## 6. Data model (`src/content/projects.ts`)

| Field         | Type                                   | Shown on                     |
| ------------- | -------------------------------------- | ---------------------------- |
| `slug`        | string                                 | URL                          |
| `group`       | `"WAONA product"` \| `"Engineering"`   | Home grouping, /work groups  |
| `status`      | `live` \| `soon` \| `design` \| `dev`  | Status pill                  |
| `tagline`     | string                                 | Cards, case hero             |
| `summary`     | string                                 | /work, metadata              |
| `role`, `stack`, `links` | —                           | Case-study facts             |
| `flow`        | `{ title, detail }[]` (4 items ideal)  | Case-study flow strip        |
| `overview`, `problem`, `approach`, `notes`, `limitations` | — | Case-study body |

## 7. Changes from the previous site

- Removed: Writing section and routes, MDX pipeline, academic/education block, creative-writing copy, JiSave, WhatsApp bot and EUR/USD predictor projects, numbered "case file" labels.
- Added: founder positioning, WAONA product case studies, capabilities, principles, product status console, 404 page.
