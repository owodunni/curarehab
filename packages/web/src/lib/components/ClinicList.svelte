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
    bookingButtonText?: string;
    findUsButtonText?: string;
  }

  const { clinics, t, l, title, description, bookingButtonText, findUsButtonText }: Props =
    $props();
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

<!-- Card Layout: Similar to /kliniker page but with extra button -->
<div class="grid gap-8 md:grid-cols-2">
  {#each clinics as clinic (clinic.slug)}
    {#if clinic.klinik_page}
      <div class="group">
        <div class="relative w-full">
          <!-- Clickable image -->
          <a href={`${l("kliniker")}/${clinic.slug}`}>
            <Image
              class="bg-skog-400 aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              alt={clinic.klinik_page.omslagsbild?.title ||
                getLocalizedText(clinic.klinik_page.title, clinic.klinik_page.title_en)}
              height={450}
              srcPath={clinic.klinik_page.omslagsbild?.filename_disk || ""}
              width={800} />
          </a>

          <div class="mt-6 flex items-center gap-x-6">
            <a class="flex-1" href={`${l("kliniker")}/${clinic.slug}`}>
              <h3
                class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading overflow-hidden text-ellipsis"
                lang={locale}>
                {getLocalizedText(clinic.klinik_page.title, clinic.klinik_page.title_en)}
              </h3>
            </a>
            <a class="btn variant-filled" href={`${l("kliniker")}/${clinic.slug}/boka`}>
              {bookingButtonText || t("kliniker", "bokaTitle")}
            </a>
            <a class="btn variant-ghost" href={`${l("kliniker")}/${clinic.slug}/hitta`}
              >{findUsButtonText || t("kliniker", "hittaTitle")}
              <span aria-hidden="true">→</span></a>
          </div>

          <!-- Clickable description -->
          {#if clinic.klinik_page.description || clinic.klinik_page.description_en}
            <a href={`${l("kliniker")}/${clinic.slug}`}>
              <article class="prose mt-5">
                <p
                  class="text-theme-body line-clamp-6 overflow-hidden text-ellipsis text-base leading-7">
                  {getLocalizedText(
                    clinic.klinik_page.description,
                    clinic.klinik_page.description_en
                  )}
                </p>
              </article>
            </a>
          {/if}
        </div>
      </div>
    {/if}
  {/each}
</div>
