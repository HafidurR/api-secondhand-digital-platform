const nodemailer = require('nodemailer')
const emailMessage = require('./emailMessage');
const {PASSWORD} = process.env;

const sendEmail = (email, nama) => {
    const mailOptions = {
        from: '18081010154@student.upnjatim.ac.id',
        to: email,
        subject: 'Welcome!',
        html: emailMessage(nama)
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: '18081010154@student.upnjatim.ac.id',
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