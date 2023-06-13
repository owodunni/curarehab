<script lang="ts">
  import { getAsset, getTitle } from "$lib/widgets/util";
  import type { T, L } from "$lib/i18n/t";
  import type { Terapeut } from "$lib/api";

  export let terapeut: Terapeut | null | undefined;
  export let t: T;
  export let l: L;
  let clazz = "";
  export { clazz as class };
  export let time = "";
</script>

<div class={`relative mt-8 flex items-center gap-x-4 ${clazz}`}>
  <img
    src={getAsset(terapeut?.avatar?.filename_disk, "height=64&width=64")}
    alt={terapeut?.avatar?.title}
    loading="lazy"
    width="64"
    height="64"
    class="bg-tertiary-100 h-10 w-10 rounded-full"
  />
  <div class="text-sm leading-6">
    <p class="text-tertiary-900 font-semibold">
      <a href={`${l("terapeuter")}/${terapeut?.slug}`}>
        <span class="absolute inset-0" />
        {terapeut?.first_name}
        {terapeut?.last_name}
      </a>
    </p>
    <p class="text-tertiary-600">
      <span>{getTitle(terapeut?.work_title || "", t)}</span>
      {#if time}
        <span class="mx-1">&middot;</span>
        <time datetime={time} class="text-tertiary-500 text-xs">
          {new Date(time).toLocaleDateString("sv-se")}
        </time>
      {/if}
    </p>
  </div>
</div>
