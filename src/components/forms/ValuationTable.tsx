
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface ValuationRow {
  id: string;
  description: string;
  quantity: number;
  ratePerUnit: number;
  unit: string;
}

const unitOptions = ["Ft³", "M³", "Ft²", "M²", "Ft", "M", "Nos."];

const ValuationTable = () => {
  const [rows, setRows] = useState<ValuationRow[]>([
    { id: '1', description: '', quantity: 0, ratePerUnit: 0, unit: '' }
  ]);
  const [customUnit, setCustomUnit] = useState("");

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

  const updateRow = (id: string, field: keyof ValuationRow, value: any) => {
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
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Details of Valuation: (Valuation Inputs)</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-16">SI.No.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-1/2">Description</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-24">Qty.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-32">Rate per unit Rs.</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-24">Unit</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-32">Estimated value Rs.in Lakhs</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2 w-16">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="dark:bg-gray-900">
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                  {row.id}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  <Input
                    value={row.description}
                    onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                    className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  <Input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => updateRow(row.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  <Input
                    type="number"
                    value={row.ratePerUnit}
                    onChange={(e) => updateRow(row.id, 'ratePerUnit', parseFloat(e.target.value) || 0)}
                    className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  <Select
                    value={row.unit}
                    onValueChange={(value) => {
                      if (value === "custom") {
                        const customVal = prompt("Enter custom unit:");
                        if (customVal) {
                          updateRow(row.id, 'unit', customVal);
                          if (!unitOptions.includes(customVal)) {
                            setCustomUnit(customVal);
                          }
                        }
                      } else {
                        updateRow(row.id, 'unit', value);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom...</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">
                  {calculateRowValue(row.quantity, row.ratePerUnit).toFixed(2)}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRow(row.id)}
                    className="p-1 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
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
      </div>
    </div>
  );
};

export default ValuationTable;
