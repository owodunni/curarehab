import type { T } from "$lib/i18n/t";

export const getTitle = (title: string | undefined, t: T) => {
  const _t = title?.toLowerCase();
  return t(
    "common",
    _t === "naprapat" ? "titleNaprapat" : _t === "fysioterapeut" ? "titleFysio" : "titleWeb"
  );
};

export function getAsset(id: string | undefined, query?: string): string {
  if (!id) return "";
  return `https://jardoole.xyz/assets/${id}${query ? `?${query}` : ""}`;
}
