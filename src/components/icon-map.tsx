import {
  Receipt,
  Landmark,
  Building2,
  Handshake,
  BookOpen,
  ShieldCheck,
  BadgeCheck,
  Leaf,
  Code2,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/services-data";

export const iconMap: Record<Service["icon"], LucideIcon> = {
  receipt: Receipt,
  landmark: Landmark,
  building: Building2,
  handshake: Handshake,
  book: BookOpen,
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  leaf: Leaf,
  code: Code2,
  megaphone: Megaphone,
};
