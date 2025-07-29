const express = require('express');
const hotelBookingcontroller = require('../controllers/hotel-booking-controller');
const router = express.Router();

router.post('/hotel-booking', hotelBookingcontroller.hotelBooking);
router.get('/booking-list', hotelBookingcontroller.getAllBookings);
router.get('/user-booking-list/:user_id', hotelBookingcontroller.getAllUserBookings);
router.post('/update-booking-status/:booking_id', hotelBookingcontroller.updateBookingStatus);



module.exports = router;