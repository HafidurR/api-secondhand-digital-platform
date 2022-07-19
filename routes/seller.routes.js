const router = require('express').Router();
const transaction = require('../controller/sellerController')
const userChecking = require('../misc/passport');

router.get('/transaction-wishlist', userChecking, transaction.getAllTransactionWishlist);
router.get('/transaction', userChecking, transaction.getAllTransaction);
router.get('/transaction/:id', userChecking, transaction.getTransactionById);
// router.post('/transaction', userChecking, transaction.createBuyerTransaction);
router.patch('/transaction/:id', userChecking, transaction.updateTransaction);
router.delete('/transaction/:id', userChecking, transaction.deleteTransaction);

module.exports = router