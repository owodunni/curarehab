import type { Supabase, SupabaseLightClient } from "./types";
import { util } from "./util";

export const supabaseApiKeys = () => ({
  supabaseUrl: "https://sjohvtupwpsnrbctcszt.supabase.co",
  supabaseKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqb2h2dHVwd3BzbnJiY3Rjc3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMTA5NDEsImV4cCI6MTk5NDc4Njk0MX0.p6Cz2DlLArjq7kt6M1JfFq7omzHnYTaUzbKX4Q3vx08"
});

export type { Database } from "./supabase";
export type { Supabase, Session } from "./types";

export const supabaseLightClient = (supabase: Supabase): SupabaseLightClient => {
  return {
    getBlogPostsMetaData: async () => {
      const result = await supabase.from("blog").select("id,slug,locale,parent");
      if (result.error) {
        return { message: result.error.message, code: 500 };
      } else {
        return result.data;
      }
    },
    getBlogPosts: async () => {
      const result = await supabase.from("blog").select("*");
      if (result.error) {
        return { message: result.error.message, code: 500 };
      } else {
        return result.data;
      }
    },
    getBlogPost: async (slug: string) => {
      const result = await supabase.from("blog").select("*").eq("slug", slug);
      if (result.error) {
        return { message: result.error.message, code: 500 };
      } else {
        return result.data[0];
      }
    },
    get util() {
      return util(this);
    },
    s: supabase
  };
};
