
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectDropdownProps {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder 
}) => {
  const [selectedItems, setSelectedItems] = useState(value || []);
  
  const toggleItem = (item: string) => {
    const newItems = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    
    setSelectedItems(newItems);
    onChange(newItems);
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            {selectedItems.length > 0 ? (
              <span className="truncate">{selectedItems.length} document{selectedItems.length !== 1 ? 's' : ''} selected</span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600" align="start">
          <div className="p-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                <Checkbox 
                  id={option} 
                  checked={selectedItems.includes(option)}
                  onCheckedChange={() => toggleItem(option)}
                />
                <label 
                  htmlFor={option}
                  className="text-sm cursor-pointer w-full"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      {selectedItems.length > 0 && (
        <div className="mt-2 space-y-1">
          {selectedItems.map(item => (
            <div key={item} className="flex items-center justify-between p-2 bg-muted rounded text-sm dark:bg-gray-700">
              <span>{item}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0" 
                onClick={() => toggleItem(item)}
              >
                <Check className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
