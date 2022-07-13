const { Transaksi, Produk, User } = require(`../models`);

// const getAllNotification = async (req, res) => {
//     try{
//         const statusTransaksi = 'pending'
//         const options = {
//             include: [{
//                 model: Produk,
//                 attributes: ['namaProduk', 'gambar', 'harga']
//             }],
//             where: {
//                 statusTransaksi
//             }
//         }
//         const findTransaction = await Transaksi.findAll(options)

//         return res.status(200).json({
//             status: "Success",
//             data: findTransaction
//         })
        
//     } catch (error){
//         return res.status(400).json({
//             status: "Failed",
//             message: 'Tidak ada notifikasi'
//         })
//     }
// }

const getNotificationById = async (req, res) => {
    try {
        const sellerId = req.user.id
        const statusTransaksi = 'pending'
        const options = {
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            },{
                model: User,
                attributes: ['foto', 'nama']
            }],
            where: [{
                statusTransaksi
            },{
                sellerId
            }]
        }
        const cariHistory = await Transaksi.findAll(options);
        if (cariHistory.length === 0){
            return res.status(400).json({
                status: 'Error',
                message: 'Tidak ada notifikasi'
            })
        } else if (cariHistory) {
            return res.status(200).json({
                status: 'Success',
                data: cariHistory
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        })
    }
}

module.exports = {
    getNotificationById
}