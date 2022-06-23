const jwt = require('jsonwebtoken');
const { Transaksi, Produk } = require(`../models`);
const { JWT_SECRET_KEY } = process.env

const getAllTransaction = async (req, res) => {
    try{
        const jwt_payload = req.user //catch token from passport.js middleware
        const options = {
            where : {id: jwt_payload.id},
            attributes: { exclude: ['createdAt, updatedAt'] }
        }
        const findTransaction = await Transaksi.findAll()

        return res.status(200).json({
            status: "Success",
            data: findTransaction
        })
        
        
    } catch (error){
        return res.status(500).json({
            status: "Bad Request",
            message: {}
        })
    }
}

module.exports = {
    getAllTransaction
}