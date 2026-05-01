export type Lesson = {
  title: string;
  summary: string;
  checkpoints: string[];
  exercise: string;
};

export type Module = {
  title: string;
  outcome: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  level: "Beginner" | "Beginner+" | "Intermediate";
  duration: string;
  status: "Live MVP" | "Preview";
  tags: string[];
  modules: Module[];
};

export const courses: Course[] = [
  {
    slug: "js-react-bootcamp-prep",
    title: "JavaScript + React Bootcamp Prep",
    shortTitle: "JS + React",
    description:
      "Learn the core JavaScript, browser, Git, and React skills students need before a modern web development bootcamp.",
    audience: "Future frontend and full-stack bootcamp students",
    level: "Beginner",
    duration: "3 weeks",
    status: "Live MVP",
    tags: ["JavaScript", "React", "Frontend"],
    modules: [
      {
        title: "JavaScript Foundations",
        outcome: "Write small programs using variables, functions, arrays, objects, and loops.",
        lessons: [
          {
            title: "Think Like A Program",
            summary:
              "Use inputs, steps, and outputs to break a problem into code-sized pieces.",
            checkpoints: [
              "Explain what a variable stores",
              "Trace a simple function call",
              "Convert a word problem into pseudocode",
            ],
            exercise:
              "Build a grade calculator that accepts scores and returns a beginner-friendly message.",
          },
          {
            title: "Arrays, Objects, And Loops",
            summary:
              "Practice the data shapes that show up constantly in React apps and APIs.",
            checkpoints: [
              "Loop over a list of records",
              "Read and update object properties",
              "Use map and filter for common transformations",
            ],
            exercise:
              "Create a study-plan formatter that groups lessons by topic and completion state.",
          },
        ],
      },
      {
        title: "React Essentials",
        outcome: "Build small component-based interfaces with props, state, and events.",
        lessons: [
          {
            title: "Components And Props",
            summary:
              "Turn repeated UI into reusable components and pass data into them.",
            checkpoints: [
              "Identify reusable UI blocks",
              "Pass props into a component",
              "Render lists with keys",
            ],
            exercise:
              "Build a course card grid for three bootcamp prep tracks.",
          },
          {
            title: "State And Events",
            summary:
              "Make interfaces respond to clicks, form input, and user choices.",
            checkpoints: [
              "Use state for changing UI",
              "Handle form input",
              "Derive UI from data instead of manual DOM changes",
            ],
            exercise:
              "Create a lesson checklist that tracks completed checkpoints.",
          },
        ],
      },
      {
        title: "Capstone Prep",
        outcome: "Ship a small React project that looks like a real bootcamp assignment.",
        lessons: [
          {
            title: "Mini Portfolio Sprint",
            summary:
              "Combine components, state, and simple data into a presentable learner portfolio.",
            checkpoints: [
              "Plan a component tree",
              "Style a responsive page",
              "Write a clear README",
            ],
            exercise:
              "Build a one-page portfolio with project cards and a learning reflection.",
          },
        ],
      },
    ],
  },
  {
    slug: "python-prep",
    title: "Python Prep",
    shortTitle: "Python",
    description:
      "Build comfort with Python syntax, problem solving, files, APIs, and automation before class starts.",
    audience: "Students entering Python, data, automation, or backend courses",
    level: "Beginner",
    duration: "2 weeks",
    status: "Live MVP",
    tags: ["Python", "Automation", "Problem solving"],
    modules: [
      {
        title: "Python Basics",
        outcome: "Write clear Python scripts with functions, conditionals, loops, and collections.",
        lessons: [
          {
            title: "Syntax Without Panic",
            summary:
              "Learn the pieces of Python students need before harder concepts arrive.",
            checkpoints: [
              "Use strings, numbers, and booleans",
              "Write conditionals",
              "Define and call functions",
            ],
            exercise:
              "Create a study timer helper that recommends breaks based on session length.",
          },
          {
            title: "Lists And Dictionaries",
            summary:
              "Represent real-world information using Python's most common data structures.",
            checkpoints: [
              "Loop through a list",
              "Store records in dictionaries",
              "Combine lists and dictionaries",
            ],
            exercise:
              "Build a simple assignment tracker that stores courses, due dates, and status.",
          },
        ],
      },
      {
        title: "Practical Python",
        outcome: "Use Python to read files, call APIs, and automate repetitive work.",
        lessons: [
          {
            title: "Files And Data",
            summary:
              "Read, clean, and summarize information from text or CSV-like input.",
            checkpoints: [
              "Open and read file content",
              "Split data into rows and columns",
              "Calculate a summary from records",
            ],
            exercise:
              "Analyze a weekly study log and report total hours by topic.",
          },
          {
            title: "APIs In Plain English",
            summary:
              "Understand requests and responses before using APIs in larger apps.",
            checkpoints: [
              "Describe what an API endpoint does",
              "Read JSON-like data",
              "Handle missing or unexpected values",
            ],
            exercise:
              "Mock a course recommendation API response and display the best next lesson.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-engineering-prep",
    title: "AI Engineering Prep",
    shortTitle: "AI Engineering",
    description:
      "Prepare for AI app courses with Python refreshers, prompt design, LLM APIs, embeddings, and evaluation basics.",
    audience: "Students entering AI engineering, LLM app, or applied AI programs",
    level: "Beginner+",
    duration: "3 weeks",
    status: "Live MVP",
    tags: ["AI", "LLMs", "Python"],
    modules: [
      {
        title: "AI App Foundations",
        outcome: "Understand the building blocks behind modern AI applications.",
        lessons: [
          {
            title: "Prompts As Product Interfaces",
            summary:
              "Treat prompts as instructions that shape outputs, constraints, and user experience.",
            checkpoints: [
              "Write role and task instructions",
              "Add examples and constraints",
              "Compare weak and strong prompts",
            ],
            exercise:
              "Design a prompt for an AI study coach that gives hints without solving the task.",
          },
          {
            title: "Calling An LLM API",
            summary:
              "Learn the request, response, and error-handling concepts behind AI features.",
            checkpoints: [
              "Identify the model input and output",
              "Handle empty or unsafe responses",
              "Track token and usage costs conceptually",
            ],
            exercise:
              "Sketch the server route for an AI mentor that receives lesson context and student code.",
          },
        ],
      },
      {
        title: "Retrieval And Evaluation",
        outcome: "Learn how AI systems use course material and how teams check answer quality.",
        lessons: [
          {
            title: "Embeddings And Search",
            summary:
              "Understand how apps retrieve relevant notes, lessons, and examples for better answers.",
            checkpoints: [
              "Explain embeddings in plain language",
              "Describe similarity search",
              "Choose helpful context for a tutor answer",
            ],
            exercise:
              "Plan a mini knowledge base for a bootcamp prep course.",
          },
          {
            title: "Evaluate The Mentor",
            summary:
              "Check whether an AI response is accurate, age-appropriate, and educational.",
            checkpoints: [
              "Define a simple rubric",
              "Spot hallucinated code advice",
              "Improve a response with constraints",
            ],
            exercise:
              "Review three mentor responses and rank them by usefulness.",
          },
        ],
      },
    ],
  },
  {
    slug: "web-development-foundations",
    title: "Web Development Foundations",
    shortTitle: "Web Foundations",
    description:
      "HTML, CSS, accessibility, browser basics, and deployment concepts for students starting from zero.",
    audience: "Absolute beginners preparing for web courses",
    level: "Beginner",
    duration: "2 weeks",
    status: "Preview",
    tags: ["HTML", "CSS", "Deployment"],
    modules: [],
  },
  {
    slug: "git-github-terminal",
    title: "Git, GitHub, And Terminal Basics",
    shortTitle: "Git + Terminal",
    description:
      "The practical workflow students need to clone repos, commit work, open PRs, and ask for help clearly.",
    audience: "Any student entering a code-heavy program",
    level: "Beginner",
    duration: "1 week",
    status: "Preview",
    tags: ["Git", "GitHub", "Terminal"],
    modules: [],
  },
  {
    slug: "cs-foundations",
    title: "Computer Science Foundations",
    shortTitle: "CS Foundations",
    description:
      "Problem solving, data structures, recursion, and Big O intuition without unnecessary math anxiety.",
    audience: "Bootcamp, CS, and interview prep students",
    level: "Beginner+",
    duration: "3 weeks",
    status: "Preview",
    tags: ["Algorithms", "Data structures", "Big O"],
    modules: [],
  },
  {
    slug: "data-analytics-prep",
    title: "Data Analytics Prep",
    shortTitle: "Data Analytics",
    description:
      "Spreadsheets, SQL, Python, pandas concepts, charts, and basic statistics for analytics learners.",
    audience: "Students entering analytics or data bootcamps",
    level: "Beginner",
    duration: "3 weeks",
    status: "Preview",
    tags: ["SQL", "Python", "Dashboards"],
    modules: [],
  },
  {
    slug: "sql-databases-prep",
    title: "SQL + Databases Prep",
    shortTitle: "SQL",
    description:
      "Tables, queries, joins, relationships, and practical database thinking for app and data students.",
    audience: "Software, analytics, and AI students",
    level: "Beginner",
    duration: "2 weeks",
    status: "Preview",
    tags: ["SQL", "Databases", "Queries"],
    modules: [],
  },
  {
    slug: "technical-interview-prep",
    title: "Technical Interview Prep",
    shortTitle: "Interviews",
    description:
      "Practice readable solutions, communicate tradeoffs, and review mistakes before technical screens.",
    audience: "Career changers and advanced bootcamp students",
    level: "Intermediate",
    duration: "4 weeks",
    status: "Preview",
    tags: ["Interviews", "Algorithms", "Communication"],
    modules: [],
  },
  {
    slug: "portfolio-project-prep",
    title: "Portfolio Project Prep",
    shortTitle: "Portfolio",
    description:
      "Turn course work into polished projects with clear scope, README files, demos, and reflection notes.",
    audience: "Students preparing for applications or graduation",
    level: "Beginner+",
    duration: "2 weeks",
    status: "Preview",
    tags: ["Projects", "README", "Career"],
    modules: [],
  },
];

export const liveCourses = courses.filter((course) => course.status === "Live MVP");

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getLessonCount(course: Course) {
  return course.modules.reduce(
    (count, module) => count + module.lessons.length,
    0,
  );
}

export type LessonRef = {
  id: string;
  moduleIndex: number;
  lessonIndex: number;
  module: Module;
  lesson: Lesson;
};

function buildLessonId(moduleIndex: number, lessonIndex: number) {
  return `m${moduleIndex + 1}l${lessonIndex + 1}`;
}

export function getCourseLessons(course: Course): LessonRef[] {
  return course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      id: buildLessonId(moduleIndex, lessonIndex),
      moduleIndex,
      lessonIndex,
      module,
      lesson,
    })),
  );
}

export function getLessonById(course: Course, lessonId: string | undefined) {
  const lessons = getCourseLessons(course);
  if (!lessons.length) {
    return null;
  }

  const match = lessonId
    ? lessons.find((entry) => entry.id === lessonId)
    : undefined;

  return match ?? lessons[0];
}

export function lessonFileName(lesson: Lesson) {
  return `${lesson.title.toLowerCase().replaceAll(" ", "-")}.md`;
}

export function getCatalogSummary() {
  const lessonCount = courses.reduce(
    (count, course) => count + getLessonCount(course),
    0,
  );
  const projectCount = liveCourses.reduce(
    (count, course) => count + course.modules.length,
    0,
  );

  return {
    liveCourseCount: liveCourses.length,
    totalCourseCount: courses.length,
    lessonCount,
    projectCount,
  };
}

export function getCompletionEstimate(course: Course) {
  if (course.status === "Preview") {
    return 0;
  }

  const totalLessons = getLessonCount(course);

  return Math.min(100, Math.max(25, totalLessons * 12));
}
