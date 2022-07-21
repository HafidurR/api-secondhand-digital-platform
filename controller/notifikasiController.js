const { Transaksi, Produk, User } = require(`../models`);
const moment = require('moment');
moment.locale('id');


const getNotificationByIdBuyer = async (req, res) => {
    try {
        const sellerId = req.user.id

        const statusTransaksi = 'pending'
        const options = {
            attributes: ['id', 'sellerId', 'buyerId', 'produkId', 'statusTransaksi', 'hargaJual', 'createdAt'],
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga', 'createdAt']
            }, {
                model: User,
                attributes: ['foto', 'nama']
            }],
            where: [{
                statusTransaksi
            }, {
                sellerId
            }]
        }
        const cariHistory = await Transaksi.findAll(options);
        if (cariHistory.length === 0) {
            return res.status(400).json({
                status: 'Error',
                message: 'Tidak ada notifikasi'
            })
        } else if (cariHistory) {
            return res.status(200).json({
                status: 'Success',
                data: cariHistory.length === 0 ? null : cariHistory.map(d => {
                    return {
                        id: d.id,
                        sellerId: d.sellerId,
                        buyerId: d.buyerId,
                        produkId: d.produkId,
                        template: d.template,
                        statusTransaksi: d.statusTransaksi,
                        createdAt: moment(d.createdAt).format('LL'),
                        Produk: d.Produk,
                        User: d.User
                    }
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        })
    }
}

const getNotificationById = async (req, res) => {
    try {
        const sellerId = req.user.id

        const statusTransaksi = 'pending'
        const options = {
            attributes: ['id', 'sellerId', 'buyerId', 'produkId', 'statusTransaksi', 'hargaJual', 'createdAt'],
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            }, {
                model: User,
                attributes: ['foto', 'nama']
            }],
            where: [{
                statusTransaksi
            }, {
                sellerId
            }]
        }
        const cariHistory = await Transaksi.findAll(options);
        if (cariHistory.length === 0) {
            return res.status(400).json({
                status: 'Error',
                message: 'Tidak ada notifikasi'
            })
        } else if (cariHistory) {
            return res.status(200).json({
                status: 'Success',
                data: cariHistory.length === 0 ? null : cariHistory.map(d => {
                    return {
                        id: d.id,
                        sellerId: d.sellerId,
                        buyerId: d.buyerId,
                        produkId: d.produkId,
                        template: d.template,
                        statusTransaksi: d.statusTransaksi,
                        createdAt: moment(d.createdAt).format('LL'),
                        Produk: d.Produk,
                        User: d.User
                    }
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        })
    }
}

const getNotificationBuyer = async (req, res) => {
    try {
        const buyerId = req.user.id
        const statusTransaksi = 'accepted'
        const options = {
            attributes: ['id', 'sellerId', 'buyerId', 'produkId', 'statusTransaksi', 'hargaJual', 'createdAt'],
            include: [{
                model: Produk,
                attributes: ['namaProduk', 'gambar', 'harga']
            }, {
                model: User,
                attributes: ['foto', 'nama']
            }],
            where: [{
                statusTransaksi
            }, {
                buyerId
            }]
        }
        const cariHistory = await Transaksi.findAll(options);
        if (cariHistory.length === 0) {
            return res.status(400).json({
                status: 'Error',
                message: 'Tidak ada notifikasi'
            })
        } else if (cariHistory) {
            return res.status(200).json({
                status: 'Success',
                data: cariHistory.length === 0 ? null : cariHistory.map(d => {
                    return {
                        id: d.id,
                        sellerId: d.sellerId,
                        buyerId: d.buyerId,
                        produkId: d.produkId,
                        template: d.template,
                        statusTransaksi: d.statusTransaksi,
                        createdAt: moment(d.createdAt).format('LL'),
                        Produk: d.Produk,
                        User: d.User
                    }
                })
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
    getNotificationById,
    getNotificationBuyer,
    getNotificationByIdBuyer
}