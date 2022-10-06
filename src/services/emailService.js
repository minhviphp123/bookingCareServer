const nodemailer = require('nodemailer');

function sendEmail() {
    const nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'minhtq9700@gmail.com',
            pass: 'bodkeaacfcwylwff'
        }
    });

    var mailOptions = {
        from: 'minhtq9700@gmail.com',
        to: 'minh79048@st.vimaru.edu.vn',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function sendAttachment(data) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'minhtq9700@gmail.com',
            pass: 'bodkeaacfcwylwff'
        },
    });

    var mailOptions = {
        from: 'minhtq9700@gmail.com',
        to: data.email,
        subject: 'Sending Email using Node.js',
        text: 'Confirmed!',
        attachments: [
            {
                filename: 'text1.png',
                content: data.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail,
    sendAttachment
}