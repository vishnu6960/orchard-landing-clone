
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold mb-2">iPhone 15 Pro</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-4">Titanium. So strong. So light. So Pro.</h2>
        <div className="space-x-6">
          <Button variant="link" className="text-blue-600 hover:text-blue-800">Learn more &gt;</Button>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">Buy &gt;</Button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000" 
          alt="iPhone 15 Pro"
          className="w-full max-w-[2000px] mx-auto mt-8 object-cover"
        />
      </section>

      {/* Product Grid */}
      <section className="px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[980px] mx-auto">
        <div className="bg-[#F5F5F7] rounded-3xl p-8 text-center">
          <h3 className="text-3xl font-semibold mb-2">MacBook Pro</h3>
          <p className="text-gray-600 mb-4">Supercharged by M3</p>
          <div className="space-x-6">
            <Button variant="link" className="text-blue-600 hover:text-blue-800">Learn more &gt;</Button>
            <Button variant="link" className="text-blue-600 hover:text-blue-800">Buy &gt;</Button>
          </div>
        </div>
        
        <div className="bg-[#F5F5F7] rounded-3xl p-8 text-center">
          <h3 className="text-3xl font-semibold mb-2">iPad</h3>
          <p className="text-gray-600 mb-4">Lovable. Drawable. Magical.</p>
          <div className="space-x-6">
            <Button variant="link" className="text-blue-600 hover:text-blue-800">Learn more &gt;</Button>
            <Button variant="link" className="text-blue-600 hover:text-blue-800">Buy &gt;</Button>
          </div>
        </div>
      </section>

      {/* Vision Pro Section */}
      <section className="px-4 py-12 text-center bg-black text-white">
        <h2 className="text-5xl md:text-6xl font-semibold mb-2">Vision Pro</h2>
        <p className="text-xl md:text-2xl mb-4">Welcome to the era of spatial computing.</p>
        <div className="space-x-6">
          <Button variant="link" className="text-blue-400 hover:text-blue-300">Learn more &gt;</Button>
          <Button variant="link" className="text-blue-400 hover:text-blue-300">Order now &gt;</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
