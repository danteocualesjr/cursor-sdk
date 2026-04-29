import Link from "next/link";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { liveCourses } from "@/lib/courses";

export default function DashboardPage() {
  const nextCourse = liveCourses[0];

  return (
    <main className="shell section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Student dashboard</p>
          <h1>Your prep plan</h1>
          <p className="lead">
            Track course progress, jump back into lessons, and ask the AI mentor
            for help when a concept or exercise gets confusing.
          </p>
        </div>
      </div>

      <section className="grid three">
        <div className="stat">
          <b>3</b>
          <span>active tracks</span>
        </div>
        <div className="stat">
          <b>14</b>
          <span>lessons ready</span>
        </div>
        <div className="stat">
          <b>5</b>
          <span>practice projects</span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended next step</p>
            <h2>Continue {nextCourse.title}</h2>
            <p>
              Start with JavaScript fundamentals if you are preparing for a
              full-stack or frontend bootcamp.
            </p>
          </div>
          <Link className="button primary" href={`/courses/${nextCourse.slug}`}>
            Continue learning
          </Link>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Active courses</p>
            <h2>Your crash-course tracks</h2>
          </div>
        </div>
        <ProgressDashboard />
      </section>
    </main>
  );
}
