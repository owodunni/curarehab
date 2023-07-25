export type Locale = "en" | "sv";
export type Page =
  | "artiklar"
  | "behandlingar"
  | "cookies"
  | "hem"
  | "om"
  | "personuppgiftspolicy"
  | "hitta"
  | "terapeuter";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  link: string;
  title: string;
  subtitle: string;
  om: string;
  artiklen: string;
  artiklar: string;
  sidan: string;
  smarta: string;
  menuAria: string;
  boka: string;
  hanoLink: string;
  directions: string;
  hem: string;
  create: string;
  cancel: string;
  save: string;
  heroImage: string;
  comingSoon: string;
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
  descriptionParagraph: string;
  titleFysio: string;
  titleNaprapat: string;
  titleMassage: string;
  titleWeb: string;
  terapheutsTitle: string;
  terapheutsText: string;
  articlesTitle: string;
  articlesText: string;
  treatmentsTitle: string;
  treatmentsText: string;
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
};

export type OmTranslations = {
  title: string;
  description: string;
};

export type ArticleTranslations = {
  title: string;
  description: string;
  readArticle: string;
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
};

export type CookiesTranslations = {
  title: string;
  description: string;
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
  | keyof TreatmentsTranslations;
