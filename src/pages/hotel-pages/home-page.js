import React from "react";
import Navbar from "../../components/hotel-components/navbar";
import Footer from "../../components/hotel-components/footer";
import Hero from "../../components/hotel-components/hero";
import ServicesCategorySection from "../../components/hotel-components/services-category-section";
import PopularDestinationSection from "../../components/hotel-components/popular-destination-section";
import EcoRetreatPopularDestination from "../../components/eco-retreat-odisha/eco-retreat-popular-destination";


const BusHomePage = () => {

    return (
        <>
            {<Navbar/>}
            {<Hero/>}
            {<ServicesCategorySection/>}
            {<PopularDestinationSection/>}
            {<EcoRetreatPopularDestination/>}
            {<Footer/>}
        </>
    );
};

export default BusHomePage;
