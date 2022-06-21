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
const transactionRouter = require('./routes/transaction.routes')

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
app.use('/seller', transactionRouter);
app.use('/buyer', transactionRouter);

module.exports = app;
