const mongoose = require('mongoose');
const { collection } = require('./userModel');

const allCode = new mongoose.Schema({
    key: String,
    type: String,
    value: String
}, {
    collection: 'allCodes'
});

module.exports = mongoose.model('allCodes', allCode);
