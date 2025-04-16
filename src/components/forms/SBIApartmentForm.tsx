
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AddressSection } from "./sbi-apartment/AddressSection";
import { PropertyDetailsSection } from "./sbi-apartment/PropertyDetailsSection";
import { DateInputSection } from "./sbi-apartment/DateInputSection";
import { SignatureSection } from "./sbi-apartment/SignatureSection";
import { VerificationSection } from "./sbi-apartment/VerificationSection";
import { toast } from "sonner";

interface FormData {
  plotNo: string;
  surveyNo: string;
  doorNo: string;
  ward: string;
  village: string;
  mandal: string;
  taluka: string;
  district: string;
  purpose: string;
  typeOfStructure: string;
  maintenanceOfBuilding: string;
  factorsFavoring: string;
  [key: string]: any;
}

export default function SBIApartmentForm() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [projectData, setProjectData] = useState(null);
  
  const [formData, setFormData] = useState<FormData>({
    plotNo: '',
    surveyNo: '',
    doorNo: '',
    ward: '',
    village: '',
    mandal: '',
    taluka: '',
    district: '',
    purpose: '',
    typeOfStructure: '',
    maintenanceOfBuilding: '',
    factorsFavoring: '',
  });

  const [dates, setDates] = useState({
    inspection: new Date(),
    valuation: new Date(),
    report: new Date(),
    layoutPlan: new Date()
  });

  const [signatureDetails, setSignatureDetails] = useState({
    place: "",
    date: new Date(),
  });

  useEffect(() => {
    if (projectId) {
      const storedProjects = localStorage.getItem('proval_projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const project = projects.find((p: any) => p.projectNumber === Number(projectId));
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

  const handleInputChange = (field: string, value: any) => {
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
        <div className="font-semibold text-center dark:text-white">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
      </div>

      <div className="space-y-8">
        <AddressSection formData={formData} handleInputChange={handleInputChange} />
        <PropertyDetailsSection formData={formData} handleInputChange={handleInputChange} />
        <DateInputSection dates={dates} handleDateChange={handleDateChange} />
        <SignatureSection signatureDetails={signatureDetails} setSignatureDetails={setSignatureDetails} />
        <VerificationSection />
      </div>

      <style>
        {`
        @media print {
          button {
            display: none;
          }
        }
        
        textarea {
          min-height: 80px;
          resize: vertical;
          overflow: hidden;
        }
        
        .SelectContent {
          z-index: 50 !important;
        }
        `}
      </style>
    </div>
  );
}
