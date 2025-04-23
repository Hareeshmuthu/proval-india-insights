import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SBIApartmentForm from "@/components/forms/SBIApartmentForm";
import SBIApartmentPrintForm from "@/components/forms/SBIApartmentPrintForm";
import { FilePenLine, Printer, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface Project {
  id: number;
  projectNumber: number;
  customerName: string;
  bankName: string;
  propertyType: string;
}

const FORM_SECTIONS = [
  "general",
  "building",
  "flat",
  "marketability",
  "rate",
  "composite",
  "valuation"
];

const SECTION_TITLES = {
  general: "I. GENERAL",
  building: "II. APARTMENT BUILDING",
  flat: "III. FLAT",
  marketability: "IV. MARKETABILITY",
  rate: "V. RATE",
  composite: "VI. COMPOSITE RATE AFTER DEPRECIATION",
  valuation: "DETAILS OF VALUATION"
};

const SBIApartmentValuation = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("general");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId) {
      // Get project from localStorage
      const storedProjects = localStorage.getItem('proval_projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const foundProject = projects.find((p: any) => p.projectNumber === Number(projectId));
        if (foundProject) {
          setProject(foundProject);
        }
      }
    }
  }, [searchParams]);

  const handleSave = () => {
    // In a real application, you would save the form data to a database
    localStorage.setItem(`sbi_form_${activeSection}_${project?.projectNumber || 'draft'}`, JSON.stringify(formData));
    toast.success(`${SECTION_TITLES[activeSection]} section saved successfully`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToWord = () => {
    toast.success("Exported to Word document");
    // In a real implementation, this would generate a Word document
  };

  const navigateToSection = (section: string) => {
    handleSave(); // Save current section before navigating
    setActiveSection(section);
  };

  const handlePrevSection = () => {
    const currentIndex = FORM_SECTIONS.indexOf(activeSection);
    if (currentIndex > 0) {
      navigateToSection(FORM_SECTIONS[currentIndex - 1]);
    }
  };

  const handleNextSection = () => {
    const currentIndex = FORM_SECTIONS.indexOf(activeSection);
    if (currentIndex < FORM_SECTIONS.length - 1) {
      navigateToSection(FORM_SECTIONS[currentIndex + 1]);
    }
  };

  const updateFormData = (sectionData: any) => {
    setFormData(prev => ({
      ...prev,
      ...sectionData
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          {project && (
            <SBIApartmentPrintForm
              formData={formData}
              projectData={project}
            />
          )}

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              {project ? `${project.customerName}'s SBI Apartment Valuation` : 'SBI Apartment Valuation Form'}
            </h1>
            <p className="text-muted-foreground">
              {project 
                ? `Project #${project.projectNumber} - Complete the form below for SBI apartment valuation` 
                : 'Complete the form below for SBI apartment valuation'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="p-4 border-b flex justify-between items-center dark:border-gray-700">
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevSection}
                  disabled={FORM_SECTIONS.indexOf(activeSection) === 0}
                  className="mr-2"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Previous
                </Button>
                <h2 className="text-lg font-medium dark:text-white px-4">
                  {SECTION_TITLES[activeSection]}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextSection}
                  disabled={FORM_SECTIONS.indexOf(activeSection) === FORM_SECTIONS.length - 1}
                >
                  Next
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2" 
                  onClick={handleSave}
                >
                  <FilePenLine size={16} />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handlePrint}
                >
                  <Printer size={16} />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleExportToWord}
                >
                  <FileText size={16} />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="p-2">
              <Tabs 
                value={activeSection} 
                onValueChange={navigateToSection}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-7 mb-4">
                  {FORM_SECTIONS.map((section) => (
                    <TabsTrigger key={section} value={section} className="text-xs py-1 px-2">
                      {SECTION_TITLES[section]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {FORM_SECTIONS.map((section) => (
                  <TabsContent key={section} value={section} className="p-2">
                    <SBIApartmentForm 
                      activeSection={section}
                      projectData={project}
                      updateFormData={updateFormData}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="p-4 border-t flex justify-between dark:border-gray-700">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevSection}
                disabled={FORM_SECTIONS.indexOf(activeSection) === 0}
              >
                <ArrowLeft size={16} className="mr-1" />
                Previous
              </Button>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleSave}
              >
                <FilePenLine size={16} className="mr-1" />
                Save Section
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextSection}
                disabled={FORM_SECTIONS.indexOf(activeSection) === FORM_SECTIONS.length - 1}
              >
                Next
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SBIApartmentValuation;
