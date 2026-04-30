import Link from "next/link";
import { CourseCatalog } from "@/components/CourseCatalog";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { courses, getCatalogSummary } from "@/lib/courses";

const outcomes = [
  "Prep before bootcamp starts",
  "Catch up during CS or university courses",
  "Practice with guided projects",
  "Get code-aware mentor feedback",
];

export default function Home() {
  const catalogSummary = getCatalogSummary();

  return (
    <main>
      <section className="shell hero">
        <div>
          <p className="eyebrow">AI-powered bootcamp prep</p>
          <h1>Crash courses with a coding mentor built in.</h1>
          <p className="lead">
            Bootcamp Companion helps students prepare for coding bootcamps, CS
            classes, university courses, and self-study with structured lessons,
            practice projects, and Cursor SDK-powered code feedback.
          </p>
          <div className="actions">
            <Link className="button primary" href="#courses">
              Explore crash courses
            </Link>
            <Link className="button secondary" href="/mentor">
              Try the AI mentor
            </Link>
          </div>
        </div>
        <div className="panel mentor-card">
          <div className="chat-bubble">
            <strong>Student:</strong> I understand arrays, but I get lost when I
            have to use them in React.
          </div>
          <div className="chat-bubble">
            <strong>Mentor:</strong> Let’s connect the ideas. In JavaScript, an
            array is your list of data. In React, you map that list into visible
            components. Try rendering one card first, then map three.
          </div>
          <div className="stats">
            <div className="stat">
              <b>{catalogSummary.liveCourseCount}</b>
              <span>live MVP tracks</span>
            </div>
            <div className="stat">
              <b>{catalogSummary.totalCourseCount}</b>
              <span>planned prep paths</span>
            </div>
            <div className="stat">
              <b>24/7</b>
              <span>mentor support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What students get</p>
            <h2>Designed for the gap before and during class.</h2>
          </div>
          <p>
            The app does not replace a bootcamp or university course. It helps
            students arrive prepared, stay unstuck, and practice the habits that
            make technical programs less overwhelming.
          </p>
        </div>
        <div className="grid four">
          {outcomes.map((outcome) => (
            <div className="module-item" key={outcome}>
              <h3>{outcome}</h3>
              <p className="muted">
                Short lessons, checkpoints, projects, and AI feedback turn vague
                study goals into concrete next steps.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section" id="courses">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Course catalog</p>
            <h2>Multiple prep tracks, one learning system.</h2>
          </div>
          <p>
            The first three tracks are fully structured for the MVP. The rest
            show how the product can expand without changing the core experience.
          </p>
        </div>
        <CourseCatalog courses={courses} />
      </section>

      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Student dashboard preview</p>
            <h2>Progress, next steps, and mentor access.</h2>
          </div>
          <Link className="button secondary" href="/dashboard">
            Open dashboard
          </Link>
        </div>
        <ProgressDashboard />
      </section>
    </main>
  );
}
