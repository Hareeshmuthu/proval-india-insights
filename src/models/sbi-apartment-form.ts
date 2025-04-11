
export interface SBIFormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'radio';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  section: string;
}

export interface SBIFormData {
  [key: string]: string | number | Date | null;
}

export interface SBIFormSection {
  id: string;
  title: string;
  fields: SBIFormField[];
}

export const SBI_FORM_SECTIONS: SBIFormSection[] = [
  {
    id: 'general',
    title: 'I. GENERAL',
    fields: [
      { id: 'name', label: 'Name of borrower', type: 'text', required: true, section: 'general' },
      { id: 'date', label: 'Date of Inspection', type: 'date', required: true, section: 'general' },
      { id: 'location', label: 'Location', type: 'text', required: true, section: 'general' },
      { id: 'purpose', label: 'Purpose of Valuation', type: 'text', required: true, section: 'general' },
      { id: 'ownership', label: 'Ownership', type: 'text', required: true, section: 'general' },
    ]
  },
  {
    id: 'building',
    title: 'II. APARTMENT BUILDING',
    fields: [
      { id: 'building_name', label: 'Name of the Building', type: 'text', required: true, section: 'building' },
      { id: 'floors', label: 'No. of Floors', type: 'number', required: true, section: 'building' },
      { id: 'age', label: 'Age of Building', type: 'number', required: true, section: 'building' },
      { id: 'condition', label: 'Condition of Building', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'], required: true, section: 'building' },
      { id: 'amenities', label: 'Amenities', type: 'text', required: true, section: 'building' },
      { id: 'approvals', label: 'Planning Approvals', type: 'textarea', required: true, section: 'building' },
    ]
  },
  {
    id: 'flat',
    title: 'III. FLAT',
    fields: [
      { id: 'flat_no', label: 'Flat No.', type: 'text', required: true, section: 'flat' },
      { id: 'floor', label: 'Floor', type: 'number', required: true, section: 'flat' },
      { id: 'area', label: 'Super Built-up Area (sq.ft)', type: 'number', required: true, section: 'flat' },
      { id: 'carpet_area', label: 'Carpet Area (sq.ft)', type: 'number', required: true, section: 'flat' },
      { id: 'bedrooms', label: 'No. of Bedrooms', type: 'number', required: true, section: 'flat' },
      { id: 'bathrooms', label: 'No. of Bathrooms', type: 'number', required: true, section: 'flat' },
      { id: 'balconies', label: 'No. of Balconies', type: 'number', required: true, section: 'flat' },
      { id: 'facing', label: 'Facing', type: 'select', options: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'], required: true, section: 'flat' },
      { id: 'parking', label: 'Parking', type: 'select', options: ['Covered', 'Open', 'None'], required: true, section: 'flat' },
    ]
  },
  {
    id: 'marketability',
    title: 'IV. MARKETABILITY',
    fields: [
      { id: 'demand', label: 'Demand in the area', type: 'select', options: ['High', 'Medium', 'Low'], required: true, section: 'marketability' },
      { id: 'proximity', label: 'Proximity to amenities', type: 'textarea', required: true, section: 'marketability' },
      { id: 'infrastructure', label: 'Infrastructure development', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'], required: true, section: 'marketability' },
      { id: 'future_prospects', label: 'Future prospects', type: 'textarea', required: true, section: 'marketability' },
    ]
  },
  {
    id: 'rate',
    title: 'V. RATE',
    fields: [
      { id: 'market_rate', label: 'Prevailing Market Rate (per sq.ft)', type: 'number', required: true, section: 'rate' },
      { id: 'guideline_rate', label: 'Guideline Value (per sq.ft)', type: 'number', required: true, section: 'rate' },
      { id: 'adopted_rate', label: 'Adopted Rate (per sq.ft)', type: 'number', required: true, section: 'rate' },
    ]
  },
  {
    id: 'composite_rate',
    title: 'VI. COMPOSITE RATE',
    fields: [
      { id: 'total_value', label: 'Total Value', type: 'number', required: true, section: 'composite_rate' },
      { id: 'rounded_value', label: 'Rounded Value', type: 'number', required: true, section: 'composite_rate' },
      { id: 'remarks', label: 'Remarks', type: 'textarea', required: true, section: 'composite_rate' },
    ]
  }
];
