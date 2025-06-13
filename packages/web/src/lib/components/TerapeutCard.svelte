<script lang="ts">
  import { getTitle } from '$lib/widgets/util';
  import Image from '$lib/components/Image.svelte';
  import type { T, L } from '$lib/i18n/t';
  import type { Terapeut } from '$lib/api';

  const {
    terapeut,
    t,
    l,
    class: clazz = '',
    time = '',
  }: {
    terapeut: Terapeut | null | undefined;
    t: T;
    l: L;
    class?: string;
    time?: string;
  } = $props();
</script>

<div class={`relative mt-8 flex items-center gap-x-4 ${clazz}`}>
  <Image
    class="h-10 w-10 rounded-full bg-gray-100"
    alt={terapeut?.avatar?.title || ''}
    height={64}
    srcPath={terapeut?.avatar?.filename_disk || ''}
    width={64}
  />
  <div class="text-sm leading-6">
    <p class="text-theme-muted hover:text-theme-muted-hover font-semibold">
      <a href={`${l('terapeuter')}/${terapeut?.slug}`}>
        <span class="absolute inset-0"></span>
        {terapeut?.first_name}
        {terapeut?.last_name}
      </a>
    </p>
    <p class="text-theme-muted">
      <span>{getTitle(terapeut?.work_title || '', t)}</span>
      {#if time}
        <span class="mx-1">&middot;</span>
        <time class="text-xs text-gray-500" datetime={time}>
          {new Date(time).toLocaleDateString('sv-se')}
        </time>
      {/if}
    </p>
  </div>
</div>
