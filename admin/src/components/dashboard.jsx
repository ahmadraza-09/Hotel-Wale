import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [listingsCount, setListingsCount] = useState("");
  const [bookingsCount, setBookingsCount] = useState("");
  const [recentHotel, setRecentHotel] = useState("");
  const [recentHotelBookings, setRecentHotelBookings] = useState("");
  const [loading, setLoading] = useState("");

  const fetchHotelCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/hotel/hotelslistcountbyid/${user_id}`
      );
      setListingsCount(response.data || []);
      // console.log(response.data);
    } catch (error) {
      toast.error("Failed to fetch hotel count.");
    }
  };

  const fetchRecentHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/hotel/recentlyaddedhotelsbyid/${user_id}`
      );
      setRecentHotel(response.data.message || []);
      console.log(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch hotel listings.");
    }
  };

  const fetchRecentHotelBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/hotel-booking/booking-list`
      );
      setRecentHotelBookings(response.data.data || []);
      console.log(response.data.data);
      setBookingsCount(response.data.data.length);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch hotel listings.");
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const secondsAgo = Math.floor((now - created) / 1000);

    if (secondsAgo < 60) return "just now";
    if (secondsAgo < 3600)
      return `${Math.floor(secondsAgo / 60)} minute(s) ago`;
    if (secondsAgo < 86400)
      return `${Math.floor(secondsAgo / 3600)} hour(s) ago`;
    if (secondsAgo < 172800) return "1 day ago";
    if (secondsAgo < 604800)
      return `${Math.floor(secondsAgo / 86400)} day(s) ago`;
    if (secondsAgo < 1209600) return "1 week ago";
    if (secondsAgo < 2419200)
      return `${Math.floor(secondsAgo / 604800)} week(s) ago`;
    if (secondsAgo < 4838400) return "1 month ago";

    const monthsAgo = Math.floor(secondsAgo / 2592000); // 30 days
    return `${monthsAgo} month(s) ago`;
  };

  useEffect(() => {
    fetchHotelCount();
    fetchRecentHotels();
    fetchRecentHotelBookings();
  }, []);

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
          <p className="text-2xl font-bold text-white">{listingsCount.count}</p>
        </div>
        <div className="bg-[#393E46] shadow rounded-lg p-4 sm:p-6 text-start">
          <p className="text-white">Bookings</p>
          <p className="text-2xl font-bold text-white">{bookingsCount}</p>
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

      {/* Recent Bookings */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto border-[1.5px] border-[#000] border-opacity-25 rounded-xl">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Hotel</th>
                <th className="py-2 px-4 text-left">Room Type</th>
                <th className="py-2 px-4 text-left">Guests</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {recentHotelBookings.length > 0 ? (
                recentHotelBookings.map((booking) => (
                  <tr key={booking.booking_id} className="border-t">
                    <td className="py-2 px-4">{booking.full_name || "NA"}</td>
                    <td className="py-2 px-4">{booking.hotel_name || "NA"}</td>
                    <td className="py-2 px-4">{booking.room_type || "NA"}</td>
                    <td className="py-2 px-4">
                      {booking.number_of_guests || "NA"}
                    </td>
                    <td className="py-2 px-4">
                      {booking.booking_status || "NA"}
                    </td>
                    <td className="py-2 px-4">
                      {formatTimeAgo(booking.created_at) || "NA"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-4" colSpan="3">
                    {loading ? "Loading..." : "No recent listings found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className="flex justify-end mt-4">
          <button
            className="text-myColor font-medium underline text-sm hover:text-myColor/80"
            onClick={() => {
              navigate("/hotel-bookings");
            }}
          >
            View All
          </button>
        </div>
      </div>

      {/* Listings Table */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
        <div className="overflow-x-auto border-[1.5px] border-[#000] border-opacity-25 rounded-xl">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {recentHotel.length > 0 ? (
                recentHotel.map((hotel, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 px-4">{hotel.name}</td>
                    <td className="py-2 px-4 text-blue-600">{hotel.address}</td>
                    <td className="py-2 px-4">{hotel.city_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-4" colSpan="3">
                    {loading ? "Loading..." : "No recent listings found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className="flex justify-end mt-4">
          <button
            className="text-myColor font-medium underline text-sm hover:text-myColor/80"
            onClick={() => {
              navigate("/listings");
            }}
          >
            View All
          </button>
        </div>
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
