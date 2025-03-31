
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Star, MessageSquare, Shield, Clock } from "lucide-react";

// Mock user data
const user = {
  id: "user123",
  name: "John Doe",
  avatar: "",
  location: "Istanbul, Turkey",
  memberSince: "January 2020",
  lastActive: "2 hours ago",
  verified: true,
  responseRate: "98%",
  responseTime: "Within 2 hours",
  ratings: 4.8,
  reviewCount: 56,
  bio: "I sell electronics, mostly phones and accessories. All items come with warranty and are in excellent condition. Feel free to contact me if you have questions.",
};

// Mock listings data
const userListings = [
  {
    id: "1",
    title: "iPhone 13 Pro - Excellent Condition with Warranty",
    price: 800,
    location: "Istanbul, Turkey",
    category: "Electronics",
    image: "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone",
    date: "2 days ago",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Google Pixel 6 Pro - Barely Used",
    price: 580,
    location: "Istanbul, Turkey",
    category: "Electronics",
    image: "https://placehold.co/600x400/4A5568/FFFFFF.png?text=Pixel",
    date: "3 days ago",
    isFeatured: false,
  },
  {
    id: "3",
    title: "Samsung Galaxy S21 Ultra - With Original Box",
    price: 700,
    location: "Istanbul, Turkey",
    category: "Electronics",
    image: "https://placehold.co/600x400/F6AD55/000000.png?text=Samsung",
    date: "1 week ago",
    isFeatured: false,
  },
  {
    id: "4",
    title: "AirPods Pro - Brand New Sealed",
    price: 220,
    location: "Istanbul, Turkey",
    category: "Electronics",
    image: "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=AirPods",
    date: "1 week ago",
    isFeatured: false,
  },
];

// Mock reviews data
const reviews = [
  {
    id: "1",
    user: {
      name: "Emily Johnson",
      avatar: "",
    },
    rating: 5,
    date: "1 month ago",
    text: "Great seller! The iPhone was exactly as described and arrived promptly. John was very responsive to my questions.",
  },
  {
    id: "2",
    user: {
      name: "Michael Smith",
      avatar: "",
    },
    rating: 5,
    date: "2 months ago",
    text: "Smooth transaction. The phone was in perfect condition as advertised. Would definitely buy from this seller again.",
  },
  {
    id: "3",
    user: {
      name: "Sarah Williams",
      avatar: "",
    },
    rating: 4,
    date: "3 months ago",
    text: "Good experience overall. Seller was responsive, and item arrived as described. Took a bit longer to ship than expected, but still satisfied.",
  },
];

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Information */}
          <div className="space-y-6">
            {/* User Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-marketplace-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold mb-1">
                    {user.name}
                    {user.verified && (
                      <Badge className="ml-2 bg-blue-500 text-white">
                        Verified
                      </Badge>
                    )}
                  </h1>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{user.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{user.ratings}</span>
                    <span className="text-gray-500 ml-1">({user.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex space-x-3 w-full">
                    <Button 
                      variant={isFollowing ? "outline" : "default"}
                      className={`flex-1 ${
                        isFollowing ? "" : "bg-marketplace-primary hover:bg-marketplace-primary/90"
                      }`}
                      onClick={toggleFollow}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    
                    <Button variant="outline" className="flex-1">
                      <MessageSquare size={16} className="mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <CalendarDays size={16} className="mr-2" />
                      <span>Member since</span>
                    </div>
                    <span>{user.memberSince}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span>Last active</span>
                    </div>
                    <span>{user.lastActive}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <MessageSquare size={16} className="mr-2" />
                      <span>Response rate</span>
                    </div>
                    <span>{user.responseRate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span>Response time</span>
                    </div>
                    <span>{user.responseTime}</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-2">About {user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.bio}</p>
                </div>
                
                <div className="mt-6">
                  <div className="inline-flex items-center bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs">
                    <Shield size={14} className="mr-1" />
                    Verified Seller
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Listings and Reviews */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="listings">
              <TabsList className="mb-6">
                <TabsTrigger value="listings">Listings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="listings">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {userListings.map((listing) => (
                    <ListingCard key={listing.id} {...listing} />
                  ))}
                </div>
                
                {userListings.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500">This user has no active listings</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      {user.ratings} out of 5
                    </CardTitle>
                    <CardDescription>
                      Based on {user.reviewCount} reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {reviews.map((review) => (
                      <div key={review.id} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={review.user.avatar} />
                              <AvatarFallback className="text-xs bg-gray-200">
                                {review.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.user.name}</div>
                              <div className="text-xs text-gray-500">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{review.text}</p>
                        {review.id !== reviews[reviews.length - 1].id && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                    
                    {reviews.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-500">This user has no reviews yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
