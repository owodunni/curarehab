export type Locale = "en" | "sv";
export type Page = "hem" | "om" | "blogg" | "smarta";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  link: string;
  title: string;
  subtitle: string;
  om: string;
  blogg: string;
  smarta: string;
};

export type HemTranslations = {
  title: string;
  description: string;
  aboutLink: string;
};

export type OmTranslations = {
  title: string;
  description: string;
};

export type SmartaTranslations = {
  title: string;
  description: string;
};

export type BloggTranslations = {
  title: string;
  description: string;
};

export type Translations =
  | keyof HemTranslations
  | keyof OmTranslations
  | keyof SmartaTranslations
  | keyof BloggTranslations
  | keyof CommonTranslations;
