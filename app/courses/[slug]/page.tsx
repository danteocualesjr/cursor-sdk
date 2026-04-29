import Link from "next/link";
import { notFound } from "next/navigation";
import { MentorPanel } from "@/components/MentorPanel";
import { SubmissionReview } from "@/components/SubmissionReview";
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
    <main className="shell section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{course.status}</p>
          <h1>{course.title}</h1>
          <p className="lead">{course.description}</p>
        </div>
        <Link className="button secondary" href="/dashboard">
          Back to dashboard
        </Link>
      </div>

      <section className="grid three">
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
      </section>

      {course.modules.length === 0 ? (
        <section className="section">
          <div className="panel">
            <div className="tag-row">
              <span className="tag">Preview track</span>
            </div>
            <h2>This crash course is planned for a later release.</h2>
            <p className="muted">
              The MVP keeps this track visible in the catalog so students can
              understand the broader roadmap while the first three courses are
              fully built.
            </p>
          </div>
        </section>
      ) : (
        <div className="lesson-layout section">
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Course modules</p>
                <h2>What students will practice</h2>
              </div>
            </div>
            <div className="module-list">
              {course.modules.map((module, moduleIndex) => (
                <article className="module-item" key={module.title}>
                  <div className="tag-row">
                    <span className="tag">Module {moduleIndex + 1}</span>
                  </div>
                  <h3>{module.title}</h3>
                  <p className="muted">{module.outcome}</p>
                  {module.lessons.map((lesson) => (
                    <div className="lesson-body" key={lesson.title}>
                      <div className="tag-row">
                        <span className="tag muted">Lesson</span>
                      </div>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.summary}</p>
                      <ul>
                        {lesson.checkpoints.map((checkpoint) => (
                          <li key={checkpoint}>{checkpoint}</li>
                        ))}
                      </ul>
                      <p className="muted">
                        <strong>Practice:</strong> {lesson.exercise}
                      </p>
                    </div>
                  ))}
                </article>
              ))}
            </div>

            {firstLesson ? (
              <div className="section">
                <SubmissionReview
                  courseTitle={course.title}
                  exercise={firstLesson.exercise}
                />
              </div>
            ) : null}
          </section>
          <MentorPanel
            courseTitle={course.title}
            lessonTitle={firstLesson?.title}
          />
        </div>
      )}
    </main>
  );
}
