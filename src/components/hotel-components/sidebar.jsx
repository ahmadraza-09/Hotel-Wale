import React, { useState } from 'react';
import Hotel from '../../assets/icons/hotel-icon.png';
import Bus from '../../assets/icons/bus-icon.svg';
import Car from '../../assets/icons/car-icon.svg';
import Flight from '../../assets/icons/flight-icon.svg';
import Explore from '../../assets/icons/website-icon.svg';
import Time from '../../assets/icons/timer-icon.svg';
import SuiteCase from '../../assets/icons/suitecase-icon.svg';
import Heart from '../../assets/icons/heart-icon.svg';
import Feedback from '../../assets/icons/feedback-icon.svg';
import Flag from '../../assets/icons/india.svg';
import Support from '../../assets/icons/support-icon.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  return (
    <div>
      {/* Overlay for focus */}
      {isOpen && (
        <div
          className="fixed top-12 inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar} // Close sidebar when clicking overlay
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-12 left-0 h-full w-64 bg-white text-black transform ${
          showScrollbar ? 'overflow-y-scroll' : 'overflow-hidden'
        } pb-52 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-20 shadow-md custom-scrollbar`}
        onMouseEnter={() => setShowScrollbar(true)}
        onMouseLeave={() => setShowScrollbar(false)}
      >
        <ul className="mt-4 space-y-2 px-4">
          <li className="flex hover:bg-gray-100 rounded px-2 py-2 ">
            <a href="/" className="flex items-center gap-5">
              <img src={Flight} alt="" /> Flights
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/stays" className="flex items-center gap-5">
              <img src={Hotel} alt="" className="w-5" /> Hotels
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/car-rental" className="flex items-center gap-5">
              <img src={Bus} alt="" className="w-5" /> Bus Rental
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2 pb-5 border-b-[1.5px]">
            <a href="/flight-hotel" className="flex items-center gap-5">
              <img src={Car} alt="" className="w-5" /> Car Rental
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/explore" className="flex items-center gap-5">
              <img src={Explore} alt="" className="w-5" /> Explore
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/best-time-to-travel" className="flex items-center gap-5 ">
              <img src={Time} alt="" className="w-5" /> Best Time to Travel
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/business" className="flex items-center gap-5">
              <img src={SuiteCase} alt="" className="w-5" /> LOGO for Business
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-5 border-t-[1.5px] border-b-[1.5px]">
            <a href="/trips" className="flex items-center gap-5">
              <img src={Heart} alt="" className="w-5" /> Trips
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/language" className="flex items-center gap-5">
            <img src={Flag} alt="" className="w-5" /> English
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/currency" className="flex items-center gap-5">
              <span className="mr-0">💰</span> Indian Rupee
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
              <img src={Feedback} alt="" className="w-5" /> Feedback
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
            <img src={Support} alt="" className='w-5'/> Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
