import { Mail, Phone, MapPin, Download } from "lucide-react";
import { personal } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import { GithubIcon, LinkedinIcon } from "./icons/Brand";

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-16">
      <TerminalWindow title="manichandra@portfolio:~">
        <p className="prompt text-term-fg-dim">whoami</p>
        <h1 className="mt-3 text-2xl font-bold text-term-green sm:text-4xl">{personal.name}</h1>
        <p className="mt-2 text-base text-term-amber sm:text-lg">{personal.title}</p>

        <div className="mt-4 flex items-center gap-2 text-sm text-term-fg-dim">
          <MapPin size={15} />
          <span>{personal.location}</span>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-term-fg sm:text-base">
          {personal.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
          >
            <Mail size={15} /> {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
          >
            <Phone size={15} /> {personal.phone}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
          >
            <LinkedinIcon size={15} /> LinkedIn
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
          >
            <GithubIcon size={15} /> GitHub
          </a>
          <a
            href={personal.resumeFile}
            download
            className="flex items-center gap-2 rounded-md border border-term-green bg-term-green/10 px-3 py-2 text-term-green transition-colors hover:bg-term-green/20"
          >
            <Download size={15} /> Resume
          </a>
        </div>

        <p className="blink-cursor mt-8 text-sm text-term-fg-dim">scroll to continue</p>
      </TerminalWindow>
    </section>
  );
}
