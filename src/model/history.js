const mongoose = require('mongoose');

const History = new mongoose.Schema({
    patientId: Number,
    doctorId: Number,
    description: Text
});

module.exports = mongoose.model('Histories', History);
