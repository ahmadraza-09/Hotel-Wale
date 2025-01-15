import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-20`}
      >
        
        <ul className="mt-4 space-y-4 px-4">
          <li>
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
