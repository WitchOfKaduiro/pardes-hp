"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Link } from "@/lib/i18n/navigation";
import {
  contactFormSchema,
  CONTACT_PURPOSES,
  type ContactPurpose,
} from "@/lib/contact/schema";
import { submitContactForm } from "@/app/[locale]/(site)/contact/actions";

type FormFields = {
  name: string;
  company: string;
  email: string;
  purpose: ContactPurpose;
  message: string;
};

const clientSchema = contactFormSchema.omit({
  turnstileToken: true,
  locale: true,
});

export default function ContactForm({
  locale,
  labels,
}: {
  locale: "ja" | "en";
  labels: {
    name: string;
    company: string;
    email: string;
    purpose: string;
    purposeOptions: Record<ContactPurpose, string>;
    message: string;
    consent: string;
    consentLink: string;
    consentSuffix: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    errors: { required: string; email: string };
  };
}) {
  const searchParams = useSearchParams();
  const requestedPurpose = searchParams.get(
    "purpose"
  ) as ContactPurpose | null;
  const defaultPurpose: ContactPurpose =
    requestedPurpose && CONTACT_PURPOSES.includes(requestedPurpose)
      ? requestedPurpose
      : "poc";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(clientSchema),
    defaultValues: { purpose: defaultPurpose },
  });

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    (window as unknown as Record<string, unknown>).onTurnstileSuccess = (
      token: string
    ) => setTurnstileToken(token);
    return () => {
      delete (window as unknown as Record<string, unknown>)
        .onTurnstileSuccess;
    };
  }, []);

  const onSubmit = (values: FormFields) => {
    setResult("idle");
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("company", values.company);
    formData.set("email", values.email);
    formData.set("purpose", values.purpose);
    formData.set("message", values.message);
    formData.set("locale", locale);
    // Turnstileサイトキー未設定時（開発環境）は検証をスキップするフォールバック。
    formData.set("turnstileToken", turnstileToken || "dev-skip");

    startTransition(async () => {
      const response = await submitContactForm({ status: "idle" }, formData);
      setResult(response.status);
      if (response.status === "success") {
        reset({ purpose: defaultPurpose } as FormFields);
        setTurnstileToken("");
      }
    });
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-border-on-light bg-white px-fluid-sm py-2.5 text-fluid-sm text-fg-on-light outline-none transition-colors focus:border-accent";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-fluid-sm"
    >
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}

      <div>
        <label className="text-fluid-sm text-fg-muted-on-light" htmlFor="name">
          {labels.name}
        </label>
        <input id="name" className={inputClass} {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-fluid-xs text-red-600">
            {labels.errors.required}
          </p>
        )}
      </div>

      <div>
        <label className="text-fluid-sm text-fg-muted-on-light" htmlFor="company">
          {labels.company}
        </label>
        <input id="company" className={inputClass} {...register("company")} />
        {errors.company && (
          <p className="mt-1 text-fluid-xs text-red-600">
            {labels.errors.required}
          </p>
        )}
      </div>

      <div>
        <label className="text-fluid-sm text-fg-muted-on-light" htmlFor="email">
          {labels.email}
        </label>
        <input
          id="email"
          type="email"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-fluid-xs text-red-600">
            {labels.errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="text-fluid-sm text-fg-muted-on-light" htmlFor="purpose">
          {labels.purpose}
        </label>
        <select
          id="purpose"
          className={inputClass}
          defaultValue={defaultPurpose}
          {...register("purpose")}
        >
          {CONTACT_PURPOSES.map((purpose) => (
            <option key={purpose} value={purpose}>
              {labels.purposeOptions[purpose]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-fluid-sm text-fg-muted-on-light" htmlFor="message">
          {labels.message}
        </label>
        <textarea
          id="message"
          rows={6}
          className={inputClass}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-fluid-xs text-red-600">
            {labels.errors.required}
          </p>
        )}
      </div>

      {siteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-callback="onTurnstileSuccess"
        />
      )}

      <p className="text-fluid-xs text-fg-muted-on-light">
        {labels.consent}
        <Link href="/legal/privacy" className="text-accent hover:underline">
          {labels.consentLink}
        </Link>
        {labels.consentSuffix}
      </p>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-full bg-accent px-fluid-md py-3 text-fluid-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? labels.submitting : labels.submit}
      </button>

      {result === "success" && (
        <p className="text-fluid-sm text-accent" role="status">
          {labels.success}
        </p>
      )}
      {result === "error" && (
        <p className="text-fluid-sm text-red-600" role="alert">
          {labels.error}
        </p>
      )}
    </form>
  );
}
