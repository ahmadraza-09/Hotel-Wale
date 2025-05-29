import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Listings = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [cities, setCities] = useState([]);

  const fetchHotels = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/hotel/hotelslist")
      .then((res) => {
        setHotels(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching hotel data");
        setLoading(false);
        console.error("Error fetching hotel data:", err);
      });
  };

  const fetchCities = () => {
    axios
      .get("http://localhost:5000/city/citieslist")
      .then((res) => {
        setCities(res.data.message); // Assuming response format { message: [ { id, name } ] }
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
        toast.error("Failed to fetch cities");
      });
  };

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  const openModal = (hotel, mode) => {
    setSelectedHotel(hotel);
    setModalMode(mode);
    setEditFormData(hotel);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedHotel(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "edit") {
      axios
        .put(
          `http://localhost:5000/hotel/updatehotel/${selectedHotel.id}`,
          editFormData
        )
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("Hotel updated successfully");
            fetchHotels();
            closeModal();
          } else {
            toast.error(res.data.message || "Something went wrong");
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error updating hotel");
        });
    } else if (modalMode === "add") {
      axios
        .post(`http://localhost:5000/hotel/addhotel`, editFormData)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("Hotel added successfully");
            fetchHotels();
            closeModal();
          } else {
            toast.error(res.data.message || "Add failed");
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error adding hotel");
        });
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      axios
        .delete(`http://localhost:5000/hotel/deletehotel/${id}`)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("Hotel deleted successfully");
            fetchHotels();
          } else {
            toast.error(res.data.message || "Delete failed");
          }
        })
        .catch((err) => {
          toast.error("Error deleting hotel");
        });
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Listings</h1>
      <div className="mb-6">
        <button
          onClick={() => {
            setEditFormData({});
            setModalMode("add");
            setModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Hotel
        </button>
      </div>

      {hotels.length === 0 ? (
        <p>No hotels listed yet. </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border rounded-lg p-4 bg-white shadow-custom transition flex flex-col"
            >
              <img
                src={hotel.image || "https://via.placeholder.com/300"}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold mb-1">{hotel.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{hotel.address}</p>
              <p className="text-gray-800 font-medium mb-4">
                ₹{hotel.price_per_night} / night
              </p>

              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => openModal(hotel, "view")}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => openModal(hotel, "edit")}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(hotel.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-screen overflow-y-auto p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              ×
            </button>

            {modalMode === "view" && selectedHotel && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedHotel.name}
                </h2>
                <img
                  src={selectedHotel.image || "https://via.placeholder.com/300"}
                  alt={selectedHotel.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p>
                  <strong>Stars:</strong> {selectedHotel.stars || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {selectedHotel.address}
                </p>
                <p>
                  <strong>City:</strong>{" "}
                  {cities.find((city) => city.id === selectedHotel.city_id)
                    ?.name || "N/A"}
                </p>
                <p>
                  <strong>Check-in Time:</strong>{" "}
                  {selectedHotel.check_in_time || "N/A"}
                </p>
                <p>
                  <strong>Check-out Time:</strong>{" "}
                  {selectedHotel.check_out_time || "N/A"}
                </p>
                <p>
                  <strong>Price per night:</strong> ₹
                  {selectedHotel.price_per_night}
                </p>
                <p>
                  <strong>Taxes and Fees:</strong> ₹
                  {selectedHotel.taxes_and_fees || 0}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedHotel.description || "N/A"}
                </p>
                <p>
                  <strong>Cancellation Policy:</strong>{" "}
                  {selectedHotel.cancellation_policy || "N/A"}
                </p>
              </>
            )}

            {(modalMode === "edit" || modalMode === "add") && (
              <form onSubmit={handleEditSubmit} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Stars</label>
                    <input
                      type="number"
                      name="stars"
                      value={editFormData.stars || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      min={1}
                      max={5}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      City Name
                    </label>
                    <select
                      name="city_id"
                      value={editFormData.city_id || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">
                      Check-in Time
                    </label>
                    <input
                      type="time"
                      name="check_in_time"
                      value={editFormData.check_in_time || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Check-out Time
                    </label>
                    <input
                      type="time"
                      name="check_out_time"
                      value={editFormData.check_out_time || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">
                      Price per night
                    </label>
                    <input
                      type="number"
                      name="price_per_night"
                      value={editFormData.price_per_night || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      min={0}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Taxes and Fees
                    </label>
                    <input
                      type="number"
                      name="taxes_and_fees"
                      value={editFormData.taxes_and_fees || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      min={0}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={editFormData.image || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Cancellation Policy
                  </label>
                  <textarea
                    name="cancellation_policy"
                    value={editFormData.cancellation_policy || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows={2}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
