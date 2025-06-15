import type { Link } from "$lib/api";
import type { PageServerLoad } from "./$types";
import type { BokaPageQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const result = await event.locals.client.query<BokaPageQuery>(query, []).toPromise();

  // Transform the clinic data to match ImageList component expectations
  const clinicImages = (result.data?.Kliniker_list || [])
    .map((clinic) => ({
      alt: clinic?.klinik_page?.title || clinic?.slug || "",
      srcPath: clinic?.klinik_page?.omslagsbild?.filename_disk || "",
      title: clinic?.klinik_page?.title || clinic?.slug || "",
      subTitle: clinic?.klinik_page?.description || "",
      href: `/kliniker/${clinic?.slug}`,
    }))
    .filter((clinic) => clinic.srcPath); // Only include clinics with images

  // Transform the boka page data to match TextPage component expectations
  const bokaPageData = result.data?.boka?.boka;
  const transformedBokaPage = bokaPageData
    ? {
        ...bokaPageData,
        image: bokaPageData.omslagsbild, // TextPage expects 'image' field
        links:
          bokaPageData.links?.map((link) => link?.links_id).filter((l): l is Link => !!l) || [],
      }
    : null;

  return {
    ...result,
    bokaPage: transformedBokaPage,
    clinicImages,
  };
};
