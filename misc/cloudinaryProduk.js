const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'mis-bustanul-abidin',
    api_key: '599621175414463',
    api_secret: 'mywkcEbyBNntSLJ0iHlxn20B5Jc'
});

// const uploadWithCloudinaryProduk = async (req, res, next) => {
//     try {
//         console.log(req.files);
        // const arrOfGambar = []
        // req.files.forEach(element => {
        //     // const e = element.path.split('\\')
        //     // const urlImage = e[0]+'/'+e[1]
        //     arrOfGambar.push(element.mimetype.split('/')[0])
        // });
//         const foldering = `gambarProduk/${req.files.mimetype.split('/')[0]}`;
//         const uploadResult = await cloudinary.uploader.upload(file, (result) => {
//             folder: foldering,
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//         });
//         req.body.gambar_url = uploadResult.secure_url;
//         next()
//     } catch (error) {
//         res.status(400).json({
//             status: 'Error',
//             message: error
//         })
//     }
// }
exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id:result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
// module.exports = uploadWithCloudinaryProduk