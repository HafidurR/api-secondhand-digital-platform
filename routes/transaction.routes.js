const router = require('express').Router();
const transaction = require('../controller/transaksiController')
const userChecking = require('../misc/passport');

router.get('/transaction', userChecking, transaction.getAllBuyerTransaction);
router.get('transaction/:id', userChecking, transaction.getBuyerTransactionById);
router.post('/transaction', userChecking, transaction.createBuyerTransaction);
// router.put('/buyer/transaction/:id', userChecking, transaction.updateBuyerTransaction);
// router.delete('/buyer/transaction/:id', userChecking, transaction.deleteBuyerTransaction);

module.exports = router