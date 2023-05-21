import type { TerapheutMetaData } from "@curarehab/api";
import type { PageLoad } from "./$types";
import { marked } from "marked";

export const load: PageLoad = async (event) => {
  const terapheuts = (await (await event.fetch(`/api/terapeuter`)).json()) as TerapheutMetaData[];

  return {
    terapheuts: terapheuts.map((t) => {
      if (event.params.lang === "en") {
        t.profile_excerpt_en = marked.parse(t.profile_excerpt_en);
      } else {
        t.profile_excerpt = marked.parse(t.profile_excerpt);
      }
      return t as TerapheutMetaData;
    }),
    lang: event.params.lang ?? "sv"
  };
};
