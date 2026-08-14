import ja from "@/content/company/profile.ja.json";
import en from "@/content/company/profile.en.json";

type PendingOr<T> = T | { status: string };

export type CompanyProfile = {
  companyName: string;
  companyType: string;
  businessContent: string;
  representative: string;
  address: PendingOr<string>;
  founded: PendingOr<string>;
  capital: PendingOr<string>;
};

const PROFILES: Record<string, CompanyProfile> = { ja, en };

export function getCompanyProfile(locale: string): CompanyProfile {
  return PROFILES[locale] ?? PROFILES.ja;
}

export function resolvePending(value: PendingOr<string>): string | null {
  return typeof value === "string" ? value : null;
}
