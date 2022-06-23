const router = require('express').Router();
const transaction = require('../controller/sellerController')
const userChecking = require('../misc/passport');

router.get('/transaction', userChecking, transaction.getAllTransaction);
// router.get('/transaction/:id', userChecking, transaction.getBuyerTransactionById);
// router.post('/transaction', userChecking, transaction.createBuyerTransaction);
// router.put('/transaction/:id', userChecking, transaction.updateBuyerTransaction);
// router.delete('/transaction/:id', userChecking, transaction.deleteBuyerTransaction);

module.exports = router