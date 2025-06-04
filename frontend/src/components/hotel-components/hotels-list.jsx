import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HotelCard from "../../components/hotel-components/hotel-card";

import Dropdown from "../../assets/icons/dropdown-icon.svg";
import Filter from "../../assets/icons/filter-icon.svg";

const HotelList = () => {
  const { city } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStar, setSelectedStar] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch cities list
  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/city/citieslist");
      setCities(response.data.message || []);
    } catch (error) {
      toast.error("Failed to fetch cities.");
    }
  };

  // Fetch all hotels
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/hotel/hotelslist"
      );
      setHotelsData(response.data.message || []);
      // console.log(response.data.message);
    } catch (error) {
      toast.error("Failed to fetch hotel listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchHotels();
  }, []);

  if (!city) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Error: Invalid City</h1>
        <p className="text-gray-500">Please provide a valid city in the URL.</p>
      </div>
    );
  }

  // Normalize city param (remove prefix if present)
  const cityName = city.replace("hotels-in-", "").toLowerCase();

  // Filter hotelsData by city
  const hotelsInCity = hotelsData.filter(
    (hotel) => hotel.city_name?.toLowerCase() === cityName
  );

  // Parse price range once
  let priceRange = null;
  if (selectedPrice) {
    const parts = selectedPrice.split("-");
    if (parts.length === 2) {
      priceRange = [parseInt(parts[0], 10), parseInt(parts[1], 10)];
    }
  }

  // Filter hotels by all filters
  const filteredHotels = hotelsInCity.filter((hotel) => {
    const matchesQuery = hotel.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = priceRange
      ? hotel.pricePerNight >= priceRange[0] &&
        hotel.pricePerNight <= priceRange[1]
      : true;
    const matchesStar = selectedStar
      ? hotel.stars === parseInt(selectedStar, 10)
      : true;
    const matchesLocation = selectedLocation
      ? hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
      : true;
    return matchesQuery && matchesPrice && matchesStar && matchesLocation;
  });

  return (
    <div className="w-full container pt-0 pb-8">
      <div className="w-full flex sticky top-[62.8px] z-10 items-center shadow-sm gap-3 px-8 p-4 bg-white font-TTHovesRegular sm:overflow-hidden overflow-scroll hide-scrollbar">
        <img src={Filter} alt="Filter" className="w-6 h-6 cursor-pointer" />

        <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
          <span>Price</span>
          <span className="w-5 h-5">
            <img src={Dropdown} alt="Dropdown" />
          </span>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="ml-2 border-none outline-none bg-white"
          >
            <option value="">Any</option>
            <option value="0-5000">₹0 - ₹5000</option>
            <option value="5001-10000">₹5001 - ₹10000</option>
            <option value="10001-15000">₹10001 - ₹15000</option>
          </select>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 ">
          <span>Star</span>
          <span className="w-5 h-5">
            <img src={Dropdown} alt="Dropdown" />
          </span>
          <select
            value={selectedStar}
            onChange={(e) => setSelectedStar(e.target.value)}
            className="ml-2 border-none outline-none bg-white"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star
              </option>
            ))}
          </select>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
          <span>Location</span>
          <span className="w-5 h-5">
            <img src={Dropdown} alt="Dropdown" />
          </span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="ml-2 border-none outline-none bg-white"
          >
            <option value="">Any</option>
            <option value="city-center">City Center</option>
            <option value="suburbs">Suburbs</option>
            <option value="near-beach">Near Beach</option>
          </select>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
          <input
            type="text"
            placeholder="Search By Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none text-gray-700"
          />
        </div>
      </div>
      <br />
      <h1 className="sm:text-3xl text-xl font-bold mb-4 px-8">
        Showing Hotels in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
      </h1>

      {loading ? (
        <p className="px-8">Loading hotels...</p>
      ) : filteredHotels.length > 0 ? (
        <div className="flex flex-wrap justify-center px-8 sm:justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHotels.map((hotel, index) => (
            <Link
              key={hotel.id}
              to={`/hotels/${hotel.city_name.toLowerCase()}/${hotel.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              state={{ id: hotel.id }}
            >
              <HotelCard
                key={index}
                hotel={hotel}
                onClick={() => console.log("Hotel ID:", hotel.id)}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 px-8">
          No hotels available in{" "}
          {cityName.charAt(0).toUpperCase() + cityName.slice(1)}. We will list
          soon.
        </p>
      )}
    </div>
  );
};

export default HotelList;
