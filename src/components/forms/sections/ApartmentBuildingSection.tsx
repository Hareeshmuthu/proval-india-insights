import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomDropdown } from "../form-components/CustomDropdown";
import { YearPicker } from "../form-components/YearPicker";

interface ApartmentBuildingSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const ApartmentBuildingSection = ({
  formData,
  handleInputChange
}: ApartmentBuildingSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">SBI - AP II. APARTMENT BUILDING</h2>
      <table className="w-full border border-gray-300 dark:border-gray-600 text-[11px]">
        <tbody>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">1</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Nature of the Apartment</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter nature of the apartment"
                value={formData.natureOfApartment}
                onChange={(e) => handleInputChange('natureOfApartment', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">2</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">TS No. / SF No. / Door No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter TS No. / SF No. / Door No."
                value={formData.tsNoSfNoDoorNo}
                onChange={(e) => handleInputChange('tsNoSfNoDoorNo', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">3</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Block No. / Ward No.</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter Block No. / Ward No."
                value={formData.blockNo}
                onChange={(e) => handleInputChange('blockNo', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">4</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Year of Construction</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <YearPicker 
                value={formData.yearOfConstruction} 
                onChange={(year) => handleInputChange('yearOfConstruction', year)} 
                className="text-[11px]"
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">5</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Type of Structure</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter type of structure"
                value={formData.typeOfStructure}
                onChange={(e) => handleInputChange('typeOfStructure', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">6</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Quality of Construction</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter quality of construction"
                value={formData.qualityOfConstruction}
                onChange={(e) => handleInputChange('qualityOfConstruction', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">7</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Appearance of the Building</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter appearance of the building"
                value={formData.appearanceOfBuilding}
                onChange={(e) => handleInputChange('appearanceOfBuilding', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">8</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Maintenance of the Building</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Input 
                type="text" 
                className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]" 
                placeholder="Enter maintenance of the building"
                value={formData.maintenanceOfBuilding}
                onChange={(e) => handleInputChange('maintenanceOfBuilding', e.target.value)}
              />
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">9</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Lift Available</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.lift || ""}
                onValueChange={(value) => handleInputChange('lift', value)}
              >
                <SelectTrigger className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">10</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Protected Water Supply</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.protectedWaterSupply || ""}
                onValueChange={(value) => handleInputChange('protectedWaterSupply', value)}
              >
                <SelectTrigger className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">11</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Underground Sewerage System</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.undergroundSewerage || ""}
                onValueChange={(value) => handleInputChange('undergroundSewerage', value)}
              >
                <SelectTrigger className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">12</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Car Parking Available</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.carParking || ""}
                onValueChange={(value) => handleInputChange('carParking', value)}
              >
                <SelectTrigger className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">13</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Compound Wall</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.compoundWall || ""}
                onValueChange={(value) => handleInputChange('compoundWall', value)}
              >
                <SelectTrigger className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
          <tr className="print:break-inside-avoid">
            <td className="border p-2 text-center align-top w-12 dark:border-gray-600 dark:text-white text-[11px]">14</td>
            <td className="border p-2 w-1/2 align-top dark:border-gray-600 dark:text-white text-[11px]">Pavement around the Building</td>
            <td className="border p-2 align-top dark:border-gray-600">
              <Select 
                value={formData.pavementAroundBuilding || ""}
                onValueChange={(value) => handleInputChange('pavementAroundBuilding', value)}
              >
                <SelectTrigger className="w-full border px-2 py-1 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 text-[11px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApartmentBuildingSection;
