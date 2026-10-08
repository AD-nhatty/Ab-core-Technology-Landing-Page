import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { locales } from "../../i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = "AB'CORE — Peppol e-invoicing for the UAE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "src/assets/brand/logo-reversed.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const ROUTE = ["Your ERP", "AB'CORE", "Peppol", "Buyer", "FTA"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(90% 70% at 85% 0%, #1f55e0 0%, #0b2266 35%, #020713 75%)",
          color: "#eaf2fd",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={394} height={100} />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
          <div style={{ display: "flex" }}>Send it once.</div>
          <div style={{ display: "flex" }}>
            It arrives{" "}
            <span style={{ color: "#5b9dff" }}>compliant.</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#a8b6cf" }}>
          {ROUTE.map((stop, i) => (
            <div key={stop} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {i > 0 && <div style={{ width: 56, height: 2, background: "#5b9dff" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: 999, background: "#5b9dff" }} />
                {stop}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
