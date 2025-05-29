import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Support from "../assets/icons/support-icon.svg";
import Dashboard from "../assets/icons/dashboard-icon2.svg";
import Listings from "../assets/icons/listings-icon.svg";
import Packages from "../assets/icons/packages-icon.svg";
import Settings from "../assets/icons/settings-icon.svg";
import Bookings from "../assets/icons/bookings-icon.svg";
import Analytics from "../assets/icons/analytics-icon.svg";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear(); // or remove specific keys
    toast.success("Logout successfully");
    navigate("/login"); // redirect to login page
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed top-16 inset-0 bg-black opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-15 left-0 h-full w-64 bg-white text-black transform font-TTHovesRegular rounded-sm ${
          showScrollbar ? "overflow-y-scroll" : "overflow-hidden"
        } pb-52 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 shadow-md custom-scrollbar`}
        onMouseEnter={() => setShowScrollbar(true)}
        onMouseLeave={() => setShowScrollbar(false)}
      >
        <ul className="mt-4 space-y-2 px-4">
          <li
            className={`${
              isActive("/") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={Dashboard} alt="" className="w-5" />
            Dashboard
          </li>
          <li
            className={`${
              isActive("/listings") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/listings");
            }}
          >
            <img src={Listings} alt="" className="w-5" />
            Listings
          </li>
          <li
            className={`${
              isActive("/packages") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/packages");
            }}
          >
            <img src={Packages} alt="" className="w-5" />
            Packages
          </li>
          <li
            className={`${
              isActive("/bookings") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/bookings");
            }}
          >
            <img src={Bookings} alt="" className="w-5" />
            Bookings
          </li>
          <li
            className={`${
              isActive("/analytics") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/analytics");
            }}
          >
            <img src={Analytics} alt="" className="w-5" />
            Analytics
          </li>
          <li
            className={`${
              isActive("/setting") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/setting");
            }}
          >
            <img src={Settings} alt="" className="w-5" />
            Setting
          </li>
          <li
            className={`${
              isActive("/support") ? "bg-gray-100" : ""
            } rounded px-2 py-2 flex items-center gap-5 cursor-pointer`}
            onClick={() => {
              navigate("/support");
            }}
          >
            <img src={Support} alt="" className="w-5" /> Support
          </li>
          <button
            className="bg-myColor text-white px-4 rounded-md w-full py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
