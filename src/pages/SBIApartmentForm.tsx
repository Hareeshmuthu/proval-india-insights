
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  Save, Printer, FileText, Calendar, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { cn } from "@/lib/utils";
import { SBI_FORM_SECTIONS, SBIFormData, SBIFormField } from "@/models/sbi-apartment-form";

const SBIApartmentForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SBIFormData>({});
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
            // Convert date strings back to Date objects
            const formattedData: SBIFormData = {};
            Object.keys(parsedData).forEach(key => {
              if (key.includes('date')) {
                formattedData[key] = parsedData[key] ? new Date(parsedData[key]) : null;
              } else {
                formattedData[key] = parsedData[key];
              }
            });
            setFormData(formattedData);
          } else {
            // Pre-fill with project data
            setFormData({
              name: project.customerName || '',
              location: project.location || '',
              date: new Date(),
            });
          }
        }
      }
    }
    setLoading(false);
  }, [projectId]);

  const handleInputChange = (field: SBIFormField, value: string | number | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field.id]: value
    }));
  };

  const handleSave = () => {
    // Validate required fields
    const missingFields: string[] = [];
    
    SBI_FORM_SECTIONS.forEach(section => {
      section.fields.forEach(field => {
        if (field.required && !formData[field.id]) {
          missingFields.push(field.label);
        }
      });
    });
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    // Save form data to localStorage
    localStorage.setItem(`sbi_apartment_form_${projectId}`, JSON.stringify(formData));
    
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
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; margin-bottom: 10px; background: #f0f0f0; padding: 5px; }
            .field { margin-bottom: 10px; display: flex; }
            .field-label { font-weight: bold; width: 40%; }
            .field-value { width: 60%; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SBI Apartment Valuation Form</h1>
            <p>Project #${projectId} - ${projectData?.customerName || 'N/A'}</p>
            <p>Date: ${format(new Date(), 'PPP')}</p>
          </div>
    `;
    
    // Add sections and fields
    SBI_FORM_SECTIONS.forEach(section => {
      printContent += `
        <div class="section">
          <div class="section-title">${section.title}</div>
          <table>
            <tr>
              <th style="width: 5%;">S.No</th>
              <th style="width: 45%;">Field Name</th>
              <th style="width: 50%;">Value</th>
            </tr>
      `;
      
      section.fields.forEach((field, index) => {
        let value = formData[field.id] || 'N/A';
        
        // Format dates
        if (field.type === 'date' && value instanceof Date) {
          value = format(value as Date, 'PPP');
        }
        
        printContent += `
          <tr>
            <td>${index + 1}</td>
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
    // For a real implementation, you'd use a library like docx-js
    // This is a simple placeholder that creates a text file
    const content = SBI_FORM_SECTIONS.map(section => {
      const sectionContent = section.fields.map((field, index) => {
        let value = formData[field.id] || 'N/A';
        // Format dates
        if (field.type === 'date' && value instanceof Date) {
          value = format(value as Date, 'PPP');
        }
        return `${index + 1}. ${field.label}: ${value}`;
      }).join('\n');
      
      return `${section.title}\n${sectionContent}\n`;
    }).join('\n');
    
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

  const renderField = (field: SBIFormField, index: number) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <Input
            type={field.type}
            id={field.id}
            value={formData[field.id] as string || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full"
            required={field.required}
          />
        );
        
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            value={formData[field.id] as string || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full min-h-[100px]"
            required={field.required}
          />
        );
        
      case 'select':
        return (
          <Select
            value={formData[field.id] as string || ''}
            onValueChange={(value) => handleInputChange(field, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formData[field.id] ? format(formData[field.id] as Date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={formData[field.id] as Date || undefined}
                onSelect={(date) => handleInputChange(field, date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        );
        
      default:
        return null;
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
          
          {/* Form Sections */}
          <div className="space-y-8">
            {SBI_FORM_SECTIONS.map((section) => (
              <div 
                key={section.id} 
                className="bg-card border rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {section.fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-1 flex items-center justify-center h-10 bg-muted rounded-md font-medium">
                        {index + 1}
                      </div>
                      <div className="col-span-4">
                        <Label htmlFor={field.id} className="flex h-10 items-center">
                          {field.label}{field.required ? ' *' : ''}
                        </Label>
                      </div>
                      <div className="col-span-7">
                        {renderField(field, index)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard/files")}
            >
              Back to Files
            </Button>
            <div className="space-x-2">
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
        </main>
      </div>
    </div>
  );
};

export default SBIApartmentForm;
