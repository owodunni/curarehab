<script lang="ts">
  import { browser } from "$app/environment";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { onMount } from "svelte";

  let mount = $state(false);

  const { data } = $props();
  const { t } = $derived(data);
  const locale = $derived(t("common", "lang"));
  const clinic = $derived(data.clinic);

  onMount(() => {
    mount = true;
    return () => {
      const mainElement = document.querySelector("#container");

      // Check if the main element exists
      if (mainElement) {
        // A loop to remove all child nodes
        while (mainElement.firstChild) {
          mainElement.removeChild(mainElement.firstChild);
        }
      }
    };
  });
</script>

<svelte:head>
  <link
    href="https://ww1.clinicbuddy.com/onlinebooking/css/cbonlinebooking.css?v=20240327"
    rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</svelte:head>

<Seo
  seo={{
    title:
      t("kliniker", "bokaTitle") +
      " - " +
      (locale === "sv"
        ? clinic.klinik_page?.title
        : clinic.klinik_page?.title_en || clinic.klinik_page?.title),
    description: t("kliniker", "bokaDescription"),
  }} />

<Section>
  <Container>
    <h1 class="text-theme-heading -mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
      {t("kliniker", "bokaTitle")} - {locale === "sv"
        ? clinic.klinik_page?.title
        : clinic.klinik_page?.title_en || clinic.klinik_page?.title}
    </h1>
    <p class="text-theme-heading my-6 text-lg">
      {locale === "sv"
        ? clinic.boka?.description
        : clinic.boka?.description_en ||
          clinic.boka?.description ||
          t("kliniker", "bokaDescription")}
    </p>

    {#if mount && browser}
      <div id="container" class="flex flex-grow" data-locale={locale}>
        <script>
          (() => {
            // Check if jquery is defined and retry every 100ms if not
            const handle = setInterval(() => {
              if (!$) return;
              clearInterval(handle);
              $(document).ready(function () {
                const language = $("#container").data("locale"); // Access the locale data attribute
                var ob_ = {
                  settings: {
                    uid: "-3177",
                    embedded: true,
                    customization: {
                      footer: { show: 0 },
                      header: { show: 0 },
                      streetview: "",
                    },
                    language,
                    params: {
                      activityGroups: [2],
                      providerGroups: [2],
                      locations: [3],
                    },
                    appearance: { filters: { activity: "false" } },
                  },
                };

                $.getScript(
                  "https://ww1.clinicbuddy.com/onlinebooking/js/jquery.cbonlinebooking.js?v=20240327",
                  function () {
                    if (language === "en")
                      $.getScript(
                        "https://ww1.clinicbuddy.com/onlinebooking/js/jquery.cbonlinebooking-en.js",
                        function () {
                          /* no-op */
                        }
                      );
                    const element = $("#container");
                    element.cbOnlineBooking(ob_.settings);
                  }
                );
              });
            }, 50);
          })();
        </script>
      </div>
    {/if}
  </Container>
</Section>
