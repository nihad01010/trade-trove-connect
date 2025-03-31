
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

export type Message = Database['public']['Tables']['messages']['Row'];
export type NewMessage = Database['public']['Tables']['messages']['Insert'];

export interface ChatSummary {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  listingId?: string;
  listingTitle?: string;
}

export const messageService = {
  async getMessages(userId: string, otherUserId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw new Error(error.message);
    }

    // Mark messages as read
    const unreadMessages = data.filter(
      msg => msg.receiver_id === userId && !msg.read
    );

    if (unreadMessages.length > 0) {
      const unreadIds = unreadMessages.map(msg => msg.id);
      
      const { error: updateError } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', unreadIds);

      if (updateError) {
        console.error('Error marking messages as read:', updateError);
      }
    }

    return data;
  },

  async sendMessage(message: NewMessage) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      throw new Error(error.message);
    }

    return data;
  },

  async getChats(userId: string): Promise<ChatSummary[]> {
    // This is a more complex query that gets all unique conversations
    // for a user along with the most recent message in each conversation
    const { data, error } = await supabase
      .rpc('get_user_conversations', { user_id: userId });

    if (error) {
      console.error('Error fetching chats:', error);
      throw new Error(error.message);
    }

    return data || [];
  },

  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('read', false);

    if (error) {
      console.error('Error fetching unread count:', error);
      throw new Error(error.message);
    }

    return count || 0;
  }
};
