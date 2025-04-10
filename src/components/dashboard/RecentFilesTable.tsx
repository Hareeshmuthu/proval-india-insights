
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data
const sampleData = [
  {
    id: "1",
    customerName: "Raj Patel",
    bankName: "HDFC Bank",
    dateCreated: "2023-04-01",
    status: "Completed",
  },
  {
    id: "2",
    customerName: "Priya Sharma",
    bankName: "State Bank of India",
    dateCreated: "2023-03-28",
    status: "In Progress",
  },
  {
    id: "3",
    customerName: "Anil Kumar",
    bankName: "ICICI Bank",
    dateCreated: "2023-03-25",
    status: "Pending",
  },
  {
    id: "4",
    customerName: "Sunita Verma",
    bankName: "Axis Bank",
    dateCreated: "2023-03-22",
    status: "Completed",
  },
  {
    id: "5",
    customerName: "Vikram Singh",
    bankName: "Punjab National Bank",
    dateCreated: "2023-03-20",
    status: "In Progress",
  },
];

const RecentFilesTable = () => {
  const [files] = useState(sampleData);
  
  return (
    <div className="card-stats overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">Recent Files</h3>
        <Button variant="link" className="text-proval-500 p-0">View All</Button>
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
            {files.map((file) => (
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
                  {new Date(file.dateCreated).toLocaleDateString('en-IN')}
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentFilesTable;
