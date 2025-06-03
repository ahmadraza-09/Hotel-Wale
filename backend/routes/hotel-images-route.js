const express = require('express');
const upload = require("../configs/hotel-images-multer");
const hotelimagescontroller = require('../controllers/hotel-images-controller');
const router = express.Router();

router.post('/uploadimages/:hotel_id', hotelimagescontroller.uploadImages);
router.get('/getimages/:hotel_id', hotelimagescontroller.getimages);
router.delete('/deleteimage/:hotel_id', hotelimagescontroller.deleteimage);


module.exports = router;