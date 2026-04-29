"use client";

import { useState } from "react";

type MentorResponse = {
  answer: string;
  source: "cursor-sdk" | "openai" | "demo";
};

function getSourceLabel(source: MentorResponse["source"]) {
  if (source === "cursor-sdk") {
    return "Cursor SDK";
  }

  if (source === "openai") {
    return "OpenAI";
  }

  return "Demo mentor";
}

export function MentorPanel({
  courseTitle,
  lessonTitle,
}: {
  courseTitle: string;
  lessonTitle?: string;
}) {
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [response, setResponse] = useState<MentorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function askMentor() {
    setIsLoading(true);
    setResponse(null);

    try {
      const request = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseTitle,
          lessonTitle,
          question,
          code,
        }),
      });

      const data = (await request.json()) as MentorResponse;
      setResponse(data);
    } catch {
      setResponse({
        source: "demo",
        answer:
          "The mentor could not be reached. Try asking again, or paste a smaller code sample with the exact error message.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className="panel mentor-panel">
      <div className="tag-row">
        <span className="tag">AI Mentor</span>
        <span className="tag muted">{lessonTitle ? "Lesson help" : "General help"}</span>
      </div>
      <h3>Ask for a hint</h3>
      <p className="muted">
        Paste a question, error, or code snippet. The mentor is designed to
        explain first, then guide you toward the answer.
      </p>
      <div className="form-stack">
        <textarea
          className="field"
          placeholder="What are you stuck on?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <textarea
          className="field"
          placeholder="Optional: paste your code or error message"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button
          className="button primary"
          disabled={isLoading || !question.trim()}
          onClick={askMentor}
          type="button"
        >
          {isLoading ? "Thinking..." : "Ask mentor"}
        </button>
      </div>
      <div className="result" aria-live="polite">
        {response
          ? `${getSourceLabel(response.source)}:\n\n${response.answer}`
          : "Mentor guidance will appear here."}
      </div>
    </aside>
  );
}
