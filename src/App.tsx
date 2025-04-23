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
import CanaraVacantPlotValuation from "./pages/CanaraVacantPlotValuation";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const RouterWrapper = () => {
  useEffect(() => {
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
            path="/dashboard/canara-vacant-plot" 
            element={
              <ProtectedRoute>
                <CanaraVacantPlotValuation />
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
