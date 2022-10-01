const mongoose = require('mongoose');

const Clinic = new mongoose.Schema({
    address: String,
    description: Text,
    image: String
});

module.exports = mongoose.model('Clinics', Clinic);
