<script>
  import { page } from "$app/stores";

  $: {
    if (typeof gtag !== "undefined") {
      // eslint-disable-next-line no-undef
      gtag("config", "G-CD7YZYZYND", {
        page_title: document.title,
        page_path: $page.url.pathname
      });
    }
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-CD7YZYZYND"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag("js", new Date());
    gtag("config", "G-CD7YZYZYND");
  </script>
</svelte:head>
