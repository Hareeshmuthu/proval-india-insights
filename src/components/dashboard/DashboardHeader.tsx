
import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="font-semibold text-gray-700 hover:text-proval-500">
          Dashboard
        </Link>
        <Link to="/dashboard/projects" className="font-semibold text-gray-700 hover:text-proval-500">
          Projects
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="w-full pl-9 bg-gray-50 border-gray-200"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
