const express = require('express');
const citiescontroller = require('../controllers/cities-controller');
const router = express.Router();

router.post('/addcity', citiescontroller.addcity);
router.delete('/deletecity/:city_id', citiescontroller.deletecity);
router.put('/updatecity/:city_id', citiescontroller.updatecity);
router.get('/citieslist', citiescontroller.citieslist);
router.get('/singlecitylist/:city_id', citiescontroller.singlecitylist);

module.exports = router;