
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import { Listing } from './listingService';

export type Favorite = Database['public']['Tables']['favorites']['Row'];

export const favoriteService = {
  async getFavorites(userId: string): Promise<Listing[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('listing_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching favorites:', error);
      throw new Error(error.message);
    }

    if (!data.length) {
      return [];
    }

    const listingIds = data.map(fav => fav.listing_id);
    
    const { data: listings, error: listingsError } = await supabase
      .from('listings')
      .select('*')
      .in('id', listingIds);

    if (listingsError) {
      console.error('Error fetching favorite listings:', listingsError);
      throw new Error(listingsError.message);
    }

    return listings || [];
  },

  async addFavorite(userId: string, listingId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { user_id: userId, listing_id: listingId }
      ])
      .select()
      .single();

    if (error) {
      // If the favorite already exists, this is not an error we need to throw
      if (error.code === '23505') { // unique_violation
        const { data } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', userId)
          .eq('listing_id', listingId)
          .single();
        return data;
      }
      console.error('Error adding favorite:', error);
      throw new Error(error.message);
    }

    return data;
  },

  async removeFavorite(userId: string, listingId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('listing_id', listingId);

    if (error) {
      console.error('Error removing favorite:', error);
      throw new Error(error.message);
    }

    return true;
  },

  async checkFavorite(userId: string, listingId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('listing_id', listingId)
      .maybeSingle();

    if (error) {
      console.error('Error checking favorite status:', error);
      throw new Error(error.message);
    }

    return !!data;
  }
};
