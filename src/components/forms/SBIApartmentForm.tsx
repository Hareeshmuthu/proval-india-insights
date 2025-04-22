
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import GeneralSection from "./sections/GeneralSection";
import ApartmentBuildingSection from "./sections/ApartmentBuildingSection";
import FlatSection from "./sections/FlatSection";
import MarketabilitySection from "./sections/MarketabilitySection";
import RateSection from "./sections/RateSection";
import CompositeRateSection from "./sections/CompositeRateSection";
import ValuationTableSection from "./sections/ValuationTableSection";

interface SBIApartmentFormProps {
  activeSection: string;
  projectData: any;
  updateFormData: (data: any) => void;
}

const SBIApartmentForm: React.FC<SBIApartmentFormProps> = ({ 
  activeSection, 
  projectData, 
  updateFormData 
}) => {
  const [place, setPlace] = useState("Coimbatore");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({
    // General section
    purpose: "",
    selectedDocs: [],
    ownerNameAddress: "",
    propertyDescription: "",
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
    undividedShareOfLand: "",
    layoutPlan: "",
    buildingPlan: "",
    completionCertificate: "",
    presentUse: "",
    proposedUse: "",
    otherInformation: "",
    encumbrances: "",
    
    // Building section
    natureOfApartment: "",
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
    builderName: "",
    buildingLocation: "",
    otherBuildingLocation: "",
    totalFloors: "",
    totalFlats: "",
    
    // Flat section
    floorSituated: "",
    customFloor: "",
    doorNoFlat: "",
    totalPlinthArea: "",
    roof: "",
    flooring: "",
    doors: "",
    windows: "",
    fittings: "",
    finishings: "",
    accommodationDetails: "",
    houseTax: "",
    assessmentNumber: "",
    taxPaidInNameOf: "",
    taxAmount: "",
    electricityServiceNumber: "",
    meterCardNameOf: "",
    waterConnectionNumber: "",
    waterConnectionNameOf: "",
    maintenanceOfFlat: "",
    carParkingAllotted: "",
    carParkingDetails: "",
    boundaryNorth: "",
    boundarySouth: "",
    boundaryEast: "",
    boundaryWest: "",
    
    // Marketability section
    marketability: "",
    factorsFavoring: "",
    negativeFactors: "",
    
    // Rate section
    buildingServicesAmenities: "",
    landDevelopmentGated: "",
    
    // Composite rate section
    depreciatedBuildingRate: "",
    replacementCost: "",
    ageOfBuilding: "",
    estimatedLifeOfBuilding: "",
    depreciationPercentage: "",
    depreciatedRateOfBuilding: "",
    totalCompositeValueBeforeValuation: "",
    depreciatedBuildingRateB: "",
    rateForLandOther: "",
    totalCompositeRate: "",
    
    // Valuation section
    valuationRows: [],
    place: "Coimbatore"
  });

  const [dates, setDates] = useState({
    inspection: new Date(),
    valuation: new Date(),
    report: new Date(),
    layoutPlan: new Date(),
    buildingPlanDate: new Date(),
    completionCertificateDate: new Date()
  });

  // Load saved form data from localStorage on initial load
  useEffect(() => {
    if (projectData) {
      const savedFormData = localStorage.getItem(`sbi_form_${activeSection}_${projectData.projectNumber}`);
      
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
      
      if (projectData.latitude && projectData.longitude) {
        setFormData(prev => ({
          ...prev,
          latitude: projectData.latitude,
          longitude: projectData.longitude
        }));
      }
    }
  }, [projectData, activeSection]);

  // Update parent component with form data when it changes
  useEffect(() => {
    updateFormData(formData);
  }, [formData, updateFormData]);

  // Sync some of the related fields
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

  return (
    <div className="print:text-sm text-[11px]">
      {/* Header only shown on print */}
      <div className="hidden print:block mb-2">
        <div className="text-[12px] mb-1 flex items-center gap-1">
          <span>Ref: SBI</span>
          <span className="border-b border-black px-1">
            {projectData?.projectNumber || ''}
          </span>
        </div>
        <div className="mb-0 font-semibold text-[12px]">TO,</div>
        <div className="mb-0 font-semibold flex gap-1 items-center text-[12px]">
          STATE BANK OF INDIA BRANCH: 
          <span className="border-b border-black px-1">
            {projectData?.bankBranch || 'Main Branch'}
          </span>, (
          <span className="border-b border-black px-1">
            {projectData?.city || 'Coimbatore'}
          </span>)
        </div>
        <div className="font-semibold text-center text-[12px]">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
      </div>
      
      {activeSection === "general" && (
        <GeneralSection 
          formData={formData} 
          handleInputChange={handleInputChange}
          dates={dates}
          handleDateChange={handleDateChange}
        />
      )}
      
      {activeSection === "building" && (
        <ApartmentBuildingSection 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "flat" && (
        <FlatSection 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "marketability" && (
        <MarketabilitySection 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "rate" && (
        <RateSection 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "composite" && (
        <CompositeRateSection 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
      )}
      
      {activeSection === "valuation" && (
        <ValuationTableSection 
          formData={formData} 
          handleInputChange={handleInputChange}
          projectData={projectData}
        />
      )}
    </div>
  );
};

export default SBIApartmentForm;
