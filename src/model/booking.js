const mongoose = require('mongoose');

const Booking = new mongoose.Schema({
    doctorId: { type: String, ref: 'Tests' },
    timeSlot: String,
    name: String,
    phone: String,
    address: String,
    reason: String,
});

module.exports = mongoose.model('Bookings', Booking);
