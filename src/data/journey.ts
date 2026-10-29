/**
 * Ablauf der Lernreise – die Stationen werden in dieser Reihenfolge angezeigt.
 *
 *  type "kapitel"       → Text aus src/content/kapitel/<id>.mdx
 *  type "themen"        → Alle Themen-Karten aus src/content/themen/
 *  type "meilensteine"  → Zeitstrahl aus src/data/meilensteine.json
 *  type "zukunft"       → Ausblick aus src/data/zukunft.json
 *
 * Station hinzufügen / umsortieren / entfernen = diese Liste bearbeiten.
 */
export type Station = {
  id: string;
  type: 'kapitel' | 'themen' | 'meilensteine' | 'zukunft';
  /** Für kapitel optional – sonst wird der Titel aus der MDX-Datei genommen. */
  title?: string;
  kicker?: string;
  icon?: string;
  intro?: string;
};

export const journey: Station[] = [
  { id: 'grundlagen', type: 'kapitel' },
  {
    id: 'faehigkeiten',
    type: 'themen',
    title: 'Was KI heute alles kann',
    kicker: 'Fähigkeiten',
    icon: '🧩',
    intro:
      'Von Texten über Medizin bis Robotik: Hier siehst du die wichtigsten Bereiche, in denen KI schon heute eingesetzt wird. Jede Karte führt zu einer ausführlichen Themenseite.',
  },
  {
    id: 'meilensteine',
    type: 'meilensteine',
    title: 'Meilensteine: Wie wir hierher kamen',
    kicker: 'Geschichte',
    icon: '🏁',
    intro: '75 Jahre KI-Geschichte – mit Rückschlägen, Durchbrüchen und einem rasanten Endspurt.',
  },
  { id: 'grenzen', type: 'kapitel' },
  {
    id: 'zukunft',
    type: 'zukunft',
    title: 'Was als Nächstes kommt',
    kicker: 'Ausblick',
    icon: '🔭',
    intro:
      'Niemand kennt die Zukunft – aber manche Entwicklungen zeichnen sich klar ab, andere sind reine Spekulation. Wir sagen dir jeweils, wie sicher die Einschätzung ist.',
  },
  { id: 'praxis', type: 'kapitel' },
];
