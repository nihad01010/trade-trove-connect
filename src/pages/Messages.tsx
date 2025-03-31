
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Image, Paperclip } from "lucide-react";

// Mock conversations
const conversations = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Jane Smith",
      avatar: "",
    },
    product: {
      id: "product1",
      title: "iPhone 13 Pro",
      price: 800,
      image: "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone",
    },
    lastMessage: "Is this still available?",
    timestamp: "1 hour ago",
    unread: true,
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Robert Johnson",
      avatar: "",
    },
    product: {
      id: "product2",
      title: "Google Pixel 6 Pro",
      price: 580,
      image: "https://placehold.co/600x400/4A5568/FFFFFF.png?text=Pixel",
    },
    lastMessage: "I can pick it up tomorrow at 3pm if that works for you.",
    timestamp: "3 hours ago",
    unread: false,
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Laura Williams",
      avatar: "",
    },
    product: {
      id: "product3",
      title: "Samsung Galaxy S21",
      price: 700,
      image: "https://placehold.co/600x400/F6AD55/000000.png?text=Samsung",
    },
    lastMessage: "Thanks for the information. I'll think about it and let you know.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "Michael Brown",
      avatar: "",
    },
    product: {
      id: "product4",
      title: "AirPods Pro",
      price: 220,
      image: "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=AirPods",
    },
    lastMessage: "Would you take $200 for it?",
    timestamp: "2 days ago",
    unread: false,
  },
];

// Mock messages for conversation
const mockMessages = [
  {
    id: "msg1",
    sender: "user1",
    text: "Hi, is this still available?",
    timestamp: "Today, 2:30 PM",
    isOwn: false,
  },
  {
    id: "msg2",
    sender: "me",
    text: "Yes, it's still available.",
    timestamp: "Today, 2:35 PM",
    isOwn: true,
  },
  {
    id: "msg3",
    sender: "user1",
    text: "Great! What's the lowest you can go on the price?",
    timestamp: "Today, 2:37 PM",
    isOwn: false,
  },
  {
    id: "msg4",
    sender: "me",
    text: "I can do $750 if you can pick it up today.",
    timestamp: "Today, 2:40 PM",
    isOwn: true,
  },
  {
    id: "msg5",
    sender: "user1",
    text: "That works for me. Can I pick it up around 5 PM?",
    timestamp: "Today, 2:45 PM",
    isOwn: false,
  },
  {
    id: "msg6",
    sender: "me",
    text: "Perfect, I'll be home. My address is 123 Main St.",
    timestamp: "Today, 2:47 PM",
    isOwn: true,
  },
  {
    id: "msg7",
    sender: "user1",
    text: "Great, see you then!",
    timestamp: "1 hour ago",
    isOwn: false,
  },
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  
  const handleSendMessage = () => {
    // In a real app, would send to backend
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };
  
  const filteredConversations = conversations.filter(
    convo => convo.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 overflow-hidden">
            <CardHeader className="p-4">
              <div className="relative">
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="p-0 overflow-y-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
              {filteredConversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`
                    p-4 cursor-pointer border-b last:border-0
                    ${activeConversation.id === conversation.id ? 'bg-gray-100' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} />
                      <AvatarFallback className="bg-marketplace-primary text-white">
                        {conversation.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {conversation.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center mt-1">
                        <img 
                          src={conversation.product.image} 
                          alt={conversation.product.title}
                          className="w-8 h-8 object-cover rounded mr-2"
                        />
                        <span className="text-xs text-gray-500 truncate">
                          {conversation.product.title}
                        </span>
                      </div>
                    </div>
                    
                    {conversation.unread && (
                      <Badge className="bg-marketplace-primary ml-2">New</Badge>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Message Thread */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {activeConversation ? (
              <>
                <CardHeader className="p-4 flex-shrink-0">
                  <div className="flex items-center">
                    <Avatar className="mr-3">
                      <AvatarImage src={activeConversation.user.avatar} />
                      <AvatarFallback className="bg-marketplace-primary text-white">
                        {activeConversation.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {activeConversation.user.name}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <img 
                          src={activeConversation.product.image} 
                          alt={activeConversation.product.title}
                          className="w-8 h-8 object-cover rounded mr-2"
                        />
                        <div className="text-sm text-gray-500">
                          {activeConversation.product.title} - ${activeConversation.product.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <Separator />
                
                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 450px)" }}>
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`
                            max-w-[70%] px-4 py-2 rounded-lg
                            ${message.isOwn 
                              ? 'bg-marketplace-primary text-white rounded-tr-none' 
                              : 'bg-gray-100 rounded-tl-none'
                            }
                          `}
                        >
                          <p className="text-sm">{message.text}</p>
                          <span 
                            className={`
                              text-xs mt-1 block text-right
                              ${message.isOwn ? 'text-white/80' : 'text-gray-500'}
                            `}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                      <Image className="h-4 w-4" />
                    </Button>
                    
                    <Textarea
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="min-h-[60px] resize-none flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    
                    <Button 
                      className="bg-marketplace-primary hover:bg-marketplace-primary/90 rounded-full h-10 w-10 p-0 flex-shrink-0"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Messages;
