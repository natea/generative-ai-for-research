---
target: the whole design of the site
total_score: 30
p0_count: 0
p1_count: 3
timestamp: 2026-06-11T21-54-09Z
slug: app-src
---
# Critique: whole site design (design-overhaul branch)

## Design Health Score — 30/40 (Good)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No "continue where you left off" cue; stored quiz scores invisible on revisit |
| 2 | Match System / Real World | 4 | Course language, "Class 6 · Feb 17", librarian-checkmark completion — excellent |
| 3 | User Control and Freedom | 2 | No quiz retry without reload; mobile sidebar can't collapse; completion undo exists |
| 4 | Consistency and Standards | 3 | Selected quiz option shares hue with "wrong" state; disabled role=radio breaks ARIA pattern |
| 5 | Error Prevention | 4 | Check disabled until selection; PDF/notebook fallbacks designed |
| 6 | Recognition Rather Than Recall | 3 | Mobile sidebar is a clipped 320px scroll-box hiding position |
| 7 | Flexibility and Efficiency | 2 | No skip link, no arrow-key radios, no shortcuts |
| 8 | Aesthetic and Minimalist Design | 3 | 90–120-word card summaries ×14; 9,600px lesson pages |
| 9 | Error Recovery | 3 | Good quiz explanations; "Lesson not found" is undesigned plain text |
| 10 | Help and Documentation | 3 | Great Colab/Binder context help; localStorage-only persistence never disclosed |
| **Total** | | **30/40** | **Good — solid foundation, address weak areas** |

## Anti-Patterns Verdict

LLM assessment: mostly cleared — no gradient text, no identical card grids, no per-section eyebrows; cream is doing deliberate brand work (named press references, restrained chroma, true type pairing, first-class dark twin). Caveat: "cream + serif + oxblood academic" is becoming the tasteful-AI register of 2026; the identity lacks one ownable gesture beyond the palette.

Deterministic scan (5 findings, exit 2): side-tab ×3 (index.css:490 objectives/takeaways, :677 nb-code, :737 assignment — border-left:3px accents, a banned pattern; runtime overlay confirmed on lesson pages), layout-transition ×1 (index.css:252 `transition: width` on progress fill), single-font ×1 (index.html — partial false positive: Atkinson + JetBrains Mono are loaded in the same Google Fonts link; rule under-read the head).

Runtime overlay (injected on 3 pages): line-length pervasive (up to ~124ch; ~56 hits on class-06 — matches the reviewer's .lesson-summary measure finding), monotonous-spacing (~4px gap used 96–100% of the time on home/class-06).

## Overall Impression

The university-press identity is real and consistently executed; the quiz interaction is the best moment on the site. The biggest opportunity is the other end of the emotional arc: selection-state anxiety in the quiz, a flat completion beat, and a mobile lesson-opening that buries content under a 320px nav block.

## What's Working

1. Typographic identity carried everywhere — STIX small-caps kickers, lettered roundels, hairline borders, no drift across pages.
2. Quiz feedback design — icon + word + explanation, correct answer revealed, never color alone, check gated on selection.
3. Embed stewardship — typed caption rows, native escape hatches, honest Colab/Binder guidance about API keys.

## Priority Issues

- **[P1] Selected quiz state looks like the "wrong" state.** --accent and --bad share hue 25 at near-identical lightness/chroma; picking an answer paints it the same red as an incorrect reveal. Fix: selection = ink border + accent-wash only (or brass); reserve red for incorrect. Suggested: /impeccable polish
- **[P1] Quiz is silent for screen readers; radio pattern broken.** No aria-live on feedback; role=radio buttons without roving tabindex/arrow keys; options drop from tab order via disabled after submit; no skip-to-content link past 14 sidebar links. Suggested: /impeccable audit → polish
- **[P1] Mobile lesson header. ** 320px scroll-trapped sidebar opens every lesson (clipped mid-word); fixed theme toggle floats over content while scrolling. Fix: collapse nav into a disclosure; static header row for the toggle. Suggested: /impeccable adapt
- **[P2] Home is a 10,910px mobile scroll.** 90–120-word summaries per card; clamp to 2 lines or drop from cards. Suggested: /impeccable distill
- **[P2] Brass meta fails AA in light theme.** 4.34:1 on --bg-raised at 0.9rem (.lesson-card-meta); darken brass to ~L0.50 light. Also: side-stripe borders ×3 are a banned pattern — replace with full borders/background tints; line length on .lesson-summary and prose exceeds the system's own 70ch rule. Suggested: /impeccable polish

## Persona Red Flags

Jordan (first-timer): no Start/Continue CTA; quiz↔completion relationship unstated (can complete with 0 answered); nested scrollbars in doc frames; selected-answer-turns-red confusion.

Sam (screen reader/keyboard): no skip link; silent quiz results; disabled options leave tab order; radio group without arrow keys. (Positives: titled iframes, aria-hidden icons, real focus ring, icon+text correctness.)

Casey (mobile one-handed): 320px sidebar block atop every lesson; floating toggle overlaps headings; 80–82vh inner scroll traps (doc/notebook); "Complete & continue" ~9,000px down.

## Minor Observations

- .lesson-summary ~100+ ch/line at 1440px (system rule: 70ch)
- Last-lesson pager says "Course complete" by position, not completion
- Re-answering silently overwrites stored quiz score
- "Lesson not found" route unstyled
- localStorage device-locality never disclosed
- Dark-theme contrast uniformly excellent (5.5–13.7:1); reduced-motion correctly gated
- Disabled "Check answer" buttons still read as 5 stacked CTAs in light mode
- monotonous-spacing: ~4px gap dominates (96–100%) — vary rhythm

## Questions to Consider

1. The lesson content lives in white Google-Doc iframes the design can't touch — is this a reading instrument or a beautiful frame around someone else's unstyled reading? CC BY 4.0 permits converting notes to native, themeable HTML.
2. Should a passed quiz BE the completion event, given PRODUCT.md defines success as "can answer the quizzes"?
3. What's the one ownable gesture (colophon at lesson end, ribbon-bookmark progress motif, frontispiece per class) that would survive a competitor copying the palette?
