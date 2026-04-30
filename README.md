# Bootcamp Companion

Bootcamp Companion is a Next.js MVP for crash-course learning, project practice,
and AI mentor feedback powered by the Cursor SDK. It gives students structured
prep tracks, a dashboard, an IDE-inspired course workspace, and mentor/review
routes that can run with Cursor, OpenAI, or local demo feedback.

## What Is Included

- Course catalog with live MVP and preview tracks.
- Student dashboard with progress cards generated from course data.
- IDE-style course workspace with lesson briefs, code paste/drop, mentor prompts,
  and review output.
- Standalone mentor page for general coding questions and submission review.
- API fallback chain: Cursor SDK first, OpenAI second, demo guidance last.

## Getting Started

Install dependencies:

```bash
npm install
```

Create local environment variables:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## AI Configuration

`CURSOR_API_KEY` enables the Cursor SDK mentor/review path. If it is not set,
the app tries `OPENAI_API_KEY`. If neither key is present, the API routes return
demo guidance so the UI stays usable during local development.

Relevant variables:

- `CURSOR_API_KEY`: Cursor SDK API key.
- `CURSOR_MODEL`: Cursor model ID, defaults to `composer-2`.
- `OPENAI_API_KEY`: fallback OpenAI key.
- `OPENAI_MODEL`: fallback OpenAI model, defaults to `gpt-4.1-mini`.

## Main Routes

- `/`: marketing page, outcomes, course catalog, and dashboard preview.
- `/dashboard`: student progress overview and next recommended course.
- `/courses/[slug]`: IDE-style learning workspace for a course.
- `/mentor`: general mentor and submission review demo.

## Quality Checks

Run linting and type checks before shipping changes:

```bash
npm run lint
npm run typecheck
```
