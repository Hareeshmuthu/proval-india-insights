
import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const DashboardHeader = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('proval_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="bg-background border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="font-semibold text-foreground hover:text-proval-500">
          Dashboard
        </Link>
        <Link to="/dashboard/projects" className="font-semibold text-foreground hover:text-proval-500">
          Projects
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="w-full pl-9 bg-background border-input"
          />
        </div>
        
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-2">
          {user && (
            <span className="text-sm font-medium hidden md:inline-block">
              Hi, {user.firstName}!
            </span>
          )}
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
