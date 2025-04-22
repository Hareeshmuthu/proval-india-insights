
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";

export interface YearPickerProps {
  value: number | null;
  onChange: (year: number) => void;
  className?: string;
}

export const YearPicker: React.FC<YearPickerProps> = ({ 
  value, 
  onChange,
  className
}) => {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const endYear = currentYear;
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index).reverse();
  
  const handleYearSelect = (year: number) => {
    onChange(year);
    setOpen(false);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between h-[26px] px-3 py-[3px] ${className || ""}`}
        >
          {value ? value.toString() : "Select year"}
          <Calendar className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="h-[300px] overflow-y-auto">
          <div className="grid grid-cols-3 gap-1 p-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={year === value ? "default" : "ghost"}
                className="h-8"
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
