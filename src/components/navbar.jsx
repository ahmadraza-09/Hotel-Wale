import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar"; // Import Sidebar
import User from "../assets/icons/user-icon.svg";
import MenuBar from "../assets/icons/menu-bar-icon.svg";
import Logo from "../assets/logo.jpg";
import LoginModal from "./login-modal";

const Navbar = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm flex justify-between px-4 py-4 sm:px-5 sm:py-4 text-black">
        <div className="flex gap-5 justify-center items-center text-center">
          <img
            src={MenuBar}
            alt="Menu"
            className="w-6 cursor-pointer"
            onClick={toggleSidebar} // Toggle Sidebar on click
          />
          {/* <h2
            className="uppercase font-TTHovesBold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Hotelwale
          </h2> */}
          <img
            src={Logo}
            alt=""
            className="w-32 sm:w-44 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="flex gap-5 justify-center items-center text-center">
          <svg
            viewBox="0 0 200 200"
            width="1.25em"
            height="1.25em"
            xmlns="http://www.w3.org/2000/svg"
            class="ncEv dJtn-menu-item-icon"
            role="presentation"
            aria-hidden="true"
          >
            <path d="M176.54 34.58c-8.61-8.83-20.13-13.99-32.29-14.53c-21.53-.97-36.06 12.06-43.92 22.17c-7.86-10.12-22.39-23.14-43.92-22.17c-12.27.54-23.68 5.7-32.29 14.53c-8.72 8.93-13.45 20.56-13.45 32.83c0 19.27 10.98 41.01 32.51 64.58c17.11 18.73 32.29 33.15 46.28 44.24c3.23 2.48 7.1 3.77 10.87 3.77s7.64-1.29 10.87-3.77c14.1-11.09 29.17-25.51 46.28-44.24c21.53-23.57 32.51-45.32 32.51-64.58c0-12.27-4.74-23.9-13.46-32.83z"></path>
          </svg>
          <button
            className="flex gap-2 justify-center items-center text-center border-[0.5px] px-2 py-[5px] border-black rounded-lg"
            onClick={() => setLoginModal(true)}
          >
            <img src={User} alt="User" />
            <h3 className="font-TTHovesMedium font-[500] text-sm">Sign in</h3>
          </button>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {loginModal && (
        <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
      )}
    </>
  );
};

export default Navbar;
