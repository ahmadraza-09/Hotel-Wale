import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const BookingModal = ({ isOpen, onClose, hotelId }) => {
  const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    check_in: "",
    check_out: "",
    room_type: "",
    number_of_guests: 0,
    hotel_id: "",
    user_id: userId,
    booking_status: "Pending",
  });

  React.useEffect(() => {
    if (hotelId) {
      setFormData((prev) => ({ ...prev, hotel_id: hotelId }));
    }
  }, [hotelId]);

  const handleBookHotel = async (e) => {
    e.preventDefault();

    console.log(hotelId);
    try {
      const res = await axios.post(
        `http://localhost:5000/hotel-booking/hotel-booking`,
        formData
      );

      if (res.data.status === 200) {
        toast.success("Booking Successfully");
        onClose();
      } else {
        toast.error(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      toast.error("Failed to Book Hotel");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Booking Form</h2>

        <form className="space-y-4" onSubmit={handleBookHotel}>
          <div className="flex gap-10">
            <label htmlFor="">Number of Guests:</label>
            <input
              type="number"
              min={1}
              max={10}
              value={formData.number_of_guests}
              onChange={handleChange}
              name="number_of_guests"
              required
              className="border-none bg-gray-200 rounded pl-2"
            />
          </div>
          <div className="flex gap-x-28">
            <label htmlFor="">Check-In:</label>
            <input
              type="date"
              required
              onChange={handleChange}
              value={formData.check_in}
              name="check_in"
              className="border-none bg-gray-200 rounded pl-2"
            />
          </div>
          <div className="flex gap-24">
            <label htmlFor="">Check-Out:</label>
            <input
              type="date"
              value={formData.check_out}
              onChange={handleChange}
              name="check_out"
              required
              className="border-none bg-gray-200 rounded pl-2"
            />
          </div>
          <div className="flex gap-24">
            <label htmlFor="">Room Type:</label>
            <select
              required
              className="border-none bg-gray-200 rounded pl-2"
              value={formData.room_type}
              name="room_type"
              onChange={handleChange}
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
