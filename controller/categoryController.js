const { Kategori } = require('../models');


const getAll = async (req, res) => {
  try {
    await Kategori.findAll({
      attributes: ['id', 'namaKategori']
    })
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: 'success get all category',
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

const create = async (req, res) => {
  try {
    await Kategori.create({
      namaKategori: req.body.namaKategori
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

const update = async (req, res) => {
  try {
    const id = req.params.id;

    await Kategori.findOne({
      where: {
        id: id
      }
    }).then(async (rsl) => {
      if (rsl === null) {
        return res.status(404).json({
          success: false,
          message: 'Data not found'
        })
      } else {
        await Kategori.update({
          namaKategory: req.body.namaKategori
        }, {
          where: {
            id: id
          }
        })
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'success update kategori'
            })
          })
          .catch((err) => {
            return res.status(400).json({
              success: false,
              message: err.message
            })
          })
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const destroy = async (req, res) => {
  try {
    const id = req.params.id;

    await Kategori.findOne({
      where: {
        id: id
      }
    }).then(async (rsl) => {
      if (rsl === null) {
        return res.status(404).json({
          success: false,
          message: 'Data not found'
        })
      } else {
        await Kategori.delete({
          where: {
            id: id
          }
        })
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'success delete kategori'
            })
          })
          .catch((err) => {
            return res.status(400).json({
              success: false,
              message: err.message
            })
          })
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  getAll,
  create,
  update,
  destroy
}