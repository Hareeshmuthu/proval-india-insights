
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomDropdown } from "../form-components/CustomDropdown";
import { YearPicker } from "../form-components/YearPicker";

interface ApartmentBuildingSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const ApartmentBuildingSection = ({
  formData,
  handleInputChange
}: ApartmentBuildingSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">II. APARTMENT BUILDING</h2>
      <table className="w-full border border-gray-300 dark:border-gray-600">
        <tbody>
          {/* ... Building section fields */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">1</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Nature of the Apartment</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter nature of the apartment"
                value={formData.natureOfApartment}
                onChange={(e) => handleInputChange('natureOfApartment', e.target.value)}
              />
            </td>
          </tr>

          {/* Year of Construction */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">4</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Year of Construction</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <YearPicker 
                value={formData.yearOfConstruction} 
                onChange={(year) => handleInputChange('yearOfConstruction', year)} 
              />
            </td>
          </tr>

          {/* ... Add other apartment building section fields */}
        </tbody>
      </table>
    </div>
  );
};

export default ApartmentBuildingSection;
