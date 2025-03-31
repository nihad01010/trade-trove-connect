
import Navbar from "@/components/Navbar";
import CreateListingForm from "@/components/CreateListingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const CreateListing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create a New Listing</h1>
          
          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Selling Tips</AlertTitle>
            <AlertDescription className="text-sm mt-2">
              <p>Good photos and detailed descriptions help your items sell faster.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <span className="font-medium block">Use clear photos</span>
                  <span className="text-xs">Show all angles of the item</span>
                </div>
                <div>
                  <span className="font-medium block">Be detailed</span>
                  <span className="text-xs">Include brand, condition, size</span>
                </div>
                <div>
                  <span className="font-medium block">Fair pricing</span>
                  <span className="text-xs">Research similar items</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateListingForm />
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              By posting this listing, you agree to our 
              <Button variant="link" className="px-1 h-auto">Terms of Service</Button>
              and
              <Button variant="link" className="px-1 h-auto">Community Guidelines</Button>
            </p>
            <p className="text-xs text-gray-400">
              TradeConnect reserves the right to remove listings that violate our policies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateListing;
