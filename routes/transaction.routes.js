const router = require('express').Router();
const transaction = require('../controller/transaksiController')

router.get('/', transaction.getAllTranasaksi)


module.exports = router