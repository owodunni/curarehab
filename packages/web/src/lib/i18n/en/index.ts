import type {
  OmTranslations,
  CommonTranslations,
  HemTranslations,
  BlogTranslations,
  BokaTranslations,
  LogInTranslations,
  TranslationsByGroup,
  AdminTranslations
} from "../types";

export const common: CommonTranslations = {
  link: "/en{{link}}",
  title: "CuraRehab",
  subtitle: "Pain-free rehab",
  om: "About us",
  blog: "Blog",
  smarta: "Pain",
  menuAria: "Toggle site navigation",
  login: "Log in",
  boka: "Book",
  directions: "Click here to see how to get to us.",
  hem: "Home",
  admin: "Admin",
  create: "Create article",
  cancel: "Cancel",
  save: "Save"
};

export const hem: HemTranslations = {
  title: "Cura Rehab",
  description: "A website for Cura Rehab",
  titleParagraph: "Get rid of pain and rehabilitate injuries",
  subtitleParagraph:
    "Do you have back, neck, or joint pain? We at CuraRehab can help. We use a combination of naprapathy and physiotherapy to treat pain and rehabilitate injuries. Book your appointment today and take the first step towards a pain-free life!",
  readMore: "Read more",
  boka: "Book your appointment",
  heroImage: "Old man rehabinating his back",
  naprapathyTitle: "Naprapathy - Pain relief for muscles and joints",
  naprapathyParagraph:
    "Our naprapaths use manual techniques and exercise to relieve pain and increase mobility in muscles and joints.",
  physiotherapyTitle: "Physiotherapy - Restores mobility and improves function",
  physiotherapyParagraph:
    "Our physiotherapists use manual therapy and other techniques to restore mobility and improve function in the body.",
  massageTitle: "Massage - Relaxation and recovery for body and mind",
  massageParagraph:
    "Our massage therapists use various techniques to relieve muscle tension, increase blood circulation, and improve mobility, while you can relax and recover.",
  mainTreatmentTitle: "Our Treatments - Tailored for Your Health and Recovery",
  mainTreatmentParagraph:
    "At CuraRehab, we offer a range of different treatments. Our qualified therapists work together to develop a tailored treatment plan that suits your specific needs and goals to help you recover and regain your health."
};

export const om: OmTranslations = {
  title: "About",
  description: "About Cura Rehab"
};

export const blog: BlogTranslations = {
  title: "Blog",
  description: "Blog articles about rehab, pain and more"
};

export const boka: BokaTranslations = {
  title: "Book",
  description: "Book an appointment with us"
};

export const login: LogInTranslations = {
  title: "Log in",
  description: "Log in to your account",
  password: "Password",
  email: "Email address",
  signUp: "Sign up"
};

const admin: AdminTranslations = {
  title: "Admin page",
  description: "Your profile",
  welcome: "Welcome {{name}}!",
  logOut: "Log out",
  blogPosts: "Blog posts",
  tableTitle: "Title",
  tableSlug: "Slug",
  tableExcerpt: "Excerpt",
  tableDescription: "List of blog posts",
  tableParent: "Parent",
  newBlogPost: "New article"
};

export const translations: TranslationsByGroup = {
  common,
  hem,
  om,
  blog,
  boka,
  login,
  admin
};
