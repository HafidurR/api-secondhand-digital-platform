const { User, Kota } = require('../models');
const { sendEmail } = require('../misc/mailer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        });
        const isValidPassword = bcrypt.compareSync(password, foundUser.password);
        console.log(isValidPassword)
        if (isValidPassword) {
            const payload = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({
                token: token
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Wrong email or password'
        });

    }

}

const getAll = async (req, res) => {
    try {
        await User.findAll({
            attributes: ['id', 'nama', 'email', 'alamat'],
            include: [
                {
                    model: Kota,
                    attributes: ['id', 'nama_kota']
                }
            ]
        })
            .then((result => {
                return res.status(200).json({
                    status: 'success',
                    message: 'success get all user',
                    data: result
                })
            }))
            .catch((error) => {
                return res.status(400).json({
                    status: 'error',
                    message: error.message
                })
            })
    } catch (error) {
        return res.status(500).json({
            status: 'Failed',
            message: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama, alamat, kotaId, no_telp, foto, email, password } = req.body;
        const updatedData = {
            nama, alamat, kotaId, no_telp, foto, email, password
        }

        await User.findOne({
            where: {
                id: id
            }
        })
            .then(async (rsl) => {
                if (rsl === null) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Data not found'
                    })
                } else {
                    await User.update(updatedData, {
                        where: {
                            id: id
                        }
                    })
                        .then(() => {
                            return res.status(200).json({
                                status: 'success',
                                message: 'success update user'
                            })
                        })
                        .catch((error) => {
                            return res.status(400).json({
                                status: 'error',
                                message: error.message
                            })
                        })
                }
            })
    } catch (error) {
        return res.status(500).json({
            status: 'Failed',
            message: error.message
        });
    }
}

module.exports = {
    register,
    login,
    getAll,
    updateUser
}