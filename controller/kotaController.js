const {Kota} = require('../models');

const getAllKota = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'nama_kota']
    };
    
    if (page) options.offset = page;
    if (row) options.offset = row;
    const allKota = await Kota.findAll(options);
    return res.status(200).json({
        status: 'Success',
        data: allKota
    })
}

module.exports = getAllKota