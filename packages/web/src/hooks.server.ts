import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle, HandleServerError } from "@sveltejs/kit";
import { supabaseApiKeys, supabaseLightClient } from "$lib/api";
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

export const handle: Handle = async ({ event, resolve }) => {
  const supabase = createSupabaseServerClient({
    ...supabaseApiKeys(),
    event
  });

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  const getSession = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  };

  return resolve(
    { ...event, locals: { ...event.locals, supabase: supabaseLightClient(supabase), getSession } },
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
