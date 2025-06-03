import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Listings = () => {
  const user_id = localStorage.getItem("user_id");

  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingHotel, setEditingHotel] = useState(null);
  const [fileLength, setFileLength] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    stars: "",
    price_per_night: "",
    taxes_and_fees: "",
    description: "",
    address: "",
    city_id: "",
    check_in_time: "",
    check_out_time: "",
    cancellation_policy: "",
    listed_by: user_id,
  });

  const handleReset = () => {
    setFormData({
      name: "",
      stars: "",
      price_per_night: "",
      taxes_and_fees: "",
      description: "",
      address: "",
      city_id: "",
      check_in_time: "",
      check_out_time: "",
      cancellation_policy: "",
      listed_by: user_id,
    });
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/hotel/hotelslistbyid/${user_id}`
      );
      setHotels(response.data.message || []);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this hotel?")) {
        const res = await axios.delete(
          `http://localhost:5000/hotel/deletehotel/${id}`
        );
        if (res.data.status === 200) {
          toast.success("Hotel deleted successfully.");
          fetchHotels();
        } else {
          toast.error("Failed to delete.");
        }
      }
    } catch (err) {
      toast.error("Error deleting hotel.");
    }
  };

  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      stars: hotel.stars,
      price_per_night: hotel.price_per_night,
      taxes_and_fees: hotel.taxes_and_fees,
      description: hotel.description,
      address: hotel.address,
      city_id: hotel.city_id,
      check_in_time: hotel.check_in_time,
      check_out_time: hotel.check_out_time,
      cancellation_policy: hotel.cancellation_policy,
      listed_by: hotel.listed_by,
    });
    setEditingHotel(hotel.id); // Assuming `_id` is your hotel ID
    setShowForm(true);
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrEditHotel = async (e) => {
    e.preventDefault();
    try {
      if (editingHotel) {
        // Edit mode
        const response = await axios.put(
          `http://localhost:5000/hotel/updatehotel/${editingHotel}`,
          formData
        );
        if (response.data.status === 200) {
          toast.success("Hotel updated successfully.");
          setShowForm(false);
          fetchHotels();
        } else {
          toast.error("Failed to update hotel.");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/hotel/addhotel",
          formData
        );

        if (fileLength) {
          toast.warning("You can only upload up to 5 images.");
          return false;
        } else if (response.data.status === 200) {
          toast.success(response.data.message || "Hotel added successfully");
          // console.log(response.data.hotel.hotel_id);
          let hotel_id = response.data.hotel.hotel_id;
          handleUpload(hotel_id);
        } else {
          toast.error("Failed to add hotel. Try again.");
        }
      }

      setShowForm(false);
      setEditingHotel(null);
      fetchHotels();
    } catch (error) {
      toast.error("Failed to add hotel");
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.warning("You can only upload up to 5 images.");
      setFileLength(true);
      return;
    }

    setFileLength(false);
    setSelectedFiles(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleUpload = async (hotel_id) => {
    if (selectedFiles.length === 0) {
      alert("Please select images first!");
      return;
    }

    const imageUrls = [];

    try {
      // Upload each file to Cloudinary
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "hotel_images");
        formData.append("cloud_name", "doba6b7bx");

        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/doba6b7bx/image/upload",
          formData
        );

        imageUrls.push(cloudinaryRes.data.url);
        // console.log(imageUrls);
      }

      // Send all image URLs to the backend
      const backendRes = await axios.post(
        `http://localhost:5000/image/uploadimages/${hotel_id}`,
        { imageUrls },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Images saved:", backendRes.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 10;
  const totalPages = Math.ceil(filteredHotels.length / listingsPerPage);
  const pageNumbers = [];
  const indexOfLastListing = currentPage * listingsPerPage; // e.g. page 1: 10, page 2: 20
  const indexOfFirstListing = indexOfLastListing - listingsPerPage; // e.g. page 1: 0, page 2: 10
  const currentListings = filteredHotels.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentListings.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentListings, currentPage]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Listings</h1>
        <button
          className="bg-myColor text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setShowForm(!showForm);
            handleReset();
          }}
        >
          {showForm ? "Cancel" : "Add New Hotel"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddOrEditHotel}
          className="bg-gray-50 p-4 mb-6 flex flex-col rounded-lg border shadow"
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
                min="1"
                max="5"
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
              <select
                id="city_id"
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded w-full"
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.name}
                  </option>
                ))}
              </select>
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
                Upload Images
              </label>
              <input type="file" multiple onChange={handleFileChange} />
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
            className="bg-myColor self-end text-white px-6 py-2 rounded hover:bg-opacity-90"
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
                <th className="px-4 py-2">Hotel Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentListings.length > 0 ? (
                currentListings.map((hotel) => (
                  <tr key={hotel.id} className="border-b">
                    <td className="px-4 py-2">{hotel.name || "N/A"}</td>
                    <td className="px-4 py-2 text-blue-600">
                      {hotel.address || "N/A"}
                    </td>
                    <td className="px-4 py-2">{hotel.city_name || "N/A"}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        className="text-blue-600 mr-3 uppercase"
                        onClick={() => handleEdit(hotel)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 uppercase"
                        onClick={() => handleDelete(hotel.id)}
                      >
                        Remove
                      </button>
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

export default Listings;
