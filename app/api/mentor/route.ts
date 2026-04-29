import { NextResponse } from "next/server";
import { runCursorAgent } from "@/lib/cursor-agent";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    courseTitle?: string;
    lessonTitle?: string;
    question?: string;
    code?: string;
  };

  if (!body.courseTitle || !body.question) {
    return NextResponse.json(
      { error: "courseTitle and question are required" },
      { status: 400 },
    );
  }

  const result = await runCursorAgent({
    task: "mentor",
    courseTitle: body.courseTitle,
    lessonTitle: body.lessonTitle,
    question: body.question,
    code: body.code,
  });

  return NextResponse.json({
    answer: result.text,
    source: result.source,
  });
}
