const express = require('express');
const router = express.Router();
const userRoute = require('../controller/userController')

router.post('/register', userRoute.register)
router.post('/login', userRoute.login)

module.exports = router;
