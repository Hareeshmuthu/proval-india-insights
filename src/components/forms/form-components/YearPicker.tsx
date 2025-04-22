
import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface YearPickerProps {
  value: number | null;
  onChange: (year: number) => void;
  className?: string; // Added className as an optional prop
}

export const YearPicker: React.FC<YearPickerProps> = ({ value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 ${className || ""}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : <span className="text-muted-foreground">Select year</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 h-64 overflow-y-auto pointer-events-auto z-50">
        <div className="grid grid-cols-3 gap-2 p-2">
          {years.map((year) => (
            <Button
              key={year}
              variant={year === value ? "default" : "ghost"}
              onClick={() => {
                onChange(year);
                setOpen(false);
              }}
              className="justify-center"
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
