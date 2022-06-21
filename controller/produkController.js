const {Produk} = require('../models');
const model = require('../models')

const getAllProduk = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
        include: [{
            model: model.User,
            attributes: ['nama', 'kotaId']
        }]
    };
    if (page) options.offset = page;
    if (row) options.offset = row;
    const allProduk = await Produk.findAll(options);
    return res.status(200).json({
        status: 'Success',
        data: allProduk
    })
}

const getProdukByNamaProduk = async (req, res) => {
    let { page, row, nama_produk } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
        include: [{
            model: model.User,
            attributes: ['nama', 'kotaId']
        }],
        where: {
            nama_produk: nama_produk
        }
    };
    if (page) options.offset = page;
    if (row) options.offset = row;
    const allProduk = await Produk.findAll(options);
    if (allProduk.length == 0) {
        return res.status(404).json({
            status: 'Error',
            message: 'Pencarian tidak ditemukan'
        }) 
    }
    else if (allProduk) {
        return res.status(200).json({
            status: 'Success',
            data: allProduk
        })
    }
}

const getProdukByKategori = async (req, res) => {
    const kategoriId = req.params.kategoriId
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
        include: [{
            model: model.User,
            attributes: ['nama', 'kotaId']
        }],
        where: {
            kategoriId
        }
    }
    const cariProduk = await Produk.findAll(options)
    if (cariProduk.length == 0) {
        return res.status(400).json({
            status: 'Error',
            message: `Produk dengan kategori ${req.params.kategoriId} tidak ditemukan`
        })
    } else if (cariProduk) {
        return res.status(200).json({
            status: 'Success',
            data: cariProduk
        })
    } 
}

const getProdukById = async (req, res) => {
    const id = req.params.id
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
        include: [{
            model: model.User,
            attributes: ['nama', 'kotaId']
        }]
    }
    const cariProduk = await Produk.findByPk(id, options)
    if (cariProduk) {
        return res.status(200).json({
            status: 'Success',
            data: cariProduk
        })
    } else if (!cariProduk) {
        return res.status(400).json({
            status: 'Error',
            message: `Produk dengan kategori ${req.params.kategoriId} tidak ditemukan`
        })
    } 
}

const createProduk = async (req, res) => {
    const { nama_produk, harga, deskripsi, kategoriId } = req.body
    const foundUser = req.user.id
    const arrOfGambar = []
    req.files.forEach(element => {
        arrOfGambar.push(element.path)
    });
    const produkData = {
        nama_produk: nama_produk,
        gambar: arrOfGambar,
        harga: harga,
        deskripsi: deskripsi,
        kategoriId: kategoriId,
        userId: foundUser
    }
    const tambahProduk = await Produk.create(produkData)
    res.status(201).json({
        status: 'Success',
        data: {
            nama_produk: produkData.nama_produk,
            gambar: produkData.gambar,
            harga: produkData.harga,
            deskripsi: produkData.deskripsi,
            kategoriId: produkData.kategoriId,
            user: produkData.userId
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
    const {id} = req.params.id
    const {nama_produk, harga, deskripsi, kategoriId} = req.body
    const arrOfGambar = []
    req.files.forEach(element => {
        arrOfGambar.push(element.path)
    })
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
    if (arrOfGambar) {
        cariProduk.gambar = arrOfGambar
    }
    const updateProduk = await cariProduk.save()
    if (updateProduk) {
        res.status(200).json({
            status: 'success',
            data: {
                nama_produk: cariProduk.nama_produk,
                gambar: cariProduk.gambar,
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
    getProdukByNamaProduk,
    getProdukByKategori,
    createProduk,
    updateProduk,
    deleteProduk,
    getProdukById
}