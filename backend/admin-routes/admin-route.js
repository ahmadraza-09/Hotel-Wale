const express = require('express');
const admincontroller = require('../admin-contollers/admin-controller');
const router = express.Router();

router.post('/superadmin', admincontroller.superadmin);
router.post('/hoteladmin', admincontroller.hoteladmin);
router.post('/adminlogin', admincontroller.adminlogin);

module.exports = router;