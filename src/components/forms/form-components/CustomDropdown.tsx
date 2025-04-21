
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder 
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");
  
  useEffect(() => {
    if (value && !options.includes(value)) {
      setIsCustom(true);
      setCustomValue(value);
    } else {
      setIsCustom(false);
    }
  }, [value, options]);

  return (
    <div className="w-full">
      <Select 
        value={isCustom ? "custom" : value}
        onValueChange={(val) => {
          if (val === "custom") {
            setIsCustom(true);
            onChange(customValue || "");
          } else {
            setIsCustom(false);
            onChange(val);
          }
        }}
      >
        <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
          <SelectItem value="custom">Custom value...</SelectItem>
        </SelectContent>
      </Select>
      
      {isCustom && (
        <Input 
          value={customValue}
          onChange={(e) => {
            setCustomValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="Enter custom value..."
          className="mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      )}
    </div>
  );
};
