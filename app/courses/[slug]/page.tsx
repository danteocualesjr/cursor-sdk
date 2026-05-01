import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningWorkspace } from "@/components/LearningWorkspace";
import {
  courses,
  getCourse,
  getCourseLessons,
  getLessonById,
  lessonFileName,
} from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {
      title: "Course not found",
      description:
        "The crash-course track you tried to open is not part of the Bootcamp Companion catalog.",
    };
  }

  const path = `/courses/${course.slug}`;

  return {
    title: course.title,
    description: course.description,
    keywords: course.tags,
    alternates: { canonical: path },
    openGraph: {
      title: course.title,
      description: course.description,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
    },
  };
}

function parseLessonParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const lessonParam = parseLessonParam(resolvedSearchParams?.lesson);
  const lessons = getCourseLessons(course);
  const activeLesson = getLessonById(course, lessonParam);
  const activeIndex = activeLesson
    ? lessons.findIndex((entry) => entry.id === activeLesson.id)
    : -1;
  const previousLesson = activeIndex > 0 ? lessons[activeIndex - 1] : undefined;
  const nextLesson =
    activeIndex >= 0 && activeIndex < lessons.length - 1
      ? lessons[activeIndex + 1]
      : undefined;

  return (
    <main className="ide-shell">
      <header className="ide-topbar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="ide-command-center">
          <span>{course.shortTitle}</span>
          <strong>{activeLesson?.lesson.title ?? "Preview track"}</strong>
        </div>
        <div className="ide-status-strip">
          <span>{course.status}</span>
          <span>{course.level}</span>
          <span>{course.duration}</span>
        </div>
      </header>

      <div className="ide-workbench">
        <aside className="ide-activitybar" aria-label="Workspace sections">
          <Link className="activity-logo" href="/">
            BC
          </Link>
          <a className="activity-icon active" href="#lesson-title" aria-label="Lessons">
            <span>01</span>
            Lesson
          </a>
          <a className="activity-icon" href="#student-workspace" aria-label="Code">
            <span>02</span>
            Code
          </a>
          <a className="activity-icon" href="#coach-panel" aria-label="AI coach">
            <span>03</span>
            Coach
          </a>
        </aside>

        <aside className="ide-explorer" aria-label="Course navigation">
          <div className="explorer-header">
            <span>Learning Workspace</span>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          <div className="file-tree">
            <div className="track-card">
              <span>{course.status}</span>
              <strong>{course.shortTitle}</strong>
              <small>{course.duration} / {course.level}</small>
            </div>
            <p className="tree-root">Open Panels</p>
            <Link className="tree-file active" href="#lesson-title">
              Lesson brief
            </Link>
            <Link className="tree-file" href="#student-workspace">
              Student code
            </Link>
            <Link className="tree-file" href="#coach-panel">
              AI coach
            </Link>
            {course.modules.length ? (
              course.modules.map((module, moduleIndex) => (
                <div className="tree-folder" key={module.title}>
                  <a href={`#module-${moduleIndex + 1}`}>
                    module-{moduleIndex + 1}
                  </a>
                  {module.lessons.map((lesson, lessonIndex) => {
                    const candidate = lessons.find(
                      (entry) =>
                        entry.moduleIndex === moduleIndex &&
                        entry.lessonIndex === lessonIndex,
                    );
                    const isActive = candidate?.id === activeLesson?.id;

                    return (
                      <Link
                        className={`tree-file nested${isActive ? " active" : ""}`}
                        href={`/courses/${course.slug}?lesson=${candidate?.id}#lesson-title`}
                        key={lesson.title}
                      >
                        {lessonFileName(lesson)}
                      </Link>
                    );
                  })}
                </div>
              ))
            ) : (
              <span className="tree-file">lessons-coming-soon.md</span>
            )}
          </div>
        </aside>

        {!activeLesson ? (
          <section className="ide-empty-state">
            <div className="ide-tabs">
              <span className="ide-tab active">preview.md</span>
            </div>
            <div className="ide-panel-content">
              <p className="eyebrow">Preview track</p>
              <h1>{course.title}</h1>
              <p className="lead">{course.description}</p>
              <p className="muted">
                This crash course is planned for a later release. The MVP keeps
                it visible so students can understand the broader roadmap while
                the first three courses are fully built.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section className="ide-editor-panel" aria-labelledby="lesson-title">
              <div className="ide-tabs">
                <span className="ide-tab active">{lessonFileName(activeLesson.lesson)}</span>
                <span className="ide-tab">rubric.md</span>
                <span className="ide-tab">notes.md</span>
              </div>
              <div className="ide-panel-content">
                <p className="eyebrow">
                  Module {activeLesson.moduleIndex + 1} · Lesson{" "}
                  {activeLesson.lessonIndex + 1} of {lessons.length}
                </p>
                <h1 id="lesson-title">{activeLesson.lesson.title}</h1>
                <p className="lead">{activeLesson.lesson.summary}</p>

                <div className="lesson-brief-grid">
                  <div className="brief-card primary">
                    <span>Module goal</span>
                    <p>{activeLesson.module.outcome}</p>
                  </div>
                  <div className="brief-card">
                    <span>Exercise</span>
                    <p>{activeLesson.lesson.exercise}</p>
                  </div>
                </div>

                <h3>Checkpoints</h3>
                <ul className="ide-checklist">
                  {activeLesson.lesson.checkpoints.map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>

                <nav className="lesson-pager" aria-label="Lesson navigation">
                  {previousLesson ? (
                    <Link
                      className="button secondary"
                      href={`/courses/${course.slug}?lesson=${previousLesson.id}#lesson-title`}
                    >
                      ← {previousLesson.lesson.title}
                    </Link>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  {nextLesson ? (
                    <Link
                      className="button primary"
                      href={`/courses/${course.slug}?lesson=${nextLesson.id}#lesson-title`}
                    >
                      {nextLesson.lesson.title} →
                    </Link>
                  ) : (
                    <span className="muted">End of track</span>
                  )}
                </nav>

                <div className="module-list compact">
                  {course.modules.map((module, moduleIndex) => (
                    <article
                      className="module-item"
                      id={`module-${moduleIndex + 1}`}
                      key={module.title}
                    >
                      <div className="tag-row">
                        <span className="tag">module {moduleIndex + 1}</span>
                      </div>
                      <h3>{module.title}</h3>
                      <p className="muted">{module.outcome}</p>
                      {module.lessons.map((lesson, lessonIndex) => {
                        const candidate = lessons.find(
                          (entry) =>
                            entry.moduleIndex === moduleIndex &&
                            entry.lessonIndex === lessonIndex,
                        );
                        const isActive = candidate?.id === activeLesson.id;

                        return (
                          <Link
                            className={`lesson-row${isActive ? " active" : ""}`}
                            href={`/courses/${course.slug}?lesson=${candidate?.id}#lesson-title`}
                            key={lesson.title}
                          >
                            <strong>{lesson.title}</strong>
                            <span>{lesson.exercise}</span>
                          </Link>
                        );
                      })}
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <LearningWorkspace
              courseTitle={course.title}
              exercise={activeLesson.lesson.exercise}
              lessonTitle={activeLesson.lesson.title}
            />
          </>
        )}
      </div>
    </main>
  );
}
