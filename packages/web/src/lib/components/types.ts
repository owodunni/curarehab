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

export function userGuard(u: unknown): u is User {
  return !!u;
}

export type User = {
  directus_users_id?:
    | {
        avatar?:
          | {
              title?: string | undefined | null;
              filename_disk?: string | undefined | null;
            }
          | undefined
          | null;
        slug?: string | undefined | null;
        first_name?: string | undefined | null;
        last_name?: string | undefined | null;
        work_title?: string | undefined | null;
        profil_sammanfattning_en?: string | undefined | null;
        profil_sammanfattning?: string | undefined | null;
        kliniker?: Array<{
          Kliniker_list_id?: { __typename?: "Kliniker_list"; slug?: string | null } | null;
        } | null> | null;
      }
    | undefined
    | null;
};

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
