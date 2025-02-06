import React, { useState } from "react";
import { useParams } from "react-router-dom";
import hotelsData from "../../data/hotels-data"; // Ensure correct path
import HotelCard from "../../components/hotel-components/hotel-card"; // Ensure correct path

import Dropdown from '../../assets/icons/dropdown-icon.svg';
import Filter from '../../assets/icons/filter-icon.svg';

const HotelList = () => {
  const { city } = useParams(); // Extract city from URL
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStar, setSelectedStar] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

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
    <div className="w-full container pt-0 pb-8">

      {/* Hotels Filter Sidebar */}
      <div className="w-full flex sticky top-[62.8px] z-10 items-center shadow-sm gap-3 px-8 p-4 bg-white font-TTHovesRegular sm:overflow-hidden overflow-scroll hide-scrollbar">

        {/* Filter Icon */}
        <img src={Filter} alt="Filter" className="w-6 h-6 cursor-pointer" />

        {/* Price Filter Dropdown */}
        <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
          <span>Price</span>
          <span className="w-5 h-5"><img src={Dropdown} alt="Dropdown" /></span>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="ml-2 border-none outline-none bg-white"
          >
            <option value="">Any</option>
            <option value="0-5000">₹0 - ₹5000</option>
            <option value="5001-10000">₹5000 - ₹10000</option>
            <option value="10001-15000">₹10000 - ₹15000</option>
          </select>

        </button>

        {/* Star Rating Filter Dropdown */}
        <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 ">
          <span>Star</span>
          <span className="w-5 h-5"><img src={Dropdown} alt="Dropdown" /></span>
          <select
            value={selectedStar}
            onChange={(e) => setSelectedStar(e.target.value)}
            className="ml-2 border-none outline-none bg-white"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Star</option>
            ))}
          </select>
        </button>

        {/* Location Filter Dropdown */}
        <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700">
          <span>Location</span>
          <span className="w-5 h-5"><img src={Dropdown} alt="Dropdown" /></span>
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

        {/* Search Bar */}
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

      {filteredHotels.length > 0 ? (
        <div className="flex flex-wrap justify-center px-8 sm:justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 px-8">
          No hotels available in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}. We will list soon.
        </p>
      )}
    </div>
  );
};

export default HotelList;
