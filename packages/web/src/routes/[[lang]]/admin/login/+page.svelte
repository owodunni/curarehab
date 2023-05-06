<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components";
  import { HeroComponent } from "$lib/components";
  import { t } from "$lib/i18n";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<HeroComponent>
  <div class="max-w-sm lg:w-96">
    <div>
      <h2 class="text-4xl font-bold tracking-tight text-gray-900">
        {$t("common", "login")}
      </h2>
    </div>

    <div class="mt-14">
      {#if form?.missing}<p class="text-sm text-red-500">{$t("login", "emailError")}</p>{/if}
      {#if form?.incorrect}<p class="text-sm text-red-500">{$t("login", "passwordError")}</p>{/if}
      <form method="POST" action="?/login" class="space-y-6" use:enhance>
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
              value={form?.email ?? ""}
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
          <Button class="w-1/2" variant="outline">{$t("common", "login")}</Button>
        </div>
      </form>
    </div>
  </div>
</HeroComponent>
