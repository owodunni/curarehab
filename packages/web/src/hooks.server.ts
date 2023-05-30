import type { HandleServerError } from "@sveltejs/kit";
import { sentry } from "$lib/sentry";
import { Toucan } from "toucan-js";
import { dev } from "$app/environment";

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
