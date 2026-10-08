/**
 * UAE e-invoicing timeline: Ministerial Decisions No. 243 and 244 of 2025,
 * as amended on 10 May 2026 (large businesses' appointment deadline moved
 * from 31 July to 30 October 2026). Re-check against FTA guidance before
 * changing anything here.
 */
export type Cohort = "large" | "other" | "gov";

export const COHORT_IDS: Cohort[] = ["large", "other", "gov"];

export const COHORT_DATES: Record<Cohort, { appoint: string; live: string }> = {
  large: { appoint: "2026-10-30", live: "2027-01-01" },
  other: { appoint: "2027-03-31", live: "2027-07-01" },
  gov: { appoint: "2027-03-31", live: "2027-10-01" },
};

/** The hero badge shows the first milestone whose date hasn't passed. */
export const MILESTONES = [
  { id: "largeAppoint", until: "2026-10-30" },
  { id: "largeLive", until: "2027-01-01" },
  { id: "otherAppoint", until: "2027-03-31" },
  { id: "otherLive", until: "2027-07-01" },
  { id: "govLive", until: "2027-10-01" },
] as const;

export type MilestoneId = (typeof MILESTONES)[number]["id"] | "done";

export const TIMELINE = {
  start: "2026-07-01",
  end: "2027-12-31",
  ticks: ["2026-07-01", "2026-10-01", "2027-01-01", "2027-04-01", "2027-07-01", "2027-10-01"],
};

export const DAY_MS = 86_400_000;

/** Midnight UTC for an ISO date, so calendar dates never drift with the visitor's time zone. */
export const utcDay = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export const daysUntil = (today: number, iso: string) => Math.round((utcDay(iso) - today) / DAY_MS);

export function nextMilestone(today: number): MilestoneId {
  return MILESTONES.find((m) => daysUntil(today, m.until) >= 0)?.id ?? "done";
}

/**
 * The instant a deadline passes, in UAE time (UTC+4). An appointment deadline
 * runs to the end of its day; a go-live date starts at the beginning of its day.
 */
export function deadlineAt(iso: string, kind: "appoint" | "live") {
  const startOfDay = Date.parse(`${iso}T00:00:00+04:00`);
  return kind === "appoint" ? startOfDay + DAY_MS : startOfDay;
}
