import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "../form-components/DatePicker";
import { MultiSelectDropdown } from "../form-components/MultiSelectDropdown";

interface GeneralSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  dates: {
    inspection: Date;
    valuation: Date;
    report: Date;
    layoutPlan: Date;
  };
  handleDateChange: (dateType: string, date: Date) => void;
}

const docOptions = [
  'Copy of Sale Deed',
  'Copy of Settlement Deed',
  'Copy of Agreement Deed',
  'Copy of Patta',
  'Copy of Electricity Bill',
  'Copy of Property Tax Receipt'
];

const GeneralSection: React.FC<GeneralSectionProps> = ({
  formData,
  handleInputChange,
  dates,
  handleDateChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">SBI - AP I. GENERAL</h2>
      
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">1</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Purpose for which the valuation is made</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                placeholder="Enter purpose for valuation"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">2a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Date of inspection</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker 
                value={dates.inspection}
                onChange={(date) => handleDateChange("inspection", date)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">2b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Date on which the valuation is made</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker 
                value={dates.valuation}
                onChange={(date) => handleDateChange("valuation", date)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">2c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Date of Report</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker 
                value={dates.report}
                onChange={(date) => handleDateChange("report", date)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">3</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">List of documents produced for perusal</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <MultiSelectDropdown 
                options={docOptions}
                value={formData.selectedDocs}
                onChange={(value) => handleInputChange("selectedDocs", value)}
                placeholder="Select documents"
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">4</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Name of the owner(s) and address(es)</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                value={formData.ownerNameAddress || ""}
                onChange={(e) => handleInputChange("ownerNameAddress", e.target.value)}
                placeholder="Enter owner name and address"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">5</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Brief description of the property</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                value={formData.propertyDescription || ""}
                onChange={(e) => handleInputChange("propertyDescription", e.target.value)}
                placeholder="Enter brief description of the property"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Plot No. / Survey No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter plot no. / survey no."
                value={formData.plotNo}
                onChange={(e) => handleInputChange("plotNo", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Door No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter door no."
                value={formData.doorNo}
                onChange={(e) => handleInputChange("doorNo", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">T. S. No. / Village</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter T.S. No. / Village"
                value={formData.tsNo}
                onChange={(e) => handleInputChange("tsNo", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6d</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Ward / Taluka</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter Ward / Taluka"
                value={formData.ward}
                onChange={(e) => handleInputChange("ward", e.target.value)}
              />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6e</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Mandal / District</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]" 
                placeholder="Enter Mandal / District"
                value={formData.mandal}
                onChange={(e) => handleInputChange("mandal", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralSection;
