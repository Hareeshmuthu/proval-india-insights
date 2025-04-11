
export interface SBIFormField {
  sn: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'radio' | 'multiple' | 'split';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface SBIFormData {
  [key: string]: string | number | Date | null | string[];
}

export interface SBIFormSection {
  section: string;
  fields: SBIFormField[];
}

export const docOptions = [
  'Copy of Sale Deed',
  'Copy of Settlement Deed',
  'Copy of Agreement Deed',
  'Copy of Patta',
  'Copy of Electricity Bill',
  'Copy of Property Tax Receipt'
];

export const sbiFormFields: SBIFormSection[] = [
  {
    section: "I. GENERAL",
    fields: [
      { sn: "1", label: "Purpose for which the valuation is made", type: "textarea", required: true },
      { sn: "2a", label: "Date of inspection", type: "date", required: true },
      { sn: "2b", label: "Date on which the valuation is made", type: "date", required: true },
      { sn: "2c", label: "Date of Report", type: "date", required: true },
      { sn: "3", label: "List of documents produced for perusal", type: "multiple", required: true },
      { sn: "4", label: "Name of the owner(s) and address(es)", type: "textarea", required: true },
      { sn: "5", label: "Brief description of the property", type: "textarea", required: true },
      { sn: "6a", label: "Plot No. / Survey No.", type: "split", required: false },
      { sn: "6b", label: "Door No.", type: "number", required: false },
      { sn: "6c", label: "T. S. No. / Village", type: "select", options: ['Village A', 'Village B', 'Village C', 'Village D'], required: false },
      { sn: "6d", label: "Ward / Taluka", type: "split", required: false },
      { sn: "6e", label: "Mandal / District", type: "split", required: false },
      { sn: "6f", label: "Date of issue and validity of layout plan", type: "date", required: false },
      { sn: "6g", label: "Approved map issuing authority", type: "text", required: false },
      { sn: "6h", label: "Genuineness of the approved map verified", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "6i", label: "Comments on authenticity of plan", type: "textarea", required: false },
      { sn: "7", label: "Postal address of the property", type: "textarea", required: true },
      { sn: "8a", label: "City / Town", type: "text", required: false },
      { sn: "8b", label: "Residential Area", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "8c", label: "Commercial Area", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "8d", label: "Industrial Area", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "9a", label: "Classification of area - High / Middle / Poor", type: "select", options: ['High', 'Middle', 'Poor'], required: false },
      { sn: "9b", label: "Urban / Semi Urban / Rural", type: "select", options: ['Urban', 'Semi Urban', 'Rural'], required: false },
      { sn: "10", label: "Coming under Corporation / Panchayat / Municipality", type: "select", options: ['Corporation', 'Panchayat', 'Municipality'], required: false },
      { sn: "11", label: "Covered under enactments or notified area", type: "text", required: false },
      { sn: "12", label: "Boundaries of the property", type: "textarea", required: false },
      { sn: "13a", label: "Dimensions - North", type: "text", required: false },
      { sn: "13b", label: "Dimensions - South", type: "text", required: false },
      { sn: "13c", label: "Dimensions - East", type: "text", required: false },
      { sn: "13d", label: "Dimensions - West", type: "text", required: false },
      { sn: "13e", label: "North-East Corner", type: "text", required: false },
      { sn: "14", label: "Extent of the site", type: "text", required: false },
      { sn: "15", label: "Latitude, Longitude & Co-ordinates", type: "text", required: false },
      { sn: "16", label: "Extent of site considered for valuation", type: "text", required: false },
      { sn: "17", label: "Occupancy details", type: "text", required: false }
    ]
  },
  {
    section: "II. APARTMENT BUILDING",
    fields: [
      { sn: "1", label: "Nature of the Apartment", type: "text", required: true },
      { sn: "2a", label: "T. S. No. / S.F. No./ Door No", type: "text", required: false },
      { sn: "2b", label: "Block No.", type: "text", required: false },
      { sn: "2c", label: "Ward No.", type: "text", required: false },
      { sn: "2d", label: "Village / Municipality / Corporation", type: "text", required: false },
      { sn: "2e", label: "Door No., Street / Road", type: "text", required: false },
      { sn: "3", label: "Description of the locality", type: "textarea", required: true },
      { sn: "4", label: "Year of Construction", type: "number", required: true },
      { sn: "5", label: "Number of Floors", type: "number", required: true },
      { sn: "6", label: "Type of Structure", type: "text", required: true },
      { sn: "7", label: "Number of Dwelling units", type: "number", required: false },
      { sn: "8", label: "Quality of Construction", type: "select", options: ['Excellent', 'Good', 'Average', 'Poor'], required: true },
      { sn: "9", label: "Appearance of the Building", type: "select", options: ['Excellent', 'Good', 'Average', 'Poor'], required: false },
      { sn: "10", label: "Maintenance of the Building", type: "select", options: ['Excellent', 'Good', 'Average', 'Poor'], required: false },
      { sn: "11a", label: "Lift", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "11b", label: "Protected Water Supply", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "11c", label: "Underground Sewerage", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "11d", label: "Car Parking", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "11e", label: "Compound wall", type: "select", options: ['Yes', 'No'], required: false },
      { sn: "11f", label: "Pavement around Building", type: "select", options: ['Yes', 'No'], required: false }
    ]
  },
  {
    section: "III. FLAT",
    fields: [
      { sn: "1", label: "The floor on which the flat is situated", type: "number", required: true },
      { sn: "2", label: "Door No. of the flat", type: "text", required: true },
      { sn: "3", label: "Specifications (Roof, Flooring, Doors, Windows, Fittings, Finishing)", type: "textarea", required: true },
      { sn: "4", label: "House Tax", type: "text", required: false },
      { sn: "5", label: "Electricity Service Connection No.", type: "text", required: false },
      { sn: "6", label: "Maintenance of the flat", type: "select", options: ['Excellent', 'Good', 'Average', 'Poor'], required: false },
      { sn: "7", label: "Sale Deed executed in the name of", type: "text", required: true },
      { sn: "8", label: "Undivided land area", type: "text", required: false },
      { sn: "9", label: "Plinth Area", type: "number", required: true },
      { sn: "10", label: "Carpet Area", type: "number", required: true },
      { sn: "11", label: "Floor Space Index", type: "number", required: false },
      { sn: "12", label: "Is it Posh / I Class / Medium / Ordinary?", type: "select", options: ['Posh', 'I Class', 'Medium', 'Ordinary'], required: false },
      { sn: "13", label: "Residential or Commercial Use", type: "select", options: ['Residential', 'Commercial', 'Mixed'], required: true },
      { sn: "14", label: "Owner-occupied or Rented", type: "select", options: ['Owner-occupied', 'Rented'], required: true },
      { sn: "15", label: "Rent details if rented", type: "text", required: false }
    ]
  },
  {
    section: "IV. MARKETABILITY",
    fields: [
      { sn: "1", label: "How is the marketability?", type: "select", options: ['Excellent', 'Good', 'Average', 'Poor'], required: true },
      { sn: "2", label: "Factors favoring extra value", type: "textarea", required: false },
      { sn: "3", label: "Negative factors affecting value", type: "textarea", required: false }
    ]
  },
  {
    section: "V. RATE",
    fields: [
      { sn: "1", label: "Comparable rate in locality", type: "number", required: true },
      { sn: "2", label: "Adopted basic composite rate", type: "number", required: true },
      { sn: "3", label: "Break-up of rate: Building + Services + Land + Development", type: "text", required: false },
      { sn: "4", label: "Guideline rate from Registrar", type: "number", required: false }
    ]
  },
  {
    section: "VI. COMPOSITE RATE AFTER DEPRECIATION",
    fields: [
      { sn: "1", label: "Depreciated Building Rate", type: "number", required: true },
      { sn: "2", label: "Replacement Cost", type: "number", required: true },
      { sn: "3", label: "Age of the Building", type: "number", required: true },
      { sn: "4", label: "Estimated Life of the Building", type: "number", required: true },
      { sn: "5", label: "Depreciation Percentage", type: "number", required: true },
      { sn: "6", label: "Total Composite Rate", type: "number", required: true }
    ]
  }
];
