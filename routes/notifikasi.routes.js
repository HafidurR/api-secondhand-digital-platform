const router = require('express').Router();
const notifikasiRoute = require('../controller/notifikasiController');
const userChecking = require('../misc/passport')

// router.get('/', userChecking, notifikasiRoute.getAllNotification);
router.get('/', userChecking, notifikasiRoute.getNotificationById)
router.get('/buyer', userChecking, notifikasiRoute.getNotificationBuyer)
router.get('/buyer/pending', userChecking, notifikasiRoute.getNotificationByIdBuyer)

module.exports = router;