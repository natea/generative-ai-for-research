import type { Lesson } from './types';

export const courseMeta = {
  code: 'MAE-6291',
  term: 'Spring 2026',
  title: 'Generative AI for Engineering Research',
  tagline:
    'Using generative AI as an instrument for research: practical skills and critical judgment grounded in technical depth.',
  instructor: 'Prof. Lorena A. Barba',
  institution: 'The George Washington University',
  license: 'CC BY 4.0',
  sourceSite: 'https://barbagroup.github.io/mae6291-genai/',
};

export const lessons: Lesson[] = [
  {
    id: 'class-01',
    number: 1,
    date: 'Jan 13',
    title: 'Course introduction; AI-for-science overview; the illusion of knowledge',
    blocks: [
      { kind: 'doc', googleId: '1Upjk7-1Wvt46tLM_yyDG-P-_Eu5YFg9AgY9YNqmjVes', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1IO-K33HjwRKBFXELbMcIGp1PJ0nNP9uw5hv_7-Ciets', title: 'Slides' },
      {
        kind: 'pdf',
        // Author-hosted open copy (crockettlab.org); the Northwestern URL the
        // original course site linked now 404s and sent X-Frame-Options anyway.
        url: 'https://www.crockettlab.org/s/MesseriCrockett_2024_Nature.pdf',
        title: 'Messeri & Crockett (2024) — Artificial intelligence and illusions of understanding in scientific research',
        note: 'Required reading (Nature)',
      },
      { kind: 'video', youtubeId: 'd95J8yzvjbQ', title: 'The Thinking Game' },
      { kind: 'video', youtubeId: '2IK3DFHRFfw', title: 'Generative AI in a Nutshell', note: 'Explainer in 18 min' },
    ],
  },
  {
    id: 'class-02',
    number: 2,
    date: 'Jan 20',
    title: 'Foundations of generative AI: neural networks, transformers, attention; reasoning, chain-of-thought; context, tool use, RAG',
    blocks: [
      { kind: 'doc', googleId: '1jPUtgXzqawJHhcRAfnCxrOJlCYqsggEAJoD1x9SdoiE', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1H4KwDLIjdCLdsPkPWANsnr-qewui19Jal3vDk7v4nBE', title: 'Slides' },
      {
        kind: 'playlist',
        youtubeId: 'aircAruvnKk',
        playlistId: 'PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
        title: '3Blue1Brown: Neural networks video course',
      },
      {
        kind: 'link',
        url: 'https://www.deeplearning.ai/short-courses/how-transformer-llms-work/',
        title: '"How Transformer LLMs Work" — DeepLearning.AI short course',
        note: 'To do before next class',
      },
    ],
    assignment: { title: 'Assignment 1', googleId: '11x8GsQGOEjXJ0VDWVpg813LMU6YmBN35UTZXGL9-2Zs' },
  },
  {
    id: 'class-03',
    number: 3,
    date: 'Jan 27',
    title: 'Current LLM landscape; open models; reasoning models deep dive; long context; mixture-of-experts',
    blocks: [
      { kind: 'doc', googleId: '1HMfTGqcsgPJZvbgpyKEqwE8SHroqWhCd4O8nS9IJC84', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1FVMp_xPr7xwlceIj5dFnagHao3iniSQ6uaelKIpIq3A', title: 'Slides' },
      {
        kind: 'link',
        url: 'https://sequoiacap.com/article/generative-ais-act-o1/',
        title: "Generative AI's Act o1: The Reasoning Era Begins — Sequoia Capital",
        note: 'Required reading',
      },
    ],
  },
  {
    id: 'class-04',
    number: 4,
    date: 'Feb 3',
    title: 'AI-enhanced literature review; semantic discovery tools; deep research agents; from tools to agents',
    blocks: [
      { kind: 'doc', googleId: '1M72Iv_U5HpwDvS86wHHTavlKDEUFUhuVb7DEdl6CuiE', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1pHQUOzkXbzqIUHMCsc34w3tNvoWLUAVhU_asLMYBm-A', title: 'Slides' },
      {
        kind: 'video',
        youtubeId: 'OdCmZvPdr4s',
        title: 'How to Use NotebookLM Better than 99% of People',
        note: 'Find more video links in the notes and slides',
      },
    ],
    assignment: { title: 'Assignment 2', googleId: '1yu7VGDxq5x1o_6J1PMl4quu7DlcVUu6wjQ-DBJIaGt0' },
  },
  {
    id: 'class-05',
    number: 5,
    date: 'Feb 10',
    title: 'Using LLMs via API; GitHub Copilot and workflows; generative AI in Jupyter notebooks; custom automations',
    blocks: [
      { kind: 'doc', googleId: '1oUglWvt_7K4QmSvJqVKWRkt7-v7etSv-LPTnHXDn7ME', title: 'Lecture notes' },
      {
        kind: 'link',
        url: 'https://gwu.box.com/s/nfo5s2qfyaoe6ynr82ylebtship6rzdv',
        title: 'Case study notes on the tocify repository',
        note: 'Required reading — now requires a GWU Box login (no longer publicly shared)',
      },
      { kind: 'video', youtubeId: 'n0NlxUyA7FI', title: 'Getting started with GitHub Copilot' },
    ],
  },
  {
    id: 'class-06',
    number: 6,
    date: 'Feb 17',
    title: 'AI integration in Jupyter notebooks via the Jupyter AI extension (hands-on)',
    blocks: [
      {
        kind: 'notebook',
        path: '/jupyter_ai_basics.ipynb',
        title: 'Jupyter AI basics (hands-on notebook)',
        sourceUrl: 'https://github.com/barbagroup/mae6291-genai/blob/main/jupyter_ai_basics.ipynb',
      },
      {
        kind: 'video',
        youtubeId: 'l5DhqN3su0o',
        title: 'Real-time Collaboration Is Not Just for Humans Anymore',
      },
      {
        kind: 'link',
        url: 'https://www.deeplearning.ai/short-courses/jupyter-ai-coding-in-notebooks/',
        title: 'Jupyter AI: AI Coding in Notebooks — DeepLearning.AI short course',
        note: 'Supplementary',
      },
      {
        kind: 'link',
        url: 'https://www.deeplearning.ai/short-courses/ai-python-for-beginners/',
        title: 'AI Python for Beginners — DeepLearning.AI short course',
        note: 'Supplementary',
      },
    ],
    assignment: { title: 'Assignment 3', googleId: '1K-FreM-jKcoJ8ssc83eWNdV6NJYQG2V-kfwE90VIOqo' },
  },
  {
    id: 'supplement-llm-landscape',
    number: null,
    date: 'Mar 3',
    title: 'Class supplement: the LLM landscape',
    blocks: [
      { kind: 'doc', googleId: '1zWl5-_rY0qPkVTB_Um7coT2McV5kZXIzb6IgGcCPa24', title: 'Class Supplement: LLM Landscape' },
    ],
  },
  {
    id: 'class-07',
    number: 7,
    date: 'Mar 17',
    title: 'AI-assisted coding: from autocomplete to agentic engineering; Copilot, Claude Code, CLI agents; MCP and skills',
    blocks: [
      { kind: 'doc', googleId: '11U4V1y_C6PquM63eNdpER-SxdmtoJDalMOnCv66o7ZA', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1DtLuMArXleGhZrhtpOjH3krTIGkqj91UxZZS-lgC44E', title: 'Slides' },
      { kind: 'video', youtubeId: 'ntDIxaeo3Wg', title: 'Claude Code — Full Tutorial for beginners' },
    ],
  },
  {
    id: 'class-08',
    number: 8,
    date: 'Mar 24',
    title: 'Agentic coding practicum: building a research skill from scratch; the SKILL.md conventions',
    blocks: [
      { kind: 'doc', googleId: '1jvCN4E6DFi0kY8_OggqtguclatLysmUfXdL02d6r0zE', title: 'Lecture notes' },
      {
        kind: 'link',
        url: 'https://github.com/labarba/sciwrite',
        title: 'sciwrite — the skill built in class',
        note: 'GitHub repository',
      },
    ],
  },
  {
    id: 'class-09',
    number: 9,
    date: 'Mar 31',
    title: 'Skills as infrastructure: evaluating, designing, and evolving agent-readable skills',
    blocks: [
      { kind: 'doc', googleId: '1ggZERhDedfp-eXhaoNW95e6peKrGryR-lv9TGbRDb9o', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1XyqoQSHHMGFpCmkxHGeCnHjK_1WM2vMmnHuC6UXQHMQ', title: 'Slides' },
    ],
  },
  {
    id: 'class-10',
    number: 10,
    date: 'Apr 7',
    title: 'Context engineering and agent design for research; the attention budget; context hygiene; memory',
    blocks: [
      { kind: 'doc', googleId: '1SJvvBSfrGy0BFYK1J8KC04llG1wNQAucEYNV3KS8RuA', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1lj8AXxc5Bv6VC6TzxZX3eD4kMETVTmR_pH7PZn5F-64', title: 'Slides' },
    ],
    assignment: { title: 'Assignment 4', googleId: '17PmMvgj48VytjiKx2GuudADWtlOzJdYWhVWw8Qhwc4s' },
  },
  {
    id: 'class-11',
    number: 11,
    date: 'Apr 14',
    title: 'Agentic research flow via context engineering; a compounding research codebase: testing, version control, repository structure',
    blocks: [
      { kind: 'doc', googleId: '1mhSCbRu-Gqdy8VaI_gAOhrHT23kmgZakGDywuEeOPQM', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1hjWE9EC9ASZDZ_fG60l_jd75mJ184gEnXpSXmMHCJKk', title: 'Slides' },
    ],
  },
  {
    id: 'class-12',
    number: 12,
    date: 'Apr 21',
    title: 'AI support for organizing and presenting research knowledge: diagramming, slide creation, note-taking, personal knowledge base',
    blocks: [
      { kind: 'doc', googleId: '1zVA7fLE8sZcMvDdCrEYSQJZv1uYyIFUoaCdLCWnaTEE', title: 'Lecture notes' },
      { kind: 'slides', googleId: '1JimLYN5VlM4JJ_eu54bDwaxek3e0Ws-mrnaCMG8VRJ8', title: 'Slides' },
    ],
    assignment: { title: 'Assignment 5', googleId: '1fK_F23yqyo9R8cGaq6QGvhUVk38__frNiuYHQg1JQwM' },
  },
  {
    id: 'class-13',
    number: 13,
    date: 'Apr 28',
    title: 'Organizing knowledge with AI; using AI as a tool for thought. RAG vs. the LLM-wiki pattern. Lessons for the working researcher.',
    blocks: [
      { kind: 'doc', googleId: '1cU0s5cUAvLYt-VuYs3hP5H-jBTQ1p4COz-qtGbiF76E', title: 'Lecture notes' },
      {
        kind: 'video',
        youtubeId: '3lPnN8omdPA',
        title: 'How to Stop AI from Killing Your Critical Thinking | Advait Sarkar | TED',
      },
    ],
  },
];
