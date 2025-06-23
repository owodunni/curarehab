import type { L, T } from "$lib/i18n/t";
import { getTitle } from "$lib/widgets/util";
import type { ImageWithClinicSlug } from "./types";

type User = {
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
        kliniker?: Array<{
          Kliniker_list_id?: { __typename?: "Kliniker_list"; slug?: string | null } | null;
        } | null> | null;
      }
    | undefined
    | null;
};

export const userToImageType = (users: User[] | undefined, t: T, l: L): ImageWithClinicSlug[] =>
  (users || []).map(({ directus_users_id: user }) => ({
    href: `${l("terapeuter")}/${user?.slug}`,
    alt: user?.avatar?.title || "",
    srcPath: user?.avatar?.filename_disk || "",
    title: `${user?.first_name} ${user?.last_name}`,
    subTitle: getTitle(user?.work_title || "", t),
    clinicSlug: user?.kliniker?.map((clinic) => clinic?.Kliniker_list_id?.slug || "") || [],
  }));
