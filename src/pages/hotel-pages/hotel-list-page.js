import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HotelList from "../../components/hotel-components/hotels-list";


const HotelListPage = () => {

    return (
        <>
            {<Navbar/>}
            {<HotelList/>}
            {<Footer/>}
        </>
    );
};

export default HotelListPage;
