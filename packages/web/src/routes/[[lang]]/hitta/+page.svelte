<script lang="ts">
  import type { PageData } from "./$types";
  import Seo from "$lib/components/Seo.svelte";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import SocialLink from "$lib/components/SocialLink.svelte";
  import type { Link } from "$lib/api";
  const { data }: { data: PageData } = $props();
  const lang = $derived(data.params.lang);
  const hitta = $derived(data?.data?.hitta ?? undefined);
  const links = $derived(
    (hitta?.social_links || []).filter(Boolean).map((l) => l?.links_id) as Link[]
  );
</script>

{#if hitta}
  <Seo seo={lang === "en" ? hitta.seo_en : hitta.seo} />

  <Section>
    <Container>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="lg:pt-20">
          <iframe
            class="h-80 w-full sm:h-96 lg:h-[424px]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2089.998104473312!2d15.619948099670486!3d58.41029210761383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46596fea219e43e3%3A0xc1e59a8518bd515c!2sCuraRehab%20Link%C3%B6ping!5e0!3m2!1ssv!2sse!4v1690967042446!5m2!1ssv!2sse"
            title="map"></iframe>
          <ul class="border-1 mt-8 flex flex-col space-y-4 border-t pt-8">
            {#each links as link (link.link)}
              <SocialLink
                class="text-skog-700 hover:text-skog-900 flex gap-x-4 text-sm leading-6"
                {link}
                onlyIcon={false} />
            {/each}
          </ul>
        </div>
        <div>
          <div class="prose text-theme-body text-base leading-7">
            <BlocksRender blocks={(lang === "en" ? hitta.text_en : hitta.text)?.blocks || []} />
          </div>
        </div>
      </div>
    </Container>
  </Section>
{/if}
