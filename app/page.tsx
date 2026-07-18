import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { HeroReadyProvider } from "@/components/HeroReadyContext";

export default function Home() {
  return (
    <HeroReadyProvider>
      <Nav />
      <main className="flex-1 pb-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>
    </HeroReadyProvider>
  );
}
