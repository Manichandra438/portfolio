import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same ">_" mark as icon.svg, rasterized because iOS ignores SVG touch icons.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f13",
          color: "#3ddc97",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        &gt;_
      </div>
    ),
    size
  );
}
