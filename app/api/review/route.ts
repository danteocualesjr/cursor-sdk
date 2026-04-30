import { NextResponse } from "next/server";
import { hasText, readJsonBody } from "@/lib/api-validation";
import { runCursorAgent } from "@/lib/cursor-agent";

export async function POST(request: Request) {
  const body = await readJsonBody<{
    courseTitle?: string;
    exercise?: string;
    submission?: string;
  }>(request);

  if (!body) {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  if (!hasText(body.courseTitle) || !hasText(body.exercise) || !hasText(body.submission)) {
    return NextResponse.json(
      { error: "courseTitle, exercise, and submission are required" },
      { status: 400 },
    );
  }

  const result = await runCursorAgent({
    task: "review",
    courseTitle: body.courseTitle,
    exercise: body.exercise,
    submission: body.submission,
  });

  return NextResponse.json({
    review: result.text,
    source: result.source,
  });
}
