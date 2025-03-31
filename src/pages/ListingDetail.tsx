
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share2, Flag, MapPin, Phone, Mail, Calendar, ArrowRight, MessageSquare } from "lucide-react";

// Mock listing data
const mockListing = {
  id: "1",
  title: "iPhone 13 Pro - Excellent Condition with Warranty",
  description: `This iPhone 13 Pro is in excellent condition, with barely any signs of use. It comes with the original box, charger, and has 10 months of Apple warranty remaining.

Features:
- 256GB Storage
- Sierra Blue color
- Battery health at 96%
- Always kept in a case with screen protector
- No scratches or dents
- Original receipt will be provided

Reason for selling: Upgrading to newer model. Price is firm.`,
  price: 800,
  location: "Istanbul, Turkey",
  category: "Electronics",
  subCategory: "Mobile Phones",
  condition: "Used - Like New",
  brand: "Apple",
  model: "iPhone 13 Pro",
  images: [
    "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone+Front",
    "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone+Back",
    "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone+Side",
    "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone+Box",
  ],
  seller: {
    id: "user123",
    name: "John Doe",
    joinDate: "January 2020",
    responseRate: "98%",
    avatar: "",
    ratings: 4.8,
    totalListings: 24,
  },
  postedDate: "2 days ago",
  views: 145,
  isFeatured: true,
};

// Mock similar listings
const similarListings = [
  {
    id: "2",
    title: "iPhone 12 Pro Max 128GB",
    price: 650,
    location: "Ankara, Turkey",
    image: "https://placehold.co/300x200/38B2AC/FFFFFF.png?text=iPhone+12",
  },
  {
    id: "3",
    title: "Samsung Galaxy S21 Ultra",
    price: 700,
    location: "Izmir, Turkey",
    image: "https://placehold.co/300x200/4A5568/FFFFFF.png?text=Galaxy+S21",
  },
  {
    id: "4",
    title: "Google Pixel 6 Pro",
    price: 580,
    location: "Istanbul, Turkey",
    image: "https://placehold.co/300x200/F6AD55/000000.png?text=Pixel+6",
  },
];

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(mockListing.images[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="text-sm mb-4 text-gray-500">
          <Link to="/" className="hover:text-marketplace-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/" className="hover:text-marketplace-primary">{mockListing.category}</Link>
          <span className="mx-2">/</span>
          <Link to="/" className="hover:text-marketplace-primary">{mockListing.subCategory}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{mockListing.title}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardContent className="p-4">
                <div className="mb-4 rounded-md overflow-hidden border">
                  <img 
                    src={mainImage} 
                    alt={mockListing.title} 
                    className="w-full h-[400px] object-contain bg-white"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {mockListing.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer border-2 rounded overflow-hidden ${
                        mainImage === image ? 'border-marketplace-primary' : 'border-gray-200'
                      }`}
                      onClick={() => setMainImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${mockListing.title} - image ${index + 1}`} 
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Listing Details */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p>{mockListing.category} - {mockListing.subCategory}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Condition</h3>
                      <p>{mockListing.condition}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Brand</h3>
                      <p>{mockListing.brand}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Model</h3>
                      <p>{mockListing.model}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Listed</h3>
                      <p>{mockListing.postedDate}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Views</h3>
                      <p>{mockListing.views} views</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="description">
                    <div className="whitespace-pre-line">
                      {mockListing.description}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Similar Listings */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Similar Listings</h2>
                <Link to="/" className="text-marketplace-primary hover:underline text-sm flex items-center">
                  View more <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarListings.map((listing) => (
                  <Link to={`/listing/${listing.id}`} key={listing.id}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <img 
                          src={listing.image} 
                          alt={listing.title} 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium line-clamp-2">{listing.title}</h3>
                          <p className="text-marketplace-primary font-bold mt-1">${listing.price}</p>
                          <p className="text-xs text-gray-500 mt-1">{listing.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Price, Seller, Actions */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{mockListing.title}</h1>
                    <p className="text-3xl font-bold text-marketplace-primary">${mockListing.price}</p>
                  </div>
                  
                  {mockListing.isFeatured && (
                    <Badge className="bg-marketplace-accent">Featured</Badge>
                  )}
                </div>
                
                <div className="flex items-center text-gray-500 mb-6">
                  <MapPin size={16} className="mr-1" />
                  <span>{mockListing.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar size={16} className="mr-1" />
                  <span>Posted {mockListing.postedDate}</span>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-marketplace-primary hover:bg-marketplace-primary/90">
                    <Phone size={16} className="mr-2" /> Show Phone Number
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <MessageSquare size={16} className="mr-2" /> Message Seller
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send message to seller</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm">Item: {mockListing.title}</p>
                        <Textarea 
                          placeholder="Hi, I'm interested in your listing. Is it still available?"
                          className="min-h-[100px]"
                        />
                        <Button className="w-full">Send Message</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={toggleFavorite}
                    >
                      <Heart 
                        size={16} 
                        className={`mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                      {isFavorite ? 'Saved' : 'Save'}
                    </Button>
                    
                    <Button variant="outline" className="flex-1">
                      <Share2 size={16} className="mr-2" /> Share
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Flag size={16} className="mr-2" /> Report Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Seller Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                
                <div className="flex items-center mb-4">
                  <Avatar className="h-14 w-14 mr-4">
                    <AvatarImage src={mockListing.seller.avatar} />
                    <AvatarFallback className="text-lg bg-marketplace-primary text-white">
                      {mockListing.seller.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium">{mockListing.seller.name}</h4>
                    <p className="text-sm text-gray-500">Member since {mockListing.seller.joinDate}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-amber-500">★★★★★</span>
                      <span className="text-sm ml-1">{mockListing.seller.ratings}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Response Rate:</span>
                    <span className="font-medium">{mockListing.seller.responseRate}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Listings:</span>
                    <span className="font-medium">{mockListing.seller.totalListings}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>
            
            {/* Safety Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Safety Tips</h3>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Meet in a safe, public place</li>
                  <li>• Check the item before paying</li>
                  <li>• Pay only after inspecting the item</li>
                  <li>• Don't share personal financial information</li>
                </ul>
                <Link to="/" className="text-marketplace-primary hover:underline text-sm mt-3 inline-block">
                  Read more safety tips
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail;
