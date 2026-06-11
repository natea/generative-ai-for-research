import { Link } from 'react-router-dom';
import { courseMeta, lessons } from '../content/course';
import { generatedById } from '../content/generated';
import { useProgress } from '../store/progress';
import { ThemeToggle } from '../components/ThemeToggle';
import { IconArrowRight, IconCheck } from '../components/Icons';

export function Home() {
  const progress = useProgress();
  const completedCount = lessons.filter((l) => progress[l.id]?.completed).length;
  const pct = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="home">
      <ThemeToggle />
      <header className="hero">
        <p className="eyebrow">
          {courseMeta.code} · {courseMeta.term} · {courseMeta.institution}
        </p>
        <h1>{courseMeta.title}</h1>
        <p className="tagline">{courseMeta.tagline}</p>
        <p className="hero-meta">
          By {courseMeta.instructor} · {lessons.length} lessons · Shared under {courseMeta.license} ·{' '}
          <a href={courseMeta.sourceSite} target="_blank" rel="noopener noreferrer">
            Original course site
          </a>
        </p>
        <div className="hero-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span>
            {completedCount} / {lessons.length} lessons completed
          </span>
        </div>
      </header>

      <section className="about-card">
        <h2>About this course</h2>
        <p>
          This graduate course treats fluency with generative AI as a research skill, not a novelty. Engineering
          doctoral students build that fluency directly into their own research workflows: reading and synthesizing
          literature, writing and reasoning about code, and organizing what they know. The goal is not to build AI
          systems but to use them well, with enough understanding of how they work to use them critically.
        </p>
        <p>
          One idea connects everything: <strong>context engineering</strong> — the deliberate design of what an AI
          system sees and remembers. Each lesson below combines the original lecture notes, slides, readings, and
          videos with a short quiz to check your understanding.
        </p>
      </section>

      <section className="lesson-list">
        <h2>Lessons</h2>
        <ol>
          {lessons.map((lesson) => {
            const gen = generatedById[lesson.id];
            const p = progress[lesson.id];
            return (
              <li key={lesson.id}>
                <Link className={`lesson-card ${p?.completed ? 'done' : ''}`} to={`/lesson/${lesson.id}`}>
                  <span className={`lesson-badge ${lesson.number === null ? 'supplement' : ''}`}>
                    {lesson.number ?? '+'}
                  </span>
                  <span className="lesson-card-body">
                    <span className="lesson-card-title">
                      {lesson.title}
                      {p?.completed && (
                        <span className="done-flag">
                          <IconCheck /> Completed
                        </span>
                      )}
                    </span>
                    {gen && <span className="lesson-card-summary">{gen.summary}</span>}
                    <span className="lesson-card-meta">
                      {lesson.number === null ? 'Supplement' : `Class ${lesson.number}`} · {lesson.date}
                      {gen && ` · ${gen.quiz.length}-question quiz`}
                      {lesson.assignment && ` · ${lesson.assignment.title}`}
                      {p?.quizScore && ` · quiz score ${p.quizScore.correct}/${p.quizScore.total}`}
                    </span>
                  </span>
                  <span className="lesson-card-go">
                    <IconArrowRight />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <footer className="site-footer">
        <p>
          Course content © Lorena A. Barba, licensed under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
            CC BY 4.0
          </a>
          . Interactive presentation built from the{' '}
          <a href={courseMeta.sourceSite} target="_blank" rel="noopener noreferrer">
            open course materials
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
