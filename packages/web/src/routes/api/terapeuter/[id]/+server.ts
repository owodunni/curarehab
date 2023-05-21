import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

/**
 * Wrap supabase API endpoint in a GET request
 */
export const GET: RequestHandler = async (event) => {
  const supabase = event.locals.supabase;

  const { id } = event.params;
  const name = event.url.searchParams.get("name");

  const terapheut = await supabase.getTerapheut(id, name !== null ? "name" : "id");

  if ("code" in terapheut) {
    return json(terapheut, {
      status: terapheut.code
    });
  }

  return json(terapheut);
};
