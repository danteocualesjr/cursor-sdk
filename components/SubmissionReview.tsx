"use client";

import { useState } from "react";

type ReviewResponse = {
  review: string;
  source: "cursor-sdk" | "openai" | "demo";
};

function getSourceLabel(source: ReviewResponse["source"]) {
  if (source === "cursor-sdk") {
    return "Cursor SDK";
  }

  if (source === "openai") {
    return "OpenAI";
  }

  return "Demo review";
}

export function SubmissionReview({
  courseTitle,
  exercise,
}: {
  courseTitle: string;
  exercise: string;
}) {
  const [submission, setSubmission] = useState("");
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function requestReview() {
    setIsLoading(true);
    setReview(null);

    try {
      const request = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseTitle,
          exercise,
          submission,
        }),
      });

      const data = (await request.json()) as ReviewResponse;
      setReview(data);
    } catch {
      setReview({
        source: "demo",
        review:
          "The review service could not be reached. Check that the app is running and try again with a focused code sample.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="lesson-body">
      <div className="tag-row">
        <span className="tag">Project submission</span>
        <span className="tag muted">Rubric review</span>
      </div>
      <h3>Submit practice work</h3>
      <p className="muted">{exercise}</p>
      <div className="form-stack">
        <textarea
          className="field"
          placeholder="Paste your code, repo notes, or a short summary of your solution."
          value={submission}
          onChange={(event) => setSubmission(event.target.value)}
        />
        <button
          className="button primary"
          disabled={isLoading || !submission.trim()}
          onClick={requestReview}
          type="button"
        >
          {isLoading ? "Reviewing..." : "Review my work"}
        </button>
      </div>
      <div className="result" aria-live="polite">
        {review
          ? `${getSourceLabel(review.source)}:\n\n${review.review}`
          : "Submission feedback will appear here."}
      </div>
    </section>
  );
}
