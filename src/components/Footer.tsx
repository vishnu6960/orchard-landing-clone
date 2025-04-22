
const Footer = () => {
  return (
    <footer className="bg-[#F5F5F7] py-8 px-4">
      <div className="max-w-[980px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Shop and Learn</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Store</a></li>
              <li><a href="#" className="hover:underline">Mac</a></li>
              <li><a href="#" className="hover:underline">iPad</a></li>
              <li><a href="#" className="hover:underline">iPhone</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Apple Music</a></li>
              <li><a href="#" className="hover:underline">Apple TV+</a></li>
              <li><a href="#" className="hover:underline">Apple Arcade</a></li>
              <li><a href="#" className="hover:underline">iCloud</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Apple Store</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Find a Store</a></li>
              <li><a href="#" className="hover:underline">Genius Bar</a></li>
              <li><a href="#" className="hover:underline">Today at Apple</a></li>
              <li><a href="#" className="hover:underline">Apple Camp</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About Apple</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">Apple Leadership</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Ethics & Compliance</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
