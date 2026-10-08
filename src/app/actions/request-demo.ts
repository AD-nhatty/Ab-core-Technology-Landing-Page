"use server";

import { SITE } from "@/lib/site";

export type DemoRequest = {
  name: string;
  company: string;
  email: string;
  erp: string;
  volume: string;
  website?: string;
};

export type DemoResult =
  | { status: "sent" }
  | { status: "fallback"; mailto: string }
  | { status: "invalid"; fields: ("name" | "company" | "email")[] }
  | { status: "failed" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

/**
 * Sends a demo request through Resend when RESEND_API_KEY is set.
 * Without it, returns a mailto: link so the visitor's email app sends it instead.
 */
export async function requestDemo(input: DemoRequest): Promise<DemoResult> {
  // People never see the website field; bots fill it in. Accept quietly and drop.
  if (clean(input.website, 200)) return { status: "sent" };

  const name = clean(input.name, 120);
  const company = clean(input.company, 160);
  const email = clean(input.email, 200);
  const erp = clean(input.erp, 60);
  const volume = clean(input.volume, 30);

  const fields: ("name" | "company" | "email")[] = [];
  if (name.length < 2) fields.push("name");
  if (company.length < 2) fields.push("company");
  if (!EMAIL.test(email)) fields.push("email");
  if (fields.length) return { status: "invalid", fields };

  const to = process.env.DEMO_REQUEST_TO || SITE.email;
  const subject = `Demo request: ${company}`;
  const text = [`Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `ERP: ${erp}`, `Invoices per month: ${volume}`].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "fallback", mailto: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.DEMO_REQUEST_FROM || "AB'CORE Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });
    return response.ok ? { status: "sent" } : { status: "failed" };
  } catch {
    return { status: "failed" };
  }
}
