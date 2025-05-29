import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Overview of your listings and bookings
      </p>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#333446] shadow rounded-lg p-4 sm:p-6 text-start">
          <p className="text-white">Listings</p>
          <p className="text-2xl font-bold text-white">120</p>
        </div>
        <div className="bg-[#393E46] shadow rounded-lg p-4 sm:p-6 text-start">
          <p className="text-white">Bookings</p>
          <p className="text-2xl font-bold text-white">350</p>
        </div>
        <div className="bg-[#332D56] shadow rounded-lg p-4 sm:p-6 text-start">
          <p className="text-white">Packages</p>
          <p className="text-2xl font-bold text-white">50</p>
        </div>
        <div className="bg-[#183B4E] shadow rounded-lg p-4 sm:p-6 text-start">
          <p className="text-white">Packages</p>
          <p className="text-2xl font-bold text-white">50</p>
        </div>
      </div>

      {/* Listings Table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Listings</h2>
        <div className="overflow-x-auto border-[1.5px] border-[#000] border-opacity-25 rounded-xl">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "The Grand Resort",
                  location: "Coastal City",
                  status: "Active",
                },
                {
                  name: "Mountain Lodge",
                  location: "Alpine Village",
                  status: "Active",
                },
                {
                  name: "City Center Hotel",
                  location: "Metro City",
                  status: "Inactive",
                },
              ].map((listing, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{listing.name}</td>
                  <td className="py-2 px-4 text-orange-500">
                    {listing.location}
                  </td>
                  <td className="py-6 px-4">
                    <span
                      className={`px-3 py-1 rounded-xl text-sm ${
                        listing.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="text-sm text-blue-500">Edit</button>
                    <button className="text-sm text-red-500">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 px-4 py-2 rounded text-white bg-myColor">
          List New Hotel
        </button>
      </div>

      {/* Packages Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Packages</h2>
        <div className="overflow-x-auto border-[1.5px] border-[#000] border-opacity-25 rounded-xl">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Duration</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "City Explorer", duration: "3 Days", price: "$499" },
                {
                  name: "Mountain Adventure",
                  duration: "5 Days",
                  price: "$799",
                },
                { name: "Beach Getaway", duration: "7 Days", price: "$999" },
              ].map((pkg, i) => (
                <tr key={i} className="border-t">
                  <td className="py-6 px-4">{pkg.name}</td>
                  <td className="py-6 px-4 text-orange-500">{pkg.duration}</td>
                  <td className="py-6 px-4 text-green-600">{pkg.price}</td>
                  <td className="py-6 px-4 space-x-2">
                    <button className="text-sm text-blue-500">Edit</button>
                    <button className="text-sm text-red-500">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 px-4 py-2 rounded text-white bg-myColor">
          List New Package
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
