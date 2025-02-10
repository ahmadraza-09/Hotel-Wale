import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HotelDetails from "../../components/hotel-components/hotel-details";

const HotelDetailsPage = () => {
    const { hotelName, city } = useParams(); // Get hotel name & city from URL

    const formattedHotelName = hotelName
        .replace(/-/g, " ") // Replace hyphens with spaces
        .split(" ") // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join words back
    // Convert URL format to normal text
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);      
    return (
        <>
            <Helmet>
                <title>{formattedHotelName} | Hotel Details Page | HotelWale.com</title>
                <meta name="description" content={`Stay at ${formattedHotelName}, one of the best hotels in ${city}. Compare prices & book now!`} />
                <meta name="keywords" content={`${formattedHotelName}, hotels in ${city}, best hotels in ${city}, luxury hotels in ${city}`} />
                <link rel="canonical" href={`https://hotelwale.com/hotels/${city}/${hotelName}`} />
                
                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hotel",
                        "name": formattedHotelName,
                        "url": `https://hotelwale.com/hotels/${city}/${hotelName}`,
                        "description": `Experience luxury at ${formattedHotelName} in ${capitalizedCity}. Book now for the best deals.`,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": capitalizedCity,
                            "addressCountry": "IN"
                        },
                        "amenityFeature": [
                            { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": "True" },
                            { "@type": "LocationFeatureSpecification", "name": "Parking", "value": "Available" }
                        ]
                    })}
                </script>
            </Helmet>

            <Navbar />
            <HotelDetails />
            <Footer />
        </>
    );
};

export default HotelDetailsPage;
