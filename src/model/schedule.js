const mongoose = require('mongoose');

const Schedule = new mongoose.Schema({
    doctorId: String,
    date: String,
    time: String,
    maxNumber: Number
}, { collection: 'schedules' });

module.exports = mongoose.model('Schedules', Schedule);
