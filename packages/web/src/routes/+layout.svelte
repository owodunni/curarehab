<script lang="ts">
  import "../app.postcss";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import type { LayoutData } from "./$types";
  import type { Link } from "$lib/api";
  import Analytics from "$lib/components/Analytics.svelte";

  export let data: LayoutData;

  function toLink(link: unknown): Link | undefined {
    return isLink(link)
      ? {
          type: link.type,
          link: link.link,
          display_link: link.display_link,
        }
      : undefined;
  }

  function isLink(link: unknown): link is Link {
    if (
      typeof link === "object" &&
      link !== null &&
      "link" in link &&
      "display_link" in link &&
      "type" in link
    ) {
      const { type, display_link } = link;
      const l = link.link;
      if (typeof type !== "string" || typeof display_link !== "string" || typeof l !== "string") {
        return false;
      }
      return true;
    }
    return false;
  }

  let locale: "sv" | "en" = "sv";

  $: locale = data.params.lang === "en" ? "en" : "sv";
</script>

<Analytics l={data.l} t={data.t} />

<Header l={data.l} {locale} route={data.route} t={data.t} />
<main class="flex-grow">
  <slot></slot>
</main>
<Footer
  columnLinks={[
    data.widgets?.footer?.partners
      ?.map((a) => a?.links_id)
      ?.map(toLink)
      .filter(isLink) ?? [],
    data.widgets?.footer?.other_links
      ?.map((a) => a?.links_id)
      ?.map(toLink)
      .filter(isLink) ?? [],
  ]}
  email={toLink(data.widgets?.footer?.email)}
  l={data.l}
  {locale}
  location={toLink(data.widgets?.footer?.address)}
  location2={toLink(data.widgets?.footer?.address2)}
  phone={toLink(data.widgets?.footer?.phone)}
  socialLinks={data.widgets?.footer?.social_links
    ?.map((a) => a?.links_id)
    ?.map(toLink)
    .filter(isLink) ?? []}
  t={data.t} />
