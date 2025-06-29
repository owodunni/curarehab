<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Section from "$lib/components/Section.svelte";
  import { userToImageType } from "$lib/components/util.js";
  import Clinics from "$lib/widgets/Clinics.svelte";
  import { userGuard } from "$lib/components/types.js";

  const { data } = $props();
  const { t, l, localized } = $derived(data);

  const users = $derived(
    userToImageType(data?.data?.terapeuter?.terapeuter?.filter(userGuard) || [], t, l)
  );
</script>

<Seo seo={localized(data.kliniker?.seo, data.kliniker?.seo_en)} />

<Section>
  <Clinics
    description={localized(data.kliniker?.description, data.kliniker?.description_en) || ""}
    images={users}
    klinikerList={data.klinikerList}
    {l}
    {localized}
    {t}
    title={localized(data.kliniker?.title, data.kliniker?.title_en) || ""} />
</Section>
