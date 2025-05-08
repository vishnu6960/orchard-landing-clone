
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-purple-900 text-white py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Campus Hydras</h3>
            <p className="text-sm text-gray-300 mb-4">
              Connecting students worldwide through events, webinars, and collaborative learning experiences.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/events" className="hover:text-white">Events</a></li>
              <li><a href="/webinars" className="hover:text-white">Webinars</a></li>
              <li><a href="/join" className="hover:text-white">Join Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 University Ave, Tech City</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@campushydras.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <p className="text-sm text-gray-300 mb-4">Stay updated with our latest events and webinars.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-white text-purple-900 hover:bg-gray-100">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Campus Hydras. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
