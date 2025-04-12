
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
import { FilePlus, Search, MoreHorizontal, Trash, FileEdit, Download } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";

interface Project {
  id: number;
  projectNumber: number;
  customerName: string;
  bankName: string;
  propertyType: string;
  createdAt: string;
  status: string;
}

const ProjectFiles = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
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

  const handleDeleteProject = (project: Project) => {
    setDeleteProject(project);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (deleteProject) {
      const updatedProjects = projects.filter(p => p.id !== deleteProject.id);
      setProjects(updatedProjects);
      localStorage.setItem('proval_projects', JSON.stringify(updatedProjects));
      toast.success(`Project #${deleteProject.projectNumber} has been deleted`);
      setIsAlertOpen(false);
      setDeleteProject(null);
    }
  };

  const handleEditProject = (project: Project) => {
    // If SBI Apartment, navigate to SBI apartment page
    if (project.bankName === 'SBI' && project.propertyType === 'Apartment Flat') {
      navigate(`/dashboard/sbi-apartment?project=${project.projectNumber}`);
    } else {
      toast.info("Editing other project types is not yet implemented");
    }
  };

  const handleDownloadProject = (project: Project) => {
    toast.success(`Project #${project.projectNumber} will be downloaded as a Word document`);
    // In a real implementation, this would trigger a file download
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
                    <TableHead>Actions</TableHead>
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
                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                            : project.status === 'In Progress' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleEditProject(project)}
                              className="cursor-pointer flex items-center gap-2"
                            >
                              <FileEdit className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDownloadProject(project)}
                              className="cursor-pointer flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteProject(project)}
                              className="cursor-pointer text-red-600 flex items-center gap-2"
                            >
                              <Trash className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete Project #{deleteProject?.projectNumber} for {deleteProject?.customerName}.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
    </div>
  );
};

export default ProjectFiles;
