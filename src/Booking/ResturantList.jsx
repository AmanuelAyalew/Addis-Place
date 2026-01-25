import React, { useState } from "react";
import RestaurantData from "../RestaurantData";

const ResturantList = () => {
  const restaurants = [
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

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(restaurants.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const visible = restaurants.slice(start, start + itemsPerPage);

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
    </div>
  );
};

export default ResturantList;
