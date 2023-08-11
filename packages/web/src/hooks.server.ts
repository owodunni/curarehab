import type { Handle, HandleServerError } from "@sveltejs/kit";
import { Toucan } from "toucan-js";
import { dev } from "$app/environment";
import { PUBLIC_CMS_URL } from "$env/static/public";
import { CMS_TOKEN, SENTRY_DSN } from "$env/static/private";
import { Client, fetchExchange } from "@urql/core";

const toucan = (() => {
  let instance: Toucan | null = null;

  return () => {
    if (!instance) {
      instance = new Toucan({ dsn: SENTRY_DSN });
    }
    return instance;
  };
})();

export const handleError: HandleServerError = async ({ error, event }) => {
  console.info("Handle error", error, event);

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
    } catch (e) {
      return "";
    }
  };
  return {
    message: toMessage()
  };
};

const client = new Client({
  url: `${PUBLIC_CMS_URL}/graphql`,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`
    }
  },
  exchanges: [fetchExchange]
});

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(
    {
      ...event,
      locals: { ...event.locals, client }
    },
    {
      transformPageChunk: ({ html }) =>
        html.replace("%lang%", event.params.lang === "en" ? "en" : "sv"),
      /**
       * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
       *
       * https://github.com/sveltejs/kit/issues/8061
       */
      filterSerializedResponseHeaders(name) {
        return name === "content-range";
      }
    }
  );
};
