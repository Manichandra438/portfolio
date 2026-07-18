"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { personal } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "./icons/Brand";
import TypedText from "./TypedText";
import { useHeroReady } from "./HeroReadyContext";

export default function HeroTypedContent() {
  const [step, setStep] = useState(0);
  const { markReady } = useHeroReady();

  return (
    <>
      <p className="mt-2 text-base text-term-amber sm:text-lg">
        <TypedText
          text={personal.title}
          startDelay={3.3}
          speed={45}
          onDone={() => setStep((s) => Math.max(s, 1))}
        />
      </p>

      {step >= 1 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-term-fg-dim">
          <MapPin size={15} />
          <TypedText text={personal.location} speed={45} onDone={() => setStep((s) => Math.max(s, 2))} />
        </div>
      )}

      {step >= 2 && (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-term-fg sm:text-base">
          <TypedText
            text={personal.summary}
            speed={70}
            onDone={() => {
              setStep((s) => Math.max(s, 3));
              markReady();
            }}
          />
        </p>
      )}

      {step >= 3 && (
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={`mailto:${personal.email}`}
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "0s" }}
          >
            <Mail size={15} /> {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "0.08s" }}
          >
            <Phone size={15} /> {personal.phone}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "0.16s" }}
          >
            <LinkedinIcon size={15} /> LinkedIn
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal flex items-center gap-2 rounded-md border border-term-border px-3 py-2 text-term-fg transition-colors hover:border-term-green hover:text-term-green"
            style={{ animationDelay: "0.24s" }}
          >
            <GithubIcon size={15} /> GitHub
          </a>
          <a
            href={personal.resumeFile}
            download
            className="reveal flex items-center gap-2 rounded-md border border-term-green bg-term-green/10 px-3 py-2 text-term-green transition-colors hover:bg-term-green/20"
            style={{ animationDelay: "0.32s" }}
          >
            <Download size={15} /> Resume
          </a>
        </div>
      )}

      {step >= 3 && (
        <p className="reveal blink-cursor mt-8 text-sm text-term-fg-dim" style={{ animationDelay: "0.5s" }}>
          scroll to continue
        </p>
      )}
    </>
  );
}
