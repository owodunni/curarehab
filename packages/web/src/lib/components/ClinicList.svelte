<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type { L, T } from "$lib/i18n/t";

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
    title?: string;
    description?: string;
  }

  const { clinics, t, l, title, description }: Props = $props();
  const locale = $derived(t("common", "lang"));

  // Helper function to get localized text
  function getLocalizedText(sv: string | null | undefined, en: string | null | undefined): string {
    if (locale === "en") {
      return en || sv || "";
    }
    return sv || en || "";
  }
</script>

{#if title || description}
  <div class="mb-8">
    {#if title}
      <h2 class="text-theme-heading font-sang mb-4 text-2xl font-semibold">
        {title}
      </h2>
    {/if}
    {#if description}
      <p class="text-theme-body text-lg">
        {description}
      </p>
    {/if}
  </div>
{/if}

<!-- Card Layout: Large cards with images and detailed info -->
<div class="grid gap-8 md:grid-cols-2">
  {#each clinics as clinic (clinic.slug)}
    {#if clinic.klinik_page}
      <div
        class="group overflow-hidden rounded-2xl border shadow-md transition-shadow hover:shadow-lg">
        {#if clinic.klinik_page.omslagsbild?.filename_disk}
          <div class="aspect-[16/9] overflow-hidden">
            <Image
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt={clinic.klinik_page.omslagsbild.title ||
                getLocalizedText(clinic.klinik_page.title, clinic.klinik_page.title_en)}
              height={300}
              srcPath={clinic.klinik_page.omslagsbild.filename_disk}
              width={500} />
          </div>
        {/if}

        <div class="p-6">
          <div class="mx-auto max-w-xl">
            <h3 class="text-theme-heading font-sang text-2xl font-bold tracking-tight sm:text-3xl">
              {getLocalizedText(clinic.klinik_page.title, clinic.klinik_page.title_en)}
            </h3>

            {#if clinic.klinik_page.description || clinic.klinik_page.description_en}
              <p class="text-theme-body mt-6 line-clamp-3 text-lg">
                {getLocalizedText(
                  clinic.klinik_page.description,
                  clinic.klinik_page.description_en
                )}
              </p>
            {/if}

            <div class="mt-8 flex items-center gap-x-6">
              <a class="btn variant-filled" href={`${l("kliniker")}/${clinic.slug}/boka`}>
                {t("boka", "bookAppointment")}
              </a>
              <a class="btn variant-ghost" href={`${l("kliniker")}/${clinic.slug}`}>
                {t("boka", "viewClinic")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>
