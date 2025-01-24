import Image1 from "../assets/hotel-images/hotel1.webp";
import Image2 from "../assets/hotel-images/hotel2.webp";
import Image3 from "../assets/hotel-images/hotel3.webp";

import Wifi from "../assets/icons/wifi.svg";
import Coffee from "../assets/icons/coffee.svg";
import FrontDesk from "../assets/icons/front-desk.svg";
import Pool from "../assets/icons/swimming-pool.svg";

const hotelsData = {
  cities: [
    {
      city: "delhi",
      hotels: [
        {
          name: "Wishdom Regency Inn",
          stars: 4,
          rating: 4.5,
          reviews: "20+ ratings",
          pricePerNight: 2674,
          taxesAndFees: 505,
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
          image: "https://example.com/wishdom-regency-inn.jpg", // Replace with actual URL of the hotel image
          description: "Located in the serene and picturesque town of Aleo, Wishdom Regency Inn offers a perfect blend of luxury and comfort. Enjoy breathtaking views of the mountains, modern amenities, and top-notch hospitality.",
          images: [
            Image1, Image2, Image3,
          ],
          address: "Wishdom Regency Inn, Aleo, Himachal Pradesh, India",
          phone: "+91 1234567890",
          policies: {
            checkIn: "12:00 PM",
            checkOut: "11:00 AM",
            cancellationPolicy: "Free cancellation up to 24 hours before check-in. After that, a cancellation fee of ₹500 will apply."
          },
          nearbyAttractions: [
            "Hadimba Devi Temple - 3 km",
            "Manali Mall Road - 2.5 km",
            "Solang Valley - 14 km"
          ]
        },
        {
          name: "Maya Regency Inn",
          stars: 3,
          rating: 4.5,
          reviews: "20+ ratings",
          pricePerNight: 2674,
          taxesAndFees: 505,
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
          image: "https://example.com/wishdom-regency-inn.jpg", // Replace with actual URL of the hotel image
          description: "Located in the serene and picturesque town of Aleo, Wishdom Regency Inn offers a perfect blend of luxury and comfort. Enjoy breathtaking views of the mountains, modern amenities, and top-notch hospitality.",
          images: [
            Image1, Image2, Image3,
          ],
          address: "Wishdom Regency Inn, Aleo, Himachal Pradesh, India",
          phone: "+91 1234567890",
          policies: {
            checkIn: "12:00 PM",
            checkOut: "11:00 AM",
            cancellationPolicy: "Free cancellation up to 24 hours before check-in. After that, a cancellation fee of ₹500 will apply."
          },
          nearbyAttractions: [
            "Hadimba Devi Temple - 3 km",
            "Manali Mall Road - 2.5 km",
            "Solang Valley - 14 km"
          ]
        },
        {
          name: "Over Regency Inn",
          stars: 5,
          rating: 4.5,
          reviews: "20+ ratings",
          pricePerNight: 2674,
          taxesAndFees: 505,
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
          image: "https://example.com/wishdom-regency-inn.jpg", // Replace with actual URL of the hotel image
          description: "Located in the serene and picturesque town of Aleo, Wishdom Regency Inn offers a perfect blend of luxury and comfort. Enjoy breathtaking views of the mountains, modern amenities, and top-notch hospitality.",
          images: [
            Image1, Image2, Image3,
          ],
          address: "Wishdom Regency Inn, Aleo, Himachal Pradesh, India",
          phone: "+91 1234567890",
          policies: {
            checkIn: "12:00 PM",
            checkOut: "11:00 AM",
            cancellationPolicy: "Free cancellation up to 24 hours before check-in. After that, a cancellation fee of ₹500 will apply."
          },
          nearbyAttractions: [
            "Hadimba Devi Temple - 3 km",
            "Manali Mall Road - 2.5 km",
            "Solang Valley - 14 km"
          ]
        }
      ]
    },
    {
      city: "mumbai",
      hotels: [

      ]
    },
    {
      city: "bangalore",
      hotels: [

      ]
    }
  ]
};

export default hotelsData;
