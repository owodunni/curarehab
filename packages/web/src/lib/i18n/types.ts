export type Locale = "en" | "sv";
export type Page = "hem" | "om" | "blogg" | "boka" | "logaIn";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  link: string;
  title: string;
  subtitle: string;
  om: string;
  blogg: string;
  smarta: string;
  menuAria: string;
  logaIn: string;
  boka: string;
  directions: string;
};

export type HemTranslations = {
  title: string;
  description: string;
  titleParagraph: string;
  subtitleParagraph: string;
  readMore: string;
  boka: string;
  heroImage: string;
};

export type OmTranslations = {
  title: string;
  description: string;
};

export type BloggTranslations = {
  title: string;
  description: string;
};

export type LogaInTranslations = {
  title: string;
  description: string;
};

export type BokaTranslations = {
  title: string;
  description: string;
};

export type Translations =
  | keyof HemTranslations
  | keyof OmTranslations
  | keyof BloggTranslations
  | keyof CommonTranslations
  | keyof LogaInTranslations
  | keyof BokaTranslations;
