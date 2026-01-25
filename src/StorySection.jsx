
import React from "react";
import RestaurantData from "./RestaurantData";
import { Star, ChefHat, Users } from 'lucide-react';


// Component for the About/Story Section
const StorySection = () => (
  <section id="story" className="py-20 bg-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Story Text */}
        <div className="lg:order-1">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-yellow-500 mb-4">
            Our Story & Philosophy
          </h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            {RestaurantData.description}
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-300">
              <Star className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
              <span className="font-semibold">Award-Winning Chefs</span>
            </div>
            <div className="flex items-center text-gray-300">
              <ChefHat className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
              <span className="font-semibold">Locally Sourced Ingredients</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Users className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
              <span className="font-semibold">Impeccable Service</span>
            </div>
          </div>
        </div>

        {/* Placeholder Image */}
        <div className="lg:order-2 rounded-xl overflow-hidden shadow-2xl">
          <img
            src="https://placehold.co/800x600/1F2937/FACC15?text=Chef+Preparing+Dish"
            alt="Chef preparing a dish"
            className="w-full h-auto object-cover transform hover:scale-105 transition duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  </section>
);

export default StorySection;