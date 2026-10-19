<script lang="ts">
  import type { PageData } from "./$types";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";

  const { data }: { data: PageData } = $props();
  const { l, t } = $derived(data);
  const lang = $derived(data.params.lang);

  // Healthcare (naprapathy, physiotherapy, diagnostics) is VAT exempt in Sweden.
  // Massage, acupuncture, wellness treatments and goods such as insoles are sold including 25% VAT.
  // The CMS has no VAT field, so treatments are grouped by slug here.
  const vatIncludedSlugs = [
    "massage",
    "gravidmassage",
    "medicinsk-akupunktur",
    "friskvardsbidrag-for-fysioterapi-eller-naprapati",
    "fotanalys-och-inlaeggssulor",
  ];

  const treatments = $derived(
    (data?.data?.Behandlingar ?? [])
      .flatMap(({ Slug, Title, Title_en, pris }) =>
        Slug && Title ? [{ Slug, Title, Title_en, pris }] : []
      )
      .sort((a, b) => (a.pris ?? 0) - (b.pris ?? 0) || a.Title.localeCompare(b.Title, "sv"))
  );

  const groups = $derived([
    {
      title: t("prislista", "vatExemptTitle"),
      note: undefined,
      treatments: treatments.filter((tr) => !vatIncludedSlugs.includes(tr.Slug)),
    },
    {
      title: t("prislista", "vatIncludedTitle"),
      note: t("prislista", "vatIncludedNote"),
      treatments: treatments.filter((tr) => vatIncludedSlugs.includes(tr.Slug)),
    },
  ]);

  function formatPrice(price: number) {
    return t("prislista", "currency", {
      price: price.toLocaleString(lang === "en" ? "en-GB" : "sv-SE"),
    });
  }
</script>

<Seo seo={{ title: t("prislista", "title"), description: t("prislista", "description") }} />

<Section>
  <Container>
    <div class="mx-auto max-w-3xl">
      <h1 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("prislista", "heading")}
      </h1>
      <p class="text-theme-body mt-6 text-lg">{t("prislista", "intro")}</p>

      {#each groups as group (group.title)}
        {#if group.treatments.length > 0}
          <div class="mt-12">
            <div
              class="border-theme-div flex flex-wrap items-baseline justify-between gap-x-4 border-b pb-3">
              <h2 class="text-theme-heading text-xl font-semibold">{group.title}</h2>
              {#if group.note}
                <p class="text-theme-muted text-sm">{group.note}</p>
              {/if}
            </div>
            <ul class="divide-theme-div divide-y">
              {#each group.treatments as treatment (treatment.Slug)}
                {@const title =
                  lang === "en" ? treatment.Title_en || treatment.Title : treatment.Title}
                <li>
                  <a
                    class="group flex items-center justify-between gap-4 py-4"
                    aria-label={t("prislista", "readMore", { treatment: title })}
                    href={`${l("behandlingar")}/${treatment.Slug}`}>
                    <span
                      class="text-theme-heading text-base-medium group-hover:text-theme-muted-hover underline-offset-4 group-hover:underline">
                      {title}
                    </span>
                    {#if treatment.pris}
                      <span class="text-theme-heading text-base-medium shrink-0 text-right">
                        {formatPrice(treatment.pris)}
                      </span>
                    {/if}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/each}

      <div class="mt-12">
        <a class="btn variant-filled" href={t("common", "hanoLink")}>{t("prislista", "boka")}</a>
      </div>
    </div>
  </Container>
</Section>
