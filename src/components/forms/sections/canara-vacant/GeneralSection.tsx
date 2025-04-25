
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "../../form-components/DatePicker";

interface GeneralSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const docOptions = [
  "Copy of Sale Deed",
  "Copy of Settlement Deed",
  "Copy of Agreement Deed",
  "Copy of PATTA",
  "Copy of Electricity Bill",
  "Copy of Property Tax Receipt"
];

const GeneralSection: React.FC<GeneralSectionProps> = ({
  formData,
  handleInputChange
}) => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        I. GENERAL
      </h2>
      
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">1</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Name of the reported owner(s) and their address(es) with Phone No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                value={formData.ownerDetails || ""}
                onChange={(e) => handleInputChange("ownerDetails", e.target.value)}
                placeholder="Enter owner details"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                rows={3}
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">2</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Purpose of Valuation</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                value={formData.purpose || ""}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                placeholder="Enter purpose of valuation"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                rows={3}
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">3</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Date of Valuation</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker
                value={formData.valuationDate || new Date()}
                onChange={(date) => handleInputChange("valuationDate", date)}
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">3</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Date of Inspection</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker
                value={formData.inspectionDate || new Date()}
                onChange={(date) => handleInputChange("inspectionDate", date)}
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">4</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">List of documents produced for perusal</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <select
                multiple
                className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                value={selectedDocs}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedDocs(selected);
                  handleInputChange("documents", selected);
                }}
              >
                {docOptions.map(doc => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td rowSpan={9} className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">5</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px] font-semibold">Location of the property</td>
            <td className="border p-2 align-top dark:border-gray-600"></td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Plot No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.plotNo || ""}
                onChange={(e) => handleInputChange("plotNo", e.target.value)}
                placeholder="Enter plot number"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Name of Nagar/Layout</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.nagarLayout || ""}
                onChange={(e) => handleInputChange("nagarLayout", e.target.value)}
                placeholder="Enter nagar/layout name"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">S.F.No/T.S.No./R.S.No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.sfNo || ""}
                onChange={(e) => handleInputChange("sfNo", e.target.value)}
                placeholder="Enter SF/TS/RS number"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Village / Block</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.villageBlock || ""}
                onChange={(e) => handleInputChange("villageBlock", e.target.value)}
                placeholder="Enter village/block"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Taluk / Ward</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.talukWard || ""}
                onChange={(e) => handleInputChange("talukWard", e.target.value)}
                placeholder="Enter taluk/ward"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Mandal/District/Municipality/Corporation</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.mandalDistrict || ""}
                onChange={(e) => handleInputChange("mandalDistrict", e.target.value)}
                placeholder="Enter mandal/district/municipality/corporation"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Postal Address of the Property with Pin Code</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea
                value={formData.postalAddress || ""}
                onChange={(e) => handleInputChange("postalAddress", e.target.value)}
                placeholder="Enter complete postal address"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                rows={3}
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td rowSpan={5} className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px] font-semibold">Boundaries</td>
            <td className="border p-2 align-top dark:border-gray-600"></td>
          </tr>

          {["North", "South", "East", "West"].map((direction) => (
            <tr key={direction} className="print:break-inside-avoid">
              <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Boundaries - {direction}</td>
              <td className="border p-2 align-top dark:border-gray-600">
                <Input
                  value={formData[`boundary${direction}`] || ""}
                  onChange={(e) => handleInputChange(`boundary${direction}`, e.target.value)}
                  placeholder={`Enter ${direction} boundary`}
                  className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                />
              </td>
            </tr>
          ))}

          <tr className="print:break-inside-avoid">
            <td rowSpan={6} className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">7</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px] font-semibold">Dimensions</td>
            <td className="border p-2 align-top dark:border-gray-600"></td>
          </tr>

          {["North", "South", "East", "West"].map((direction) => (
            <tr key={direction} className="print:break-inside-avoid">
              <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Dimensions - {direction}</td>
              <td className="border p-2 align-top dark:border-gray-600">
                <Input
                  value={formData[`dimension${direction}`] || ""}
                  onChange={(e) => handleInputChange(`dimension${direction}`, e.target.value)}
                  placeholder={`Enter ${direction} dimension`}
                  className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
                />
              </td>
            </tr>
          ))}

          <tr className="print:break-inside-avoid">
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">N-E Cross</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.neCross || ""}
                onChange={(e) => handleInputChange("neCross", e.target.value)}
                placeholder="Enter N-E Cross"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">8</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Extent of the site</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.siteExtent || ""}
                onChange={(e) => handleInputChange("siteExtent", e.target.value)}
                placeholder="Enter extent of the site"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">9</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Extent of the site considered for valuation</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input
                value={formData.siteExtentValuation || ""}
                onChange={(e) => handleInputChange("siteExtentValuation", e.target.value)}
                placeholder="Enter extent of the site for valuation"
                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralSection;
