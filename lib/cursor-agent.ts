type AgentPrompt = {
  task: "mentor" | "review";
  courseTitle: string;
  lessonTitle?: string;
  question?: string;
  code?: string;
  exercise?: string;
  submission?: string;
};

type AgentResult = {
  text: string;
  source: "cursor-sdk" | "demo";
};

const mentorFallback = `Start by naming the exact concept involved, then test your understanding with one tiny example. If code is failing, read the error from top to bottom, isolate the line that triggered it, and change one thing at a time.`;

const reviewFallback = `Strengths:
- You made a concrete attempt and can now compare it against the lesson goal.
- The next best step is to check whether the output matches the required behavior.

Issues to inspect:
- Are variables named clearly?
- Is each function doing one job?
- Did you test both the happy path and one edge case?

Next step:
Rewrite one confusing part in plain English, then update the code to match that explanation.`;

function buildPrompt(input: AgentPrompt) {
  if (input.task === "review") {
    return `You are an encouraging coding bootcamp mentor.

Course: ${input.courseTitle}
Exercise: ${input.exercise}

Review this student submission:
${input.submission}

Give concise feedback with strengths, issues, and next steps. Avoid rewriting the full answer unless necessary.`;
  }

  return `You are an AI coding mentor for a bootcamp prep SaaS.

Course: ${input.courseTitle}
Lesson: ${input.lessonTitle ?? "General help"}
Student question: ${input.question}
Student code or error:
${input.code ?? "No code provided"}

Explain in beginner-friendly language. Prefer hints and small examples over giving away the full solution.`;
}

async function collectRunText(run: unknown): Promise<string> {
  const candidate = run as {
    stream?: () => AsyncIterable<unknown>;
    wait?: () => Promise<unknown>;
    text?: string;
    response?: string;
  };

  if (typeof candidate.text === "string") {
    return candidate.text;
  }

  if (typeof candidate.response === "string") {
    return candidate.response;
  }

  if (typeof candidate.wait === "function") {
    const waited = (await candidate.wait()) as { text?: string; response?: string };
    return waited.text ?? waited.response ?? JSON.stringify(waited, null, 2);
  }

  if (typeof candidate.stream === "function") {
    const chunks: string[] = [];

    for await (const event of candidate.stream()) {
      if (typeof event === "string") {
        chunks.push(event);
        continue;
      }

      const typedEvent = event as { text?: string; delta?: string; message?: string };
      chunks.push(typedEvent.text ?? typedEvent.delta ?? typedEvent.message ?? "");
    }

    return chunks.join("").trim();
  }

  return "";
}

export async function runCursorAgent(input: AgentPrompt): Promise<AgentResult> {
  const fallback = input.task === "review" ? reviewFallback : mentorFallback;

  if (!process.env.CURSOR_API_KEY) {
    return {
      source: "demo",
      text: fallback,
    };
  }

  try {
    const { Agent } = await import("@cursor/sdk");
    const agent = await Agent.create({
      apiKey: process.env.CURSOR_API_KEY,
      model: { id: process.env.CURSOR_MODEL ?? "composer-2" },
      local: { cwd: process.cwd() },
    });

    const run = await agent.send(buildPrompt(input));
    const text = await collectRunText(run);

    return {
      source: "cursor-sdk",
      text: text || fallback,
    };
  } catch (error) {
    console.error("Cursor SDK run failed", error);

    return {
      source: "demo",
      text: `${fallback}\n\nCursor SDK is configured in the app, but this request used demo feedback because the agent call failed. Check CURSOR_API_KEY, CURSOR_MODEL, and server logs.`,
    };
  }
}
