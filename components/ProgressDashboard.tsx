import Link from "next/link";
import { liveCourses, getCompletionEstimate } from "@/lib/courses";

export function ProgressDashboard() {
  return (
    <div className="grid three">
      {liveCourses.map((course) => {
        const progress = getCompletionEstimate(course);

        return (
          <article className="panel" key={course.slug}>
            <div className="tag-row">
              <span className="tag">{course.shortTitle}</span>
              <span className="tag muted">{progress}% ready</span>
            </div>
            <h3>{course.title}</h3>
            <p className="muted">{course.description}</p>
            <div className="progress" aria-label={`${course.title} progress`}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="actions">
              <Link className="button secondary" href={`/courses/${course.slug}`}>
                Continue
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
