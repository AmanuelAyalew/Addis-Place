import React, { useState } from "react";
import RestaurantData from "../Data/RestaurantData";
import { Clock, MapPin, Phone } from "lucide-react";
// Component for the Reservation/Contact Section
const ContactReservation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you'd send data to a backend here.
      // For this example, we'll just show a success message.
      setMessage(
        "Reservation request submitted! We will confirm via email shortly.",
      );
      e.target.reset(); // Clear form
    }, 1500);
  };

  return (
    <section id="reservations" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-yellow-500 text-center mb-4">
          Reserve Your Experience
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Secure a table for an unforgettable evening. We look forward to
          hosting you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form */}
          <div className="lg:col-span-2 bg-gray-800 p-8 rounded-xl shadow-xl border border-yellow-800/30">
            <h3 className="text-3xl font-serif font-semibold text-yellow-500 mb-6">
              Book Online
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <input
                  type="date"
                  placeholder="Date"
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-white"
                />
                <select
                  required
                  defaultValue=""
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-white appearance-none"
                >
                  <option value="" disabled>
                    Time
                  </option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
                <input
                  type="number"
                  placeholder="Guests (1-10)"
                  min="1"
                  max="10"
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-white"
                />
              </div>
              <textarea
                placeholder="Special Requests (e.g., dietary restrictions)"
                rows="3"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-white"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-500 text-base font-medium rounded-full text-black bg-yellow-500 hover:bg-yellow-600 shadow-lg transition duration-300 transform hover:scale-[1.01] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Confirm Reservation"
                )}
              </button>
              {message && (
                <p
                  className={`mt-4 text-center p-3 rounded-lg font-medium ${message.includes("success") ? "bg-green-600/30 text-green-300" : "bg-red-600/30 text-red-300"}`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div id="contact" className="lg:col-span-1 space-y-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-yellow-800/30">
              <h3 className="text-3xl font-serif font-semibold text-yellow-500 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-3" />
                Opening Hours
              </h3>
              <ul className="space-y-2 text-gray-300">
                {RestaurantData.hours.map((item) => (
                  <li
                    key={item.day}
                    className="flex justify-between border-b border-gray-700 pb-2 last:border-b-0"
                  >
                    <span className="font-medium">{item.day}:</span>
                    <span
                      className={
                        item.time === "Closed"
                          ? "text-red-400 font-bold"
                          : "text-yellow-300"
                      }
                    >
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-yellow-800/30">
              <h3 className="text-3xl font-serif font-semibold text-yellow-500 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-3" />
                Find Us
              </h3>
              <p className="text-gray-300 mb-4">{RestaurantData.address}</p>
              <a
                href={`tel:${RestaurantData.phone}`}
                className="inline-flex items-center text-yellow-500 hover:text-yellow-300 transition duration-300"
              >
                <main></main>
                <Phone className="w-5 h-5 mr-2" />
                {RestaurantData.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactReservation;
