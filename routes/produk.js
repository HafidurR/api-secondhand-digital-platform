const express = require('express');
const router = express.Router();
const produkRoute = require('../controller/produkController')
const uploadImage = require('../misc/multerImage')
const restrict = require('../misc/passport')

router.get('/getByNama', produkRoute.getProdukByNamaProduk)
router.get('/:id', produkRoute.getProdukById)
router.get('/', produkRoute.getAllProduk)
router.get('/:kategoriId', produkRoute.getProdukByKategori)
router.post('/', restrict, uploadImage.array('gambar', 4), produkRoute.createProduk)
router.put('/:id', restrict, uploadImage.array('gambar', 4), produkRoute.updateProduk)
router.patch('/:id', restrict, produkRoute.isPublish)
router.delete('/:id', restrict, produkRoute.deleteProduk)

module.exports = router;