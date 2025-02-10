import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import hotelsData from "../data/hotels-data";



const Footer = () => {

  const destinationsList = hotelsData.cities.map(city => city.city);

  const navigate = useNavigate();

  return (
    <footer class="bg-gray-100 py-8 font-TTHovesRegular">

      <div className='max-w-[1000px] w-full container mx-auto px-4 gap-8 mb-10'>
        <ul className='flex w-full gap-4 capitalize font-TTHovesMedium text-sm flex-wrap'>
          {destinationsList
            .slice()  // Creates a copy to avoid mutating the original array
            .sort((a, b) => a.localeCompare(b))  // Sort alphabetically
            .map((destination, index) => (
              <li key={index} className='text-blue-500 cursor-pointer'
                onClick={() => {
                  navigate(`/hotels/hotels-in-${destination}`);
                }}>
                {destination}
              </li>
            ))}
        </ul>
      </div>


      <div class="max-w-[1000px] container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
          <h3 class="text-lg font-semibold mb-4">Company</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-500">About us</a></li>
            <li><a href="#" class="hover:text-blue-500">Jobs</a></li>
            <li><a href="#" class="hover:text-blue-500">List your property</a></li>
            <li><a href="#" class="hover:text-blue-500">Partnerships</a></li>
            <li><a href="#" class="hover:text-blue-500">Newsroom</a></li>
          </ul>
        </div>


        <div>
          <h3 class="text-lg font-semibold mb-4">Explore</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-500">India travel guide</a></li>
            <li><a href="#" class="hover:text-blue-500">Hotels in India</a></li>
            <li><a href="#" class="hover:text-blue-500">Holiday rentals in India</a></li>
            <li><a href="#" class="hover:text-blue-500">Holiday packages in India</a></li>
            <li><a href="#" class="hover:text-blue-500">Domestic flights</a></li>
            <li><a href="#" class="hover:text-blue-500">Car hire in India</a></li>
          </ul>
        </div>


        <div>
          <h3 class="text-lg font-semibold mb-4">Policies</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-500">Privacy</a></li>
            <li><a href="#" class="hover:text-blue-500">Cookies</a></li>
            <li><a href="#" class="hover:text-blue-500">Terms of use</a></li>
            <li><a href="#" class="hover:text-blue-500">Vrbo terms and conditions</a></li>
            <li><a href="#" class="hover:text-blue-500">Content guidelines</a></li>
          </ul>
        </div>


        <div>
          <h3 class="text-lg font-semibold mb-4">Help</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-500">Support</a></li>
            <li><a href="#" class="hover:text-blue-500">Change or cancel your booking</a></li>
            <li><a href="#" class="hover:text-blue-500">Refund process and timelines</a></li>
            <li><a href="#" class="hover:text-blue-500">Book a flight using an airline credit</a></li>
            <li><a href="#" class="hover:text-blue-500">International travel documents</a></li>
          </ul>
        </div>
      </div>

      <div class="container mx-auto px-4 mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
        <p>© 2025 Logo, All rights reserved. Logo and the Logo Logo are trademarks or registered trademarks of Logo, Inc.</p>
        <p class="mt-2">Verizon Cybertrust Security</p>
      </div>
    </footer>

  )
}

export default Footer
