const { Transaksi } = require(`../models/transaksi`);
const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env

const decode = (bearerHeader) => { //Decode JWT from bearer token
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const token = bearerToken
    // const jwt_payload = jwt_decode(token);
    const decode = jwt.verify(token, JWT_SECRET_KEY)
    return decode
}

const getAllTransaction = async (req, res) => {
    try{
        // const bearerHeader = req.headers['authorization'];
        // const jwt_payload = decode(bearerHeader)
        const jwt_payload = req.user //catch token from passport.js middleware
        console.log(jwt_payload);
        const findTransaction = await Transaksi.findOne()
        
    } catch (error){
        console.log (error)
    }
}

module.exports = {
    getAllTransaction
}