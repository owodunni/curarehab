import type {
  OmTranslations,
  CommonTranslations,
  HemTranslations,
  BlogTranslations,
  BokaTranslations,
  LogInTranslations,
  TranslationsByGroup,
  ProfileTranslations
} from "../types";

export const common: CommonTranslations = {
  link: "{{link}}",
  title: "CuraRehab",
  subtitle: "Smärtfri rehab",
  om: "Om oss",
  blog: "Blog",
  smarta: "Smärta",
  menuAria: "Växla navigationsmenyn",
  login: "Logga in",
  boka: "Boka nu",
  directions: "Klicka här för att se hur du kommer till oss.",
  hem: "Hem",
  profile: "Profil"
};

export const hem: HemTranslations = {
  title: "Cura Rehab",
  description: "En hemsida för Cura Rehab",
  titleParagraph: "Bli av med smärta och rehabilitera skador",
  subtitleParagraph:
    "Har du ont i ryggen, nacken eller lederna? Vi på CuraRehab kan hjälpa dig. Vi använder en kombination av naprapati och fysioterapi för att behandla smärta och rehabilitera skador. Boka din tid idag och ta det första steget mot ett smärtfritt liv!",
  readMore: "Läs mer",
  boka: "Boka din tid",
  heroImage: "Äldre man rehabiliterar sin rygg",
  naprapathyTitle: "Naprapati - Smärtlindring för muskler och leder",
  naprapathyParagraph:
    "Våra naprapater använder manuella tekniker och träning för att lindra smärta och öka rörligheten i muskler och leder.",
  physiotherapyTitle: "Fysioterapi - Återställer rörlighet och förbättrar funktion",
  physiotherapyParagraph:
    "Våra fysioterapeuter använder manuell terapi och andra tekniker för att återställa rörligheten och förbättra funktionen i kroppen.",
  massageTitle: "Massage - Avkoppling och återhämtning för kropp och själ",
  massageParagraph:
    "Våra massageterapeuter använder olika tekniker för att lindra muskelspänningar, öka blodcirkulationen och förbättra rörligheten, samtidigt som du kan koppla av och återhämta dig.",
  mainTreatmentTitle: "Våra behandlingar - Skräddarsydda för din hälsa och återhämtning",
  mainTreatmentParagraph:
    "På CuraRehab erbjuder vi en rad olika behandlingar. Våra kvalificerade terapeuter arbetar tillsammans för att utveckla en skräddarsydd behandlingsplan som passar dina specifika behov och mål för att hjälpa dig att återhämta dig och återfå din hälsa."
};

export const om: OmTranslations = {
  title: "Om",
  description: "Om Cura Rehab"
};

export const blog: BlogTranslations = {
  title: "Blog",
  description: "Bloggartiklar om rehab, smärta och mer"
};

export const boka: BokaTranslations = {
  title: "Boka",
  description: "Boka en tid hos oss"
};

export const login: LogInTranslations = {
  title: "Loga in",
  description: "Loga in till din konto",
  password: "Lösenord",
  email: "E-post address",
  signUp: "Skapa konto"
};

const profile: ProfileTranslations = {
  title: "Din sida",
  description: "Din sida",
  welcome: "Välkommen {{name}}!",
  logOut: "Logga ut"
};

export const translations: TranslationsByGroup = {
  common,
  hem,
  om,
  blog,
  boka,
  login,
  profile
};
