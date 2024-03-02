<script lang="ts">
  import type { Banner } from "$lib/api";

  export let banner: Banner;
</script>

<div
  class="bg-skog-700 text-sand-100 flex flex-1 content-center items-center justify-center gap-x-6 px-6 py-3 text-lg sm:px-3.5"
>
  <a href={banner.link.link} class="text-sm leading-6 text-white">
    <strong class="font-semibold">{banner.title}</strong><svg
      viewBox="0 0 2 2"
      class="mx-2 inline h-0.5 w-0.5 fill-current"
      aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg
    >{banner.text} <span aria-hidden="true">&rarr;</span>
  </a>
</div>
