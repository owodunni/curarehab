// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { LoadedTranslations } from "@curarehab/i18n";
import type { TranslationGroup, Translations } from "$lin/i18n";
import type { SupabaseLightClient, Session } from "@curarehab/api";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseLightClient;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      translations: LoadedTranslations<TranslationGroup, Translations>;
      session: Session | null;
    }
    // interface Error {}
    // interface Platform {}
  }
}
