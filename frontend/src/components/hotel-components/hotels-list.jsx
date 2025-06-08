import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import hotelsData from "../../data/hotels-data"; // Ensure correct path
import HotelCard from "../../components/hotel-components/hotel-card"; // Ensure correct path

import Dropdown from '../../assets/icons/dropdown-icon.svg';
import Filter from '../../assets/icons/filter-icon.svg';
import FilterDark from '../../assets/icons/filter-icon-dark.svg'; 

const HotelList = () => {
  const { city } = useParams(); // Extract city from URL
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStar, setSelectedStar] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Dark mode sync with sidebar/global theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const syncTheme = () => {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    syncTheme();
    window.addEventListener("storage", syncTheme);
    window.addEventListener("themechange", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themechange", syncTheme);
    };
  }, []);

  // Check if `city` exists and handle edge cases
  if (!city) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Error: Invalid City</h1>
        <p className="text-gray-500">Please provide a valid city in the URL.</p>
      </div>
    );
  }

  // Remove the 'hotels-in-' prefix from the city name if it exists
  const cityName = city.replace("hotels-in-", "");

  // Find city data case-insensitively
  const cityData = hotelsData.cities.find(
    (c) => c.city.toLowerCase() === cityName.toLowerCase()
  );

  // Filter hotels based on the search query, price, star rating, and location
  const filteredHotels = cityData
    ? cityData.hotels.filter((hotel) => {
      const matchesQuery = hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = selectedPrice
        ? hotel.pricePerNight >= parseInt(selectedPrice.split('-')[0]) && hotel.pricePerNight <= parseInt(selectedPrice.split('-')[1])
        : true;
      const matchesStar = selectedStar ? hotel.stars === parseInt(selectedStar) : true;
      const matchesLocation = selectedLocation ? hotel.location.toLowerCase().includes(selectedLocation.toLowerCase()) : true;
      return matchesQuery && matchesPrice && matchesStar && matchesLocation;
    })
    : [];


  return (
    <div className={`w-full container pt-0 pb-8 transition-colors ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      {/* Hotels Filter Sidebar */}
      <div className={`w-full flex sticky top-[62.8px] z-10 items-center shadow-sm gap-3 px-8 p-4 font-TTHovesRegular sm:overflow-hidden overflow-scroll hide-scrollbar transition-colors ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        {/* Filter Icon */}
        <img
          src={theme === "dark" ? FilterDark : Filter}
          alt="Filter"
          className="w-6 h-6 cursor-pointer"
        />

        {/* Price Filter Dropdown */}
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-full ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}>
          <span>Price</span>
          <span className="w-5 h-5"><img src={Dropdown} alt="Dropdown" /></span>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className={`ml-2 border-none outline-none ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
          >
            <option value="">Any</option>
            <option value="0-5000">₹0 - ₹5000</option>
            <option value="5001-10000">₹5000 - ₹10000</option>
            <option value="10001-15000">₹10000 - ₹15000</option>
          </select>
        </button>

        {/* Star Rating Filter Dropdown */}
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-full ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}>
          <span>Star</span>
          <span className="w-5 h-5"><img src={Dropdown} alt="Dropdown" /></span>
          <select
            value={selectedStar}
            onChange={(e) => setSelectedStar(e.target.value)}
            className={`ml-2 border-none outline-none ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Star</option>
            ))}
          </select>
        </button>

        {/* Location Filter Dropdown */}
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-full ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}>
          <span>Location</span>
          <span className="w-5 h-5"><img src={Dropdown} alt="Dropdown" /></span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className={`ml-2 border-none outline-none ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
          >
            <option value="">Any</option>
            <option value="city-center">City Center</option>
            <option value="suburbs">Suburbs</option>
            <option value="near-beach">Near Beach</option>
          </select>
        </button>

        {/* Search Bar */}
        <div className={`flex items-center gap-2 px-4 py-2 border rounded-full ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}>
          <input
            type="text"
            placeholder="Search By Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`outline-none ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
          />
        </div>
      </div>
      <br />
      <h1 className={`sm:text-3xl text-xl font-bold mb-4 px-8 ${theme === "dark" ? "text-white" : "text-black"}`}>
        Showing Hotels in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
      </h1>

      {filteredHotels.length > 0 ? (
        <div className="flex flex-wrap justify-center px-8 sm:justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
      ) : (
        <p className={`px-8 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
          No hotels available in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}. We will list soon.
        </p>
      )}
    </div>
  );
};

export default HotelList;
