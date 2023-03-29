<script lang="ts">
  import { Header } from "$lib/components";
  import { Footer } from "$lib/components";
  import "../../app.css";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: ({ supabase } = data);

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.s.auth.onAuthStateChange(() => {
      invalidate("supabase:auth");
    });

    return () => subscription.unsubscribe();
  });
</script>

<div class="flex h-screen flex-col">
  <Header />
  <div class="flex-1">
    <slot />
  </div>
  <Footer />
</div>
