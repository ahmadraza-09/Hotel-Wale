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

  useEffect(() => {
    fetchMyHotelBookings();
  }, []);
  return (
    <div className="px-32 py-10">
      <h1 className="text-2xl uppercase font-TTHovesBold">My Bookings</h1>
      <div className="w-full h-fit pt-10 flex flex-col gap-5">
        {myHotelBookings ? (
          myHotelBookings.map((booking) => {
            return (
              <div
                className="w-full h-40 bg-white shadow-custom rounded-lg p-4"
                key={booking.booking_id}
              >
                <h2 className="uppercase font-TTHovesBold text-orange-700">
                  {booking.hotel_name}
                </h2>
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
