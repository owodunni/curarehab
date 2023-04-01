import type { Readable } from "svelte/store";

export type NamedPlaceholder = { [key: string]: string };
export type Config<C extends string, L extends string> = {
  loader: (locale: L, category: C) => Promise<Record<string, string>>;
};

export type Translator<C extends string, L extends string> = {
  /**
   * t returns a store that can be used to get the translated string.
   */
  t: Readable<(category: C, key: string, placeholder?: NamedPlaceholder) => string>;
  /**
   * loadCategories loads an array of translation categories.
   */
  loadCategories: (categories: C[], locale: L) => Promise<void>;
};

export type TranslatorFactory = <C extends string, L extends string>(
  config: Config<C, L>
) => Translator<C, L>;
