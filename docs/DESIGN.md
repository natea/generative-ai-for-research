# Design

Visual system for the interactive MAE-6291 course. Register: brand (design is part of the appeal). Voice: scholarly, warm, confident — a university-press book that happens to be interactive. Named references: Chicago/Harvard press book jackets (cream + oxblood), Edward Tufte's self-published volumes (generous margins, ink-first), reading-lamp warmth for dark mode. Anti-reference: neon-gradient AI-product chrome.

## Color

OKLCH throughout. Two first-class themes; `data-theme` on `<html>`, defaulting to OS preference, persisted in localStorage.

### Light — "paper"

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.975 0.012 85)` | warm cream page |
| `--bg-raised` | `oklch(0.955 0.014 85)` | panels, sidebar |
| `--bg-card` | `oklch(0.93 0.016 83)` | option rows, code chips |
| `--border` | `oklch(0.86 0.02 80)` | hairlines |
| `--ink` | `oklch(0.25 0.02 60)` | primary text (≥12:1 on bg) |
| `--ink-dim` | `oklch(0.45 0.025 60)` | secondary text (≥7:1) |
| `--accent` | `oklch(0.45 0.14 25)` | oxblood/madder — links, primary buttons, active states |
| `--accent-ink` | `oklch(0.99 0.005 85)` | text on accent |
| `--brass` | `oklch(0.55 0.09 75)` | secondary highlight (kickers, in-progress) |
| `--good` | `oklch(0.46 0.1 155)` | correct/complete (with icon, never color alone) |
| `--bad` | `oklch(0.5 0.14 25)` | incorrect |

### Dark — "reading lamp"

Backgrounds: `oklch(0.22 0.015 60)` / `0.255` / `0.30`; border `oklch(0.36 0.02 60)`; ink `oklch(0.92 0.015 85)` (parchment); dim `oklch(0.74 0.02 80)`; accent lifts to `oklch(0.7 0.13 30)`; brass `oklch(0.75 0.09 80)`; good `oklch(0.72 0.1 155)`; bad `oklch(0.7 0.14 25)`.

Strategy: committed two-hue restraint (madder + brass on warm neutrals). Color carries identity; it is never the only carrier of state.

## Typography

| Family | Role | Weights |
|---|---|---|
| STIX Two Text | display headings, lesson titles, long prose accents | 400, 600, 700 + italics |
| Atkinson Hyperlegible | body, UI, labels, quiz controls | 400, 700 |
| JetBrains Mono | code, notebook cells | 400 |

- Body 17px/1.65, max measure 70ch.
- Modular scale ≥1.25; H1 `clamp(2rem, 4.5vw, 3.25rem)`, letter-spacing ≥ −0.02em.
- `text-wrap: balance` on h1–h3; `text-wrap: pretty` on prose.
- Small caps (real `font-variant-caps` on STIX) for kickers/metadata instead of tracked-uppercase pills.

## Iconography

Inline SVG, 1.5px stroke, `currentColor`, 20px grid (lucide-style geometry), one set in `Icons.tsx`: play, presentation, file-text, book-open, terminal/notebook, external-link, link, check, circle-check, arrow-left/right, pencil (assignment), sun, moon. No emoji in UI.

## Components

- **Lesson card**: hairline border, paper surface, serif title, numbered roundel (accent ring, brass when supplement), check-pill when complete. Hover: border→accent, no lift-and-shadow theatrics.
- **Buttons**: solid accent (primary), hairline (secondary), text+icon (ghost). 8px radius — bookish, not pill.
- **Viewer frames**: hairline border, 10px radius; caption row = icon + small-caps label + title + "open ↗" link.
- **Quiz**: serif question, lettered option rows; correct = green border + check icon + "Correct"; incorrect = red border + x icon + "Not quite". Feedback always icon+word, never color alone.
- **Progress**: thin track, accent fill; completion check in `--good`.
- **Theme toggle**: fixed top-right icon button, sun/moon.

## Motion

Quiet: 120–180ms ease-out on hover/selection; one subtle page-level fade on lesson change. Everything inside `@media (prefers-reduced-motion: no-preference)`.
