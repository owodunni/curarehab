import { sentry } from "$lib/sentry";
import {
  init as SentryInit,
  setTag as SentrySetTag,
  captureException as SentryCaptureException
} from "@sentry/svelte";
import { BrowserTracing } from "@sentry/svelte";
import type { HandleClientError } from "@sveltejs/kit";

SentryInit({
  dsn: sentry.dsn,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0
});

SentrySetTag("svelteKit", "client");

export const handleError: HandleClientError = async ({ error, event }) => {
  console.info("Handle error", error, event);
  SentryCaptureException(error, { contexts: { svelteKit: { event } } });
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
