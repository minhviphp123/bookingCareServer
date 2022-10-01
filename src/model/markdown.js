const { text } = require('body-parser');
const mongoose = require('mongoose');

const MarkDown = new mongoose.Schema({
    doctorId: { type: String, ref: 'Tests' },
    specialty: String,
    price: String,
    payment: String,
    province: String,
    nameClinic: String,
    addressClinic: String,
    contentHTML: String,
    contentMarkdown: String,
    desc: String
},
    { timestamps: true },
    { collection: 'markdown' });

module.exports = mongoose.model('Markdowns', MarkDown);