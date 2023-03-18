<script lang="ts">
  import { Header } from "$lib/components";
  import "../../app.css";
</script>

<div class="flex h-full flex-col">
  <Header />
  <div class="flex-1">
    <slot />
  </div>
</div>
