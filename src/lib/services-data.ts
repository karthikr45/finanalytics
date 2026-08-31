export type ServiceCategory =
  | "tax"
  | "registration"
  | "accounting"
  | "licenses"
  | "digital";

export interface CategoryMeta {
  id: ServiceCategory;
  label: string;
  description: string;
}

export const categories: CategoryMeta[] = [
  {
    id: "tax",
    label: "Tax & GST",
    description: "Filings and advisory to keep you compliant, always on time.",
  },
  {
    id: "registration",
    label: "Business Registration",
    description: "Structuring and registering your business the right way.",
  },
  {
    id: "accounting",
    label: "Accounting & Bookkeeping",
    description: "Clean books, delivered as an ongoing managed service.",
  },
  {
    id: "licenses",
    label: "Licenses & Certifications",
    description: "The paperwork that lets you legally operate and scale.",
  },
  {
    id: "digital",
    label: "Digital & IT",
    description: "A digital presence built to match your ambition.",
  },
];

export interface Service {
  slug: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon:
    | "receipt"
    | "landmark"
    | "building"
    | "handshake"
    | "book"
    | "shield-check"
    | "badge-check"
    | "leaf"
    | "code"
    | "megaphone";
}

export const services: Service[] = [
  {
    slug: "income-tax-filings",
    category: "tax",
    title: "Income Tax Filings",
    tagline: "Individual & business ITR, done right",
    description:
      "End-to-end income tax return preparation and filing for individuals, professionals, and businesses — with proactive planning so you're never caught off guard.",
    deliverables: [
      "ITR filing for individuals, firms & companies",
      "TDS returns & Form 16/16A reconciliation",
      "Advance tax planning & computation",
      "Notice handling and assessment support",
    ],
    icon: "receipt",
  },
  {
    slug: "gst-compliances",
    category: "tax",
    title: "GST Compliances",
    tagline: "Registration to reconciliation",
    description:
      "GST registration and ongoing consulting so every return is filed accurately and on schedule, with input credit reconciled and audit-ready.",
    deliverables: [
      "New GST registration",
      "Monthly / quarterly GST return filing",
      "Input tax credit reconciliation",
      "GST notices & departmental support",
    ],
    icon: "landmark",
  },
  {
    slug: "company-compliances",
    category: "registration",
    title: "Company Compliances",
    tagline: "Incorporation & ROC, handled",
    description:
      "Full lifecycle corporate compliance — from incorporation to annual ROC filings, trademark, accounting and payroll — so your company stays in good standing.",
    deliverables: [
      "Private/public limited company incorporation",
      "Annual ROC filings & statutory registers",
      "Trademark registration",
      "Payroll & accounting setup",
    ],
    icon: "building",
  },
  {
    slug: "partnership-firm",
    category: "registration",
    title: "Partnership Firm Services",
    tagline: "Registration & compliance for partnerships",
    description:
      "Partnership deed drafting, firm registration, and the ongoing compliance partnerships need to operate with full legal standing.",
    deliverables: [
      "Partnership deed drafting",
      "Firm registration with the Registrar",
      "PAN/TAN & bank account support",
      "Annual compliance filings",
    ],
    icon: "handshake",
  },
  {
    slug: "bookkeeping",
    category: "accounting",
    title: "Bookkeeping & Accounts Outsourcing",
    tagline: "Your books, managed end to end",
    description:
      "A dedicated team maintains accurate, real-time financial records — so you always know where the business stands, without hiring an in-house team.",
    deliverables: [
      "Day-to-day bookkeeping",
      "Bank reconciliation & ledger maintenance",
      "MIS & financial reporting",
      "Full accounts outsourcing",
    ],
    icon: "book",
  },
  {
    slug: "startup-registration",
    category: "registration",
    title: "Startup India Registration",
    tagline: "From idea to recognised startup",
    description:
      "Guidance through Startup India recognition and the early compliance decisions that set a new business up for tax benefits and credibility.",
    deliverables: [
      "Startup India / DPIIT recognition",
      "Entity structuring advisory",
      "Founders' agreement support",
      "Early-stage compliance roadmap",
    ],
    icon: "shield-check",
  },
  {
    slug: "licenses",
    category: "licenses",
    title: "Licenses & Registrations",
    tagline: "FSSAI, IEC, PF/ESI, Trade License & more",
    description:
      "The full set of statutory licenses and registrations businesses need to trade, hire, import/export and operate premises legally.",
    deliverables: [
      "FSSAI license & Trade License",
      "Import Export Code (IEC)",
      "PF / ESI registration",
      "Udyam, DSC & DIN / DIR-3 KYC",
    ],
    icon: "badge-check",
  },
  {
    slug: "management-consulting",
    category: "accounting",
    title: "Management Consulting",
    tagline: "Financial strategy for growing businesses",
    description:
      "Advisory on financial structuring, budgeting, and business decisions — practical guidance from people who also handle your compliance.",
    deliverables: [
      "Financial planning & budgeting",
      "Business structuring advisory",
      "Cash flow & cost analysis",
      "Growth-stage financial strategy",
    ],
    icon: "leaf",
  },
  {
    slug: "website-development",
    category: "digital",
    title: "Website Development",
    tagline: "A site built to convert",
    description:
      "Custom website design and development for businesses that want a professional, fast, and search-friendly online presence.",
    deliverables: [
      "Custom website design & development",
      "Domain & hosting setup",
      "Mobile-responsive builds",
      "Ongoing maintenance & support",
    ],
    icon: "code",
  },
  {
    slug: "digital-marketing",
    category: "digital",
    title: "Digital Marketing",
    tagline: "SEO, PPC, social & brand",
    description:
      "Search, paid and social strategies plus graphic design to help your business get found and get chosen.",
    deliverables: [
      "Search Engine Optimisation (SEO)",
      "Pay-Per-Click (PPC) advertising",
      "Social media marketing",
      "Graphic design & brand collateral",
    ],
    icon: "megaphone",
  },
];

export const stats = [
  { label: "Years of experience", value: "10+" },
  { label: "Service lines under one roof", value: "10" },
  { label: "Based in", value: "HITEC City, Hyderabad" },
  { label: "Support", value: "Toll-free helpline" },
];

export const process = [
  {
    step: "01",
    title: "Consult",
    description:
      "Tell us what you're building. We map the tax, legal and compliance path that fits your business.",
  },
  {
    step: "02",
    title: "Onboard",
    description:
      "We collect documents, set up your records, and assign a dedicated point of contact.",
  },
  {
    step: "03",
    title: "Execute",
    description:
      "Filings, registrations and books are handled — accurately, and ahead of every deadline.",
  },
  {
    step: "04",
    title: "Support",
    description:
      "Ongoing compliance, notices, and advisory, so nothing slips once you're up and running.",
  },
];

export const contact = {
  phone: "1800-313-7939",
  addressLines: [
    "3rd Floor, RAM SVR, Plot No 4/2, Sector 1",
    "Madhapur, HUDA Techno Enclave, HITEC City",
    "Hyderabad, Telangana - 500081",
  ],
};
