import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bootcamp Companion",
  description:
    "AI-powered crash courses and code-aware mentorship for students preparing for technical programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
        {children}
        <footer className="shell footer">
          Built as a focused MVP for crash-course learning, project practice, and
          Cursor SDK-powered mentorship.
        </footer>
      </body>
    </html>
  );
}
