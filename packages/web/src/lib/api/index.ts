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
  | "webpage"
  | "tiktok"
  | "location";

export type Link = {
  type: LinkType;
  link: string;
  display_link: string;
};

export type Image = {
  title?: string | null;
  filename_disk?: string | null;
};

export type Terapeut = {
  first_name?: string | null;
  last_name?: string | null;
  work_title?: string | null;
  slug?: string | null;
  avatar?: Image | null;
};

export type Article = {
  date_updated?: string | null;
  date_created?: string | null;
  user_created?: Terapeut | null;
  language?: string | null;
  status?: string | null;
  sammanfattning?: string | null;
  slug?: string | null;
  title?: string | null;
  omslagsbild?: {
    title?: string | null;
    type?: string | null;
    width?: number | null;
    height?: number | null;
    filename_disk?: string | null;
  } | null;
};

export type Treatment = {
  Slug?: string | null;
  bild?: {
    title?: string | null;
    filename_disk?: string | null;
  } | null;
  Primary_treatment?: string | null;
  pris?: number | null;
};

export type SeoMetaData = {
  title?: string | null;
  description?: string | null;
  link_photo?: Image | null;
};
