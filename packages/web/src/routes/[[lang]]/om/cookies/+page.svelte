<script lang="ts">
  import type { PageData } from './$types';
  import TextPage from '$lib/components/TextPage.svelte';
  import ToggleButton from '$lib/components/ToggleButton.svelte';
  import { cookieSettings, type CookiePermissions, updateCookiePermissions } from '$lib/cookies';
  let { data }: { data: PageData } = $props();
  let { t } = $derived(data);

  let cookies = $derived<CookiePermissions>(
    $cookieSettings.permission !== undefined
      ? $cookieSettings.cookiePermissions
      : { googleAds: false, googleAnalytics: false }
  );
</script>

<TextPage data={data?.data?.cookies} {t}>
  <div class="prose mt-6 flex flex-col">
    <h3>{t('cookies', 'cookiePreferences')}</h3>
    <div class="justify-betwee flex items-center">
      <div class="flex flex-grow flex-col">
        <h4>{t('cookies', 'statistics')}</h4>
        <p>
          {t('cookies', 'statisticsDescription')}
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
          {t('cookies', 'marketing')}
        </h4>
        <p>
          {t('cookies', 'marketingDescription')}
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
