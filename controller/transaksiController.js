const { Transaksi } = require(`../models`);
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

const getAllBuyerTransaction = async (req, res) => {
    try{
        // const bearerHeader = req.headers['authorization'];
        // const jwt_payload = decode(bearerHeader)
        const jwt_payload = req.user //catch token from passport.js middleware
        console.log(jwt_payload);
        const findTransaction = await Transaksi.findAll()
        
    } catch (error){
        console.log (error)
    }
}

const createBuyerTransaction = async (req, res) => {
    try {
        const { produkId, harga_tawar } = req.body 
        const jwt_payload = req.user //catch token from passport.js middleware
        // console.log(jwt_payload.id);
        const findTransaction = await Transaksi.findOne({
            where: {
                userId: jwt_payload.id,
                produkId: produkId
            }
        });
        if(findTransaction === null) {
            const transactionData = {
                userId: jwt_payload.id,
                produkId: produkId,
                status_transaksi: "pending",
                harga_jual: harga_tawar
            }
            const createTransaction = await Transaksi.create(transactionData)
            return res.status(201).json({
                status: "Success",
                message: "Sukses membuat transasi"
            })
        } else {
            return res.status(400).json({
                status: "Bad Request",
                message: "Transaksi telah dibuat"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status: "Bad Request",
            message: {}
        })
    }
}

const getBuyerTransactionById = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    getAllBuyerTransaction,
    createBuyerTransaction,
    getBuyerTransactionById
}