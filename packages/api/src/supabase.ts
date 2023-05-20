export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      blog: {
        Row: {
          author: string;
          author_id: number | null;
          cover_photo: string;
          created_at: string;
          excerpt: string;
          id: number;
          locale: string;
          parent: number | null;
          post: string;
          published: boolean;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author: string;
          author_id?: number | null;
          cover_photo?: string;
          created_at?: string;
          excerpt?: string;
          id?: number;
          locale?: string;
          parent?: number | null;
          post?: string;
          published?: boolean;
          slug: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          author?: string;
          author_id?: number | null;
          cover_photo?: string;
          created_at?: string;
          excerpt?: string;
          id?: number;
          locale?: string;
          parent?: number | null;
          post?: string;
          published?: boolean;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
      };
      terapheut: {
        Row: {
          cover_photo: string | null;
          created_at: string | null;
          first_name: string;
          id: number;
          keywords: string[] | null;
          last_name: string;
          profile_excerpt: string;
          profile_excerpt_en: string;
          profile_photo: string | null;
          profile_text: string;
          profile_text_en: string;
          published: boolean;
          title: string;
          user_id: string | null;
        };
        Insert: {
          cover_photo?: string | null;
          created_at?: string | null;
          first_name?: string;
          id?: number;
          keywords?: string[] | null;
          last_name?: string;
          profile_excerpt?: string;
          profile_excerpt_en?: string;
          profile_photo?: string | null;
          profile_text?: string;
          profile_text_en?: string;
          published?: boolean;
          title?: string;
          user_id?: string | null;
        };
        Update: {
          cover_photo?: string | null;
          created_at?: string | null;
          first_name?: string;
          id?: number;
          keywords?: string[] | null;
          last_name?: string;
          profile_excerpt?: string;
          profile_excerpt_en?: string;
          profile_photo?: string | null;
          profile_text?: string;
          profile_text_en?: string;
          published?: boolean;
          title?: string;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
