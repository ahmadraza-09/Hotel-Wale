import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hotel from "../assets/icons/hotel-icon.png";
import Bus from "../assets/icons/bus-icon.svg";
import Car from "../assets/icons/car-icon.svg";
import Flight from "../assets/icons/flight-icon.svg";
import Explore from "../assets/icons/explore-icon.svg";
import ExploreDark from "../assets/icons/explore-icon-dark.svg"; 
import Time from "../assets/icons/timer-icon.svg";
import TimeDark from "../assets/icons/timer-icon-dark.svg"; 
import SuiteCase from "../assets/icons/suitecase-icon.svg";
import SuiteCaseLogoDark from "../assets/icons/suitcase-icon-dark.svg"; 
import Heart from "../assets/icons/heart-icon.svg";
import HeartDark from "../assets/icons/heart-icon-dark.svg"; 
import Feedback from "../assets/icons/feedback-icon.svg";
import FeedbackDark from "../assets/icons/feedback-icon-dark.svg"; 
import Flag from "../assets/icons/india.svg";
import Support from "../assets/icons/support-icon.svg";
import SupportDark from "../assets/icons/support-icon-dark.svg";
import darkModeIcon from "../assets/icons/dark-icon.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const navigate = useNavigate();

  // Sync theme state with localStorage and html class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Optionally, dispatch a custom event for same-tab updates
    window.dispatchEvent(new Event("themechange"));
  };

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
        className={`fixed top-15 left-0 h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white transform font-TTHovesRegular rounded-sm ${
          showScrollbar ? "overflow-y-scroll" : "overflow-hidden"
        } pb-52 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 shadow-md custom-scrollbar`}
        onMouseEnter={() => setShowScrollbar(true)}
        onMouseLeave={() => setShowScrollbar(false)}
      >
        <ul className="mt-4 space-y-2 px-4">
          {/* <li
            className="flex hover:bg-gray-100 rounded px-2 py-2 "
            onClick={() => {
              navigate("/flight");
            }}
          >
            <a href="/" className="flex items-center gap-5">
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
              </svg>{" "}
              Flights
            </a>
          </li> */}
          <li
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2 cursor-pointer"
            onClick={() => {
              navigate("/hotels");
            }}
          >
            <a className="flex items-center gap-5">
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
              </svg>{" "}
              Hotels
            </a>
          </li>
          <li
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2 cursor-pointer"
            onClick={() => {
              navigate("/bus");
            }}
          >
            <a className="flex items-center gap-5">
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
              </svg>{" "}
              Bus Rental
            </a>
          </li>
          <li
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2 pb-5 border-b-[1.5px] cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <a className="flex items-center gap-5">
              <svg
                viewBox="0 0 200 200"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
                fill="currentColor"
              >
                <path d="M22.613 84.516C15.647 84.516 10 78.883 10 71.935h12.613c6.966 0 12.613 5.632 12.613 12.581H22.613zm154.774-12.581c-6.966 0-12.613 5.632-12.613 12.581h12.613c6.966 0 12.613-5.633 12.613-12.581h-12.613zm-14.97 13.387c17.991 23.752 15.201 5.722 15.201 74.678h-25.226v-15.484H46.638V160H22.382c0-61.366-3.522-57.158 15.26-75.027C52.259 31.161 56.599 40 127.818 40c25.287 0 29.864 27.733 34.599 45.322zM51.402 84.63h97.104c-10.46-38.739-5.871-32.049-76.037-32.049c-14.277 0-17.559 19.369-21.067 32.049zm9.619 26.983c0-6.948-5.647-12.581-12.613-12.581H35.796c0 6.948 5.647 12.581 12.613 12.581h12.612zm60.705 11.613H78.169a4.374 4.374 0 0 0-4.132 5.791c1.318 4.014 1.759 2.919 47.794 2.919c5.718-.001 5.891-8.71-.105-8.71zm42.479-24.194h-12.574c-6.944 0-12.613 5.655-12.613 12.581h12.574c6.944 0 12.613-5.654 12.613-12.581z"></path>
              </svg>{" "}
              Car Rental
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/explore" className="flex items-center gap-5">
              <img
                src={theme === "dark" ? ExploreDark : Explore}
                alt="Explore"
                className="w-5"
              />
              Explore
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/best-time-to-travel" className="flex items-center gap-5 ">
              <img
                src={theme === "dark" ? TimeDark : Time}
                alt="Best Time to Travel"
                className="w-5"
              />
              Best Time to Travel
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/business" className="flex items-center gap-5">
              <img
                src={theme === "dark" ? SuiteCaseLogoDark : SuiteCase}
                alt="Business Logo"
                className="w-5"
              />
              LOGO for Business
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-5 border-t-[1.5px] border-b-[1.5px]">
            <a href="/trips" className="flex items-center gap-5">
              <img
                src={theme === "dark" ? HeartDark : Heart}
                alt="Trips"
                className="w-5"
              />
              Trips
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/language" className="flex items-center gap-5">
              <img src={Flag} alt="" className="w-5" /> English
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/currency" className="flex items-center gap-5">
              <span className="mr-0 text-xl">₹</span>{" "}
              <span className="ml-2">Indian Rupee</span>
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
              <img
                src={theme === "dark" ? FeedbackDark : Feedback}
                alt="Feedback"
                className="w-5"
              />
              Feedback
            </a>
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2">
            <a href="/feedback" className="flex items-center gap-5">
              <img
                src={theme === "dark" ? SupportDark : Support}
                alt="Support"
                className="w-5"
              />
              Support
            </a>
          </li>
          <li
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2 cursor-pointer transition-colors"
            onClick={handleThemeToggle}
          >
            <a href="#" className="flex items-center gap-5">
              <img
                src={darkModeIcon}
                alt="dark mode icon"
                className="w-5"
                style={{
                  filter: theme === "dark" ? "invert(1)" : "none"
                }}
              />
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
