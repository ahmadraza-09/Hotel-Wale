import React from "react";
import { useNavigate } from "react-router-dom";
import hotelsData from "../data/hotels-data";

const Footer = () => {
  const destinationsList = hotelsData.cities.map((city) => city.city);

  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 font-TTHovesRegular text-black dark:text-white transition-colors">
      <div className="max-w-[1000px] w-full container mx-auto px-4 gap-8 mb-10">
        <ul className="flex w-full gap-4 capitalize font-TTHovesMedium text-sm flex-wrap">
          {destinationsList
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map((destination, index) => (
              <li
                key={index}
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate(`/hotels/hotels-in-${destination}`);
                }}
              >
                {destination}
              </li>
            ))}
        </ul>
      </div>

      <div className="max-w-[1000px] container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <a href="#" className="hover:text-blue-500">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                List your property
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Partnerships
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Newsroom
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <a href="#" className="hover:text-blue-500">
                India travel guide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Hotels in India
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Holiday rentals in India
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Holiday packages in India
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Domestic flights
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Car hire in India
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <a href="#" className="hover:text-blue-500">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Terms of use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Vrbo terms and conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Content guidelines
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <a href="#" className="hover:text-blue-500">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Change or cancel your booking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Refund process and timelines
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Book a flight using an airline credit
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                International travel documents
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          © 2025 hotelwale.com, All rights reserved. Built with ❤️ by{" "}
          <a href="https://github.com/ahmadraza-09" className="font-bold">
            Ahmad Raza
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
