const multer = require('multer');
const fs = require('fs')

const storagePhoto = multer.diskStorage({
    destination: function (req, file, cb) {
        const imageLocation = './gambarProduk'
        if(!fs.existsSync(imageLocation)) fs.mkdirSync(imageLocation, {recursive: true});
        cb(null, imageLocation)
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // const fileType = file.mimetype.split('/')[1]
        cb(null, file.originalname)
    }
})
const uploadImage = multer({storage: storagePhoto})

module.exports = uploadImage