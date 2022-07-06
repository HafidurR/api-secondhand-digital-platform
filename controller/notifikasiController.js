const { Transaksi, Produk } = require(`../models`);

const getAllNotification = async (req, res) => {
    try{
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
        
    } catch (error){
        return res.status(401).json({
            status: "Failed",
            message: {}
        })
    }
}

module.exports = {
    getAllNotification
}