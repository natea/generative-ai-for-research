# Generative AI for Engineering Research — Interactive Course

An interactive, Apollo-Odyssey-style edition of [MAE-6291: Generative AI for Engineering Research](https://barbagroup.github.io/mae6291-genai/) (Prof. Lorena A. Barba, GWU, Spring 2026). Course content is © Lorena A. Barba, shared under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## What this adds over the original site

The original site is a one-page schedule linking out to Google Docs, Google Slides, PDFs, YouTube, and a Jupyter notebook. This app turns it into a guided learning experience modeled on [Apollo GraphQL's Odyssey tutorials](https://www.apollographql.com/tutorials/):

- **14 lessons** (13 class sessions + the LLM-landscape supplement) with a sidebar outline, prev/next navigation, and per-lesson pages
- **Embedded viewers** — Google Docs lecture notes, Google Slides decks, PDFs, and YouTube videos render inline; the Jupyter notebook is rendered client-side from the actual `.ipynb`
- **Learning objectives and key takeaways** per lesson, written from the actual lecture notes
- **"Check your understanding" quizzes** — 72 multiple-choice questions grounded in the lecture notes, with instant right/wrong feedback and explanations (Odyssey-style)
- **Progress tracking** — mark lessons complete, quiz scores, course progress bar (persisted in `localStorage`)
- **Assignments** (5) embedded in the lessons where they were assigned

## Run it

```sh
cd app
bun install
bun run dev        # dev server
bun run build      # static build to app/dist (HashRouter — hosts anywhere)
bunx vite preview  # serve the build locally
```

## Repo layout

- `app/` — Vite + React + TypeScript SPA
  - `src/content/course.ts` — course structure: every lesson with its real notes/slides/video/PDF/notebook URLs from the original site
  - `src/content/generated/*.json` — per-lesson summaries, objectives, takeaways, and quizzes, authored from the downloaded lecture notes
  - `src/components/Viewers.tsx` — embed viewers (docs, slides, PDF, YouTube, ipynb renderer)
  - `src/components/Quiz.tsx` — interactive quiz with instant feedback
  - `src/store/progress.ts` — localStorage-backed progress store
- `research/notes/` — the course's Google Docs exported as plain text (source material for the quizzes)
- `research/jupyter_ai_basics.ipynb` — the class 6 notebook (also copied to `app/public/`)

## Notes & caveats

- Google Docs/Slides embeds require the documents to remain publicly viewable (they are, as of June 2026).
- The Messeri & Crockett PDF embeds via `<object>` with a fallback link if the host blocks inline viewing.
- Quiz questions were generated from the lecture notes and validated for structure (4 options, exactly one correct); review them before any formal use.
