export type Locale = "en" | "sv";
export type Page = "hem" | "om" | "blog" | "boka" | "login" | "admin";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  link: string;
  title: string;
  subtitle: string;
  om: string;
  blog: string;
  smarta: string;
  menuAria: string;
  login: string;
  boka: string;
  directions: string;
  hem: string;
  admin: string;
  create: string;
  cancel: string;
  save: string;
  heroImage: string;
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

export type BlogTranslations = {
  title: string;
  description: string;
  readArticle: string;
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

export type AdminTranslations = {
  title: string;
  description: string;
  welcome: string;
  logOut: string;
  blogPosts: string;
  tableTitle: string;
  tableSlug: string;
  tableExcerpt: string;
  tableDescription: string;
  tableParent: string;
  newBlogPost: string;
};

export type TranslationsByGroup = {
  common: CommonTranslations;
  hem: HemTranslations;
  om: OmTranslations;
  blog: BlogTranslations;
  boka: BokaTranslations;
  login: LogInTranslations;
  admin: AdminTranslations;
};

export type Translations =
  | keyof HemTranslations
  | keyof OmTranslations
  | keyof BlogTranslations
  | keyof CommonTranslations
  | keyof BokaTranslations
  | keyof AdminTranslations
  | keyof LogInTranslations;
