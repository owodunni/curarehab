import { PUBLIC_ASSETS_URL } from "$env/static/public";
import type { T } from "$lib/i18n/t";

export const getTitle = (title: string | undefined, t: T) => {
  const _t = title?.toLowerCase();
  return t(
    "common",
    _t === "naprapat" ? "titleNaprapat" : _t === "fyisoterapeut" ? "titleFysio" : "titleWeb"
  );
};

export function getAsset(id: string | null | undefined, query?: string): string {
  if (!id) return "";
  return `${PUBLIC_ASSETS_URL}/assets/${id}${query ? `?${query}&format=auto` : "?format=auto"}`;
}
