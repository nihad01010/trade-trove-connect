
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { favoriteService } from "@/services/favoriteService";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Favorites = () => {
  const { user } = useAuth();

  const { data: favorites, isLoading, error } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => favoriteService.getFavorites(user!.id),
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-marketplace-primary" />
          </div>
        )}
        
        {error && (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-red-500">Error loading your favorites. Please try again later.</p>
            </CardContent>
          </Card>
        )}
        
        {favorites && favorites.length === 0 && (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">
                You haven't added any listings to your favorites yet.
              </p>
            </CardContent>
          </Card>
        )}
        
        {favorites && favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                category={listing.category}
                image={listing.images[0] || "https://placehold.co/600x400/e2e8f0/1e293b.png?text=No+Image"}
                date={new Date(listing.created_at).toLocaleDateString()}
                isFeatured={listing.is_featured}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
