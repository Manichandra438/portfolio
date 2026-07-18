import { Mail, Phone, MapPin, Download } from "lucide-react";
import { personal } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import { GithubIcon, LinkedinIcon } from "./icons/Brand";

const bootLines = [
  "Initializing session...",
  "Loading profile: manichandra...",
  "Establishing secure connection... done.",
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-16">
      <TerminalWindow title="manichandra@portfolio:~">
        <div className="space-y-1 text-xs text-term-fg-dim sm:text-sm">
          {bootLines.map((line, i) => (
            <p key={line} className="boot-line" style={{ animationDelay: `${i * 0.25}s` }}>
              {line}
            </p>
          ))}
        </div>

        <p className="prompt mt-4 text-term-fg-dim">
          <span
            className="typewriter-command"
            style={
              {
                "--chars": 6,
                animationDelay: "0.9s, 0.9s, 1.3s",
                animationDuration: "0.4s, 0.4s, 0.01s",
              } as React.CSSProperties
            }
          >
            whoami
          </span>
        </p>

        <h1
          className="typewriter mt-3 text-2xl font-bold text-term-green sm:text-4xl"
          style={
            {
              "--chars": personal.name.length,
              "--type-duration": "0.6s",
              animationDelay: "1.5s",
            } as React.CSSProperties
          }
        >
          {personal.name}
        </h1>

        <div className="reveal" style={{ animationDelay: "2.3s" }}>
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
        </div>
      </TerminalWindow>
    </section>
  );
}
