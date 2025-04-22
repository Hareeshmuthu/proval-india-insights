
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ValuationRow from "./valuation/ValuationRow";
import { numberToWords, calculateRowValue, calculateTotal } from "./valuation/valuationUtils";

const unitOptions = ["Ft³", "M³", "Ft²", "M²", "Ft", "M", "Nos."];

const ValuationTable = () => {
  const [rows, setRows] = useState([
    { id: '1', description: '', quantity: 0, ratePerUnit: 0, unit: '' }
  ]);
  const [compelledSellerValue, setCompelledSellerValue] = useState<number>(0);

  const addRow = () => {
    setRows([...rows, {
      id: (rows.length + 1).toString(),
      description: '',
      quantity: 0,
      ratePerUnit: 0,
      unit: ''
    }]);
  };

  const deleteRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const updateRow = (id: string, field: string, value: any) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  const calculateNetRealizableValue = () => calculateTotal(rows) - compelledSellerValue;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white text-[13px]">Details of Valuation: (Valuation Inputs)</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-[11px]">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 p-1 w-12">SI.No.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1 w-1/3">Description</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1 w-32">Qty.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1 w-32">Rate per unit Rs.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1 w-24">Unit</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1 w-32">Estimated value Rs.in Lakhs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) =>
              <ValuationRow
                key={row.id}
                row={row}
                unitOptions={unitOptions}
                updateRow={updateRow}
                deleteRow={deleteRow}
              />
            )}
            <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
              <td colSpan={6} className="border border-gray-300 dark:border-gray-600 p-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px]">Total</span>
                  <span className="text-[11px]">{calculateTotal(rows).toFixed(2)}</span>
                </div>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addRow}
                  className="p-1 h-7 w-7 text-[11px]"
                >
                  +
                </Button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-3 space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-[11px]">
            <p className="text-[11px] dark:text-white">
              Net Realizable Value = Rs.{" "}
              <span className="font-semibold">{calculateTotal(rows).toFixed(2)}</span> Lakhs - Rs.{" "}
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={compelledSellerValue}
                onChange={(e) => setCompelledSellerValue(parseFloat(e.target.value) || 0)}
                className="w-16 inline-block mx-1 px-2 py-[3px] h-[24px] text-[11px] leading-tight align-middle [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ MozAppearance: 'textfield' }}
              />{" "}
              Lakhs (Less Compelled Seller) = Rs.{" "}
              <span className="font-semibold">{calculateNetRealizableValue().toFixed(2)}</span> Lakhs
            </p>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-[11px]">
            <p className="text-[11px] dark:text-white leading-relaxed">
              As a result of my appraisal and analysis, it is my considered opinion that the Net Realizable Value of the above property
              in the prevailing condition with aforesaid specifications is Rs.{" "}
              <span className="font-semibold">{calculateNetRealizableValue().toFixed(2)}</span> Lakhs
              (Rupees {numberToWords(calculateNetRealizableValue())} Lakhs Only)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationTable;
