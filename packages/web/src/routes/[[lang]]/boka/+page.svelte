<script>
  import { browser } from "$app/environment";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://ww1.clinicbuddy.com/onlinebooking/css/cbonlinebooking.css?v=20240327"
  />
  <script
    src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
  ></script>
  <!--script src="/jquery.onlinebooking.js"></script-->
  <script
    src="https://ww1.clinicbuddy.com/onlinebooking/js/jquery.cbonlinebooking.js?v=20240327"
  ></script>
</svelte:head>

{#if browser}
  <script>
    var ob_ = {
      settings: {
        uid: "-3177",
        embedded: true,
        customization: { footer: { show: 0 }, header: { show: 0 } },
        data: { language: "en" },
        language: "en",
      },
      language: "en",
    };
    $(document).ready(function () {
      $('body').attr('data-sveltekit-preload-data', 'false');
      $("main").cbOnlineBooking(ob_.settings);
      if (window.top === window.self) {
        cd_ = { language: "sv" };
        /*$.getScript(
      "https://ww1.clinicbuddy.com/onlinebooking/js/cbcookiedirective.js?v=20211219",
    );*/
      }
    });
  </script>
{/if}
