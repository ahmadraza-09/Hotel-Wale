import React from "react";
import Navbar from "../../components/hotel-components/navbar";
import Footer from "../../components/hotel-components/footer";
import Hero from "../../components/hotel-components/hero";
import ServicesCategorySection from "../../components/hotel-components/services-category-section";


const HomePage = () => {

    return (
        <>
            {<Navbar/>}
            {<Hero/>}
            {<ServicesCategorySection/>}
            {<Footer/>}
        </>
    );
};

export default HomePage;
