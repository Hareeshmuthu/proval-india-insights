
import React from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SignatureSectionProps {
  signatureDetails: {
    place: string;
    date: Date;
  };
  setSignatureDetails: React.Dispatch<React.SetStateAction<{
    place: string;
    date: Date;
  }>>;
}

export const SignatureSection = ({ signatureDetails, setSignatureDetails }: SignatureSectionProps) => {
  return (
    <div className="mt-8 flex justify-between items-start">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium dark:text-white">Place:</span>
          <Input
            type="text"
            className="w-[200px] dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Enter place"
            value={signatureDetails.place}
            onChange={(e) => setSignatureDetails(prev => ({ ...prev, place: e.target.value }))}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium dark:text-white">Date:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !signatureDetails.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {signatureDetails.date ? format(signatureDetails.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={signatureDetails.date}
                onSelect={(date) => date && setSignatureDetails(prev => ({ ...prev, date }))}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="text-center">
        <div className="w-[300px] h-[100px] border rounded border-dashed flex items-center justify-center dark:border-gray-600">
          <span className="text-muted-foreground text-sm">Signature Here</span>
        </div>
        <p className="mt-2 text-sm dark:text-white">(Name and Official Seal of the Approved Valuer)</p>
      </div>
    </div>
  );
};
