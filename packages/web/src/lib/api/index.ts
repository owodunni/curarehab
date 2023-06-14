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
  title?: string | null;
  slug?: string | null;
  omslagsbild?: {
    title?: string | null;
    filename_disk?: string | null;
  } | null;
  date_updated?: string | null;
  date_created?: string | null;
  user_created?: Terapeut | null;
};

export type SeoMetaData = {
  title?: string | null;
  description?: string | null;
  image?: Image | null;
};
