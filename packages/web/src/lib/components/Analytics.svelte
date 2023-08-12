<script>
  import { page } from "$app/stores";
  import { PUBLIC_MEASUREMENTS_ID } from "$env/static/public";

  page.subscribe((value) => console.log("page", value.route));
</script>
