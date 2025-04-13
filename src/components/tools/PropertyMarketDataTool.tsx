
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin, Search, TrendingUp, Home, Buildings, FileBarChart } from "lucide-react";
import { toast } from "sonner";

interface MarketDataResponse {
  marketRates: string;
  recentSales: string;
  comparables: string;
  marketTrends: string;
  areaDescription: string;
}

const PropertyMarketDataTool: React.FC = () => {
  const [coordinates, setCoordinates] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [marketData, setMarketData] = useState<MarketDataResponse | null>(null);

  // Simulated API call - in a real implementation, this would call your backend
  const fetchMarketData = async (searchType: 'coordinates' | 'address', searchValue: string) => {
    setIsLoading(true);
    setMarketData(null);

    try {
      // In a real implementation, this would be a call to your AI service
      // For now, we'll simulate a response with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample response data
      const sampleResponse: MarketDataResponse = {
        marketRates: `The average property rate in this area is ₹4,500 - ₹6,000 per sq.ft for apartments. 
        Independent houses command a premium of 15-20% over apartment rates. 
        Commercial properties in the vicinity average ₹7,500 - ₹9,000 per sq.ft.`,
        
        recentSales: `1. A 3BHK apartment (1,500 sq.ft) sold for ₹78 lakhs in March 2025
        2. A 2BHK apartment (1,100 sq.ft) sold for ₹62 lakhs in February 2025
        3. A commercial space (850 sq.ft) sold for ₹76 lakhs in January 2025`,
        
        comparables: `Similar Properties:
        - 2BHK Apartment (1,200 sq.ft): ₹65-70 lakhs
        - 3BHK Apartment (1,600 sq.ft): ₹80-90 lakhs
        - Villa (2,400 sq.ft): ₹1.4-1.6 crores
        - Commercial Space (1,000 sq.ft): ₹85-95 lakhs`,
        
        marketTrends: `The area has shown a steady appreciation of 6-8% annually over the past 3 years.
        Recent infrastructure developments have increased demand by approximately 12%.
        New construction activity has increased by 15% in the past year, indicating growing interest.`,
        
        areaDescription: `This area is a well-established residential locality with good connectivity to major commercial hubs.
        The neighborhood features several educational institutions, healthcare facilities, and shopping complexes.
        Public transportation is readily available, and the area is known for its relatively green surroundings and community parks.
        Recent infrastructure improvements include road widening and a new flyover, which have enhanced connectivity.`
      };
      
      setMarketData(sampleResponse);
      toast.success("Market data retrieved successfully");
    } catch (error) {
      console.error("Error fetching market data:", error);
      toast.error("Failed to retrieve market data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoordinatesSearch = () => {
    if (!coordinates.trim()) {
      toast.error("Please enter valid coordinates");
      return;
    }
    fetchMarketData('coordinates', coordinates);
  };

  const handleAddressSearch = () => {
    if (!address.trim()) {
      toast.error("Please enter a valid address");
      return;
    }
    fetchMarketData('address', address);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Property Market Data Tool</CardTitle>
          <CardDescription>
            Fetch market data based on coordinates or address to get insights on property values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="coordinates" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="coordinates">Coordinates</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            
            <TabsContent value="coordinates" className="space-y-4 mt-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter latitude, longitude (e.g., 13.0827, 80.2707)"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleCoordinatesSearch} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="mr-2 h-4 w-4" />
                  )}
                  Search
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="address" className="space-y-4 mt-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddressSearch} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Search
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Fetching market data...</span>
        </div>
      )}

      {marketData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Property Market Rates Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{marketData.marketRates}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileBarChart className="mr-2 h-5 w-5" />
                  Recent Sale Instances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{marketData.recentSales}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Buildings className="mr-2 h-5 w-5" />
                  Comparables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{marketData.comparables}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Market Trends and Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{marketData.marketTrends}</p>
              <Separator className="my-4" />
              <h3 className="text-lg font-medium mb-2">Area Description</h3>
              <p className="whitespace-pre-line">{marketData.areaDescription}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PropertyMarketDataTool;
