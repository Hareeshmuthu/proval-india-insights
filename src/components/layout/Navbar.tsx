
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="proval-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl text-proval-500">Proval</span>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
