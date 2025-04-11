import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { ArrowLeft, ArrowRight, CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectMap from "@/components/projects/ProjectMap";

const CreateProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [nextProjectNumber, setNextProjectNumber] = useState(1);
  const [showPvr, setShowPvr] = useState(false);
  
  const today = new Date();
  const expectedDate = addDays(today, 2);
  
  const [formData, setFormData] = useState({
    projectNumber: nextProjectNumber,
    enquiryDate: today,
    expectedReportDate: expectedDate,
    customerName: "",
    bankName: "",
    pvrType: "",
    propertyType: "",
    remarks: "",
    location: "",
    latitude: "",
    longitude: ""
  });
  
  useEffect(() => {
    const userData = localStorage.getItem('proval_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const storedProjects = localStorage.getItem('proval_projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      setNextProjectNumber(projects.length + 1);
      setFormData(prev => ({
        ...prev,
        projectNumber: projects.length + 1
      }));
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'bankName') {
      setShowPvr(value === 'LIC');
      if (value !== 'LIC') {
        setFormData(prev => ({
          ...prev,
          pvrType: ""
        }));
      }
    }
  };
  
  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        [name]: date
      });
    }
  };
  
  const handleMarkerChange = (lat: string, lng: string) => {
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng
    });
  };
  
  const handleAddressChange = (address: string) => {
    setFormData({
      ...formData,
      location: address
    });
  };
  
  const handleSubmit = (e: React.FormEvent, andNext: boolean = false) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.bankName || !formData.propertyType) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const storedProjects = localStorage.getItem('proval_projects');
    const projects = storedProjects ? JSON.parse(storedProjects) : [];
    
    const newProject = {
      ...formData,
      id: nextProjectNumber,
      enquiryDate: format(formData.enquiryDate, 'yyyy-MM-dd'),
      expectedReportDate: format(formData.expectedReportDate, 'yyyy-MM-dd'),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    
    localStorage.setItem('proval_projects', JSON.stringify(projects));
    
    toast({
      title: "Project created!",
      description: `Project #${nextProjectNumber} has been created successfully.`
    });
    
    if (formData.bankName === "SBI" && formData.propertyType === "Apartment Flat") {
      navigate(`/dashboard/sbi-apartment-form/${nextProjectNumber}`);
      return;
    }
    
    if (andNext) {
      setNextProjectNumber(prev => prev + 1);
      setFormData({
        projectNumber: nextProjectNumber + 1,
        enquiryDate: today,
        expectedReportDate: expectedDate,
        customerName: "",
        bankName: "",
        pvrType: "",
        propertyType: "",
        remarks: "",
        location: "",
        latitude: "",
        longitude: ""
      });
      setShowPvr(false);
    } else {
      navigate("/dashboard/files");
    }
  };
  
  const handleCancel = () => {
    navigate("/dashboard");
  };

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
          
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Type of Property *</Label>
                  <Select 
                    value={formData.propertyType} 
                    onValueChange={(value) => handleSelectChange('propertyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vacant Plot">Vacant Plot</SelectItem>
                      <SelectItem value="Residential House">Residential House</SelectItem>
                      <SelectItem value="Apartment Flat">Apartment Flat</SelectItem>
                      <SelectItem value="Industry">Industry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-full space-y-2">
                  <Label htmlFor="location">Location of Property</Label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Property Address"
                        className="mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleInputChange}
                          placeholder="Latitude"
                        />
                        <Input
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleInputChange}
                          placeholder="Longitude"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-full h-[300px] rounded-md overflow-hidden border">
                  <ProjectMap 
                    latitude={formData.latitude} 
                    longitude={formData.longitude}
                    onMarkerChange={handleMarkerChange}
                    onAddressChange={handleAddressChange}
                  />
                </div>
                
                <div className="col-span-full space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder="Enter any additional details about the project"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <div className="space-x-2">
                  <Button 
                    type="button" 
                    onClick={(e) => handleSubmit(e, true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit & Next
                  </Button>
                  <Button type="submit">
                    Submit <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProject;
