
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SBIApartmentForm from "@/components/forms/SBIApartmentForm";
import { FilePenLine, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SBIApartmentValuation = () => {
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
            <h1 className="text-2xl font-bold text-foreground">SBI Apartment Valuation Form</h1>
            <p className="text-muted-foreground">Complete the form below for SBI apartment valuation</p>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">Valuation Report</h2>
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
