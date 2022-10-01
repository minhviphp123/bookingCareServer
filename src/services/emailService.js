require('dotenv').config();
const nodemailer = require('nodemailer');

function sendEmail(receiverEmail) {
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_APP, // generated ethereal user
                pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"minhtran 👻" <minhtq9700@gmail.com>', // sender address
            to: receiverEmail, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log(1);
    }
}

module.exports = {
    sendEmail
}