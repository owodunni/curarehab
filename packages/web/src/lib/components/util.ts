import type { L, T } from "$lib/i18n/t";
import { getTitle } from "$lib/widgets/util";
import type { ImageWithClinicSlug, User } from "./types";

export const userToImageType = (
  users: (User | undefined | null)[] | undefined | null,
  t: T,
  l: L
): ImageWithClinicSlug[] =>
  (users || [])
    .filter((u): u is User => !!u)
    .map(({ directus_users_id: user }) => ({
      href: `${l("terapeuter")}/${user?.slug}`,
      alt: user?.avatar?.title || "",
      srcPath: user?.avatar?.filename_disk || "",
      title: `${user?.first_name} ${user?.last_name}`,
      subTitle: getTitle(user?.work_title || "", t),
      clinicSlug: user?.kliniker?.map((clinic) => clinic?.Kliniker_list_id?.slug || "") || [],
    }));
