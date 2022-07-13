const model = require('../models');
const {Transaksi} = require('../models')

const getAllHistoryTransaction = async (req, res) => {
    try{
        const sellerId = req.user.id
        const statusTransaksi = 'accepted'
        const options = {
            attributes: ['sellerId','buyerId','hargaJual','statusTransaksi'],
            include: [{
                model: model.Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            }],
            where: [{
                statusTransaksi
            },{
                sellerId
            }]
        }
        const findHistoryTransaction = await Transaksi.findAll(options)
        if (findHistoryTransaction.length === 0) {
            return res.status(200).json({
                status: 'Success',
                message: 'Belum ada transaksi'
            })
        } else if (findHistoryTransaction) {
            return res.status(200).json({
                status: 'Success',
                data: findHistoryTransaction
            })
        }
    } catch (error){
        return res.status(400).json({
            status: 'Error',
            message: error.message
        })
    }
}

module.exports = getAllHistoryTransaction