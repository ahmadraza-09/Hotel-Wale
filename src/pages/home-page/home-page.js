import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ServicesCategorySection from "../../components/services-category-section";
import HotelPopularDestinationSection from "../../components/hotel-components/hotel-popular-destination-section";
import EcoRetreatPopularDestination from "../../components/eco-retreat-odisha/eco-retreat-popular-destination";
import HotelHero from "../../components/hotel-components/hotel-hero";


const HomePage = () => {

    return (
        <>
            {<Navbar/>}
            {<HotelHero/>}
            {<ServicesCategorySection/>}
            {<HotelPopularDestinationSection/>}
            {<EcoRetreatPopularDestination/>}
            {<Footer/>}
        </>
    );
};

export default HomePage;
