import { Mail, Phone, MapPin, Download } from "lucide-react";
import { personal } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import { GithubIcon, LinkedinIcon } from "./icons/Brand";

const windowTitle = "manichandra@portfolio:~";

const bootLines = [
  "Initializing session...",
  "Loading profile: manichandra...",
  "Establishing secure connection... done.",
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-16">
      <TerminalWindow
        title={
          <span
            className="typewriter-command"
            style={
              {
                "--chars": windowTitle.length,
                animationDelay: "0.1s, 0.1s, 0.8s",
                animationDuration: "0.7s, 0.4s, 0.01s",
              } as React.CSSProperties
            }
          >
            {windowTitle}
          </span>
        }
      >
        <div className="space-y-1 text-xs text-term-fg-dim sm:text-sm">
          {bootLines.map((line, i) => (
            <p key={line} className="boot-line" style={{ animationDelay: `${0.9 + i * 0.25}s` }}>
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
                animationDelay: "1.9s, 1.9s, 2.3s",
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
              animationDelay: "2.5s",
            } as React.CSSProperties
          }
        >
          {personal.name}
        </h1>

        <p className="reveal mt-2 text-base text-term-amber sm:text-lg" style={{ animationDelay: "3.3s" }}>
          {personal.title}
        </p>

        <div
          className="reveal mt-4 flex items-center gap-2 text-sm text-term-fg-dim"
          style={{ animationDelay: "3.45s" }}
        >
          <MapPin size={15} />
          <span>{personal.location}</span>
        </div>

        <p
          className="reveal mt-5 max-w-2xl text-sm leading-relaxed text-term-fg sm:text-base"
          style={{ animationDelay: "3.6s" }}
        >
          {personal.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={`mailto:${personal.email}`}
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "3.8s" }}
          >
            <Mail size={15} /> {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "3.88s" }}
          >
            <Phone size={15} /> {personal.phone}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "3.96s" }}
          >
            <LinkedinIcon size={15} /> LinkedIn
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "4.04s" }}
          >
            <GithubIcon size={15} /> GitHub
          </a>
          <a
            href={personal.resumeFile}
            download
            className="reveal flex items-center gap-2 rounded-md border border-term-green bg-term-green/10 px-3 py-2 text-term-green transition-colors hover:bg-term-green/20"
            style={{ animationDelay: "4.12s" }}
          >
            <Download size={15} /> Resume
          </a>
        </div>

        <p className="reveal blink-cursor mt-8 text-sm text-term-fg-dim" style={{ animationDelay: "4.3s" }}>
          scroll to continue
        </p>
      </TerminalWindow>
    </section>
  );
}
