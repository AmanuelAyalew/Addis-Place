import { useState } from "react";
import RestaurantData from "../Data/RestaurantData";
import { X, Menu as MenuIcon } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

// Component for the Navigation Bar
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Menu", href: "#menu" },
    { name: "Our Story", href: "#story" },
    { name: "Reservations", href: "#reservations" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#"
            className="text-2xl font-serif font-bold text-yellow-500 tracking-wider"
          >
            {RestaurantData.name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-yellow-500 transition duration-300 uppercase tracking-widest text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton className="bg-yellow-500 text-white hover:bg-yellow-600 px-3 py-2 rounded-lg uppercase tracking-widest text-sm font-medium transition duration-300" />
              <SignUpButton className="bg-yellow-500 text-white hover:bg-yellow-600 px-3 py-2 rounded-lg uppercase tracking-widest text-sm font-medium transition duration-300" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-yellow-500 transition duration-300 p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-black/95 transition-all duration-300">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-yellow-500 transition duration-300 uppercase tracking-widest text-lg font-medium border-b border-gray-800/50 pb-2"
              >
                {item.name}
              </a>
            ))}
          </nav>
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 p-4">
            <SignedOut>
              <SignInButton className="bg-yellow-500 text-blue-500 hover:bg-yellow-600 px-4 py-2 rounded-md uppercase tracking-widest text-lg font-medium transition duration-300" />
              <SignUpButton className="bg-yellow-500 text-blue-500 hover:bg-yellow-600 px-4 py-2 rounded-md uppercase tracking-widest text-lg font-medium transition duration-300" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
