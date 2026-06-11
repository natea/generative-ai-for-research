import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'mae6291-theme';

function preferred(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let theme: Theme = preferred();
const listeners = new Set<() => void>();

function apply() {
  document.documentElement.dataset.theme = theme;
}
apply();

export function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem(STORAGE_KEY, theme);
  apply();
  listeners.forEach((l) => l());
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => theme,
  );
}
