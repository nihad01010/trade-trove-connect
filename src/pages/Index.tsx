
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

// Mock data
const categories = [
  "All Categories", "Electronics", "Vehicles", "Property", 
  "Clothing", "Furniture", "Jobs", "Services", "Pets"
];

const mockListings = [
  {
    id: "1",
    title: "iPhone 13 Pro - Excellent Condition with Warranty",
    price: 800,
    location: "Istanbul, Turkey",
    category: "Electronics",
    image: "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=iPhone",
    date: "Today",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Modern Apartment in City Center - 2 Bedroom",
    price: 300000,
    location: "Ankara, Turkey",
    category: "Property",
    image: "https://placehold.co/600x400/4A5568/FFFFFF.png?text=Apartment",
    date: "Yesterday",
    isFeatured: false,
  },
  {
    id: "3",
    title: "2019 Toyota Corolla - Low Mileage",
    price: 18000,
    location: "Izmir, Turkey",
    category: "Vehicles",
    image: "https://placehold.co/600x400/F6AD55/000000.png?text=Toyota",
    date: "2 days ago",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Designer Sofa - Like New",
    price: 600,
    location: "Bursa, Turkey",
    category: "Furniture",
    image: "https://placehold.co/600x400/38B2AC/FFFFFF.png?text=Sofa",
    date: "3 days ago",
    isFeatured: false,
  },
  {
    id: "5",
    title: "Professional DSLR Camera with Lenses",
    price: 1200,
    location: "Antalya, Turkey",
    category: "Electronics",
    image: "https://placehold.co/600x400/4A5568/FFFFFF.png?text=Camera",
    date: "4 days ago",
    isFeatured: false,
  },
  {
    id: "6",
    title: "Mountain Bike - Perfect for Trails",
    price: 450,
    location: "Kayseri, Turkey",
    category: "Sports",
    image: "https://placehold.co/600x400/F6AD55/000000.png?text=Bike",
    date: "5 days ago",
    isFeatured: false,
  },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("newest");
  
  // Filter listings based on active category
  const filteredListings = activeCategory === "All Categories" 
    ? mockListings 
    : mockListings.filter(listing => listing.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6">
        {/* Hero section */}
        <section className="mb-10 bg-gradient-to-r from-marketplace-primary to-blue-600 text-white rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Buy and Sell Anything, Anytime
            </h1>
            <p className="text-lg mb-6 opacity-90">
              The largest marketplace with thousands of listings near you
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Input 
                placeholder="What are you looking for?" 
                className="bg-white text-gray-800 w-full sm:w-96"
              />
              <Button className="bg-marketplace-accent hover:bg-marketplace-accent/90 text-white px-6">
                <Search size={18} className="mr-2" /> Search
              </Button>
            </div>
          </div>
        </section>
        
        {/* Category tabs */}
        <section className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  activeCategory === category 
                    ? 'bg-marketplace-primary hover:bg-marketplace-primary/90' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>
        
        {/* Filters and sorting */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">{activeCategory}</h2>
            <Badge variant="outline" className="ml-3">
              {filteredListings.length} listings
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter size={16} className="mr-2" /> Filters
            </Button>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        
        {/* Featured and All Listings */}
        <Tabs defaultValue="all" className="mb-10">
          <TabsList>
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} {...listing} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredListings
                .filter(listing => listing.isFeatured)
                .map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Load more button */}
        <div className="flex justify-center mt-8 mb-12">
          <Button variant="outline" size="lg">
            Load More Listings
          </Button>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TradeConnect</h3>
              <p className="text-gray-300">
                The trusted marketplace for buying and selling goods and services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                {categories.slice(1, 7).map(category => (
                  <li key={category}>
                    <a href="#" className="hover:text-white">{category}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect With Us</h4>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-marketplace-accent">Facebook</a>
                <a href="#" className="hover:text-marketplace-accent">Twitter</a>
                <a href="#" className="hover:text-marketplace-accent">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 TradeConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
