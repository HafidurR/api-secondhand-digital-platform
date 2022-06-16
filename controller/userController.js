const {User} = require('../models');
const model = require('../models');
const {sendEmail} = require('../misc/mailer')

const register = async (req, res) => {
    try {
        const { email, nama, password } = req.body
        const userData = {
            email: email,
            nama: nama,
            password: password
        }
        const tambahUser = await User.create(userData)
        const kirimEmail = await sendEmail(userData.email, userData.nama)
        return res.status(201).json({
            status: 'Success',
            data: {
                nama: userData.nama
            }
        })
    } catch (error) {
        if (error.name === `SequelizeValidationError` || error.name === `SequelizeUniqueConstraintError`) {
            return res.status(400).json({
                status: 'Error',
                message: error.errors[0].message
            })
        }
        return res.status(400).json({
            status: 'Error',
            message: error
        })
    }
}

module.exports = {register}