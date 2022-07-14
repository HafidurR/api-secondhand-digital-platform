const {Produk} = require('../models');
const model = require('../models');
const { Op } = require("sequelize");
const cloudinary = require('../misc/cloudinaryProduk')

const getAllProduk = async (req, res) => {
    try {
        let { page, row, namaProduk, kategoriId } = req.query
        const isPublish = true
        page -= 1
        const options = {
            attributes: ['id', 'namaProduk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
            include: [{
                model: model.User,
                attributes: ['nama', 'kotaId']
            }],
            where: {
                isPublish
            }
        };
        if (page) options.offset = page;
        if (row) options.limit = row;
        if (namaProduk) options.where.namaProduk = {
            [Op.iLike]: '%'+`${namaProduk}`+'%'
        }
        if (kategoriId) options.where.kategoriId = kategoriId
        const allProduk = await Produk.findAll(options);
        if (allProduk.length === 0) {
            return res.status(400).json({
                status: 'Error',
                data: 'Pencarian tidak ditemukan'
            })
        } else if (allProduk) {
            return res.status(200).json({
                status: 'Success',
                data: allProduk
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: "Bad Request",
            data: error.message
        })
    }

}

const getAllProdukFalse = async (req, res) => {
    try {
        let { page, row, namaProduk, kategoriId } = req.query
        const isPublish = false
        const userId = req.user.id
        page -= 1
        const options = {
            attributes: ['id', 'namaProduk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
            include: [{
                model: model.User,
                attributes: ['nama', 'kotaId']
            }],
            where: [{
                isPublish
            },{
                userId
            }]
        };
        if (page) options.offset = page;
        if (row) options.limit = row;
        if (namaProduk) options.where.namaProduk = {
            [Op.iLike]: '%'+`${namaProduk}`+'%'
        }
        if (kategoriId) options.where.kategoriId = kategoriId
        const allProduk = await Produk.findAll(options);
        if (allProduk.length === 0) {
            return res.status(400).json({
                status: 'Error',
                data: 'Pencarian tidak ditemukan'
            })
        } else if (allProduk) {
            return res.status(200).json({
                status: 'Success',
                data: allProduk
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: "Bad Request",
            data: error.message
        })
    }
}

const getProdukById = async (req, res) => {
    const id = req.params.id
    const options = {
        attributes: ['id', 'namaProduk', 'gambar', 'harga', 'deskripsi', 'kategoriId'],
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
    try {
        const uploader = async (path) => await cloudinary.uploads(path, 'Gambar')
        const { namaProduk, harga, deskripsi, kategoriId } = req.body
        const jwt_payload = req.user
        if(jwt_payload.profile !== 0) {
            return res.status(400).json({
                status: 'Error',
                message: 'Lengkapi profile terlebih dahulu'
            })
        }
        
        const foundUser = req.user.id
        const arrOfGambar = []
        const files = req.files
        for (const file of files) {
            const {path} = file
            const newPath = await uploader(path)
            arrOfGambar.push(newPath)
        }
        const produkData = {
            namaProduk: namaProduk,
            gambar: arrOfGambar,
            harga: harga,
            deskripsi: deskripsi,
            kategoriId: kategoriId,
            userId: foundUser
        }
        const tambahProduk = await Produk.create(produkData)
        if (tambahProduk) {
            const produk = await Produk.findOne(
                {
                    where: {
                    id: tambahProduk.id
                },
                include: {
                    model: model.User,
                    attributes: ['nama', 'kotaId']
                }
            }
            )
            return res.status(201).json({
                status: 'Success',
                data: produk
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        })

    }
}

const createProdukTerbitkan = async (req, res) => {
    try {
        const uploader = async (path) => await cloudinary.uploads(path, 'Gambar')
        const { namaProduk, harga, deskripsi, kategoriId } = req.body
        const jwt_payload = req.user
        if(jwt_payload.profile !== 0) {
            return res.status(400).json({
                status: 'Error',
                message: 'Lengkapi profile terlebih dahulu'
            })
        }
        const foundUser = req.user.id
        const arrOfGambar = []
        const files = req.files
        for (const file of files) {
            const {path} = file
            const newPath = await uploader(path)
            arrOfGambar.push(newPath)
        }
        const isPublishTrue = true    
        const produkData = {
            namaProduk: namaProduk,
            gambar: arrOfGambar,
            harga: harga,
            deskripsi: deskripsi,
            kategoriId: kategoriId,
            userId: foundUser,
            isPublish: isPublishTrue
        }
        
        const tambahProduk = await Produk.create(produkData)
        if (tambahProduk) {
            const produk = await Produk.findOne(
                {
                    where: {
                    id: tambahProduk.id
                },
                include: {
                    model: model.User,
                    attributes: ['nama', 'kotaId']
                }
            }
            )
            return res.status(201).json({
                status: 'Success',
                data: produk
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        })

    }
}

const updateProduk = async (req, res) => {
    const id = req.params.id
    const uploader = async (path) => await cloudinary.uploads(path, 'Gambar')
    const {namaProduk, harga, deskripsi, kategoriId} = req.body
    const arrOfGambar = []
    const files = req.files
    
    for (const file of files) {
        const {path} = file
        const newPath = await uploader(path)
        arrOfGambar.push(newPath)
    }
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
    if (namaProduk) {
        cariProduk.namaProduk = namaProduk
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
                namaProduk: cariProduk.namaProduk,
                gambar: cariProduk.gambar,
                harga: cariProduk.harga,
                deskripsi: cariProduk.deskripsi,
                kategoriId: cariProduk.kategoriId
            }
        })
    } else {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const isPublish = async(req, res) => {
    const id = req.params.id
    const isPublish = req.body
    const update = await Produk.update(isPublish,{
        where: {
            id
        }
    })
    .then (result => {
        return res.status(200).json({
            status: 'Success',
            message: 'Success publish produk'
        })
    }) 
    .catch (error => {
        return res.status(500).json({
            status: 'Error',
            message: error.message
        })
    })
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
    getAllProdukFalse,
    createProduk,
    updateProduk,
    deleteProduk,
    getProdukById,
    isPublish,
    createProdukTerbitkan
}