
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3,
  FileText,
  FilePlus, 
  Folder, 
  Map, 
  Settings, 
  BookOpen, 
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Create New",
      icon: FilePlus,
      path: "/dashboard/create"
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/dashboard/reports"
    },
    {
      title: "Invoice",
      icon: FileSpreadsheet,
      path: "/dashboard/invoice"
    },
    {
      title: "My Files",
      icon: Folder,
      path: "/dashboard/files"
    },
    {
      title: "Tools",
      icon: Settings,
      path: "/dashboard/tools"
    },
    {
      title: "Maps",
      icon: Map,
      path: "/dashboard/maps"
    },
    {
      title: "Guidelines",
      icon: BookOpen,
      path: "/dashboard/guidelines"
    }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "bg-white border-r h-screen transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <Link to="/dashboard" className="font-bold text-xl text-proval-500">
            Proval
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-link",
                location.pathname === item.path && "active",
                collapsed && "justify-center p-2"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        {collapsed ? (
          <Button className="w-full bg-proval-500 hover:bg-proval-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M19 16v6H5v-6"/></svg>
          </Button>
        ) : (
          <div className="bg-proval-50 rounded-lg p-4">
            <p className="text-sm font-medium text-proval-600 mb-2">Upgrade to Pro</p>
            <p className="text-xs text-gray-600 mb-3">
              Get access to advanced features and priority support.
            </p>
            <Button className="w-full bg-proval-500 hover:bg-proval-600">
              Upgrade
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
