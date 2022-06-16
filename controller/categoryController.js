const { Kategori } = require('../models');

const create = async (req, res) => {
  try {
    await Kategori.create({
      nama_kategori: req.body.nama_kategori
    })
      .then((result) => {
        return res.status(201).json({
          success: true,
          message: 'success add new category',
          data: result
        })
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  create
}