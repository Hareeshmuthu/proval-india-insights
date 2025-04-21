import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/forms/form-components/DatePicker";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  referenceNumber: string;
  dateOfInspection: Date;
  nameOfTheBank: string;
  branchAddress: string;
  nameOfTheBorrower: string;
  addressOfTheProperty: string;
}

const SBIApartmentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    referenceNumber: '',
    dateOfInspection: new Date(),
    nameOfTheBank: '',
    branchAddress: '',
    nameOfTheBorrower: '',
    addressOfTheProperty: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <div className="p-4 space-y-4 text-[11px]">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">SBI Apartment Form</h2>

      {/* Data Receiving Section */}
      <div className="space-y-4">
        <Label htmlFor="referenceNumber" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Reference Number</Label>
        <Input 
          type="text"
          placeholder="Enter reference number"
          value={formData.referenceNumber}
          onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
          className="h-8 px-2 py-1 text-[11px]"
        />

        <Label htmlFor="dateOfInspection" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Date of Inspection</Label>
        <DatePicker
          value={formData.dateOfInspection}
          onChange={(date) => handleInputChange('dateOfInspection', date)}
        />

        <Label htmlFor="nameOfTheBank" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Name of the Bank</Label>
        <Input
          type="text"
          placeholder="Enter name of the bank"
          value={formData.nameOfTheBank}
          onChange={(e) => handleInputChange('nameOfTheBank', e.target.value)}
          className="h-8 px-2 py-1 text-[11px]"
        />

        <Label htmlFor="branchAddress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Branch Address</Label>
        <Textarea
          placeholder="Enter branch address"
          value={formData.branchAddress}
          onChange={(e) => handleInputChange('branchAddress', e.target.value)}
          className="h-16 px-2 py-1 text-[11px]"
        />

        <Label htmlFor="nameOfTheBorrower" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Name of the Borrower</Label>
        <Input
          type="text"
          placeholder="Enter name of the borrower"
          value={formData.nameOfTheBorrower}
          onChange={(e) => handleInputChange('nameOfTheBorrower', e.target.value)}
          className="h-8 px-2 py-1 text-[11px]"
        />

        <Label htmlFor="addressOfTheProperty" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Address of the Property</Label>
        <Textarea
          placeholder="Enter address of the property"
          value={formData.addressOfTheProperty}
          onChange={(e) => handleInputChange('addressOfTheProperty', e.target.value)}
          className="h-16 px-2 py-1 text-[11px]"
        />
      </div>
    </div>
  );
};

export default SBIApartmentForm;
