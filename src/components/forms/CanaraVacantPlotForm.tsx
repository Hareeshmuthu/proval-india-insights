
import React, { useState, useEffect } from "react";
import GeneralSection from "./sections/canara-vacant/GeneralSection";
import CharacteristicsSection from "./sections/canara-vacant/CharacteristicsSection";
import ValuationSection from "./sections/canara-vacant/ValuationSection";
import CertificateSection from "./sections/canara-vacant/CertificateSection";

interface CanaraVacantPlotFormProps {
  activeSection: string;
  projectData: any;
  updateFormData: (data: any) => void;
}

const CanaraVacantPlotForm: React.FC<CanaraVacantPlotFormProps> = ({
  activeSection,
  projectData,
  updateFormData
}) => {
  const [formData, setFormData] = useState({
    // Form data will be initialized here
  });

  useEffect(() => {
    if (projectData) {
      const savedFormData = localStorage.getItem(`canara_form_${activeSection}_${projectData.projectNumber}`);
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData);
          setFormData(prev => ({
            ...prev,
            ...parsedData
          }));
        } catch (error) {
          console.error("Error parsing saved form data:", error);
        }
      }
    }
  }, [projectData, activeSection]);

  useEffect(() => {
    updateFormData(formData);
  }, [formData, updateFormData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="print:text-sm text-[11px]">
      {activeSection === "general" && (
        <GeneralSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "characteristics" && (
        <CharacteristicsSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "valuation" && (
        <ValuationSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "certificate" && (
        <CertificateSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default CanaraVacantPlotForm;
