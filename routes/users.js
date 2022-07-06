const express = require('express');
const router = express.Router();
const uploadImage = require('../misc/multerImage')
const userRoute = require('../controller/userController');

router.post('/register', userRoute.register)
router.post('/login', userRoute.login)
router.get('/', userRoute.getAll)
router.get('/:id', userRoute.getDetailUser)
router.put('/:id', uploadImage.single('gambar'), userRoute.updateUser)

module.exports = router;
