import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hotelsData from "../../data/hotels-data";

// Extract city names from hotelsData
const destinationsList = hotelsData.cities.map(city => city.city);

const HotelHero = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route
    const currentRoute = location.pathname; // Extract the pathname (e.g., '/hotel')

    // Helper function to determine if a tab is active
    const isActive = (route) => currentRoute.includes(route);

    const [destination, setDestination] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
    const [guests, setGuests] = useState({ rooms: 1, adults: 1, children: 0 });

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestination(value);
        if (value) {
            setFilteredSuggestions(
                destinationsList.filter((dest) =>
                    dest.toLowerCase().includes(value.toLowerCase())
                )
            );
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const selectDestination = (destination) => {
        setDestination(destination);
        setShowDropdown(false);
    };

    const toggleGuestDropdown = () => {
        setGuestDropdownOpen((prev) => !prev);
    };

    const updateGuestCount = (type, action) => {
        setGuests((prev) => {
            const newCount =
                action === "increment" ? prev[type] + 1 : Math.max(0, prev[type] - 1);
            return { ...prev, [type]: newCount };
        });
    };

    // Handle form submission (Search)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (destination) {
            // Navigate to the hotels-in-destination page with the selected destination
            navigate(`/hotel/hotels-in-${destination.replace(/\s+/g, '-').toLowerCase()}`);
        }
    };

    return (
        <div className="sm:p-6 font-TTHovesMedium p-0">
            <div className="max-w-9xl w-full mx-auto bg-gray-100 rounded-2xl px-5 py-5">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 text-start mb-6 hidden sm:inline-flex font-TTHovesBold">
                    Your Hotel, Your Choice – Explore Now !
                </h1>

                {/* Tabs */}
                <div className="flex justify-around sm:justify-start sm:gap-10 mb-6 py-5">
                    {/* Hotels */}
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <button className={`w-[52px] h-[52px] py-2 px-4 rounded-md shadow-custom ${isActive("/") || isActive("/hotel") ? "bg-myColor text-white" : "bg-white text-gray-800"
                            } hover:bg-myColor hover:text-white`} onClick={() => {
                                navigate("/hotel");
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 200"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="duration-75"
                                role="img"
                            >
                                <path d="M166.666 44.998v40.438h-6.078c-2.927-7.642-10.155-13.048-18.607-13.048H123.68c-8.452 0-15.68 5.406-18.607 13.048H94.927C92 77.794 84.772 72.388 76.32 72.388H58.019c-8.452 0-15.68 5.406-18.607 13.048H33.33V44.998h133.336zM180 113.749c0-10.387-7.445-18.982-17.131-20.414H37.131C27.44 94.767 20 103.362 20 113.749v41.253h13.33v-20.627h133.336v20.627H180v-41.253z"></path>
                            </svg>
                        </button>
                        <span className="font-TTHovesRegular text-sm text-center">Hotels</span>
                    </div>

                    {/* Bus */}
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <button className={`w-[52px] h-[52px] py-2 px-4 rounded-md shadow-custom ${isActive("/bus") ? "bg-myColor text-white" : "bg-white text-gray-800"
                            } hover:bg-myColor hover:text-white`} onClick={() => {
                                navigate("/bus");
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="duration-75"
                                role="img"
                            >
                                <path d="M7.15 20a.58.58 0 0 1-.425-.175.6.6 0 0 1-.175-.45V17.6q-.5-.2-1.025-.888A2.54 2.54 0 0 1 5 15.125V6q0-1.55 1.688-2.275T12 3q3.75 0 5.375.688T19 6v9.125q0 .9-.525 1.587-.525.689-1.025.888v1.775a.6.6 0 0 1-.175.45.58.58 0 0 1-.425.175.6.6 0 0 1-.45-.175.6.6 0 0 1-.175-.45V18h-8.45v1.375a.59.59 0 0 1-.187.45.62.62 0 0 1-.438.175M6 11h12V6.55H6zm2.5 4.625q.475 0 .8-.338.325-.337.325-.787 0-.475-.337-.8a1.1 1.1 0 0 0-.788-.325q-.475 0-.8.337a1.1 1.1 0 0 0-.325.788q0 .475.338.8.337.325.787.325m7 0q.475 0 .8-.338.325-.337.325-.787 0-.475-.337-.8a1.1 1.1 0 0 0-.788-.325q-.475 0-.8.337a1.1 1.1 0 0 0-.325.788q0 .475.338.8.337.325.787.325"></path>
                            </svg>
                        </button>
                        <span className="font-TTHovesRegular text-sm text-center">Bus</span>
                    </div>

                    {/* Car Rental */}
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <button className={`w-[52px] h-[52px] py-2 px-4 rounded-md shadow-custom ${isActive("/car") ? "bg-myColor text-white" : "bg-white text-gray-800"
                            } hover:bg-myColor hover:text-white`} onClick={() => {
                                navigate("/car");
                            }}>
                            <svg
                                viewBox="0 0 200 200"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                role="presentation"
                                fill="currentColor"
                            >
                                <path d="M22.613 84.516C15.647 84.516 10 78.883 10 71.935h12.613c6.966 0 12.613 5.632 12.613 12.581H22.613zm154.774-12.581c-6.966 0-12.613 5.632-12.613 12.581h12.613c6.966 0 12.613-5.633 12.613-12.581h-12.613zm-14.97 13.387c17.991 23.752 15.201 5.722 15.201 74.678h-25.226v-15.484H46.638V160H22.382c0-61.366-3.522-57.158 15.26-75.027C52.259 31.161 56.599 40 127.818 40c25.287 0 29.864 27.733 34.599 45.322zM51.402 84.63h97.104c-10.46-38.739-5.871-32.049-76.037-32.049c-14.277 0-17.559 19.369-21.067 32.049zm9.619 26.983c0-6.948-5.647-12.581-12.613-12.581H35.796c0 6.948 5.647 12.581 12.613 12.581h12.612zm60.705 11.613H78.169a4.374 4.374 0 0 0-4.132 5.791c1.318 4.014 1.759 2.919 47.794 2.919c5.718-.001 5.891-8.71-.105-8.71zm42.479-24.194h-12.574c-6.944 0-12.613 5.655-12.613 12.581h12.574c6.944 0 12.613-5.654 12.613-12.581z"></path>
                            </svg>
                        </button>
                        <span className="font-TTHovesRegular text-sm text-center">Car Rental</span>
                    </div>
                </div>

                {/* Search Form */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                    <form className="flex flex-col md:flex-row items-center gap-4" onSubmit={handleSubmit}>
                        {/* Destination Input */}
                        <div className="flex-grow relative w-full">
                            <input
                                type="text"
                                value={destination}
                                onChange={handleDestinationChange}
                                placeholder="Search for a destination"
                                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-500 focus:border-none focus:outline-orange-500 capitalize"
                            />
                            {/* Destination Dropdown */}
                            {showDropdown && filteredSuggestions.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-scroll custom-scrollbar">
                                    {filteredSuggestions.map((dest, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-200 cursor-pointer capitalize"
                                            onClick={() => selectDestination(dest)}
                                        >
                                            {dest}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Date Range Input */}
                        <div className="w-full flex items-center sm:gap-2">
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="w-[50%] border border-gray-300 rounded-md p-3 focus:ring-2 focus:border-none focus:outline-orange-500"
                            />
                            <span>-</span>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                className="w-[50%] border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-500 focus:border-none focus:outline-orange-500"
                            />
                        </div>

                        {/* Guests Dropdown */}
                        <div className="relative w-full lg:max-w-36">
                            <button
                                type="button"
                                onClick={toggleGuestDropdown}
                                className="lg:w-36 w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                            >
                                {`${guests.rooms} room${guests.rooms > 1 ? "s" : ""}, ${guests.adults
                                    } guest${guests.adults + guests.children > 1 ? "s" : ""}`}
                            </button>
                            {guestDropdownOpen && (
                                <div className="absolute -top-40 lg:top-12 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-4 w-56">
                                    {/* Rooms */}
                                    <div className="flex justify-between items-center mb-2">
                                        <span>Rooms</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => updateGuestCount("rooms", "decrement")}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{guests.rooms}</span>
                                            <button
                                                type="button"
                                                onClick={() => updateGuestCount("rooms", "increment")}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Adults */}
                                    <div className="flex justify-between items-center mb-2">
                                        <span>Adults</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => updateGuestCount("adults", "decrement")}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{guests.adults}</span>
                                            <button
                                                type="button"
                                                onClick={() => updateGuestCount("adults", "increment")}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Children */}
                                    <div className="flex justify-between items-center mb-2">
                                        <span>Children</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => updateGuestCount("children", "decrement")}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{guests.children}</span>
                                            <button
                                                type="button"
                                                onClick={() => updateGuestCount("children", "increment")}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="bg-myColor text-white rounded-md py-3 px-6 mt-4 sm:mt-0 w-full sm:w-auto">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HotelHero;