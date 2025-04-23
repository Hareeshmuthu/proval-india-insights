
import React from "react";
import GeneralSection from "./sections/GeneralSection";
import ApartmentBuildingSection from "./sections/ApartmentBuildingSection";
import FlatSection from "./sections/FlatSection";
import MarketabilitySection from "./sections/MarketabilitySection";
import RateSection from "./sections/RateSection";
import CompositeRateSection from "./sections/CompositeRateSection";
import ValuationTableSection from "./sections/ValuationTableSection";

interface SBIApartmentPrintFormProps {
  formData: any;
  projectData: any;
  userName?: string;
}

const SBIApartmentPrintForm: React.FC<SBIApartmentPrintFormProps> = ({
  formData,
  projectData,
  userName = ""
}) => (
  <div className="print:block hidden w-full print:w-full text-[11px] print:bg-white bg-white">
    {/* Print header on every page */}
    <div className="print-header print:fixed print:left-0 print:top-0 print:right-0 print:z-50 bg-white border-b border-gray-300 py-2 px-4 mb-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <div>
          Ref: SBI&nbsp;
          <span className="border-b border-black px-1">
            {projectData?.projectNumber || ""}
          </span>
        </div>
        <div>
          {userName ? (
            <>User: <span className="border-b border-black px-1">{userName}</span></>
          ) : null}
        </div>
        <div>
          {projectData?.customerName ? (
            <>Customer: <span className="border-b border-black px-1">{projectData.customerName}</span></>
          ) : null}
        </div>
      </div>
      <div className="mb-0 font-semibold text-xs">TO,</div>
      <div className="mb-0 font-semibold flex gap-1 items-center text-xs">
        STATE BANK OF INDIA BRANCH:
        <span className="border-b border-black px-1">
          {projectData?.bankBranch || "Main Branch"}
        </span>, (
        <span className="border-b border-black px-1">
          {projectData?.city || "Coimbatore"}
        </span>)
      </div>
      <div className="font-semibold text-center text-xs">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
    </div>

    {/* All sections, printed one after another, with zero extra whitespace */}
    <div className="pt-20 print:pt-20 print:px-2 print:bg-white">
      <div className="space-y-0">
        <GeneralSection
          formData={formData}
          handleInputChange={() => {}}
          dates={{}}
          handleDateChange={() => {}}
          printMode
        />
        <ApartmentBuildingSection
          formData={formData}
          handleInputChange={() => {}}
          printMode
        />
        <FlatSection
          formData={formData}
          handleInputChange={() => {}}
          printMode
        />
        <MarketabilitySection
          formData={formData}
          handleInputChange={() => {}}
          printMode
        />
        <RateSection
          formData={formData}
          handleInputChange={() => {}}
          printMode
        />
        <CompositeRateSection
          formData={formData}
          handleInputChange={() => {}}
          printMode
        />
        <ValuationTableSection
          formData={formData}
          handleInputChange={() => {}}
          projectData={projectData}
          printMode
        />
      </div>
    </div>

    {/* Print footer for page numbers */}
    <div className="print-footer print:fixed print:left-0 print:bottom-0 print:right-0 text-xs flex justify-end px-6 pb-2">
      <span className="mr-2">Page</span>
      <span className="print:after:content-[counter(page)]" />
    </div>
  </div>
);
export default SBIApartmentPrintForm;

