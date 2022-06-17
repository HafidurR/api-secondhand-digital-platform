const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const PORT = 4000

const usersRouter = require('./routes/users');
const produkRouter = require('./routes/produk')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/produk', produkRouter)

app.listen(PORT, () => {
    console.log(`dengar di ${PORT}`);
})

module.exports = app;
