export type NamedPlaceholder = { [key: string]: string };
export type Config<Category extends string, Locale extends string> = {
  loader: (locale: Locale, category: Category) => Promise<Record<string, string>>;
};
export type LoadedTranslations<Category extends string, Key extends string> = Partial<
  Record<Category, Record<Key, string>>
>;

export type TranslationLoader<
  Category extends string,
  Key extends string,
  Locale extends string
> = {
  loadCategories: (
    categories: Category[],
    locale: Locale
  ) => Promise<LoadedTranslations<Category, Key>>;
};

export type Translator<C extends string, K extends string> = {
  t: (category: C, key: K, placeholder?: NamedPlaceholder) => string;
};

export type TranslatorFactory = <
  Category extends string,
  Key extends string,
  Locale extends string
>(
  config: Config<Category, Locale>
) => TranslationLoader<Category, Key, Locale>;
