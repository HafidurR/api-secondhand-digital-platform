const express = require('express');
const router = express.Router();
const {getAllHistoryTransaction} = require('../controller/historyTransaksi')
const restrict = require('../misc/passport')

router.get('/', restrict, getAllHistoryTransaction)

module.exports = router;