import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BusHero from "../../components/bus-components/bus-hero";
import ServicesCategorySection from "../../components/services-category-section";


const BusHomePage = () => {

    return (
        <>
            {<Navbar/>}
            {<BusHero/>}
            {<ServicesCategorySection/>}
            {<Footer/>}
        </>
    );
};

export default BusHomePage;
