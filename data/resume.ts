export const personal = {
  name: "Manichandra M R",
  title: "Software Engineer II | Backend .NET Developer",
  location: "Bengaluru, India",
  phone: "+91 63620 71442",
  email: "manichandramr438@gmail.com",
  linkedin: "https://linkedin.com/in/manichandra-m-r-b65433187",
  github: "https://github.com/Manichandra438",
  resumeFile: "/Manichandra_MR_Resume_2026.pdf",
  summary:
    "Backend Software Engineer with 3+ years building and modernizing enterprise vehicle-claims platforms in C# / .NET at Solera. 4x Star of the Month awardee. Currently leading the cloud migration of a document-extraction service and an Azure AI pipeline that automates data extraction from estimate templates. Core strengths: REST API design, legacy modernization, high-volume file processing, and production incident response.",
};

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["C#", "SQL", "JavaScript", "HTML", "CSS", "XML", "XSLT"] },
  {
    category: "Backend",
    items: [".NET", ".NET Core", "ASP.NET MVC", "Web API", "Entity Framework", "Windows Services", "IIS"],
  },
  { category: "APIs & Integration", items: ["REST", "JSON", "SOAP/XML", "Postman", "OnBase (Hyland)"] },
  { category: "Database", items: ["Microsoft SQL Server"] },
  { category: "Cloud & DevOps", items: ["Microsoft Azure (AI services)", "Rancher", "Git", "GitHub", "Windows Task Scheduler"] },
  {
    category: "Frontend & Mobile (projects)",
    items: ["React", "React Native (Expo)", "Node.js", "Vite", "Tailwind CSS", "Firebase", "Socket.IO"],
  },
  {
    category: "Practices",
    items: [
      "Multi-threading & parallel processing",
      "Unit testing",
      "Legacy modernization",
      "Production support (24-hr SLA)",
      "Client onboarding",
      "AI-assisted development (Copilot, Claude Code)",
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
        "Leading the cloud migration of the platform's document extraction service and implementing an Azure AI pipeline that auto-extracts data from diverse estimate templates, improving extraction accuracy and reducing manual review.",
        "Led the migration of 72 Windows Servers with a 4-engineer team, achieving zero data loss and near-zero downtime across the HyperQuest platform.",
        "Designed and built a REST API integration connecting OnBase (Hyland) with HyperQuest, replacing 10 legacy VB scripts and eliminating a third-party dependency from the document workflow.",
        "Resolved high-severity production incidents (NTOs, 24-hour SLA) by live-debugging on NOC calls and proposing fixes during the call, minimizing user-facing impact for enterprise clients.",
        "Built a Windows Service that detects and quarantines corrupted PDF files before processing, eliminating a recurring class of downstream pipeline failures.",
        "Drove technical onboarding of 5 enterprise clients, owning integration, configuration, and go-live support.",
        "Improved logging and observability across platform components, reducing troubleshooting time and mean time to resolution (MTTR).",
      ],
    },
    {
      role: "Associate Software Engineer",
      period: "May 2023 - Jul 2025",
      bullets: [
        "Modernized a legacy Internet Explorer + ActiveX application to run on all modern browsers and rebuilt its UI end-to-end, extending product life and improving performance and accessibility for every user.",
        "Re-engineered two Windows Services with multi-threaded, parallel-session processing, file-count tracking, and job-completion gates, cutting end-of-day batch processing time and increasing throughput.",
        "Built a fully configurable data-retention engine (company-level holds, claim-based filtering, claim-number extraction from filenames and XML) that safely automated cleanup of 9 TB of file-share data with CSV audit logs for every deletion.",
        "Migrated claim creation and outbound document delivery for 2 enterprise clients from legacy SOAP/XML to modern REST/JSON APIs.",
        "Implemented TXFB photo consolidation, merging multiple claim images into a single outbound PDF, streamlining client document delivery.",
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
  school: "GM Institute of Technology, Davangere, Karnataka",
  period: "2018 - 2022",
};

export const navCommands = [
  { id: "about", label: "whoami" },
  { id: "experience", label: "experience --log" },
  { id: "projects", label: "projects --ls" },
  { id: "skills", label: "skills --list" },
  { id: "contact", label: "contact --send" },
];
