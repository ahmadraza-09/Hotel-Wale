import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelBookings = () => {
  const user_id = localStorage.getItem("user_id");

  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentHotelBookings, setRecentHotelBookings] = useState([]);
  const fetchRecentHotelBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/hotel-booking/booking-list`
      );
      setRecentHotelBookings(response.data.data || []);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch hotel listings.");
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/city/citieslist");
      setCities(response.data.message || []);
      // console.log(response.data.message);
    } catch (error) {
      toast.error("Failed to fetch hotel listings.");
    }
  };

  const filteredHotels = recentHotelBookings.filter(
    (booking) =>
      (booking?.full_name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (booking?.hotel_name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/hotel-booking/update-booking-status/${bookingId}`,
        { booking_status: newStatus }
      );

      const status = res.data.booking_status;
      if (status === "Confirmed") {
        toast.success("Booking Confirmed");
      } else if (status === "Cancelled") {
        toast.success("Booking Cancelled");
      } else {
        toast.success("Booking Pending");
      }

      // Refetch bookings or update state
      fetchRecentHotelBookings(); // optional
    } catch (err) {
      console.error(
        "Failed to update booking status",
        err.response?.data || err.message
      );
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
    fetchRecentHotelBookings();
    fetchCities();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 10;
  const totalPages = Math.ceil(filteredHotels.length / listingsPerPage);
  const pageNumbers = [];
  const indexOfLastListing = currentPage * listingsPerPage; // e.g. page 1: 10, page 2: 20
  const indexOfFirstListing = indexOfLastListing - listingsPerPage; // e.g. page 1: 0, page 2: 10
  const currentBookings = filteredHotels.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentBookings.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentBookings, currentPage]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Bookings</h1>
      </div>

      {/* Filter section - can be functional later */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by hotel name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:flex-1 flex-2 border rounded-md px-4 py-2 w-full sm:w-auto"
        />
        <select className="border flex-0 rounded-md px-4 py-2">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select className="border flex-0 rounded-md px-4 py-2 ">
          <option value="Address">Address</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.address}>
              {hotel.address}
            </option>
          ))}
        </select>
        <select className="border rounded-md px-4 py-2">
          <option>Amenities</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading hotels...</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Guest Name</th>
                <th className="px-4 py-2">Hotel Name</th>
                <th className="px-4 py-2">Room Type</th>
                <th className="px-4 py-2">Guests</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Booking Time </th>
              </tr>
            </thead>

            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <tr key={booking.booking_id} className="border-b">
                    <td className="px-4 py-2">{booking.full_name || "N/A"}</td>
                    <td className="px-4 py-2">{booking.hotel_name || "N/A"}</td>
                    <td className="px-4 py-2">{booking.room_type || "N/A"}</td>
                    <td className="px-4 py-2">
                      {booking.number_of_guests || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={booking.booking_status}
                        onChange={(e) =>
                          handleStatusChange(booking.booking_id, e.target.value)
                        }
                        className={`${
                          booking.booking_status === "Pending"
                            ? "bg-yellow-500"
                            : "" || booking.booking_status === "Cancelled"
                            ? "bg-red-500"
                            : "" || booking.booking_status === "Confirmed"
                            ? "bg-green-500"
                            : ""
                        } text-white rounded px-2 py-1`}
                      >
                        <option value="Pending" className="bg-yellow-500">
                          Pending
                        </option>
                        <option value="Confirmed" className="bg-green-500">
                          Confirmed
                        </option>
                        <option value="Cancelled" className="bg-red-500">
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      {formatTimeAgo(booking.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan="4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredHotels.length > 10 && (
        <div className="flex justify-center items-center mt-4 gap-2 text-sm">
          <button
            className="text-gray-500"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-left-icon lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-myColor text-white"
                  : "bg-white text-black"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="text-gray-500"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
            }
            disabled={currentPage === pageNumbers.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-right-icon lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelBookings;
