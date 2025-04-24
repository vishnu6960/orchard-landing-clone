
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Home = () => {
  const partners = [
    {
      name: "University Partner 1",
      logo: "https://via.placeholder.com/150",
    },
    {
      name: "Tech Company 1",
      logo: "https://via.placeholder.com/150",
    },
    {
      name: "Education Institute 1",
      logo: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Vision */}
      <section className="pt-32 pb-16 px-4 text-center bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Student Tribe
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting students worldwide through events, webinars, and collaborative learning experiences.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">Join Our Community</Button>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Vision</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-purple-50">
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <p className="text-gray-600">
                Building bridges between students from different backgrounds and cultures.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-purple-50">
              <h3 className="text-xl font-semibold mb-4">Learn</h3>
              <p className="text-gray-600">
                Providing valuable learning experiences through expert-led webinars.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-purple-50">
              <h3 className="text-xl font-semibold mb-4">Grow</h3>
              <p className="text-gray-600">
                Creating opportunities for personal and professional development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">{partner.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
