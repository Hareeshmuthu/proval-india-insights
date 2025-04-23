
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MarketabilitySectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  printMode?: boolean; // Add printMode prop
}

const MarketabilitySection: React.FC<MarketabilitySectionProps> = ({
  formData,
  handleInputChange,
  printMode = false
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">SBI - AP IV. MARKETABILITY</h2>
      
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              1
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              How is the marketability?
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              {printMode ? (
                <div className="p-2 dark:text-white">{formData.marketability || ""}</div>
              ) : (
                <Textarea 
                  value={formData.marketability}
                  onChange={(e) => handleInputChange("marketability", e.target.value)}
                  placeholder="Describe the marketability..."
                  className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                />
              )}
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              2
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Factors favoring extra value
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              {printMode ? (
                <div className="p-2 dark:text-white">{formData.factorsFavoring || ""}</div>
              ) : (
                <Textarea 
                  value={formData.factorsFavoring}
                  onChange={(e) => handleInputChange("factorsFavoring", e.target.value)}
                  placeholder="List factors favoring extra value..."
                  className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                />
              )}
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
              3
            </td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
              Negative factors affecting value
            </td>
            <td className="border p-2 align-top dark:border-gray-600">
              {printMode ? (
                <div className="p-2 dark:text-white">{formData.negativeFactors || ""}</div>
              ) : (
                <Textarea 
                  value={formData.negativeFactors}
                  onChange={(e) => handleInputChange("negativeFactors", e.target.value)}
                  placeholder="List negative factors affecting value..."
                  className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarketabilitySection;
