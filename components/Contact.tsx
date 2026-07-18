import { Mail, Phone } from "lucide-react";
import { personal } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import { GithubIcon, LinkedinIcon } from "./icons/Brand";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <TerminalWindow title="contact --send">
        <p className="prompt text-term-fg-dim">contact --send</p>
        <p className="mt-3 text-sm text-term-fg sm:text-base">
          Open to backend / full-stack roles. Reach out any of these ways:
        </p>

        <div className="mt-5 flex flex-col gap-3 text-sm">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-3 text-term-fg transition-colors hover:text-term-green"
          >
            <Mail size={16} className="text-term-green" /> {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-term-fg transition-colors hover:text-term-green"
          >
            <Phone size={16} className="text-term-green" /> {personal.phone}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-term-fg transition-colors hover:text-term-green"
          >
            <LinkedinIcon size={16} className="text-term-green" /> linkedin.com/in/manichandra-m-r-b65433187
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-term-fg transition-colors hover:text-term-green"
          >
            <GithubIcon size={16} className="text-term-green" /> github.com/Manichandra438
          </a>
        </div>
      </TerminalWindow>

      <p className="mt-8 text-center text-xs text-term-fg-dim">
        &copy; {new Date().getFullYear()} {personal.name}. Built with Next.js &amp; Tailwind CSS.
      </p>
    </section>
  );
}
