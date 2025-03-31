
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { messageService, type Message, type ChatSummary } from "@/services/messageService";
import { profileService, type Profile } from "@/services/profileService";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageSquare as MessageSquareIcon } from "lucide-react"; // Correct import for MessageSquare

const Messages = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [otherUserProfile, setOtherUserProfile] = useState<Profile | null>(null);

  // Load chats
  useEffect(() => {
    if (isAuthenticated && user) {
      loadChats();
    }
  }, [isAuthenticated, user]);

  // Load messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat);
      loadOtherUserProfile(selectedChat);
    }
  }, [selectedChat]);

  const loadChats = async () => {
    try {
      setIsLoading(true);
      if (!user) return;
      
      const chatData = await messageService.getChats(user.id);
      setChats(chatData);
    } catch (error: any) {
      toast({
        title: "Error loading chats",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (otherUserId: string) => {
    try {
      if (!user) return;
      
      const messagesData = await messageService.getMessages(user.id, otherUserId);
      setMessages(messagesData);
      
      // Mark as read in the chat list
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.otherUserId === otherUserId 
            ? { ...chat, unreadCount: 0 } 
            : chat
        )
      );
    } catch (error: any) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadOtherUserProfile = async (otherUserId: string) => {
    try {
      const profile = await profileService.getProfile(otherUserId);
      setOtherUserProfile(profile);
    } catch (error: any) {
      console.error("Error loading user profile:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !selectedChat) return;

    try {
      const message = {
        sender_id: user.id,
        receiver_id: selectedChat,
        content: newMessage.trim(),
      };

      await messageService.sendMessage(message);
      setNewMessage("");
      
      // Refresh messages
      await loadMessages(selectedChat);
      // Also refresh chat list to update last message
      await loadChats();
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.otherUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat.listingTitle && chat.listingTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated) {
    return <div>Please login to view your messages</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="md:col-span-1 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <Input
                type="search"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <ScrollArea className="h-[calc(100vh-220px)]">
              {isLoading ? (
                <div className="flex justify-center items-center h-20">
                  <p>Loading conversations...</p>
                </div>
              ) : filteredChats.length > 0 ? (
                <div className="divide-y">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.otherUserId}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedChat === chat.otherUserId
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedChat(chat.otherUserId)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.otherUserAvatar} />
                          <AvatarFallback>
                            {getInitials(chat.otherUserName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">
                              {chat.otherUserName}
                            </h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {new Date(chat.lastMessageDate).toLocaleDateString()}
                            </span>
                          </div>
                          {chat.listingTitle && (
                            <p className="text-xs text-gray-500 truncate">
                              Re: {chat.listingTitle}
                            </p>
                          )}
                          <p className="text-sm text-gray-700 truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-semibold text-white bg-marketplace-primary rounded-full mt-1">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquareIcon className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="font-medium text-gray-900">No messages yet</h3>
                  <p className="text-gray-500 mt-1">
                    When you contact sellers or receive messages, they'll appear here.
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Message Thread */}
          <div className="md:col-span-2 bg-white rounded-lg shadow overflow-hidden flex flex-col h-[calc(100vh-180px)]">
            {selectedChat && otherUserProfile ? (
              <>
                <div className="p-4 border-b bg-white flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={otherUserProfile.avatar_url} />
                    <AvatarFallback>
                      {getInitials(otherUserProfile.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{otherUserProfile.full_name}</h3>
                    <p className="text-sm text-gray-500">{otherUserProfile.username}</p>
                  </div>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_id === user?.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender_id === user?.id
                              ? "bg-marketplace-primary text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender_id === user?.id
                                ? "text-marketplace-primary-foreground/70"
                                : "text-gray-500"
                            }`}
                          >
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="min-h-[80px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="self-end"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                <MessageSquareIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="font-medium text-xl text-gray-900">No conversation selected</h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  Select a conversation from the list or start a new one by messaging a seller from a listing page.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
