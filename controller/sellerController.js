const jwt = require('jsonwebtoken');
const { Transaksi, Produk, Kategori } = require(`../models`);
const { JWT_SECRET_KEY } = process.env

const getAllTransaction = async (req, res) => {
    try{
        const jwt_payload = req.user //catch token from passport.js middleware
        const options = {
            include: [{
                model: Produk,
                attributes: ['nama_produk', 'gambar', 'harga']
            }]
        }
        const findTransaction = await Transaksi.findAll(options)

        return res.status(200).json({
            status: "Success",
            data: findTransaction
        })
        
    } catch (error){
        return res.status(401).json({
            status: "Failed",
            message: {}
        })
    }
}

module.exports = {
    getAllTransaction
}