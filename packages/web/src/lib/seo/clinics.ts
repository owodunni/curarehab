import type { MedicalClinic, PostalAddress, WithContext } from "schema-dts";

// Addresses are not stored in Directus, so they are kept here for the clinics' structured data.
const clinics: Record<string, { name: string; address: PostalAddress; hasMap: string }> = {
  city: {
    name: "CuraRehab City",
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
    name: "CuraRehab Mjärdevi",
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
    "@id": `https://curarehab.se/kliniker/${slug}#clinic`,
    name: clinic.name,
    url: `https://curarehab.se/kliniker/${slug}`,
    ...(description && { description }),
    ...(image && { image }),
    address: clinic.address,
    hasMap: clinic.hasMap,
    telephone: "+46707666676",
    email: "info@curarehab.se",
    parentOrganization: {
      "@type": "MedicalOrganization",
      name: "CuraRehab",
      legalName: "CuraRehab Linköping AB",
      url: "https://curarehab.se",
    },
  };
};
