import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import hotelsData from "../../data/hotels-data"; // Ensure correct path

const HotelDetails = () => {
    const { city, hotelName } = useParams();

    const navigate = useNavigate();

    // Find the hotel in your data
    const hotel = hotelsData.cities
        .find((c) => c.city === city)
        ?.hotels.find((h) => h.name.replace(/\s+/g, "-").toLowerCase() === hotelName);
    const [selectedRoom, setSelectedRoom] = useState(hotel?.roomsCatagory[0] || null);

    if (!hotel) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
                <p className="text-gray-500">The requested hotel does not exist.</p>
            </div>
        );
    }


    return (
        <div className="flex flex-col container mx-auto p-4 sm:p-6 bg-[#F2F2F2] gap-4 pb-6">

            <div className="container p-0 rounded-xl flex gap-2 items-center justify-start text-sm flex-wrap">
                <span className="font-TTHovesMedium text-blue-500 cursor-pointer" onClick={() => navigate('/')}>Home</span><i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i><span className="font-TTHovesMedium text-blue-500 cursor-pointer" onClick={() => navigate('/hotel')}>Hotel</span><i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i><span className="font-TTHovesMedium text-blue-500 cursor-pointer" onClick={() => navigate(`/hotel/hotels-in-${city}`)}>Hotels in <span className="capitalize">{city}</span></span><i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i><span className="font-TTHovesMedium text-blue-500 cursor-pointer">{hotel.name}</span>
            </div>

            <div className="container p-2 sm:p-4 bg-white rounded-2xl">
                <div className="h-40 sm:h-[400px] flex gap-2 sm:gap-5">
                    <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full sm:w-[50%] h-full object-cover rounded-xl cursor-pointer"
                    />
                    <div className="w-[50%] h-full sm:flex flex-col justify-between gap-2 hidden ">
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
                    <div className="w-[50%] h-full md:flex flex-col justify-between gap-2 hidden">
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

                <h1 className="text-xl sm:text-3xl font-bold mt-4 mb-4 font-TTHovesBold">{hotel.name}</h1>
                <span className="bg-myColor text-white text-sm font-TTHovesMedium px-2 py-1 rounded-md"><i class="fa-solid fa-star"></i> {hotel.stars} Star Hotel</span>

                <p className="font-TTHovesRegular my-4">{hotel.description}</p>

                <span className="font-TTHovesMedium text-lg sm:text-xl">Starting From <span className="text-green-700 font-TTHovesBold sm:text-3xl text-xl">₹{hotel.roomsCatagory[0].price}/-</span></span>

                {/* Amenties */}
                <h2 className="font-TTHovesMedium text-lg sm:text-xl mt-4">Amenities</h2>
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

                <button className="bg-myColor uppercase mt-4 text-white font-TTHovesBold py-1 px-2 rounded-md text-lg sm:text-xl">Book Now</button>
            </div>

            {/* Room Types */}
            <div className="container p-2 sm:p-4 bg-white rounded-2xl">
                <h2 className="sm:text-xl text-lg font-bold mb-4">{hotel.roomsCatagory.length} - Select Room Category</h2>
                <select
                    className="w-fit p-2 border rounded-lg font-TTHovesMedium outline-none bg-myColor text-white text-md sm:text-lg"
                    value={selectedRoom?.name}
                    onChange={(e) => {
                        const room = hotel.roomsCatagory.find((r) => r.name === e.target.value);
                        setSelectedRoom(room);
                    }}
                >
                    {hotel.roomsCatagory.map((room, index) => (
                        <option key={index} value={room.name} className="font-TTHovesMedium bg-white text-black">
                            {room.name}
                        </option>
                    ))}
                </select>

                {selectedRoom && (
                    <div className="flex sm:flex-row flex-col mt-6 gap-6 items-start">
                        <img
                            src={selectedRoom.images[0]}
                            alt={selectedRoom.name}
                            className="w-full sm:w-[50%] h-40 sm:h-[400px] object-cover rounded-2xl"
                        />
                        <div className="flex flex-col items-start justify-start">
                            <h3 className="text-lg font-semibold font-TTHovesMedium">{selectedRoom.name}</h3>
                            <p className="mt-2 font-bold text-xl">
                                <span className="text-green-700 font-TTHovesBold text-3xl">₹{selectedRoom.price}</span> <span className="line-through text-gray-500">₹{selectedRoom.oldPrice}</span>
                            </p>
                            <p className="text-gray-500 font-TTHovesRegular">+₹{selectedRoom.taxes} Taxes & Fees per night</p>
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
                            <ul className="mt-3 list-disc list-inside text-gray-700 font-TTHovesRegular">
                                {selectedRoom.amenities.map((amenity, index) => (
                                    <li key={index}>{amenity.iconName}</li>
                                ))}
                            </ul>
                            <button className="mt-4 bg-myColor text-white py-2 font-TTHovesMedium font-medium px-4 rounded-lg hover:bg-myColor">
                                Select Room
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelDetails;