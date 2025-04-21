
import React from 'react';
import { Input } from "@/components/ui/input";

interface ValueCalculationProps {
  totalValue: number;
  compelledSellerValue: number;
  setCompelledSellerValue: (value: number) => void;
}

const ValueCalculation: React.FC<ValueCalculationProps> = ({ 
  totalValue, 
  compelledSellerValue, 
  setCompelledSellerValue 
}) => {
  const calculateNetRealizableValue = (): number => {
    return totalValue - compelledSellerValue;
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
        <p className="text-sm dark:text-white text-[11px]">
          Net Realizable Value = Rs.{" "}
          <span className="font-semibold">{totalValue.toFixed(2)}</span> Lakhs - Rs.{" "}
          <Input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={compelledSellerValue}
            onChange={(e) => setCompelledSellerValue(parseFloat(e.target.value) || 0)}
            className="w-20 inline-block mx-1 px-2 py-0 h-6 text-[11px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            style={{ MozAppearance: 'textfield' }}
          />{" "}
          Lakhs (Less Compelled Seller) = Rs.{" "}
          <span className="font-semibold">{calculateNetRealizableValue().toFixed(2)}</span> Lakhs
        </p>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
        <p className="text-sm dark:text-white leading-relaxed text-[11px]">
          As a result of my appraisal and analysis, it is my considered opinion that the Net Realizable Value of the above property 
          in the prevailing condition with aforesaid specifications is Rs.{" "}
          <span className="font-semibold">{calculateNetRealizableValue().toFixed(2)}</span> Lakhs 
          (Rupees {numberToWords(calculateNetRealizableValue())} Lakhs Only)
        </p>
      </div>
    </div>
  );
};

const numberToWords = (num: number): string => {
  const value = num.toFixed(2);
  return value;
};

export default ValueCalculation;
