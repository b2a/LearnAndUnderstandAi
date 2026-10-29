/**
 * Die drei Wissensstufen der Lernreise.
 * Neue Stufen hier ergänzen – die Reihenfolge bestimmt die Rangfolge.
 */
export const levels = [
  {
    id: 'einsteiger',
    name: 'Neugierig',
    emoji: '🌱',
    short: 'Einsteiger:in',
    description:
      'Du startest bei den Grundlagen. Wir erklären alles in Alltagssprache – ganz ohne Fachbegriffe.',
  },
  {
    id: 'anwender',
    name: 'Entdecker:in',
    emoji: '🧭',
    short: 'Anwender:in',
    description:
      'Du nutzt KI schon ab und zu. Jetzt schauen wir, was dahintersteckt und wie du mehr herausholst.',
  },
  {
    id: 'profi',
    name: 'Kenner:in',
    emoji: '🚀',
    short: 'Fortgeschritten',
    description:
      'Du kennst dich aus. Wir gehen tiefer: Architekturen, Grenzen, aktuelle Forschung und offene Fragen.',
  },
] as const;

export type LevelId = (typeof levels)[number]['id'];
export const levelIds = levels.map((l) => l.id) as [LevelId, ...LevelId[]];
export const defaultLevel: LevelId = 'einsteiger';

/** Interessen, die im Quiz gewählt werden und Themen markieren. */
export const interests = {
  text: 'Texte schreiben & recherchieren',
  bild: 'Bilder & Videos erstellen',
  audio: 'Sprache, Audio & Musik',
  code: 'Programmieren',
  wissen: 'Wissenschaft & Forschung',
  gesundheit: 'Gesundheit & Medizin',
  arbeit: 'Arbeit & Produktivität',
  lernen: 'Lernen & Bildung',
  technik: 'Roboter & Mobilität',
} as const;

export type InterestId = keyof typeof interests;
export const interestIds = Object.keys(interests) as [InterestId, ...InterestId[]];
