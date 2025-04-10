
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors, general: "" };
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would be an API call
      const storedCredentials = localStorage.getItem('proval_credentials');
      
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        
        if (credentials.email === formData.email && credentials.password === formData.password) {
          // Set user as logged in
          localStorage.setItem('proval_logged_in', 'true');
          
          toast({
            title: "Login successful!",
            description: "Welcome back to Proval.",
          });
          
          navigate("/dashboard");
        } else {
          setErrors({
            ...errors,
            general: "Invalid email or password."
          });
        }
      } else {
        setErrors({
          ...errors,
          general: "No account found. Please sign up first."
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-10 flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-6 border">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Login to <span className="text-red-600">Proval</span></h1>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>
            
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              
              <Button type="submit" className="w-full">Login</Button>
              
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
