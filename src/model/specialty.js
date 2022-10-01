const mongoose = require('mongoose');

const Specialty = new mongoose.Schema({
    name: String,
    imgBase64: Buffer,
    descHTML: String,
    descMarkdown: String
}, { collection: 'specialties' });

module.exports = mongoose.model('Specialties', Specialty);
