import React from "react";
import RestaurantData from "./RestaurantData";

// Component for the Menu Preview Section
const MenuPreview = () => (
  <section id="menu" className="py-20 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-yellow-500 mb-4">
        Signature Dishes
      </h2>
      <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
        A glimpse into the excellence and innovation crafted by our Head Chef.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {RestaurantData.signatureDishes.map((dish) => {
          const Icon = dish.icon;
          return (
          <div
            key={dish.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-yellow-800/20 transform hover:scale-[1.02] transition duration-300"
          >
            {Icon ? <Icon className="w-10 h-10 text-yellow-500 mx-auto mb-4" /> : null}
            <h3 className="text-2xl font-semibold mb-2 font-serif">
              {dish.name}
            </h3>
            <p className="text-gray-400 mb-4">{dish.description}</p>
            <p className="text-3xl font-bold text-yellow-500">{dish.price}</p>
          </div>
          );
        })}
      </div>

      <a
        href="#"
        className="mt-12 inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-500 text-base font-medium rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300 uppercase tracking-wider"
      >
        View Full Menu
      </a>
    </div>
  </section>
);

export default MenuPreview;