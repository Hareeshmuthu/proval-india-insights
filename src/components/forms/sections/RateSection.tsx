
import React from "react";
import { Input } from "@/components/ui/input";

interface RateSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const RateSection: React.FC<RateSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">SBI - AP V. RATE</h2>
      
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              1
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Comparable rate in locality
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter comparable rate in locality"
                value={formData.comparableRate || ""}
                onChange={(e) => handleInputChange("comparableRate", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              2
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Adopted basic composite rate
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter adopted basic composite rate"
                value={formData.adoptedBasicRate || ""}
                onChange={(e) => handleInputChange("adoptedBasicRate", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={3}>
              3
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]" colSpan={2}>
              Break-up of rate
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              i. Building + Services + Amenities
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter building + services + amenities rate"
                value={formData.buildingServicesAmenities || ""}
                onChange={(e) => handleInputChange("buildingServicesAmenities", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              ii. Land + Development + Gated Community
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter land + development + gated community rate"
                value={formData.landDevelopmentGated || ""}
                onChange={(e) => handleInputChange("landDevelopmentGated", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              4
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Guideline rate from Registrar
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter guideline rate from Registrar"
                value={formData.guidelineRate || ""}
                onChange={(e) => handleInputChange("guidelineRate", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RateSection;
