export type Locale = "en" | "sv";
export type Page =
  | "hem"
  | "om"
  | "artiklar"
  | "boka"
  | "login"
  | "hitta"
  | "behandlingar"
  | "terapeuter"
  | "sekretess";
export type TranslationGroup = "common" | Page;

export type CommonTranslations = {
  link: string;
  title: string;
  subtitle: string;
  om: string;
  artiklar: string;
  smarta: string;
  menuAria: string;
  login: string;
  logout: string;
  boka: string;
  directions: string;
  hem: string;
  create: string;
  cancel: string;
  save: string;
  heroImage: string;
  comingSoon: string;
  hitta: string;
  behandlingar: string;
  terapeuter: string;
  sekretess: string;
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
  bokaNu: string;
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
  emailError: string;
  passwordError: string;
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
};

export type TranslationsByGroup = {
  common: CommonTranslations;
  hem: HemTranslations;
  om: OmTranslations;
  artiklar: ArticleTranslations;
  boka: BokaTranslations;
  login: LogInTranslations;
  hitta: FindTranslations;
  terapeuter: TerapheutTranslations;
  sekretess: PrivacyTranslations;
  behandlingar: TreatmentsTranslations;
};

export type Translations =
  | keyof HemTranslations
  | keyof OmTranslations
  | keyof ArticleTranslations
  | keyof CommonTranslations
  | keyof BokaTranslations
  | keyof LogInTranslations
  | keyof FindTranslations
  | keyof TerapheutTranslations
  | keyof PrivacyTranslations
  | keyof TreatmentsTranslations;
