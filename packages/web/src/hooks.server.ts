import { sequence } from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import type { Handle } from "@sveltejs/kit";
import { PUBLIC_CMS_URL, PUBLIC_MEASUREMENTS_ID } from "$env/static/public";
import { CMS_TOKEN } from "$env/static/private";
import { Client, fetchExchange } from "@urql/core";

Sentry.init({
  dsn: "https://90483a7b8bc7e5ba40788d37ce4c5800@o4504931376758784.ingest.us.sentry.io/4509536456867840",
});

const client = new Client({
  url: `${PUBLIC_CMS_URL}/graphql`,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  },
  exchanges: [fetchExchange],
});

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
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
});
export const handleError = Sentry.handleErrorWithSentry();
