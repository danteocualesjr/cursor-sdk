import { NextResponse } from "next/server";
import { runCursorAgent } from "@/lib/cursor-agent";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    courseTitle?: string;
    exercise?: string;
    submission?: string;
  };

  if (!body.courseTitle || !body.exercise || !body.submission) {
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
