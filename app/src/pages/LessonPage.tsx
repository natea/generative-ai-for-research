import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessons } from '../content/course';
import { generatedById } from '../content/generated';
import { Block } from '../components/Viewers';
import { Quiz } from '../components/Quiz';
import { setLessonCompleted, useProgress } from '../store/progress';

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const progress = useProgress();

  const index = lessons.findIndex((l) => l.id === lessonId);
  const lesson = lessons[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="lesson-layout">
        <main className="lesson-main">
          <p>Lesson not found.</p>
          <Link to="/">← Back to course</Link>
        </main>
      </div>
    );
  }

  const gen = generatedById[lesson.id];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const completed = progress[lesson.id]?.completed ?? false;
  const completedCount = lessons.filter((l) => progress[l.id]?.completed).length;

  return (
    <div className="lesson-layout">
      <aside className="sidebar">
        <Link className="sidebar-home" to="/">
          ← Course home
        </Link>
        <div className="sidebar-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(completedCount / lessons.length) * 100}%` }} />
          </div>
          <span>
            {completedCount}/{lessons.length} complete
          </span>
        </div>
        <nav aria-label="Lessons">
          <ol>
            {lessons.map((l) => (
              <li key={l.id}>
                <Link className={`sidebar-item ${l.id === lesson.id ? 'active' : ''}`} to={`/lesson/${l.id}`}>
                  <span className={`side-badge ${progress[l.id]?.completed ? 'done' : ''}`}>
                    {l.number ?? '+'}
                  </span>
                  <span className="side-title">{l.title}</span>
                  {progress[l.id]?.completed && <span className="side-check">✓</span>}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <main className="lesson-main">
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
              <span className="viewer-tag tag-assignment">Assignment</span> {lesson.assignment.title}
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
              Open in Google Docs ↗
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
            {completed ? '✓ Completed — click to undo' : 'Mark lesson complete'}
          </button>
          {next && !completed && (
            <button
              className="btn btn-ghost"
              onClick={() => {
                setLessonCompleted(lesson.id, true);
                navigate(`/lesson/${next.id}`);
              }}
            >
              Complete & continue →
            </button>
          )}
        </div>

        <nav className="pager" aria-label="Lesson navigation">
          {prev ? (
            <Link className="pager-link" to={`/lesson/${prev.id}`}>
              ← {prev.number === null ? 'Supplement' : `Class ${prev.number}`}
              <span>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager-link pager-next" to={`/lesson/${next.id}`}>
              {next.number === null ? 'Supplement' : `Class ${next.number}`} →
              <span>{next.title}</span>
            </Link>
          ) : (
            <Link className="pager-link pager-next" to="/">
              Course complete — back to overview →
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
