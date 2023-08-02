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
  return `${PUBLIC_ASSETS_URL}/assets/${id}${
    query ? `?${query}&quality=0.8&format=auto` : "?quality=0.8&format=auto"
  }`;
}

export function getAsset2(
  id: string,
  {
    width,
    height,
    quality,
    format
  }: { width: number; height: number; quality: number; format: "png" | "jpg" | "avif" | "webp" }
): string {
  if (!id) return "";
  return `${PUBLIC_ASSETS_URL}${
    id.includes("/assets") ? "" : "/assets"
  }/${id}?width=${width}&height=${height}&quality=${quality}&format=${format}`;
}
