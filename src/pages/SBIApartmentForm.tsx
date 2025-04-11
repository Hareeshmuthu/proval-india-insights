
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  Save, Printer, FileText, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { sbiFormFields, docOptions, SBIFormData, SBIFormField } from "@/models/sbi-apartment-form-new";

const SBIApartmentForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SBIFormData>({});
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refNumber, setRefNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [cityName, setCityName] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  // Load project data and existing form data if available
  useEffect(() => {
    if (projectId) {
      const storedProjects = localStorage.getItem('proval_projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const project = projects.find((p: any) => p.id.toString() === projectId);
        
        if (project) {
          setProjectData(project);
          
          // Check if this form was previously saved
          const storedFormData = localStorage.getItem(`sbi_apartment_form_${projectId}`);
          if (storedFormData) {
            const parsedData = JSON.parse(storedFormData);
            setFormData(parsedData);
            
            if (parsedData.refNumber) setRefNumber(parsedData.refNumber);
            if (parsedData.branchName) setBranchName(parsedData.branchName);
            if (parsedData.cityName) setCityName(parsedData.cityName);
            if (parsedData.selectedDocs) setSelectedDocs(parsedData.selectedDocs);
          } else {
            // Pre-fill with project data
            setFormData({
              "4": project.customerName || '',
              "7": project.location || '',
              "dateOfInspection": new Date().toISOString().split('T')[0],
              "dateOfValuation": new Date().toISOString().split('T')[0],
              "dateOfReport": new Date().toISOString().split('T')[0],
            });
          }
        }
      }
    }
    setLoading(false);
  }, [projectId]);

  const handleInputChange = (fieldId: string, value: string | number | string[] | null) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleDocsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedDocs(selected);
    handleInputChange("3", selected);
  };

  const handleSave = () => {
    // Save all form data
    const completeFormData = {
      ...formData,
      refNumber,
      branchName,
      cityName,
      selectedDocs,
    };
    
    localStorage.setItem(`sbi_apartment_form_${projectId}`, JSON.stringify(completeFormData));
    
    // Update project status
    const storedProjects = localStorage.getItem('proval_projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      const updatedProjects = projects.map((project: any) => {
        if (project.id.toString() === projectId) {
          return {
            ...project,
            status: 'In Progress',
            lastUpdated: new Date().toISOString()
          };
        }
        return project;
      });
      
      localStorage.setItem('proval_projects', JSON.stringify(updatedProjects));
    }
    
    toast({
      title: "Form saved",
      description: "SBI apartment valuation form has been saved successfully."
    });
  };

  const handlePrint = () => {
    // Create a printable version of the form
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Generate HTML content for printing
    let printContent = `
      <html>
        <head>
          <title>SBI Apartment Valuation Form - Project #${projectId}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .ref { margin-bottom: 10px; }
            .to-address { margin-bottom: 15px; }
            .title { font-weight: bold; text-align: center; margin: 20px 0; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; margin-bottom: 10px; background: #f0f0f0; padding: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
            .footer { margin-top: 30px; }
            .signature { margin-top: 50px; }
          </style>
        </head>
        <body>
          <div class="ref">Ref: SBI ${refNumber || '_____________'}</div>
          <div class="to-address">
            <p>TO,</p>
            <p>STATE BANK OF INDIA BRANCH: ${branchName || '_____________'}, (${cityName || '_____________'})</p>
          </div>
          <div class="title">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
    `;
    
    // Add sections and fields
    sbiFormFields.forEach(section => {
      printContent += `
        <div class="section">
          <div class="section-title">${section.section}</div>
          <table>
            <tr>
              <th style="width: 10%;">S.No</th>
              <th style="width: 45%;">Field Name</th>
              <th style="width: 45%;">Value</th>
            </tr>
      `;
      
      section.fields.forEach(field => {
        const fieldId = field.sn.replace(/[a-z]/g, '');
        const value = field.sn === "3" ? 
          (selectedDocs.length > 0 ? selectedDocs.join(', ') : 'None') : 
          (formData[field.sn] || formData[field.label] || 'Not provided');
        
        printContent += `
          <tr>
            <td>${field.sn}</td>
            <td>${field.label}</td>
            <td>${value}</td>
          </tr>
        `;
      });
      
      printContent += `
          </table>
        </div>
      `;
    });
    
    printContent += `
          <div class="footer">
            <div class="signature">
              <p>Signature of Valuer</p>
              <p>Name: ${projectData?.valuerId || 'Authorized Valuer'}</p>
              <p>Date: ${format(new Date(), 'dd/MM/yyyy')}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = function() {
      printWindow.print();
    };
  };

  const handleExportToWord = () => {
    // For a simple implementation, create a text file
    let content = `SBI APARTMENT VALUATION REPORT\n\n`;
    content += `Ref: SBI ${refNumber || ''}\n`;
    content += `TO,\n`;
    content += `STATE BANK OF INDIA BRANCH: ${branchName || ''}, (${cityName || ''})\n\n`;
    content += `VALUATION REPORT (IN RESPECT OF APARTMENT)\n\n`;
    
    sbiFormFields.forEach(section => {
      content += `${section.section}\n`;
      
      section.fields.forEach(field => {
        const value = field.sn === "3" ? 
          (selectedDocs.length > 0 ? selectedDocs.join(', ') : 'None') : 
          (formData[field.sn] || formData[field.label] || 'Not provided');
        
        content += `${field.sn}. ${field.label}: ${value}\n`;
      });
      
      content += `\n`;
    });
    
    content += `\nSignature of Valuer\n`;
    content += `Name: ${projectData?.valuerId || 'Authorized Valuer'}\n`;
    content += `Date: ${format(new Date(), 'dd/MM/yyyy')}\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SBI_Apartment_Valuation_Project_${projectId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "Document has been exported successfully."
    });
  };

  const renderInputField = (field: SBIFormField) => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            className="w-full border px-2 py-1 rounded" 
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows={3}
            value={formData[field.sn] as string || ''}
            onChange={(e) => handleInputChange(field.sn, e.target.value)}
          />
        );
        
      case "date":
        return (
          <Input
            type="date"
            className="w-full border px-2 py-1 rounded"
            defaultValue={today}
            value={formData[field.sn] as string || ''}
            onChange={(e) => handleInputChange(field.sn, e.target.value)}
          />
        );
        
      case "multiple":
        return (
          <div className="relative">
            <select
              multiple
              className="w-full border px-2 py-1 rounded"
              onChange={handleDocsChange}
              value={selectedDocs}
            >
              {docOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="mt-2 text-sm font-medium text-gray-800">
              {selectedDocs.length > 0 ? selectedDocs.join(', ') : (
                <span className="text-gray-400">Select documents provided</span>
              )}
            </div>
          </div>
        );
        
      case "split":
        if (field.label === "Plot No. / Survey No.") {
          return (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-1/2 border px-2 py-1 rounded"
                placeholder="Plot No."
                value={formData[`${field.sn}_plot`] as string || ''}
                onChange={(e) => handleInputChange(`${field.sn}_plot`, e.target.value)}
              />
              <span>/</span>
              <Input
                type="number"
                className="w-1/2 border px-2 py-1 rounded"
                placeholder="Survey No."
                value={formData[`${field.sn}_survey`] as string || ''}
                onChange={(e) => handleInputChange(`${field.sn}_survey`, e.target.value)}
              />
            </div>
          );
        } else if (field.label === "Ward / Taluka") {
          return (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                className="w-1/2 border px-2 py-1 rounded"
                placeholder="Ward"
                value={formData[`${field.sn}_ward`] as string || ''}
                onChange={(e) => handleInputChange(`${field.sn}_ward`, e.target.value)}
              />
              <span>/</span>
              <Input
                type="text"
                className="w-1/2 border px-2 py-1 rounded"
                placeholder="Taluka"
                value={formData[`${field.sn}_taluka`] as string || ''}
                onChange={(e) => handleInputChange(`${field.sn}_taluka`, e.target.value)}
              />
            </div>
          );
        } else if (field.label === "Mandal / District") {
          return (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                className="w-1/2 border px-2 py-1 rounded"
                placeholder="Mandal"
                value={formData[`${field.sn}_mandal`] as string || ''}
                onChange={(e) => handleInputChange(`${field.sn}_mandal`, e.target.value)}
              />
              <span>/</span>
              <Input
                type="text"
                className="w-1/2 border px-2 py-1 rounded"
                placeholder="District"
                value={formData[`${field.sn}_district`] as string || ''}
                onChange={(e) => handleInputChange(`${field.sn}_district`, e.target.value)}
              />
            </div>
          );
        }
        return <Input 
          type="text" 
          className="w-full border px-2 py-1 rounded" 
          placeholder={`Enter ${field.label.toLowerCase()}`}
          value={formData[field.sn] as string || ''}
          onChange={(e) => handleInputChange(field.sn, e.target.value)}
        />;
        
      case "select":
        return (
          <Select
            value={formData[field.sn] as string || ''}
            onValueChange={(value) => handleInputChange(field.sn, value)}
          >
            <SelectTrigger className="w-full border px-2 py-1 rounded">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Select an option</SelectItem>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case "number":
        return (
          <Input
            type="number"
            className="w-full border px-2 py-1 rounded"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={formData[field.sn] as string || ''}
            onChange={(e) => handleInputChange(field.sn, e.target.value)}
          />
        );
        
      default:
        return (
          <Input
            type="text"
            className="w-full border px-2 py-1 rounded"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={formData[field.sn] as string || ''}
            onChange={(e) => handleInputChange(field.sn, e.target.value)}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-center items-center h-full">
              <p>Loading form data...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-center items-center h-full">
              <p>Project not found.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                SBI Apartment Valuation Form
              </h1>
              <p className="text-muted-foreground">
                Project #{projectId} - {projectData.customerName}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handlePrint}
              >
                <Printer size={18} /> Print
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleExportToWord}
              >
                <FileText size={18} /> Export to Word
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={handleSave}
              >
                <Save size={18} /> Save
              </Button>
            </div>
          </div>
          
          {/* Form Header */}
          <div className="bg-card border rounded-lg shadow-sm p-6 mb-6">
            <div className="text-base mb-2 flex items-center gap-2">
              <span>Ref: SBI</span>
              <Input 
                type="text" 
                placeholder="Enter reference number" 
                className="border-none border-b border-black py-0 focus:ring-0"
                style={{ borderBottom: '1px solid #000' }}
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
              />
            </div>
            <div className="mb-1 font-semibold">TO,</div>
            <div className="mb-1 font-semibold flex gap-2 items-center">
              STATE BANK OF INDIA BRANCH:
              <Input 
                type="text" 
                placeholder="Branch name" 
                className="border-none border-b border-black py-0 focus:ring-0"
                style={{ borderBottom: '1px solid #000' }}
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />, (
              <Input 
                type="text" 
                placeholder="City name" 
                className="border-none border-b border-black py-0 focus:ring-0"
                style={{ borderBottom: '1px solid #000' }}
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />)
            </div>
            <div className="font-semibold text-center">VALUATION REPORT (IN RESPECT OF APARTMENT)</div>
          </div>
          
          {/* Form Sections */}
          <div className="space-y-6">
            {sbiFormFields.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{section.section}</h2>
                <table className="w-full border border-gray-300">
                  <tbody>
                    {section.fields.map((field, idx) => (
                      <tr key={idx}>
                        <td className="border p-2 text-center align-top w-12">{field.sn}</td>
                        <td className="border p-2 w-1/2 align-top">{field.label}</td>
                        <td className="border p-2 align-top">
                          {renderInputField(field)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          
          {/* Form Actions */}
          <div className="flex gap-4 mt-6">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handlePrint}
            >
              Print Preview
            </Button>
            <Button 
              className="bg-gray-600 hover:bg-gray-700 text-white"
              onClick={handleExportToWord}
            >
              Export to Word
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SBIApartmentForm;
