
import { CheckCircle, FileText, TrendingUp } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ProjectsChart from "@/components/dashboard/ProjectsChart";
import InvoiceStatusCard from "@/components/dashboard/InvoiceStatusCard";
import RecentFilesTable from "@/components/dashboard/RecentFilesTable";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('proval_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get projects from localStorage
    const storedProjects = localStorage.getItem('proval_projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Count completed and in-progress projects
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'Pending' || p.status === 'In Progress').length;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
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
              value={completedProjects.toString()}
              icon={CheckCircle}
              trend={{ value: "12%", positive: true }}
            />
            <StatCard 
              title="In Progress" 
              value={inProgressProjects.toString()}
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
          
          {/* Charts Row - Rearranged */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <InvoiceStatusCard />
            <div className="lg:col-span-6">
              <div className="card-stats">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Projects Overview</h3>
                </div>
                <ProjectsChart projects={projects} />
              </div>
            </div>
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
