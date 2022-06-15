const express = require('express');
const router = express.Router();
// const mailer = require()
const userRoute = require('../controller/userController')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.post('/register', userRoute.register)

module.exports = router;
