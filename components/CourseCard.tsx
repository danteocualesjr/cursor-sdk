import Link from "next/link";
import type { Course } from "@/lib/courses";

export function CourseCard({ course }: { course: Course }) {
  const isLive = course.status === "Live MVP";

  return (
    <article className={`course-card ${isLive ? "featured" : ""}`}>
      <div className="tag-row">
        <span className="tag">{course.status}</span>
        <span className="tag muted">{course.level}</span>
        <span className="tag muted">{course.duration}</span>
      </div>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p className="muted">
        <strong>Best for:</strong> {course.audience}
      </p>
      <div className="tag-row" aria-label={`${course.title} topics`}>
        {course.tags.map((tag) => (
          <span className="tag muted" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link className="button secondary" href={`/courses/${course.slug}`}>
        {isLive ? "Open course" : "Preview track"}
      </Link>
    </article>
  );
}
