
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomDropdown } from "../form-components/CustomDropdown";

interface FlatSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FlatSection: React.FC<FlatSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">SBI - AP III. FLAT</h2>
      
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              1
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              The floor on which the flat is situated
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.floorSituated || ""}
                onValueChange={(value) => handleInputChange("floorSituated", value)}
              >
                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px]">
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ground">Ground Floor</SelectItem>
                  <SelectItem value="first">First Floor</SelectItem>
                  <SelectItem value="second">Second Floor</SelectItem>
                  <SelectItem value="third">Third Floor</SelectItem>
                  <SelectItem value="fourth">Fourth Floor</SelectItem>
                  <SelectItem value="fifth">Fifth Floor</SelectItem>
                  <SelectItem value="custom">Other (Specify)</SelectItem>
                </SelectContent>
              </Select>
              {formData.floorSituated === "custom" && (
                <Input 
                  type="text" 
                  className="w-full mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                  placeholder="Specify floor"
                  value={formData.customFloor || ""}
                  onChange={(e) => handleInputChange("customFloor", e.target.value)}
                />
              )}
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              2
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Door No. of the flat
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter door number of the flat"
                value={formData.doorNoFlat || ""}
                onChange={(e) => handleInputChange("doorNoFlat", e.target.value)}
              />
            </td>
          </tr>
          
          {/* Specifications */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={7}>
              3
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]" colSpan={2}>
              Specifications
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              a. Roof
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe roof"
                value={formData.roof || ""}
                onChange={(e) => handleInputChange("roof", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              b. Flooring
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe flooring"
                value={formData.flooring || ""}
                onChange={(e) => handleInputChange("flooring", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              c. Doors
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe doors"
                value={formData.doors || ""}
                onChange={(e) => handleInputChange("doors", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              d. Windows
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe windows"
                value={formData.windows || ""}
                onChange={(e) => handleInputChange("windows", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              e. Fittings
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe fittings"
                value={formData.fittings || ""}
                onChange={(e) => handleInputChange("fittings", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              f. Finishings
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe finishings"
                value={formData.finishings || ""}
                onChange={(e) => handleInputChange("finishings", e.target.value)}
              />
            </td>
          </tr>
          
          {/* House Tax */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={5}>
              4
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]" colSpan={2}>
              House Tax
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              a. House tax
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter house tax details"
                value={formData.houseTax || ""}
                onChange={(e) => handleInputChange("houseTax", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              b. Assessment Number
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter assessment number"
                value={formData.assessmentNumber || ""}
                onChange={(e) => handleInputChange("assessmentNumber", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              c. Tax Paid in the Name of
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter name of tax payer"
                value={formData.taxPaidInNameOf || ""}
                onChange={(e) => handleInputChange("taxPaidInNameOf", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              d. Tax Amount
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter tax amount"
                value={formData.taxAmount || ""}
                onChange={(e) => handleInputChange("taxAmount", e.target.value)}
              />
            </td>
          </tr>
          
          {/* Electricity Service */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={3}>
              5
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]" colSpan={2}>
              Electricity Service
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              a. Electricity Service Number
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter electricity service number"
                value={formData.electricityServiceNumber || ""}
                onChange={(e) => handleInputChange("electricityServiceNumber", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              b. Meter Card in the Name of
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter name on meter card"
                value={formData.meterCardNameOf || ""}
                onChange={(e) => handleInputChange("meterCardNameOf", e.target.value)}
              />
            </td>
          </tr>
          
          {/* Maintenance of Flat */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              6
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Maintenance of the flat
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Describe maintenance of the flat"
                value={formData.maintenanceOfFlat || ""}
                onChange={(e) => handleInputChange("maintenanceOfFlat", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlatSection;
