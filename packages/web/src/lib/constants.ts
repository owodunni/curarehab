import type { Organization } from "schema-dts";

export const origin = "https://curarehab.se";
export const email = "info@curarehab.se";
export const telephone = "+46707666676";
export const organizationName = "CuraRehab";
export const legalName = "CuraRehab Linköping AB";

export const organization = {
  "@type": "Organization",
  url: origin,
  email,
  name: organizationName,
  legalName,
} satisfies Organization;
