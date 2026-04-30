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
  const trimmedSubmission = submission.trim();
  const lineCount = submission ? submission.split(/\r\n|\r|\n/).length : 0;
  const characterCount = submission.length;
  const editorStatus = isReviewing
    ? "Reviewing"
    : review
      ? "Reviewed"
      : trimmedSubmission
        ? "Ready"
        : "Empty";
  const lineNumbers = Array.from(
    { length: Math.max(12, lineCount || 12) },
    (_, index) => index + 1,
  );

  async function requestReview() {
    if (!trimmedSubmission) {
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
    <>
      <section
        className="workspace-panel ide-code-panel"
        aria-labelledby="student-workspace"
      >
        <div className="ide-tabs">
          <span className="ide-tab active">student-solution.ts</span>
          <span className="ide-tab">exercise.prompt</span>
        </div>
        <div className="workspace-header">
          <div>
            <p className="eyebrow">Student workspace</p>
            <h2 id="student-workspace">Try the exercise</h2>
            <p className="muted">{exercise}</p>
          </div>
          <span className="editor-badge">{editorStatus}</span>
        </div>

        <div
          className="drop-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <span>{dropMessage}</span>
        </div>

        <div className="workspace-meta" aria-label="Editor statistics">
          <span>{lineCount} lines</span>
          <span>{characterCount} characters</span>
          <span>{trimmedSubmission ? "Ready for review" : "Add code to unlock review"}</span>
        </div>

        <div className="editor-frame">
          <div className="line-gutter" aria-hidden="true">
            {lineNumbers.map((lineNumber) => (
              <span key={lineNumber}>{lineNumber}</span>
            ))}
          </div>
          <textarea
            aria-label="Student code editor"
            className="field code-field"
            placeholder="// Type, paste, or drop your code here..."
            value={submission}
            onChange={(event) => setSubmission(event.target.value)}
          />
        </div>

        <div className="workspace-actions">
          <button
            className="button primary"
            disabled={isReviewing || !trimmedSubmission}
            onClick={requestReview}
            type="button"
          >
            {isReviewing ? "Running review..." : "Run Review"}
          </button>
          <button
            className="button secondary"
            disabled={!submission && !review}
            onClick={() => {
              setSubmission("");
              setReview(null);
              setDropMessage("Drop a code file here, or paste directly below.");
            }}
            type="button"
          >
            Clear Editor
          </button>
        </div>
      </section>

      <aside className="coach-panel" id="coach-panel" aria-label="AI coach panel">
        <div className="ide-tabs">
          <span className="ide-tab active">AI Coach</span>
        </div>
        <div className="coach-panel-body">
          <div className="coach-header">
            <div>
              <p className="eyebrow">Agent mode</p>
              <h2>Coach</h2>
            </div>
            <label className="switch-row">
              <input
                checked={isCoachEnabled}
                onChange={(event) => setIsCoachEnabled(event.target.checked)}
                type="checkbox"
              />
              <span>{isCoachEnabled ? "On" : "Off"}</span>
            </label>
          </div>
          <p className="muted">
            Toggle the coach on to ask for hints, debugging help, or review
            direction using the current lesson and editor contents.
          </p>
          <div className="coach-suggestions" aria-label="Suggested prompts">
            <button
              disabled={!isCoachEnabled}
              onClick={() => setCoachQuestion("Give me a hint without solving it.")}
              type="button"
            >
              Hint
            </button>
            <button
              disabled={!isCoachEnabled}
              onClick={() => setCoachQuestion("What should I check before submitting?")}
              type="button"
            >
              Checklist
            </button>
            <button
              disabled={!isCoachEnabled}
              onClick={() => setCoachQuestion("Explain the likely bug in my code.")}
              type="button"
            >
              Debug
            </button>
          </div>
          <textarea
            className="field coach-field"
            disabled={!isCoachEnabled}
            placeholder="Ask for a hint, error explanation, or next step..."
            value={coachQuestion}
            onChange={(event) => setCoachQuestion(event.target.value)}
          />
          <button
            className="button primary"
            disabled={isCoaching || !isCoachEnabled || !coachQuestion.trim()}
            onClick={askCoach}
            type="button"
          >
            {isCoaching ? "Coaching..." : "Ask Coach"}
          </button>
          <div className="chat-output" aria-live="polite">
            {coachResponse
              ? `${getSourceLabel(coachResponse.source)} coach:\n\n${coachResponse.answer}`
              : "Coach messages will appear here."}
          </div>
        </div>
      </aside>

      <section className="output-panel" aria-label="Review output">
        <div className="output-tabs">
          <span className="active">Review</span>
          <span>Tests</span>
          <span>Console</span>
          <span>History</span>
        </div>
        <div className="terminal-output" aria-live="polite">
          {review
            ? `${getSourceLabel(review.source)} review:\n\n${review.review}`
            : "Run Review to see feedback, next steps, and rubric notes here."}
        </div>
      </section>
    </>
  );
}
