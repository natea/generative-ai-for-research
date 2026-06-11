import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessons } from '../content/course';
import { generatedById } from '../content/generated';
import { Block } from '../components/Viewers';
import { Quiz } from '../components/Quiz';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCircleCheck,
  IconExternal,
  IconPencil,
} from '../components/Icons';
import { setLessonCompleted, useProgress } from '../store/progress';

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const progress = useProgress();
  const [navOpen, setNavOpen] = useState(false);

  const index = lessons.findIndex((l) => l.id === lessonId);
  const lesson = lessons[index];

  useEffect(() => {
    window.scrollTo(0, 0);
    setNavOpen(false);
  }, [lessonId]);

  if (!lesson) {
    return (
      <main className="not-found">
        <p className="eyebrow">Not in the catalog</p>
        <h1>This lesson doesn’t exist.</h1>
        <p className="muted">
          The address may be mistyped, or the lesson may have moved. The course has {lessons.length} lessons — all of
          them are on the home page.
        </p>
        <Link className="btn btn-primary" to="/">
          <IconArrowLeft /> Back to the course
        </Link>
      </main>
    );
  }

  const gen = generatedById[lesson.id];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const completed = progress[lesson.id]?.completed ?? false;
  const completedCount = lessons.filter((l) => progress[l.id]?.completed).length;

  return (
    <div className="lesson-layout">
      <a className="skip-link" href="#lesson-content">
        Skip to lesson content
      </a>
      <aside className="sidebar">
        <ThemeToggle />
        <Link className="sidebar-home" to="/">
          <IconArrowLeft /> Course home
        </Link>
        <div className="sidebar-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(completedCount / lessons.length) * 100}%` }} />
          </div>
          <span>
            {completedCount}/{lessons.length} complete
          </span>
        </div>
        <button
          className="sidebar-nav-toggle"
          aria-expanded={navOpen}
          aria-controls="lesson-nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          {navOpen ? 'Hide lessons' : `All lessons (${lessons.length})`}
        </button>
        <nav aria-label="Lessons" id="lesson-nav" className={navOpen ? 'nav-open' : ''}>
          <ol>
            {lessons.map((l) => (
              <li key={l.id}>
                <Link className={`sidebar-item ${l.id === lesson.id ? 'active' : ''}`} to={`/lesson/${l.id}`}>
                  <span
                    className={`side-badge ${progress[l.id]?.completed ? 'done' : ''} ${l.number === null ? 'supplement' : ''}`}
                  >
                    {l.number ?? '+'}
                  </span>
                  <span className="side-title">{l.title}</span>
                  {progress[l.id]?.completed && (
                    <span className="side-check">
                      <IconCheck />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <main className="lesson-main" id="lesson-content" tabIndex={-1}>
        <p className="eyebrow">
          {lesson.number === null ? 'Supplement' : `Class ${lesson.number}`} · {lesson.date}
        </p>
        <h1>{lesson.title}</h1>

        {gen && (
          <>
            <p className="lesson-summary">{gen.summary}</p>
            <section className="objectives">
              <h2>In this lesson, you will…</h2>
              <ul>
                {gen.objectives.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        <section className="materials">
          {lesson.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>

        {lesson.assignment && (
          <section className="assignment">
            <h2>
              <span className="viewer-tag">
                <IconPencil /> Assignment
              </span>
              {lesson.assignment.title}
            </h2>
            <p>Apply this lesson to your own research — the assignments were written to be domain-specific.</p>
            <div className="frame-doc">
              <iframe
                src={`https://docs.google.com/document/d/${lesson.assignment.googleId}/preview`}
                title={lesson.assignment.title}
              />
            </div>
            <a
              className="viewer-open"
              href={`https://docs.google.com/document/d/${lesson.assignment.googleId}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Docs <IconExternal />
            </a>
          </section>
        )}

        {gen && (
          <section className="takeaways">
            <h2>Key takeaways</h2>
            <ul>
              {gen.keyTakeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </section>
        )}

        {gen && <Quiz lessonId={lesson.id} questions={gen.quiz} />}

        <div className="lesson-actions">
          <button
            className={`btn ${completed ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setLessonCompleted(lesson.id, !completed)}
          >
            {completed ? (
              <>
                <IconCircleCheck /> Completed — click to undo
              </>
            ) : (
              'Mark lesson complete'
            )}
          </button>
          {next && !completed && (
            <button
              className="btn btn-ghost"
              onClick={() => {
                setLessonCompleted(lesson.id, true);
                navigate(`/lesson/${next.id}`);
              }}
            >
              Complete & continue <IconArrowRight />
            </button>
          )}
        </div>

        <nav className="pager" aria-label="Lesson navigation">
          {prev ? (
            <Link className="pager-link" to={`/lesson/${prev.id}`}>
              <span className="pager-dir">
                <IconArrowLeft /> {prev.number === null ? 'Supplement' : `Class ${prev.number}`}
              </span>
              <span>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager-link pager-next" to={`/lesson/${next.id}`}>
              <span className="pager-dir">
                {next.number === null ? 'Supplement' : `Class ${next.number}`} <IconArrowRight />
              </span>
              <span>{next.title}</span>
            </Link>
          ) : (
            <Link className="pager-link pager-next" to="/">
              <span className="pager-dir">
                {completedCount === lessons.length
                  ? 'Course complete — back to overview'
                  : 'Back to course overview'}{' '}
                <IconArrowRight />
              </span>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
