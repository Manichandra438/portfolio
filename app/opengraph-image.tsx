import { ImageResponse } from "next/og";
import { personal } from "@/data/resume";

export const alt = `${personal.name}: ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Matrix theme colors from globals.css; ImageResponse can't read CSS variables.
const bg = "#0b0f13";
const raised = "#10161c";
const border = "#223040";
const fg = "#e6edf3";
const dim = "#8b98a5";
const green = "#3ddc97";
const amber = "#ffb454";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: bg, padding: 56 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: raised,
            border: `2px solid ${border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 28px",
              borderBottom: `2px solid ${border}`,
              color: dim,
              fontSize: 24,
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 8, background: "#ff5f56" }} />
            <div style={{ width: 16, height: 16, borderRadius: 8, background: "#ffbd2e" }} />
            <div style={{ width: 16, height: 16, borderRadius: 8, background: green }} />
            <span style={{ marginLeft: 12 }}>manichandra@portfolio:~</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "40px 48px", flex: 1 }}>
            <span style={{ color: dim, fontSize: 30 }}>$ whoami</span>
            <span style={{ color: green, fontSize: 84, fontWeight: 700, marginTop: 16 }}>{personal.name}</span>
            <span style={{ color: amber, fontSize: 36, marginTop: 12 }}>{personal.title}</span>
            <span style={{ color: fg, fontSize: 30, marginTop: 32, lineHeight: 1.4 }}>{personal.tagline}</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
