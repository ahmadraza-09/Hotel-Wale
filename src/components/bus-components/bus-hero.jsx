import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hotel from '../../assets/icons/hotel-icon.png';
import Bus from '../../assets/icons/bus-icon.svg';
import Car from '../../assets/icons/car-icon.svg';
import Flight from '../../assets/icons/flight-icon.svg';

const BusHero = () => {

    const navigate = useNavigate();
    const location = useLocation(); // Get the current route
    const currentRoute = location.pathname; // Extract the pathname (e.g., '/hotel')

    // Helper function to determine if a tab is active
    const isActive = (route) => currentRoute.includes(route);

    return (
        <div className="sm:p-6 font-TTHovesMedium p-0">
            <div className="max-w-9xl w-full mx-auto bg-gray-100 rounded-2xl px-5 py-5">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 text-start mb-6 hidden sm:inline-flex font-TTHovesBold">
                    Your Bus, Your Choice – Travel Now !
                </h1>

                {/* Tabs */}
                <div className="flex justify-around sm:justify-start sm:gap-10 mb-6 py-5">
                    {/* Flights */}
                    {/* <div className="flex flex-col gap-2 justify-center items-center">
                        <button className="w-[52px] h-[52px] py-2 px-4 bg-white shadow-custom text-gray-800 rounded-md hover:bg-myColor hover:text-white focus:bg-myColor focus:text-white active:bg-myColor active:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 200"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="duration-75"
                                role="img"
                            >
                                <path d="M178.081 41.973c-2.681 2.663-16.065 17.416-28.956 30.221c0 107.916 3.558 99.815-14.555 117.807l-14.358-60.402l-14.67-14.572c-38.873 38.606-33.015 8.711-33.015 45.669c.037 8.071-3.373 13.38-8.263 18.237L50.66 148.39l-30.751-13.513c10.094-10.017 15.609-8.207 39.488-8.207c8.127-16.666 18.173-23.81 26.033-31.62L70.79 80.509L10 66.269c17.153-17.039 6.638-13.895 118.396-13.895c12.96-12.873 26.882-27.703 29.574-30.377c7.745-7.692 28.017-14.357 31.205-11.191c3.187 3.166-3.349 23.474-11.094 31.167zm-13.674 42.469l-8.099 8.027v23.58c17.508-17.55 21.963-17.767 8.099-31.607zm-48.125-47.923c-13.678-13.652-12.642-10.828-32.152 8.57h23.625l8.527-8.57z"></path>
                            </svg>
                        </button>
                        <span className="font-TTHovesRegular text-sm text-center">Flights</span>
                    </div> */}

                    {/* Hotels */}
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <button className={`w-[52px] h-[52px] py-2 px-4 rounded-md shadow-custom ${isActive("/hotel") ? "bg-myColor text-white" : "bg-white text-gray-800"
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
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-custom">
                    <form className="flex flex-col md:flex-row gap-4">
                        {/* Destination Input */}
                        <div className="flex-grow">
                            <label className="block text-gray-600 font-medium mb-2">Destination</label>
                            <input
                                type="text"
                                placeholder="Nainital, Uttarakhand, India"
                                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Date Range Input */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">
                                Check-in / Check-out
                            </label>
                            <input
                                type="text"
                                placeholder="Mon 10/2 - Mon 17/2"
                                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Guests Input */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Guests</label>
                            <input
                                type="text"
                                placeholder="1 room, 2 guests"
                                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Search Button */}
                        <div className="w-full md:w-auto self-end">
                            <button
                                type="submit"
                                className="w-full bg-myColor W-[100%] text-white py-3 px-6 rounded-md hover:bg-orange-600 "
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Recent Searches */}
                <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                        Your recent searches
                    </h2>
                    {/* Placeholder for recent searches */}
                    <div className="flex items-center gap-4">
                        <div className="p-4 border border-gray-300 rounded-md">
                            <p className="text-gray-600">Recent Search 1</p>
                        </div>
                        <div className="p-4 border border-gray-300 rounded-md">
                            <p className="text-gray-600">Recent Search 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BusHero;
