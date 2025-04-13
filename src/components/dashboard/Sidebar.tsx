
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
  ChevronRight,
  Building,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openTools, setOpenTools] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  
  useEffect(() => {
    const userData = localStorage.getItem('proval_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
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

  const toolsSubMenu = [
    {
      title: "Property Market Data",
      icon: Building,
      path: "/dashboard/property-data"
    },
    {
      title: "Threats Assessment",
      icon: AlertTriangle,
      path: "/dashboard/threats-assessment"
    }
  ];

  useEffect(() => {
    // Check if we're on any tools subpages
    if (toolsSubMenu.some(item => location.pathname === item.path)) {
      setOpenTools(true);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "bg-background border-r h-screen transition-all duration-300 flex flex-col fixed",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/9ea82532-ad63-47fb-9ac0-89f899471da7.png" 
              alt="Proval Logo" 
              className="h-8 w-auto" 
            />
            <span className="font-bold text-xl text-red-600">Proval</span>
          </div>
        ) : (
          <img 
            src="/lovable-uploads/9ea82532-ad63-47fb-9ac0-89f899471da7.png" 
            alt="Proval Logo" 
            className="h-8 w-auto mx-auto" 
          />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={collapsed ? "mx-auto" : "ml-auto"}
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
          
          {/* Tools with submenu */}
          <Collapsible 
            open={openTools && !collapsed} 
            onOpenChange={!collapsed ? setOpenTools : undefined}
            className="w-full"
          >
            <CollapsibleTrigger 
              className={cn(
                "sidebar-link w-full",
                (location.pathname === "/dashboard/tools" || 
                 toolsSubMenu.some(item => location.pathname === item.path)) && "active",
                collapsed && "justify-center p-2"
              )}
              onClick={(e) => {
                if (collapsed) {
                  e.preventDefault();
                  window.location.href = "/dashboard/tools";
                }
              }}
            >
              <Settings size={20} />
              {!collapsed && (
                <>
                  <span className="flex-1">Tools</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-200 ${openTools ? 'rotate-90' : ''}`}
                  />
                </>
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="ml-6 mt-1 space-y-1">
              {toolsSubMenu.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={cn(
                    "sidebar-link text-sm py-2",
                    location.pathname === subItem.path && "active"
                  )}
                >
                  <subItem.icon size={16} />
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        {collapsed ? (
          <Button className="w-full bg-proval-500 hover:bg-proval-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M19 16v6H5v-6"/></svg>
          </Button>
        ) : (
          <div className="bg-proval-50 rounded-lg p-4 dark:bg-gray-800">
            <p className="text-sm font-medium text-red-600 dark:text-red-300 mb-2">Upgrade to Pro</p>
            <p className="text-xs text-gray-600 mb-3 dark:text-gray-400">
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
