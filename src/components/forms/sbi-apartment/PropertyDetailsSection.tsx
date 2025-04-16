
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PropertyDetailsSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

export const PropertyDetailsSection = ({ formData, handleInputChange }: PropertyDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <Select
        value={formData.typeOfStructure}
        onValueChange={(value) => handleInputChange('typeOfStructure', value)}
      >
        <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <SelectValue placeholder="Select structure type" />
        </SelectTrigger>
        <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <SelectItem value="Framed Structure">Framed Structure</SelectItem>
          <SelectItem value="Load Bearing Structure">Load Bearing Structure</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={formData.maintenanceOfBuilding}
        onValueChange={(value) => handleInputChange('maintenanceOfBuilding', value)}
      >
        <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <SelectValue placeholder="Select maintenance level" />
        </SelectTrigger>
        <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <SelectItem value="Good">Good</SelectItem>
          <SelectItem value="Average">Average</SelectItem>
          <SelectItem value="Poor">Poor</SelectItem>
        </SelectContent>
      </Select>

      <Textarea 
        className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
        placeholder="Enter factors favoring extra value" 
        rows={3}
        value={formData.factorsFavoring}
        onChange={(e) => handleInputChange('factorsFavoring', e.target.value)}
      />
    </div>
  );
};
