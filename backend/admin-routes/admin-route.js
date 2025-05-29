const express = require('express');
const admincontroller = require('../admin-contollers/admin-controller');
const router = express.Router();

router.post('/superadmin', admincontroller.superadmin);
router.post('/hoteladmin', admincontroller.hoteladmin);
router.post('/adminlogin', admincontroller.adminlogin);
router.delete('/deleteadmin/:id', admincontroller.deleteadmin);
router.put('/updateadmin/:id', admincontroller.updateadmin);
router.get('/adminlist', admincontroller.adminlist);
router.get('/singleadminlist/:id', admincontroller.singleadminlist);

module.exports = router;