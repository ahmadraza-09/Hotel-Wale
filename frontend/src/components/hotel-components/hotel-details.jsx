import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import hotelsData from "../../data/hotels-data"; // Ensure correct path

import Prev from "../../assets/icons/slider-prev.svg";
import Next from "../../assets/icons/slider-next.svg";

const HotelDetails = () => {
  const { city } = useParams();
  const location = useLocation();
  const hotel_id = location.state?.id;
  const sliderRef = React.useRef(null);
  const sliderRoomRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRoomHovered, setIsRoomHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const images = hotel.images || [];

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
        `http://localhost:5000/hotel/singlehotellist/${hotel_id}`
      );
      setHotel(response.data.message || []);
      //   console.log(response.data.message);
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
  const [selectedRoom, setSelectedRoom] = useState("");

  if (!hotel) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
        <p className="text-gray-500">The requested hotel does not exist.</p>
      </div>
    );
  }

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
            bottom: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <ul
            style={{
              margin: "0px",
              padding: "0",
              display: "flex",
              listStyle: "none",
            }}
          >
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

  const scrollRoomHorizontally = (direction) => {
    if (sliderRoomRef.current) {
      direction === "prev"
        ? sliderRoomRef.current.slickPrev()
        : sliderRoomRef.current.slickNext();
    }
  };

  return (
    <div className="w-full flex flex-col p-2 sm:p-6 bg-[#F2F2F2] gap-4 pb-6">
      <div className="w-full p-0 rounded-xl flex gap-2 items-center justify-start text-sm flex-wrap">
        <span
          className="font-TTHovesMedium text-blue-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i>
        <span
          className="font-TTHovesMedium text-blue-500 cursor-pointer"
          onClick={() => navigate("/hotels")}
        >
          Hotels
        </span>
        <i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i>
        <span
          className="font-TTHovesMedium text-blue-500 cursor-pointer"
          onClick={() => navigate(`/hotels/hotels-in-${city}`)}
        >
          Hotels in <span className="capitalize">{city}</span>
        </span>
        <i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i>
        <span className="font-TTHovesMedium text-blue-500 cursor-pointer">
          {hotel.name}
        </span>
      </div>

      <div className="w-full p-2 sm:p-4 bg-white rounded-2xl">
        <div className="h-48 sm:h-[400px] flex gap-2 sm:gap-5 ">
          {/* <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full sm:w-[50%] h-full object-cover rounded-xl cursor-pointer"
                    /> */}
          {/* Image Slider */}
          <div
            className="relative w-full sm:h-full sm:w-[50%] h-48 object-cover rounded-xl cursor-pointer "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Slider ref={sliderRef} {...sliderSettings}>
              {images.length > 0 ? (
                hotel.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Hotel Slide ${index + 1}`}
                      className=" w-full h-48 sm:h-[400px] object-cover rounded-xl"
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

          <div className="w-[50%] h-full sm:flex flex-col justify-between gap-2 hidden ">
            <img
              src={images[1]}
              alt={hotel.name}
              className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
            />
            <img
              src={images[2]}
              alt={hotel.name}
              className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
            />
          </div>
          <div className="w-[50%] h-full md:flex flex-col justify-between gap-2 hidden">
            <img
              src={images[3]}
              alt={hotel.name}
              className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
            />
            <img
              src={images[4]}
              alt={hotel.name}
              className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
            />
          </div>
        </div>

        <h1 className="text-xl sm:text-3xl font-bold mt-4 mb-4 font-TTHovesBold">
          {hotel.name}
        </h1>
        <span className="bg-myColor text-white text-sm font-TTHovesMedium px-2 py-1 rounded-md">
          <i class="fa-solid fa-star"></i> {hotel.stars} Star Hotel
        </span>

        <p className="font-TTHovesRegular my-4">{hotel.description}</p>

        <span className="font-TTHovesMedium text-lg sm:text-xl">
          Starting From{" "}
          <span className="text-green-700 font-TTHovesBold sm:text-3xl text-xl">
            ₹{hotel.price_per_night}/-
          </span>
        </span>

        {/* Booking Button */}
        <br />
        <button className="bg-myColor text-white px-4 rounded-full text-xl font-bold uppercase font-TTHovesBold mt-4">
          Book Now
        </button>

        {/* Amenties */}
        <h2 className="font-TTHovesMedium text-lg sm:text-xl mt-4">
          Amenities
        </h2>
        {hotel.amenities && (
          <div className="flex flex-wrap gap-2 mt-4">
            {hotel.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
              >
                <img
                  src={amenity.iconImage}
                  alt={amenity.iconName}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 font-TTHovesRegular">
                  {amenity.iconName}
                </span>
              </div>
            ))}
          </div>
        )}

        {hotel.affiliateLinks && (
          <div className="flex flex-col mt-6">
            {hotel.affiliateLinks.map((affiliate, index) => (
              <a
                href={affiliate.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex items-center justify-between sm:justify-start gap-10 text-center border-t-2 py-2"
              >
                <img
                  src={affiliate.icon}
                  alt={affiliate.name}
                  className="sm:w-28 w-24"
                />

                {/* <span className="font-TTHovesMedium">₹{hotel.roomsCatagory[0].price}/-</span> */}

                <button
                  key={index}
                  className="max-w-96 capitalize bg-yellow-500 text-black font-TripSansMedium py-1 px-2 rounded-md text-md sm:text-xl"
                >
                  View Deal
                </button>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Room Types */}
      {hotel.roomsCatagory && (
        <div className="w-full p-2 sm:p-4 bg-white rounded-2xl">
          <h2 className="sm:text-xl text-lg font-bold mb-4">
            {hotel.roomsCatagory.length} - Select Room Category
          </h2>
          <select
            className="w-fit p-2 border rounded-lg font-TTHovesMedium outline-none bg-myColor text-white text-md sm:text-lg"
            value={selectedRoom?.name}
            onChange={(e) => {
              const room = hotel.roomsCatagory.find(
                (r) => r.name === e.target.value
              );
              setSelectedRoom(room);
            }}
          >
            {hotel.roomsCatagory.map((room, index) => (
              <option
                key={index}
                value={room.name}
                className="font-TTHovesMedium bg-white text-black"
              >
                {room.name}
              </option>
            ))}
          </select>

          {selectedRoom && (
            <div className="flex md:flex-row flex-col mt-6 gap-6 items-start rounded-xl">
              <div
                className="relative w-full sm:h-full md:w-[50%] h-48 object-cover rounded-xl cursor-pointer "
                onMouseEnter={() => setIsRoomHovered(true)}
                onMouseLeave={() => setIsRoomHovered(false)}
              >
                <Slider ref={sliderRoomRef} {...sliderSettings}>
                  {selectedRoom.images.length > 0 ? (
                    selectedRoom.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`Hotel Slide ${index + 1}`}
                          className="w-full h-48 sm:h-[400px] object-cover rounded-xl"
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

                {isRoomHovered && (
                  <>
                    <button
                      className="absolute w-8 h-8 left-4 top-1/2 transform -translate-y-1/2 bg-white p-[2px] rounded-full shadow-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to the parent div
                        scrollRoomHorizontally("prev");
                      }}
                    >
                      <img src={Prev} alt="" className="w-16" />
                    </button>
                    <button
                      className="absolute right-4 w-8 h-8 top-1/2 transform -translate-y-1/2 bg-white p-[2px] rounded-full shadow-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling to the parent div
                        scrollRoomHorizontally("next");
                      }}
                    >
                      <img src={Next} alt="" className="w-16" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-col items-start justify-start">
                <h3 className="text-lg font-semibold font-TTHovesMedium">
                  {selectedRoom.name}
                </h3>
                <p className="mt-2 font-bold text-xl">
                  <span className="text-green-700 font-TTHovesBold text-3xl">
                    ₹{selectedRoom.price}
                  </span>{" "}
                  <span className="line-through text-gray-500">
                    ₹{selectedRoom.oldPrice}
                  </span>
                </p>
                <p className="text-gray-500 font-TTHovesRegular">
                  +₹{selectedRoom.taxes} Taxes & Fees per night
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
                    >
                      <img
                        src={amenity.iconImage}
                        alt={amenity.iconName}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700 font-TTHovesRegular">
                        {amenity.iconName}
                      </span>
                    </div>
                  ))}
                </div>
                <ul className="mt-3 list-disc list-inside text-gray-700 font-TTHovesRegular">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <li key={index}>{amenity.iconName}</li>
                  ))}
                </ul>
                {/* <button className="mt-4 bg-myColor text-white py-2 font-TTHovesMedium font-medium px-4 rounded-lg hover:bg-myColor">
                                Book Room
                            </button> */}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nearby Attractions */}
      {hotel.nearbyAttractions && (
        <div className="sm:p-6 p-2 bg-white rounded-xl relative">
          <h2 className="sm:text-2xl text-xl font-semibold font-TTHovesMedium text-gray-800 mb-4">
            Nearby Attractions - {hotel.name}
          </h2>
          <div className="space-y-4 relative">
            {hotel.nearbyAttractions.map((attraction, index) => (
              <div key={index} className="flex items-start relative">
                {/* Circle (Big dot) */}
                <div className="absolute left-0 top-2 sm:w-4 w-4 sm:h-4 h-4 bg-gray-800 rounded-full"></div>

                {/* Line connecting dots */}
                {index !== hotel.nearbyAttractions.length - 1 && (
                  <div className="absolute left-1.5 top-6 w-1 h-full bg-gray-200"></div> /* Vertical line */
                )}

                {/* Attraction Name and Description */}
                <div className="sm:ml-8 ml-6">
                  {" "}
                  {/* Adjusted left margin to align content properly */}
                  <h3 className="text-lg font-TripSansMedium text-gray-700">
                    {attraction.name}
                  </h3>
                  <p className="text-gray-600 font-TTHovesRegular">
                    {attraction.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
