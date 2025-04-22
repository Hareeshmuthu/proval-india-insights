
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ValuationTable from "../ValuationTable";
import { Input } from "@/components/ui/input";
import { calculateTotal, numberToWords } from "../valuation/valuationUtils";

interface ValuationTableSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  projectData: any;
}

const ValuationTableSection: React.FC<ValuationTableSectionProps> = ({
  formData,
  handleInputChange,
  projectData
}) => {
  const [valuationRows, setValuationRows] = useState(formData.valuationRows || []);
  const [valuationNotes, setValuationNotes] = useState(formData.valuationNotes || "");
  const [grandTotal, setGrandTotal] = useState(formData.grandTotal || "");

  // Update parent form data when local state changes
  React.useEffect(() => {
    handleInputChange("valuationRows", valuationRows);
    handleInputChange("valuationNotes", valuationNotes);
    handleInputChange("grandTotal", grandTotal);
  }, [valuationRows, valuationNotes, grandTotal, handleInputChange]);

  // Calculate grand total when rows change
  React.useEffect(() => {
    if (valuationRows && valuationRows.length > 0) {
      const total = calculateTotal(valuationRows);
      setGrandTotal(total.toFixed(2));
    }
  }, [valuationRows]);

  // Need to convert the ValuationTable component to be controlled by this component
  // For now this is a simplified implementation
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">VII. DETAILS OF VALUATION</h2>
      
      <ValuationTable />
      
      <div className="space-y-2 mt-6">
        <h3 className="font-semibold text-md dark:text-white">VALUATION SUMMARY</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-1 dark:text-white">Total Estimated Value:</p>
            <div className="flex items-center">
              <span className="text-sm dark:text-white">₹</span>
              <Input 
                value={grandTotal}
                onChange={(e) => setGrandTotal(e.target.value)}
                className="ml-1 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1 dark:text-white">In Words:</p>
            <p className="text-sm border p-2 rounded dark:text-white dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              {numberToWords(parseFloat(grandTotal || "0"))} Lakhs Only
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-1 dark:text-white">Notes:</p>
          <textarea
            value={valuationNotes}
            onChange={(e) => setValuationNotes(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Add any additional notes or observations about the valuation..."
          />
        </div>
      </div>
    </div>
  );
};

export default ValuationTableSection;
