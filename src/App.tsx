
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
import { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('proval_logged_in') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  
  if (isLoggedIn === null) {
    // Still loading
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Create the query client instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
