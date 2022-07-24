const multer = require('multer');

const storagePhoto = multer.diskStorage({
    /** 
    destination: function (req, file, cb) {
        const imageLocation = './gambarProduk'
        cb(null, imageLocation)
    },
    */
    filename: function (req, file, cb) {
        cb(null, file.originalname, req.user)
    }
})
const uploadImage = multer({storage: storagePhoto})

module.exports = uploadImage
