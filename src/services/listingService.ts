
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

export type Listing = Database['public']['Tables']['listings']['Row'];
export type NewListing = Database['public']['Tables']['listings']['Insert'];

export const listingService = {
  async getListings(options?: {
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
  }) {
    let query = supabase.from('listings').select('*');

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.featured !== undefined) {
      query = query.eq('is_featured', options.featured);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      throw new Error(error.message);
    }

    return data;
  },

  async getListingById(id: string) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      throw new Error(error.message);
    }

    return data;
  },

  async getUserListings(userId: string) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching listings for user ID ${userId}:`, error);
      throw new Error(error.message);
    }

    return data;
  },

  async createListing(listing: NewListing) {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select()
      .single();

    if (error) {
      console.error('Error creating listing:', error);
      throw new Error(error.message);
    }

    return data;
  },

  async updateListing(id: string, updates: Partial<NewListing>) {
    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating listing with ID ${id}:`, error);
      throw new Error(error.message);
    }

    return data;
  },

  async deleteListing(id: string) {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting listing with ID ${id}:`, error);
      throw new Error(error.message);
    }

    return true;
  },

  async uploadImages(files: File[], userId: string) {
    const imageUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = `listings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('listings-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw new Error(uploadError.message);
      }

      const { data } = supabase.storage
        .from('listings-images')
        .getPublicUrl(filePath);

      imageUrls.push(data.publicUrl);
    }

    return imageUrls;
  }
};
