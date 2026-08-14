"use server";

import { contactFormSchema } from "@/lib/contact/schema";
import { verifyTurnstileToken } from "@/lib/contact/turnstile";
import { saveContactSubmission } from "@/lib/contact/store";
import { notifyContactSubmission } from "@/lib/contact/notify";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  reason?: "validation" | "spam" | "unknown";
};

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", reason: "validation" };
  }

  const { turnstileToken, ...values } = parsed.data;

  const humanVerified = await verifyTurnstileToken(turnstileToken);
  if (!humanVerified) {
    return { status: "error", reason: "spam" };
  }

  try {
    await saveContactSubmission(values);
    await notifyContactSubmission(values);
  } catch (error) {
    console.error("[contact] Failed to process submission", error);
    return { status: "error", reason: "unknown" };
  }

  return { status: "success" };
}
