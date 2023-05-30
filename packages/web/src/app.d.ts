// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { LoadedTranslations } from "@curarehab/i18n";
import type { TranslationGroup, Translations } from "$lin/i18n";

declare global {
  namespace App {
    //interface Locals {}
    interface PageData {
      translations: LoadedTranslations<TranslationGroup, Translations>;
    }
    // interface Error {}
    // interface Platform {}
  }
}
