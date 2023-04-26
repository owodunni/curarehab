import { supabaseApiKeys, supabaseLightClient, type Database } from "@curarehab/api";
import { defaultLocale, loadTranslations, locales, type Route } from "$lib/i18n";
import type { Locale } from "$lib/i18n/types";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (event) => {
  const { pathname } = event.url;
  const { lang } = event.params;

  const localeExists = locales.find((l) => l === lang);
  if (lang && !localeExists) throw error(404, "Not found");

  const locale: Locale = localeExists || defaultLocale;
  const route = ((): string => {
    if (!lang) return pathname;
    else if (pathname === `/${lang}`) return "/";
    else return pathname.replace(`/${lang}`, "");
  })();

  if (localeExists === defaultLocale) throw redirect(308, route);

  await loadTranslations(locale, route as Route);

  // What does this line do?
  event.depends("supabase:auth");

  const supabase = createSupabaseLoadClient<Database>({
    ...supabaseApiKeys(),
    event: { fetch },
    serverSession: event.data.session
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return { ...event.data, supabase: supabaseLightClient(supabase), session };
};
