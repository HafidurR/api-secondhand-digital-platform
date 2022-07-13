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
        const { produkId, hargaTawar } = req.body 
        const jwt_payload = req.user // catch token from passport.js middleware
        const findTransaction = await Transaksi.findOne({
            where: [{
                buyerId: jwt_payload.id
            },{
                produkId: produkId
            }]
        });
        const findProduct = await Produk.findOne({
            where: {
                id: produkId
            }
        })
        if(jwt_payload.id === findProduct.userId) throw new Error ("Transaction cannot be done ")
        // return console.log(findProduct);
        if(findTransaction === null || findTransaction) {
            const transactionData = {
                buyerId: jwt_payload.id,
                sellerId: findProduct.userId,
                produkId: produkId,
                statusTransaksi: "pending",
                hargaJual: hargaTawar
            }
            const createTransaction = await Transaksi.create(transactionData)

            return res.status(201).json({
                status: "Success",
                message: "Sukses membuat transaksi"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "Bad Request",
            message: error.message
        })
    }
}

const getBuyerTransactionById = async (req, res) => {
    try {
        const jwt_payload = req.user
        const transactionId = req.params.id
        const options = {
            where: { id: transactionId },
            attributes: ['id','buyerId', 'sellerId', 'produkId', 'statusTransaksi', 'hargaJual'],
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            }]
        }
        const findTransaction = await Transaksi.findOne(options)
        if(findTransaction === null || findTransaction.buyerId !== jwt_payload.id) throw new Error ('Id transaksi salah')
        return res.status(200).json({
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
        const { hargaTawar } = req.body
        const id = req.params.id
        const jwt_payload = req.user.id
        const options = {
            where: [{ 
                buyerId: jwt_payload 
            },{
                id: id
            }]
        }
        const findTransaction = await Transaksi.findOne(options)
        if(!findTransaction) throw new Error ("Transaksi tidak ditemukan")
        if (findTransaction.statusTransaksi === 'accepted') {
            return res.status(400).json({
                status: 'Error',
                message: 'Transaksi sudah selesai'
            })
        }
        const updatedData = { hargaJual: hargaTawar }
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
        if(findTransaction[0] === undefined) throw new Error('Transaksi tidak ditemukan');
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