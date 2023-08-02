<script lang="ts">
  import "../app.postcss";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import type { LayoutData } from "./$types";
  import type { Link } from "$lib/api";

  export let data: LayoutData;

  function toLink(link: unknown): Link | undefined {
    return isLink(link)
      ? {
          type: link.type,
          link: link.link,
          display_link: link.display_link
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
</script>

<Header t={data.t} l={data.l} locale={data.params.lang === "en" ? "en" : "sv"} route={data.route} />
<main>
  <slot />
</main>
<Footer
  t={data.t}
  l={data.l}
  email={toLink(data.widgets?.footer?.email)}
  phone={toLink(data.widgets?.footer?.phone)}
  location={toLink(data.widgets?.footer?.address)}
  socialLinks={data.widgets?.footer?.social_links
    ?.map((a) => a?.links_id)
    ?.map(toLink)
    .filter(isLink) ?? []}
  columnLinks={[
    data.widgets?.footer?.partners
      ?.map((a) => a?.links_id)
      ?.map(toLink)
      .filter(isLink) ?? [],
    data.widgets?.footer?.other_links
      ?.map((a) => a?.links_id)
      ?.map(toLink)
      .filter(isLink) ?? []
  ]}
/>
