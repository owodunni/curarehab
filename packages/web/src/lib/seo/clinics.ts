import type { MedicalClinic, PostalAddress, WithContext } from "schema-dts";
import { email, organization, organizationName, origin, telephone } from "../constants";

// Addresses are not stored in Directus, so they are kept here for the clinics' structured data.
const clinics: Record<string, { name: string; address: PostalAddress; hasMap: string }> = {
  city: {
    name: `${organizationName} City`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Drottninggatan 43N",
      postalCode: "582 27",
      addressLocality: "Linköping",
      addressCountry: "SE",
    },
    hasMap: "https://maps.app.goo.gl/3oE2VBnvFtgB6wyq5",
  },
  mjardevi: {
    name: `${organizationName} Mjärdevi`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Teknikringen 7",
      addressLocality: "Linköping",
      addressCountry: "SE",
    },
    hasMap: "https://maps.app.goo.gl/Yeti6iNAz1Eo32wb8",
  },
};

export const clinicLdJson = (
  slug: string | null | undefined,
  { description, image }: { description?: string | null; image?: string }
): WithContext<MedicalClinic> | undefined => {
  const clinic = slug ? clinics[slug] : undefined;
  if (!slug || !clinic) {
    return undefined;
  }
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${origin}/kliniker/${slug}#clinic`,
    name: clinic.name,
    url: `${origin}/kliniker/${slug}`,
    ...(description && { description }),
    ...(image && { image }),
    address: clinic.address,
    hasMap: clinic.hasMap,
    telephone,
    email,
    parentOrganization: organization,
  };
};
