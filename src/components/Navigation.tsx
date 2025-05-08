
import { Menu, LogIn, User, Search, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Input } from "./ui/input";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navigation = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  return (
    <nav className="fixed top-0 w-full bg-purple-900/90 backdrop-blur-md z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-white font-semibold text-xl">
            Campus Hydras
          </Link>

          <div className="hidden md:flex items-center flex-1 mx-4">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-purple-500"
                />
              </div>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-6">
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
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-white/80"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button 
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </div>
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
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-purple-500"
                />
              </div>
            </form>
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
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 justify-start"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-white border-white hover:bg-white/10 justify-start"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsRegisterModalOpen(true);
                    }}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen} 
      />

      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onOpenChange={setIsRegisterModalOpen} 
      />
    </nav>
  );
};

export default Navigation;
