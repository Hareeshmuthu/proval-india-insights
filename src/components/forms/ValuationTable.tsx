
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ValuationRow from './valuation-components/ValuationRow';
import ValueCalculation from './valuation-components/ValueCalculation';

interface ValuationRowData {
  id: string;
  description: string;
  quantity: number;
  ratePerUnit: number;
  unit: string;
}

const unitOptions = ["Ft³", "M³", "Ft²", "M²", "Ft", "M", "Nos."];

const ValuationTable = () => {
  const [rows, setRows] = useState<ValuationRowData[]>([
    { id: '1', description: '', quantity: 0, ratePerUnit: 0, unit: '' }
  ]);
  const [customUnit, setCustomUnit] = useState("");
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

  const updateRow = (id: string, field: keyof ValuationRowData, value: any) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  const calculateRowValue = (quantity: number, ratePerUnit: number): number => {
    return (quantity * ratePerUnit) / 100000; // Converting to Lakhs
  };

  const calculateTotal = (): number => {
    return rows.reduce((total, row) => total + calculateRowValue(row.quantity, row.ratePerUnit), 0);
  };

  return (
    <div className="mt-8 text-[11px]">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Details of Valuation: (Valuation Inputs)</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-12">SI.No.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-1/3">Description</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-32">Qty.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-32">Rate per unit Rs.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-24">Unit</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-32">Estimated value Rs.in Lakhs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <ValuationRow
                key={row.id}
                row={row}
                unitOptions={unitOptions}
                onUpdate={updateRow}
                onDelete={deleteRow}
                calculateRowValue={calculateRowValue}
              />
            ))}
            <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
              <td colSpan={6} className="border border-gray-300 dark:border-gray-600 p-2">
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span>{calculateTotal().toFixed(2)}</span>
                </div>
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addRow}
                  className="p-1 h-8 w-8"
                >
                  +
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <ValueCalculation 
          totalValue={calculateTotal()} 
          compelledSellerValue={compelledSellerValue}
          setCompelledSellerValue={setCompelledSellerValue}
        />
      </div>
    </div>
  );
};

export default ValuationTable;
