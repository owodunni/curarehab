<script lang="ts">
  import type { L, T } from "$lib/i18n/t";
  import Card from "./Card.svelte";
  import CardList from "./CardList.svelte";

  interface ClinicData {
    __typename?: "Kliniker_list" | undefined;
    id?: string;
    slug?: string | null | undefined;
    klinik_page?:
      | {
          __typename?: "pages" | undefined;
          title?: string | null | undefined;
          title_en?: string | null | undefined;
          description?: string | null | undefined;
          description_en?: string | null | undefined;
          omslagsbild?:
            | {
                __typename?: "directus_files" | undefined;
                title?: string | null | undefined;
                filename_disk?: string | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  }

  interface Props {
    clinics: ClinicData[];
    t: T;
    l: L;
    localized: <T>(sv: T, en: T) => T;
  }

  const { clinics, t, l, localized }: Props = $props();
</script>

<CardList extras="!mt-0">
  {#each clinics as clinic (clinic.slug)}
    {#snippet buttons()}
      <a class="btn btn-sm variant-filled" href={`${l("kliniker")}/${clinic.slug}/boka`}>
        {t("common", "bokaTid")}
      </a>
      <a class="btn btn-sm variant-ghost" href={`${l("kliniker")}/${clinic.slug}/hitta`}
        >{t("common", "hittaHit")}
        <span aria-hidden="true">→</span></a>
    {/snippet}
    <Card
      {buttons}
      image={clinic?.klinik_page?.omslagsbild}
      link={`${l("kliniker")}/${clinic?.slug}`}
      shape="circle"
      {t}
      text={localized(clinic.klinik_page?.description, clinic.klinik_page?.description_en)}>
      {localized(clinic?.klinik_page?.title, clinic?.klinik_page?.title_en)}
    </Card>
  {/each}
</CardList>
