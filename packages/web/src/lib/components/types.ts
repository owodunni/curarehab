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

export interface ClinicData {
  slug?: string | null | undefined;
  klinik_page?:
    | {
        title?: string | null | undefined;
        title_en?: string | null | undefined;
        description?: string | null | undefined;
        description_en?: string | null | undefined;
        omslagsbild?:
          | {
              title?: string | null | undefined;
              filename_disk?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
}
