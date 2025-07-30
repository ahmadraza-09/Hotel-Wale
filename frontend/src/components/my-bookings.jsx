import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [loading, setLoading] = useState(false);
  const [myHotelBookings, setMyHotelBookings] = useState([]);

  const userId = localStorage.getItem("user_id");
  //   console.log(userId);

  const fetchMyHotelBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/hotel-booking/user-booking-list/${userId}`
      );
      setMyHotelBookings(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch hotel listings.");
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const secondsAgo = Math.floor((now - created) / 1000);

    if (secondsAgo < 60) return "just now";
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minute's ago`;
    if (secondsAgo < 86400)
      return `${Math.floor(secondsAgo / 3600)} hour's ago`;
    if (secondsAgo < 172800) return "1 day ago";
    if (secondsAgo < 604800)
      return `${Math.floor(secondsAgo / 86400)} day's ago`;
    if (secondsAgo < 1209600) return "1 week ago";
    if (secondsAgo < 2419200)
      return `${Math.floor(secondsAgo / 604800)} week's ago`;
    if (secondsAgo < 4838400) return "1 month ago";

    const monthsAgo = Math.floor(secondsAgo / 2592000); // 30 days
    return `${monthsAgo} month's ago`;
  };

  useEffect(() => {
    fetchMyHotelBookings();
  }, []);
  return (
    <div className="sm:px-32 px-5 py-5 sm:py-10">
      <h1 className="sm:text-2xl text-xl uppercase font-TTHovesBold">
        My Bookings
      </h1>
      <div className="w-full h-fit sm:pt-10 pt-5 flex flex-col gap-5">
        {myHotelBookings ? (
          myHotelBookings.map((booking) => {
            return (
              <div
                className="w-full h-fit bg-white shadow-custom relative rounded-lg p-2 flex sm:flex-row flex-col gap-5"
                key={booking.booking_id}
              >
                <span className="absolute right-4 bottom-2 bg-slate-200 px-2 py-1 text-blue-900 font-TripSansMedium text-sm rounded">
                  {formatTimeAgo(booking.created_at)}
                </span>
                <img
                  src={booking.hotel_images?.split(",")[0]}
                  alt=""
                  className="sm:w-60 w-full rounded"
                />

                <div className="flex flex-col space-y-1">
                  <h2 className="uppercase font-TTHovesBold text-orange-700 text-lg">
                    {booking.hotel_name}
                  </h2>

                  <h3 className="font-TTHovesMedium text-base">
                    {booking.full_name}
                  </h3>

                  <p className="text-sm">
                    Booking Id:{" "}
                    <span className="font-medium">
                      0000{booking.booking_id}
                    </span>
                  </p>

                  <p className="text-sm">
                    Room Type:{" "}
                    <span className="font-medium">
                      {booking.room_type || "NA"}
                    </span>
                  </p>

                  <p className="text-sm">
                    Check-In:{" "}
                    <span className="font-medium">
                      {booking.check_in
                        ? new Date(booking.check_in).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "NA"}
                    </span>
                  </p>

                  <p className="text-sm">
                    Check-Out:{" "}
                    <span className="font-medium">
                      {booking.check_out
                        ? new Date(booking.check_out).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "NA"}
                    </span>
                  </p>

                  <p className="text-sm">
                    Number of Guests:{" "}
                    <span className="font-medium">
                      {booking.number_of_guests || "NA"}
                    </span>
                  </p>

                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        booking.booking_status === "Confirmed"
                          ? "text-green-500"
                          : booking.booking_status === "Pending"
                          ? "text-yellow-500"
                          : booking.booking_status === "Cancelled"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {booking.booking_status || "NA"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Bookings Yet</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
