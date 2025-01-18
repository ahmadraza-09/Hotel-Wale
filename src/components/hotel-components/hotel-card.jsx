import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HotelImage1 from "../../assets/hotel-images/hotel1.webp";
import HotelImage2 from "../../assets/hotel-images/hotel2.webp";
import HotelImage3 from "../../assets/hotel-images/hotel3.webp";

import Prev from "../../assets/icons/slider-prev.svg";
import Next from "../../assets/icons/slider-next.svg";

import Wifi from "../../assets/icons/wifi.svg";
import Coffee from "../../assets/icons/coffee.svg";
import FrontDesk from "../../assets/icons/front-desk.svg";
import Pool from "../../assets/icons/swimming-pool.svg";
import Star from "../../assets/icons/star-icon.svg";

const HotelCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    const images = [HotelImage1, HotelImage2, HotelImage3];

    const sliderRef = React.useRef(null);

    const sliderSettings = {
        dots: true, // Enable dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable default arrows
        appendDots: (dots) => (
            <div
                style={{
                    position: "absolute",
                    bottom: "0px", // Position dots above the slider
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ul style={{ margin: "0px" }}>{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div
                style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "white", // Set dot color to white
                    opacity: 0.8, // Slight transparency for aesthetic
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

    return (
        <div
            className="max-w-[300px] rounded-lg shadow-lg border overflow-hidden relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Slider */}
            <div className="relative">
                <Slider ref={sliderRef} {...sliderSettings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`Hotel Slide ${index + 1}`}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    ))}
                </Slider>

                {/* Show prev/next buttons when hovered */}
                {isHovered && (
                    <>
                        <button
                            className="absolute w-8 h-8 left-4 top-1/2 transform -translate-y-1/2 bg-white p-[2px] rounded-full shadow-lg cursor-pointer"
                            onClick={() => scrollHorizontally("prev")}
                        >
                            <img src={Prev} alt="" className="w-16" />
                        </button>
                        <button
                            className="absolute right-4 w-8 h-8 top-1/2 transform -translate-y-1/2 bg-white p-[2px] rounded-full shadow-lg cursor-pointer"
                            onClick={() => scrollHorizontally("next")}
                        >
                            <img src={Next} alt="" className="w-16" />
                        </button>
                    </>
                )}
            </div>

            {/* Hotel Information */}
            <div className="p-2 font-TTHovesRegular ">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Wishdom Regency Inn</h3>
                    {/* Rating */}
                    <div className="flex mt-2">
                        <span className="flex gap-[5px] px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                            <img src={Star} alt="" className="w-4"/>4.5
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">4-star hotel · Aleo</p>
                    <p className="text-sm text-gray-600">20+ ratings</p>
                </div>


                {/* Price and Discount */}
                <div className="mt-2">
                    <p className="text-xl font-bold text-gray-800">
                        ₹2,674 <span className="text-sm text-gray-500">+ ₹505 taxes & fees / night</span>
                    </p>
                </div>

                {/* Amenities Services */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {/* Amenity 1 */}
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                        <img src={Wifi} alt="" className="w-4" />
                        <span className="text-sm text-gray-700">Free Wi-Fi</span>
                    </div>

                    {/* Amenity 2 */}
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                        <img src={Coffee} alt="" className="w-4" />
                        <span className="text-sm text-gray-700">Breakfast</span>
                    </div>

                    {/* Amenity 3 */}
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                        <img src={FrontDesk} alt="" className="w-4" />
                        <span className="text-sm text-gray-700">24/7 Front Desk</span>
                    </div>

                    {/* Add more amenities */}
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                        <img src={Pool} alt="" className="w-4" />
                        <span className="text-sm text-gray-700">Pool Access</span>
                    </div>
                </div>


                {/* Book Now Button */}
                <div className="mt-4">
                    <button className="w-full py-2 px-6 bg-myColor text-white font-medium rounded-md hover:bg-myColor-light font-TTHovesMedium">
                        Book Now
                    </button>
                </div>


            </div>
        </div>
    );
};

export default HotelCard;
