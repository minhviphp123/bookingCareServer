const mongoose = require('mongoose');

const Clinic = new mongoose.Schema({
    name: String,
    address: String,
    img: Buffer,
    contentMarkdown: String,
    contentHTML: String
});

module.exports = mongoose.model('Clinics', Clinic);
