const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    password: String,
    avt: Buffer,
    role: String
},
    { timestamps: true },
    { collection: 'tests' });

module.exports = mongoose.model('Tests', User);
