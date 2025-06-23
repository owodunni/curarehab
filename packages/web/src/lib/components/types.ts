/**
 * Utility type for merging component props with HTML element attributes
 * while ensuring component props take precedence
 */
export type ComponentProps<T extends object, HTMLAttrs extends object> = T &
  Omit<HTMLAttrs, keyof T>;

export type ImageType = {
  alt: string;
  srcPath: string;
  title: string;
  subTitle: string;
  href: string;
};

export type ImageWithClinicSlug = {
  clinicSlug: string[];
} & ImageType;
