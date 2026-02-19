import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      setBookings((b) => b.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete booking:", err);
      alert("Failed to delete booking");
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold">Recent Orders</h3>
        <div>
          <button
            onClick={load}
            className="px-3 py-1 bg-gray-100 rounded mr-2 text-sm"
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 5).map((b, idx) => (
              <tr key={b.id} className="border-t text-sm">
                <td className="px-4 py-3">
                  {String(idx + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">
                  {new Date(b.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Received
                  </span>
                </td>
                <td className="px-4 py-3">{b.phone}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  {loading ? "Loading..." : "No bookings found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-white rounded-lg p-6 w-11/12 max-w-2xl">
            <h4 className="text-lg font-semibold mb-2">Booking Details</h4>
            <pre className="text-sm bg-gray-50 p-3 rounded max-h-96 overflow-auto">
              {JSON.stringify(selected, null, 2)}
            </pre>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
