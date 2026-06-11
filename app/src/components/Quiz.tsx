import { useRef, useState } from 'react';
import type { QuizQuestion } from '../content/types';
import { setLessonCompleted, setQuizScore, useProgress } from '../store/progress';
import { IconCheck, IconCircleCheck, IconX } from './Icons';

function Question({
  q,
  index,
  onAnswered,
}: {
  q: QuizQuestion;
  index: number;
  onAnswered: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const correctIndex = q.options.findIndex((o) => o.correct);
  const isCorrect = submitted && selected === correctIndex;

  function submit() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    onAnswered(selected === correctIndex);
  }

  // Roving tabindex + arrow keys, per the WAI-ARIA radio-group pattern.
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    if (submitted) return;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % q.options.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + q.options.length) % q.options.length;
    if (next !== null) {
      e.preventDefault();
      setSelected(next);
      optionRefs.current[next]?.focus();
    }
  }

  const tabStop = selected ?? 0;

  return (
    <div className={`quiz-question ${submitted ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}>
      <p className="quiz-prompt" id={`quiz-q-${index}`}>
        <span className="quiz-num">{index + 1}</span> {q.question}
      </p>
      <div className="quiz-options" role="radiogroup" aria-labelledby={`quiz-q-${index}`}>
        {q.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (!submitted && selected === i) cls += ' selected';
          if (submitted && i === correctIndex) cls += ' reveal-correct';
          if (submitted && selected === i && i !== correctIndex) cls += ' reveal-wrong';
          return (
            <button
              key={i}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              className={cls}
              role="radio"
              aria-checked={selected === i}
              aria-disabled={submitted || undefined}
              tabIndex={i === tabStop ? 0 : -1}
              onClick={() => !submitted && setSelected(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="quiz-bullet">{String.fromCharCode(65 + i)}</span>
              {opt.text}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button className="btn btn-primary quiz-check" disabled={selected === null} onClick={submit}>
          Check answer
        </button>
      ) : (
        <div className={`quiz-feedback ${isCorrect ? 'good' : 'bad'}`} role="status">
          {isCorrect ? <IconCheck /> : <IconX />}
          <span>
            <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong> {q.explanation}
          </span>
        </div>
      )}
    </div>
  );
}

export function Quiz({ lessonId, questions }: { lessonId: string; questions: QuizQuestion[] }) {
  const [results, setResults] = useState<Record<number, boolean>>({});
  const progress = useProgress();
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;
  const done = answered === questions.length;
  const previousScore = progress[lessonId]?.quizScore;

  function record(i: number, ok: boolean) {
    setResults((prev) => {
      const next = { ...prev, [i]: ok };
      if (Object.keys(next).length === questions.length) {
        const score = Object.values(next).filter(Boolean).length;
        setQuizScore(lessonId, score, questions.length);
        // Finishing the quiz is the completion event; the lesson button stays as a manual override.
        setLessonCompleted(lessonId, true);
      }
      return next;
    });
  }

  return (
    <section className="quiz" aria-label="Check your understanding">
      <h2>
        <span className="quiz-icon">
          <IconCircleCheck />
        </span>
        Check your understanding
      </h2>
      <p className="quiz-sub">
        {questions.length} questions, written from this session’s lecture notes. Answering them all marks the lesson
        complete.
        {previousScore && !done && (
          <span className="quiz-previous">
            {' '}
            Your last score: {previousScore.correct}/{previousScore.total}.
          </span>
        )}
      </p>
      {questions.map((q, i) => (
        <Question key={i} q={q} index={i} onAnswered={(ok) => record(i, ok)} />
      ))}
      {done && (
        <div className={`quiz-score ${correct === questions.length ? 'perfect' : ''}`} role="status">
          You got <strong>{correct} of {questions.length}</strong> correct — lesson marked complete.
          {correct === questions.length
            ? ' Perfect score — nicely done!'
            : ' Review the notes above for anything you missed.'}
        </div>
      )}
    </section>
  );
}
