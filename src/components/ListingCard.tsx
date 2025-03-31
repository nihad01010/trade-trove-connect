
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  image: string;
  date: string;
  isFeatured?: boolean;
}

const ListingCard = ({
  id,
  title,
  price,
  location,
  category,
  image,
  date,
  isFeatured = false,
}: ListingCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/listing/${id}`}>
      <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${isFeatured ? 'border-marketplace-accent border-2' : ''}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
          {isFeatured && (
            <Badge className="absolute top-2 left-2 bg-marketplace-accent text-white">
              Featured
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
            onClick={toggleFavorite}
          >
            <Heart 
              size={18} 
              className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          </div>
          <div className="text-marketplace-primary font-bold text-xl">
            ${price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{location}</div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2">
          <Badge variant="outline" className="bg-gray-100">{category}</Badge>
          <span className="text-xs text-gray-400">{date}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
