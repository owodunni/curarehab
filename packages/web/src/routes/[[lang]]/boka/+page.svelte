<script lang="ts">
  import { browser } from "$app/environment";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import { onMount } from "svelte";

  let mount = false;

  export let data;
  $: ({ t } = data);

  $: locale = t("common", "lang");

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
      } else {
        console.error("Main element not found!");
      }
    };
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://ww1.clinicbuddy.com/onlinebooking/css/cbonlinebooking.css?v=20240327"
  />
  <script
    src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
  ></script>
  <script
    src="https://ww1.clinicbuddy.com/onlinebooking/js/jquery.cbonlinebooking.js?v=20240327"
  ></script>
  {#if locale === "en"}
    <script
      src="https://ww1.clinicbuddy.com/onlinebooking/js/jquery.cbonlinebooking-en.js"
    ></script>
  {/if}
</svelte:head>

<Section>
  <Container>
    <h1
      class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl -mt-6"
    >
      {t("boka", "title")}
    </h1>
    <p class="text-theme-heading my-6 text-lg">
      {t("boka", "description")}
    </p>

    {#if mount && browser}
      <div class="flex flex-grow" id="container" data-locale={locale}>
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
                    },
                    language,
                    params: {
                      activityGroup: [2],
                      providerGroups: [2],
                      locations: [3],
                    },
                    appearance: { filters: { activity: "false" } },
                  },
                };

                const element = $("#container");
                const fn = () => {
                  if (!element.cbOnlineBooking) return false;
                  element.cbOnlineBooking(ob_.settings);
                  return true;
                };
                if (fn()) return;

                // Check if cbOnlineBooking is injected jet and retry every 100ms if not
                const handle2 = setInterval(() => {
                  if (fn()) clearInterval(handle2);
                }, 100);
              });
            }, 100);
          })();
        </script>
      </div>
    {/if}
  </Container>
</Section>
