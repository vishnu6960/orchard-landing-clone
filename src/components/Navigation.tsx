
import { Menu, LogIn, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Navigation = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-purple-900/90 backdrop-blur-md z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-white font-semibold text-xl">
            Student Tribe
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-white/80">
              Home
            </Link>
            <Link to="/events" className="text-white hover:text-white/80">
              Events
            </Link>
            <Link to="/webinars" className="text-white hover:text-white/80">
              Webinars
            </Link>
            <Link to="/join" className="text-white hover:text-white/80">
              Join Us
            </Link>
            
            {user ? (
              <Link to="/profile" className="text-white hover:text-white/80 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            ) : (
              <Link to="/auth" className="text-white hover:text-white/80 flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:text-white/80"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-purple-900 pb-4 px-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-white/80 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className="text-white hover:text-white/80 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/webinars" 
                className="text-white hover:text-white/80 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Webinars
              </Link>
              <Link 
                to="/join" 
                className="text-white hover:text-white/80 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Us
              </Link>
              
              {user ? (
                <Link 
                  to="/profile" 
                  className="text-white hover:text-white/80 flex items-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              ) : (
                <Link 
                  to="/auth" 
                  className="text-white hover:text-white/80 flex items-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
