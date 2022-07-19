const jwt = require('jsonwebtoken');
const { Transaksi, Produk, Kategori } = require(`../models`);
const { JWT_SECRET_KEY } = process.env

const getAllTransactionWishlist = async (req, res) => {
    try{
        const jwt_payload = req.user //catch token from passport.js middleware
        const options = {
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            }],
            where : {
                statusTransaksi: 'pending'
            }
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

const getAllTransaction = async (req, res) => {
    try {
        const jwt_payload = req.user //catch token from passport.js middleware
        const options = {
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            }]
        }
        const findTransaction = await Transaksi.findAll(options)

        return res.status(200).json({
            status: "Success",
            data: findTransaction
        })

    } catch (error) {
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
        const updateData = { statusTransaksi: status }
        const findTransaction = await Transaksi.findOne({ where: { id: transactionId } })

        if(!findTransaction) throw new Error ("Transaction cannot be updated")
        await Transaksi.update(updateData, { where: { id: transactionId } })
        // findTransaction.reload()
        .then(async () => {
            await Transaksi.findOne({
              where: {
                id: transactionId
              }
            })
              .then(rsl => {
                return res.status(200).json({
                  message: 'Success',
                  Data: rsl
                })
              }).catch(err => {
                return res.status(400).json({
                  message: err.message
                })
              })
          })
          .catch((error) => {
            return res.status(400).json({
              status: 'Error',
              message: error.message
            })
          })
    } catch (error) {
        return res.status(500).json({
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
    getAllTransactionWishlist,
    getAllTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
}