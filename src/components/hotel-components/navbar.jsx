import React, { useState } from 'react';
import Sidebar from './sidebar'; // Import Sidebar
import User from '../../assets/icons/user-icon.svg';
import MenuBar from '../../assets/icons/menu-bar-icon.svg';
import Wishlist from '../../assets/icons/heart-icon.svg';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="flex justify-between px-2 py-2 sm:px-5 sm:py-2 shadow-md text-black">
        <div className="flex gap-5 justify-center items-center text-center">
          <img
            src={MenuBar}
            alt=""
            className="w-5 cursor-pointer"
            onClick={toggleSidebar} // Toggle Sidebar on click
          />
          <h2 className="uppercase font-TTHovesBold">Logo</h2>
        </div>
        <div className="flex gap-5 justify-center items-center text-center">
          <img src={Wishlist} alt="" className="cursor-pointer" />
          <button className="flex gap-2 justify-center items-center text-center border-[0.5px] px-2 py-[5px] border-black rounded-lg">
            <img src={User} alt="" />
            <h3 className="font-TTHovesMedium font-[500] text-sm">Sign in</h3>
          </button>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
