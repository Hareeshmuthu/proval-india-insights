
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MoreHorizontal, Trash, FileEdit, Download } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RecentFilesTable = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);
  const [deleteProject, setDeleteProject] = useState<any | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
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

  const handleDeleteProject = (project: any) => {
    setDeleteProject(project);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (deleteProject) {
      // Get all projects
      const storedProjects = localStorage.getItem('proval_projects');
      if (storedProjects) {
        const allProjects = JSON.parse(storedProjects);
        const updatedProjects = allProjects.filter((p: any) => p.id !== deleteProject.id);
        
        // Update localStorage
        localStorage.setItem('proval_projects', JSON.stringify(updatedProjects));
        
        // Update state
        const updatedFiles = files.filter(f => f.id !== deleteProject.id);
        setFiles(updatedFiles);
        
        toast.success(`Project #${deleteProject.projectNumber} has been deleted`);
      }
      
      setIsAlertOpen(false);
      setDeleteProject(null);
    }
  };

  const handleEditProject = (project: any) => {
    // If SBI Apartment, navigate to SBI apartment page
    if (project.bankName === 'SBI' && project.propertyType === 'Apartment Flat') {
      navigate(`/dashboard/sbi-apartment?project=${project.projectNumber}`);
    } else {
      toast.info("Editing other project types is not yet implemented");
    }
  };

  const handleDownloadProject = (project: any) => {
    toast.success(`Project #${project.projectNumber} will be downloaded as a Word document`);
    // In a real implementation, this would trigger a file download
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
              <TableHead>Actions</TableHead>
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
                          ? "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                          : file.status === "In Progress"
                          ? "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                          : "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                      }
                    >
                      {file.status}
                    </Badge>
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
                          onClick={() => handleEditProject(file)}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <FileEdit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDownloadProject(file)}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteProject(file)}
                          className="cursor-pointer text-red-600 flex items-center gap-2"
                        >
                          <Trash className="h-4 w-4" /> Delete
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
    </div>
  );
};

export default RecentFilesTable;
