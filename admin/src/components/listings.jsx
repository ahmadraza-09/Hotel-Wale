import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Listings = () => {
  const user_id = localStorage.getItem("user_id");

  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    stars: Number,
    price_per_night: Number,
    taxes_and_fees: Number,
    description: "",
    address: "",
    city_id: Number,
    check_in_time: TimeRanges,
    check_out_time: TimeRanges,
    cancellation_policy: "",
    listed_by: user_id,
    status: "Active",
  });

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/hotel/hotelslist"
      );
      setHotels(response.data.message || []);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/hotel/addhotel",
        formData
      );
      if (response.data.status === 200) {
        toast.success(response.data.message || "Hotel added successfully");
        // console.log(response.data);
        setShowForm(false);
        fetchHotels();
      } else {
        toast.error("Failed to add hotel. Try again.");
      }
    } catch (error) {
      toast.error("Failed to add hotel");
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Listings</h1>
        <button
          className="bg-myColor text-white px-4 py-2 rounded-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add New Hotel"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddHotel}
          className="bg-gray-50 p-4 mb-6 rounded-lg border shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Hotel Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label htmlFor="stars" className="block text-sm font-medium mb-1">
                Stars
              </label>
              <input
                id="stars"
                type="number"
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="price_per_night"
                className="block text-sm font-medium mb-1"
              >
                Price Per Night
              </label>
              <input
                id="price_per_night"
                type="number"
                name="price_per_night"
                value={formData.price_per_night}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="taxes_and_fees"
                className="block text-sm font-medium mb-1"
              >
                Taxes and Fees
              </label>
              <input
                id="taxes_and_fees"
                type="number"
                name="taxes_and_fees"
                value={formData.taxes_and_fees}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="city_id"
                className="block text-sm font-medium mb-1"
              >
                City
              </label>
              <input
                list="cities"
                id="city_id"
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
                placeholder="Type city name"
              />
              <datalist id="cities">
                {cities.map((city) => (
                  <option key={city.city_id} value={city.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label
                htmlFor="check_in_time"
                className="block text-sm font-medium mb-1"
              >
                Check-in Time
              </label>
              <input
                id="check_in_time"
                type="time"
                name="check_in_time"
                value={formData.check_in_time}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="check_out_time"
                className="block text-sm font-medium mb-1"
              >
                Check-out Time
              </label>
              <input
                id="check_out_time"
                type="time"
                name="check_out_time"
                value={formData.check_out_time}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block mb-1 text-sm font-medium"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label
                htmlFor="cancellation_policy"
                className="block mb-1 text-sm font-medium"
              >
                Cancellation Policy
              </label>
              <textarea
                id="cancellation_policy"
                name="cancellation_policy"
                value={formData.cancellation_policy}
                onChange={handleChange}
                rows={3}
                className="border px-4 py-2 rounded w-full"
                placeholder="Enter cancellation policy"
                required
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="border px-4 py-2 rounded w-full"
                placeholder="Enter hotel description"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-myColor text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      )}

      {/* Filter section - can be functional later */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by hotel name or location"
          className="flex-1 border rounded-md px-4 py-2 w-full sm:w-auto"
        />
        <select className="border rounded-md px-4 py-2">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select className="border rounded-md px-4 py-2">
          <option>Location</option>
        </select>
        <select className="border rounded-md px-4 py-2">
          <option>Amenities</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Hotel Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{hotel.name || "N/A"}</td>
                  <td className="px-4 py-2 text-blue-600">
                    {hotel.address || "N/A"}
                  </td>
                  <td className="px-4 py-2">{hotel.city_name || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">
                    <button className="text-blue-600 mr-3">Edit</button>
                    <button className="text-red-500">Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan="4">
                  No hotels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2 text-sm">
        <button className="text-gray-500">&lt;</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === 1 ? "bg-myColor text-white" : "bg-white text-black"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="text-gray-500">&gt;</button>
      </div>
    </div>
  );
};

export default Listings;
