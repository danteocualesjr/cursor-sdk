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
    <main className="learning-shell">
      <aside className="learning-sidebar" aria-label="Course navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">BC</span>
          <span>Bootcamp Companion</span>
        </Link>

        <nav className="sidebar-nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/#courses">Course catalog</Link>
          <Link href="/mentor">AI mentor</Link>
        </nav>

        <div className="sidebar-section">
          <p className="eyebrow">Current track</p>
          <h3>{course.shortTitle}</h3>
          <p className="muted">{course.audience}</p>
        </div>

        <div className="sidebar-section">
          <p className="eyebrow">Lessons</p>
          <div className="sidebar-lessons">
            {course.modules.length ? (
              course.modules.map((module, moduleIndex) => (
                <a href={`#module-${moduleIndex + 1}`} key={module.title}>
                  Module {moduleIndex + 1}: {module.title}
                </a>
              ))
            ) : (
              <span className="muted">Lessons coming soon</span>
            )}
          </div>
        </div>
      </aside>

      <section className="learning-main">
        <div className="learning-hero">
          <div>
            <p className="eyebrow">{course.status}</p>
            <h1>{course.title}</h1>
            <p className="lead">{course.description}</p>
          </div>
          <div className="learning-stats">
            <div className="stat">
              <b>{course.duration}</b>
              <span>estimated time</span>
            </div>
            <div className="stat">
              <b>{course.level}</b>
              <span>difficulty</span>
            </div>
            <div className="stat">
              <b>{course.modules.length || "Soon"}</b>
              <span>modules</span>
            </div>
          </div>
        </div>

        {course.modules.length === 0 ? (
          <section className="panel">
            <div className="tag-row">
              <span className="tag">Preview track</span>
            </div>
            <h2>This crash course is planned for a later release.</h2>
            <p className="muted">
              The MVP keeps this track visible in the catalog so students can
              understand the broader roadmap while the first three courses are
              fully built.
            </p>
          </section>
        ) : (
          <div className="learning-panels">
            <section className="lesson-panel" aria-labelledby="lesson-title">
              <div className="tag-row">
                <span className="tag">Lesson</span>
                <span className="tag muted">Code walkthrough</span>
              </div>
              <p className="eyebrow">Now learning</p>
              <h2 id="lesson-title">{firstLesson?.title}</h2>
              <p>{firstLesson?.summary}</p>

              <div className="code-card">
                <span>Learning goal</span>
                <p>{course.modules[0]?.outcome}</p>
              </div>

              <h3>Checkpoints</h3>
              <ul>
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
                      <span className="tag">Module {moduleIndex + 1}</span>
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
            </section>

            {firstLesson ? (
              <LearningWorkspace
                courseTitle={course.title}
                exercise={firstLesson.exercise}
                lessonTitle={firstLesson.title}
              />
            ) : null}
          </div>
        )}
      </section>
    </main>
  );
}
