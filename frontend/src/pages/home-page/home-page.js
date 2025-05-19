import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ServicesCategorySection from "../../components/services-category-section";
import HotelPopularDestinationSection from "../../components/hotel-components/hotel-popular-destination-section";
import EcoRetreatPopularDestination from "../../components/eco-retreat-odisha/eco-retreat-popular-destination";
import HotelHero from "../../components/hotel-components/hotel-hero";

const HomePage = () => {
    return (
        <>
            <Helmet>
                {/* Title for SEO */}
                <title>HotelWale - Best Hotels, Tour Packages, Bus & Holiday Packages in India</title>
                
                {/* Meta Description */}
                <meta name="description" content="Explore top-rated hotels, holiday packages, bus services, and travel deals in India. Find budget-friendly and luxury options for a perfect trip." />
                
                {/* Keywords */}
                <meta name="keywords" content="hotels in India, best travel deals, luxury hotels, affordable hotels, budget hotels, holiday packages, tour packages, bus booking, travel services" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://hotelwale.com" />

                {/* Open Graph Meta Tags (For Social Sharing) */}
                <meta property="og:title" content="HotelWale - Best Hotels, Tour Packages, Bus & Holiday Packages in India" />
                <meta property="og:description" content="Discover premium hotels, exciting travel packages, and convenient bus booking services for your next trip." />
                <meta property="og:image" content="https://hotelwale.com/images/travel.jpg" />
                <meta property="og:url" content="https://hotelwale.com" />
                <meta property="og:type" content="website" />

                {/* JSON-LD Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TravelAgency",
                        "name": "HotelWale",
                        "url": "https://hotelwale.com",
                        "description": "Find hotels with the best amenities and services. Explore budget-friendly, luxury, and family-friendly hotels, tour packages, and bus booking options in India.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "India",
                            "addressCountry": "IN"
                        },
                        "serviceOffer": [
                            { "@type": "Service", "name": "Hotel Booking", "description": "Book hotels at the best prices, from budget to luxury stays." },
                            { "@type": "Service", "name": "Tour Packages", "description": "Explore curated tour packages for solo travelers, families, and groups." },
                            { "@type": "Service", "name": "Bus Booking", "description": "Find and book bus tickets for comfortable travel across India." },
                            { "@type": "Service", "name": "Holiday Packages", "description": "Customized holiday packages for an unforgettable experience." }
                        ]
                    })}
                </script>
            </Helmet>

            <Navbar />
            <HotelHero />
            <ServicesCategorySection />
            <HotelPopularDestinationSection />
            <EcoRetreatPopularDestination />
            <Footer />
        </>
    );
};

export default HomePage;
