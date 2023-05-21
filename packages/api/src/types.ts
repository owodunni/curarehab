import type { Database } from "./supabase";
import type { SupabaseClient, Session, User } from "@supabase/supabase-js";

export type Supabase = SupabaseClient<Database>;
export type { Session, User };

export type TerapheutMetaData = Pick<
  Database["public"]["Tables"]["terapheut"]["Row"],
  | "id"
  | "first_name"
  | "last_name"
  | "title"
  | "profile_excerpt"
  | "profile_excerpt_en"
  | "profile_photo"
  | "published"
  | "user_id"
>;
export type Terapheut = Database["public"]["Tables"]["terapheut"]["Row"];

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
  | "cover_photo"
> & { terapheut: TerapheutMetaData };
export type BlogPost = Database["public"]["Tables"]["blog"]["Row"];

export interface SupabaseLightClient {
  getBlogPostsMetaData: (
    onlyPublished: boolean,
    limit?: number
  ) => Promise<BlogPostMetaData[] | DbError>;
  getTerapheutMetaData: (onlyPublished: boolean) => Promise<TerapheutMetaData[] | DbError>;
  getTerapheut: (idOrName: string, type?: "name" | "id") => Promise<Terapheut | DbError>;
  getBlogPosts: () => Promise<BlogPost[] | DbError>;
  getBlogPost: (slug: string) => Promise<BlogPost | DbError>;
  util: () => SupabaseUtil;
  s: Supabase;
}

export interface SupabaseUtil {
  getRouteToPost: (post: BlogPostMetaData) => Promise<string | DbError>;
}

export type DbError = { message: string; code: number };
