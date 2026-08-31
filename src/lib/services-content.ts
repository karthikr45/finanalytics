import type { LucideIcon } from "lucide-react";
import {
  Receipt,
  Landmark,
  Building2,
  Handshake,
  BookOpen,
  BadgeCheck,
  Layers,
  Code2,
  ShoppingCart,
  Smartphone,
  LayoutGrid,
  Rocket,
} from "lucide-react";

export type ServiceCategory = "Tax & Compliance" | "Company & Legal" | "Digital Services";

export const categoryOrder: ServiceCategory[] = [
  "Tax & Compliance",
  "Company & Legal",
  "Digital Services",
];

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  summary: string;
  body: string;
  whatsIncluded: string[];
  faqs: FAQ[];
  related: string[];
  icon: LucideIcon;
}

export const services: ServiceDetail[] = [
  {
    slug: "income-tax-filings",
    category: "Tax & Compliance",
    title: "Income Tax Filings",
    tagline: "Individual, business & trust ITR filing",
    summary:
      "Accurate, on-time income tax return filing for individuals, businesses and trusts — with planning built in, not bolted on.",
    body: "We prepare and file income tax returns for individuals, businesses and trusts with a focus on accuracy, timely submission and tax optimisation. Every return is reviewed against your specific income sources and deduction eligibility before it's filed, so you claim everything you're entitled to and file with confidence.",
    whatsIncluded: [
      "ITR filing for individuals, firms, companies & trusts",
      "TDS/TCS credit reconciliation with Form 26AS",
      "Advance tax computation & planning",
      "Notice handling and assessment support",
      "Income Tax Audit representation where applicable",
    ],
    faqs: [
      {
        question: "Who needs to file an income tax return?",
        answer:
          "Anyone whose income exceeds the basic exemption limit, or who meets specific conditions under the Income Tax Act (foreign travel, high-value transactions and more), is required to file. We'll confirm your exact filing obligation in the first consultation.",
      },
      {
        question: "What if I've already missed a filing deadline?",
        answer:
          "Belated and revised returns can still be filed within the timelines the department allows, though interest and penalties may apply. We'll help you file correctly and minimise any additional liability.",
      },
      {
        question: "Do you handle income tax notices?",
        answer:
          "Yes — from scrutiny notices to assessment proceedings, we represent and respond to the department on your behalf.",
      },
    ],
    related: ["gst-compliances", "other-services", "book-keeping"],
    icon: Receipt,
  },
  {
    slug: "gst-compliances",
    category: "Tax & Compliance",
    title: "GST Compliances",
    tagline: "Registration to reconciliation",
    summary:
      "GST registration and ongoing compliance handled end to end — returns filed on schedule, credit reconciled, notices answered.",
    body: "GST compliance isn't a once-a-year task, it's monthly discipline. We handle registration, return filing and reconciliation across the GST regime, so your input credit stays accurate and your filings stay on schedule every cycle.",
    whatsIncluded: [
      "New GST registration & amendments",
      "Monthly / quarterly GST return filing (GSTR-1, 3B, 9)",
      "Input tax credit reconciliation",
      "GST notices & departmental representation",
      "GST advisory for new business lines",
    ],
    faqs: [
      {
        question: "When is GST registration mandatory?",
        answer:
          "Once your turnover crosses the applicable threshold for your state and business type, or for specific categories of business regardless of turnover (e-commerce, inter-state supply and more). We'll assess your specific case.",
      },
      {
        question: "What happens if a GST return is filed late?",
        answer:
          "Late fees and interest accrue automatically, and your input credit chain can get disrupted for buyers downstream. We track every due date so this doesn't happen on our watch.",
      },
      {
        question: "Can you help with GST notices and audits?",
        answer:
          "Yes — we prepare responses, reconcile the underlying data and represent you before the GST department.",
      },
    ],
    related: ["income-tax-filings", "company-compliances", "book-keeping"],
    icon: Landmark,
  },
  {
    slug: "company-compliances",
    category: "Company & Legal",
    title: "Company Compliances",
    tagline: "Incorporation & ROC, handled",
    summary:
      "Full lifecycle corporate compliance — incorporation, licenses and annual ROC filings — so your company stays in good standing.",
    body: "From the day you incorporate, a company carries statutory obligations that don't pause. We manage company registration, the licenses that follow, and the statutory and annual compliance filings that keep your company in good standing with the Registrar of Companies.",
    whatsIncluded: [
      "Private/public limited company incorporation",
      "Annual ROC filings & statutory registers",
      "DPT-3, DIR-3 KYC & other event-based filings",
      "Statutory & tax audit coordination",
      "Labour law & corporate governance compliance advisory",
    ],
    faqs: [
      {
        question: "How long does company incorporation take?",
        answer:
          "Typically 7–10 working days once documents are in order, though timelines depend on Registrar processing and name approval.",
      },
      {
        question: "What compliance is required after incorporation?",
        answer:
          "Annual ROC filings, board meeting documentation, statutory registers, and event-based filings like DIR-3 KYC and DPT-3 for deposits — we track and file all of it against your compliance calendar.",
      },
      {
        question: "Can you also handle our trademark?",
        answer:
          "Yes — trademark and copyright registration is covered under Other Services, and we typically bundle it with incorporation for new companies.",
      },
    ],
    related: ["partnership-firm", "business-registrations", "other-services"],
    icon: Building2,
  },
  {
    slug: "partnership-firm",
    category: "Company & Legal",
    title: "Partnership Firm Services",
    tagline: "Registration & compliance for partnerships",
    summary:
      "Partnership deed drafting, firm registration, and the ongoing compliance partnerships need to operate with full legal standing.",
    body: "A partnership runs on the strength of its deed and the discipline of its filings. We draft the deed, register the firm, and keep the annual compliance current, so the partnership has full legal standing from day one.",
    whatsIncluded: [
      "Partnership deed drafting",
      "Firm registration with the Registrar",
      "PAN/TAN & bank account support",
      "Annual compliance & tax filings",
    ],
    faqs: [
      {
        question: "Is registering a partnership firm mandatory?",
        answer:
          "Registration isn't legally mandatory in every state, but an unregistered firm loses the right to sue third parties in court to enforce its contracts — we recommend registering from the start.",
      },
      {
        question: "Can a partnership firm be converted to a company later?",
        answer:
          "Yes, conversion to an LLP or private limited company is a well-defined process — we handle that transition when the business is ready to scale.",
      },
    ],
    related: ["company-compliances", "book-keeping", "business-registrations"],
    icon: Handshake,
  },
  {
    slug: "book-keeping",
    category: "Tax & Compliance",
    title: "Bookkeeping",
    tagline: "Your books, managed end to end",
    summary:
      "Accounting records, financial statements and regular reports, maintained by a dedicated team — not caught up once a year.",
    body: "Bookkeeping is the foundation every other compliance filing depends on. We maintain your accounting records and financial statements on a regular cycle and deliver reports that give you a real, current view of the business.",
    whatsIncluded: [
      "Day-to-day bookkeeping & ledger maintenance",
      "Bank reconciliation",
      "MIS & financial reporting",
      "Full accounts outsourcing for growing teams",
    ],
    faqs: [
      {
        question: "Do you work with our existing accounting software?",
        answer:
          "Yes — we work within Tally, Zoho Books and most common platforms, or set one up if you don't have one yet.",
      },
      {
        question: "How often will we get financial reports?",
        answer:
          "Monthly, as standard — with reconciled books and an MIS pack, so you always know where the business stands ahead of any filing deadline.",
      },
    ],
    related: ["income-tax-filings", "gst-compliances", "company-compliances"],
    icon: BookOpen,
  },
  {
    slug: "licences",
    category: "Company & Legal",
    title: "Licences & Statutory Registrations",
    tagline: "Profession tax, ESI/PF & more",
    summary:
      "Profession tax and ESI/PF filings, plus the statutory registrations your business needs to hire and operate legally.",
    body: "Beyond tax and ROC filings, businesses carry a set of statutory registrations and periodic filings tied to employment and trade. We handle profession tax filing and ESI/PF contributions and filings, so your obligations as an employer stay current.",
    whatsIncluded: [
      "Profession tax registration & filing",
      "ESI registration & monthly contributions",
      "PF registration & monthly filings",
      "Renewals & compliance calendars",
    ],
    faqs: [
      {
        question: "At what point does ESI/PF registration become mandatory?",
        answer:
          "Once your employee count crosses the applicable statutory threshold — we'll confirm the exact figure for your business type and register you ahead of the deadline.",
      },
      {
        question: "Do you handle monthly filings or just the initial registration?",
        answer:
          "Both — registration is a one-time step, but profession tax and ESI/PF filings recur monthly, and we manage the full cycle.",
      },
    ],
    related: ["company-compliances", "book-keeping", "other-services"],
    icon: BadgeCheck,
  },
  {
    slug: "other-services",
    category: "Tax & Compliance",
    title: "Audits, TDS & Other Services",
    tagline: "Audits, TDS, IP & startup registration",
    summary:
      "Tax audit, statutory audit, TDS/TCS filings, copyright & trademark, and Startup India registration — the specialist filings that round out full compliance.",
    body: "Some compliance needs are periodic rather than monthly — an audit due by a statutory deadline, a trademark that needs protecting, a TDS return that needs reconciling. We cover the full range of specialist and one-off filings alongside your regular compliance.",
    whatsIncluded: [
      "Tax audit & statutory audit",
      "Income tax audit representation",
      "TCS & TDS calculation, deduction & filing",
      "Copyright & trademark registration",
      "Startup India (DPIIT) recognition",
      "All other taxation services, including property tax",
    ],
    faqs: [
      {
        question: "Who is required to get a tax audit done?",
        answer:
          "Businesses and professionals crossing the prescribed turnover or gross receipts threshold under the Income Tax Act — we'll confirm your applicability and manage the audit end to end.",
      },
      {
        question: "How long does trademark registration take?",
        answer:
          "The application itself is filed within days; full registration, after examination and any opposition period, typically takes several months to over a year.",
      },
      {
        question: "What is Startup India recognition and do we qualify?",
        answer:
          "It's a DPIIT recognition that unlocks tax exemptions and easier compliance for early-stage companies meeting the scheme's age and turnover criteria — we assess eligibility and file the application.",
      },
    ],
    related: ["income-tax-filings", "company-compliances", "gst-compliances"],
    icon: Layers,
  },
  {
    slug: "website-development",
    category: "Digital Services",
    title: "Website Development",
    tagline: "A site built to convert",
    summary:
      "Custom website design and development for businesses that want a fast, professional, search-friendly online presence.",
    body: "Your website is often the first impression a prospective client forms of your business. We design and build custom sites that are fast, mobile-first and built with search visibility in mind from the first sprint.",
    whatsIncluded: [
      "Custom design & development",
      "Mobile-responsive builds",
      "Domain & hosting setup",
      "Ongoing maintenance & support",
    ],
    faqs: [
      {
        question: "How long does a typical website build take?",
        answer:
          "A standard business website is usually live within 2–4 weeks depending on scope; more complex builds are scoped individually.",
      },
      {
        question: "Do you handle hosting and maintenance after launch?",
        answer:
          "Yes — domain, hosting and ongoing maintenance are available as an add-on so the site keeps running smoothly after handover.",
      },
    ],
    related: ["ecommerce-development", "mobile-applications-development", "it-services"],
    icon: Code2,
  },
  {
    slug: "ecommerce-development",
    category: "Digital Services",
    title: "Ecommerce Development",
    tagline: "Storefronts built to sell",
    summary:
      "Ecommerce stores with the catalogue, payments and checkout experience your customers expect.",
    body: "Selling online means getting the fundamentals right — a clean catalogue, a fast checkout, and payment and shipping flows that don't drop customers halfway through. We build ecommerce storefronts around exactly that.",
    whatsIncluded: [
      "Product catalogue & inventory setup",
      "Payment gateway integration",
      "Order & shipping workflows",
      "Ongoing store maintenance",
    ],
    faqs: [
      {
        question: "Which payment gateways do you integrate?",
        answer:
          "Razorpay and other India-first gateways as standard, so customers can pay by card, UPI or net banking without friction.",
      },
      {
        question: "Can you migrate our existing store?",
        answer:
          "Yes — we handle catalogue, order history and customer data migration from most major platforms.",
      },
    ],
    related: ["website-development", "mobile-applications-development", "it-services"],
    icon: ShoppingCart,
  },
  {
    slug: "mobile-applications-development",
    category: "Digital Services",
    title: "Mobile Application Development",
    tagline: "iOS & Android, built right",
    summary: "Mobile application development from concept to app-store launch.",
    body: "From the first wireframe to submission on the App Store and Play Store, we build mobile applications that are designed around how your customers will actually use them, then support the app after launch.",
    whatsIncluded: [
      "iOS & Android app development",
      "UI/UX design",
      "App Store & Play Store submission",
      "Post-launch support",
    ],
    faqs: [
      {
        question: "Do you build native apps or cross-platform?",
        answer:
          "We recommend cross-platform frameworks for most business apps, which keeps cost and timeline down while covering both iOS and Android — native is scoped where performance needs demand it.",
      },
      {
        question: "What's included after the app goes live?",
        answer:
          "Post-launch support covers bug fixes, OS-version compatibility updates and minor iterations, available as an ongoing arrangement.",
      },
    ],
    related: ["website-development", "ecommerce-development", "it-services"],
    icon: Smartphone,
  },
  {
    slug: "it-services",
    category: "Digital Services",
    title: "IT Services",
    tagline: "Website, ecommerce & mobile — one partner",
    summary:
      "Website, ecommerce and mobile app development sit alongside our tax and compliance work, for clients who'd rather have one partner for both.",
    body: "Digital Services is our second line of business: the same firm that keeps your compliance current can also build and maintain your website, online store, or mobile app — one relationship instead of several vendors.",
    whatsIncluded: [
      "Website design & development",
      "Ecommerce storefronts",
      "Mobile application development",
      "Ongoing hosting, maintenance & support",
    ],
    faqs: [
      {
        question: "Is IT services a separate engagement from compliance work?",
        answer:
          "It can be — many clients start with tax and compliance and add digital services later, or the reverse. Either way, billing and delivery are kept clean and separate per engagement.",
      },
    ],
    related: ["website-development", "ecommerce-development", "mobile-applications-development"],
    icon: LayoutGrid,
  },
  {
    slug: "business-registrations",
    category: "Company & Legal",
    title: "Business Registrations",
    tagline: "Every registration your business needs",
    summary:
      "Company incorporation, partnership registration and Startup India recognition — the full spectrum of business registration under one roof.",
    body: "Choosing the right structure — company, partnership, or a Startup India-recognised entity — shapes your compliance burden for years. We advise on structure and then handle the registration itself, so the entity is set up right the first time.",
    whatsIncluded: [
      "Private/public limited company incorporation",
      "Partnership firm registration",
      "Startup India (DPIIT) recognition",
      "Entity structuring advisory",
    ],
    faqs: [
      {
        question: "Which business structure is right for us?",
        answer:
          "It depends on liability protection needs, fundraising plans and compliance appetite — we walk through the trade-offs against your specific plans before recommending a structure.",
      },
    ],
    related: ["company-compliances", "partnership-firm", "other-services"],
    icon: Rocket,
  },
];

export const servicesBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string) {
  return servicesBySlug.get(slug);
}

export function getRelatedServices(service: ServiceDetail, limit = 3) {
  return service.related
    .map((slug) => servicesBySlug.get(slug))
    .filter((s): s is ServiceDetail => Boolean(s))
    .slice(0, limit);
}

export const servicesByCategory: Record<ServiceCategory, ServiceDetail[]> = {
  "Tax & Compliance": services.filter((s) => s.category === "Tax & Compliance"),
  "Company & Legal": services.filter((s) => s.category === "Company & Legal"),
  "Digital Services": services.filter((s) => s.category === "Digital Services"),
};
