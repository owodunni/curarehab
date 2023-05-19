import type { Database } from "./supabase";
import type { SupabaseClient, Session, User } from "@supabase/supabase-js";

export type Supabase = SupabaseClient<Database>;
export type { Session, User };

export type BlogPostMetaData = Pick<
  Database["public"]["Tables"]["blog"]["Row"],
  | "id"
  | "slug"
  | "locale"
  | "parent"
  | "title"
  | "excerpt"
  | "published"
  | "created_at"
  | "updated_at"
  | "author"
>;
export type BlogPost = Database["public"]["Tables"]["blog"]["Row"];

export interface SupabaseLightClient {
  getBlogPostsMetaData: (onlyPublished: boolean) => Promise<BlogPostMetaData[] | DbError>;
  getBlogPosts: () => Promise<BlogPost[] | DbError>;
  getBlogPost: (slug: string) => Promise<BlogPost | DbError>;
  util: () => SupabaseUtil;
  s: Supabase;
}

export interface SupabaseUtil {
  getRouteToPost: (post: BlogPostMetaData) => Promise<string | DbError>;
}

export type DbError = { message: string; code: number };
