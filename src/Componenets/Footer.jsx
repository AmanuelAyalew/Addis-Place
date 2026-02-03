import React from "react";
import RestaurantData from "../Data/RestaurantData";
import { Facebook, Instagram, Twitter } from "lucide-react";
// Component for the Footer

const Footer = () => (
  <footer className="bg-black border-t border-yellow-800/20 py-8 text-gray-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center space-x-6 mb-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-yellow-500 transition duration-300"
        >
          <Facebook className="w-6 h-6" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-yellow-500 transition duration-300"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-yellow-500 transition duration-300"
        >
          <Twitter className="w-6 h-6" />
        </a>
      </div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} {RestaurantData.name}. All Rights
        Reserved.
      </p>
      <p className="text-xs mt-2">Designed with culinary passion in mind.</p>
    </div>
  </footer>
);

export default Footer;
