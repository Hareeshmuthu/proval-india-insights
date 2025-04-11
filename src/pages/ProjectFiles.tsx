
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { Edit, FilePlus, Search, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  
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
  
  const handleEdit = (projectId: number) => {
    // Find project details to check bank and property type
    const project = projects.find(p => p.id === projectId);
    
    if (project?.bankName === 'SBI' && project?.propertyType === 'Apartment Flat') {
      navigate(`/dashboard/sbi-apartment-form/${projectId}`);
    } else {
      // For other types, navigate to a generic edit page
      navigate(`/dashboard/create?edit=${projectId}`);
    }
  };
  
  const handleDelete = (projectId: number) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (projectToDelete === null) return;
    
    const updatedProjects = projects.filter(project => project.id !== projectToDelete);
    setProjects(updatedProjects);
    
    // Update localStorage
    localStorage.setItem('proval_projects', JSON.stringify(updatedProjects));
    
    // Close dialog and reset state
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
    
    // Show success toast
    toast.success("Project deleted successfully");
  };
  
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map(project => (
                    <TableRow key={project.id}>
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
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(project.id)}
                            className="h-8 px-2"
                          >
                            <Edit size={16} className="mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2 text-destructive border-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        </div>
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
      
      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectFiles;
