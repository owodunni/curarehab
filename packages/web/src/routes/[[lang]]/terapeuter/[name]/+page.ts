import type { DbError, Terapheut } from "@curarehab/api";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { marked } from "marked";

export const load: PageLoad = async (event) => {
  const terapheut = (await (
    await event.fetch(`/api/terapeuter/${event.params.name}?name`)
  ).json()) as Terapheut | DbError;

  if ("message" in terapheut) {
    throw error(404, "Terapheut not found");
  }

  if (event.params.lang === "en") {
    terapheut.profile_text_en = marked.parse(terapheut.profile_text_en);
  }
  terapheut.profile_text = marked.parse(terapheut.profile_text);

  return {
    terapheut,
    lang: event.params.lang
  };
};
