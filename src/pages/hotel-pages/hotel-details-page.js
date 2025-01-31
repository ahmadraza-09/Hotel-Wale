import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HotelDetails from "../../components/hotel-components/hotel-details";


const HotelDetailsPage = () => {

    return (
        <>
            {<Navbar/>}
            {<HotelDetails/>}
            {<Footer/>}
        </>
    );
};

export default HotelDetailsPage;
