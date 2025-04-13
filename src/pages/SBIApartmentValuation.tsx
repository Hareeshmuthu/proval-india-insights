
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SBIApartmentForm from "@/components/forms/SBIApartmentForm";
import PropertyMarketDataTool from "@/components/tools/PropertyMarketDataTool";
import { FilePenLine, Printer, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
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
          
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="form">Valuation Form</TabsTrigger>
              <TabsTrigger value="marketData">
                <MapPin className="h-4 w-4 mr-2" />
                Market Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
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
            </TabsContent>

            <TabsContent value="marketData">
              <div className="bg-white rounded-lg shadow dark:bg-gray-900 p-4">
                <PropertyMarketDataTool />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SBIApartmentValuation;
