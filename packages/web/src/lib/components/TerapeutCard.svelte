<script lang="ts">
  import { getTitle } from "$lib/widgets/util";
  import Image from "$lib/components/Image.svelte";
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
  <Image
    srcPath={terapeut?.avatar?.filename_disk || ""}
    alt={terapeut?.avatar?.title || ""}
    width={64}
    height={64}
    class="h-10 w-10 rounded-full bg-gray-100"
  />
  <div class="text-sm leading-6">
    <p class="text-theme-muted hover:text-theme-muted-hover font-semibold">
      <a href={`${l("terapeuter")}/${terapeut?.slug}`}>
        <span class="absolute inset-0" />
        {terapeut?.first_name}
        {terapeut?.last_name}
      </a>
    </p>
    <p class="text-theme-muted">
      <span>{getTitle(terapeut?.work_title || "", t)}</span>
      {#if time}
        <span class="mx-1">&middot;</span>
        <time datetime={time} class="text-xs text-gray-500">
          {new Date(time).toLocaleDateString("sv-se")}
        </time>
      {/if}
    </p>
  </div>
</div>
