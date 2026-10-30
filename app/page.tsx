import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudy from "@/components/CaseStudy";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { personal, experience } from "@/data/resume";
import { siteUrl } from "@/data/site";

// Re-render once a day so the experience counter in About stays current between deploys.
export const revalidate = 86400;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteUrl,
  email: `mailto:${personal.email}`,
  jobTitle: "Software Engineer II",
  worksFor: { "@type": "Organization", name: experience.company },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "GM Institute of Technology" },
  sameAs: [personal.linkedin, personal.github],
  knowsAbout: ["C#", ".NET", "ASP.NET Core", "Azure OpenAI", "Azure AI Document Intelligence", "SQL Server"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main className="flex-1 pb-10">
        <Hero />
        <About />
        <Experience />
        <CaseStudy />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>
    </>
  );
}
