const router = require('express').Router();
const transaction = require('../controller/transaksiController')
const userChecking = require('../misc/passport');

router.get('/', userChecking, transaction.getAllTransaction);

module.exports = router