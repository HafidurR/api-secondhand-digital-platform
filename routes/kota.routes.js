const express = require('express');
const router = express.Router();
const getAllKota = require('../controller/kotaController')

router.get('/', getAllKota)


module.exports = router;