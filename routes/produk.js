const express = require('express');
const router = express.Router();
const produkRoute = require('../controller/produkController')
const uploadImage = require('../misc/multerImage')

router.get('/getAll', produkRoute.getAllProduk)
router.get('/getProduk/:id', produkRoute.getProdukById)
router.post('/createProduk', uploadImage.array('gambar', 4), produkRoute.createProduk)
router.put('/updateProduk/:id', produkRoute.updateProduk)
router.delete('/deleteProduk/:id', produkRoute.deleteProduk)

module.exports = router;
