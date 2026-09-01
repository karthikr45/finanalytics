import type { ServiceDetail } from "@/lib/services-content";

export type ServiceImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export const digitalServiceImages: Record<string, ServiceImage> = {
  "website-development": {
    src: "/images/finalytics/it-services/website-development.webp",
    alt: "Responsive business website displayed across desktop, laptop and mobile",
    objectPosition: "65% center",
  },
  "ecommerce-development": {
    src: "/images/finalytics/it-services/ecommerce-development.webp",
    alt: "Online storefront with product catalogue, cart and checkout",
    objectPosition: "68% center",
  },
  "mobile-applications-development": {
    src: "/images/finalytics/it-services/mobile-application-development.webp",
    alt: "Native mobile application interfaces across three smartphones",
    objectPosition: "70% center",
  },
  "it-services": {
    src: "/images/finalytics/it-services/it-services-overview.webp",
    alt: "Digital product team planning website, ecommerce and mobile solutions",
    objectPosition: "70% center",
  },
};

const categoryServiceImages: Record<string, ServiceImage> = {
  "Tax & Compliance": {
    src: "/images/finalytics/secondary/service-tax-compliance-hero.webp",
    alt: "Tax advisor reviewing financial reports and compliance records",
    objectPosition: "72% center",
  },
  "Company & Legal": {
    src: "/images/finalytics/secondary/service-company-legal-hero.webp",
    alt: "Corporate compliance professionals reviewing registration documents",
    objectPosition: "72% center",
  },
};

const digitalDetailAlt: Record<string, string> = {
  "website-development": "Responsive website design shown across desktop, laptop and mobile screens",
  "ecommerce-development": "Ecommerce storefront with catalogue, shopping cart and secure checkout",
  "mobile-applications-development": "Native mobile application onboarding, dashboard and activity screens",
  "it-services": "Digital product team collaborating on end-to-end IT services",
};

export function getServiceHero(service: ServiceDetail): ServiceImage | undefined {
  const digital = digitalServiceImages[service.slug];
  if (digital) return { ...digital, alt: digitalDetailAlt[service.slug] ?? digital.alt };
  return categoryServiceImages[service.category];
}
