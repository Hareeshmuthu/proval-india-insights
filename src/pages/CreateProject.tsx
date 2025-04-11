
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import CreateProjectForm from "@/components/projects/CreateProjectForm";

const CreateProject = () => {
  const navigate = useNavigate();
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
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Hey {user?.firstName || 'there'}! Time for a new project.
            </h1>
            <Button onClick={() => navigate("/dashboard/files")} className="flex items-center gap-2">
              Go to Projects <ArrowRight size={16} />
            </Button>
          </div>
          
          <CreateProjectForm />
        </main>
      </div>
    </div>
  );
};

export default CreateProject;
