import type { MetadataRoute } from "next";
import { services } from "@/lib/services-content";

const BASE_URL = "https://aksharafinalytics.com";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/gst-consultants",
  "/contact",
  "/payments",
  "/terms-and-conditions",
  "/privacy-policy",
  "/refund-return-shipping-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
