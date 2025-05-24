const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const router = express.Router();

router.post('/login', authcontroller.login);
router.get('/userlist', authcontroller.userlist);
router.get('/singleuserlist/:user_id', authcontroller.singleuserlist);
router.post('/registration', authcontroller.registration);


module.exports = router;