import { z } from "zod";

export const CONTACT_PURPOSES = ["poc", "recruit", "media", "other"] as const;
export type ContactPurpose = (typeof CONTACT_PURPOSES)[number];

/**
 * クライアント（react-hook-form）とサーバー（Server Action）の両方で
 * 同じスキーマを使い、多重防御としてサーバー側でも再検証する（REQ-CONTACT-03）。
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(1),
  company: z.string().trim().min(1),
  email: z.string().trim().min(1).email(),
  purpose: z.enum(CONTACT_PURPOSES),
  message: z.string().trim().min(1),
  turnstileToken: z.string().min(1),
  locale: z.enum(["ja", "en"]),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
