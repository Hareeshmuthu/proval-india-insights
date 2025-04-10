
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('proval_logged_in') === 'true';
    setIsLoggedIn(loggedIn);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('proval_logged_in');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="proval-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/69f351dd-a9a7-40f9-b907-653b287b76aa.png" 
                alt="Proval Logo" 
                className="h-8 w-auto"
              />
              <div className="flex flex-col items-start">
                <span className="font-bold text-2xl text-proval-500">Proval</span>
                <span className="text-[10px] text-red-600 font-italic -mt-1">Fast and Secured</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="hidden sm:inline-flex">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="hidden sm:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-proval-500 hover:bg-proval-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
