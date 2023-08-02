<script lang="ts">
  import type { Page } from "$lib/i18n";
  import type { T, L } from "$lib/i18n/t";

  export let status: number;
  export let page: Page;
  export let placeholders: { page: string; resource: string; backTo: string };
  export let l: L;
  export let t: T;
</script>

<main
  class="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8"
>
  <p class="text-primary-500 text-base font-semibold leading-8">{status}</p>
  <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
    {t("common", "errorTitle", { page: placeholders.page })}
  </h1>
  <p class="mt-6 text-base leading-7 text-gray-600">
    {t("common", "errorSubtitle", { resource: placeholders.resource })}
  </p>
  <div class="mt-10">
    <a href={l(page)} class="text-primary-500 text-sm font-semibold leading-6"
      ><span aria-hidden="true">&larr;</span>
      {t("common", "errorHome", { backTo: placeholders.backTo })}</a
    >
  </div>
</main>
