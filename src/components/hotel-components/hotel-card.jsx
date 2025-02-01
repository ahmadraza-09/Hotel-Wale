import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import hotelsData from "../../data/hotels-data"; // Ensure correct path
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Prev from "../../assets/icons/slider-prev.svg";
import Next from "../../assets/icons/slider-next.svg";
import Star from "../../assets/icons/star-icon.svg";

const HotelCard = ({ hotel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = React.useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Default to an empty array if hotel.images is undefined
  const images = hotel.images || [];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => {
      const totalDots = dots.length;
      const limitedDots = totalDots > 3 ? dots.slice(0, 3) : dots; // Limit to 3 dots

      return (
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <ul style={{ margin: "0px", padding: "0", display: "flex", listStyle: "none" }}>
            {limitedDots}
          </ul>
        </div>
      );
    },
    customPaging: () => (
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.8,
          margin: "0 5px",
        }}
      />
    ),
  };


  const scrollHorizontally = (direction) => {
    if (sliderRef.current) {
      direction === "prev"
        ? sliderRef.current.slickPrev()
        : sliderRef.current.slickNext();
    }
  };

  const handleHotelClick = () => {
    // Find the city data from hotelsData.cities array
    const cityName = hotelsData.cities
      .find((c) => c.hotels.some((h) => h.name === hotel.name)) || { city: "unknown" };  // Find the matching city based on hotel name

    // Format the hotel name for the URL
    const hotelName = hotel.name.replace(/\s+/g, "-").toLowerCase();  // Format hotel name (replace spaces with hyphens, lowercase)

    // Navigate to the desired route with city and hotel name as parameters
    navigate(`/hotel/${cityName.city}/${hotelName}`);
  };



  return (
    <div
      className="max-w-[300px] rounded-lg shadow-lg border overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleHotelClick} // Add onClick handler
    >
      {/* Image Slider */}
      <div className="relative">
        <Slider ref={sliderRef} {...sliderSettings}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Hotel Slide ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))
          ) : (
            <div>
              <img
                src="default-image.jpg" // Replace with a default placeholder image
                alt="Default Hotel Image"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
        </Slider>

        {isHovered && (
          <>
            <button
              className="absolute w-8 h-8 left-4 top-1/2 transform -translate-y-1/2 bg-white p-[2px] rounded-full shadow-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling to the parent div
                scrollHorizontally("prev");
              }}
            >
              <img src={Prev} alt="" className="w-16" />
            </button>
            <button
              className="absolute right-4 w-8 h-8 top-1/2 transform -translate-y-1/2 bg-white p-[2px] rounded-full shadow-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling to the parent div
                scrollHorizontally("next");
              }}
            >
              <img src={Next} alt="" className="w-16" />
            </button>
          </>
        )}
      </div>

      {/* Hotel Information */}
      <div className="p-2 font-TTHovesRegular">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-TTHovesMedium">{hotel.name}</h3>
          <div className="flex mt-2">
            <span className="flex gap-[5px] px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
              <img src={Star} alt="" className="w-4" />
              {hotel.rating}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 font-TTHovesRegular">{hotel.stars}-star hotel</p>
          <p className="text-sm text-gray-600">{hotel.reviews}</p>
        </div>
        <p className="text-xl font-bold text-gray-800">
         <span className="text-green-700 font-TTHovesBold"> ₹{hotel.pricePerNight}{" "}</span>
          <span className="text-sm text-gray-500 font-TTHovesRegular">
            +taxes & fees / night
          </span>
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {hotel.amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
            >
              <img src={amenity.iconImage} alt={amenity.iconName} className="w-4 h-4" />
              <span className="text-sm text-gray-700 font-TTHovesRegular">{amenity.iconName}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            className="w-full py-2 px-6 bg-myColor text-white font-medium rounded-md hover:bg-myColor-light font-TTHovesMedium"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling to the parent div
              // Handle "Book Now" button click
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;