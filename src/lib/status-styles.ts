import type { BadgeProps } from "@/components/ui/badge";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

export const filingStatusVariant: Record<
  "PENDING" | "IN_PROGRESS" | "FILED" | "OVERDUE",
  BadgeVariant
> = {
  PENDING: "warning",
  IN_PROGRESS: "info",
  FILED: "success",
  OVERDUE: "danger",
};

export const invoiceStatusVariant: Record<"UNPAID" | "PAID" | "OVERDUE", BadgeVariant> = {
  UNPAID: "warning",
  PAID: "success",
  OVERDUE: "danger",
};

export const ticketStatusVariant: Record<
  "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
  BadgeVariant
> = {
  OPEN: "warning",
  IN_PROGRESS: "info",
  RESOLVED: "success",
  CLOSED: "neutral",
};

export const leadStatusVariant: Record<"NEW" | "CONTACTED" | "CONVERTED" | "LOST", BadgeVariant> = {
  NEW: "info",
  CONTACTED: "warning",
  CONVERTED: "success",
  LOST: "neutral",
};

export const paymentStatusVariant: Record<"CREATED" | "SUCCESS" | "FAILED", BadgeVariant> = {
  CREATED: "warning",
  SUCCESS: "success",
  FAILED: "danger",
};
