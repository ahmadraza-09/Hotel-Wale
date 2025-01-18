import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HotelHero from "../../components/hotel-components/hotel-hero";
import ServicesCategorySection from "../../components/services-category-section";
import HotelPopularDestinationSection from "../../components/hotel-components/hotel-popular-destination-section";


const HotelHomePage = () => {

    return (
        <>
            {<Navbar/>}
            {<HotelHero/>}
            {<ServicesCategorySection/>}
            {<HotelPopularDestinationSection/>}
            {<Footer/>}
        </>
    );
};

export default HotelHomePage;
