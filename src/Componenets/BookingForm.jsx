import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const BookingForm = ({
  isOpen,
  onClose,
  restaurant,
  onSubmit,
  currentUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Prefill name/email when user data is available
      setName(currentUser?.fullName || currentUser?.name || "");
      setEmail(currentUser?.email || "");
      setPhone("");
      setTime("");
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = {
      restaurantId: restaurant?.id,
      restaurantName: restaurant?.name,
      name,
      email,
      phone,
      time,
      createdAt: new Date().toISOString(),
    };

    // Upload booking JSON to Supabase Storage bucket 'bookings'
    try {
      const filename = `booking-${Date.now()}-${Math.floor(Math.random() * 10000)}.json`;
      const path = `bookings/${filename}`;
      const fileBlob = new Blob([JSON.stringify(booking)], {
        type: "application/json",
      });
      const { error: uploadError } = await supabase.storage
        .from("bookings")
        .upload(path, fileBlob, { upsert: true });
      if (uploadError) {
        console.warn(
          "Storage upload error:",
          uploadError.message || uploadError,
        );
      } else {
        const { data: urlData } = supabase.storage
          .from("bookings")
          .getPublicUrl(path);
        booking.storagePath = path;
        booking.storagePublicUrl = urlData?.publicUrl || null;
      }
    } catch (err) {
      console.warn("Failed to upload booking to storage:", err);
    }

    // Insert booking into the `bookings` table so admin can manage it
    try {
      const { data, error } = await supabase.from("bookings").insert([
        {
          restaurant_id: restaurant?.id || null,
          restaurant_name: restaurant?.name || null,
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          time: booking.time,
          created_at: booking.createdAt,
          user_id: currentUser?.id || null,
          user_full_name: currentUser?.fullName || currentUser?.name || null,
          user_email: currentUser?.email || null,
        },
      ]);

      if (error) {
        console.error("Failed to save booking to database:", error);
      } else {
        // Use DB row as the canonical booking object for callbacks
        const saved = Array.isArray(data) ? data[0] : data;
        if (onSubmit) onSubmit(saved);
      }
    } catch (err) {
      console.error("Unexpected error saving booking:", err);
      if (onSubmit) onSubmit(booking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-xl font-semibold mb-3">Book a table</h2>
        <p className="text-sm text-gray-600 mb-4">{restaurant?.name}</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-1">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-1">Phone</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Time</label>
            <select
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a time</option>
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
              <option>6:00 PM</option>
              <option>7:00 PM</option>
              <option>8:00 PM</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
