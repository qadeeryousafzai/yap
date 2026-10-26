import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});
export const newsletterSchema = z.object({ email: z.string().trim().email().max(254), website: z.string().max(0).optional() });
export const optionalImageUrl = z.union([z.literal(""), z.string().url().max(2048)]).optional();
export const membershipSchema = z.object({
  name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254), phone: z.string().trim().min(7).max(30),
  city: z.string().trim().min(2).max(80), province: z.string().trim().min(2).max(80), category: z.string().trim().min(2).max(80),
  motivation: z.string().trim().min(20).max(3000), consent: z.literal("on"),
  education: z.string().max(160).optional(), profession: z.string().max(160).optional(), interests: z.string().max(800).optional(), skills: z.string().max(1500).optional(),
  website: z.string().max(0).optional(),
});
