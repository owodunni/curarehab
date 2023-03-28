// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { SupabaseLightClient, Session } from "$lib/api";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseLightClient;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
