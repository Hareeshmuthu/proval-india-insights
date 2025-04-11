
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectPropertyDetailsProps {
  formData: {
    propertyType: string;
    remarks: string;
  };
  handleSelectChange: (name: string, value: string) => void;
}

const ProjectPropertyDetails = ({
  formData,
  handleSelectChange,
}: ProjectPropertyDetailsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="propertyType">Type of Property *</Label>
        <Select 
          value={formData.propertyType} 
          onValueChange={(value) => handleSelectChange('propertyType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vacant Plot">Vacant Plot</SelectItem>
            <SelectItem value="Residential House">Residential House</SelectItem>
            <SelectItem value="Apartment Flat">Apartment Flat</SelectItem>
            <SelectItem value="Industry">Industry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ProjectPropertyDetails;
