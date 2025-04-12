
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
      { sn: "3", label: "Specifications (Roof, Flooring, Doors, Windows, Fittings, Finishing)" },
      { sn: "4", label: "House Tax" },
      { sn: "5", label: "Electricity Service Connection No." },
      { sn: "6", label: "Maintenance of the flat" },
      { sn: "7", label: "Sale Deed executed in the name of" },
      { sn: "8", label: "Undivided land area" },
      { sn: "9", label: "Plinth Area" },
      { sn: "10", label: "Carpet Area" },
      { sn: "11", label: "Floor Space Index" },
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
      { sn: "3", label: "Break-up of rate: Building + Services + Land + Development" },
      { sn: "4", label: "Guideline rate from Registrar" }
    ]
  },
  {
    section: "VI. COMPOSITE RATE AFTER DEPRECIATION",
    fields: [
      { sn: "1", label: "Depreciated Building Rate" },
      { sn: "2", label: "Replacement Cost" },
      { sn: "3", label: "Age of the Building" },
      { sn: "4", label: "Estimated Life of the Building" },
      { sn: "5", label: "Depreciation Percentage" },
      { sn: "6", label: "Total Composite Rate" }
    ]
  }
];

// Custom dropdown component that allows both selection and custom input
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");
  
  useEffect(() => {
    // If the value is not in options, set it as custom
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
        <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
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

// Year picker component
const YearPicker = ({ value, onChange }: { value: number | null, onChange: (year: number) => void }) => {
  const [open, setOpen] = useState(false);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : <span className="text-muted-foreground">Select year</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 h-64 overflow-y-auto pointer-events-auto">
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

// Date picker component
const DatePicker = ({ value, onChange }: { value: Date, onChange: (date: Date) => void }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 dark:text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(value, "PPP")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto">
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

export default function SBIApartmentForm() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [projectData, setProjectData] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    // Section I
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
    
    // Section II
    tsNoSfNoDoorNo: "",
    wardNo: "",
    villageMunicipalityCorp: "",
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
    pavementAroundBuilding: ""
  });

  // Date states
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

  // Fetch project data (for location coordinates)
  useEffect(() => {
    if (projectId) {
      const storedProjects = localStorage.getItem('proval_projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const project = projects.find((p) => p.projectNumber === Number(projectId));
        if (project) {
          setProjectData(project);
          
          // Set default latitude and longitude if available
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

  // Handle form data changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle date changes
  const handleDateChange = (dateType: keyof typeof dates, date: Date) => {
    setDates(prev => ({
      ...prev,
      [dateType]: date
    }));
  };

  // Copy values from Section I to Section II
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tsNoSfNoDoorNo: `${prev.plotNo || ''}/${prev.surveyNo || ''}/${prev.doorNo || ''}`,
      wardNo: prev.ward,
      villageMunicipalityCorp: `${prev.village || ''}/${prev.mandal || ''}`
    }));
  }, [formData.plotNo, formData.surveyNo, formData.doorNo, formData.ward, formData.village, formData.mandal]);
  
  return (
    <div className="print:text-sm">
      <div className="mb-6">
        <div className="text-base mb-2 flex items-center gap-2">
          <span className="dark:text-white">Ref: SBI</span>
          <input 
            type="text" 
            placeholder="Enter reference number" 
            className="border px-2 py-1 rounded focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600" 
            style={{ borderBottom: '1px solid', padding: 0 }} 
          />
        </div>
        <div className="mb-1 font-semibold dark:text-white">TO,</div>
        <div className="mb-1 font-semibold flex gap-2 items-center dark:text-white">
          STATE BANK OF INDIA BRANCH:
          <input 
            type="text" 
            placeholder="Branch name" 
            className="border px-2 py-1 rounded focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600" 
            style={{ borderBottom: '1px solid', padding: 0 }} 
          />, (
          <input 
            type="text" 
            placeholder="City name" 
            className="border px-2 py-1 rounded focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600" 
            style={{ borderBottom: '1px solid', padding: 0 }} 
          />)
        </div>
        <div className="font-semibold text-center dark:text-white">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
      </div>
      
      {sbiFormFields.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">{section.section}</h2>
          <table className="w-full border border-gray-300 dark:border-gray-600">
            <tbody>
              {section.fields.map((field, idx) => (
                <tr key={idx} className="print:break-inside-avoid">
                  <td className={`border p-2 text-center align-top w-12 ${field.sn === "" ? "invisible" : ""} dark:border-gray-600 dark:text-white`}>{field.sn}</td>
                  <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">{field.label}</td>
                  <td className="border p-2 align-top dark:border-gray-600">
                    {(() => {
                      // Section I fields
                      if (field.label === 'Purpose for which the valuation is made' || field.label === 'Brief description of the property') {
                        return <Textarea className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" placeholder={`Enter ${field.label.toLowerCase()}`} rows={3}></Textarea>;
                      } else if (field.label === 'Date of inspection') {
                        return <DatePicker value={dates.inspection} onChange={(date) => handleDateChange('inspection', date)} />;
                      } else if (field.label === 'Date on which the valuation is made') {
                        return <DatePicker value={dates.valuation} onChange={(date) => handleDateChange('valuation', date)} />;
                      } else if (field.label === 'Date of Report') {
                        return <DatePicker value={dates.report} onChange={(date) => handleDateChange('report', date)} />;
                      } else if (field.label === 'Date of issue and validity of layout plan') {
                        return <DatePicker value={dates.layoutPlan} onChange={(date) => handleDateChange('layoutPlan', date)} />;
                      } else if (field.label === 'List of documents produced for perusal') {
                        return (
                          <Select>
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select documents" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              {docOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      } else if (field.label === 'Plot No. / Survey No.') {
                        return (
                          <div className="flex items-center gap-2">
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="Plot No." 
                              value={formData.plotNo}
                              onChange={(e) => handleInputChange('plotNo', e.target.value)}
                            />
                            <span className="dark:text-white">/</span>
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="Survey No." 
                              value={formData.surveyNo}
                              onChange={(e) => handleInputChange('surveyNo', e.target.value)}
                            />
                          </div>
                        );
                      } else if (field.label === 'Door No.') {
                        return (
                          <Input 
                            type="text" 
                            className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                            placeholder="Enter door number" 
                            value={formData.doorNo}
                            onChange={(e) => handleInputChange('doorNo', e.target.value)}
                          />
                        );
                      } else if (field.label === 'T. S. No. / Village') {
                        return (
                          <div className="flex items-center gap-2">
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="T.S. No." 
                              value={formData.tsNo}
                              onChange={(e) => handleInputChange('tsNo', e.target.value)}
                            />
                            <span className="dark:text-white">/</span>
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="Village" 
                              value={formData.village}
                              onChange={(e) => handleInputChange('village', e.target.value)}
                            />
                          </div>
                        );
                      } else if (field.label === 'Ward / Taluka') {
                        return (
                          <div className="flex items-center gap-2">
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="Ward" 
                              value={formData.ward}
                              onChange={(e) => handleInputChange('ward', e.target.value)}
                            />
                            <span className="dark:text-white">/</span>
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="Taluka" 
                              value={formData.taluka}
                              onChange={(e) => handleInputChange('taluka', e.target.value)}
                            />
                          </div>
                        );
                      } else if (field.label === 'Mandal / District') {
                        return (
                          <div className="flex items-center gap-2">
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="Mandal" 
                              value={formData.mandal}
                              onChange={(e) => handleInputChange('mandal', e.target.value)}
                            />
                            <span className="dark:text-white">/</span>
                            <Input 
                              type="text" 
                              className="w-1/2 border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                              placeholder="District" 
                              value={formData.district}
                              onChange={(e) => handleInputChange('district', e.target.value)}
                            />
                          </div>
                        );
                      } else if (field.label === 'Genuineness of the approved map verified') {
                        return (
                          <Select
                            value={formData.genuinenessVerified}
                            onValueChange={(value) => handleInputChange('genuinenessVerified', value)}
                          >
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select Yes or No" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else if (field.label === 'Latitude, Longitude & Co-ordinates') {
                        return (
                          <Input 
                            type="text" 
                            className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                            placeholder="Enter coordinates" 
                            value={formData.latitude ? `${formData.latitude}, ${formData.longitude}` : ''}
                            onChange={(e) => {
                              const parts = e.target.value.split(',');
                              if (parts.length === 2) {
                                setFormData(prev => ({
                                  ...prev,
                                  latitude: parts[0].trim(),
                                  longitude: parts[1].trim()
                                }));
                              } else {
                                // Just set the whole string as latitude if format isn't recognized
                                setFormData(prev => ({
                                  ...prev,
                                  latitude: e.target.value,
                                  longitude: ''
                                }));
                              }
                            }}
                          />
                        );
                      } else if (field.label === 'Occupancy details') {
                        return (
                          <CustomDropdown
                            options={['Owner', 'Rental']}
                            value={formData.occupancyDetails}
                            onChange={(value) => handleInputChange('occupancyDetails', value)}
                            placeholder="Select occupancy details"
                          />
                        );
                      } 
                      // Section II fields
                      else if (field.label === 'T. S. No. / S.F. No./ Door No') {
                        return (
                          <Input 
                            type="text" 
                            className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                            placeholder="Enter T.S. No. / S.F. No. / Door No." 
                            value={formData.tsNoSfNoDoorNo}
                            onChange={(e) => handleInputChange('tsNoSfNoDoorNo', e.target.value)}
                          />
                        );
                      } else if (field.label === 'Ward No.') {
                        return (
                          <Input 
                            type="text" 
                            className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                            placeholder="Enter ward number" 
                            value={formData.wardNo}
                            onChange={(e) => handleInputChange('wardNo', e.target.value)}
                          />
                        );
                      } else if (field.label === 'Village / Municipality / Corporation') {
                        return (
                          <Input 
                            type="text" 
                            className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                            placeholder="Enter village/municipality/corporation" 
                            value={formData.villageMunicipalityCorp}
                            onChange={(e) => handleInputChange('villageMunicipalityCorp', e.target.value)}
                          />
                        );
                      } else if (field.label === 'Year of Construction') {
                        return (
                          <YearPicker 
                            value={formData.yearOfConstruction} 
                            onChange={(year) => handleInputChange('yearOfConstruction', year)} 
                          />
                        );
                      } else if (field.label === 'Type of Structure') {
                        return (
                          <CustomDropdown
                            options={['Framed Structure', 'Load Bearing Structure']}
                            value={formData.typeOfStructure}
                            onChange={(value) => handleInputChange('typeOfStructure', value)}
                            placeholder="Select structure type"
                          />
                        );
                      } else if (field.label === 'Quality of Construction' || field.label === 'Maintenance of the Building' || field.label === 'Appearance of the Building') {
                        const fieldKey = field.label === 'Quality of Construction' 
                          ? 'qualityOfConstruction' 
                          : field.label === 'Maintenance of the Building' 
                            ? 'maintenanceOfBuilding' 
                            : 'appearanceOfBuilding';
                        
                        return (
                          <CustomDropdown
                            options={['Good', 'Average', 'Poor']}
                            value={formData[fieldKey]}
                            onChange={(value) => handleInputChange(fieldKey, value)}
                            placeholder={`Select ${field.label.toLowerCase()}`}
                          />
                        );
                      } else if (field.label === 'Lift' || field.label === 'Protected Water Supply' || 
                                field.label === 'Underground Sewerage' || field.label === 'Compound wall' || 
                                field.label === 'Pavement around Building') {
                        const fieldKey = field.label === 'Lift' 
                          ? 'lift' 
                          : field.label === 'Protected Water Supply' 
                            ? 'protectedWaterSupply' 
                            : field.label === 'Underground Sewerage'
                              ? 'undergroundSewerage'
                              : field.label === 'Compound wall'
                                ? 'compoundWall'
                                : 'pavementAroundBuilding';
                        
                        return (
                          <Select
                            value={formData[fieldKey]}
                            onValueChange={(value) => handleInputChange(fieldKey, value)}
                          >
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select Yes or No" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else if (field.label === 'Car Parking') {
                        return (
                          <Select
                            value={formData.carParking}
                            onValueChange={(value) => handleInputChange('carParking', value)}
                          >
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select parking type" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="Covered Parking">Covered Parking</SelectItem>
                              <SelectItem value="Open Parking">Open Parking</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else if (["Name of the owner(s) and address(es)", "Postal address of the property"].includes(field.label)) {
                        return <Textarea className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" placeholder={`Enter ${field.label.toLowerCase()}`} rows={3}></Textarea>;
                      } else if (["Residential Area", "Commercial Area", "Industrial Area"].includes(field.label)) {
                        return (
                          <Select>
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select Yes or No" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else if (field.label === 'Classification of area - High / Middle / Poor') {
                        return (
                          <Select>
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select classification" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Middle">Middle</SelectItem>
                              <SelectItem value="Poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else if (field.label === 'Urban / Semi Urban / Rural') {
                        return (
                          <Select>
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select area type" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="Urban">Urban</SelectItem>
                              <SelectItem value="Semi Urban">Semi Urban</SelectItem>
                              <SelectItem value="Rural">Rural</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else if (field.label === 'Coming under Corporation / Panchayat / Municipality') {
                        return (
                          <Select>
                            <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectValue placeholder="Select administrative body" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-600">
                              <SelectItem value="Corporation">Corporation</SelectItem>
                              <SelectItem value="Panchayat">Panchayat</SelectItem>
                              <SelectItem value="Municipality">Municipality</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      } else {
                        return <Input type="text" className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" placeholder={`Enter ${field.label.toLowerCase()}`} />;
                      }
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      
      <style>
        {`
        @media print {
          button {
            display: none;
          }
        }
        `}
      </style>
    </div>
  );
}
