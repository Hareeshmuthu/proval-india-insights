
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ProjectBasicInfoProps {
  formData: {
    projectNumber: number;
    enquiryDate: Date;
    expectedReportDate: Date;
    customerName: string;
    bankName: string;
    pvrType: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (name: string, date: Date | undefined) => void;
  handleSelectChange: (name: string, value: string) => void;
  showPvr: boolean;
}

const ProjectBasicInfo = ({
  formData,
  handleInputChange,
  handleDateChange,
  handleSelectChange,
  showPvr,
}: ProjectBasicInfoProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="projectNumber">Project Number</Label>
        <Input
          id="projectNumber"
          name="projectNumber"
          value={formData.projectNumber}
          readOnly
          className="bg-muted"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="enquiryDate">Enquiry Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(formData.enquiryDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.enquiryDate}
              onSelect={(date) => handleDateChange('enquiryDate', date)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expectedReportDate">Expected Report Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(formData.expectedReportDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.expectedReportDate}
              onSelect={(date) => handleDateChange('expectedReportDate', date)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name *</Label>
        <Input
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          placeholder="Enter customer name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bankName">Bank Name *</Label>
        <Select 
          value={formData.bankName} 
          onValueChange={(value) => handleSelectChange('bankName', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select bank" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SBI">SBI</SelectItem>
            <SelectItem value="LIC">LIC</SelectItem>
            <SelectItem value="Canara">Canara</SelectItem>
            <SelectItem value="Repoco">Repoco</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {showPvr && (
        <div className="space-y-2">
          <Label htmlFor="pvrType">PVR</Label>
          <Select 
            value={formData.pvrType} 
            onValueChange={(value) => handleSelectChange('pvrType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select PVR type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PVR1">PVR1</SelectItem>
              <SelectItem value="PVR2">PVR2</SelectItem>
              <SelectItem value="PVR3">PVR3</SelectItem>
              <SelectItem value="PVR4">PVR4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default ProjectBasicInfo;
