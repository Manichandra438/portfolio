export const personal = {
  name: "Manichandra M R",
  title: "Software Engineer II | .NET & AI-Powered Claims Solutions",
  location: "Bengaluru, India",
  email: "manichandramr438@gmail.com",
  linkedin: "https://linkedin.com/in/manichandra-m-r-b65433187",
  github: "https://github.com/Manichandra438",
  resumeFile: "/Manichandra_MR_Resume_2026.pdf",
  tagline:
    "I build C# / .NET backends and Azure AI pipelines that turn messy vehicle-claim documents into clean, structured data.",
  // {years} is replaced with whole years of experience at render time; see experienceSince().
  summary:
    "Backend Software Engineer with {years}+ years building and modernizing enterprise vehicle-claims platforms in C# / .NET at Solera. 4x Star of the Month awardee. Currently leading the cloud migration of a document-extraction service and building an Azure AI pipeline (Azure AI Document Intelligence + Azure OpenAI) that automates data extraction from estimate templates. Core strengths: REST API design, legacy modernization, high-volume file processing, production incident response, and AI-assisted developer tooling.",
};

// First day at Solera (Associate Software Engineer, May 2023). Months are 0-based.
export const careerStart = new Date(2023, 4, 1);

// Counts the start month as month one, so May 2023 -> Oct 2026 is 3 years 6 months.
export function experienceSince(start: Date, now: Date = new Date()) {
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
  return { years: Math.floor(months / 12), months: months % 12 };
}

export function formatExperience({ years, months }: { years: number; months: number }) {
  return months === 0 ? `${years} yrs` : `${years} yrs ${months} mos`;
}

// About.tsx prepends a live "years of experience" tile computed from careerStart.
export const impact: { value: string; label: string }[] = [
  { value: "4x", label: "Star of the Month" },
  { value: "72", label: "servers migrated, zero data loss" },
  { value: "30%", label: "cost cut via OnBase REST integration" },
  { value: "9 TB", label: "file-share data cleaned up safely" },
  { value: "5", label: "enterprise clients onboarded" },
];

export const caseStudy = {
  title: "AI document-extraction pipeline",
  context: "Solera · HyperQuest · Software Engineer II (2025 - present)",
  problem:
    "Claim packages arrive as a mix of BMS XML, PDFs, scans, images, HTML, and ZIPs, in many different estimate templates. Reviewers keyed the important numbers in by hand.",
  role: "Leading the cloud migration of the extraction service and building its Azure AI pipeline end to end.",
  pipeline: [
    { step: "S3 intake", detail: "Claim packages: BMS XML + PDF, TIFF, JPG, HTML, ZIP" },
    { step: "Hangfire job", detail: "Unpack the package and convert every page to an image" },
    { step: "OCR + layout", detail: "Azure AI Document Intelligence, template detection (Mitchell, CCC, Audatex)" },
    { step: "Azure OpenAI", detail: "Classify pages; extract header, totals, line items with consensus voting" },
    { step: "Validate", detail: "VIN validation, labour-hour and estimate / tow-bill reconciliation" },
    { step: "STP decision", detail: "Auto-complete the claim, or route to human review with clear reasons" },
    { step: "SQL Server", detail: "Structured EMS data saved in a single transaction" },
  ],
  highlights: [
    {
      heading: "Reliability",
      text: "Retries and a circuit breaker on AI calls, CancellationToken propagation, parallel AI calls, honest failure reporting, and liveness / readiness probes for SQL Server, S3, and the AI endpoint.",
    },
    {
      heading: "Cost",
      text: "Prompt and OCR-payload trimming plus AI response caching to cut tokens per document. GPT-5 reasoning-model support.",
    },
    {
      heading: "Delivery",
      text: "Docker on Rancher Kubernetes with autoscaling, Vault-managed secrets, GitHub Actions CI/CD for QAE, CAE, and PRD with one-click rollback, New Relic APM, and a passing SonarQube gate.",
    },
    {
      heading: "Tooling",
      text: "HQ Prompt Tester, an internal app to compare Azure OpenAI models side by side on accuracy, tokens, and speed, plus a failed-claims review to re-run extractions.",
    },
  ],
  stack: [
    "ASP.NET Core Web API",
    "Hangfire",
    "Azure OpenAI",
    "Azure AI Document Intelligence",
    "SQL Server",
    "S3",
    "Docker",
    "Kubernetes (Rancher)",
    "GitHub Actions",
    "HashiCorp Vault",
  ],
  note: "Internal system: described at a high level, no proprietary code or data.",
};

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["C#", "SQL (T-SQL)", "JavaScript", "HTML", "CSS", "XML", "XSLT", "PowerShell"] },
  {
    category: "Backend (.NET)",
    items: [
      ".NET",
      ".NET Core",
      "ASP.NET Core Web API",
      "ASP.NET MVC",
      "Entity Framework (Core)",
      "ADO.NET",
      "LINQ",
      "Dependency Injection",
      "OOP",
      "SOLID principles",
      "Design patterns",
      "Microservices",
      "async/await",
      "Multi-threading & parallel processing",
      "Hangfire (background jobs)",
      "Dapper",
      "Windows Services",
      "IIS",
    ],
  },
  {
    category: "APIs & Integration",
    items: ["REST", "JSON", "SOAP/XML", "Swagger/OpenAPI", "Postman", "OnBase (Hyland)"],
  },
  {
    category: "AI / LLM",
    items: [
      "Azure OpenAI Service (GPT models)",
      "Azure AI Document Intelligence (Form Recognizer)",
      "LLM-based data extraction",
      "Prompt engineering",
    ],
  },
  { category: "Database", items: ["Microsoft SQL Server", "Stored procedures", "Query tuning", "Schema design"] },
  {
    category: "Cloud & DevOps",
    items: [
      "Microsoft Azure (AI services)",
      "Docker",
      "Kubernetes (Rancher)",
      "GitHub Actions (CI/CD)",
      "Azure DevOps",
      "HashiCorp Vault",
      "S3 object storage",
      "IIS deployment",
      "PowerShell automation",
      "Windows Task Scheduler",
      "Git",
      "GitHub",
    ],
  },
  {
    category: "Testing & Observability",
    items: ["xUnit", "NUnit", "Moq", "SonarQube", "Playwright", "Graylog", "New Relic APM"],
  },
  {
    category: "AI Developer Tooling",
    items: [
      "GitHub Copilot",
      "Claude Code",
      "MCP servers (Graylog, S3, SQL Server, Jira, Confluence)",
      "Custom Copilot skills & agents",
    ],
  },
  {
    category: "Frontend & Mobile (projects)",
    items: ["React", "React Native (Expo)", "Node.js", "Vite", "Tailwind CSS", "Firebase", "Socket.IO"],
  },
  {
    category: "Practices",
    items: [
      "Legacy modernization",
      "Production support (24-hr SLA)",
      "Client onboarding",
      "Release management",
      "Agile/Scrum",
      "Jira",
      "Confluence",
    ],
  },
];

export type ExperienceRole = {
  role: string;
  period: string;
  bullets: string[];
};

export const experience: {
  company: string;
  location: string;
  products: string;
  roles: ExperienceRole[];
} = {
  company: "Solera Holdings",
  location: "Bengaluru, India",
  products: "HyperQuest (vehicle claims management) and APD (auto physical damage assessment)",
  roles: [
    {
      role: "Software Engineer II",
      period: "Aug 2025 - Present",
      bullets: [
        "Leading the cloud migration of the document-extraction service: an ASP.NET Core Web API with Hangfire background jobs that pulls claim packages (BMS XML + PDF, TIFF, JPG, HTML, ZIP) from S3, converts pages to images, and uses Azure OpenAI to classify each page and extract header, totals, and line items into structured EMS data in SQL Server, reducing manual review.",
        "Improved extraction accuracy with template detection (Mitchell, CCC Pathways, Audatex) and layout hints, consensus voting for line-item extraction, VIN validation, and labour-hour and estimate/tow-bill reconciliation. Added GPT-5 reasoning-model support.",
        "Built the Document Review STP evaluator. It classifies estimates, tow bills, and ACVs, extracts their amounts, and either auto-completes the claim (straight-through processing) or routes it to human review with clear reasons. Also built claim-cancel evaluation and a manual page-reprocess API.",
        "Hardened reliability: retries and a circuit breaker for AI calls, CancellationToken propagation, transactional EMS saves, parallel AI calls (Task.WhenAll), reporting AI failures instead of a false \"amount not found\", and liveness/readiness health checks (SQL Server, S3, AI endpoint) for Kubernetes probes.",
        "Built CI/CD pipelines in GitHub Actions for QAE, CAE, and PRD with verified deployments and one-click auto-rollback. The service runs on Rancher Kubernetes with autoscaling, Vault-managed secrets (hardcoded credentials removed), and New Relic APM.",
        "Optimized prompts, OCR payloads, and AI response caching to reduce token usage per document. Built a reusable S3 file-handling library. The service runs as containerized (Docker) workloads on Rancher-managed Kubernetes, with unit tests in xUnit/NUnit + Moq and a passing SonarQube quality gate.",
        "Built HQ Prompt Tester, an internal application for testing AI extraction on page images and Azure AI Document Intelligence OCR output. It is used to optimize prompts by tracking input, output, and total tokens, and to compare Azure OpenAI models side by side on extraction results, accuracy, token usage, and speed. Also built a failed-claims review feature to re-run failed extractions.",
        "Designed and built a REST API integration connecting OnBase (Hyland) with HyperQuest, replacing 10 legacy VB scripts, removing a third-party dependency from the document workflow, and cutting cost by 30%.",
        "Led the migration of 72 Windows Servers with a 4-engineer team, achieving zero data loss and near-zero downtime across the HyperQuest platform.",
        "Deliver APD features across the full request flow (client forms, .NET service endpoints, XSLT transforms, and SQL Server stored procedures) with carrier-specific configuration and isolation.",
        "Own deployments: deploy .NET applications and Windows Services to IIS in lower environments, and write production deployment scripts and runbooks for the SCM team, along with monthly release branch management.",
        "Resolved critical (P1) production incidents with a 24-hour SLA by live-debugging on NOC calls and proposing fixes during the call, minimizing user-facing impact for enterprise clients.",
        "Built a Windows Service that detects and quarantines corrupted PDF files before processing, eliminating a recurring class of downstream pipeline failures.",
        "Built custom MCP servers (Node.js) connecting GitHub Copilot to Graylog, S3 buckets, and multiple SQL Server environments, and integrated Jira and Confluence MCP servers, plus custom Copilot skills and agents for code review, documentation, and Jira analysis. This cut investigation time for the team.",
        "Drove technical onboarding of 5 enterprise clients, owning integration, configuration, and go-live support.",
        "Improved logging and observability (Graylog) across platform components, reducing troubleshooting time and mean time to resolution (MTTR).",
      ],
    },
    {
      role: "Associate Software Engineer",
      period: "May 2023 - Jul 2025",
      bullets: [
        "Modernized a legacy Internet Explorer + ActiveX application to run on all modern browsers and rebuilt its UI end to end, extending product life and improving performance and accessibility for every user.",
        "Re-engineered two Windows Services with multi-threaded, parallel-session processing, file-count tracking, and job-completion gates, cutting end-of-day batch processing time and increasing throughput.",
        "Built a fully configurable data-retention engine (company-level holds, claim-based filtering, claim-number extraction from filenames and XML) that safely automated cleanup of 9 TB of file-share data, with CSV audit logs for every deletion.",
        "Automated Windows file-share storage maintenance with PowerShell scripts that purge old logs and work-area files, scheduled through Windows Task Scheduler.",
        "Migrated claim creation and outbound document delivery for 2 enterprise clients from legacy SOAP/XML to modern REST/JSON APIs.",
        "Implemented TXFB photo consolidation, merging multiple claim images into a single outbound PDF to streamline client document delivery.",
      ],
    },
  ],
};

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  bullets: string[];
  link: string;
};

export const projects: Project[] = [
  {
    name: "FarmRent",
    tagline: "Farm Equipment Rental Platform",
    stack: ["React", "Node.js", "Socket.IO", "Razorpay"],
    bullets: [
      "Peer-to-peer platform for Indian farmers to rent idle agricultural equipment directly: location-based search on Mappls maps, Razorpay payments (UPI/card/net-banking) plus cash-on-delivery, real-time Socket.IO chat, verified ratings, and owner dashboards.",
      "Built a Farmer Hub: state/district-filtered government schemes, 7-day weather advisories with 25 rule-based farm alerts, live mandi prices from data.gov.in (Agmarknet), and a KYC-verified marketplace (license / GSTIN / Aadhaar) with 2% platform commission.",
      "Automated daily cron notifications (severe-weather alerts, mandi-price digests) and real-time order updates; localized in 7 Indian languages.",
    ],
    link: "https://github.com/Manichandra438/farmrent-app",
  },
  {
    name: "FitMate",
    tagline: "Diet Planner & Nutrition Tracker (Android)",
    stack: ["React Native (Expo)", "Firebase"],
    bullets: [
      "Offline-first Android app generating personalized calorie/protein/water targets with meal, exercise, water, and weight tracking.",
      "Firebase cloud sync via Google Sign-In and an Android home-screen widget for quick status.",
    ],
    link: "https://github.com/Manichandra438/FitMate",
  },
  {
    name: "ConvertMaster",
    tagline: "Developer Tools & File Converter (Web)",
    stack: ["React", "Vite", "Tailwind CSS"],
    bullets: [
      "All-in-one web app combining developer utilities with file conversion in a modern glassmorphism dark UI.",
    ],
    link: "https://github.com/Manichandra438/ConvertMaster",
  },
];

export const achievements: string[] = ["4x Star of the Month at Solera Holdings for delivery excellence."];

export const education = {
  degree: "Bachelor of Engineering (B.E.), Electronics & Communication Engineering",
  school: "GM Institute of Technology, Davangere, Karnataka (VTU)",
  period: "2018 - 2022",
};

export const navCommands = [
  { id: "about", label: "whoami" },
  { id: "experience", label: "experience --log" },
  { id: "case-study", label: "case-study" },
  { id: "projects", label: "projects --ls" },
  { id: "skills", label: "skills --list" },
  { id: "contact", label: "contact --send" },
];
