
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className={`border-b backdrop-blur-md sticky top-0 z-50 ${isHomePage ? 'bg-transparent border-gray-800' : 'bg-background/80'}`}>
      <div className="proval-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/9ea82532-ad63-47fb-9ac0-89f899471da7.png" 
                alt="Proval Logo" 
                className="h-8 w-auto"
              />
              <div className="flex flex-col items-start">
                <span className="font-bold text-2xl text-red-600">Proval</span>
                <span className="text-[10px] text-red-600 font-italic -mt-1">Fast and Secured</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className={`nav-link ${isHomePage ? 'text-gray-300 hover:text-white' : ''}`}>Home</Link>
              <Link to="/about" className={`nav-link ${isHomePage ? 'text-gray-300 hover:text-white' : ''}`}>About Us</Link>
              <Link to="/pricing" className={`nav-link ${isHomePage ? 'text-gray-300 hover:text-white' : ''}`}>Pricing</Link>
              <Link to="/contact" className={`nav-link ${isHomePage ? 'text-gray-300 hover:text-white' : ''}`}>Contact Us</Link>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!isHomePage && <ThemeToggle />}
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant={isHomePage ? "default" : "outline"} 
                    className={`hidden sm:inline-flex ${isHomePage ? 'bg-white text-[#1e1e2f] hover:bg-gray-200' : ''}`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  className={isHomePage ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0' : ''}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className={`hidden sm:inline-flex ${isHomePage ? 'text-white border-white hover:bg-white/10' : ''}`}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    className={isHomePage 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0' 
                      : 'bg-proval-500 hover:bg-proval-600'
                    }
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={isHomePage ? 'text-white' : ''}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 pt-8">
                    <Link to="/" className="text-lg font-medium py-2">Home</Link>
                    <Link to="/about" className="text-lg font-medium py-2">About Us</Link>
                    <Link to="/pricing" className="text-lg font-medium py-2">Pricing</Link>
                    <Link to="/contact" className="text-lg font-medium py-2">Contact Us</Link>
                    <div className="border-t my-4 pt-4">
                      {user ? (
                        <>
                          <Link to="/dashboard">
                            <Button className="w-full mb-2">Dashboard</Button>
                          </Link>
                          <Button variant="outline" className="w-full" onClick={handleLogout}>
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link to="/login">
                            <Button variant="outline" className="w-full mb-2">Login</Button>
                          </Link>
                          <Link to="/signup">
                            <Button className="w-full">Sign Up</Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
