
import React from "react";
import ValuationTable from "../ValuationTable";
import { format } from "date-fns";

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
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">SBI - AP DETAILS OF VALUATION</h2>
      
      <ValuationTable />
      
      <div className="mt-8 print:mt-4">
        <div className="flex justify-between items-start">
          <div className="w-1/3">
            <p className="mb-1 text-[11px] dark:text-white">Date: {format(new Date(), "dd/MM/yyyy")}</p>
            <p className="mb-1 text-[11px] dark:text-white">Place: {formData.place || "Coimbatore"}</p>
          </div>
          <div className="w-1/3 text-center">
            <p className="text-[11px] dark:text-white border-b border-gray-400 px-2 py-1 w-full text-center dark:bg-gray-800 dark:border-gray-600">
              &nbsp;
            </p>
            <p className="text-[11px] dark:text-white">BANK'S APPROVED VALUER</p>
          </div>
          <div className="w-1/3 text-right">
            <p className="text-[11px] dark:text-white border-b border-gray-400 px-2 py-1 w-full text-center dark:bg-gray-800 dark:border-gray-600">
              &nbsp;
            </p>
            <p className="text-[11px] dark:text-white">BRANCH MANAGER</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationTableSection;
