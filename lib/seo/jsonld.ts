import {
  SITE_URL,
  SITE_NAME,
  SITE_NAME_JA,
  SITE_DESCRIPTION_JA,
  SITE_DESCRIPTION_EN,
} from "./config";

export function buildOrganizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_NAME_JA,
    url: `${SITE_URL}/${locale}/`,
    logo: `${SITE_URL}/icon.svg`,
    description: locale === "ja" ? SITE_DESCRIPTION_JA : SITE_DESCRIPTION_EN,
  };
}

export function buildServiceJsonLd(service: {
  serviceType: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.serviceType,
    provider: { "@type": "Organization", name: SITE_NAME },
    description: service.description,
    areaServed: "Global",
  };
}

export function buildJobPostingJsonLd(job: {
  title: string;
  description: string;
  datePosted: string;
  employmentType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType ?? "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "JP",
    },
  };
}

export function buildArticleJsonLd(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    url: article.url,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
