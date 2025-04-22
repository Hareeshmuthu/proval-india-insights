import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ValuationTable from "./ValuationTable";

const sbiFormFields = [
  {
    section: "I. GENERAL",
    fields: [
      { sn: "1", label: "Purpose for which the valuation is made" },
      { sn: "2a", label: "Date of inspection" },
      { sn: "2b", label: "Date on which the valuation is made" },
      { sn: "2c", label: "Date of Report" },
      { sn: "3", label: "List of documents produced for perusal" },
      { sn: "4", label: "Name of the owner(s) and address(es)" },
      { sn: "5", label: "Brief description of the property" },
      { sn: "6a", label: "Plot No. / Survey No." },
      { sn: "6b", label: "Door No." },
      { sn: "6c", label: "T. S. No. / Village" },
      { sn: "6d", label: "Ward / Taluka" },
      { sn: "6e", label: "Mandal / District" },
      { sn: "6f", label: "Date of issue and validity of layout plan" },
      { sn: "6g", label: "Approved map issuing authority" },
      { sn: "6h", label: "Genuineness of the approved map verified" },
      { sn: "6i", label: "Comments on authenticity of plan" },
      { sn: "7", label: "Postal address of the property" },
      { sn: "8a", label: "City / Town" },
      { sn: "8b", label: "Residential Area" },
      { sn: "8c", label: "Commercial Area" },
      { sn: "8d", label: "Industrial Area" },
      { sn: "9a", label: "Classification of area - High / Middle / Poor" },
      { sn: "9b", label: "Urban / Semi Urban / Rural" },
      { sn: "10", label: "Coming under Corporation / Panchayat / Municipality" },
      { sn: "11", label: "Covered under enactments or notified area" },
      { sn: "12", label: "Boundaries of the property" },
      { sn: "13a", label: "Dimensions - North" },
      { sn: "13b", label: "Dimensions - South" },
      { sn: "13c", label: "Dimensions - East" },
      { sn: "13d", label: "Dimensions - West" },
      { sn: "13e", label: "North-East Corner" },
      { sn: "14", label: "Extent of the site" },
      { sn: "15", label: "Latitude, Longitude & Co-ordinates" },
      { sn: "16", label: "Extent of site considered for valuation" },
      { sn: "17", label: "Occupancy details" }
    ]
  },
  {
    section: "II. APARTMENT BUILDING",
    fields: [
      { sn: "1", label: "Nature of the Apartment" },
      { sn: "2a", label: "T. S. No. / S.F. No./ Door No" },
      { sn: "2b", label: "Block No." },
      { sn: "2c", label: "Ward No." },
      { sn: "2d", label: "Village / Municipality / Corporation" },
      { sn: "2e", label: "Door No., Street / Road" },
      { sn: "3", label: "Description of the locality" },
      { sn: "4", label: "Year of Construction" },
      { sn: "5", label: "Type of Structure" },
      { sn: "6", label: "Number of Floors" },
      { sn: "7", label: "Number of Dwelling units" },
      { sn: "8", label: "Quality of Construction" },
      { sn: "9", label: "Appearance of the Building" },
      { sn: "10", label: "Maintenance of the Building" },
      { sn: "11a", label: "Lift" },
      { sn: "11b", label: "Protected Water Supply" },
      { sn: "11c", label: "Underground Sewerage" },
      { sn: "11d", label: "Car Parking" },
      { sn: "11e", label: "Compound wall" },
      { sn: "11f", label: "Pavement around Building" }
    ]
  },
  {
    section: "III. FLAT",
    fields: [
      { sn: "1", label: "The floor on which the flat is situated" },
      { sn: "2", label: "Door No. of the flat" },
      { sn: "3", label: "Specifications", subFields: [
        { sn: "3a", label: "Roof" },
        { sn: "3b", label: "Flooring" },
        { sn: "3c", label: "Doors" },
        { sn: "3d", label: "Windows" },
        { sn: "3e", label: "Fittings" },
        { sn: "3f", label: "Finishings" }
      ]},
      { sn: "4", label: "House Tax", subFields: [
        { sn: "4a", label: "House tax" },
        { sn: "4b", label: "Assessment Number" },
        { sn: "4c", label: "Tax Paid in the Name of" },
        { sn: "4d", label: "Tax Amount" }
      ]},
      { sn: "5", label: "Electricity Service Connection", subFields: [
        { sn: "5a", label: "Electricity Service Connection Number" },
        { sn: "5b", label: "Meter card is in the Name of" }
      ]},
      { sn: "6", label: "Maintenance of the flat" },
      { sn: "7", label: "Sale Deed executed in the name of" },
      { sn: "8", label: "Undivided land area" },
      { sn: "9", label: "Plinth Area" },
      { sn: "10", label: "Floor Space Index" },
      { sn: "11", label: "Carpet Area" },
      { sn: "12", label: "Is it Posh / I Class / Medium / Ordinary?" },
      { sn: "13", label: "Residential or Commercial Use" },
      { sn: "14", label: "Owner-occupied or Rented" },
      { sn: "15", label: "Rent details if rented" }
    ]
  },
  {
    section: "IV. MARKETABILITY",
    fields: [
      { sn: "1", label: "How is the marketability?" },
      { sn: "2", label: "Factors favoring extra value" },
      { sn: "3", label: "Negative factors affecting value" }
    ]
  },
  {
    section: "V. RATE",
    fields: [
      { sn: "1", label: "Comparable rate in locality" },
      { sn: "2", label: "Adopted basic composite rate" },
      { sn: "3", label: "Break-up of rate", subFields: [
        { sn: "i", label: "Building + Services + Amenities" },
        { sn: "ii", label: "Land + Development + Gated Community" }
      ]},
      { sn: "4", label: "Guideline rate from Registrar" }
    ]
  },
  {
    section: "VI. COMPOSITE RATE AFTER DEPRECIATION",
    fields: [
      { sn: "a", label: "Depreciated Building Rate", subFields: [
        { label: "Depreciated Building Rate" },
        { label: "Replacement Cost" },
        { label: "Age of the Building" },
        { label: "Estimated Life of the Building" },
        { label: "Depreciation Percentage" },
        { label: "Depreciated Rate of the Building" }
      ]},
      { sn: "b", label: "Total Composite Rate", subFields: [
        { label: "Total Composite value arrived before Valuation" },
        { label: "Depreciated building rate" },
        { label: "Rate for land & other" },
        { label: "Total Composite Rate" }
      ]}
    ]
  }
];

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
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
        <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]">
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
          className="mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]"
        />
      )}
    </div>
  );
};

const MultiSelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [selectedItems, setSelectedItems] = useState(value || []);
  
  const toggleItem = (item) => {
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
            className="w-full justify-between text-left font-normal dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]"
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

const YearPicker = ({ value, onChange }: { value: number | null, onChange: (year: number) => void }) => {
  const [open, setOpen] = useState(false);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px] py-[3px]"
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
              className="justify-center text-[11px] h-[26px] py-[3px]"
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DatePicker = ({ value, onChange }: { value: Date, onChange: (date: Date) => void }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white text-[11px] h-[26px] py-[3px]"
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

const SBIApartmentForm = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [projectData, setProjectData] = useState(null);
  
  const [formData, setFormData] = useState({
    purpose: "",
    selectedDocs: [],
    plotNo: "",
    surveyNo: "",
    doorNo: "",
    tsNo: "",
    village: "",
    ward: "",
    taluka: "",
    mandal: "",
    district: "",
    genuinenessVerified: "",
    latitude: "",
    longitude: "",
    occupancyDetails: "",
    
    tsNoSfNoDoorNo: "",
    blockNo: "",
    wardNo: "",
    villageMunicipalityCorp: "",
    doorNoStreetRoad: "",
    yearOfConstruction: null,
    typeOfStructure: "",
    qualityOfConstruction: "",
    appearanceOfBuilding: "",
    maintenanceOfBuilding: "",
    lift: "",
    protectedWaterSupply: "",
    undergroundSewerage: "",
    carParking: "",
    compoundWall: "",
    pavementAroundBuilding: "",
    
    doorNoFlat: "",
    roof: "",
    flooring: "",
    doors: "",
    windows: "",
    fittings: "",
    finishings: "",
    houseTax: "",
    assessmentNumber: "",
    taxPaidInNameOf: "",
    taxAmount: "",
    electricityServiceNumber: "",
    meterCardNameOf: "",
    maintenanceOfFlat: "",
    marketability: "",
    factorsFavoring: "",
    negativeFactors: "",
    buildingServicesAmenities: "",
    landDevelopmentGated: "",
    depreciatedBuildingRate: "",
    replacementCost: "",
    ageOfBuilding: "",
    estimatedLifeOfBuilding: "",
    depreciationPercentage: "",
    depreciatedRateOfBuilding: "",
    totalCompositeValueBeforeValuation: "",
    depreciatedBuildingRateB: "",
    rateForLandOther: "",
    totalCompositeRate: ""
  });

  const [dates, setDates] = useState({
    inspection: new Date(),
    valuation: new Date(),
    report: new Date(),
    layoutPlan: new Date()
  });
  
  const docOptions = [
    'Copy of Sale Deed',
    'Copy of Settlement Deed',
    'Copy of Agreement Deed',
    'Copy of Patta',
    'Copy of Electricity Bill',
    'Copy of Property Tax Receipt'
  ];

  useEffect(() => {
    if (projectId) {
      const storedProjects = localStorage.getItem('proval_projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const project = projects.find((p) => p.projectNumber === Number(projectId));
        if (project) {
          setProjectData(project);
          
          if (project.latitude && project.longitude) {
            setFormData(prev => ({
              ...prev,
              latitude: project.latitude,
              longitude: project.longitude
            }));
          }
        }
      }
    }
  }, [projectId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (dateType: keyof typeof dates, date: Date) => {
    setDates(prev => ({
      ...prev,
      [dateType]: date
    }));
  };

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tsNoSfNoDoorNo: `${prev.plotNo || ''}/${prev.surveyNo || ''}/${prev.doorNo || ''}`,
      wardNo: prev.ward,
      villageMunicipalityCorp: `${prev.village || ''}/${prev.mandal || ''}`,
      doorNoStreetRoad: prev.doorNo || '',
      doorNoFlat: prev.doorNo || ''
    }));
  }, [formData.plotNo, formData.surveyNo, formData.doorNo, formData.ward, formData.village, formData.mandal]);
  
  const renderSubfields = (subFields, parentField) => {
    return subFields.map((subField, idx) => (
      <tr key={`${parentField}-${idx}`} className="print:break-inside-avoid">
        <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
          {subField.sn || ""}
        </td>
        <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
          {subField.label}
        </td>
        <td className="border p-2 align-top dark:border-gray-600 text-[11px]">
          <Input 
            type="text" 
            className="w-full border px-2 py-[3px] rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px]" 
            placeholder={`Enter ${subField.label.toLowerCase()}`}
            value={
              parentField === "3" ? formData[subField.label.toLowerCase()] :
              parentField === "4" && subField.label === "House tax" ? formData.houseTax :
              parentField === "4" && subField.label === "Assessment Number" ? formData.assessmentNumber :
              parentField === "4" && subField.label === "Tax Paid in the Name of" ? formData.taxPaidInNameOf :
              parentField === "4" && subField.label === "Tax Amount" ? formData.taxAmount :
              parentField === "5" && subField.label === "Electricity Service Connection Number" ? formData.electricityServiceNumber :
              parentField === "5" && subField.label === "Meter card is in the Name of" ? formData.meterCardNameOf :
              ""
            }
            onChange={(e) => {
              if (parentField === "3") {
                handleInputChange(subField.label.toLowerCase(), e.target.value);
              } else if (parentField === "4") {
                if (subField.label === "House tax") handleInputChange("houseTax", e.target.value);
                else if (subField.label === "Assessment Number") handleInputChange("assessmentNumber", e.target.value);
                else if (subField.label === "Tax Paid in the Name of") handleInputChange("taxPaidInNameOf", e.target.value);
                else if (subField.label === "Tax Amount") handleInputChange("taxAmount", e.target.value);
              } else if (parentField === "5") {
                if (subField.label === "Electricity Service Connection Number") handleInputChange("electricityServiceNumber", e.target.value);
                else if (subField.label === "Meter card is in the Name of") handleInputChange("meterCardNameOf", e.target.value);
              }
            }}
          />
        </td>
      </tr>
    ));
  };

  const renderBreakupFields = (subFields) => {
    return subFields.map((subField, idx) => (
      <tr key={`breakup-${idx}`} className="print:break-inside-avoid">
        <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
          {subField.sn}
        </td>
        <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
          {subField.label}
        </td>
        <td className="border p-2 align-top dark:border-gray-600 text-[11px]">
          <Input 
            type="text" 
            className="w-full border px-2 py-[3px] rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px]" 
            placeholder={`Enter ${subField.label.toLowerCase()}`}
            value={
              subField.label === "Building + Services + Amenities" 
                ? formData.buildingServicesAmenities 
                : formData.landDevelopmentGated
            }
            onChange={(e) => {
              if (subField.label === "Building + Services + Amenities") {
                handleInputChange("buildingServicesAmenities", e.target.value);
              } else {
                handleInputChange("landDevelopmentGated", e.target.value);
              }
            }}
          />
        </td>
      </tr>
    ));
  };

  const renderDepreciationFields = (section) => {
    if (section.sn === "a") {
      return (
        <>
          {section.subFields.map((field, idx) => (
            <tr key={`depr-a-${idx}`} className="print:break-inside-avoid">
              {idx === 0 && (
                <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={section.subFields.length}>
                  {section.sn}
                </td>
              )}
              <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
                {field.label}
              </td>
              <td className="border p-2 align-top dark:border-gray-600 text-[11px]">
                <Input 
                  type="text" 
                  className="w-full border px-2 py-[3px] rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px]" 
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={
                    idx === 0 ? formData.depreciatedBuildingRate :
                    idx === 1 ? formData.replacementCost :
                    idx === 2 ? formData.ageOfBuilding :
                    idx === 3 ? formData.estimatedLifeOfBuilding :
                    idx === 4 ? formData.depreciationPercentage :
                    formData.depreciatedRateOfBuilding
                  }
                  onChange={(e) => {
                    if (idx === 0) handleInputChange("depreciatedBuildingRate", e.target.value);
                    else if (idx === 1) handleInputChange("replacementCost", e.target.value);
                    else if (idx === 2) handleInputChange("ageOfBuilding", e.target.value);
                    else if (idx === 3) handleInputChange("estimatedLifeOfBuilding", e.target.value);
                    else if (idx === 4) handleInputChange("depreciationPercentage", e.target.value);
                    else handleInputChange("depreciatedRateOfBuilding", e.target.value);
                  }}
                />
              </td>
            </tr>
          ))}
        </>
      );
    } else {
      return (
        <>
          {section.subFields.map((field, idx) => (
            <tr key={`depr-b-${idx}`} className="print:break-inside-avoid">
              {idx === 0 && (
                <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={section.subFields.length}>
                  {section.sn}
                </td>
              )}
              <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">
                {field.label}
              </td>
              <td className="border p-2 align-top dark:border-gray-600 text-[11px]">
                <Input 
                  type="text" 
                  className="w-full border px-2 py-[3px] rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px] h-[26px]" 
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={
                    idx === 0 ? formData.totalCompositeValueBeforeValuation :
                    idx === 1 ? formData.depreciatedBuildingRateB :
                    idx === 2 ? formData.rateForLandOther :
                    formData.totalCompositeRate
                  }
                  onChange={(e) => {
                    if (idx === 0) handleInputChange("totalCompositeValueBeforeValuation", e.target.value);
                    else if (idx === 1) handleInputChange("depreciatedBuildingRateB", e.target.value);
                    else if (idx === 2) handleInputChange("rateForLandOther", e.target.value);
                    else handleInputChange("totalCompositeRate", e.target.value);
                  }}
                />
              </td>
            </tr>
          ))}
        </>
      );
    }
  };

  return (
    <div className="print:text-sm text-[11px]">
      <div className="mb-2">
        <div className="text-[12px] mb-1 flex items-center gap-1">
          <span className="dark:text-white">Ref: SBI</span>
          <input 
            type="text" 
            placeholder="Enter reference number" 
            className="border px-1 py-0 rounded focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
            style={{ borderBottom: '1px solid', padding: 0 }} 
          />
        </div>
        <div className="mb-0 font-semibold text-[12px] dark:text-white">TO,</div>
        <div className="mb-0 font-semibold flex gap-1 items-center text-[12px] dark:text-white">
          STATE BANK OF INDIA BRANCH:
          <input 
            type="text" 
            placeholder="Branch name" 
            className="border px-1 py-0 rounded focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
            style={{ borderBottom: '1px solid', padding: 0 }} 
          />, (
          <input 
            type="text" 
            placeholder="City name" 
            className="border px-1 py-0 rounded focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
            style={{ borderBottom: '1px solid', padding: 0 }} 
          />)
        </div>
        <div className="font-semibold text-center text-[12px] dark:text-white">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
      </div>
      
      {sbiFormFields.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-2">
          <h2 className="text-[11px] font-semibold mb-1 dark:text-white">{section.section}</h2>
          <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
            <tbody>
              {section.fields.map((field, idx) => {
                if (field.subFields && section.section !== "VI. COMPOSITE RATE AFTER DEPRECIATION" && field.sn !== "3") {
                  if (field.sn === "3" && section.section === "V. RATE") {
                    return (
                      <React.Fragment key={idx}>
                        <tr className="print:break-inside-avoid">
                          <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]" rowSpan={field.subFields.length + 1}>
                            {field.sn}
                          </td>
                          <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]" colSpan={2}>
                            {field.label}
                          </td>
                        </tr>
                        {renderBreakupFields(field.subFields)}
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={idx}>
                        <tr className="print:break-inside-avoid">
                          <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">
                            {field.sn}
                          </td>
                          <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]" colSpan={2}>
                            {field.label}
                          </td>
                        </tr>
                        {renderSubfields(field.subFields, field.sn)}
                      </React.Fragment>
                    );
                  }
                } else if (section.section === "VI. COMPOSITE RATE AFTER DEPRECIATION") {
                  return renderDepreciationFields(field);
                } else {
                  return (
                    <tr key={idx} className="print:break-inside-avoid">
                      <td className={`border p-2 text-center align-top w-12 ${field.sn === "" ? "invisible" : ""} dark:border-gray-600 dark:text-white text-[11px]`}>{field.sn}</td>
                      <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">{field
