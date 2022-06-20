const express = require('express');
const router = express.Router();
const produkRoute = require('../controller/produkController')
const uploadImage = require('../misc/multerImage')

router.get('/getByNama', produkRoute.getProdukByNamaProduk)
router.get('/', produkRoute.getAllProduk)
router.get('/:kategoriId', produkRoute.getProdukByKategori)
router.post('/', uploadImage.array('gambar', 4), produkRoute.createProduk)
router.put('/:id', uploadImage.array('gambar', 4), produkRoute.updateProduk)
router.delete('/:id', produkRoute.deleteProduk)

module.exports = router;