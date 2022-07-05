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

// Seller accept or decline
const getTransactionById = async (req, res) => {
    try {
        const jwt_payload = req.user
        const reqId = req.params.id
        const options = {
            where: { id: reqId }
        }

        const findTransaction = await Transaksi.findOne(options)
        if(!findTransaction) throw new Error ("Transaction not found")

        return res.status(200).json({
            status: "Success",
            data: findTransaction
        })

    } catch (error) {
        return res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
}

// Edit transaction and update transaction status accept/decline
const updateTransaction = async (req, res) => {
    try {
        const jwt_payload = req.user;
        const transactionId = req.params.id
        const { status } = req.body
        const updateData = { status_transaksi: status }
        const findTransaction = await Transaksi.findOne({ where: { id: transactionId } })

        if(!findTransaction) throw new Error ("Transaction cannot be updated")
        await Transaksi.update(updateData, { where: { id: transactionId } })
        findTransaction.reload()
        return res.status(201).json({
            status: "Success",
            message: findTransaction
        })
    } catch (error) {

        return res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const jwt_payload = req.user
        const transactionId = req.params.id
        const findTransaction = await Transaksi.findOne({ where: { id: transactionId } })
        if(!findTransaction) throw new Error ("Transaction cannot be deleted")
        await Transaksi.destroy({ where: { id: transactionId } })
        return res.status(201).json({
            status: "Success",
            message: `Success deleted transaction`
        })

    } catch (error) {
        return res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
}

module.exports = {
    getAllTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
}