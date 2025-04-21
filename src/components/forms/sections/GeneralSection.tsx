
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectDropdown } from "../form-components/MultiSelectDropdown";
import { DatePicker } from "../form-components/DatePicker";
import { CustomDropdown } from "../form-components/CustomDropdown";

interface GeneralSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  dates: {
    inspection: Date;
    valuation: Date;
    report: Date;
    layoutPlan: Date;
  };
  handleDateChange: (dateType: string, date: Date) => void;
}

const GeneralSection = ({
  formData,
  handleInputChange,
  dates,
  handleDateChange
}: GeneralSectionProps) => {
  const docOptions = [
    'Copy of Sale Deed',
    'Copy of Settlement Deed',
    'Copy of Agreement Deed',
    'Copy of Patta',
    'Copy of Electricity Bill',
    'Copy of Property Tax Receipt'
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">I. GENERAL</h2>
      <table className="w-full border border-gray-300 dark:border-gray-600">
        <tbody>
          {/* Purpose for which the valuation is made */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">1</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Purpose for which the valuation is made</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter purpose for which the valuation is made" 
                rows={3}
                value={formData.purpose}
                onChange={e => handleInputChange('purpose', e.target.value)}
              ></Textarea>
            </td>
          </tr>

          {/* Date of inspection */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">2a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date of inspection</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.inspection} onChange={(date) => handleDateChange('inspection', date)} />
            </td>
          </tr>

          {/* Date on which the valuation is made */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">2b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date on which the valuation is made</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.valuation} onChange={(date) => handleDateChange('valuation', date)} />
            </td>
          </tr>

          {/* Date of Report */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">2c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date of Report</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.report} onChange={(date) => handleDateChange('report', date)} />
            </td>
          </tr>

          {/* List of documents produced for perusal */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">3</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">List of documents produced for perusal</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <MultiSelectDropdown 
                options={docOptions}
                value={formData.selectedDocs}
                onChange={(selected) => handleInputChange('selectedDocs', selected)}
                placeholder="Select documents"
              />
            </td>
          </tr>

          {/* Name of the owner(s) and address(es) */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">4</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Name of the owner(s) and address(es)</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter name of the owner(s) and address(es)" 
                rows={3}
              ></Textarea>
            </td>
          </tr>

          {/* Brief description of the property */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">5</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Brief description of the property</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter brief description of the property" 
                rows={3}
              ></Textarea>
            </td>
          </tr>

          {/* Plot No. / Survey No. */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Plot No. / Survey No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Door No. */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Door No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter door number" 
                value={formData.doorNo}
                onChange={(e) => handleInputChange('doorNo', e.target.value)}
              />
            </td>
          </tr>

          {/* T. S. No. / Village */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">T. S. No. / Village</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Ward / Taluka */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6d</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Ward / Taluka</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Mandal / District */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6e</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Mandal / District</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Date of issue and validity of layout plan */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6f</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date of issue and validity of layout plan</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.layoutPlan} onChange={(date) => handleDateChange('layoutPlan', date)} />
            </td>
          </tr>

          {/* Approved map issuing authority */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6g</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Approved map issuing authority</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter approved map issuing authority" 
              />
            </td>
          </tr>

          {/* Genuineness of the approved map verified */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6h</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Genuineness of the approved map verified</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Comments on authenticity of plan */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6i</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Comments on authenticity of plan</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter comments on authenticity of plan" 
              />
            </td>
          </tr>

          {/* Postal address of the property */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">7</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Postal address of the property</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter postal address of the property" 
                rows={3}
              ></Textarea>
            </td>
          </tr>

          {/* City / Town */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">8a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">City / Town</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter city/town" 
              />
            </td>
          </tr>

          {/* Residential Area */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">8b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Residential Area</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select>
                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select Yes or No" />
                </SelectTrigger>
                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>

          {/* Commercial Area */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">8c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Commercial Area</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select>
                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select Yes or No" />
                </SelectTrigger>
                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>

          {/* Industrial Area */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">8d</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Industrial Area</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select>
                <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select Yes or No" />
                </SelectTrigger>
                <SelectContent className="z-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>

          {/* Classification of area - High / Middle / Poor */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">9a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Classification of area - High / Middle / Poor</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Urban / Semi Urban / Rural */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">9b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Urban / Semi Urban / Rural</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Coming under Corporation / Panchayat / Municipality */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">10</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Coming under Corporation / Panchayat / Municipality</td>
            <td className="border p-2 align-top dark:border-gray-600">
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
            </td>
          </tr>

          {/* Latitude / Longitude */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">15</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Latitude, Longitude & Co-ordinates</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter coordinates" 
                value={formData.latitude ? `${formData.latitude}, ${formData.longitude}` : ''}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  if (parts.length === 2) {
                    handleInputChange('latitude', parts[0].trim());
                    handleInputChange('longitude', parts[1].trim());
                  } else {
                    handleInputChange('latitude', e.target.value);
                    handleInputChange('longitude', '');
                  }
                }}
              />
            </td>
          </tr>

          {/* Occupancy details */}
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">17</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Occupancy details</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <CustomDropdown
                options={['Owner', 'Rental']}
                value={formData.occupancyDetails}
                onChange={(value) => handleInputChange('occupancyDetails', value)}
                placeholder="Select occupancy details"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralSection;
