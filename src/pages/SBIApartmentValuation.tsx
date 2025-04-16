
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SBIApartmentForm from "@/components/forms/SBIApartmentForm";
import { FilePenLine, Printer, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Project {
  id: number;
  projectNumber: number;
  customerName: string;
  bankName: string;
  propertyType: string;
}

const SBIApartmentValuation = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
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
    toast.success("Form saved successfully");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToWord = () => {
    toast.success("Exported to Word document");
    // In a real implementation, this would generate a Word document
  };

  const handleBackToFiles = () => {
    navigate('/dashboard/files');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-2 flex items-center gap-2"
                onClick={handleBackToFiles}
              >
                <ArrowLeft size={16} /> Back to Files
              </Button>
              <h1 className="text-2xl font-bold text-foreground">
                {project ? `${project.customerName}'s SBI Apartment Valuation` : 'SBI Apartment Valuation Form'}
              </h1>
              <p className="text-muted-foreground">
                {project 
                  ? `Project #${project.projectNumber} - Complete the form below for SBI apartment valuation` 
                  : 'Complete the form below for SBI apartment valuation'}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="p-4 border-b flex justify-between items-center dark:border-gray-700">
              <h2 className="text-lg font-medium dark:text-white">Valuation Report</h2>
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
            <div className="print:p-0 p-4">
              <SBIApartmentForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SBIApartmentValuation;
