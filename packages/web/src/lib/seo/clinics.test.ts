import { describe, it, expect } from "vitest";
import { clinicLdJson } from "./clinics";

describe("clinicLdJson", () => {
  it("returns structured data for a known clinic", () => {
    expect(clinicLdJson("city", { description: "Beskrivning" })).toMatchObject({
      "@type": "MedicalClinic",
      name: "CuraRehab City",
      url: "https://curarehab.se/kliniker/city",
      description: "Beskrivning",
      address: { streetAddress: "Drottninggatan 43N", addressLocality: "Linköping" },
    });
  });

  it("returns undefined for an unknown clinic", () => {
    expect(clinicLdJson("okand", {})).toBeUndefined();
    expect(clinicLdJson(undefined, {})).toBeUndefined();
  });
});
