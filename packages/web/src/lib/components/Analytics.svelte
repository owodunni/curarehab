<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_MEASUREMENTS_ID } from "$env/static/public";

  $: {
    if (typeof gtag !== "undefined") {
      /* global gtag */
      gtag("config", PUBLIC_MEASUREMENTS_ID, {
        page_title: document.title,
        page_path: $page.url.pathname
      });
    }
  }
</script>
