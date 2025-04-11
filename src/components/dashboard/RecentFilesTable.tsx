
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Download, Eye, FileText, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RecentFilesTable = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = localStorage.getItem('proval_projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      // Sort by createdAt date, most recent first
      const sortedProjects = [...projects].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      // Take only the 5 most recent
      setFiles(sortedProjects.slice(0, 5));
    }
  }, []);
  
  const handleEdit = (projectId: number) => {
    // Find project details to check bank and property type
    const project = files.find(p => p.id === projectId);
    
    if (project?.bankName === 'SBI' && project?.propertyType === 'Apartment Flat') {
      navigate(`/dashboard/sbi-apartment-form/${projectId}`);
    } else {
      // For other types, navigate to a generic edit page
      navigate(`/dashboard/create?edit=${projectId}`);
    }
  };
  
  const handleViewDetails = (projectId: number) => {
    const project = files.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setDetailsDialogOpen(true);
    }
  };
  
  const handleDownload = (projectId: number) => {
    // Find the project
    const project = files.find(p => p.id === projectId);
    
    if (!project) {
      toast.error("Project not found");
      return;
    }
    
    // For demonstration purposes, we'll create a simple text representation
    // In a real app, this would generate a PDF using a library
    const projectData = `
Project #: ${project.projectNumber}
Customer: ${project.customerName}
Bank: ${project.bankName}
Status: ${project.status}
Created: ${new Date(project.createdAt).toLocaleDateString()}
    `;
    
    // Create a blob and download it
    const blob = new Blob([projectData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Project_${project.projectNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Project downloaded successfully");
  };
  
  return (
    <div className="card-stats overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">Recent Files</h3>
        <Link to="/dashboard/files">
          <Button variant="link" className="text-proval-500 p-0">View All</Button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length > 0 ? (
              files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="bg-proval-50 p-2 rounded">
                        <FileText size={16} className="text-proval-500" />
                      </div>
                      {file.customerName}
                    </div>
                  </TableCell>
                  <TableCell>{file.bankName}</TableCell>
                  <TableCell>
                    {new Date(file.createdAt).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        file.status === "Completed"
                          ? "text-green-600 bg-green-50 border-green-200"
                          : file.status === "In Progress"
                          ? "text-blue-600 bg-blue-50 border-blue-200"
                          : "text-yellow-600 bg-yellow-50 border-yellow-200"
                      }
                    >
                      {file.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(file.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(file.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(file.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No projects found. <Link to="/dashboard/create" className="text-proval-500 hover:underline">Create your first project</Link>.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Project Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
            <DialogDescription>
              Detailed information about the project.
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Project #:</div>
                <div className="col-span-2">{selectedProject.projectNumber}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Customer:</div>
                <div className="col-span-2">{selectedProject.customerName}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Bank:</div>
                <div className="col-span-2">{selectedProject.bankName}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Property Type:</div>
                <div className="col-span-2">{selectedProject.propertyType || "Not specified"}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">{selectedProject.status}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Created:</div>
                <div className="col-span-2">{new Date(selectedProject.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
              {selectedProject.location && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Location:</div>
                  <div className="col-span-2">{selectedProject.location}</div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setDetailsDialogOpen(false);
              if (selectedProject) {
                handleEdit(selectedProject.id);
              }
            }}>
              Edit Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecentFilesTable;
