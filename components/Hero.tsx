import { personal } from "@/data/resume";
import TerminalWindow from "./TerminalWindow";
import HeroTypedContent from "./HeroTypedContent";

const windowTitle = "manichandra@portfolio:~";

const bootLines = [
  "Initializing session...",
  "Loading profile: manichandra...",
  "Establishing secure connection... done.",
];

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-10 sm:px-6">
      <TerminalWindow
        title={
          <span
            className="typewriter-command"
            style={
              {
                "--chars": windowTitle.length,
                animationDelay: "0.1s, 0.1s, 0.5s",
                animationDuration: "0.4s, 0.3s, 0.01s",
              } as React.CSSProperties
            }
          >
            {windowTitle}
          </span>
        }
      >
        <div className="space-y-1 text-xs text-term-fg-dim sm:text-sm">
          {bootLines.map((line, i) => (
            <p key={line} className="boot-line" style={{ animationDelay: `${0.55 + i * 0.15}s` }}>
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
                animationDelay: "1.05s, 1.05s, 1.3s",
                animationDuration: "0.25s, 0.3s, 0.01s",
              } as React.CSSProperties
            }
          >
            whoami
          </span>
        </p>

        <h1
          className="typewriter-command mt-3 text-2xl font-bold text-term-green sm:text-4xl"
          style={
            {
              "--chars": personal.name.length,
              animationDelay: "1.45s, 1.45s, 1.75s",
              animationDuration: "0.3s, 0.3s, 0.01s",
            } as React.CSSProperties
          }
        >
          {personal.name}
        </h1>

        <HeroTypedContent />
      </TerminalWindow>
    </section>
  );
}
