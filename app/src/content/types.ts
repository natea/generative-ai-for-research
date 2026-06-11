export type ContentBlock =
  | { kind: 'video'; youtubeId: string; title: string; note?: string }
  | { kind: 'playlist'; youtubeId: string; playlistId: string; title: string; note?: string }
  | { kind: 'slides'; googleId: string; title: string }
  | { kind: 'doc'; googleId: string; title: string }
  | { kind: 'pdf'; url: string; title: string; note?: string }
  | { kind: 'notebook'; path: string; title: string; sourceUrl: string }
  | { kind: 'link'; url: string; title: string; note?: string };

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation: string;
}

/** Authored from the actual lecture notes (research/notes/*.txt). */
export interface GeneratedLessonContent {
  id: string;
  summary: string;
  objectives: string[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
}

export interface Assignment {
  title: string;
  googleId: string;
}

export interface Lesson {
  id: string;
  number: number | null; // null for supplements/interludes
  date: string;
  title: string;
  blocks: ContentBlock[];
  assignment?: Assignment;
}
