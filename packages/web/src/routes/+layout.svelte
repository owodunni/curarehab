<script>
  import "../app.css";
  import { page } from "$app/stores";
</script>

<slot />

<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{$page.data.title}</title>
  <meta name="description" content={$page.data.description} />
</svelte:head>
