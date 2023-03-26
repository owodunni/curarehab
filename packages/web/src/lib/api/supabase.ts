export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      blogg: {
        Row: {
          author: string;
          created_at: string | null;
          excerpt: string;
          id: number;
          locale: string;
          parent: number | null;
          post: string | null;
          publish: boolean;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author: string;
          created_at?: string | null;
          excerpt: string;
          id?: number;
          locale?: string;
          parent?: number | null;
          post?: string | null;
          publish?: boolean;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author?: string;
          created_at?: string | null;
          excerpt?: string;
          id?: number;
          locale?: string;
          parent?: number | null;
          post?: string | null;
          publish?: boolean;
          title?: string;
          updated_at?: string | null;
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
