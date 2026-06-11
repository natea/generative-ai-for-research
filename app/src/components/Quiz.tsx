import { useState } from 'react';
import type { QuizQuestion } from '../content/types';
import { setQuizScore } from '../store/progress';

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

  const correctIndex = q.options.findIndex((o) => o.correct);
  const isCorrect = submitted && selected === correctIndex;

  function submit() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    onAnswered(selected === correctIndex);
  }

  return (
    <div className={`quiz-question ${submitted ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}>
      <p className="quiz-prompt">
        <span className="quiz-num">{index + 1}</span> {q.question}
      </p>
      <div className="quiz-options" role="radiogroup" aria-label={`Question ${index + 1}`}>
        {q.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (!submitted && selected === i) cls += ' selected';
          if (submitted && i === correctIndex) cls += ' reveal-correct';
          if (submitted && selected === i && i !== correctIndex) cls += ' reveal-wrong';
          return (
            <button
              key={i}
              className={cls}
              role="radio"
              aria-checked={selected === i}
              disabled={submitted}
              onClick={() => setSelected(i)}
            >
              <span className="quiz-bullet">{String.fromCharCode(65 + i)}</span>
              {opt.text}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button className="btn btn-primary" disabled={selected === null} onClick={submit}>
          Check answer
        </button>
      ) : (
        <div className={`quiz-feedback ${isCorrect ? 'good' : 'bad'}`}>
          <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong> {q.explanation}
        </div>
      )}
    </div>
  );
}

export function Quiz({ lessonId, questions }: { lessonId: string; questions: QuizQuestion[] }) {
  const [results, setResults] = useState<Record<number, boolean>>({});
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;
  const done = answered === questions.length;

  function record(i: number, ok: boolean) {
    setResults((prev) => {
      const next = { ...prev, [i]: ok };
      if (Object.keys(next).length === questions.length) {
        const score = Object.values(next).filter(Boolean).length;
        setQuizScore(lessonId, score, questions.length);
      }
      return next;
    });
  }

  return (
    <section className="quiz" aria-label="Check your understanding">
      <h2>
        <span className="quiz-icon">✓</span> Check your understanding
      </h2>
      <p className="quiz-sub">
        {questions.length} questions, written from this session’s lecture notes. Pick an answer, then check it for
        instant feedback.
      </p>
      {questions.map((q, i) => (
        <Question key={i} q={q} index={i} onAnswered={(ok) => record(i, ok)} />
      ))}
      {done && (
        <div className={`quiz-score ${correct === questions.length ? 'perfect' : ''}`}>
          You got <strong>{correct} of {questions.length}</strong> correct.
          {correct === questions.length
            ? ' Perfect score — nicely done!'
            : ' Review the notes above for anything you missed, then mark the lesson complete.'}
        </div>
      )}
    </section>
  );
}
