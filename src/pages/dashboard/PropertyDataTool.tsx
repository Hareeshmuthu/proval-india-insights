
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PropertyMarketDataTool from "@/components/tools/PropertyMarketDataTool";

const PropertyDataTool = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Property Market Data Tool
            </h1>
            <p className="text-muted-foreground">
              Get comprehensive market data for any location by entering coordinates or an address
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow dark:bg-gray-900 p-4">
            <PropertyMarketDataTool />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertyDataTool;
