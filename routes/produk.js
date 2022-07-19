const express = require('express');
const router = express.Router();
const produkRoute = require('../controller/produkController')
const uploadImage = require('../misc/multerImage')
const restrict = require('../misc/passport')

router.get('/', produkRoute.getAllProduk)
router.get('/produkSaya', restrict, produkRoute.getAllProdukSeller)
router.get('/:id', produkRoute.getProdukById)
router.post('/', restrict, uploadImage.array('gambar', 4), produkRoute.createProduk)
router.post('/terbitkan', restrict, uploadImage.array('gambar', 4), produkRoute.createProdukTerbitkan)
router.put('/:id', restrict, uploadImage.array('gambar', 4), produkRoute.updateProduk)
router.patch('/batal/:id', restrict, produkRoute.isPublishFalse)
router.patch('/:id', restrict, produkRoute.isPublish)
router.delete('/:id', restrict, produkRoute.deleteProduk)

module.exports = router;