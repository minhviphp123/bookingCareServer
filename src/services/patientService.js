const Booking = require('../model/booking');
const emailService = require('./emailService');

function newBooking(data) {

    return new Promise(async (resolve, reject) => {
        try {
            let newBooking = await new Booking(data);
            await newBooking.save();
            await emailService.sendEmail('minhtq9700@gmail.com');
            resolve({
                errCode: 0,
                message: 'added'
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    newBooking
}