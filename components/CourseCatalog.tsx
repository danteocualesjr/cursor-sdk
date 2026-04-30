"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/lib/courses";

type StatusFilter = "All" | Course["status"];

const statusFilters: StatusFilter[] = ["All", "Live MVP", "Preview"];

export function CourseCatalog({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesStatus = status === "All" || course.status === status;
      const matchesQuery =
        !normalizedQuery ||
        [
          course.title,
          course.description,
          course.audience,
          course.level,
          course.duration,
          ...course.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [courses, query, status]);

  return (
    <div className="catalog-stack">
      <div className="catalog-controls" aria-label="Course catalog filters">
        <label className="catalog-search">
          <span>Search tracks</span>
          <input
            placeholder="Try React, Python, SQL..."
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-pills" role="group" aria-label="Filter by status">
          {statusFilters.map((filter) => (
            <button
              aria-pressed={status === filter}
              className={status === filter ? "active" : ""}
              key={filter}
              onClick={() => setStatus(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredCourses.length ? (
        <div className="grid three">
          {filteredCourses.map((course) => (
            <CourseCard course={course} key={course.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No tracks found</h3>
          <p className="muted">
            Try a broader keyword or switch back to all course statuses.
          </p>
        </div>
      )}
    </div>
  );
}
