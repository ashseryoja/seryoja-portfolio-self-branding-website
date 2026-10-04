import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, site } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time; fonts and the photo live next to each other in src/lib/og.
const OG_DIR = join(process.cwd(), "src", "lib", "og");

export default async function OpengraphImage() {
  const [interRegular, interSemiBold, interBold, mono, photo] = await Promise.all([
    readFile(join(OG_DIR, "Inter-Regular.woff")),
    readFile(join(OG_DIR, "Inter-SemiBold.woff")),
    readFile(join(OG_DIR, "Inter-Bold.woff")),
    readFile(join(OG_DIR, "JetBrainsMono-Medium.woff")),
    readFile(join(OG_DIR, "profile.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#040406",
          color: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(55% 75% at 88% 12%, rgba(76,110,255,0.30), rgba(4,4,6,0) 70%), radial-gradient(45% 60% at 45% 110%, rgba(120,82,235,0.20), rgba(4,4,6,0) 70%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", width: 460, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by satori, not the browser */}
          <img src={photoSrc} width={460} height={630} alt="" style={{ width: 460, height: 630, objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              background: "linear-gradient(90deg, rgba(4,4,6,0) 45%, #040406 100%)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 70px 0 18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "JetBrains Mono",
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#6ee7b7", marginRight: 14 }} />
            {profile.availability}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -4,
            }}
          >
            <span>{profile.firstName.toUpperCase()}</span>
            <span style={{ color: "#a9acb8" }}>{profile.lastName.toUpperCase()}</span>
          </div>

          <div style={{ display: "flex", marginTop: 34, fontSize: 42, fontWeight: 600, letterSpacing: -1 }}>{profile.role}</div>
          <div style={{ display: "flex", marginTop: 10, fontSize: 25, color: "rgba(255,255,255,0.66)" }}>{profile.focus}</div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {`${site.url.replace("https://", "")} · ${profile.location}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
