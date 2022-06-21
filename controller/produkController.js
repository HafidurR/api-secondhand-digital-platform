const { Produk } = require('../models');

const getAllProduk = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'nama_produk', 'gambar', 'harga', 'deskripsi', 'kategoriId']
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

const createProduk = async (req, res) => {
    try {
        const { nama_produk, harga, deskripsi, kategoriId } = req.body
        const jwt_payload = req.user
        console.log(jwt_payload)
        if(jwt_payload.profile !== 0) throw new Error (`Lengkapi profile terlebih dahulu`)
        const arrOfGambar = [
            req.files[0].path,
            req.files[1].path,
            req.files[2].path,
            req.files[3].path
        ]
        const produkData = {
            nama_produk: nama_produk,
            gambar: arrOfGambar,
            harga: harga,
            deskripsi: deskripsi,
            kategoriId: kategoriId
        }
        // Iterate produkData object
        for (const item in produkData) {
            if(produkData[item] === undefined) throw new Error (`Lengkapi tabel terlebih dahulu!`)  
        }
        // Create Produk
        const tambahProduk = await Produk.create(produkData)
        return res.status(201).json({
            status: 'Success',
            data: {
                nama_produk: produkData.nama_produk,
                gambar: produkData.gambar,
                harga: produkData.harga,
                deskripsi: produkData.deskripsi,
                kategoriId: produkData.kategoriId
            }
        }) 
    } catch (error) {
        return res.status(400).json({
                    status: 'Error',
                    message: error.message
                })
    }
}

const updateProduk = async (req, res) => {
    const {id} = req.params
    const {nama_produk, harga, deskripsi, kategoriId} = req.body
    const arrOfGambar = [
        req.files[0].path,
        req.files[1].path,
        req.files[2].path,
        req.files[3].path
    ]
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
    deleteProduk
}