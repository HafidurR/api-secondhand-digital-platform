const {Transaksi} = require(`../models/transaksi`);
const jwt_decode = require('jwt-decode')

const decode = (bearerHeader) => {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const token = bearerToken
    const jwt_payload = jwt_decode(token);
    return jwt_payload
}

const getAllTransaction = async (req, res) => {
    try{
        const bearerHeader = req.headers['authorization'];
        const jwt_payload = decode(bearerHeader)
        console.log(jwt_payload);
        
    } catch (error){
        console.log (error)
    }
}

module.exports = {
    getAllTransaction
}