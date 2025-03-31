
import { createClient } from '@supabase/supabase-js';

// Set default values if the environment variables are not available
// In production, these should be set through proper environment configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase URL or Anon Key is missing from environment variables. Using default values for development. Please set these in your .env file for production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          price: number;
          category: string;
          location: string;
          created_at: string;
          updated_at: string;
          images: string[];
          contact_phone?: string;
          contact_email: string;
          is_featured: boolean;
        };
        Insert: Omit<
          Database['public']['Tables']['listings']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & { 
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database['public']['Tables']['listings']['Insert']
        >;
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          avatar_url?: string;
          location?: string;
          bio?: string;
          member_since: string;
          response_rate?: number;
          response_time?: string;
          verified: boolean;
        };
        Insert: Omit<
          Database['public']['Tables']['profiles']['Row'],
          'id' | 'member_since'
        > & { 
          id: string;
          member_since?: string; 
        };
        Update: Partial<
          Database['public']['Tables']['profiles']['Insert']
        >;
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['favorites']['Row'],
          'id' | 'created_at'
        > & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<
          Database['public']['Tables']['favorites']['Insert']
        >;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          listing_id?: string;
          content: string;
          created_at: string;
          read: boolean;
        };
        Insert: Omit<
          Database['public']['Tables']['messages']['Row'],
          'id' | 'created_at' | 'read'
        > & {
          id?: string;
          created_at?: string;
          read?: boolean;
        };
        Update: Partial<
          Database['public']['Tables']['messages']['Insert']
        >;
      };
    };
  };
};
