const {User} = require('../models');
const model = require('../models');
const {sendEmail} = require('../misc/mailer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
<<<<<<< HEAD
    const { email, nama, password } = req.body
    const userData = {
        email: email,
        nama: nama,
        password: password
    }
    
    const kirimEmail = await sendEmail(userData.email, userData.nama)
    const tambahUser = await User.create(userData)
        res.status(201).json({
=======
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
>>>>>>> 21a59ddafa8ba264262cc90a35b78652cf711c20
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

module.exports = {
    register,
    login
}