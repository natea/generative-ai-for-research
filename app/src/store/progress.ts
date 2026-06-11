import { useSyncExternalStore } from 'react';

export interface LessonProgress {
  completed: boolean;
  quizScore?: { correct: number; total: number };
}

type ProgressState = Record<string, LessonProgress>;

const STORAGE_KEY = 'mae6291-progress-v1';

function load(): ProgressState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

let state: ProgressState = load();
const listeners = new Set<() => void>();

function emit() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export function setLessonCompleted(id: string, completed: boolean) {
  state = { ...state, [id]: { ...state[id], completed } };
  emit();
}

export function setQuizScore(id: string, correct: number, total: number) {
  state = { ...state, [id]: { completed: state[id]?.completed ?? false, quizScore: { correct, total } } };
  emit();
}

export function resetProgress() {
  state = {};
  emit();
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}
