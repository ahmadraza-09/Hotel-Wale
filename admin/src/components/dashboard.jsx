import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#E85C53] text-white p-4 shadow rounded-lg">
          <div className="text-2xl font-bold">2.8B</div>
          <div>Total Earnings</div>
        </div>
        <div className="bg-[#53A0E8] text-white p-4 shadow rounded-lg">
          <div className="text-2xl font-semibold">1.5M</div>
          <div>Happy Users</div>
        </div>
        <div className="bg-[#6853E8] text-white p-4 shadow rounded-lg">
          <div className="text-2xl font-semibold">10K</div>
          <div>Employees</div>
        </div>
        <div className="bg-[#3BC98D] text-white p-4 shadow rounded-lg">
          <div className="text-2xl font-semibold">12K</div>
          <div>New Bookings</div>
        </div>
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Bookings */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-lg font-semibold mb-2">
            Latest Hotel Bookings
          </div>
          <div className="text-sm text-gray-400">May, 2021</div>
          <div className="flex items-center space-x-2 my-2">
            <input
              type="date"
              className="border p-1 rounded w-1/2"
              defaultValue="2021-05-28"
            />
            <input
              type="date"
              className="border p-1 rounded w-1/2"
              defaultValue="2021-06-05"
            />
          </div>
          <ul className="space-y-3">
            {[
              {
                name: "Queens Hotel",
                date: "28 - 29 May",
                user: "Mark Wayne",
                ago: "3 days ago",
              },
              {
                name: "Hotel Lavilia",
                date: "28 May - 01 June",
                user: "Ena Willis",
                ago: "10 days ago",
              },
              {
                name: "Poshly Inn",
                date: "28 May",
                user: "K. Parker",
                ago: "12 days ago",
              },
              {
                name: "Stay Happy",
                date: "02 - 05 June",
                user: "Melisa Wade",
                ago: "5 days ago",
              },
            ].map((item, i) => (
              <li key={i} className="border-b pb-2">
                <div className="font-medium text-gray-700">{item.name}</div>
                <div className="text-sm text-gray-500">{item.date}</div>
                <div className="text-xs text-blue-500">
                  {item.user}{" "}
                  <span className="text-gray-400">| {item.ago}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Earning Stats */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex justify-between mb-2">
            <div className="text-lg font-semibold">
              Earning stats on all bookings
            </div>
            <div className="text-sm text-gray-500">Monthly</div>
          </div>
          <div className="text-center text-2xl font-bold text-red-500 mt-6">
            February 1.5M
          </div>
          <div className="mt-10 h-24 bg-red-100 rounded-xl flex items-center justify-center text-sm text-gray-500">
            [Graph Placeholder]
          </div>
        </div>

        {/* Monthly Increased Amount */}
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-2">
            Monthly increased amount
          </div>
          <div className="relative w-24 h-24">
            <div className="w-full h-full rounded-full border-8 border-red-500 border-t-gray-200"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              60%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Calculated with respect to per 100 bookings
          </div>
        </div>
      </div>

      {/* Bottom Segment Report */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">
            Calculate monthly report based on each segment
          </div>
          <div className="text-sm text-red-500">May, 2021</div>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            "Hotels",
            "Flights",
            "Packaged Holidays",
            "Trains",
            "Buses",
            "Cabs",
            "Others",
          ].map((item) => (
            <div
              key={item}
              className={`px-3 py-1 rounded-full text-sm ${
                item === "Hotels"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <div className="text-xl font-bold text-red-500">2.8B</div>
            <div>Total Properties</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-500">5k</div>
            <div>New Bookings</div>
          </div>
          <div>
            <div className="text-xl font-bold text-purple-500">2k</div>
            <div>New Customers</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-500">1.2M</div>
            <div>Transactions</div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
