const { Transaksi, Produk } = require(`../models`);
const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env

const getAllBuyerTransaction = async (req, res) => {
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
                message: "Sukses membuat transaksi"
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
        const jwt_payload = req.user
        const transactionId = req.params.id
        const options = {
            where: { id: transactionId },
            attributes: ['id','userId', 'produkId', 'status_transaksi', 'harga_jual'],
            include: [{
                model: Produk,
                attributes: ['nama_produk', 'gambar', 'harga']
            }]
        }
        const findTransaction = await Transaksi.findOne(options)

        if(findTransaction === null || findTransaction.userId !== jwt_payload.id) throw new Error ('Id transaksi salah')
        return res.status(201).json({
            status: "Success",
            message: findTransaction
        })
    } catch (error) {
        return res.status(500).json({
            status: "Bad Request",
            message: error.message
        })
    }
}

const updateBuyerTransaction = async (req, res) => {
    try {
        const { harga_tawar } = req.body
        const id = req.params.id
        const jwt_payload = req.user
        const options = {
            where: { id: id }
        }
        const findTransaction = await Transaksi.findOne(options)
        if(!findTransaction) throw new Error ("Transaksi tidak ditemukan")
        const updatedData = { harga_jual: harga_tawar }
        const updateHargaTawar = await Transaksi.update(updatedData, options)

        await findTransaction.reload()
        return res.status(201).json({
            status: "Success",
            message: findTransaction
        })

    } catch (error) {
        return res.status(400).json({
            status: "Bad Request",
            message: error.message
        })
    }
}

const deleteBuyerTransaction = async (req, res) => {
    try {
        const jwt_payload = req.user
        const transactionId = req.params.id
        const findTransaction = await Transaksi.findAll({
            where: {
                id: transactionId,
                userId: jwt_payload.id
            }
        })
        if(findTransaction[0] === undefined) throw new Error('Transasi tidak ditemukan');
        const deleteTransaction = await Transaksi.destroy({ 
            where: { id: transactionId, userId: jwt_payload.id } 
        })

        return res.status(201).json({
            status: "Success",
            message: "Transaction has been deleted"
        })

    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
}

module.exports = {
    getAllBuyerTransaction,
    createBuyerTransaction,
    getBuyerTransactionById,
    updateBuyerTransaction,
    deleteBuyerTransaction
}