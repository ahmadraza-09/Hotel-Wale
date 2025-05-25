import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Support from "../assets/icons/support-icon.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  const navigate = useNavigate();
  return (
    <div>
      {/* Overlay for focus */}
      {isOpen && (
        <div
          className="fixed top-16 inset-0 bg-black opacity-50 z-20"
          onClick={toggleSidebar} // Close sidebar when clicking overlay
        />
      )}

      {/* Sidebar */}
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
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
              {/* <img src={Support} alt="" className="w-5" />  */}
              My Hotels
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
              {/* <img src={Support} alt="" className="w-5" />  */}
              My Packages
            </a>
          </li>
          <li className="hover:bg-gray-100 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
              <img src={Support} alt="" className="w-5" /> Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
