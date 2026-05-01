"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App route error", error);
  }, [error]);

  return (
    <main className="shell section">
      <section className="not-found-card" role="alert">
        <p className="eyebrow">Something went sideways</p>
        <h1>The app hit an unexpected error.</h1>
        <p className="lead">
          This usually means a dependency or AI provider is misbehaving. The
          page is still here, you can retry, head home, or open the AI mentor
          to keep working.
        </p>
        {error.digest ? (
          <p className="muted">
            Reference: <code>{error.digest}</code>
          </p>
        ) : null}
        <div className="actions">
          <button className="button primary" onClick={() => reset()} type="button">
            Try again
          </button>
          <Link className="button secondary" href="/">
            Back to home
          </Link>
          <Link className="button secondary" href="/mentor">
            Open AI mentor
          </Link>
        </div>
      </section>
    </main>
  );
}
