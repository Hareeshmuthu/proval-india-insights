
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { FilePlus, Search } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Project {
  id: number;
  projectNumber: number;
  customerName: string;
  bankName: string;
  createdAt: string;
  status: string;
}

const ProjectFiles = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = localStorage.getItem('proval_projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);
  
  const filteredProjects = projects.filter(project => 
    project.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectNumber.toString().includes(searchTerm)
  );
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">My Files</h1>
            <Button 
              onClick={() => navigate("/dashboard/create")}
              className="flex items-center gap-2"
            >
              <FilePlus size={16} /> Create New Project
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by customer, bank or project number"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Projects Table */}
          <div className="bg-card border rounded-lg overflow-hidden">
            {projects.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project #</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Bank Name</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map(project => (
                    <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{project.projectNumber}</TableCell>
                      <TableCell>{project.customerName}</TableCell>
                      <TableCell>{project.bankName}</TableCell>
                      <TableCell>
                        {format(parseISO(project.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'In Progress' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">You haven't created any projects yet.</p>
                <Button 
                  onClick={() => navigate("/dashboard/create")}
                  className="flex items-center gap-2"
                >
                  <FilePlus size={16} /> Create Your First Project
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectFiles;
