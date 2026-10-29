# KI verstehen – eine interaktive Lernreise

Eine kompakte Lernreise rund um Künstliche Intelligenz. Ein kurzes Einstiegsquiz ermittelt Wissensstand und Interessen; danach passen sich alle Erklärungen an eine von drei Stufen an (🌱 Neugierig, 🧭 Entdecker:in, 🚀 Kenner:in).

**Inhalte:** Grundlagen (mit interaktiver „Nächstes Wort“-Demo), 11 Fähigkeitsbereiche mit eigener Themenseite, Zeitstrahl der Meilensteine, Grenzen & Risiken, Ausblick auf die Zukunft und Praxistipps.

Gebaut mit [Astro](https://astro.build) und MDX: statisch, schnell, ohne Framework-JavaScript im Browser. Das Quiz-Ergebnis wird nur im `localStorage` des Browsers gespeichert.

## Starten

Benötigt Node.js 22.23+ (empfohlen: 24, siehe `.nvmrc`).

```bash
npm install
npm run dev       # Entwicklungsserver auf http://localhost:4321/LearnAndUnderstandAi/
npm run build     # Typprüfung + statischer Build nach dist/
npm run preview   # Build lokal ansehen
```

## Veröffentlichen (GitHub Pages)

Der Workflow `.github/workflows/deploy.yml` baut und veröffentlicht die Seite bei jedem Push auf `main`.
Einmalig in GitHub einstellen: **Settings → Pages → Source: GitHub Actions**.

Für eine eigene Domain oder einen anderen Pfad die Umgebungsvariablen `SITE` und `BASE_PATH` setzen (siehe `astro.config.mjs`), z. B. `BASE_PATH=/` .

## Projektstruktur

```
src/
├── content/
│   ├── themen/          ← ein KI-Fähigkeitsbereich pro .mdx-Datei
│   └── kapitel/         ← Textkapitel der Lernreise (Grundlagen, Grenzen, Praxis)
├── data/
│   ├── journey.ts       ← Reihenfolge der Stationen der Lernreise
│   ├── quiz.ts          ← Quizfragen und Punktegrenzen
│   ├── levels.ts        ← Wissensstufen und Interessen
│   ├── meilensteine.json← Zeitstrahl
│   └── zukunft.json     ← Ausblick
├── components/          ← Quiz, Zeitstrahl, Demos, Karten …
├── content.config.ts    ← Schemas: was in Frontmatter/JSON erlaubt ist
├── styles/global.css    ← Design-Tokens (Farben, Abstände, Bewegung)
└── pages/               ← Startseite, /reise, /themen, /themen/<slug>
```

## Erweitern – Kochrezepte

### Neues Thema hinzufügen

Eine neue Datei `src/content/themen/<slug>.mdx` anlegen (am besten eine bestehende kopieren). Sie erscheint automatisch in der Lernreise, in der Themenübersicht, in den Quiz-Empfehlungen und bekommt eine eigene Seite unter `/themen/<slug>/`.

```mdx
---
title: Landwirtschaft
icon: 🌾
order: 12
tagline: Präziser säen, gießen und ernten.
interests: [technik, wissen]     # steuert die Empfehlung nach dem Quiz
explain:
  einsteiger: Einfache Erklärung …
  anwender: Etwas tiefer …
  profi: Fachlich präzise …
achievements:
  - { year: '2019', text: 'Was erreicht wurde …' }
future:
  - Was noch kommen könnte …
tryIt: 'Ein Prompt zum Ausprobieren'
---
import Level from '../../components/Level.astro';

## Was KI hier heute kann
…

<Level for="einsteiger">

Text nur für Einsteiger:innen (Leerzeilen um den Inhalt nicht vergessen).

</Level>

<Level for="anwender profi">

Text für beide fortgeschrittenen Stufen.

</Level>
```

Mit `draft: true` im Frontmatter wird ein Thema ausgeblendet.

### Meilenstein oder Zukunftsthema ergänzen

Einen Eintrag in `src/data/meilensteine.json` bzw. `src/data/zukunft.json` hinzufügen. Jede `id` muss eindeutig sein.
Meilensteine mit `"key": true` sehen auch Einsteiger:innen; die übrigen erscheinen ab Stufe „Entdecker:in“.

### Quizfrage ändern

In `src/data/quiz.ts` Fragen ergänzen oder anpassen. Drei Typen: `knowledge` (eine richtige Antwort, mit Erklärung), `self` (Selbsteinschätzung mit Punkten) und `interests` (Mehrfachauswahl). Die Punktegrenzen für die Stufen stehen in `thresholds`.

### Station der Lernreise hinzufügen oder umsortieren

`src/data/journey.ts` bearbeiten. Für ein neues Textkapitel eine MDX-Datei in `src/content/kapitel/` anlegen und deren Dateinamen als `id` mit `type: 'kapitel'` eintragen.

### Aussehen anpassen

Farben, Schrift, Abstände und Animationsdauern sind als CSS-Variablen in `src/styles/global.css` definiert (inkl. Dark Mode).

## Animationen & Barrierefreiheit

- Animationen nutzen nur `transform` und `opacity` mit festen Dauern (100–300 ms).
- Bei `prefers-reduced-motion: reduce` werden Bewegungen durch kurze Überblendungen ersetzt.
- Bedeutung wird nie nur über Bewegung vermittelt (z. B. „✓ Richtig!“ als Text im Quiz).
- Alles ist per Tastatur bedienbar; das neuronale Netz auf der Startseite ist rein dekorativ.

## Inhalte

Stand der Inhalte: Herbst 2026. Die KI-Entwicklung ist schnell – Korrekturen und Ergänzungen sind willkommen.
