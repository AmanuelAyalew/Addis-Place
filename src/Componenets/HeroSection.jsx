import React from "react";
import RestaurantData from "../Data/RestaurantData";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

// Component for the Hero Section
const HeroSection = () => {
  const bgStyle = {
    backgroundImage: `url(${RestaurantData.image})`,
    backgroundAttachment: "fixed", // Parallax effect
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center text-white"
      style={bgStyle}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative text-center max-w-4xl p-6 md:p-10 bg-black/50 rounded-xl shadow-2xl border border-yellow-800/30 animate-fadeIn">
        <p className="text-xl md:text-2xl font-medium text-yellow-500 mb-4 tracking-widest uppercase">
          {RestaurantData.tagline}
        </p>

        <h1 className="text-6xl md:text-8xl font-serif font-extrabold mb-8 drop-shadow-lg">
          {RestaurantData.name}
        </h1>

        <Link
          to="/restaurants"
          n
          className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-yellow-500 text-base font-medium rounded-full text-black bg-yellow-500 hover:bg-yellow-600 shadow-lg transition duration-300 transform hover:scale-105 uppercase tracking-wider"
        >
          <Users className="w-5 h-5 mr-2" />
          Book Your Table Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
