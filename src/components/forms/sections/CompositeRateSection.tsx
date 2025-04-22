
import React from "react";
import { Input } from "@/components/ui/input";

interface CompositeRateSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const CompositeRateSection: React.FC<CompositeRateSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">VI. COMPOSITE RATE AFTER DEPRECIATION</h2>
      
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          {/* Depreciated Building Rate Section */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white" rowSpan={6}>
              a
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Depreciated Building Rate
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter depreciated building rate"
                value={formData.depreciatedBuildingRate || ""}
                onChange={(e) => handleInputChange("depreciatedBuildingRate", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Replacement Cost
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter replacement cost"
                value={formData.replacementCost || ""}
                onChange={(e) => handleInputChange("replacementCost", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Age of the Building
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter age of the building"
                value={formData.ageOfBuilding || ""}
                onChange={(e) => handleInputChange("ageOfBuilding", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Estimated Life of the Building
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter estimated life of the building"
                value={formData.estimatedLifeOfBuilding || ""}
                onChange={(e) => handleInputChange("estimatedLifeOfBuilding", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Depreciation Percentage
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter depreciation percentage"
                value={formData.depreciationPercentage || ""}
                onChange={(e) => handleInputChange("depreciationPercentage", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Depreciated Rate of the Building
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter depreciated rate of the building"
                value={formData.depreciatedRateOfBuilding || ""}
                onChange={(e) => handleInputChange("depreciatedRateOfBuilding", e.target.value)}
              />
            </td>
          </tr>
          
          {/* Total Composite Rate Section */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white" rowSpan={4}>
              b
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Total Composite value arrived before Valuation
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter total composite value before valuation"
                value={formData.totalCompositeValueBeforeValuation || ""}
                onChange={(e) => handleInputChange("totalCompositeValueBeforeValuation", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Depreciated building rate
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter depreciated building rate"
                value={formData.depreciatedBuildingRateB || ""}
                onChange={(e) => handleInputChange("depreciatedBuildingRateB", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Rate for land & other
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter rate for land & other"
                value={formData.rateForLandOther || ""}
                onChange={(e) => handleInputChange("rateForLandOther", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
              Total Composite Rate
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter total composite rate"
                value={formData.totalCompositeRate || ""}
                onChange={(e) => handleInputChange("totalCompositeRate", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompositeRateSection;
