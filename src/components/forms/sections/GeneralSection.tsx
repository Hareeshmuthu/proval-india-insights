import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "../form-components/DatePicker";
import { MultiSelectDropdown } from "../form-components/MultiSelectDropdown";
import { CustomDropdown } from "../form-components/CustomDropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GeneralSectionProps {
  formData: any;
  dates: any;
  handleInputChange: (field: string, value: any) => void;
  handleDateChange: (dateType: string, date: Date) => void;
  docOptions: string[];
}

const GeneralSection = ({
  formData,
  dates,
  handleInputChange,
  handleDateChange,
  docOptions
}: GeneralSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">I. GENERAL</h2>
      <table className="w-full border border-gray-300 dark:border-gray-600">
        <tbody>
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
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">2a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date of inspection</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.inspection} onChange={(date) => handleDateChange('inspection', date)} />
            </td>
          </tr>
          
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">2b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date on which the valuation is made</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.valuation} onChange={(date) => handleDateChange('valuation', date)} />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">2c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date of Report</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.report} onChange={(date) => handleDateChange('report', date)} />
            </td>
          </tr>

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

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">4</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Name of the owner(s) and address(es)</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter owner names and addresses" 
                rows={3}
              />
            </td>
          </tr>

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

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">6f</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Date of issue and validity of layout plan</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <DatePicker value={dates.layoutPlan} onChange={(date) => handleDateChange('layoutPlan', date)} />
            </td>
          </tr>

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

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">7</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Postal address of the property</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Textarea className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" placeholder="Enter postal address of the property" rows={3}></Textarea>
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">8a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">City / Town</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter city / town" 
              />
            </td>
          </tr>

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

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">11</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Covered under enactments or notified area</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter details" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">12</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Boundaries of the property</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter boundaries of the property" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">13a</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Dimensions - North</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter dimension for north" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">13b</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Dimensions - South</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter dimension for south" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">13c</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Dimensions - East</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter dimension for east" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">13d</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Dimensions - West</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter dimension for west" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">13e</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">North-East Corner</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter North-East Corner" 
              />
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">14</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Extent of the site</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter extent of the site" 
              />
            </td>
          </tr>

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
            </td>
          </tr>

          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white">16</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white">Extent of site considered for valuation</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                placeholder="Enter extent of site considered for valuation" 
              />
            </td>
          </tr>

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
