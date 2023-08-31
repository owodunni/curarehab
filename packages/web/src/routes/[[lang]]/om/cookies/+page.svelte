<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  import ToggleButton from "$lib/components/ToggleButton.svelte";
  import { cookieSettings, type CookiePermissions, updateCookiePermissions } from "$lib/cookies";
  export let data: PageData;
  $: ({ t } = data);

  let cookies: CookiePermissions = { googleAds: false, googleAnalytics: false };
  $: cookies =
    $cookieSettings.permission !== undefined ? $cookieSettings.cookiePermissions : cookies;
</script>

<TextPage data={data?.data?.cookies} {t}>
  <div class="prose mt-6 flex flex-col">
    <h3>{t("cookies", "cookiePreferences")}</h3>
    <div class="justify-betwee flex items-center">
      <div class="flex flex-grow flex-col">
        <h4>{t("cookies", "statistics")}</h4>
        <p>
          {t("cookies", "statisticsDescription")}
        </p>
      </div>
      <ToggleButton
        checked={cookies.googleAnalytics}
        on:toggle={(value) =>
          updateCookiePermissions({ ...cookies, googleAnalytics: value.detail.toggle })}
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-grow flex-col">
        <h4>
          {t("cookies", "marketing")}
        </h4>
        <p>
          {t("cookies", "marketingDescription")}
        </p>
      </div>
      <ToggleButton
        checked={cookies.googleAds}
        on:toggle={(value) =>
          updateCookiePermissions({ ...cookies, googleAds: value.detail.toggle })}
      />
    </div>
  </div>
</TextPage>
