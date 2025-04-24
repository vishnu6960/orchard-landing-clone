
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
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
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-white/80">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
