const model = require('../models');

const getAllHistoryTransaction = async (req, res) => {
    try{
        const options = {
            attributes: ['buyerId','harga_tawar'],
            include: [{
                model: model.Produk,
                attributes: ['nama_produk', 'gambar', 'harga']
            }]
        }
        const findHistoryTransaction = await Transaksi.findAll(options)

        return res.status(200).json({
            status: 'Success',
            data: findHistoryTransaction
        })
        
    } catch (error){
        return res.status(400).json({
            status: 'Error',
            message: error.message
        })
    }
}

// const createHistoryTransaksi = async (req,res) => {
//     const statusTransaksi = status_transaksi
//     if (statusTansaksi === 'selesai') {
        
//     }
// }

model.exports = {
    getAllHistoryTransaction
}