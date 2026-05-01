import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found · Bootcamp Companion",
  description:
    "The page you tried to open is not part of Bootcamp Companion. Pick a crash-course track or open the dashboard to keep learning.",
};

export default function NotFound() {
  return (
    <main className="shell section">
      <section className="not-found-card">
        <p className="eyebrow">404 · Off the syllabus</p>
        <h1>That page is not part of the course catalog.</h1>
        <p className="lead">
          The link may be outdated, or the track may not exist yet. Jump back
          into the prep app from one of the entry points below.
        </p>
        <div className="actions">
          <Link className="button primary" href="/">
            Back to home
          </Link>
          <Link className="button secondary" href="/#courses">
            Browse crash courses
          </Link>
          <Link className="button secondary" href="/dashboard">
            Open dashboard
          </Link>
          <Link className="button secondary" href="/mentor">
            Try the AI mentor
          </Link>
        </div>
      </section>
    </main>
  );
}
