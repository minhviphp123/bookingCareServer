const mongoose = require('mongoose');

const Booking = new mongoose.Schema({
    doctorId: { type: String, ref: 'Tests' },
    date: String,
    timeSlot: String,
    name: String,
    phone: String,
    email: String,
    address: String,
    reason: String,
});

module.exports = mongoose.model('Bookings', Booking);
