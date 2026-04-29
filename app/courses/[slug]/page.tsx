import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningWorkspace } from "@/components/LearningWorkspace";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.modules[0]?.lessons[0];

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
          <strong>{firstLesson?.title ?? "Preview track"}</strong>
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
                  {module.lessons.map((lesson) => (
                    <span className="tree-file nested" key={lesson.title}>
                      {lesson.title.toLowerCase().replaceAll(" ", "-")}.md
                    </span>
                  ))}
                </div>
              ))
            ) : (
              <span className="tree-file">lessons-coming-soon.md</span>
            )}
          </div>
        </aside>

        {course.modules.length === 0 ? (
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
                <span className="ide-tab active">current.lesson.md</span>
                <span className="ide-tab">rubric.md</span>
                <span className="ide-tab">notes.md</span>
              </div>
              <div className="ide-panel-content">
                <p className="eyebrow">Now learning</p>
                <h1 id="lesson-title">{firstLesson?.title}</h1>
                <p className="lead">{firstLesson?.summary}</p>

                <div className="lesson-brief-grid">
                  <div className="brief-card primary">
                    <span>Learning goal</span>
                    <p>{course.modules[0]?.outcome}</p>
                  </div>
                  <div className="brief-card">
                    <span>Exercise</span>
                    <p>{firstLesson?.exercise}</p>
                  </div>
                </div>

                <h3>Checkpoints</h3>
                <ul className="ide-checklist">
                  {firstLesson?.checkpoints.map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>

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
                      {module.lessons.map((lesson) => (
                        <div className="lesson-row" key={lesson.title}>
                          <strong>{lesson.title}</strong>
                          <span>{lesson.exercise}</span>
                        </div>
                      ))}
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {firstLesson ? (
              <LearningWorkspace
                courseTitle={course.title}
                exercise={firstLesson.exercise}
                lessonTitle={firstLesson.title}
              />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
