const { User, Kota } = require('../models');
const { sendEmail } = require('../misc/mailer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const e = require('express');

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
        const foundUser = await User.findOne( { where: { email: email } } )
        
        if (foundUser) {
            // Check profile
            const isValidPassword = bcrypt.compareSync(password, foundUser.password);
            if(isValidPassword) {
                const checkProfile = foundUser.toJSON()
                let profile = 0;
    
                for (const item in checkProfile) {
                    if (checkProfile[item] === null) profile += 1
                }
    
                const payload = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    profile: profile
                };
    
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                
                return res.status(200).json({
                    token: token
                });
            } else {
                throw new Error ('Wrong email or password')
            }
            
        } else {
            throw new Error ('Wrong email or password')
        }
        
    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            message: error.message
        });

    }

}

const getAll = async (req, res) => {
    try {
        const result = await User.findAll({
            attributes: ['id', 'nama', 'email', 'alamat'],
            include: [
                {
                    model: Kota,
                    attributes: ['id', 'namaKota']
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
        const { nama, alamat, kotaId, noTelp, foto, email } = req.body;
        // const hash = await bcrypt.hash(password, 12);
        const updatedData = {
            nama, alamat, kotaId, noTelp, foto, email
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
