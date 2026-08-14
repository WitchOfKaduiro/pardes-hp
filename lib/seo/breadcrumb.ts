import { buildBreadcrumbJsonLd } from "./jsonld";
import { SITE_URL } from "./config";

export function pageBreadcrumbJsonLd(
  locale: string,
  path: string,
  name: string
) {
  const home = { name: "Pardes", url: `${SITE_URL}/${locale}` };
  if (!path) return buildBreadcrumbJsonLd([home]);
  return buildBreadcrumbJsonLd([
    home,
    { name, url: `${SITE_URL}/${locale}${path}` },
  ]);
}
