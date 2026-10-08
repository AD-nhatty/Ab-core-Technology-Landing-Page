import type { PluralForms } from "@/lib/format";

/**
 * English copy. ar.ts must match this shape (it is typed as Dictionary).
 * Inline markup: **strong**, __accent__, ~~muted~~, "\n" for a line break.
 */
const en = {
  meta: {
    title: "AB'CORE — Peppol e-invoicing for the UAE",
    description:
      "AB'CORE connects your ERP to the UAE's Peppol network: every invoice validated, signed, delivered and reported to the FTA automatically. Licensed in Abu Dhabi.",
  },

  intro: {
    tagline: "E-invoicing for the UAE",
    steps: ["Validated", "Delivered", "Reported to FTA"],
  },

  nav: {
    skip: "Skip to content",
    home: "AB'CORE home",
    primary: "Primary",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#platform", label: "Platform" },
      { href: "#mandate", label: "Mandate" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    login: "Log in",
    demo: "Book a demo",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLabel: "عربي",
    switchAria: "View this page in Arabic",
  },

  hero: {
    badgeLabel: "UAE mandate",
    milestones: {
      largeAppoint: "Large businesses appoint a provider by 30 Oct 2026",
      largeLive: "Large businesses go live on 1 Jan 2027",
      otherAppoint: "All other businesses appoint a provider by 31 Mar 2027",
      otherLive: "Businesses under AED 50M go live on 1 Jul 2027",
      govLive: "Government entities go live on 1 Oct 2027",
      done: "E-invoicing is now live across the UAE",
    },
    daysLeft: { one: "1 day left", other: "{n} days left" } as PluralForms,
    today: "Today",
    title: "Send it once.\nIt arrives __compliant.__",
    lede: "AB'CORE connects your ERP to the UAE's Peppol network. Every invoice is validated, signed, delivered and reported to the FTA automatically, and nobody re‑keys a line.",
    primary: "Book a free demo",
    secondary: "See how it works",
    trust: ["OpenPeppol member", "Licensed in Abu Dhabi", "FTA-aligned", "SME certified"],
  },

  dashboard: {
    label: "Example AB'CORE dashboard",
    url: "app.abcore.ae/overview",
    nav: ["Overview", "Invoices", "Peppol network", "VAT returns", "Audit trail", "Connectors", "Settings"],
    status: "FTA reporting connected",
    title: "Overview",
    period: "October 2026",
    search: "Search invoices",
    newInvoice: "New invoice",
    kpis: {
      invoices: "Invoices this month",
      delivered: "Delivered on Peppol",
      review: "Needs review",
      vat: "VAT payable · AED",
    },
    kpiNotes: {
      invoices: "October 2026",
      delivered: "Peppol AS4",
      review: "Flagged by your rules",
      vat: "Q4 to date",
    },
    chartTitle: "Invoices per day",
    chartMeta: "Last 30 days",
    feedTitle: "Live invoices",
    live: "Live",
    cols: { invoice: "Invoice", buyer: "Buyer", amount: "Amount", status: "Status" },
    statuses: { validating: "Validating", signed: "Signed", delivered: "Delivered", reported: "Reported to FTA" },
    corners: ["Your ERP", "AB'CORE", "Peppol AS4", "Buyers", "FTA"],
    cornersTitle: "Five-corner route",
    connected: "Connected",
    buyers: [
      "Al Waha Trading LLC",
      "Najm Logistics FZE",
      "Barakah Medical Centre",
      "Sahil Retail Group",
      "Falcon Engineering LLC",
      "Ghaf Hospitality LLC",
      "Marjan Foods LLC",
      "Qasr Contracting LLC",
    ],
  },

  standards: {
    label: "Built on the standards behind the UAE e-invoicing framework",
    items: ["OpenPeppol member", "PINT AE", "UBL 2.1", "Peppol AS4", "FTA reporting", "SAP", "Oracle", "REST API", "AES-256", "Arabic & English"],
  },

  benefits: {
    pill: "Why AB'CORE",
    title: "Built for the UAE mandate\nfrom the first line of code",
    intro: "One platform takes care of compliance, so your finance team can stop chasing invoices and close faster.",
    items: [
      { title: "Built in the UAE, for the UAE", body: "Licensed in Abu Dhabi and designed around UAE regulatory frameworks from day one." },
      { title: "Direct Peppol access", body: "As an OpenPeppol member, we connect you straight to the network the UAE framework is built on." },
      { title: "ERP-native integration", body: "Connects to SAP, Oracle and in-house systems without changing how your finance team works." },
      { title: "FTA requirements built in", body: "Compliance with Federal Tax Authority rules is part of the platform, not bolted on afterwards." },
      { title: "Up to 70% less manual work", body: "Capture, matching and approvals run on rules, so people only handle the exceptions." },
      { title: "Arabic and English", body: "A full right-to-left interface and bilingual invoices, switchable in one click." },
    ],
  },

  how: {
    pill: "How it works",
    title: "One invoice. Five corners.\nZero re‑keying.",
    intro: "The UAE uses Peppol's five-corner model. AB'CORE runs every step between your ERP and the FTA.",
    caption:
      "Diagram of an invoice moving from your ERP through AB'CORE to the buyer's access point and the buyer, with tax data reported to the Federal Tax Authority.",
    steps: [
      { title: "Your ERP raises the invoice", body: "Your team keeps working in SAP, Oracle or your own system. Nothing changes for them." },
      { title: "AB'CORE validates and signs", body: "Checked against PINT AE, converted to UBL 2.1, digitally signed and archived for audit." },
      { title: "Delivered over Peppol", body: "Sent securely through accredited access points using the AS4 protocol." },
      { title: "Your buyer receives it", body: "It lands in their system, and the acknowledgement comes straight back to you." },
      { title: "Reported to the FTA", body: "Tax data goes to the Federal Tax Authority as the invoice moves. No separate filing run." },
    ],
    nodes: {
      erp: { name: "Your ERP", meta: "SAP S/4HANA" },
      hub: { name: "AB'CORE", checks: ["Validated", "Signed", "Archived"] },
      ap: { name: "Buyer's access point", meta: "Peppol AS4" },
      buyer: { name: "Your buyer", meta: "Invoice received" },
      fta: { name: "FTA", meta: "Tax data reported" },
    },
  },

  platform: {
    pill: "Platform",
    title: "Five systems.\nOne compliant stack.",
    intro: "Start with e-invoicing for the mandate, then switch on the rest. Every module works from the same records.",
    modules: [
      {
        id: "einvoicing",
        label: "E-invoicing",
        title: "Peppol-ready invoices, validated before they leave",
        body: "Every invoice is checked against PINT AE and converted to UBL 2.1, with 5% VAT calculated for you.",
        points: ["PINT AE validation", "UBL 2.1 · Peppol AS4"],
      },
      {
        id: "automation",
        label: "Automation",
        title: "Matching and approvals that run themselves",
        body: "Capture, three-way matching and approvals follow rules you set. Recurring invoices go out on schedule.",
        points: ["Rules-based approvals", "Scheduled runs"],
      },
      {
        id: "audit",
        label: "Audit",
        title: "An audit trail nobody can quietly edit",
        body: "Tamper-evident logs for every transaction, from the source document to the final report, with flags on anything that doesn't reconcile.",
        points: ["Tamper-evident logs", "Automatic reconciliation"],
      },
      {
        id: "integration",
        label: "Integration",
        title: "Plugs into the ERP you already run",
        body: "Certified connectors for SAP and Oracle, and open APIs for in-house and legacy systems. Deployed without stopping live operations.",
        points: ["SAP and Oracle connectors", "REST API and webhooks"],
      },
      {
        id: "reporting",
        label: "Reporting",
        title: "VAT reports straight from live data",
        body: "Real-time dashboards and regulatory reports built from the transactions themselves, with PDF exports ready for FTA audits.",
        points: ["Real-time dashboards", "FTA-ready exports"],
      },
    ],
    panels: {
      invoice: {
        title: "Tax invoice",
        ready: "Ready to send",
        fields: { invoice: "Invoice", date: "Issue date", trn: "Buyer TRN", peppol: "Peppol ID", net: "Net amount", vat: "VAT 5%" },
        checks: ["Buyer TRN format", "VAT totals reconcile with line items", "Buyer found on the Peppol network", "UBL 2.1 · PINT AE schema"],
        ok: "Passed",
      },
      match: {
        title: "Three-way match",
        meta: "Today",
        cols: ["Purchase order", "Goods receipt", "Invoice"],
        status: "Status",
        matched: "Matched",
        mismatch: "Qty differs",
        rules: [
          "**Auto-approve** matched invoices under AED 25,000",
          "**Route** mismatches to the AP lead",
          "**Run** recurring invoices on the 1st",
        ],
      },
      audit: {
        title: "Audit trail · INV-2026-00418",
        badge: "Tamper-evident",
        events: [
          { what: "Created from SAP", who: "Accountant · Finance team" },
          { what: "Validated and signed", who: "AB'CORE · automatic" },
          { what: "Delivered to buyer", who: "Peppol AS4 · acknowledged" },
          { what: "Payment received, AED 300 short", who: "Bank feed · reconciliation" },
        ],
        flag: "Flagged",
      },
      erp: {
        title: "Connected systems",
        healthy: "3 healthy",
        connected: "Connected",
        systems: [
          { name: "SAP S/4HANA", meta: "Synced 2 min ago" },
          { name: "Oracle Fusion Cloud", meta: "Synced 4 min ago" },
          { name: "In-house finance system", meta: "REST API · webhooks" },
        ],
      },
      vat: {
        title: "VAT summary · Q3 2026",
        live: "Live",
        output: "Output VAT",
        input: "Input VAT",
        net: "Net payable · AED",
        chartLabel: "Invoices issued per week, July to September 2026",
        axis: ["1 Jul", "15 Aug", "30 Sep"],
      },
    },
  },

  mandate: {
    pill: "The mandate",
    title: "The mandate clock is running",
    intro: "E-invoicing becomes mandatory in phases. Choose your organisation to see your deadlines and exactly how long you have left.",
    question: "Your organisation",
    cohorts: {
      large: { label: "Revenue AED 50M+", sub: "Phase 1" },
      other: { label: "Under AED 50M", sub: "Phase 2" },
      gov: { label: "Government", sub: "Phase 3" },
    },
    units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    untilAppoint: "until the deadline to appoint an accredited provider",
    untilLive: "until e-invoicing becomes mandatory for you",
    done: "E-invoicing is already mandatory for your organisation.",
    appointBy: "Appoint a provider by",
    liveOn: "Go live on",
    today: "Today",
    daysLeft: { one: "Tomorrow", other: "{n} days from today" } as PluralForms,
    daysAgo: { one: "Passed yesterday", other: "Passed {n} days ago" } as PluralForms,
    advice: {
      soon: "**You have time, but not much.** Integration and testing take most of it, so appointing early keeps go-live calm.",
      urgent: "**Your appointment deadline is close.** Talk to us this week so integration and testing fit before go-live.",
      late: "**Your appointment deadline has passed.** If you haven't appointed a provider yet, talk to us this week. Go-live is still ahead of you.",
      live: "**E-invoicing is already mandatory for you.** If you aren't live yet, contact us today and we'll prioritise your onboarding.",
    },
    summary: "{days} days {caption}.",
    fineprint:
      "Dates follow Ministerial Decisions No. 243 and 244 of 2025, as amended on 10 May 2026. Confirm the dates for your entity with the FTA or with us.",
  },

  results: {
    pill: "Results",
    title: "Proven in production",
    intro: "What finance teams get when invoices stop being manual.",
    stats: [
      { prefix: "", value: 10000, suffix: "+", label: "invoices automated every month", body: "End-to-end processing, validation and submission, with no manual touchpoints." },
      { prefix: "Up to ", value: 70, suffix: "%", label: "less manual financial processing", body: "Rules take over capture, matching and approvals, and operating costs drop with them." },
      { prefix: "", value: 24, suffix: "/7", label: "compliance automation", body: "Regulatory reporting is generated continuously from your transaction data." },
    ],
  },

  compare: {
    pill: "Why switch",
    title: "AB'CORE vs. manual invoicing",
    intro: "PDFs, email and spreadsheets won't meet the mandate. Here's what changes.",
    us: {
      name: "AB'CORE",
      body: "Compliant e-invoicing that runs from your ERP.",
      points: [
        "Validated against PINT AE before it's sent",
        "Delivered over Peppol, with confirmation",
        "Tax data reported to the FTA automatically",
        "Connected to your ERP, so nothing is re-keyed",
        "Tamper-evident audit trail for every invoice",
        "Arabic and English, supported by a UAE team",
      ],
    },
    them: {
      name: "Manual & PDF invoicing",
      body: "How most finance teams still work today.",
      points: [
        "PDF and email invoices don't meet the mandate",
        "Errors surface after the invoice has gone out",
        "No proof the buyer received it",
        "Data re-keyed between systems",
        "VAT reconciled by hand at month end",
        "Audit evidence scattered across inboxes",
      ],
    },
  },

  process: {
    pill: "Onboarding",
    title: "From first call\nto first invoice",
    intro: "Four phases, run with your finance team rather than around it. Your ERP stays live the whole time.",
    stepLabel: "Step {n}",
    steps: [
      { title: "Assess", body: "We map how invoices move today: your systems, approval steps and compliance gaps." },
      { title: "Integrate", body: "We connect your ERP and finance systems and set up rules, formats and approval flows." },
      { title: "Validate", body: "We test end to end on the Peppol network and sign off with your finance and audit teams." },
      { title: "Go live", body: "We launch, train your users and keep monitoring as the regulations change." },
    ],
    note: "A dedicated AB'CORE team stays with you through every phase, and after go-live.",
  },

  sectors: {
    label: "Built for every sector",
    items: ["Government", "Financial institutions", "Healthcare", "Retail", "Oil & gas", "Logistics"],
  },

  pricing: {
    pill: "Pricing",
    title: "Simple pricing,\npriced by volume",
    intro: "Every plan includes the same compliance features. You only choose how many invoices you send each month.",
    perMonth: "/month",
    popular: "Popular",
    plans: [
      { id: "starter", name: "Starter", desc: "For trying AB'CORE with real invoices.", currency: "", price: "Free", volume: "50 invoices a month", cta: "Start free", featured: false },
      { id: "growth", name: "Growth", desc: "For teams invoicing every week.", currency: "AED", price: "199", volume: "500 invoices a month", cta: "Choose Growth", featured: true },
      { id: "enterprise", name: "Enterprise", desc: "For high-volume finance teams.", currency: "AED", price: "599", volume: "Unlimited invoices", cta: "Choose Enterprise", featured: false },
    ],
    features: [
      "Peppol send & receive",
      "VAT reports & PDF exports",
      "Roles for owners, managers & accountants",
      "API access",
      "Priority support",
      "AES-256 encryption & MFA",
    ],
    enterprise:
      "**Connecting SAP or Oracle, or rolling out across a government entity?** We scope those projects with you, including integration and audit systems.",
    enterpriseCta: "Talk to our team",
  },

  faq: {
    pill: "FAQ",
    title: "Questions, answered",
    intro: "What finance teams usually ask before they switch.",
    items: [
      {
        q: "Do we have to replace our ERP?",
        a: "No. AB'CORE connects to SAP, Oracle and in-house systems. Your team keeps raising invoices where it does today, and we handle validation, conversion, delivery and reporting.",
      },
      {
        q: "What is Peppol, and why does the UAE use it?",
        a: "Peppol is an international network for exchanging e-invoices through accredited access points. The UAE framework is built on it, using a national specification called PINT AE. As an OpenPeppol member, AB'CORE connects you to that network directly.",
      },
      {
        q: "When does my business need to comply?",
        a: "It depends on your revenue and whether you are a government entity. Businesses with revenue of AED 50 million or more must appoint a provider by 30 October 2026 and go live on 1 January 2027. The mandate clock above shows the dates for every group.",
      },
      {
        q: "Can we send and receive invoices in Arabic?",
        a: "Yes. The platform works in Arabic and English, with a full right-to-left interface and instant switching between the two.",
      },
      {
        q: "How is our financial data protected?",
        a: "With AES-256 encryption, multi-factor sign-in, role-based access for owners, managers and accountants, and a full audit log of every action.",
      },
      {
        q: "What happens after go-live?",
        a: "The team that onboarded you keeps monitoring your setup and updates it as FTA requirements change.",
      },
    ],
  },

  contact: {
    pill: "Book a demo",
    title: "Let's get your first invoice through",
    intro:
      "Thirty minutes with our team. Bring your ERP, your volumes and your deadline, and we'll show you the route your invoices would take.",
    location: "Abu Dhabi, United Arab Emirates",
    form: {
      name: { label: "Full name", error: "Enter your name." },
      company: { label: "Company", error: "Enter your company name." },
      email: { label: "Work email", placeholder: "name@company.ae", error: "Enter an email address like name@company.ae." },
      erp: {
        label: "Your ERP",
        options: [
          { value: "SAP", label: "SAP" },
          { value: "Oracle", label: "Oracle" },
          { value: "Microsoft Dynamics", label: "Microsoft Dynamics" },
          { value: "In-house", label: "In-house system" },
          { value: "Not sure", label: "Not sure yet" },
        ],
      },
      volume: {
        label: "Invoices per month",
        options: [
          { value: "Under 50", label: "Under 50" },
          { value: "50–500", label: "50–500" },
          { value: "500–5,000", label: "500–5,000" },
          { value: "5,000+", label: "5,000+" },
        ],
      },
      submit: "Request a demo",
      sending: "Sending…",
      sentTitle: "Request sent.",
      sentBody: "We'll reply to {email} to arrange a time.",
      another: "Send another request",
      fallback: "Your email app should open with the request filled in. If it doesn't, write to contact@abcore.ae.",
      failed: "The request didn't go through. Try again, or write to contact@abcore.ae.",
      honeypot: "Leave this field empty",
    },
  },

  footer: {
    blurb: "Secure, compliant e-invoicing, automation and audit systems for the UAE.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "How it works", href: "#how" },
          { label: "Platform", href: "#platform" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Mandate dates", href: "#mandate" },
          { label: "Onboarding", href: "#process" },
          { label: "FAQ", href: "#faq" },
        ],
      },
    ],
    contactTitle: "Contact",
    location: "Abu Dhabi, United Arab Emirates",
    licensed: "Licensed in Abu Dhabi, United Arab Emirates",
    copyright: "© 2026 AB'CORE Technology LLC. All rights reserved.",
  },
};

export type Dictionary = typeof en;

export default en;
