import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Hero from "../../components/home-components/home-hero";
import ServicesCategorySection from "../../components/services-category-section";
import HotelPopularDestinationSection from "../../components/hotel-components/hotel-popular-destination-section";
import EcoRetreatPopularDestination from "../../components/eco-retreat-odisha/eco-retreat-popular-destination";


const HomePage = () => {

    return (
        <>
            {<Navbar/>}
            {<Hero/>}
            {<ServicesCategorySection/>}
            {<HotelPopularDestinationSection/>}
            {<EcoRetreatPopularDestination/>}
            {<Footer/>}
        </>
    );
};

export default HomePage;
