import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";
import { supabaseApiKeys } from "$lib/api";

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
    { ...event, locals: { ...event.locals, supabase, getSession } },
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
