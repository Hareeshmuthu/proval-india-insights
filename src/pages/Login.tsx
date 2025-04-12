
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const { signIn, loading, user } = useAuth();
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
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a hash in the URL (email confirmation)
    const handleEmailConfirmation = async () => {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');
      
      if (type === 'signup' && accessToken) {
        try {
          // Set the session using the tokens from the URL
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });
          
          if (error) throw error;
          
          toast({
            title: "Email verified successfully!",
            description: "You can now log in with your email and password.",
          });
          
          // Clear the hash from the URL
          window.history.replaceState(null, document.title, window.location.pathname);
        } catch (error: any) {
          console.error("Error confirming email:", error);
          toast({
            title: "Email verification failed",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    };
    
    if (location.hash) {
      handleEmailConfirmation();
    }
  }, [location.hash, toast]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log("Attempting to sign in with:", formData.email);
        await signIn(formData.email, formData.password);
      } catch (error: any) {
        console.error("Login error:", error);
        setErrors({
          ...errors,
          general: error.message || "An error occurred during login."
        });
      }
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      setErrors({
        ...errors,
        email: "Please enter your email address"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
        options: {
          emailRedirectTo: window.location.origin + '/login',
        },
      });

      if (error) throw error;
      
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and verify your email before logging in.",
      });
    } catch (error: any) {
      console.error("Error resending verification email:", error);
      toast({
        title: "Error sending verification email",
        description: error.message,
        variant: "destructive"
      });
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
                {errors.general.includes('Email not confirmed') && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResendVerification}
                      className="text-xs"
                    >
                      Resend verification email
                    </Button>
                  </div>
                )}
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
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-medium">
                    Sign up
                  </Link>
                </p>
                
                <p className="text-sm text-gray-500">
                  <button
                    type="button"
                    className="text-primary font-medium"
                    onClick={handleResendVerification}
                  >
                    Didn't receive verification email?
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
