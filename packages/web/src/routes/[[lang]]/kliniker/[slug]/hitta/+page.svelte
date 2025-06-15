<script lang="ts">
  import type { Link } from "$lib/api/index.js";
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import SocialLink from "$lib/components/SocialLink.svelte";

  const { data } = $props();
  const { localized } = $derived(data);
  const hitta = $derived(data.clinic);
</script>

<Seo seo={localized(hitta?.seo, hitta?.seo_en)} />

<Section>
  <Container>
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pt-20">
        <iframe
          class="h-80 w-full sm:h-96 lg:h-[424px]"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          src={hitta.location?.link}
          title="map"></iframe>
        <ul class="border-1 mt-8 flex flex-col space-y-4 border-t pt-8">
          {#each hitta?.links || [] as link (link?.links_id?.link)}
            {#if link?.links_id}
              <SocialLink
                class="text-skog-700 hover:text-skog-900 flex gap-x-4 text-sm leading-6"
                link={link.links_id as Link}
                onlyIcon={false} />
            {/if}
          {/each}
        </ul>
      </div>
      <div>
        <div class="prose text-theme-body text-base leading-7">
          <BlocksRender blocks={localized(hitta.text, hitta.text_en)?.blocks || []} />
        </div>
      </div>
    </div>
  </Container>
</Section>
