import { writable, derived, get } from "svelte/store";
import type { Config, NamedPlaceholder, Translator, TranslatorFactory } from "./types";
export type { Config, NamedPlaceholder };

export const createTranslator: TranslatorFactory = <F extends string, L extends string>(
  config: Config<F, L>
) => {
  const translations = writable<Partial<Record<F, Record<string, string>>>>({});

  function mreplace(replacements: NamedPlaceholder, str: string) {
    let result = str;
    for (const [x, y] of Object.entries(replacements)) result = result.replace(`{${x}}`, y);
    return result;
  }

  const t = derived(translations, (t) => {
    return (file: F, key: string, placeholder?: NamedPlaceholder) => {
      const _t = t[file];
      if (_t) {
        const str = _t[key];
        if (!str) throw new Error(`Translation key ${key} not found in ${file}.`);
        else if (placeholder) return mreplace(placeholder, str);
        else return str;
      }
      throw new Error(`Translation file ${file} not loaded.`);
    };
  });

  const a: Translator<F, L> = {
    t,
    loadCategories: async (categories, locale) => {
      const _t = get(translations);
      await Promise.all(
        categories.map(async (name) => (_t[name] = await config.loader(locale, name)))
      );
      translations.set(_t);
    }
  };
  return a;
};
