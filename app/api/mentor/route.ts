import { NextResponse } from "next/server";
import { hasText, optionalText, readJsonBody } from "@/lib/api-validation";
import { runCursorAgent } from "@/lib/cursor-agent";

export async function POST(request: Request) {
  const body = await readJsonBody<{
    courseTitle?: string;
    lessonTitle?: string;
    question?: string;
    code?: string;
  }>(request);

  if (!body) {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  if (!hasText(body.courseTitle) || !hasText(body.question)) {
    return NextResponse.json(
      { error: "courseTitle and question are required" },
      { status: 400 },
    );
  }

  const result = await runCursorAgent({
    task: "mentor",
    courseTitle: body.courseTitle,
    lessonTitle: optionalText(body.lessonTitle),
    question: body.question,
    code: optionalText(body.code),
  });

  return NextResponse.json({
    answer: result.text,
    source: result.source,
  });
}
