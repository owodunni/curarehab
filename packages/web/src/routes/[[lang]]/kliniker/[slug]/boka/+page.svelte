<script lang="ts">
  import { browser } from "$app/environment";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { onMount } from "svelte";

  let mount = $state(false);

  const { data } = $props();
  const { t, localized } = $derived(data);
  const locale = $derived(t("common", "lang"));
  const { clinic_buddy_activity, clinic_buddy_provider, clinic_buddy_location } = $derived(
    data.clinic
  );
  const boka = $derived(data.clinic.boka);

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

  function getLocalized<T>(sv: T, en: T): T {
    if (locale === "en") {
      return en;
    }
    return sv;
  }
</script>

<svelte:head>
  <link
    href="https://ww1.clinicbuddy.com/onlinebooking/css/cbonlinebooking.css?v=20240327"
    rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</svelte:head>

<Seo seo={getLocalized(boka?.seo, boka?.seo_en)} />

<Section>
  <Container>
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {localized(boka?.title, boka?.title_en)}
      </h2>
      <p class="text-theme-body mt-6 text-lg">
        {localized(boka?.description, boka?.description_en)}
      </p>
    </div>

    {#if mount && browser}
      <div
        id="container"
        class="min-h-[500px] w-full"
        data-activity={clinic_buddy_activity}
        data-locale={locale}
        data-location={clinic_buddy_location}
        data-provider={clinic_buddy_provider}>
        <script>
          (() => {
            // Check if jquery is defined and retry every 100ms if not
            const handle = setInterval(() => {
              if (!$) return;
              clearInterval(handle);
              $(document).ready(function () {
                const language = $("#container").data("locale"); // Access the locale data attribute
                const location = $("#container").data("location"); // Access the locale data attribute
                const provider = $("#container").data("provider"); // Access the locale data attribute
                const activity = $("#container").data("activity"); // Access the locale data attribute
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
                      activityGroups: [activity],
                      providerGroups: [provider],
                      locations: [location],
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
