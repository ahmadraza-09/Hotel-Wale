const express = require('express');
const hotelcontroller = require('../controllers/hotel-controller');
const router = express.Router();

router.post('/addhotel', hotelcontroller.addhotel);
router.delete('/deletehotel/:id', hotelcontroller.deletehotel);
router.put('/updatehotel/:id', hotelcontroller.updatehotel);
router.get('/hotelslist', hotelcontroller.hotelslist);
router.get('/hotelslistbyid/:user_id', hotelcontroller.hotelslistbyid);
router.get('/hotelslistcountbyid/:user_id', hotelcontroller.hotelslistcountbyid);
router.get('/singlehotellist/:id', hotelcontroller.singlehotellist);

module.exports = router;