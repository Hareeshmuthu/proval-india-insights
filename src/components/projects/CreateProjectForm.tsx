
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProjectBasicInfo from "./ProjectBasicInfo";
import ProjectPropertyDetails from "./ProjectPropertyDetails";
import ProjectLocationDetails from "./ProjectLocationDetails";

const CreateProjectForm = () => {
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
    <form onSubmit={(e) => handleSubmit(e, false)} className="bg-card border rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ProjectBasicInfo 
          formData={formData} 
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleSelectChange={handleSelectChange}
          showPvr={showPvr}
        />
        
        <ProjectPropertyDetails 
          formData={formData}
          handleSelectChange={handleSelectChange}
        />
        
        <ProjectLocationDetails 
          formData={formData}
          handleInputChange={handleInputChange}
          handleMarkerChange={handleMarkerChange}
          handleAddressChange={handleAddressChange}
        />
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
  );
};

export default CreateProjectForm;
