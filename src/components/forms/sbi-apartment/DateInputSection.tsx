
import React from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateInputSectionProps {
  dates: {
    inspection: Date;
    valuation: Date;
    report: Date;
    layoutPlan: Date;
  };
  handleDateChange: (dateType: keyof typeof dates, date: Date) => void;
}

export const DateInputSection = ({ dates, handleDateChange }: DateInputSectionProps) => {
  return (
    <div className="space-y-4">
      {(Object.keys(dates) as Array<keyof typeof dates>).map((dateType) => (
        <div key={dateType} className="flex items-center gap-2">
          <span className="text-sm font-medium dark:text-white capitalize">
            {dateType.replace(/([A-Z])/g, ' $1').trim()}:
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !dates[dateType] && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dates[dateType] ? format(dates[dateType], "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dates[dateType]}
                onSelect={(date) => date && handleDateChange(dateType, date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  );
};
