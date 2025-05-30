const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const upload = require('../configs/multer'); // multer middleware
const router = express.Router();

router.post('/login', authcontroller.login);
router.get('/userlist', authcontroller.userlist);
router.get('/singleuserlist/:user_id', authcontroller.singleuserlist);
router.post('/registration', authcontroller.registration);
router.delete('/deleteuser/:user_id', authcontroller.deleteuser);
router.put('/updateuser/:user_id', authcontroller.updateuser);

// router.put("/uploadprofile/:user_id", upload.single("profile_image"), authcontroller.uploadProfile);
router.put("/uploadprofile/:user_id", authcontroller.uploadProfile);

module.exports = router;
