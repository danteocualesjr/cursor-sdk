import { MentorPanel } from "@/components/MentorPanel";
import { SubmissionReview } from "@/components/SubmissionReview";

export default function MentorPage() {
  return (
    <main className="shell section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Cursor SDK mentor</p>
          <h1>Ask for help with code, errors, or practice work.</h1>
          <p className="lead">
            This page demonstrates the AI mentor layer. If `CURSOR_API_KEY` is
            set on the server, requests run through Cursor SDK. Without a key,
            the app returns demo guidance so the product still works locally.
          </p>
        </div>
      </div>

      <div className="lesson-layout">
        <section className="lesson-body">
          <h2>How students should use the mentor</h2>
          <ul>
            <li>Ask what a concept means in plain English.</li>
            <li>Paste the smallest code sample that reproduces the problem.</li>
            <li>Ask for a hint before asking for the full answer.</li>
            <li>Submit completed exercises for feedback on clarity and behavior.</li>
          </ul>
          <SubmissionReview
            courseTitle="General Bootcamp Prep"
            exercise="Paste a small exercise solution and ask for feedback on correctness, readability, and next steps."
          />
        </section>
        <MentorPanel courseTitle="General Bootcamp Prep" />
      </div>
    </main>
  );
}
