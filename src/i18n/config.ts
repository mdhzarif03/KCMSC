import en from "./en.json";
import bn from "./bn.json";

export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = { en, bn } as const;

// Every public page should call this rather than importing the JSON
// directly, so Phase 3 can swap this for a database-backed CMS lookup
// without touching component code.
export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
