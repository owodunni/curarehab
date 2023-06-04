import type { Handle, HandleServerError } from "@sveltejs/kit";
import { sentry } from "$lib/sentry";
import { Toucan } from "toucan-js";
import { dev } from "$app/environment";
import { PUBLIC_CMS_URL } from "$env/static/public";
import { Client, cacheExchange, fetchExchange } from "@urql/core";

const toucan = new Toucan({
  dsn: sentry.dsn
});

export const handleError: HandleServerError = async ({ error, event }) => {
  console.info("Handle error", error, event);

  if (!dev) toucan.captureException(error, { data: { svelteKit: { event } } });

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
  exchanges: [cacheExchange, fetchExchange]
});

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(
    {
      ...event,
      locals: { ...event.locals, client }
    },
    {
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
