"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCourseWorkspace = pathname.startsWith("/courses/");

  return (
    <>
      {isCourseWorkspace ? null : (
        <div className="shell">
          <nav className="nav" aria-label="Primary navigation">
            <Link className="brand" href="/">
              <span className="brand-mark">BC</span>
              <span>Bootcamp Companion</span>
            </Link>
            <div className="nav-links">
              <Link href="/#courses">Courses</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/mentor">AI Mentor</Link>
            </div>
          </nav>
        </div>
      )}
      {children}
      {isCourseWorkspace ? null : (
        <footer className="shell footer">
          Built as a focused MVP for crash-course learning, project practice, and
          Cursor SDK-powered mentorship.
        </footer>
      )}
    </>
  );
}
