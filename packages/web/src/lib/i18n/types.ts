export type Locale = "en" | "sv";
export type Page = "hem" | "om" | "blogg" | "boka" | "login" | "profile";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  link: string;
  title: string;
  subtitle: string;
  om: string;
  blogg: string;
  smarta: string;
  menuAria: string;
  login: string;
  boka: string;
  directions: string;
  hem: string;
  profile: string;
};

export type HemTranslations = {
  title: string;
  description: string;
  titleParagraph: string;
  subtitleParagraph: string;
  readMore: string;
  boka: string;
  heroImage: string;
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

export type BloggTranslations = {
  title: string;
  description: string;
};

export type BokaTranslations = {
  title: string;
  description: string;
};

export type LogInTranslations = {
  title: string;
  description: string;
  password: string;
  email: string;
  signUp: string;
};

export type ProfileTranslations = {
  title: string;
  description: string;
  welcome: string;
  logOut: string;
};

export type TranslationsByGroup = {
  common: CommonTranslations;
  hem: HemTranslations;
  om: OmTranslations;
  blogg: BloggTranslations;
  boka: BokaTranslations;
  login: LogInTranslations;
  profile: ProfileTranslations;
};

export type Translations =
  | keyof HemTranslations
  | keyof OmTranslations
  | keyof BloggTranslations
  | keyof CommonTranslations
  | keyof BokaTranslations
  | keyof ProfileTranslations
  | keyof LogInTranslations;
