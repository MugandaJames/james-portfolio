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
  Hero            Name in display serif, one-line intro, CTAs; real desktop + phone screenshots
  Now             Status line for WAONA Identity, WAONA Tickets, Pata Nyumba
  #tickets        WAONA Tickets: scroll-pinned walkthrough of the real app, then Studio for organizers
  #identity       WAONA Identity: what it does, with real sign-in and hand-off screenshots
  Pata Nyumba     Typographic block (no screens yet)
  Systems         FinPay and Nyumba with their request flows
  #about          Statement, story, principles, toolkit
  #contact        Email + social links
/work             Index: every project with its lead screenshot or flow
/work/[slug]      Case study: hero, facts, screenshot gallery, flow, overview, approach, beliefs, status
```

## 4. Visual system

The palette comes from the WAONA products. The page background is the WAONA Tickets app background (`#0a1020`), so phone screenshots sit on the page with no visible edge.

| Token          | Value       | Use                                                    |
| -------------- | ----------- | ------------------------------------------------------ |
| `--ink`        | `#0a1020`   | Page background (= WAONA Tickets app background)       |
| `--ink-2`      | `#0d1426`   | Identity section, browser frames                       |
| `--panel`      | `#121a30`   | Raised surfaces                                        |
| `--paper`      | `#eef1f8`   | Primary text                                           |
| `--mist`       | `#9aa3ba`   | Body copy                                              |
| `--cyan`       | `#38d6e8`   | Actions and links (the products' button colour)        |
| `--amber`      | `#f5b544`   | Step numbers and progress (the products' ticket colour)|
| `--violet`     | `#9b8cff`   | "In design" status only                                |

- **Type:** Instrument Sans (WAONA's brand face) for text and headings; Instrument Serif for the name, big statements and step numbers. Both are self-hosted from `src/assets/fonts` (SIL Open Font License), so builds never depend on Google Fonts.
- **No template chrome:** no all-caps eyebrows, no monospace labels, no arrows appended to links, no identical card grids. Numbers appear only where the content is a real sequence (the ticket journey, request flows).
- **Motion:** one load moment in the hero (desktop screenshot slides in, phone rises). The walkthrough's screen changes are driven by scrolling. Everything is disabled under `prefers-reduced-motion`.
- **Layout:** 1240px max width; breakpoints at 1000px (single column, walkthrough becomes one phone per step) and 640px.

## 5. Components

| Component       | File                               | Notes                                                       |
| --------------- | ---------------------------------- | ----------------------------------------------------------- |
| `Phone`         | `src/components/Frames.tsx`        | Real screenshot in a phone; screen colour fills short shots |
| `Browser`       | `src/components/Frames.tsx`        | Real screenshot in a minimal browser window                 |
| `Walkthrough`   | `src/components/Walkthrough.tsx`   | Client component; IntersectionObserver picks the active step|
| `SiteHeader`    | `src/components/Chrome.tsx`        | Serif signature, nav, email button                          |
| `SiteFooter`    | `src/components/Chrome.tsx`        | Copyright + socials                                         |
| `Status`        | `src/components/Chrome.tsx`        | Coloured dot + label, driven by `ProjectStatus`             |
| `CopyrightYear` | `src/components/CopyrightYear.tsx` | Client component for the current year                       |

## 5a. Screenshots (`src/content/shots.ts`)

Real product screenshots copied from the WAONA website repo into `src/assets/shots/`. `shots.ts` holds every image with its alt text, the ticket-journey copy (`ticketJourney`) and the per-project galleries (`galleries`). To add screens for a project, import them there and add them to `galleries[slug]`; the Work index uses the first image as the cover.

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
- Added: founder positioning, real WAONA screenshots, scroll-pinned Tickets walkthrough, screenshot galleries in case studies, principles, toolkit, 404 page.
- Second pass: replaced Geist and the generic dark template (terminal panel, mono labels, card grid) with a palette and type taken from the WAONA products.
