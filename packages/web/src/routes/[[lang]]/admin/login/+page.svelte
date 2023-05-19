<script lang="ts">
  import { enhance } from "$app/forms";
  import HeroComponent from "$lib/components/HeroComponent.svelte";
  import type { ActionData, PageData } from "./$types";

  export let form: ActionData;
  export let data: PageData;
  const { t } = data;
</script>

<HeroComponent {t}>
  <div class="max-w-sm lg:w-96">
    <div>
      <h2 class="text-tertiary-900 text-4xl font-bold tracking-tight">
        {t("common", "login")}
      </h2>
    </div>

    <div class="mt-14">
      {#if form?.missing}<p class="text-sm text-red-500">{t("login", "emailError")}</p>{/if}
      {#if form?.incorrect}<p class="text-sm text-red-500">{t("login", "passwordError")}</p>{/if}
      <form method="POST" action="?/login" class="space-y-6" use:enhance>
        <div>
          <label for="email" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("login", "email")}</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="email@curarehab.se"
              value={form?.email ?? ""}
              required
              class="ring-tertiary-300 placeholder:text-tertiary-400 focus:ring-surface-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label for="password" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("login", "password")}</label
          >
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder={t("login", "password").toLowerCase()}
              required
              class="ring-tertiary-300 placeholder:text-tertiary-400 focus:ring-surface-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn variant-filled w-1/2">{t("common", "login")}</button>
        </div>
      </form>
    </div>
  </div>
</HeroComponent>
