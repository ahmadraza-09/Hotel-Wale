import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HotelList from "../../components/hotel-components/hotels-list";
import { Helmet } from "react-helmet";

const HotelListPage = () => {
    const { city } = useParams();
    const cityName = city.replace("hotels-in-", "").replace("-", " ");
    const capitalizedCity = cityName.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <>
            <Helmet>
                <title>Best Hotels in {capitalizedCity} - Compare Prices & Book Now</title>
                <meta name="description" content={`Find and book the best hotels in ${cityName}. Compare prices from top booking sites like Booking.com, Expedia, and more.`} />
                <meta name="keywords" content={`hotels in ${cityName}, best hotels in ${cityName}, budget hotels in ${cityName}, luxury hotels in ${cityName}`} />
                <link rel="canonical" href={`https://hotelwale.com/hotels/${city}`} />

                {/* JSON-LD structured data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hotel",
                        "name": `Hotels in ${capitalizedCity}`,
                        "url": `https://hotelwale.com/${city}`,
                        "description": `Explore top hotels in ${cityName}. Book now for the best deals.`,
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
            <HotelList />
            <Footer />
        </>
    );
};

export default HotelListPage;
