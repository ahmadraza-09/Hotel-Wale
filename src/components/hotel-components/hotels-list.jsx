import React, { useState, useEffect } from 'react';
import hotelData from '../../data/hotel-data.json'; // Assuming your data is in hotel-data.js
import Dropdown from '../../assets/icons/dropdown-icon.svg'
import Deals from '../../assets/icons/offer-icon.svg'
import Star from '../../assets/icons/star-icon.svg'
import Filter from '../../assets/icons/filter-icon.svg'
import HotelCard from './hotel-card';

function HotelList() {
    const [searchQuery, setSearchQuery] = useState("");



    return (
        <div className='pb-5'>
            {/* Hotels Filter Sidebar */}
            <div className="flex sticky top-[62.8px] z-10 items-center gap-3 p-4 bg-white shadow-md rounded-md font-TTHovesRegular sm:overflow-hidden overflow-scroll hide-scrollbar">

                {/* Price */}
                <img src={Filter} alt="" className='w-6 h-6 cursor-pointer' />


                {/* Price */}
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">
                    <span>Price</span>
                    <span className='w-5 h-5'><img src={Dropdown} alt="" /></span>
                </button>

                {/* Star Category */}
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">
                    <span>Star</span>
                    <span className='w-5 h-5'><img src={Dropdown} alt="" /></span>
                </button>



                {/* Location */}
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">

                    <span>Location</span>
                    <span className='w-5 h-5'><img src={Dropdown} alt="" /></span>
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

            {/* Hotels Lists */}
            <div>
                <br />
                <h1 className='ml-4 font-TTHovesMedium text-2xl'>Showing Hotels in Nainital</h1>
                <br />
                <div className='flex flex-wrap gap-4 justify-center'>
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                </div>
            </div>
        </div>
    );
}

export default HotelList;