import type { Handle } from "@sveltejs/kit";
import { PUBLIC_CMS_URL, PUBLIC_MEASUREMENTS_ID } from "$env/static/public";
import { CMS_TOKEN } from "$env/static/private";
import { Client, fetchExchange } from "@urql/core";

const client = new Client({
  url: `${PUBLIC_CMS_URL}/graphql`,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  },
  exchanges: [fetchExchange],
});

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(
    {
      ...event,
      locals: { ...event.locals, client },
    },
    {
      transformPageChunk: ({ html }) =>
        html
          .replace("%lang%", event.params.lang === "en" ? "en" : "sv")
          .replaceAll("%MEASUREMENT_ID%", PUBLIC_MEASUREMENTS_ID),
    }
  );
};
