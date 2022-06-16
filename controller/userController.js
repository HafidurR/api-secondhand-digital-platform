const {User} = require('../models');
const model = require('../models');
const {sendEmail} = require('../misc/mailer')

const register = async (req, res) => {
    const { email, nama, password } = req.body
    const userData = {
        email: email,
        nama: nama,
        password: password
    }
    
    const kirimEmail = await sendEmail(userData.email, userData.nama)
    const tambahUser = await User.create(userData)
        res.status(201).json({
            status: 'Success',
            data: {
                nama: userData.nama
            }
        })
    return res.status(400).json({
        status: 'Error',
        message: 'Nama sudah dipakai'
    })
}

module.exports = {register}