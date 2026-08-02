/** Supported locales — edit copy under src/content/ */
export type Locale = "no" | "en";

/** Section copy shape: one object per language */
export type Localized<T> = Record<Locale, T>;
