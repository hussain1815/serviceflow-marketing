export type AudienceIcon = "scissors" | "hand" | "sparkles" | "droplets";

export type FeatureIcon =
  | "calendar"
  | "customers"
  | "staff"
  | "services"
  | "dashboard"
  | "reports";

export type PreviewTabId =
  | "dashboard"
  | "appointments"
  | "customers"
  | "services";

export interface NavItem {
  label: string;
  href: string;
}

export interface AudienceItem {
  icon: AudienceIcon;
  title: string;
  description: string;
}

export interface FeatureItem {
  icon: FeatureIcon;
  title: string;
  description: string;
  bullets: string[];
}

export interface PreviewTab {
  id: PreviewTabId;
  label: string;
  description: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const brand = {
  name: "ServiceFlow AI",
  shortName: "ServiceFlow",
  tagline: "Run your salon. Not your paperwork.",
};

export const navItems: NavItem[] = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroContent = {
  eyebrow: "Salon management, thoughtfully organized",
  titleLead: "Run your salon.",
  titleAccent: "Not your paperwork.",
  description:
    "Appointments, customers, staff and business insights — organized in one modern workspace built for independent salons.",
  primaryCta: "Request a Demo",
  secondaryCta: "Book a Meeting",
  note: "Designed for independent salons in Germany, the UK and the Netherlands.",
  previewLabel: "Illustrative product preview",
  previewNote: "Sample data · not a live screenshot",
};

export const audienceContent = {
  eyebrow: "Built for independent beauty businesses",
  title: "Made for the way your salon actually works.",
  description:
    "ServiceFlow is designed for independent owners and small teams who need a clear, reliable place to manage the day — without enterprise complexity.",
  items: [
    {
      icon: "scissors",
      title: "Hair salons",
      description:
        "Keep appointments, client history and team schedules in one organized view.",
    },
    {
      icon: "hand",
      title: "Nail studios",
      description:
        "Manage bookings and services with a workspace that keeps the day moving.",
    },
    {
      icon: "sparkles",
      title: "Beauty salons",
      description:
        "Give the front desk and stylists a shared view of customers and appointments.",
    },
    {
      icon: "droplets",
      title: "Skincare studios",
      description:
        "Track client details, service durations and business activity with less admin.",
    },
  ] satisfies AudienceItem[],
};

export const featuresContent = {
  eyebrow: "Core workspace",
  title: "Everything you need to run the day.",
  description:
    "The core ServiceFlow workspace brings the essential parts of salon management together. Here is what you can explore today.",
  items: [
    {
      icon: "calendar",
      title: "Appointment Management",
      description:
        "Keep the schedule clear and the front desk in control.",
      bullets: [
        "Organize appointments in one workspace",
        "Manage booking statuses",
        "Support appointments with multiple services",
      ],
    },
    {
      icon: "customers",
      title: "Customer Management",
      description:
        "Know who is coming in and what happened on their last visit.",
      bullets: [
        "Keep customer profiles in one place",
        "Maintain visit history",
        "Organize customer information and notes",
      ],
    },
    {
      icon: "staff",
      title: "Staff Management",
      description:
        "Give the team structure without adding more spreadsheets.",
      bullets: [
        "Manage staff profiles",
        "Organize staff availability",
        "Keep team information easy to review",
      ],
    },
    {
      icon: "services",
      title: "Service Management",
      description:
        "Keep the service menu accurate and easy to maintain.",
      bullets: [
        "Manage your service menu",
        "Maintain service durations",
        "Keep pricing up to date",
      ],
    },
    {
      icon: "dashboard",
      title: "Business Dashboard",
      description:
        "Start the day with a useful overview of the business.",
      bullets: [
        "Review important business metrics",
        "Monitor appointment activity",
        "See the day at a glance",
      ],
    },
    {
      icon: "reports",
      title: "Reports and Insights",
      description:
        "Understand how the salon is performing over time.",
      bullets: [
        "Review revenue performance",
        "Review appointment performance",
        "Compare activity across time ranges",
      ],
    },
  ] satisfies FeatureItem[],
};

export const previewContent = {
  eyebrow: "Product preview",
  title: "A workspace designed to keep the day clear.",
  description:
    "Explore an illustrative look at the ServiceFlow workspace. The previews below use demonstration data and are not live product screenshots.",
  tabs: [
    {
      id: "dashboard",
      label: "Dashboard",
      description:
        "Illustrative dashboard preview showing sample revenue, appointment and client metrics.",
    },
    {
      id: "appointments",
      label: "Appointments",
      description:
        "Illustrative appointments preview showing sample bookings, staff and statuses.",
    },
    {
      id: "customers",
      label: "Customers",
      description:
        "Illustrative customer preview showing sample profiles, visit counts and last visits.",
    },
    {
      id: "services",
      label: "Services",
      description:
        "Illustrative services preview showing sample treatments, durations and prices.",
    },
  ] satisfies PreviewTab[],
  note: "Illustrative interface with demonstration data. Not a live product screenshot.",
};

export const howItWorksContent = {
  eyebrow: "How it works",
  title: "A simple path to early access.",
  description:
    "ServiceFlow is currently in development. The first step is a conversation — not an automated sign-up.",
  steps: [
    {
      number: "01",
      title: "Request a product demonstration",
      description:
        "Tell us about your salon and the workflows you want to simplify. We will use that context to prepare a relevant walkthrough.",
    },
    {
      number: "02",
      title: "Explore the ServiceFlow workspace",
      description:
        "See how appointments, customers, staff, services, dashboard metrics and reports fit together in the product.",
    },
    {
      number: "03",
      title: "Share feedback and discuss early access",
      description:
        "Tell us what would make the workspace more useful for your team, and we will discuss early-access availability.",
    },
  ] satisfies StepItem[],
  cta: "Request a Demo",
};

export const aiVisionContent = {
  eyebrow: "Product roadmap",
  title: "A smarter salon workspace is on the way.",
  description:
    "We're building towards a smarter salon workspace, with AI-powered assistance designed to make everyday salon management simpler.",
  note: "AI-powered assistance is part of our roadmap. It is not available in the product today.",
  cardTitle: "AI-powered assistance",
  cardDescription:
    "A future layer of support for the everyday decisions that take time away from the chair.",
  cardRows: [
    { label: "Status", value: "Product roadmap" },
    { label: "Availability", value: "Not available today" },
  ],
};

export const earlyAccessContent = {
  eyebrow: "Early access",
  title: "See what a more organized salon could look like.",
  description:
    "Explore the workspace, see how it fits your team, and share the feedback that will help shape what comes next.",
  cta: "Request a Demo",
  secondaryCta: "Read the FAQ",
};

export const faqContent = {
  eyebrow: "FAQ",
  title: "Questions, answered honestly.",
  description:
    "ServiceFlow AI is in active development. Here is what that means for the product and the demo.",
  statusLabel: "Current status",
  statusText:
    "ServiceFlow AI is currently in development. General availability has not been announced.",
  items: [
    {
      question: "What is ServiceFlow AI?",
      answer:
        "ServiceFlow AI is a salon management workspace for independent beauty businesses. It brings appointments, customers, staff, services, business metrics and reports into one organized product.",
    },
    {
      question: "Who is ServiceFlow designed for?",
      answer:
        "It is designed for independent hair salons, nail studios, beauty salons, skincare studios and small salon teams, with an initial focus on Germany, the United Kingdom and the Netherlands.",
    },
    {
      question: "What features can I explore in the demo?",
      answer:
        "The demo covers the core workspace: appointment management with statuses and multiple services, customer profiles and visit history, staff availability, service durations and pricing, a business dashboard and reports. The previews on this website are illustrative and use demonstration data.",
    },
    {
      question: "Is ServiceFlow currently available?",
      answer:
        "ServiceFlow is currently in development. You can request a demo to discuss the product and early-access availability, but general availability has not been announced.",
    },
    {
      question: "Is an AI assistant available yet?",
      answer:
        "No. AI-powered assistance is part of the product roadmap, but it is not available in the product today. The currently described workspace features do not depend on an AI assistant.",
    },
    {
      question: "How can I request early access?",
      answer:
        "Use the Request a Demo form on this website. Tell us about your salon and we will follow up with next steps. At the moment the form is a preview until a submission endpoint is configured.",
    },
  ] satisfies FaqItem[],
};

export const footerContent = {
  brandDescription:
    "A modern salon management workspace for independent beauty businesses.",
  productHeading: "Product",
  contactHeading: "Contact",
  contactText:
    "The best way to reach us is through the demo request form. We will share availability and early-access next steps.",
  contactCta: "Request a Demo",
  legalNote: "ServiceFlow AI is currently in development.",
  privacyLabel: "Privacy Policy",
  termsLabel: "Terms",
  markets: "Germany · United Kingdom · Netherlands",
};

export const demoFormContent = {
  eyebrow: "Request a demo",
  title: "Let’s find the right fit for your salon.",
  description:
    "Tell us a little about your business. We will use it to prepare a relevant walkthrough and discuss early-access next steps.",
  previewNoticeTitle: "Preview form",
  previewNotice:
    "A submission endpoint is not configured yet. This form validates information locally, but it does not send or store your details.",
  configuredNotice:
    "Submitting sends your details to the configured demo request endpoint.",
  fields: {
    fullName: "Full name",
    salonName: "Salon or business name",
    email: "Business email",
    country: "Country",
    businessType: "Business type",
    staffCount: "Number of staff",
    challenge: "Biggest salon-management challenge (optional)",
    consent: "I agree to be contacted about ServiceFlow AI early access.",
    consentDetail:
      "I understand this form does not store my details in this browser.",
  },
  placeholders: {
    fullName: "Your name",
    salonName: "Your salon name",
    email: "you@yoursalon.com",
    challenge: "Tell us what takes up too much time today",
    select: "Select an option",
  },
  privacyPrefix: "Read the",
  privacyLinkLabel: "Privacy Policy",
  privacySuffix: "for information on how demo requests are handled.",
  submit: "Send demo request",
  submitPreview: "Validate preview form",
  submitting: "Sending…",
  cancel: "Cancel",
  successTitle: "Request received.",
  successMessage:
    "Thanks — your details were sent. We will follow up with next steps for your salon.",
  successAction: "Close",
  errorTitle: "We couldn’t send your request.",
  errorMessage: "Please try again in a moment.",
  previewStateTitle: "Preview validated — nothing was sent.",
  previewStateMessage:
    "No submission endpoint is configured, so your details were not sent or stored. This preview will not display a false success message.",
  required: "This field is required.",
  invalidEmail: "Enter a valid email address.",
  consentRequired: "Please confirm before submitting.",
  finePrint:
    "Submissions are sent only when a configured endpoint is available. No form data is saved in localStorage.",
  countries: ["Germany", "United Kingdom", "Netherlands", "Other"],
  businessTypes: [
    "Hair salon",
    "Nail studio",
    "Beauty salon",
    "Skincare studio",
    "Other",
  ],
  staffCounts: ["1", "2–5", "6–10", "11–20", "20+"],
};

export const bookingNoticeContent = {
  title: "Meeting booking is coming soon.",
  message:
    "Online meeting booking is not available yet. Request a demo and we will arrange a time with you.",
  action: "Request a Demo",
  closeLabel: "Dismiss booking notice",
};
