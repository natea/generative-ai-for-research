import type { GeneratedLessonContent } from './types';

// Lesson summaries/objectives/quizzes authored from the actual lecture notes,
// one JSON file per lesson. eager: true so missing files fail at build, not runtime.
const modules = import.meta.glob<{ default: GeneratedLessonContent }>('./generated/*.json', {
  eager: true,
});

export const generatedById: Record<string, GeneratedLessonContent> = {};
for (const mod of Object.values(modules)) {
  generatedById[mod.default.id] = mod.default;
}
