
import { CheckCircle, FileText, TrendingUp, User } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ProjectsChart from "@/components/dashboard/ProjectsChart";
import InvoiceStatusCard from "@/components/dashboard/InvoiceStatusCard";
import RecentFilesTable from "@/components/dashboard/RecentFilesTable";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('proval_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          {user && (
            <h1 className="text-2xl font-bold text-foreground mb-6">
              Hello, {user.firstName} {user.lastName} 👋
            </h1>
          )}
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard 
              title="Completed Projects" 
              value="36"
              icon={CheckCircle}
              trend={{ value: "12%", positive: true }}
            />
            <StatCard 
              title="In Progress" 
              value="24"
              icon={FileText}
              trend={{ value: "5%", positive: true }}
            />
            <StatCard 
              title="Revenue" 
              value="₹4.2L"
              icon={TrendingUp}
              trend={{ value: "8%", positive: true }}
            />
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ProjectsChart />
            <InvoiceStatusCard />
          </div>
          
          {/* Recent Files Table */}
          <div className="mb-6">
            <RecentFilesTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
