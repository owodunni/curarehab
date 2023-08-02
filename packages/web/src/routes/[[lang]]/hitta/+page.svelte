<script lang="ts">
  import type { PageData } from "./$types";
  import Seo from "$lib/components/Seo.svelte";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  //import SocialLink from "$lib/components/SocialLink.svelte";
  // import type { Link } from "$lib/api";
  export let data: PageData;
  let lang = data.params.lang;
  let hitta = data?.data?.hitta ?? undefined;
  $: hitta = data?.data?.hitta ?? undefined;
  $: lang = data.params.lang;
  //$: links = (hitta?.links?.links_id || []).filter(Boolean) as Link[];
</script>

{#if hitta}
  <Seo seo={lang === "en" ? hitta.seo : hitta.seo_en} />

  <Section>
    <Container>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div>
          <iframe
            title="map"
            class="h-96 w-full lg:h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2089.998104473312!2d15.619948099670486!3d58.41029210761383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46596fea219e43e3%3A0xc1e59a8518bd515c!2sCuraRehab%20Link%C3%B6ping!5e0!3m2!1ssv!2sse!4v1690967042446!5m2!1ssv!2sse"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <!--ul class="border-1 mt-8 flex flex-col space-y-4 border-t pt-8">
            {#each links as link}
              <SocialLink
                {link}
                onlyIcon={false}
                class="text-skog-700 hover:text-skog-900 flex gap-x-4 text-sm leading-6"
              />
            {/each}
          </ul-->
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
