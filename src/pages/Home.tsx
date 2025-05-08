
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContentCardList from "@/components/ContentCardList";
import { useEffect } from "react";

const Home = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 text-center bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Campus Hydras
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting students worldwide through events, webinars, and collaborative learning experiences.
          </p>
        </div>
      </section>

      {/* Content Cards Section */}
      <section className="py-12 px-4 flex-grow">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold mb-8">Discover Our Content</h2>
          <ContentCardList />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
