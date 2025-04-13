
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProject from "./pages/CreateProject";
import ProjectFiles from "./pages/ProjectFiles";
import SBIApartmentValuation from "./pages/SBIApartmentValuation";
import PropertyDataTool from "./pages/dashboard/PropertyDataTool";
import ThreatsAssessmentTool from "./pages/dashboard/ThreatsAssessmentTool";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    // Still loading
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Create the query client instance
const queryClient = new QueryClient();

// We need this RouterWrapper because the AuthProvider needs to access useNavigate
// but BrowserRouter needs to be the parent of AuthProvider
const RouterWrapper = () => {
  useEffect(() => {
    // Set dark mode by default for home page
    const path = window.location.pathname;
    if (path === "/" || path === "/signup" || path === "/login") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("proval-theme", "dark");
    } else {
      const savedTheme = localStorage.getItem("proval-theme") as "light" | "dark" | null;
      if (savedTheme) {
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      }
    }
  }, []);

  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/create" 
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/files" 
            element={
              <ProtectedRoute>
                <ProjectFiles />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/sbi-apartment" 
            element={
              <ProtectedRoute>
                <SBIApartmentValuation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/property-data" 
            element={
              <ProtectedRoute>
                <PropertyDataTool />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/threats-assessment" 
            element={
              <ProtectedRoute>
                <ThreatsAssessmentTool />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RouterWrapper />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
