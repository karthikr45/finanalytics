import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\-\s]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  serviceInterest: z.string().min(1, "Select a service"),
  experienceLevel: z.string().optional(),
  message: z.string().optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  branch: z.enum(["HIMAYATNAGAR", "MADHAPUR", "EITHER"]).optional(),
  message: z.string().min(10, "Tell us a little more about what you need"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  company: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const ticketSchema = z.object({
  subject: z.string().min(3, "Enter a subject"),
  message: z.string().min(10, "Describe your query"),
});
export type TicketInput = z.infer<typeof ticketSchema>;
