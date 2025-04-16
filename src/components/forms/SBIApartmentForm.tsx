import React, { useState, useEffect } from "react";
import { CalendarIcon, ChevronDown, Check } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import ValuationTable from './ValuationTable';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sbiFormFields = [
  {
    name: 'propertyAddress',
    label: 'Property Address',
    type: 'textarea',
    placeholder: 'Enter property address',
  },
  {
    name: 'locality',
    label: 'Locality',
    type: 'text',
    placeholder: 'Enter locality',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter city',
  },
  {
    name: 'state',
    label: 'State',
    type: 'text',
    placeholder: 'Enter state',
  },
  {
    name: 'pinCode',
    label: 'PIN Code',
    type: 'text',
    placeholder: 'Enter PIN code',
  },
  {
    name: 'propertyType',
    label: 'Property Type',
    type: 'select',
    options: ['Apartment', 'Independent House', 'Villa'],
    placeholder: 'Select property type',
  },
  {
    name: 'buildingName',
    label: 'Building Name',
    type: 'text',
    placeholder: 'Enter building name',
  },
  {
    name: 'apartmentNumber',
    label: 'Apartment Number',
    type: 'text',
    placeholder: 'Enter apartment number',
  },
  {
    name: 'totalFloors',
    label: 'Total Floors',
    type: 'number',
    placeholder: 'Enter total floors',
  },
  {
    name: 'floorNumber',
    label: 'Floor Number',
    type: 'number',
    placeholder: 'Enter floor number',
  },
  {
    name: 'facing',
    label: 'Facing',
    type: 'select',
    options: ['East', 'West', 'North', 'South'],
    placeholder: 'Select facing',
  },
  {
    name: 'constructionStatus',
    label: 'Construction Status',
    type: 'select',
    options: ['Under Construction', 'Ready to Move'],
    placeholder: 'Select construction status',
  },
  {
    name: 'yearOfConstruction',
    label: 'Year of Construction',
    type: 'year',
  },
  {
    name: 'carpetArea',
    label: 'Carpet Area (sq ft)',
    type: 'number',
    placeholder: 'Enter carpet area',
  },
  {
    name: 'builtUpArea',
    label: 'Built-up Area (sq ft)',
    type: 'number',
    placeholder: 'Enter built-up area',
  },
  {
    name: 'superBuiltUpArea',
    label: 'Super Built-up Area (sq ft)',
    type: 'number',
    placeholder: 'Enter super built-up area',
  },
  {
    name: 'amenities',
    label: 'Amenities',
    type: 'multi-select',
    options: ['Gym', 'Swimming Pool', 'Clubhouse', 'Garden', 'Play Area'],
    placeholder: 'Select amenities',
  },
  {
    name: 'parkingAvailable',
    label: 'Parking Available',
    type: 'checkbox',
  },
  {
    name: 'parkingType',
    label: 'Parking Type',
    type: 'select',
    options: ['Covered', 'Open'],
    placeholder: 'Select parking type',
    dependency: 'parkingAvailable',
  },
  {
    name: 'parkingSlots',
    label: 'Number of Parking Slots',
    type: 'number',
    placeholder: 'Enter number of parking slots',
    dependency: 'parkingAvailable',
  },
  {
    name: 'boundaryWall',
    label: 'Boundary Wall',
    type: 'checkbox',
  },
  {
    name: 'waterSource',
    label: 'Water Source',
    type: 'select',
    options: ['Municipal Corporation', 'Borewell', 'Both'],
    placeholder: 'Select water source',
  },
  {
    name: 'electricityBoard',
    label: 'Electricity Board',
    type: 'text',
    placeholder: 'Enter electricity board',
  },
  {
    name: 'sewerageSystem',
    label: 'Sewerage System',
    type: 'select',
    options: ['Open Drainage', 'Closed Drainage'],
    placeholder: 'Select sewerage system',
  },
  {
    name: 'approvingAuthority',
    label: 'Approving Authority',
    type: 'text',
    placeholder: 'Enter approving authority',
  },
  {
    name: 'nearbyInfrastructure',
    label: 'Nearby Infrastructure',
    type: 'textarea',
    placeholder: 'Enter nearby infrastructure details',
  },
  {
    name: 'marketValue',
    label: 'Market Value (Rs)',
    type: 'number',
    placeholder: 'Enter market value',
  },
  {
    name: 'distressValue',
    label: 'Distress Value (Rs)',
    type: 'number',
    placeholder: 'Enter distress value',
  },
  {
    name: 'guidanceValue',
    label: 'Guidance Value (Rs)',
    type: 'number',
    placeholder: 'Enter guidance value',
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter remarks',
  },
];

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const MultiSelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [selectedOptions, setSelectedOptions] = useState(value || []);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={selectedOptions.includes(option)}
            onCheckedChange={() => handleCheckboxChange(option)}
          />
          <label
            htmlFor={option}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

const YearPicker = ({ value, onChange }: { value: number | null, onChange: (year: number) => void }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <Select onValueChange={(year) => onChange(Number(year))} defaultValue={value?.toString()}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const DatePicker = ({ value, onChange }: { value: Date, onChange: (date: Date) => void }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default function SBIApartmentForm() {
  const [formData, setFormData] = useState({});
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [netRealizableValue, setNetRealizableValue] = useState(0);
  
  // Handler functions for form inputs
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Form sections and fields */}
      <div className="grid gap-6">
        {sbiFormFields.map((field) => (
          <div key={field.name}>
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                {field.type === 'text' && (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
                {field.type === 'textarea' && (
                  <Textarea
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
                {field.type === 'number' && (
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
                {field.type === 'select' && (
                  <CustomDropdown
                    options={field.options}
                    placeholder={field.placeholder}
                    onChange={(value) => handleInputChange(field.name, value)}
                  />
                )}
                {field.type === 'multi-select' && (
                  <MultiSelectDropdown
                    options={field.options}
                    placeholder={field.placeholder}
                    onChange={(value) => handleInputChange(field.name, value)}
                  />
                )}
                {field.type === 'checkbox' && (
                  <Checkbox
                    onCheckedChange={(checked) => handleInputChange(field.name, checked)}
                  />
                )}
                 {field.type === 'year' && (
                  <YearPicker
                    onChange={(year) => handleInputChange(field.name, year)}
                    value={formData[field.name] || null}
                  />
                )}
              </FormControl>
            </FormItem>
          </div>
        ))}
      </div>
      
      {/* ValuationTable component */}
      <ValuationTable />

      {/* Appraisal Statement */}
      <div className="mt-8">
        <p className="text-base leading-7">
          As a result of my appraisal and analysis, it is my considered opinion that the Net Realizable Value of the above property in the prevailing condition with aforesaid specifications is Rs. {netRealizableValue.toLocaleString()} Lakhs (Rupees {netRealizableValue.toLocaleString()} Only)
        </p>
      </div>

      {/* Signatures Section */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        {/* Left Side - Place and Date */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Place</label>
            <Input 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentDate ? format(currentDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && setCurrentDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Right Side - Valuer Signature */}
        <div className="text-right">
          <div className="h-24 border border-dashed border-gray-300 mb-2 rounded-md flex items-center justify-center text-gray-400">
            Signature Area
          </div>
          <p className="text-sm">Signature</p>
          <p className="text-sm text-gray-500">(Name and Official Seal of the Approved Valuer)</p>
        </div>
      </div>

      {/* Bank Manager Verification */}
      <Card className="mt-6">
        <CardContent className="pt-4">
          <p className="text-sm leading-6 mb-4">
            The undersigned has inspected the property detailed in the Valuation Report dated  ____________ on __________. We are satisfied that the fair and reasonable market value of the property is Rs.__________________ ( Rs. only)
          </p>
          
          <div className="flex justify-end mt-6">
            <div>
              <div className="h-24 border border-dashed border-gray-300 mb-2 rounded-md w-64 flex items-center justify-center text-gray-400">
                Signature Area
              </div>
              <p className="text-sm text-right">Signature</p>
              <p className="text-sm text-gray-500 text-right">(Name of the Bank Manager with office Seal)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
