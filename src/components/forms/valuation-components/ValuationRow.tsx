
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface ValuationRowData {
  id: string;
  description: string;
  quantity: number;
  ratePerUnit: number;
  unit: string;
}

interface ValuationRowProps {
  row: ValuationRowData;
  unitOptions: string[];
  onUpdate: (id: string, field: keyof ValuationRowData, value: any) => void;
  onDelete: (id: string) => void;
  calculateRowValue: (quantity: number, ratePerUnit: number) => number;
}

const ValuationRow: React.FC<ValuationRowProps> = ({ 
  row, 
  unitOptions, 
  onUpdate, 
  onDelete, 
  calculateRowValue 
}) => {
  return (
    <tr className="dark:bg-gray-900">
      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
        {row.id}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1">
        <Input
          value={row.description}
          onChange={(e) => onUpdate(row.id, 'description', e.target.value)}
          className="w-full h-8 px-2 py-1 text-[11px] dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-1">
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={row.quantity}
          onChange={(e) => onUpdate(row.id, 'quantity', parseFloat(e.target.value) || 0)}
          className="w-full h-8 px-2 py-1 text-[11px] dark:bg-gray-800 dark:text-white dark:border-gray-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ MozAppearance: 'textfield' }}
        />
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-2">
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={row.ratePerUnit}
          onChange={(e) => onUpdate(row.id, 'ratePerUnit', parseFloat(e.target.value) || 0)}
          className="w-full h-8 px-2 py-1 text-[11px] dark:bg-gray-800 dark:text-white dark:border-gray-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          style={{ MozAppearance: 'textfield' }}
        />
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-2">
        <Select
          value={row.unit}
          onValueChange={(value) => {
            if (value === "custom") {
              const customVal = prompt("Enter custom unit:");
              if (customVal) {
                onUpdate(row.id, 'unit', customVal);
              }
            } else {
              onUpdate(row.id, 'unit', value);
            }
          }}
        >
          <SelectTrigger className="w-full h-8 text-[11px] dark:bg-gray-800 dark:text-white dark:border-gray-600">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent className="z-50">
            {unitOptions.map((unit) => (
              <SelectItem key={unit} value={unit} className="text-[11px]">
                {unit}
              </SelectItem>
            ))}
            <SelectItem value="custom" className="text-[11px]">Custom...</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-[11px]">
        {calculateRowValue(row.quantity, row.ratePerUnit).toFixed(2)}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(row.id)}
          className="p-1 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};

export default ValuationRow;
