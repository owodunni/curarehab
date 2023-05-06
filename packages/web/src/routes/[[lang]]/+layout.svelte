<script lang="ts">
  import { Analytics, Header } from "$lib/components";
  import { Footer } from "$lib/components";
  import "../../app.css";
</script>

<Analytics />

<div class="flex h-screen flex-col">
  <Header />
  <div class="flex-1">
    <slot />
  </div>
  <Footer />
</div>
