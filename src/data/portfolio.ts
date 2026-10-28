export type Profile = {
  name: string;
  chineseName: string;
  role: string;
  description: string;
};

export type SkillGroup = {
  name: string;
  description: string;
  skills: string[];
};

export type Capability = {
  number: string;
  title: string;
  description: string;
  icon: "api" | "database" | "cache" | "tools";
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  challenge: string;
  approach: string;
  highlights: string[];
};

export type ApproachStep = {
  title: string;
  description: string;
};

export const approach: ApproachStep[] = [
  {
    title: "Understand the problem.",
    description:
      "Start with what the system needs to do. Work through the data, the constraints, and the people using it.",
  },
  {
    title: "Build it thoughtfully.",
    description:
      "Keep the API clear, the queries deliberate, and the structure easy to follow. Make the small decisions count.",
  },
  {
    title: "Test. Measure. Improve.",
    description:
      "Check the behavior, read the execution plan, and improve what the evidence points to. Then do it again.",
  },
];

export const profile: Profile = {
  name: "Luke",
  chineseName: "嘉乐",
  role: "Backend Developer",
  description:
    "I build APIs, work with databases, and enjoy making systems fast and reliable.",
};

export const contactDetails = {
  email: "lacpham985@gmail.com",
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Backend & languages",
    description: "The foundations behind the interface.",
    skills: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Express.js",
      "C#",
    ],
  },
  {
    name: "Databases & caching",
    description: "Thoughtful queries. Less waiting.",
    skills: ["SQL", "PostgreSQL", "Oracle", "Neon", "Redis"],
  },
  {
    name: "Tools & delivery",
    description: "From a local request to a running service.",
    skills: ["Docker", "Postman", "Git", "HTML5", "CSS3"],
  },
];

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "APIs with purpose.",
    description:
      "Building RESTful APIs with NestJS, Express, TypeScript, and C#. Clear endpoints, useful responses, and a structure that is easy to work with.",
    icon: "api",
  },
  {
    number: "02",
    title: "Data, without the wait.",
    description:
      "Writing and optimizing SQL for PostgreSQL, Neon, and Oracle. Looking at indexes and execution plans to understand where query time goes.",
    icon: "database",
  },
  {
    number: "03",
    title: "A little less work.",
    description:
      "Using Redis to speed up responses and reduce database load, with attention to what should be cached and when it needs refreshing.",
    icon: "cache",
  },
  {
    number: "04",
    title: "Ready for the next step.",
    description:
      "Testing and documenting APIs with Postman, containerizing applications with Docker, deploying to servers, and managing changes with Git.",
    icon: "tools",
  },
];

// These are clearly labelled concept studies, not claims of completed client work.
// Replace them with verified projects and repository links as they become available.
export const projects: Project[] = [
  {
    id: "rest-api",
    title: "The API, underneath.",
    category: "Concept study · API design",
    description:
      "An exploration of the small decisions that make a REST API clear, testable, and easier to maintain.",
    stack: ["NestJS", "TypeScript", "Postman"],
    challenge:
      "How should an API stay understandable as its endpoints and business rules grow?",
    approach:
      "This concept study outlines a modular NestJS service with explicit request validation, consistent error responses, and a Postman collection for repeatable checks.",
    highlights: [
      "Separate routing, business logic, and data access.",
      "Define useful validation and error responses.",
      "Document request examples and expected responses.",
    ],
  },
  {
    id: "query-lab",
    title: "A closer look at queries.",
    category: "Concept study · Database performance",
    description:
      "A practical approach to reading execution plans and understanding what makes a SQL query expensive.",
    stack: ["PostgreSQL", "SQL", "Neon"],
    challenge:
      "How can a slow query be improved without guessing which index might help?",
    approach:
      "This concept study starts with a query and representative data, inspects its execution plan, and compares indexing and query changes against the same workload. No performance results are claimed here.",
    highlights: [
      "Read execution plans before making changes.",
      "Consider indexes alongside query and schema design.",
      "Compare query behavior with representative data.",
    ],
  },
  {
    id: "cache-layer",
    title: "One request, less waiting.",
    category: "Concept study · Caching",
    description:
      "Thinking through a Redis cache layer that reduces repeated reads while keeping refresh behavior explicit.",
    stack: ["Redis", "Node.js", "Docker"],
    challenge:
      "How can repeated requests avoid unnecessary database work without hiding stale data?",
    approach:
      "This concept study describes a cache-aside flow, deliberate key naming, expiration rules, and invalidation after writes. It also considers how the API should behave when the cache is unavailable.",
    highlights: [
      "Make cache keys and expiration rules predictable.",
      "Invalidate affected entries after data changes.",
      "Allow database reads when the cache is unavailable.",
    ],
  },
];
