import type { NamedPlaceholder, LoadedTranslations, Translator } from "./types";

export function createTranslator<Category extends string, Key extends string>(
  translations: LoadedTranslations<Category, Key>
): Translator<Category, Key> {
  /**
   * Replaces placeholders in a string with the values provided.
   */
  function mreplace(replacements: NamedPlaceholder, str: string) {
    let result = str;
    for (const [x, y] of Object.entries(replacements)) result = result.replace(`{${x}}`, y);
    return result;
  }

  return {
    t: (category: Category, key: Key, placeholder?: NamedPlaceholder) => {
      const _t = translations[category];
      if (_t) {
        const str = _t[key];
        if (!str) throw new Error(`Translation key ${key} not found in ${category}.`);
        else if (placeholder) return mreplace(placeholder, str);
        else return str;
      }
      throw new Error(`Translation file ${category} not loaded.`);
    }
  };
}
