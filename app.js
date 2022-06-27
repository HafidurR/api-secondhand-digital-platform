require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const PORT = 4000
const cors = require('cors')

const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category.routes');
const produkRouter = require('./routes/produk')
<<<<<<< HEAD
const buyerRouter = require('./routes/buyer.routes')
const sellerRouter = require('./routes/seller.routes')
=======
const transactionRouter = require('./routes/transaction.routes')
const kotaRouter = require('./routes/kota.routes')
>>>>>>> c998e6aff4704253498bae6a8ec139ebe57d7317

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/produk', produkRouter)
app.use('/categories', categoryRouter);
<<<<<<< HEAD
app.use('/seller', sellerRouter);
app.use('/buyer', buyerRouter);
=======
app.use('/transaction', transactionRouter);
app.use('/kota', kotaRouter);
>>>>>>> c998e6aff4704253498bae6a8ec139ebe57d7317

module.exports = app;
