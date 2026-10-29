import type { InterestId, LevelId } from './levels';

/**
 * Einstiegsquiz.
 *
 * Fragetypen:
 *  - "self":      Selbsteinschätzung – jede Antwort bringt Punkte, es gibt kein Richtig/Falsch.
 *  - "knowledge": Wissensfrage – genau eine Antwort ist richtig (correct: true), mit Erklärung.
 *  - "interests": Mehrfachauswahl – bestimmt, welche Themen dir empfohlen werden.
 *
 * Neue Fragen einfach ins Array einfügen. Die Punktegrenzen für die Stufen stehen unten in `thresholds`.
 */
export type QuizOption = {
  label: string;
  points?: number;
  correct?: boolean;
  interest?: InterestId;
};

export type QuizQuestion = {
  id: string;
  type: 'self' | 'knowledge' | 'interests';
  question: string;
  hint?: string;
  options: QuizOption[];
  /** Erklärung, die nach dem Beantworten einer Wissensfrage erscheint. */
  explanation?: string;
  /** Punkte für eine richtige Antwort (nur bei Wissensfragen). */
  weight?: number;
};

export const questions: QuizQuestion[] = [
  {
    id: 'nutzung',
    type: 'self',
    question: 'Wie oft nutzt du KI-Assistenten wie ChatGPT, Claude oder Gemini?',
    options: [
      { label: 'Noch nie', points: 0 },
      { label: 'Habe es mal ausprobiert', points: 1 },
      { label: 'Ein paar Mal im Monat', points: 2 },
      { label: 'Fast täglich', points: 3 },
    ],
  },
  {
    id: 'llm',
    type: 'knowledge',
    weight: 2,
    question: 'Was macht ein großes Sprachmodell (z. B. hinter ChatGPT) im Kern?',
    options: [
      { label: 'Es schlägt Antworten in einer riesigen Datenbank nach' },
      { label: 'Es sagt Stück für Stück den wahrscheinlich passendsten nächsten Textbaustein voraus', correct: true },
      { label: 'Es folgt Regeln, die Programmierer:innen von Hand geschrieben haben' },
      { label: 'Es versteht Sprache genauso wie ein Mensch' },
    ],
    explanation:
      'Sprachmodelle haben aus riesigen Textmengen Muster gelernt und erzeugen eine Antwort, indem sie immer wieder das nächste Wort(-stück) vorhersagen. Klingt simpel – führt aber zu erstaunlichen Fähigkeiten.',
  },
  {
    id: 'interessen',
    type: 'interests',
    question: 'Wofür interessierst du dich am meisten?',
    hint: 'Mehrfachauswahl möglich – wir heben passende Themen für dich hervor.',
    options: [
      { label: 'Texte schreiben & recherchieren', interest: 'text' },
      { label: 'Bilder & Videos erstellen', interest: 'bild' },
      { label: 'Sprache, Audio & Musik', interest: 'audio' },
      { label: 'Programmieren', interest: 'code' },
      { label: 'Wissenschaft & Medizin', interest: 'wissen' },
      { label: 'Arbeit & Produktivität', interest: 'arbeit' },
      { label: 'Lernen & Bildung', interest: 'lernen' },
      { label: 'Roboter & Mobilität', interest: 'technik' },
    ],
  },
  {
    id: 'halluzination',
    type: 'knowledge',
    weight: 2,
    question: 'Was bedeutet es, wenn eine KI „halluziniert“?',
    options: [
      { label: 'Sie erzeugt absichtlich lustige Antworten' },
      { label: 'Sie stürzt ab und gibt Fehlermeldungen aus' },
      { label: 'Sie behauptet überzeugend klingende Dinge, die falsch oder erfunden sind', correct: true },
      { label: 'Sie erzeugt Bilder aus Text' },
    ],
    explanation:
      'KI-Modelle wissen nicht, was „wahr“ ist – sie erzeugen plausible Texte. Deshalb können sie Quellen, Zahlen oder Fakten erfinden. Wichtige Aussagen solltest du immer prüfen.',
  },
  {
    id: 'training',
    type: 'knowledge',
    weight: 2,
    question: 'Was passiert beim „Training“ eines KI-Modells?',
    options: [
      { label: 'Menschen tippen alle möglichen Antworten vorher ein' },
      { label: 'Millionen interner Stellschrauben werden anhand vieler Beispiele so justiert, dass die Fehler kleiner werden', correct: true },
      { label: 'Das Modell liest das Internet live, während du fragst' },
      { label: 'Die KI wird mit Belohnungen in Form von Strom motiviert' },
    ],
    explanation:
      'Ein neuronales Netz hat Millionen bis Billionen Parameter. Beim Training vergleicht es seine Vorhersage mit dem richtigen Ergebnis und passt die Parameter ein winziges Stück an – milliardenfach wiederholt.',
  },
  {
    id: 'alphafold',
    type: 'knowledge',
    weight: 2,
    question: 'Für welche KI-Errungenschaft gab es 2024 einen Chemie-Nobelpreis?',
    options: [
      { label: 'Einen Chatbot, der den Turing-Test besteht' },
      { label: 'Die Vorhersage der 3D-Struktur von Proteinen (AlphaFold)', correct: true },
      { label: 'Ein selbstfahrendes Auto ohne Unfälle' },
      { label: 'Eine KI, die neue chemische Elemente entdeckt hat' },
    ],
    explanation:
      'AlphaFold sagt aus der Aminosäure-Sequenz die Form eines Proteins voraus – eine Aufgabe, für die Labore früher Monate oder Jahre brauchten. Heute sind über 200 Millionen Strukturen frei verfügbar.',
  },
  {
    id: 'agent',
    type: 'knowledge',
    weight: 2,
    question: 'Was unterscheidet einen KI-Agenten von einem normalen Chatbot?',
    options: [
      { label: 'Er hat einen menschlichen Avatar' },
      { label: 'Er plant selbstständig mehrere Schritte und nutzt Werkzeuge wie Browser, Dateien oder Programme', correct: true },
      { label: 'Er funktioniert ohne Internet' },
      { label: 'Er ist immer fehlerfrei' },
    ],
    explanation:
      'Ein Agent bekommt ein Ziel statt einer einzelnen Frage. Er zerlegt es in Schritte, ruft Werkzeuge auf, prüft Zwischenergebnisse und korrigiert sich – ähnlich wie ein Mensch, der eine Aufgabe abarbeitet.',
  },
  {
    id: 'selbst',
    type: 'self',
    question: 'Wie gut kennst du dich mit Begriffen wie „Prompt“, „Token“ oder „neuronales Netz“ aus?',
    options: [
      { label: 'Klingt alles fremd', points: 0 },
      { label: 'Schon mal gehört', points: 1 },
      { label: 'Ich kann es grob erklären', points: 2 },
      { label: 'Ich könnte einen Vortrag halten', points: 3 },
    ],
  },
];

/** Ab wie vielen Punkten welche Stufe gilt (aufsteigend sortiert). */
export const thresholds: { min: number; level: LevelId }[] = [
  { min: 0, level: 'einsteiger' },
  { min: 6, level: 'anwender' },
  { min: 12, level: 'profi' },
];

export const maxPoints = questions.reduce((sum, q) => {
  if (q.type === 'knowledge') return sum + (q.weight ?? 1);
  if (q.type === 'self') return sum + Math.max(...q.options.map((o) => o.points ?? 0));
  return sum;
}, 0);
