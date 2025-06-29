<script lang="ts">
  import type { PageData } from "./$types";
  import Seo from "$lib/components/Seo.svelte";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import ClinicList from "$lib/components/ClinicList.svelte";
  import { userToImageType } from "$lib/components/util";
  import { userGuard } from "$lib/components/types";

  const { data }: { data: PageData } = $props();
  const { t, l, localized } = $derived(data);
  const lang = $derived(data.params.lang);
  const hitta = $derived(data?.data?.hitta ?? undefined);
  const images = $derived(
    userToImageType(data?.data?.terapeuter?.terapeuter?.filter(userGuard), t, l)
  );
</script>

{#if hitta}
  <Seo seo={lang === "en" ? hitta.seo_en : hitta.seo} />

  <Section>
    <Container>
      <div class="mx-auto max-w-2xl pb-12 lg:mx-0">
        <div class="prose text-theme-body max-w-none text-lg">
          <BlocksRender blocks={(lang === "en" ? hitta.text_en : hitta.text)?.blocks || []} />
        </div>
      </div>
      <ClinicList clinics={data.clinics} {images} {l} {localized} {t} />
    </Container>
  </Section>
{/if}
