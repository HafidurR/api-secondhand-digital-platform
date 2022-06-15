const nodemailer = require('nodemailer')
const emailMessage = require('./emailMessage');
const {PASSWORD} = process.env;

const sendEmail = (email, nama) => {
    const mailOptions = {
        from: 'fakhrizaluciha@gmail.com',
        to: email,
        subject: 'Welcome!',
        html: emailMessage(nama)
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'fakhrizaluciha@gmail.com',
            pass: PASSWORD
        }
    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(err)
            else resolve(info)
        })
    })
}


module.exports = {
    sendEmail
}