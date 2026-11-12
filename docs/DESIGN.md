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

The home page opens on James, not on a product. Products appear as portfolio work; the interactive pieces are gathered as demos.

```
/                 Home
  Hero            Name (letters lift toward the pointer/finger), who he is, based in + live Nairobi time,
                  what he's doing right now, what he's open to; CTAs
  #work           Selected work: an index of all projects; mouse hover shows a floating preview,
                  touch screens show each row's preview inline
  #about          Statement, story, principles, toolkit
  Marquee         Stack
  #try            Things you can try: interactive ticket (Tickets), sign-in demo (Identity),
                  idempotency demo (FinPay)
  #contact        Email + social links
/work             Index: every project with its lead screenshot or flow
/work/[slug]      Case study: hero, facts, (Tickets only: pinned journey scene), screenshot gallery,
                  flow, overview, approach, beliefs, status
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
- **Motion:** see section 4a.
- **Layout:** 1240px max width; breakpoints at 1000px (single column, walkthrough becomes one phone per step) and 640px.


## 4a. Motion and interaction

The idea: the interactions are the products' own mechanics, so the site demonstrates the work instead of describing it.

| Piece | Where | What it does | Built with |
| ----- | ----- | ------------ | ---------- |
| Smooth scroll | Whole site | Inertial scrolling synced to every scroll scene | Lenis + GSAP ticker (`motion/SmoothScroll.tsx`) |
| Custom cursor | Whole site, mouse only | Dot + trailing ring; grows over links and shows a label from `data-cursor` | GSAP `quickTo` (`motion/Cursor.tsx`) |
| Hero entrance | Home | Name rises letter by letter, then the copy follows (one orchestrated moment) | GSAP SplitText timeline (`Hero.tsx`) |
| Name letters | Home hero | After the entrance, letters near the pointer (or a finger dragged across) lift and lean | GSAP `quickTo` (`Hero.tsx`) |
| Live clock | Home hero | Nairobi local time, updated every 15 seconds | `Intl.DateTimeFormat` (`Hero.tsx`) |
| Work index preview | Home, mouse only | A preview of the hovered project floats beside the pointer and tilts with its speed; other rows dim. Touch screens show previews inline | GSAP `quickTo` (`WorkIndex.tsx`) |
| Magnetic buttons | Hero CTAs, contact email | Pull toward the pointer, spring back | `motion/Magnetic.tsx` |
| Stack marquee | Below hero | Endless row; speeds up, reverses and skews with scroll velocity | ScrollTrigger velocity (`motion/Marquee.tsx`) |
| Interactive ticket | Tickets | Tilts with a moving sheen; press to flip to a QR code that opens waona.ke | CSS 3D + GSAP CSS variables (`TicketCard.tsx`) |
| Pinned journey | WAONA Tickets case study | Section pins; each real screen wipes up over the last, copy swaps, rail fills, snaps per step | ScrollTrigger pin + scrub + snap (`Walkthrough.tsx`) |
| Sign-in demo | Identity | Plays the real flow with sample data: app hands off, form fills, decoded ID-token claims appear | React state (`IdentityDemo.tsx`) |
| Idempotency demo | FinPay | Send a payment, retry it with the same key: the retry stops at the idempotency check and the balance is charged once | React state (`IdempotencyDemo.tsx`) |
| Scroll progress | Whole site | Thin cyan-to-amber bar along the top fills as you read | ScrollTrigger scrub (`motion/ScrollProgress.tsx`) |
| Mobile menu | Phones (≤640px) | Full-screen panel opens as a circle growing from the button; links rise in; Esc closes | GSAP timeline (`MobileMenu.tsx`) |
| Phone tilt | Ticket (Android) | The ticket catches the light as the phone tilts | `deviceorientation` (`motion/device.ts`) |
| Journey carousel | Tickets, below 1000px | Swipeable row; each phone scales into focus at the centre; dots follow and can be tapped | CSS scroll-snap + `--focus` variable (`Walkthrough.tsx`) |
| Haptics | Ticket flip, carousel steps, demos, menu (Android) | Short vibrations at key moments | `navigator.vibrate` (`motion/device.ts`) |
| Heading reveals | Chapter headings only | Lines rise out of a mask on first view | SplitText + ScrollTrigger (`motion/Reveal.tsx`) |

Rules:
- **Reduced motion:** Lenis, the cursor, tilt, magnetic pull, marquee and reveals are all skipped; the Tickets scene becomes a stacked list; demos run instantly.
- **Touch devices:** no custom cursor or magnetic pull (they need a mouse). Instead: drag the ticket to tilt it and tap to flip; drag across the hero to lean the device stack; motion-sensor tilt on Android (iOS would need a permission prompt, so it's skipped); swipeable journey carousel; press feedback on buttons; haptics on Android. Scroll parallax, reveals, the marquee and the progress bar work on every device.
- **No flash:** an inline script adds `.js` to `<html>` before paint; entrance states are hidden only under `.js` and `prefers-reduced-motion: no-preference`.
- **Accessibility:** the pinned scene is `aria-hidden`; the same steps exist as a visually hidden list for screen readers. Demos announce changes with `aria-live`.
- **Demos are labelled as demos** and use sample data only.

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
- Fifth pass: portfolio-first home. Opens on James (name, who he is, live Nairobi time, what he's doing now) instead of WAONA Tickets; selected-work index with floating previews; demos gathered under "Things you can try"; the pinned Tickets scene moved to the Tickets case study.
- Fourth pass: mobile-first interactions (journey carousel, touch-drag ticket, motion-sensor tilt, haptics, animated mobile menu, scroll progress, hero parallax and float, press feedback).
- Third pass: GSAP + Lenis motion system, interactive ticket, Identity sign-in demo, FinPay idempotency demo, pinned Tickets scene, custom cursor, magnetic buttons, velocity marquee, footer wordmark.
- Second pass: replaced Geist and the generic dark template (terminal panel, mono labels, card grid) with a palette and type taken from the WAONA products.
