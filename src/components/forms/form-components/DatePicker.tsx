
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(value, "dd/MM/yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto z-50">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => date && onChange(date)}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};
