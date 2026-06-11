# Course app

The interactive front-end for MAE-6291 *Generative AI for Engineering Research* — a Vite + React + TypeScript SPA, no backend. See the [repo README](../README.md) for what the course is and [`../CLAUDE.md`](../CLAUDE.md) for how all the pieces fit; this file covers what's in this directory.

## Run it

```sh
bun install
bun run dev               # dev server with HMR
bun run build             # tsc + vite build → dist/
bunx vite preview         # serve the production build locally
```

Always bun, never npm/yarn/pnpm. The build deploys to GitHub Pages via the workflow in `../.github/workflows/deploy.yml` — `base: './'` in `vite.config.ts` and HashRouter keep it working from the `/<repo>/` subpath, so any fetch of a `public/` asset must go through `import.meta.env.BASE_URL`.

## Layout

```
index.html                  fonts (STIX Two Text, Atkinson Hyperlegible, JetBrains Mono),
                            pre-paint theme bootstrap, meta
public/
  jupyter_ai_basics.ipynb   class-6 notebook, fetched by the notebook viewer
  cc.svg, cc-by.svg         official Creative Commons marks (footer badge)
src/
  App.tsx                   HashRouter: "/" and "/lesson/:lessonId"
  index.css                 the entire design system — OKLCH tokens for the light
                            "paper" / dark "reading lamp" themes, type scale,
                            components, syntax-highlight palette (--code-*)
  pages/
    Home.tsx                hero + progress + Start/Continue CTA, lesson list, CC footer
    LessonPage.tsx          sidebar nav (collapsible on mobile), content blocks,
                            assignment embed, quiz, pager; skip link + designed 404
  components/
    Viewers.tsx             one renderer per ContentBlock kind: YouTube, Google
                            Slides/Docs embeds, PDF <object>, client-side ipynb
                            renderer (marked + highlight.js/python), link cards,
                            Colab/Binder launch buttons
    Quiz.tsx                Odyssey-style check-your-understanding: ARIA radiogroup
                            with roving tabindex, live-region feedback, finishing
                            the quiz marks the lesson complete
    Icons.tsx               hand-drawn 1.5px-stroke SVG icon set (no emoji in UI)
    ThemeToggle.tsx         sun/moon toggle
  content/
    course.ts               course structure: all 14 lessons with their real Google
                            Doc/Slides IDs, YouTube IDs, PDF URLs, assignments
    generated/*.json        per-lesson summaries, objectives, takeaways, quizzes —
                            authored from the actual lecture notes in ../research/notes/
    generated.ts            eager glob-import of those JSONs
    types.ts                ContentBlock union + quiz/lesson types
  store/
    progress.ts             lesson completion + quiz scores (localStorage,
                            useSyncExternalStore) — per browser, no sync
    theme.ts                theme choice (localStorage, OS-preference default)
```

## Conventions

- Design changes are governed by [`../docs/PRODUCT.md`](../docs/PRODUCT.md) and [`../docs/DESIGN.md`](../docs/DESIGN.md) — read them first. WCAG AA in both themes; quiz correctness never by color alone.
- Verify UI changes in a real browser in **both themes** (and at mobile width) before committing.
- Quiz content must stay grounded in the lecture notes (`../research/notes/`) — don't invent facts.
