
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddressSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

export const AddressSection = ({ formData, handleInputChange }: AddressSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input 
          type="text" 
          className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Plot No." 
          value={formData.plotNo}
          onChange={(e) => handleInputChange('plotNo', e.target.value)}
        />
        <span className="dark:text-white">/</span>
        <Input 
          type="text" 
          className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Survey No." 
          value={formData.surveyNo}
          onChange={(e) => handleInputChange('surveyNo', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Input 
          type="text" 
          className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Ward" 
          value={formData.ward}
          onChange={(e) => handleInputChange('ward', e.target.value)}
        />
        <span className="dark:text-white">/</span>
        <Input 
          type="text" 
          className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Taluka" 
          value={formData.taluka}
          onChange={(e) => handleInputChange('taluka', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Input 
          type="text" 
          className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="Mandal" 
          value={formData.mandal}
          onChange={(e) => handleInputChange('mandal', e.target.value)}
        />
        <span className="dark:text-white">/</span>
        <Input 
          type="text" 
          className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
          placeholder="District" 
          value={formData.district}
          onChange={(e) => handleInputChange('district', e.target.value)}
        />
      </div>
    </div>
  );
};
