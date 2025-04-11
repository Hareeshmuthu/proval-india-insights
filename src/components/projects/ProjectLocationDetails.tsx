
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProjectMap from "./ProjectMap";

interface ProjectLocationDetailsProps {
  formData: {
    location: string;
    latitude: string;
    longitude: string;
    remarks: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleMarkerChange: (lat: string, lng: string) => void;
  handleAddressChange: (address: string) => void;
}

const ProjectLocationDetails = ({
  formData,
  handleInputChange,
  handleMarkerChange,
  handleAddressChange,
}: ProjectLocationDetailsProps) => {
  return (
    <>
      <div className="col-span-full space-y-2">
        <Label htmlFor="location">Location of Property</Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Property Address"
              className="mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="Latitude"
              />
              <Input
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="Longitude"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-full h-[300px] rounded-md overflow-hidden border">
        <ProjectMap 
          latitude={formData.latitude} 
          longitude={formData.longitude}
          onMarkerChange={handleMarkerChange}
          onAddressChange={handleAddressChange}
        />
      </div>
      
      <div className="col-span-full space-y-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          id="remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          placeholder="Enter any additional details about the project"
          className="min-h-[100px]"
        />
      </div>
    </>
  );
};

export default ProjectLocationDetails;
