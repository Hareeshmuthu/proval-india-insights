
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ThreatsDataTool from "@/components/tools/ThreatsDataTool";

const ThreatsAssessmentTool = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Threats Assessment Tool
            </h1>
            <p className="text-muted-foreground">
              Search for historical natural disasters or industrial pollution threats by location
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow dark:bg-gray-900 p-4">
            <ThreatsDataTool />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ThreatsAssessmentTool;
