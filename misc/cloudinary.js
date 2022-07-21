const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'mis-bustanul-abidin',
    api_key: '599621175414463',
    api_secret: 'mywkcEbyBNntSLJ0iHlxn20B5Jc'
});

const uploadWithCloudinary = async (req, res, next) => {
    try {
        if(req.file === undefined) return next()
        // console.log(`Msuk cloudDinary`)
        const foldering = `my-asset/${req.file.mimetype.split('/')[0]}`;
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: foldering
        });
        req.body.foto_url = uploadResult.secure_url;
        next()
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error
        })
    }
}

module.exports = uploadWithCloudinary