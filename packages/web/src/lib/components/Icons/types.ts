export type LinkType =
  | "facebook"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "twitter"
  | "github"
  | "email"
  | "phone"
  | "website"
  | "location";

export type Link = {
  type: LinkType;
  link: string;
  display_link: string;
};
