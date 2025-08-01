export type Locale = "en" | "sv";
export type Page =
  | "artiklar"
  | "behandlingar"
  | "cookies"
  | "hem"
  | "om"
  | "personuppgiftspolicy"
  | "hitta"
  | "terapeuter"
  | "skadekompassen"
  | "boka"
  | "kliniker";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  lang: string;
  link: string;
  title: string;
  om: string;
  artiklen: string;
  artiklar: string;
  sidan: string;
  menuAria: string;
  boka: string;
  hanoLink: string;
  hem: string;
  hitta: string;
  behandlingen: string;
  behandlingar: string;
  terapeuter: string;
  personuppgiftspolicy: string;
  ourServices: string;
  information: string;
  partners: string;
  readMore: string;
  contact: string;
  titleFysio: string;
  titleNaprapat: string;
  titleNaprapatLight: string;
  titleMassage: string;
  titleWeb: string;
  titleSpecFysio: string;
  terapheutsTitle: string;
  terapheutsText: string;
  treatmentsTitle: string;
  treatmentsText: string;
  skadekompassen: string;
  skadekompassenTitle: string;
  skadekompassenText: string;
  bokaNu: string;
  swedishFlag: string;
  englishFlag: string;
  errorHome: string;
  errorSubtitle: string;
  errorTitle: string;
  fysioLinkTitle: string;
  fysioHref: string;
  naprapatLinkTitle: string;
  naprapatHref: string;
  cookies: string;
  cookieBannerText: string;
  cookieBannerAcceptButton: string;
  cookieBannerRejectButton: string;
  cookiePolicy: string;
  kliniker: string;
  kliniken: string;
  hittaHit: string;
  bokaTid: string;
};

export type HemTranslations = {
  title: string;
  description: string;
  titleParagraph: string;
  subtitleParagraph: string;
  readMore: string;
  boka: string;
  naprapathyTitle: string;
  naprapathyParagraph: string;
  physiotherapyTitle: string;
  physiotherapyParagraph: string;
  massageTitle: string;
  massageParagraph: string;
  mainTreatmentTitle: string;
  mainTreatmentParagraph: string;
  behandlingTitle: string;
  behandlingParagraph: string;
  behandlingUndersokningTitle: string;
  behandlingUndersokningParagraph: string;
  behandlingBehandlingTitle: string;
  behandlingBehandlingParagraph: string;
  behandlingOvningarTitle: string;
  behandlingOvningarParagraph: string;
  behandlingUppföljningTitle: string;
  behandlingUppföljningParagraph: string;
  together: string;
};

export type OmTranslations = {
  title: string;
  description: string;
};

export type ArticleTranslations = {
  title: string;
  description: string;
  readArticle: string;
  articlesTitle: string;
  articlesText: string;
};

export type BokaTranslations = {
  title: string;
  description: string;
  // New multi-clinic content
  clinicsTitle: string;
  clinicsDescription: string;
  visitTitle: string;
  visitDescription: string;
  // Clinic list component
  bookAppointment: string;
  learnMore: string;
  viewClinic: string;
};

export type KlinikerTranslations = {
  // Overview page
  title: string;
  description: string;
  clinicsTitle: string;
  clinicsDescription: string;

  // Individual clinic pages
  clinicTitle: string;
  clinicDescription: string;
  bokaTitle: string;
  bokaDescription: string;
  hittaTitle: string;
  hittaDescription: string;
  omTitle: string;
  omDescription: string;

  // Clinic-specific booking page
  bookingTitle: string;
  bookingDescription: string;

  // Clinic-specific directions page
  directionsTitle: string;
  directionsDescription: string;

  // Clinic-specific about page
  aboutTitle: string;
  aboutDescription: string;

  // Hero section for individual clinic pages
  heroTitle: string;
  heroBookButton: string;
  heroLearnMore: string;
};

export type FindTranslations = {
  title: string;
  description: string;
};

export type TerapheutTranslations = {
  title: string;
  description: string;
};

export type PrivacyTranslations = {
  title: string;
  description: string;
};

export type TreatmentsTranslations = {
  title: string;
  description: string;
  pris: string;
  tid: string;
};

export type SkadekompassenTranslations = {
  title: string;
  description: string;
};

export type CookiesTranslations = {
  title: string;
  description: string;
  cookiePreferences: string;
  statistics: string;
  statisticsDescription: string;
  marketing: string;
  marketingDescription: string;
};

export type TranslationsByGroup = {
  common: CommonTranslations;
  hem: HemTranslations;
  om: OmTranslations;
  artiklar: ArticleTranslations;
  hitta: FindTranslations;
  terapeuter: TerapheutTranslations;
  personuppgiftspolicy: PrivacyTranslations;
  behandlingar: TreatmentsTranslations;
  cookies: CookiesTranslations;
  skadekompassen: SkadekompassenTranslations;
  boka: BokaTranslations;
  kliniker: KlinikerTranslations;
};

export type Translations =
  | keyof HemTranslations
  | keyof OmTranslations
  | keyof ArticleTranslations
  | keyof CommonTranslations
  | keyof FindTranslations
  | keyof TerapheutTranslations
  | keyof PrivacyTranslations
  | keyof CookiesTranslations
  | keyof SkadekompassenTranslations
  | keyof TreatmentsTranslations
  | keyof BokaTranslations
  | keyof KlinikerTranslations;
