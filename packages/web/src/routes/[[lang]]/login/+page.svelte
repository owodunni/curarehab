<script lang="ts">
  import { browser } from "$app/environment";
  import { Button } from "$lib/components";
  import { HeroComponent } from "$lib/components";
  import { t } from "$lib/i18n";
  import type { PageData } from "./$types";

  export let data: PageData;

  let loading = false;
  let submitted = false;

  let error = "";

  let action: "login" | "signUp" | null = null;

  async function handleSubmit(e: Event) {
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    loading = true;
    error = "";
    try {
      if (action === "signUp") {
        const result = await data.supabase.auth.signUp({
          email,
          password
        });
        if (result.error) {
          error = result.error.message;
        }
      } else if (action === "login") {
        const result = await data.supabase.auth.signInWithPassword({
          email,
          password
        });
        if (result.error) {
          error = result.error.message;
        } else {
          if (result.data.user) browser ? window.location.reload() : "";
          else error = "Failed to find user";
        }
      }
    } finally {
      loading = false;
      action = null;
    }
  }

  $: disabled = !!(data.session || loading);
</script>

<HeroComponent>
  <div class="max-w-sm lg:w-96">
    <div>
      <h2 class="text-4xl font-bold tracking-tight text-gray-900">
        {$t("common", "login")}
      </h2>
    </div>

    {#if error}
      <p>{error}</p>
    {/if}

    <div class="mt-14">
      <form action="#" class="space-y-6" class:submitted on:submit|preventDefault={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >{$t("login", "email")}</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="email@curarehab.se"
              required
              class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >{$t("login", "password")}</label
          >
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder={$t("login", "password").toLowerCase()}
              required
              class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <Button
            class="w-1/2"
            variant="outline"
            {disabled}
            on:click={() => {
              submitted = true;
              action = "login";
            }}>{$t("common", "login")}</Button
          >
          <Button
            class="w-1/2"
            {disabled}
            on:click={() => {
              submitted = true;
              action = "signUp";
            }}>{$t("login", "signUp")}</Button
          >
        </div>
      </form>
    </div>
  </div>
</HeroComponent>
