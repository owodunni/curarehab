import type { Handle, HandleServerError } from "@sveltejs/kit";
import { Toucan } from "toucan-js";
import { dev } from "$app/environment";
import { PUBLIC_CMS_URL, PUBLIC_MEASUREMENTS_ID } from "$env/static/public";
import { CMS_TOKEN } from "$env/static/private";
import { Client, fetchExchange } from "@urql/core";

const toucan = (() => {
  let instance: Toucan | null = null;

  return () => {
    if (!instance) {
      instance = new Toucan({
        dsn: "https://90483a7b8bc7e5ba40788d37ce4c5800@o4504931376758784.ingest.de.sentry.io/4509536456867840",
      });
    }
    return instance;
  };
})();

export const handleError: HandleServerError = async ({ error, event }) => {
  // eslint-disable-next-line no-console
  console.error(error, event);
  if (!dev) toucan().captureException(error, { data: { svelteKit: { event } } });

  const toMessage = (): string => {
    const message =
      typeof error === "string"
        ? error
        : error && typeof error === "object"
          ? "message" in error
            ? error.message
            : ""
          : "";
    try {
      return typeof message === "string" ? message : JSON.stringify(message);
    } catch {
      return "";
    }
  };
  return {
    message: toMessage(),
  };
};

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
