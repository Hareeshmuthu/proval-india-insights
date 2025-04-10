
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// You need to provide your own Mapbox token here
// In a real app, this should be stored in an environment variable
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1tYXBib3giLCJhIjoiY2s4c2hiNzN0MDBlMzNsdGtzbmJxYTUyeCJ9.lA_Gw-Bwisn7BS9Xf3zcGQ';

interface ProjectMapProps {
  latitude?: string;
  longitude?: string;
  onMarkerChange: (lat: string, lng: string) => void;
  onAddressChange?: (address: string) => void; 
}

const ProjectMap = ({ latitude, longitude, onMarkerChange, onAddressChange }: ProjectMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(MAPBOX_TOKEN);
  const { toast } = useToast();

  // Function to get address from coordinates (reverse geocoding)
  const getAddressFromCoordinates = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      
      const data = await response.json();
      
      if (data && data.features && data.features.length > 0) {
        const addressFeature = data.features[0];
        const placeName = addressFeature.place_name;
        
        // Update address if callback provided
        if (onAddressChange) {
          onAddressChange(placeName);
        }
        
        return placeName;
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
    
    return "";
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map if not already initialized
    if (!map.current) {
      if (!mapboxToken) {
        toast({
          title: "Mapbox token required",
          description: "Please enter your Mapbox token below to enable the map.",
          variant: "destructive"
        });
        return;
      }

      mapboxgl.accessToken = mapboxToken;
      
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [78.9629, 20.5937], // Center on India
          zoom: 4
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add a marker on click
        map.current.on('click', async (e) => {
          if (marker.current) marker.current.remove();
          
          marker.current = new mapboxgl.Marker()
            .setLngLat(e.lngLat)
            .addTo(map.current!);
          
          const lat = e.lngLat.lat.toFixed(6);
          const lng = e.lngLat.lng.toFixed(6);
          
          onMarkerChange(lat, lng);
          
          // Get address from coordinates
          await getAddressFromCoordinates(parseFloat(lng), parseFloat(lat));
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        toast({
          title: "Error initializing map",
          description: "Please check your Mapbox token and try again.",
          variant: "destructive"
        });
      }
    }

    // Update marker position if lat/lng provided
    if (map.current && latitude && longitude && parseFloat(latitude) && parseFloat(longitude)) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      
      // Remove existing marker
      if (marker.current) marker.current.remove();
      
      // Create new marker
      marker.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
      
      // Center map on marker
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14
      });
      
      // Get address from coordinates
      getAddressFromCoordinates(lng, lat);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, mapboxToken, onMarkerChange, onAddressChange, toast]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      toast({
        title: "Token updated",
        description: "Map will now initialize with your token."
      });
      
      // Reinitialize map with new token
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    }
  };

  if (!MAPBOX_TOKEN) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 h-full flex flex-col items-center justify-center">
        <MapPin className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">Mapbox Token Required</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
          A Mapbox token is required to display the map. You can get one for free at{" "}
          <a 
            href="https://www.mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            mapbox.com
          </a>
        </p>
        
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-2">
          <Input
            type="text"
            placeholder="Enter your Mapbox token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Set Token & Initialize Map
          </Button>
        </form>
      </div>
    );
  }

  return <div ref={mapContainer} className="h-full w-full" />;
};

export default ProjectMap;
