"use client";

import type { DragEvent } from "react";
import { useState } from "react";

type ReviewResponse = {
  review: string;
  source: "cursor-sdk" | "openai" | "demo";
};

type MentorResponse = {
  answer: string;
  source: "cursor-sdk" | "openai" | "demo";
};

function getSourceLabel(source: ReviewResponse["source"] | MentorResponse["source"]) {
  if (source === "cursor-sdk") {
    return "Cursor SDK";
  }

  if (source === "openai") {
    return "OpenAI";
  }

  return "Demo AI";
}

export function LearningWorkspace({
  courseTitle,
  lessonTitle,
  exercise,
}: {
  courseTitle: string;
  lessonTitle?: string;
  exercise: string;
}) {
  const [submission, setSubmission] = useState("");
  const [coachQuestion, setCoachQuestion] = useState("");
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [coachResponse, setCoachResponse] = useState<MentorResponse | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isCoaching, setIsCoaching] = useState(false);
  const [isCoachEnabled, setIsCoachEnabled] = useState(false);
  const [dropMessage, setDropMessage] = useState("Drop a code file here, or paste directly below.");

  async function requestReview() {
    if (!submission.trim()) {
      return;
    }

    setIsReviewing(true);
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
          "The review service could not be reached. Try again with a focused code sample.",
      });
    } finally {
      setIsReviewing(false);
    }
  }

  async function askCoach() {
    if (!coachQuestion.trim()) {
      return;
    }

    setIsCoaching(true);
    setCoachResponse(null);

    try {
      const request = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseTitle,
          lessonTitle,
          question: coachQuestion,
          code: submission,
        }),
      });

      const data = (await request.json()) as MentorResponse;
      setCoachResponse(data);
    } catch {
      setCoachResponse({
        source: "demo",
        answer:
          "The coach could not be reached. Try asking a smaller question tied to the code in your workspace.",
      });
    } finally {
      setIsCoaching(false);
    }
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const droppedText = event.dataTransfer.getData("text/plain");

    if (file) {
      const text = await file.text();
      setSubmission(text);
      setDropMessage(`Loaded ${file.name}`);
      return;
    }

    if (droppedText.trim()) {
      setSubmission(droppedText);
      setDropMessage("Loaded dropped code text.");
    }
  }

  return (
    <section className="workspace-panel" aria-labelledby="workspace-title">
      <div className="workspace-header">
        <div>
          <p className="eyebrow">Student workspace</p>
          <h2 id="workspace-title">Try the exercise</h2>
          <p className="muted">{exercise}</p>
        </div>
        <label className="switch-row">
          <input
            checked={isCoachEnabled}
            onChange={(event) => setIsCoachEnabled(event.target.checked)}
            type="checkbox"
          />
          <span>AI Coach</span>
        </label>
      </div>

      <div
        className="drop-zone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <span>{dropMessage}</span>
      </div>

      <textarea
        className="field code-field"
        placeholder="Type, paste, or drop your code here..."
        value={submission}
        onChange={(event) => setSubmission(event.target.value)}
      />

      <div className="workspace-actions">
        <button
          className="button primary"
          disabled={isReviewing || !submission.trim()}
          onClick={requestReview}
          type="button"
        >
          {isReviewing ? "Reviewing..." : "Submit for review"}
        </button>
        <button
          className="button secondary"
          onClick={() => setSubmission("")}
          type="button"
        >
          Clear
        </button>
      </div>

      {isCoachEnabled ? (
        <div className="coach-box">
          <h3>Ask the AI coach</h3>
          <p className="muted">
            The coach can use the lesson and your workspace code to give hints
            without jumping straight to the answer.
          </p>
          <textarea
            className="field"
            placeholder="Ask for a hint, error explanation, or next step..."
            value={coachQuestion}
            onChange={(event) => setCoachQuestion(event.target.value)}
          />
          <button
            className="button primary"
            disabled={isCoaching || !coachQuestion.trim()}
            onClick={askCoach}
            type="button"
          >
            {isCoaching ? "Coaching..." : "Ask coach"}
          </button>
        </div>
      ) : null}

      <div className="result" aria-live="polite">
        {review
          ? `${getSourceLabel(review.source)} review:\n\n${review.review}`
          : "Submit your code to get review feedback."}
      </div>

      {isCoachEnabled ? (
        <div className="result" aria-live="polite">
          {coachResponse
            ? `${getSourceLabel(coachResponse.source)} coach:\n\n${coachResponse.answer}`
            : "Coach guidance will appear here."}
        </div>
      ) : null}
    </section>
  );
}
