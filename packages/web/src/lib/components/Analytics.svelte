<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_MEASUREMENTS_ID } from "$env/static/public";
  import type { L, T } from "$lib/i18n/t";
  import { setCookiePermissions, cookieSettings, getGtag } from "$lib/cookies";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let l: L;
  export let t: T;

  $: {
    if (browser) {
      const settings = $cookieSettings;
      if (settings.permission !== undefined) {
        getGtag()?.("consent", "default", {
          ad_storage: settings.cookiePermissions.googleAnalytics ? "granted" : "denied",
          analytics_storage: settings.cookiePermissions.googleAnalytics ? "granted" : "denied"
        });
      }
      getGtag()?.("config", PUBLIC_MEASUREMENTS_ID, {
        page_title: document.title,
        page_path: $page.url.pathname
      });
    }
  }
  let show = false;
  onMount(() => setTimeout(() => (show = true), 400));
</script>

{#if $cookieSettings.permission === undefined && show}
  <div
    class="theme-sand-dark pointer-events-none fixed inset-x-0 bottom-0 z-10 px-6 pb-6"
    out:fly={{ y: 64, duration: 300 }}
    in:fly={{ y: 64, duration: 500 }}
  >
    <div
      class="bg-sand-100 ring-skog-900/10 pointer-events-auto mx-auto max-w-xl rounded-xl p-6 shadow-lg ring-1"
    >
      <p class="text-theme-body text-sm leading-6">
        {t("common", "cookieBannerText")}
        <a href={l("cookies")} class="text-skog-700 hover:text-skog-900 font-semibold"
          >{t("common", "cookiePolicy")}</a
        >.
      </p>

      <div class="mt-4 flex items-center gap-x-6">
        <button
          type="button"
          on:click={() => {
            setCookiePermissions(true);
          }}
          class="btn variant-filled"
        >
          {t("common", "cookieBannerAcceptButton")}
        </button>
        <button
          type="button"
          on:click={() => {
            setCookiePermissions(false);
          }}
          class="btn variant-ghost"
        >
          {t("common", "cookieBannerRejectButton")}
        </button>
      </div>
    </div>
  </div>
{/if}
