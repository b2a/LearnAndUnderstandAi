/**
 * Speichert das Quiz-Ergebnis (Stufe + Interessen) und den Reisefortschritt im Browser.
 * Alles bleibt lokal – es werden keine Daten an einen Server geschickt.
 */
import { defaultLevel, levelIds, type InterestId, type LevelId } from '../data/levels';

export type Profile = {
  level: LevelId;
  interests: InterestId[];
  score?: number;
  maxScore?: number;
  correct?: number;
  knowledgeTotal?: number;
  fromQuiz: boolean;
};

const PROFILE_KEY = 'kiReise.profile';
const VISITED_KEY = 'kiReise.visited';

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Privater Modus o. ä. – Seite funktioniert trotzdem. */
  }
}

export function getProfile(): Profile | null {
  const p = read<Profile>(PROFILE_KEY);
  if (!p || !levelIds.includes(p.level)) return null;
  return p;
}

export function saveProfile(p: Profile) {
  write(PROFILE_KEY, p);
  applyLevel(p.level);
}

export function currentLevel(): LevelId {
  return getProfile()?.level ?? defaultLevel;
}

/** Wechselt die angezeigte Stufe, ohne die Quiz-Ergebnisse zu verlieren. */
export function setLevel(level: LevelId) {
  const p = getProfile();
  saveProfile({ ...(p ?? { interests: [], fromQuiz: false }), level });
  document.dispatchEvent(new CustomEvent('ki:level', { detail: level }));
}

export function applyLevel(level: LevelId) {
  document.documentElement.dataset.level = level;
}

export function getVisited(): string[] {
  return read<string[]>(VISITED_KEY) ?? [];
}

export function markVisited(id: string) {
  const v = new Set(getVisited());
  if (v.has(id)) return;
  v.add(id);
  write(VISITED_KEY, [...v]);
}

export function resetAll() {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(VISITED_KEY);
  } catch {
    /* ignorieren */
  }
}
