
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ValuationRowProps {
  row: {
    id: string;
    description: string;
    quantity: number;
    ratePerUnit: number;
    unit: string;
  };
  unitOptions: string[];
  updateRow: (id: string, field: string, value: any) => void;
  deleteRow: (id: string) => void;
}

const ValuationRow: React.FC<ValuationRowProps> = ({ row, unitOptions, updateRow, deleteRow }) => {
  const calculateRowValue = (quantity: number, ratePerUnit: number): number => {
    return (quantity * ratePerUnit) / 100000; // Lakhs
  };

  return (
    <tr className="dark:bg-gray-900">
      <td className="border border-gray-300 dark:border-gray-600 p-1 text-center align-middle text-[11px]">
        {row.id}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1 align-middle">
        <Input
          value={row.description}
          onChange={(e) => updateRow(row.id, 'description', e.target.value)}
          className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] py-[3px] px-2 h-[26px] leading-tight"
        />
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1 align-middle">
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={row.quantity}
          onChange={(e) => updateRow(row.id, 'quantity', parseFloat(e.target.value) || 0)}
          className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] py-[3px] px-2 h-[26px] leading-tight [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ MozAppearance: 'textfield' }}
        />
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1 align-middle">
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={row.ratePerUnit}
          onChange={(e) => updateRow(row.id, 'ratePerUnit', parseFloat(e.target.value) || 0)}
          className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] py-[3px] px-2 h-[26px] leading-tight [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ MozAppearance: 'textfield' }}
        />
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1 align-middle">
        <Select
          value={row.unit}
          onValueChange={(value) => {
            if (value === "custom") {
              const customVal = prompt("Enter custom unit:");
              if (customVal) {
                updateRow(row.id, 'unit', customVal);
              }
            } else {
              updateRow(row.id, 'unit', value);
            }
          }}>
          <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            {unitOptions.map((unit) => (
              <SelectItem key={unit} value={unit} className="text-[11px]">{unit}</SelectItem>
            ))}
            <SelectItem value="custom" className="text-[11px]">Custom...</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1 text-right align-middle text-[11px]">
        {calculateRowValue(row.quantity, row.ratePerUnit).toFixed(2)}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1 text-center align-middle">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteRow(row.id)}
          className="p-1 h-7 w-7"
        >
          <X className="h-3 w-3" />
        </Button>
      </td>
    </tr>
  );
};

export default ValuationRow;
