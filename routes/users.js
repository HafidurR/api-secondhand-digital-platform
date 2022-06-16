const express = require('express');
const router = express.Router();
const userRoute = require('../controller/userController')

router.post('/register', userRoute.register)

module.exports = router;
