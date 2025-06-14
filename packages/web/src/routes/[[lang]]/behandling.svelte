<script lang="ts">
  import ArrowPath from "$lib/components/Icons/ArrowPath.svelte";
  import Hearth from "$lib/components/Icons/Hearth.svelte";
  import Home from "$lib/components/Icons/Home.svelte";
  import Search from "$lib/components/Icons/Search.svelte";
  import type { T } from "$lib/i18n/t";

  export let t: T;
</script>

<div class="mx-auto max-w-2xl lg:text-center">
  <h2 class="text-theme-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
    {t("hem", "behandlingTitle")}
  </h2>
  <p class="text-theme-body mt-6 text-lg">
    {t("hem", "behandlingParagraph")}
  </p>
</div>
<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
  <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
    <div class="flex flex-col">
      <dt class="text-theme-heading flex items-center gap-x-3 text-base font-semibold leading-7">
        <Search class="text-tegel h-5 w-5 flex-none" stroke-width="1.7" />
        {t("hem", "behandlingUndersokningTitle")}
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          {t("hem", "behandlingUndersokningParagraph")}
        </p>
      </dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-theme-body flex items-center gap-x-3 text-base font-semibold leading-7">
        <Hearth class="text-tegel h-5 w-5 flex-none" />
        {t("hem", "behandlingBehandlingTitle")}
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          {t("hem", "behandlingBehandlingParagraph")}
        </p>
      </dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-theme-heading flex items-center gap-x-3 text-base font-semibold leading-7">
        <Home class="text-tegel h-5 w-5 flex-none" />
        {t("hem", "behandlingOvningarTitle")}
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          {t("hem", "behandlingOvningarParagraph")}
        </p>
      </dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-theme-heading flex items-center gap-x-3 text-base font-semibold leading-7">
        <ArrowPath class="text-tegel h-5 w-5 flex-none" />
        {t("hem", "behandlingUppföljningTitle")}
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          {t("hem", "behandlingUppföljningParagraph")}
        </p>
      </dd>
    </div>
  </dl>
</div>
