const router = require('express').Router();
const notifikasiRoute = require('../controller/notifikasiController');
const userChecking = require('../misc/passport')

router.get('/', userChecking, notifikasiRoute.getAllNotification);

module.exports = router;