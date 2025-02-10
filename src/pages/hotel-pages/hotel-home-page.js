import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HotelHero from "../../components/hotel-components/hotel-hero";
import ServicesCategorySection from "../../components/services-category-section";
import HotelPopularDestinationSection from "../../components/hotel-components/hotel-popular-destination-section";

const HotelHomePage = () => {
    return (
        <>
            <Helmet>
                {/* Title for SEO */}
                <title>HotelWale - Find the Best Hotels in India | Comfort & Luxury</title>
                
                {/* Meta Description */}
                <meta name="description" content="Discover top hotels with premium amenities. Whether you're looking for budget-friendly stays or luxury accommodations, find the perfect hotel for your needs." />
                
                {/* Keywords */}
                <meta name="keywords" content="hotels, best hotels, luxury hotels, affordable hotels, budget hotels, hotel rooms, accommodation" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://hotelwale.com/hotels" />

                {/* JSON-LD Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hotel",
                        "name": "Top Hotels for Comfortable Stays",
                        "url": "https://yourwebsite.com/hotels",
                        "description": "Find hotels with the best amenities and services. Whether you're looking for luxury, budget-friendly, or family-friendly hotels, we have the perfect options for you.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Global",
                            "addressCountry": "Worldwide"
                        },
                        "amenityFeature": [
                            { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": "True" },
                            { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": "Available" },
                            { "@type": "LocationFeatureSpecification", "name": "Parking", "value": "Available" },
                            { "@type": "LocationFeatureSpecification", "name": "24/7 Customer Support", "value": "Available" }
                        ]
                    })}
                </script>
            </Helmet>

            <Navbar />
            <HotelHero />
            <ServicesCategorySection />
            <HotelPopularDestinationSection />
            <Footer />
        </>
    );
};

export default HotelHomePage;
