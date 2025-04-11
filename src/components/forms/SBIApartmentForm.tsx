
import React, { useState } from "react";

const sbiFormFields = [
  {
    section: "I. GENERAL",
    fields: [
      { sn: "1", label: "Purpose for which the valuation is made" },
      { sn: "2a", label: "Date of inspection" },
      { sn: "2b", label: "Date on which the valuation is made" },
      { sn: "2c", label: "Date of Report" },
      { sn: "3", label: "List of documents produced for perusal" },
      { sn: "4", label: "Name of the owner(s) and address(es)" },
      { sn: "5", label: "Brief description of the property" },
      { sn: "6a", label: "Plot No. / Survey No." },
      { sn: "6b", label: "Door No." },
      { sn: "6c", label: "T. S. No. / Village" },
      { sn: "6d", label: "Ward / Taluka" },
      { sn: "6e", label: "Mandal / District" },
      { sn: "6f", label: "Date of issue and validity of layout plan" },
      { sn: "6g", label: "Approved map issuing authority" },
      { sn: "6h", label: "Genuineness of the approved map verified" },
      { sn: "6i", label: "Comments on authenticity of plan" },
      { sn: "7", label: "Postal address of the property" },
      { sn: "8a", label: "City / Town" },
      { sn: "8b", label: "Residential Area" },
      { sn: "8c", label: "Commercial Area" },
      { sn: "8d", label: "Industrial Area" },
      { sn: "9a", label: "Classification of area - High / Middle / Poor" },
      { sn: "9b", label: "Urban / Semi Urban / Rural" },
      { sn: "10", label: "Coming under Corporation / Panchayat / Municipality" },
      { sn: "11", label: "Covered under enactments or notified area" },
      { sn: "12", label: "Boundaries of the property" },
      { sn: "13a", label: "Dimensions - North" },
      { sn: "13b", label: "Dimensions - South" },
      { sn: "13c", label: "Dimensions - East" },
      { sn: "13d", label: "Dimensions - West" },
      { sn: "13e", label: "North-East Corner" },
      { sn: "14", label: "Extent of the site" },
      { sn: "15", label: "Latitude, Longitude & Co-ordinates" },
      { sn: "16", label: "Extent of site considered for valuation" },
      { sn: "17", label: "Occupancy details" }
    ]
  },
  {
    section: "II. APARTMENT BUILDING",
    fields: [
      { sn: "1", label: "Nature of the Apartment" },
      { sn: "2a", label: "T. S. No. / S.F. No./ Door No" },
      { sn: "2b", label: "Block No." },
      { sn: "2c", label: "Ward No." },
      { sn: "2d", label: "Village / Municipality / Corporation" },
      { sn: "2e", label: "Door No., Street / Road" },
      { sn: "3", label: "Description of the locality" },
      { sn: "4", label: "Year of Construction" },
      { sn: "5", label: "Number of Floors" },
      { sn: "6", label: "Type of Structure" },
      { sn: "7", label: "Number of Dwelling units" },
      { sn: "8", label: "Quality of Construction" },
      { sn: "9", label: "Appearance of the Building" },
      { sn: "10", label: "Maintenance of the Building" },
      { sn: "11a", label: "Lift" },
      { sn: "11b", label: "Protected Water Supply" },
      { sn: "11c", label: "Underground Sewerage" },
      { sn: "11d", label: "Car Parking" },
      { sn: "11e", label: "Compound wall" },
      { sn: "11f", label: "Pavement around Building" }
    ]
  },
  {
    section: "III. FLAT",
    fields: [
      { sn: "1", label: "The floor on which the flat is situated" },
      { sn: "2", label: "Door No. of the flat" },
      { sn: "3", label: "Specifications (Roof, Flooring, Doors, Windows, Fittings, Finishing)" },
      { sn: "4", label: "House Tax" },
      { sn: "5", label: "Electricity Service Connection No." },
      { sn: "6", label: "Maintenance of the flat" },
      { sn: "7", label: "Sale Deed executed in the name of" },
      { sn: "8", label: "Undivided land area" },
      { sn: "9", label: "Plinth Area" },
      { sn: "10", label: "Carpet Area" },
      { sn: "11", label: "Floor Space Index" },
      { sn: "12", label: "Is it Posh / I Class / Medium / Ordinary?" },
      { sn: "13", label: "Residential or Commercial Use" },
      { sn: "14", label: "Owner-occupied or Rented" },
      { sn: "15", label: "Rent details if rented" }
    ]
  },
  {
    section: "IV. MARKETABILITY",
    fields: [
      { sn: "1", label: "How is the marketability?" },
      { sn: "2", label: "Factors favoring extra value" },
      { sn: "3", label: "Negative factors affecting value" }
    ]
  },
  {
    section: "V. RATE",
    fields: [
      { sn: "1", label: "Comparable rate in locality" },
      { sn: "2", label: "Adopted basic composite rate" },
      { sn: "3", label: "Break-up of rate: Building + Services + Land + Development" },
      { sn: "4", label: "Guideline rate from Registrar" }
    ]
  },
  {
    section: "VI. COMPOSITE RATE AFTER DEPRECIATION",
    fields: [
      { sn: "1", label: "Depreciated Building Rate" },
      { sn: "2", label: "Replacement Cost" },
      { sn: "3", label: "Age of the Building" },
      { sn: "4", label: "Estimated Life of the Building" },
      { sn: "5", label: "Depreciation Percentage" },
      { sn: "6", label: "Total Composite Rate" }
    ]
  }
];

export default function SBIApartmentForm() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  
  return (
    <div className="print:text-sm">
      <div className="mb-6">
        <div className="text-base mb-2 flex items-center gap-2">
          <span>Ref: SBI</span>
          <input type="text" placeholder="Enter reference number" className="border px-2 py-1 rounded focus:outline-none focus:ring-0" style={{ border: 'none', borderBottom: '1px solid #000', padding: 0 }} />
        </div>
        <div className="mb-1 font-semibold">TO,</div>
        <div className="mb-1 font-semibold flex gap-2 items-center">
          STATE BANK OF INDIA BRANCH:
          <input type="text" placeholder="Branch name" className="border px-2 py-1 rounded focus:outline-none focus:ring-0" style={{ border: 'none', borderBottom: '1px solid #000', padding: 0 }} />, (
          <input type="text" placeholder="City name" className="border px-2 py-1 rounded focus:outline-none focus:ring-0" style={{ border: 'none', borderBottom: '1px solid #000', padding: 0 }} />)
        </div>
        <div className="font-semibold text-center">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
      </div>
      
      {sbiFormFields.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{section.section}</h2>
          <table className="w-full border border-gray-300">
            <tbody>
              {section.fields.map((field, idx) => (
                <tr key={idx} className="print:break-inside-avoid">
                  <td className={`border p-2 text-center align-top w-12 ${field.sn === "" ? "invisible" : ""}`}>{field.sn}</td>
                  <td className="border p-2 w-1/2 align-top">{field.label}</td>
                  <td className="border p-2 align-top">
                    {(() => {
                      const today = new Date().toISOString().split('T')[0];
                      const docOptions = [
                        'Copy of Sale Deed',
                        'Copy of Settlement Deed',
                        'Copy of Agreement Deed',
                        'Copy of Patta',
                        'Copy of Electricity Bill',
                        'Copy of Property Tax Receipt'
                      ];

                      if (field.label === 'Purpose for which the valuation is made' || field.label === 'Brief description of the property') {
                        return <textarea className="w-full border px-2 py-1 rounded" placeholder={`Enter ${field.label.toLowerCase()}`} rows={3}></textarea>;
                      } else if ([
                        'Date of inspection',
                        'Date on which the valuation is made',
                        'Date of Report'
                      ].includes(field.label)) {
                        return <input type="date" className="w-full border px-2 py-1 rounded" defaultValue={today} />;
                      } else if (field.label === 'List of documents produced for perusal') {
                        return (
                          <div className="relative">
                            <select
                              multiple
                              className="w-full border px-2 py-1 rounded"
                              onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                setSelectedDocs(selected);
                              }}
                            >
                              {docOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <div className="mt-2 text-sm font-medium text-gray-800">
                              {selectedDocs.length > 0 ? selectedDocs.join(', ') : <span className="text-gray-400">Select documents provided</span>}
                            </div>
                          </div>
                        );
                      } else if (['Plot No. / Survey No.', '6a'].includes(field.label)) {
                        return (
                          <div className="flex items-center gap-2">
                            <input type="number" className="w-1/2 border px-2 py-1 rounded" placeholder="Plot No." />
                            <span>/</span>
                            <input type="number" className="w-1/2 border px-2 py-1 rounded" placeholder="Survey No." />
                          </div>
                        );
                      } else if (field.label === 'Ward / Taluka') {
                        return (
                          <div className="flex items-center gap-2">
                            <input type="text" className="w-1/2 border px-2 py-1 rounded" placeholder="Ward" />
                            <span>/</span>
                            <input type="text" className="w-1/2 border px-2 py-1 rounded" placeholder="Taluka" />
                          </div>
                        );
                      } else if (field.label === 'Mandal / District') {
                        return (
                          <div className="flex items-center gap-2">
                            <input type="text" className="w-1/2 border px-2 py-1 rounded" placeholder="Mandal" />
                            <span>/</span>
                            <input type="text" className="w-1/2 border px-2 py-1 rounded" placeholder="District" />
                          </div>
                        );
                      } else if (field.label === 'Name of the owner(s) and address(es)' || field.label === 'Postal address of the property') {
                        return <textarea className="w-full border px-2 py-1 rounded" placeholder={`Enter ${field.label.toLowerCase()}`} rows={3}></textarea>;
                      } else if (field.label === 'Door No.') {
                        return <input type="number" className="w-full border px-2 py-1 rounded" placeholder={`Enter ${field.label.toLowerCase()}`} />;
                      } else if (field.label === 'T. S. No. / Village') {
                        const villages = ['Village A', 'Village B', 'Village C', 'Village D'];
                        return (
                          <select className="w-full border px-2 py-1 rounded">
                            <option value="">Select a village</option>
                            {villages.map(v => (
                              <option key={v} value={v}>{v}</option>
                            ))}
                          </select>
                        );
                      } else if (["Residential Area", "Commercial Area", "Industrial Area"].includes(field.label)) {
                        return (
                          <select className="w-full border px-2 py-1 rounded">
                            <option value="">Select Yes or No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        );
                      } else if (field.label === 'Classification of area - High / Middle / Poor') {
                        return (
                          <select className="w-full border px-2 py-1 rounded">
                            <option value="">Select classification</option>
                            <option value="High">High</option>
                            <option value="Middle">Middle</option>
                            <option value="Poor">Poor</option>
                          </select>
                        );
                      } else if (field.label === 'Urban / Semi Urban / Rural') {
                        return (
                          <select className="w-full border px-2 py-1 rounded">
                            <option value="">Select area type</option>
                            <option value="Urban">Urban</option>
                            <option value="Semi Urban">Semi Urban</option>
                            <option value="Rural">Rural</option>
                          </select>
                        );
                      } else if (field.label === 'Coming under Corporation / Panchayat / Municipality') {
                        return (
                          <select className="w-full border px-2 py-1 rounded">
                            <option value="">Select administrative body</option>
                            <option value="Corporation">Corporation</option>
                            <option value="Panchayat">Panchayat</option>
                            <option value="Municipality">Municipality</option>
                          </select>
                        );
                      } else {
                        return <input type="text" className="w-full border px-2 py-1 rounded" placeholder={`Enter ${field.label.toLowerCase()}`} />;
                      }
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      
      <style jsx>{`
        @media print {
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
