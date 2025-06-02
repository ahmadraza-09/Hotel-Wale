const express = require('express');
const hotelimagescontroller = require('../controllers/hotel-images-controller');
const router = express.Router();

router.post('/addimage', hotelimagescontroller.addimage);
router.get('/getimages/:hotel_id', hotelimagescontroller.getimages);
router.delete('/deleteimage/:hotel_id', hotelimagescontroller.deleteimage);


module.exports = router;