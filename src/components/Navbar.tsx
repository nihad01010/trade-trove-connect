
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, MessageSquare, User, Plus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-2 px-4 border-b">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-marketplace-primary">
            TradeConnect
          </Link>
        </div>
        
        <div className="w-full sm:max-w-md flex items-center relative">
          <Input 
            type="search" 
            placeholder="Search listings..." 
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Link to="/create-listing">
            <Button className="bg-marketplace-primary hover:bg-marketplace-primary/90 text-white">
              <Plus size={16} className="mr-1" />
              <span>New Listing</span>
            </Button>
          </Link>
          
          <Link to="/favorites" className="p-2 text-gray-700 hover:text-marketplace-primary">
            <Heart size={20} />
          </Link>
          
          <Link to="/messages" className="p-2 text-gray-700 hover:text-marketplace-primary">
            <MessageSquare size={20} />
          </Link>
          
          <Link to="/profile" className="p-2 text-gray-700 hover:text-marketplace-primary">
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
