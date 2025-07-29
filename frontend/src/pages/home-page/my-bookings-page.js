import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import MyBookings from "../../components/my-bookings";


const MyBookingsPage = () => {
    return (
        <>
            <Navbar />
            <MyBookings />
            <Footer />
        </>
    );
};

export default MyBookingsPage;
