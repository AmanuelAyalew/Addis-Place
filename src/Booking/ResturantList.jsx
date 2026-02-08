import React, { useState } from "react";
import RestaurantData from "../Data/RestaurantData";
import BookingForm from "../Componenets/BookingForm";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import Toast from "../Componenets/Toast";

const ResturantList = () => {
  const initialRestaurants = [
    {
      id: 1,
      name: "Addis Place",
      image: RestaurantData.image,
      availableTables: 5,
    },
    {
      id: 2,
      name: "Blue Nile Hotel",
      image: RestaurantData.image,
      availableTables: 2,
    },
    {
      id: 3,
      name: "Sunrise Suites",
      image: RestaurantData.image,
      availableTables: 8,
    },
    {
      id: 4,
      name: "Harar Inn",
      image: RestaurantData.image,
      availableTables: 0,
    },
    {
      id: 5,
      name: "Lalibela Lodge",
      image: RestaurantData.image,
      availableTables: 3,
    },
    {
      id: 6,
      name: "Rift Valley Resort",
      image: RestaurantData.image,
      availableTables: 4,
    },
    {
      id: 7,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 8,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 9,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 10,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 11,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 12,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 13,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
    {
      id: 14,
      name: "Zege Bay",
      image: RestaurantData.image,
      availableTables: 1,
    },
  ];

  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(restaurants.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const visible = restaurants.slice(start, start + itemsPerPage);

  const handleBookClick = (r) => {
    setSelectedRestaurant(r);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };

  const { isSignedIn, user } = useUser();

  const handleBookingSubmit = async (booking) => {
    try {
      // attach authenticated user info when available
      const bookingWithUser = {
        ...booking,
        userId: isSignedIn ? user?.id : null,
        userFullName: isSignedIn
          ? user?.fullName ||
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
          : null,
        userEmail: isSignedIn
          ? user?.primaryEmailAddress?.email || user?.emailAddresses?.[0]?.email
          : null,
      };

      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingWithUser]);
      if (error) throw error;
      console.log("Booking saved to Supabase:", data);

      // attempt to also save booking JSON to Supabase Storage (bucket: 'bookings')
      try {
        const inserted = Array.isArray(data) ? data[0] : data;
        const fileId =
          inserted?.id || bookingWithUser.createdAt || `${Date.now()}`;
        const filename = `${fileId}.json`;
        const file = new File([JSON.stringify(bookingWithUser)], filename, {
          type: "application/json",
        });
        const { error: storageError } = await supabase.storage
          .from("bookings")
          .upload(`bookings/${filename}`, file, { upsert: true });
        if (storageError)
          console.warn(
            "Supabase storage upload error:",
            storageError.message || storageError,
          );
        else console.log("Booking JSON uploaded to storage:", filename);
      } catch (se) {
        console.warn("Failed to upload booking JSON to storage:", se);
      }

      setRestaurants((prev) =>
        prev.map((item) =>
          item.id === booking.restaurantId
            ? {
                ...item,
                availableTables: Math.max(0, item.availableTables - 1),
              }
            : item,
        ),
      );

      setIsModalOpen(false);
      setToast({
        open: true,
        message: "Booking submitted. Thank you!",
        type: "success",
      });
    } catch (err) {
      console.error("Supabase error:", err);
      // Fallback: update locally
      setRestaurants((prev) =>
        prev.map((item) =>
          item.id === booking.restaurantId
            ? {
                ...item,
                availableTables: Math.max(0, item.availableTables - 1),
              }
            : item,
        ),
      );
      setIsModalOpen(false);
      setToast({
        open: true,
        message: `Booking recorded locally. Supabase error: ${err?.message || JSON.stringify(err)}`,
        type: "error",
      });
    }
  };

  return (
    <div className="mb-40">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-70 mr-70 mt-10 mb-20">
        {visible.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={r.image}
              alt={r.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{r.name}</h3>
              <p className="text-sm text-gray-500 mb-3">
                Available tables:{" "}
                <Toast
                  open={toast.open}
                  message={toast.message}
                  type={toast.type}
                  onClose={() =>
                    setToast({ open: false, message: "", type: "success" })
                  }
                />
                <span
                  className={
                    r.availableTables > 0
                      ? "text-green-600 font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {r.availableTables}
                </span>
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleBookClick(r)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                  disabled={r.availableTables === 0}
                >
                  {r.availableTables > 0 ? "Book Now" : "No Availability"}
                </button>
                <span className="text-sm text-gray-400">ID: {r.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1 rounded ${p === currentPage ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
          disabled={currentPage === pageCount}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <BookingForm
        isOpen={isModalOpen}
        onClose={handleClose}
        restaurant={selectedRestaurant}
        onSubmit={handleBookingSubmit}
        currentUser={
          isSignedIn
            ? {
                fullName:
                  user?.fullName ||
                  `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
                email:
                  user?.primaryEmailAddress?.email ||
                  user?.emailAddresses?.[0]?.email,
                id: user?.id,
              }
            : null
        }
      />
    </div>
  );
};

export default ResturantList;
