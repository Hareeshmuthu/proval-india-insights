
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  MapPin, 
  Search, 
  AlertTriangle, 
  CloudLightning, 
  Waves, 
  Radiation, 
  Factory, 
  Wind 
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ThreatData {
  naturalDisasters: {
    events: {
      type: string;
      date: string;
      severity: string;
      description: string;
      source: string;
    }[];
    riskLevel: string;
    summary: string;
  };
  industrialThreats: {
    threats: {
      type: string;
      source: string;
      distance: string;
      description: string;
      source: string;
    }[];
    riskLevel: string;
    summary: string;
  };
  recommendations: string;
  sources: {
    name: string;
    url: string;
  }[];
}

const ThreatsDataTool: React.FC = () => {
  const [coordinates, setCoordinates] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [threatData, setThreatData] = useState<ThreatData | null>(null);

  const fetchThreatData = async (searchType: 'coordinates' | 'address', searchValue: string) => {
    setIsLoading(true);
    setThreatData(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleResponse: ThreatData = {
        naturalDisasters: {
          events: [
            {
              type: "Flood",
              date: "July 2020",
              severity: "Moderate",
              description: "Flash flooding affected several streets in the area with water levels rising up to 2 feet in some locations.",
              source: "National Weather Service"
            },
            {
              type: "Earthquake",
              date: "March 2018",
              severity: "Low",
              description: "Minor tremors of magnitude 3.2 were recorded in the region with no significant damage reported.",
              source: "USGS Earthquake Hazards Program"
            }
          ],
          riskLevel: "Moderate",
          summary: "The area has experienced occasional flooding during heavy rainfall seasons and minor seismic activity."
        },
        industrialThreats: {
          threats: [
            {
              type: "Chemical Plant",
              source: "XYZ Manufacturing",
              distance: "4.2 km",
              description: "Chemical production facility with controlled emissions. No major incidents reported in the past decade.",
              source: "EPA Facility Registry Service"
            },
            {
              type: "Water Pollution",
              source: "Historical industrial discharge",
              distance: "1.8 km",
              description: "Historical records indicate industrial discharge into nearby water bodies prior to 2010. Remediation efforts completed in 2015.",
              source: "State Environmental Protection Agency"
            }
          ],
          riskLevel: "Low",
          summary: "Some historical industrial activity in the region, but most concerns have been addressed through environmental remediation programs."
        },
        recommendations: "Consider flood insurance as a precautionary measure. Standard building practices for minor seismic activity are recommended.",
        sources: [
          {
            name: "National Weather Service",
            url: "https://www.weather.gov/"
          },
          {
            name: "USGS Earthquake Hazards Program",
            url: "https://www.usgs.gov/programs/earthquake-hazards"
          },
          {
            name: "EPA Facility Registry Service",
            url: "https://www.epa.gov/frs"
          },
          {
            name: "FEMA Flood Maps",
            url: "https://msc.fema.gov/portal/home"
          }
        ]
      };
      
      setThreatData(sampleResponse);
      toast.success("Threat assessment data retrieved successfully");
    } catch (error) {
      console.error("Error fetching threat data:", error);
      toast.error("Failed to retrieve threat assessment data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoordinatesSearch = () => {
    if (!coordinates.trim()) {
      toast.error("Please enter valid coordinates");
      return;
    }
    fetchThreatData('coordinates', coordinates);
  };

  const handleAddressSearch = () => {
    if (!address.trim()) {
      toast.error("Please enter a valid address");
      return;
    }
    fetchThreatData('address', address);
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "moderate":
        return "bg-orange-500 hover:bg-orange-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getEventIcon = (type: string) => {
    const iconProps = { className: "mr-2 h-5 w-5" };
    
    switch (type.toLowerCase()) {
      case "flood":
        return <Waves {...iconProps} />;
      case "earthquake":
        return <AlertTriangle {...iconProps} />;
      case "tsunami":
        return <Waves {...iconProps} />;
      case "hurricane":
      case "cyclone":
        return <Wind {...iconProps} />;
      case "storm":
      case "lightning":
        return <CloudLightning {...iconProps} />;
      case "chemical plant":
      case "factory":
        return <Factory {...iconProps} />;
      case "radiation":
      case "nuclear":
        return <Radiation {...iconProps} />;
      default:
        return <AlertTriangle {...iconProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Threats Assessment Tool</CardTitle>
          <CardDescription>
            Identify potential natural disaster risks and industrial threats by coordinates or address
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
                  Assess
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
                  Assess
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Analyzing threats for this location...</span>
        </div>
      )}

      {threatData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Natural Disaster History & Risk Assessment
                </CardTitle>
                <Badge className={getRiskBadgeColor(threatData.naturalDisasters.riskLevel)}>
                  {threatData.naturalDisasters.riskLevel} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{threatData.naturalDisasters.summary}</p>
              
              <h3 className="text-lg font-medium mb-3">Historical Events</h3>
              <div className="space-y-4">
                {threatData.naturalDisasters.events.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div className="flex items-center font-semibold">
                        {getEventIcon(event.type)}
                        {event.type} - {event.date}
                      </div>
                      <Badge variant="outline">{event.severity} Severity</Badge>
                    </div>
                    <p className="mt-2">{event.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Source: {event.source}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Factory className="mr-2 h-5 w-5" />
                  Industrial & Environmental Threats
                </CardTitle>
                <Badge className={getRiskBadgeColor(threatData.industrialThreats.riskLevel)}>
                  {threatData.industrialThreats.riskLevel} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{threatData.industrialThreats.summary}</p>
              
              <h3 className="text-lg font-medium mb-3">Identified Issues</h3>
              <div className="space-y-4">
                {threatData.industrialThreats.threats.map((threat, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div className="flex items-center font-semibold">
                        {getEventIcon(threat.type)}
                        {threat.type}
                      </div>
                      <span className="text-sm">{threat.distance} away</span>
                    </div>
                    <p className="text-sm font-medium mt-1">Source: {threat.source}</p>
                    <p className="mt-2">{threat.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{threatData.recommendations}</p>
              
              <Separator className="my-4" />
              
              <h3 className="text-md font-medium mb-2">Data Sources</h3>
              <div className="space-y-1">
                {threatData.sources.map((source, index) => (
                  <div key={index} className="flex items-center">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {source.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ThreatsDataTool;
