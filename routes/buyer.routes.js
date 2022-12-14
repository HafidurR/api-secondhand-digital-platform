const router = require('express').Router();
const transaction = require('../controller/buyerController')
const userChecking = require('../misc/passport');

router.get('/transaction', userChecking, transaction.getAllBuyerTransaction);
router.get('/transaction/:id', userChecking, transaction.getBuyerTransactionById);
router.post('/transaction', userChecking, transaction.createBuyerTransaction);
router.put('/transaction/:id', userChecking, transaction.updateBuyerTransaction);
router.delete('/transaction/:id', userChecking, transaction.deleteBuyerTransaction);

module.exports = router