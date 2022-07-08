const express = require('express');
const router = express.Router();
const multer = require('multer');
const userRoute = require('../controller/userController');
const uploadWithCloudinary = require('../misc/cloudinary')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    const index = file.originalname.split('.').length;
    cb(null, Date.now() + '.' + file.originalname.split('.')[index - 1]);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
      return cb(null, true);
    cb(null, false);
    cb(new Error("Wrong filetype"));
  },
});

router.post('/register', userRoute.register)
router.post('/login', userRoute.login)
router.get('/', userRoute.getAll)
router.get('/:id', userRoute.getDetailUser)
router.put('/:id', upload.single('foto'), uploadWithCloudinary, userRoute.updateUser)

module.exports = router;