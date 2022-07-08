const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'mis-bustanul-abidin',
    api_key: '599621175414463',
    api_secret: 'mywkcEbyBNntSLJ0iHlxn20B5Jc'
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve(result.secure_url)
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}