import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { interestIds, levelIds } from './data/levels';

/** Ein Text pro Wissensstufe. */
const perLevel = z.object(
  Object.fromEntries(levelIds.map((id) => [id, z.string()])) as Record<
    (typeof levelIds)[number],
    z.ZodString
  >,
);

/**
 * Themen = KI-Fähigkeitsbereiche.
 * Neue Datei in src/content/themen/ anlegen → erscheint automatisch in der Lernreise
 * und bekommt eine eigene Detailseite unter /themen/<dateiname>.
 */
const themen = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/themen' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    tagline: z.string(),
    interests: z.array(z.enum(interestIds)).default([]),
    /** Kurze Erklärung je Wissensstufe (für die Karte in der Lernreise). */
    explain: perLevel,
    achievements: z.array(z.object({ year: z.string(), text: z.string() })),
    future: z.array(z.string()),
    /** Ein Beispiel-Prompt zum Selbst-Ausprobieren. */
    tryIt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/** Textkapitel der Lernreise (z. B. Grundlagen, Grenzen). */
const kapitel = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/kapitel' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    icon: z.string(),
  }),
});

/** Zeitstrahl der Meilensteine. */
const meilensteine = defineCollection({
  loader: file('./src/data/meilensteine.json'),
  schema: z.object({
    year: z.number(),
    title: z.string(),
    text: z.string(),
    area: z.string(),
    /** Besonders wichtige Meilensteine werden auch für Einsteiger:innen gezeigt. */
    key: z.boolean().default(false),
  }),
});

/** Ausblick: Was kommt noch? */
const zukunft = defineCollection({
  loader: file('./src/data/zukunft.json'),
  schema: z.object({
    horizon: z.enum(['bald', 'mittel', 'offen']),
    title: z.string(),
    text: z.string(),
    confidence: z.enum(['hoch', 'mittel', 'spekulativ']),
  }),
});

export const collections = { themen, kapitel, meilensteine, zukunft };
