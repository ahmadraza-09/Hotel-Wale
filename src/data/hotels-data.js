import Image1 from "../assets/hotel-images/hotel1.webp";
import Image2 from "../assets/hotel-images/hotel2.webp";
import Image3 from "../assets/hotel-images/hotel3.webp";

// Hotel Aroma Nainital 
import HotelAromaImage1 from "../assets/hotel-images/hotel-aroma/hotel-aroma-nainital1.avif";
import HotelAromaImage2 from "../assets/hotel-images/hotel-aroma/hotel-aroma-nainital2.avif";
import HotelAromaImage3 from "../assets/hotel-images/hotel-aroma/hotel-aroma-nainital3.avif";

import Wifi from "../assets/icons/wifi.svg";
import Coffee from "../assets/icons/coffee.svg";
import FrontDesk from "../assets/icons/front-desk.svg";
import Pool from "../assets/icons/swimming-pool.svg";

const hotelsData = {
  cities: [
    {
      city: "ahmedabad",
      hotels: [
        {
          name: "Ahmedabad Grand Hotel",
          stars: 4,
          rating: 4.3,
          reviews: "15+ ratings",
          pricePerNight: 3200,
          taxesAndFees: 600,
          amenities: [
            {
              iconName: "Free Wi-Fi",
              iconImage: Wifi,
            },
            {
              iconName: "Breakfast",
              iconImage: Coffee,
            },
            {
              iconName: "24/7 Front Desk",
              iconImage: FrontDesk,
            },
            {
              iconName: "Pool Access",
              iconImage: Pool,
            },
          ],
          image: "https://example.com/ahmedabad-grand-hotel.jpg",
          description: "Located in the heart of Ahmedabad, offering premium hospitality and comfort.",
          images: [Image1, Image2, Image3],
          address: "Ahmedabad Grand Hotel, Gujarat, India",
          phone: "+91 9876543210",
          roomsCatagory: [
            {
              name: "Deluxe Room",
              price: 2500,
              oldPrice: 3299,
              images: [Image1, Image2, Image3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
            {
              name: "Super Deluxe Room",
              price: 3500,
              oldPrice: 4299,
              images: [Image1, Image2, Image3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
            {
              name: "Family Suite Room",
              price: 4500,
              oldPrice: 5299,
              images: [Image1, Image2, Image3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
          ],
          policies: {
            checkIn: "1:00 PM",
            checkOut: "11:00 AM",
            cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
          },
          nearbyAttractions: [
            "Sabarmati Ashram - 5 km",
            "Kankaria Lake - 7 km",
            "Sidi Saiyyed Mosque - 3 km",
          ],
        },
      ],
    },
    {
      city: "bangalore",
      hotels: [
        {
          id: 1,
          name: "Bangalore Palace Inn",
          stars: 5,
          rating: 4.7,
          reviews: "30+ ratings",
          pricePerNight: 4500,
          taxesAndFees: 750,
          amenities: [
            {
              iconName: "Free Wi-Fi",
              iconImage: Wifi,
            },
            {
              iconName: "Breakfast",
              iconImage: Coffee,
            },
            {
              iconName: "24/7 Front Desk",
              iconImage: FrontDesk,
            },
            {
              iconName: "Pool Access",
              iconImage: Pool,
            },
            
          ],
          image: "https://example.com/bangalore-palace-inn.jpg",
          description: "A luxurious stay with stunning views of Bangalore city.",
          images: [Image1, Image2, Image3],
          address: "Bangalore Palace Inn, Karnataka, India",
          phone: "+91 8765432109",
          roomsCatagory: [
            {
              name: "Deluxe Room",
              price: 2500,
              oldPrice: 3299,
              images: [Image1, Image2, Image3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
            {
              name: "Super Deluxe Room",
              price: 3500,
              oldPrice: 4299,
              images: [Image1, Image2, Image3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
            {
              name: "Family Suite Room",
              price: 4500,
              oldPrice: 5299,
              images: [Image1, Image2, Image3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
          ],
          policies: {
            checkIn: "2:00 PM",
            checkOut: "12:00 PM",
            cancellationPolicy: "Free cancellation up to 24 hours before check-in.",
          },
          nearbyAttractions: [
            "Lalbagh Botanical Garden - 4 km",
            "Cubbon Park - 5 km",
            "Bangalore Palace - 2 km",
          ],
        },
      ],
    },
    {
      city: "chennai",
      hotels: [],
    },
    {
      city: "delhi",
      hotels: [],
    },
    {
      city: "hyderabad",
      hotels: [],
    },
    {
      city: "jaipur",
      hotels: [],
    },
    {
      city: "kolkata",
      hotels: [],
    },
    {
      city: "mumbai",
      hotels: [],
    },
    {
      city: "nainital",
      hotels: [
        {
          name: "Hotel Aroma Nainital",
          description: "Located near Boat House and near popular tourist attractions, Hotel Aroma Nainital is a luxurious property that features cozy rooms full of amenities.",
          stars: 4,
          rating: 4.3,
          reviews: "15+ ratings",
          pricePerNight: 3200,
          taxesAndFees: 600,
          amenities: [
            {
              iconName: "Free Wi-Fi",
              iconImage: Wifi,
            },
            {
              iconName: "Breakfast",
              iconImage: Coffee,
            },
            {
              iconName: "24/7 Front Desk",
              iconImage: FrontDesk,
            },
            {
              iconName: "Pool Access",
              iconImage: Pool,
            },
          ],
          image: "https://example.com/ahmedabad-grand-hotel.jpg",
          images: [HotelAromaImage1, HotelAromaImage2, HotelAromaImage3],
          address: "Ahmedabad Grand Hotel, Gujarat, India",
          phone: "+91 9876543210",
          roomsCatagory: [
            {
              name: "Deluxe Room",
              price: 2500,
              oldPrice: 3299,
              images: [HotelAromaImage1, HotelAromaImage2, HotelAromaImage3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
            {
              name: "Super Deluxe Room",
              price: 3500,
              oldPrice: 4299,
              images: [HotelAromaImage1, HotelAromaImage2, HotelAromaImage3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
            {
              name: "Family Suite Room",
              price: 4500,
              oldPrice: 5299,
              images: [HotelAromaImage1, HotelAromaImage2, HotelAromaImage3],
              roomSize: "(250 sq.ft (23 sq.mt) | Double Bed)",
              amenities: [
                {
                  iconName: "Book with ₹ 0 Payment​",
                  iconImage: Wifi,
                },
                {
                  iconName: "No meals included",
                  iconImage: Coffee,
                },
                {
                  iconName: "Early Check-In upto 2 hours (subject to availability)",
                  iconImage: FrontDesk,
                },
                {
                  iconName: "Late Check-Out upto 2 hours (subject to availability)",
                  iconImage: Pool,
                },
                {
                  iconName: "Free Cancellation till 24 hrs before check in",
                  iconImage: Pool,
                },
              ],
            },
          ],
          policies: {
            checkIn: "1:00 PM",
            checkOut: "11:00 AM",
            cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
          },
          nearbyAttractions: [
            "Sabarmati Ashram - 5 km",
            "Kankaria Lake - 7 km",
            "Sidi Saiyyed Mosque - 3 km",
          ],
        },
      ],
    },
    {
      city: "pune",
      hotels: [],
    },
    {
      city: "surat",
      hotels: [],
    },
    {
      city: "varanasi",
      hotels: [],
    },
  ],
};

export default hotelsData;
