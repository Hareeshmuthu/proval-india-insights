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
  // ... keep existing form fields
];

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  // ... keep existing CustomDropdown component
};

const MultiSelectDropdown = ({ options, value, onChange, placeholder }) => {
  // ... keep existing MultiSelectDropdown component
};

const YearPicker = ({ value, onChange }: { value: number | null, onChange: (year: number) => void }) => {
  // ... keep existing YearPicker component
};

const DatePicker = ({ value, onChange }: { value: Date, onChange: (date: Date) => void }) => {
  // ... keep existing DatePicker component
};

const SBIApartmentForm = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [projectData, setProjectData] = useState(null);
  
  const [formData, setFormData] = useState({
    // ... keep existing form state
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
    // ... keep existing renderSubfields function
  };

  const renderBreakupFields = (subFields) => {
    // ... keep existing renderBreakupFields function
  };

  const renderDepreciationFields = (section) => {
    if (section.sn === "a") {
      return (
        <>
          {section.subFields.map((field, idx) => (
            <tr key={`depr-a-${idx}`} className="print:break-inside-avoid">
              {idx === 0 && (
                <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white" rowSpan={section.subFields.length}>
                  {section.sn}
                </td>
              )}
              <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
                {field.label}
              </td>
              <td className="border p-2 align-top dark:border-gray-600">
                <Input 
                  type="text" 
                  className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
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
                <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white" rowSpan={section.subFields.length}>
                  {section.sn}
                </td>
              )}
              <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">
                {field.label}
              </td>
              <td className="border p-2 align-top dark:border-gray-600">
                <Input 
                  type="text" 
                  className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
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

  const [place, setPlace] = useState("Coimbatore");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [valuerSignature, setValuerSignature] = useState("");
  const [branchManagerSignature, setBranchManagerSignature] = useState("");

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
              {section.fields.map((field, idx) => {
                if (field.subFields && section.section !== "VI. COMPOSITE RATE AFTER DEPRECIATION" && field.sn !== "3") {
                  if (field.sn === "3" && section.section === "V. RATE") {
                    return (
                      <React.Fragment key={idx}>
                        <tr className="print:break-inside-avoid">
                          <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white" rowSpan={field.subFields.length + 1}>
                            {field.sn}
                          </td>
                          <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white" colSpan={2}>
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
                          <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">
                            {field.sn}
                          </td>
                          <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white" colSpan={2}>
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
                      <td className={`border p-2 text-center align-top w-12 ${field.sn === "" ? "invisible" : ""} dark:border-gray-600 dark:text-white`}>{field.sn}</td>
                      <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">{field.label}</td>
                      <td className="border p-2 align-top dark:border-gray-600">
                        {(() => {
                          if (field.label === 'Purpose for which the valuation is made' || field.label === 'Brief description of the property') {
                            return <Textarea 
                                      className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                                      placeholder={`Enter ${field.label.toLowerCase()}`} 
                                      rows={3}
                                      value={field.label === 'Purpose for which the valuation is made' ? formData.purpose : ''}
                                      onChange={e => field.label === 'Purpose for which the valuation is made' ? handleInputChange('purpose', e.target.value) : null}
                                   ></Textarea>;
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
                              <MultiSelectDropdown 
                                options={docOptions}
                                value={formData.selectedDocs}
                                onChange={(selected) => handleInputChange('selectedDocs', selected)}
                                placeholder="Select documents"
                              />
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
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
                          } else if (field.label === 'Block No.') {
                            return (
                              <Input 
                                type="text" 
                                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                                placeholder="Enter block number" 
                                value={formData.blockNo}
                                onChange={(e) => handleInputChange('blockNo', e.target.value)}
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
                          } else if (field.label === 'Door No., Street / Road') {
                            return (
                              <Input 
                                type="text" 
                                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                                placeholder="Enter door no., street/road" 
                                value={formData.doorNoStreetRoad}
                                onChange={(e) => handleInputChange('doorNoStreetRoad', e.target.value)}
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
                          } else if (field.label === 'Quality of Construction' || field.label === 'Maintenance of the Building') {
                            const fieldKey = field.label === 'Quality of Construction' 
                              ? 'qualityOfConstruction' 
                              : 'maintenanceOfBuilding';
                            
                            return (
                              <CustomDropdown
                                options={['Good', 'Average', 'Poor']}
                                value={formData[fieldKey]}
                                onChange={(value) => handleInputChange(fieldKey, value)}
                                placeholder={`Select ${field.label.toLowerCase()}`}
                              />
                            );
                          } else if (field.label === 'Appearance of the Building') {
                            return (
                              <CustomDropdown
                                options={['Superior', 'Fair', 'Ugly']}
                                value={formData.appearanceOfBuilding}
                                onChange={(value) => handleInputChange('appearanceOfBuilding', value)}
                                placeholder="Select appearance of the building"
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
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
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectItem value="Corporation">Corporation</SelectItem>
                                  <SelectItem value="Panchayat">Panchayat</SelectItem>
                                  <SelectItem value="Municipality">Municipality</SelectItem>
                                </SelectContent>
                              </Select>
                            );
                          }
                          else if (field.label === 'The floor on which the flat is situated') {
                            return <Input type="text" className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" placeholder={`Enter ${field.label.toLowerCase()}`} />;
                          } else if (field.label === 'Door No. of the flat') {
                            return (
                              <Input 
                                type="text" 
                                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                                placeholder="Enter door number of the flat" 
                                value={formData.doorNoFlat}
                                onChange={(e) => handleInputChange('doorNoFlat', e.target.value)}
                              />
                            );
                          } else if (field.label === 'Maintenance of the flat') {
                            return (
                              <CustomDropdown
                                options={['Good', 'Average', 'Poor']}
                                value={formData.maintenanceOfFlat}
                                onChange={(value) => handleInputChange('maintenanceOfFlat', value)}
                                placeholder="Select maintenance level"
                              />
                            );
                          } else if (field.label === 'Is it Posh / I Class / Medium / Ordinary?') {
                            return (
                              <Select>
                                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectItem value="Posh">Posh</SelectItem>
                                  <SelectItem value="I Class">I Class</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="Ordinary">Ordinary</SelectItem>
                                </SelectContent>
                              </Select>
                            );
                          } else if (field.label === 'Residential or Commercial Use') {
                            return (
                              <Select>
                                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectValue placeholder="Select use type" />
                                </SelectTrigger>
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectItem value="Residential Use">Residential Use</SelectItem>
                                  <SelectItem value="Commercial Use">Commercial Use</SelectItem>
                                </SelectContent>
                              </Select>
                            );
                          } else if (field.label === 'Owner-occupied or Rented') {
                            return (
                              <Select>
                                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectValue placeholder="Select occupancy" />
                                </SelectTrigger>
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectItem value="Owner Occupied">Owner Occupied</SelectItem>
                                  <SelectItem value="Rented">Rented</SelectItem>
                                </SelectContent>
                              </Select>
                            );
                          }
                          else if (field.label === 'How is the marketability?') {
                            return (
                              <Select>
                                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectValue placeholder="Select marketability" />
                                </SelectTrigger>
                                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Average">Average</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            );
                          } else if (field.label === 'Factors favoring extra value' || field.label === 'Negative factors affecting value') {
                            const fieldKey = field.label === 'Factors favoring extra value' ? 'factorsFavoring' : 'negativeFactors';
                            return (
                              <Textarea 
                                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                                placeholder={`Enter ${field.label.toLowerCase()}`} 
                                rows={3}
                                value={formData[fieldKey]}
                                onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                              ></Textarea>
                            );
                          } else {
                            return <Input type="text" className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" placeholder={`Enter ${field.label.toLowerCase()}`} />;
                          }
                        })()}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      ))}

      <ValuationTable />

      <div className="my-8"></div>

      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold underline mr-2">Place:</span>
            <Input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="inline-block w-48 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <span className="font-semibold underline mr-2">Date:</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-48 justify-start text-left font-normal",
                    !currentDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(currentDate, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && setCurrentDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="text-right">
          <div className="mb-2 text-center">Signature</div>
          <div className="text-center">(Name and Official Seal of the Approved Valuer)</div>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-6 text-justify">
          The undersigned has inspected the property detailed in the Valuation Report dated ___________ on ___________. 
          We are satisfied that the fair and reasonable market value of the property is Rs.___________________ 
          (Rs. _______________________ only).
        </p>
        <div className="flex justify-end">
          <div className="text-right">
            <div className="mb-2 text-center">Signature</div>
            <div className="text-center">(Name of the Bank Manager with office Seal)</div>
          </div>
        </div>
      </div>

      <style>
        {`
        @media print {
          button {
            display: none;
          }
        }
        
        /* Style for dynamic height textareas */
        textarea {
          min-height: 80px;
          resize: vertical;
          overflow: hidden;
        }
        
        /* Style for z-index of dropdown content */
        .SelectContent {
          z-index: 50 !important;
        }
        `}
      </style>
    </div>
  );
};

export default SBIApartmentForm;
