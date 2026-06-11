# MAE-6291 Interactive Course

Interactive, self-paced edition of [MAE-6291: Generative AI for Engineering Research](https://barbagroup.github.io/mae6291-genai/) (Prof. Lorena A. Barba, GWU, Spring 2026), rebuilt in the style of Apollo Odyssey tutorials. Course content is © Lorena A. Barba, **CC BY 4.0**; this repo adds the interactive presentation.

Live site: https://natea.github.io/generative-ai-for-research/ (deploys from `main`).
Branches: `main` = deployed; `design-overhaul` = "university press" redesign (PRODUCT.md/DESIGN.md govern it).

## Stack and how the pieces fit

### Vite + React + TypeScript (`app/`)
- Plain SPA, **bun** for everything (`bun install`, `bun run dev`, `bun run build`). Never npm/yarn/pnpm.
- `base: './'` in `vite.config.ts` and **HashRouter** (`/#/lesson/<id>`) so the static build works from GitHub Pages' `/<repo>/` subpath with no rewrite rules. Any fetch of a public asset must resolve against `import.meta.env.BASE_URL`, not `/` (see the notebook fetch in `Viewers.tsx` — absolute paths 404 on Pages).
- No backend. All state is client-side.

### Content pipeline (`app/src/content/`)
- `course.ts` — the single source of truth for course structure: every lesson with its real Google Doc IDs, Google Slides IDs, YouTube IDs, PDF URLs, notebook path, and assignment doc IDs, scraped from the original course site.
- `generated/*.json` — per-lesson summaries, objectives, takeaways, and quizzes (72 questions). These were **authored from the actual lecture notes**, which live as plain-text exports in `research/notes/` (downloaded via the public `docs.google.com/document/d/<ID>/export?format=txt` endpoint). When editing quizzes, stay grounded in those notes — don't invent facts.
- `types.ts` — `ContentBlock` discriminated union (`video | playlist | slides | doc | pdf | notebook | link`); `Viewers.tsx` renders each kind.

### Embedded viewers (`app/src/components/Viewers.tsx`)
- Google Docs embed via `/preview`, Slides via `/embed` — these public docs send no `X-Frame-Options`. If an embed breaks, check headers first; link rot has happened twice (Northwestern PDF → replaced with the author-hosted copy at crockettlab.org; GWU Box link → now login-walled, flagged in its note).
- The class-6 Jupyter notebook (`app/public/jupyter_ai_basics.ipynb`) renders client-side: markdown cells via `marked`, code cells via **highlight.js** (core + Python grammar only, to keep the bundle small; token colors are `--code-*` OKLCH custom properties themed for light/dark).

### Google Colab / Binder (running the notebook)
- The inline notebook is read-only. "Run it yourself" buttons are derived from the GitHub source URL in `notebookLaunchUrls()`:
  - Colab: `colab.research.google.com/github/<owner>/<repo>/blob/<branch>/<file>`
  - Binder: `mybinder.org/v2/gh/<owner>/<repo>/<branch>?labpath=<file>`
- Caveat shown in the UI: `%%ai` magics work in Colab/Binder after `%pip install jupyter_ai_magics` + an API key; the Jupyternaut chat sidebar needs JupyterLab with the [jupyter-ai](https://github.com/jupyterlab/jupyter-ai) extension (the course repo has no Binder env spec, so it's not preinstalled there).

### GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)
- Every push to `main`: checkout → setup-bun → `bun install --frozen-lockfile` → `bun run build` (in `app/`) → upload `app/dist` → deploy-pages. ~30s end to end. Pages is configured with `build_type=workflow` on `natea/generative-ai-for-research` (public repo — required for free Pages).
- To ship the redesign: merge `design-overhaul` into `main`; the workflow does the rest.

### Design system (design-overhaul branch)
- `docs/PRODUCT.md` (register, users, anti-references, principles) and `docs/DESIGN.md` (palette, type, iconography spec) govern all design work — read them before visual changes. (The impeccable skill finds them in `docs/` automatically.)
- Identity: "university press book". OKLCH tokens in `app/src/index.css` — light "paper" theme and dark "reading lamp" theme via `data-theme` on `<html>` (OS-preference default, localStorage `mae6291-theme`, pre-paint bootstrap script in `index.html` to avoid flash).
- Type: STIX Two Text (display/prose), Atkinson Hyperlegible (body/UI), JetBrains Mono (code) — loaded from Google Fonts in `index.html`.
- Icons: hand-drawn 1.5px-stroke SVG set in `Icons.tsx` (currentColor). No emoji in UI.
- A11y bar: WCAG AA — body text ≥4.5:1 in both themes, `:focus-visible` rings, `prefers-reduced-motion` guards, quiz correctness never by color alone.

### impeccable.style (design tooling, local-only)
- The [impeccable](https://impeccable.style) skill is installed at `.claude/skills/impeccable/` (gitignored — `.claude/` is not committed). Invoke via `/impeccable <command>`: `critique` (scored UX review), `polish`, `audit`, `adapt`, `typeset`, `colorize`, etc.
- Critique snapshots persist to `.impeccable/critique/` (the trend tracks score across runs; `polish` reads the latest snapshot as its backlog). Latest: 30/40, 0×P0 / 3×P1.
- Its rules to respect when designing here: no side-stripe `border-left` accents, no gradient text, no per-section uppercase eyebrows, verify contrast, 65–75ch measure.

### Client-side state (`app/src/store/`)
- `progress.ts` — lesson completion + quiz scores in localStorage (`mae6291-progress-v1`), exposed via `useSyncExternalStore`. Per-browser, per-device; no sync.
- `theme.ts` — same pattern for the theme.

## Conventions
- Verify UI changes in the real browser (playwright MCP) in **both themes** before committing; the vite preview server is typically on :4623 (`bunx vite preview --port 4623` from `app/`).
- **Screenshots and other review artifacts go in `docs/design-critique/`, never the project root.** When taking verification screenshots (yours or a subagent's), save them there — or delete them once verified.
- Browsers cache the preview bundle aggressively — bust with a `?v=N` query param when re-checking after a rebuild.
- Keep course content faithful to the source material; the original site is the canonical record of the Spring 2026 semester.
