const {Produk} = require('../models');

const getAllProduk = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId']
    };
    if (page) options.offset = page;
    if (row) options.offset = row
    const allNasabah = await Produk.findAll(options);
    return res.status(200).json({
        status: 'Success',
        data: allNasabah
    })
}

const getProdukById = async (req, res) => {
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId']
    }
    const {id} = req.params
    const cariProduk = await Produk.findByPk(id, options)
    if (cariProduk) {
        return res.status(200).json({
            status: 'Success',
            data: cariProduk
        })
    } else if (!cariProduk) {
        return res.status(400).json({
            status: 'Error',
            message: `Produk dengan id ${req.params.id} tidak ditemukan`
        })
    } 
}

const createProduk = async (req, res) => {
    console.log(req.files);
    const { nama_produk, harga, deskripsi, kategoriId } = req.body
    const produkData = {
        nama_produk: nama_produk,
        gambar1: req.files[0].path,
        gambar2: req.files[1].path,
        // gambar3: req.files[2].path,
        // gambar4: req.files[3].path,
        harga: harga,
        deskripsi: deskripsi,
        kategoriId: kategoriId
    }
    const tambahProduk = await Produk.create(produkData)
    res.status(201).json({
        status: 'Success',
        data: {
            nama_produk: produkData.nama_produk,
            gambar: [
                produkData.gambar1,
                produkData.gambar2,
                produkData.gambar3,
                produkData.gambar4,
            ],
            harga: produkData.harga,
            deskripsi: produkData.deskripsi,
            kategoriId: produkData.kategoriId
        }
    }) 
    if (!produkData) {
        return res.status(400).json({
            status: 'Error',
            message: 'Lengkapi tabel terlebih dahulu!'
        })
    }
}

const updateProduk = async (req, res) => {
    const {id} = req.params
    const {nama_produk, harga, deskripsi, kategoriId} = req.body
    const cariProduk = await Produk.findOne({
        where: {
            id
        }
    })
    if(!cariProduk){
        res.status(400).json({
            status: 'Error',
            message: `Produk dengan id ${req.params.id} tidak ditemukan`
        })
    }
    if (nama_produk) {
        cariProduk.nama_produk = nama_produk
    } 
    if (harga) {
        cariProduk.harga = harga
    }
    if (deskripsi) {
        cariProduk.deskripsi = deskripsi
    }
    if (kategoriId) {
        cariProduk.kategoriId = kategoriId
    }
    const updateProduk = await cariProduk.save()
    if (updateProduk) {
        res.status(200).json({
            status: 'success',
            data: {
                nama_produk: cariProduk.nama_produk,
                gambar: cariProduk.gambar_url,
                harga: cariProduk.harga,
                deskripsi: cariProduk.deskripsi,
                kategoriId: cariProduk.kategoriId
            }
        })
    } else {
        res.status(400).json({
            status: 'error',
            message: error
        })
    }
}

const deleteProduk = async(req, res) => {
    const {id} = req.params
    const cariProduk = await Produk.findByPk(id)
    if (!cariProduk) {
        return res.status(400).json({
            status: 'Error',
            message: `Produk dengan id ${req.params.id} tidak ditemukan`
        })
    }
    if (cariProduk) {
        const hapusProduk = await cariProduk.destroy()
        return res.status(200).json({
            status: 'Success',
            message: `Produk dengan id ${req.params.id} berhasil dihapus`
        })
    }
}

module.exports = {
    getAllProduk,
    getProdukById,
    createProduk,
    updateProduk,
    deleteProduk
}