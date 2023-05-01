import type { Supabase, SupabaseLightClient, SupabaseUtil } from "./types";
import { util } from "./util";

export const supabaseApiKeys = () => ({
  supabaseUrl: "https://sjohvtupwpsnrbctcszt.supabase.co",
  supabaseKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqb2h2dHVwd3BzbnJiY3Rjc3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMTA5NDEsImV4cCI6MTk5NDc4Njk0MX0.p6Cz2DlLArjq7kt6M1JfFq7omzHnYTaUzbKX4Q3vx08"
});

export type { Database } from "./supabase";
export type {
  Supabase,
  Session,
  SupabaseLightClient,
  User,
  BlogPostMetaData,
  BlogPost,
  DbError
} from "./types";

export const supabaseLightClient = (supabase: Supabase): SupabaseLightClient => {
  let u: SupabaseUtil;
  const client: SupabaseLightClient = {
    getBlogPostsMetaData: async (onlyPublished: boolean) => {
      const result = await (() => {
        const partial = supabase
          .from("blog")
          .select("title,id,slug,locale,parent,excerpt,published,created_at,updated_at");
        return onlyPublished ? partial.eq("published", true) : partial;
      })();
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
      }
      if (!result.data[0]) return { message: "Not found", code: 500 };
      else {
        return result.data[0];
      }
    },
    util: () => {
      u = u || util();
      return u;
    },
    s: supabase
  };
  return client;
};
