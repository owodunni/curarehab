<script lang="ts">
  import { Header } from "$lib/components";
  import { Footer } from "$lib/components";
  import "../../app.css";
</script>

<div class="flex h-screen flex-col">
  <Header />
  <div class="flex-1">
    <slot />
  </div>
  <Footer />
</div>
