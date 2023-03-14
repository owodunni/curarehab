<script>
  import { Navbar } from "$lib/components";
  import "../../app.css";
</script>

<div class="flex flex-col min-h-screen">
  <Navbar />
  <div class="flex-1">
    <slot />
  </div>
</div>
