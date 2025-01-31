import React from "react";
import { useParams } from "react-router-dom";
import hotelsData from "../../data/hotels-data"; // Ensure correct path

const HotelDetails = () => {
    const { city, hotelName } = useParams();

    // Find the hotel in your data
    const hotel = hotelsData.cities
        .find((c) => c.city === city)
        ?.hotels.find((h) => h.name.replace(/\s+/g, "-").toLowerCase() === hotelName);

    if (!hotel) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
                <p className="text-gray-500">The requested hotel does not exist.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col container mx-auto p-6 bg-[#F2F2F2] gap-4 pb-6">

            <div className="container p-0 rounded-xl flex gap-2 items-center justify-start">
                <span className="font-TTHovesMedium text-blue-500 cursor-pointer">Home</span><i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i><span className="font-TTHovesMedium text-blue-500 cursor-pointer">Hotel</span><i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i><span className="font-TTHovesMedium text-blue-500 cursor-pointer">Hotels in <span className="capitalize">{city}</span></span><i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i><span className="font-TTHovesMedium text-blue-500 cursor-pointer">{hotel.name}</span>
            </div>

            <div className="container p-4 bg-white rounded-2xl">
                <div className="h-[400px] flex gap-5">
                    <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-[50%] h-full object-cover rounded-xl cursor-pointer"
                    />
                    <div className="w-[50%] h-full flex flex-col justify-between gap-2">
                        <img
                            src={hotel.images[1]}
                            alt={hotel.name}
                            className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
                        />
                        <img
                            src={hotel.images[2]}
                            alt={hotel.name}
                            className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
                        />
                    </div>
                    <div className="w-[50%] h-full flex flex-col justify-between gap-2">
                        <img
                            src={hotel.images[1]}
                            alt={hotel.name}
                            className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
                        />
                        <img
                            src={hotel.images[2]}
                            alt={hotel.name}
                            className="h-[48%] w-80 object-cover rounded-xl cursor-pointer"
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mt-4 mb-4 font-TTHovesBold">{hotel.name}</h1>

                <p className="font-TTHovesRegular my-4">{hotel.description}</p>

                {/* Amenties */}
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
            </div>
        </div>
    );
};

export default HotelDetails;